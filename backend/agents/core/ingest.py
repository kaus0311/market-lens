# core/ingest.py

# for single agent arch

import time
import hashlib
import requests
import feedparser
import os
from datetime import datetime
from typing import List, Dict, Any

DEFAULT_TIMEOUT = 10

def _make_id(prefix: str, raw: str):
    h = hashlib.sha1(raw.encode("utf-8")).hexdigest()
    return f"{prefix}:{h}"

def http_get_json(url: str, headers=None, params=None, timeout=DEFAULT_TIMEOUT, retries=3):
    backoff = 1.0
    for attempt in range(retries):
        try:
            r = requests.get(url, headers=headers, params=params, timeout=timeout)
            r.raise_for_status()
            ct = r.headers.get("Content-Type","")
            if "application/json" in ct or url.endswith(".json"):
                return r.json()
            return r.text
        except requests.RequestException as e:
            if attempt == retries - 1:
                raise
            time.sleep(backoff)
            backoff *= 2
    raise RuntimeError("unreachable")

def fetch_rss_feed(feed_url: str) -> List[Dict[str, Any]]:
    """Return normalized items from RSS feed"""
    parsed = feedparser.parse(feed_url)
    items = []
    for e in parsed.entries[:10]:
        raw = e.get("link", e.get("id", e.get("title","")))
        item = {
            "id": _make_id("rss", raw),
            "source": "rss",
            "origin": e.get("link"),
            "title": e.get("title"),
            "text": e.get("summary") or e.get("description") or "",
            "summary": None,
            "published_at": e.get("published"),
            "metadata": {"authors": [a.get("name") for a in e.get("authors",[])] if e.get("authors") else []}
        }
        items.append(item)
    return items

def fetch_api_items(spec: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Generic API fetcher for JSON endpoints. Handles basic pagination if present."""
    url = spec["url"]
    headers = {}
    auth = spec.get("auth", {})
    # demo: no auth or API key header; expand as needed
    if auth.get("type") == "api_key":
        headers[auth["header_name"]] = auth["key"]

    raw = http_get_json(url, headers=headers)
    # Raw can be list or dict with 'items'
    data_items = raw if isinstance(raw, list) else raw.get("items", [])
    normalized = []
    for d in data_items:
        origin = d.get("url") or d.get("id") or url
        normalized.append({
            "id": _make_id(spec.get("name","api"), origin),
            "source": "api",
            "origin": origin,
            "title": d.get("title") or d.get("headline"),
            "text": d.get("body") or d.get("content") or "",
            "summary": None,
            "published_at": d.get("published_at") or d.get("date"),
            "metadata": {"raw": d}
        })
    return normalized

def fetch_local_file(path: str) -> Dict[str, Any]:
    """Simple local file reader; for PDFs you can plug pdfminer or pdfplumber"""
    if not os.path.exists(path):
        return None
    name = os.path.basename(path)
    text = ""
    if path.lower().endswith(".txt") or path.lower().endswith(".md"):
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
    else:
        # fallback - return filename as text; in real use, extract PDF text with pdfminer
        text = f"[binary file content not extracted: {name}]"
    return {
        "id": _make_id("file", path),
        "source": "file",
        "origin": path,
        "title": name,
        "text": text,
        "summary": None,
        "published_at": datetime.utcfromtimestamp(os.path.getmtime(path)).isoformat() + "Z",
        "metadata": {}
    }

def ingest_all(config: Dict[str, Any]) -> List[Dict[str, Any]]:
    out = []
    for rss in config.get("rss", []):
        try:
            out.extend(fetch_rss_feed(rss["url"]))
        except Exception as e:
            print(f"[ingest] failed rss {rss['name']}: {e}")
    for api in config.get("apis", []):
        try:
            out.extend(fetch_api_items(api))
        except Exception as e:
            print(f"[ingest] failed api {api.get('name')}: {e}")
    for f in config.get("files", []):
        try:
            item = fetch_local_file(f["path"])
            if item:
                out.append(item)
        except Exception as e:
            print(f"[ingest] failed file {f.get('path')}: {e}")
    return out
