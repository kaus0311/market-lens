# core/analysis.py
"""
Minimal analysis module for demo.
Provides:
 - summarize(item, use_openai=False)
 - analyze_and_enrich(item, memory=None)
"""

import os
from typing import Dict, Any, List, Tuple

import re

def strip_html(text: str) -> str:
    return re.sub(r'<[^>]+>', '', text)

def mock_summarize_text(text: str, title: str = None, max_chars: int = 800) -> str:
    clean = strip_html(text or "")
    head = f"Summary of '{title}':\n\n" if title else "Summary:\n\n"
    if len(clean) > max_chars:
        clean = clean[:max_chars] + "\n\n... (truncated) ..."
    return f"{head}{clean}\n\n(--- end of mock summary ---)"


def summarize(item: Dict[str, Any], use_openai: bool = False) -> str:
    """
    Summarize a normalized item.
    Default: deterministic mock. If you want to plug OpenAI, implement here.
    """
    title = item.get("title") or item.get("origin") or "(no title)"
    text = item.get("text") or ""
    # NOTE: keep this simple for demo; swap in real LLM calls if desired
    return mock_summarize_text(text, title=title)

def analyze_and_enrich(item: Dict[str, Any], memory=None) -> Dict[str, Any]:
    """
    Run analysis (summary + optional memory similarity).
    Returns an enriched copy of the item with:
      - summary (str)
      - memory_similar (list of (id,score)) if memory provided
    """
    enriched = dict(item)  # shallow copy
    enriched_summary = summarize(item)
    enriched["summary"] = enriched_summary

    if memory is not None:
        try:
            sims = memory.find_similar(item.get("text") or item.get("title",""), k=3)
            # ensure sims is list of (id,score)
            if isinstance(sims, list):
                enriched["memory_similar"] = sims
            else:
                # fallback: empty list
                enriched["memory_similar"] = []
        except Exception:
            enriched["memory_similar"] = []
    else:
        enriched["memory_similar"] = []

    return enriched
