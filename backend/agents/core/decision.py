# core/decision.py
from typing import List, Dict, Any
from datetime import datetime, timezone
import math

# Example scoring weights (tuneable)
KEYWORD_WEIGHT = 10.0
RECENCY_WEIGHT = 1.0
NOVELTY_WEIGHT = 20.0

def _parse_time(ts):
    if not ts:
        return None
    try:
        return datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except Exception:
        try:
            # feedparser-style timestamps might not be iso; ignore for demo
            return None
        except Exception:
            return None

def score_relevance(items: List[Dict[str, Any]], goal_keywords: List[str], memory=None) -> List[Dict[str, Any]]:
    """
    Score items by:
      - keyword matches (title + text)
      - recency (published_at)
      - novelty (if memory provided, memory.find_similar returns similarity)
    Returns list of dicts: {"item": item, "score": float, "explain": {...}}
    """
    scored = []
    now = datetime.now(timezone.utc)
    for it in items:
        text = (it.get("title","") + " " + it.get("text","")).lower()
        kw_score = 0.0
        matches = []
        for k in goal_keywords:
            if k.lower() in text:
                kw_score += KEYWORD_WEIGHT
                matches.append(k)
        recency_score = 0.0
        pub = _parse_time(it.get("published_at"))
        if pub:
            # recency in days; more recent => higher score
            delta = (now - pub).total_seconds() / (3600*24)
            recency_score = RECENCY_WEIGHT * max(0.0, 30.0 - delta) / 30.0  # decays over 30 days
        novelty_score = NOVELTY_WEIGHT
        novelty_sim = None
        if memory is not None:
            # memory.find_similar returns list of (id,score) where score in [0,1] (1 = identical)
            sims = memory.find_similar(it.get("text","") or it.get("title",""), k=1)
            if sims:
                novelty_sim = sims[0][1]
                novelty_score = NOVELTY_WEIGHT * (1.0 - novelty_sim)  # penalize high similarity
        total = kw_score + recency_score + novelty_score
        explain = {"keywords_matched": matches, "kw_score": kw_score, "recency_score": recency_score, "novelty_sim": novelty_sim, "novelty_score": novelty_score}
        scored.append({"item": it, "score": total, "explain": explain})
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored

def select_top(scored_items: List[Dict[str, Any]], k: int = 3):
    return scored_items[:k]
