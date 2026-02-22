# agents/agent_main.py
import os
import json
import yaml
from core import ingest, decision, analysis, output, memory, scheduler

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "../configs/sources.yml")

def load_config(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def demo():
    #initiatize mem and cfg
    cfg = load_config(CONFIG_PATH)
    mem = memory.SimpleMemory()
    print("[agent] Ingesting sources...")

    #ingest-check
    items = ingest.ingest_all(cfg)
    print(f"[agent] Ingested {len(items)} items.")

    #saving items to mem
    for it in items:
        mem.save_item(it)
    print("[agent] Scoring items...")
    keywords = ["research", "ai", "machine learning", "llm"]  # demo goal keywords - tune as you like

    #decision check (scoring relevance)
    scored = decision.score_relevance(items, keywords, memory=mem)
    top = decision.select_top(scored, k=3)
    analyses = []
    for s in top:
        it = s["item"]
        enriched = analysis.analyze_and_enrich(it, memory=mem)
        analyses.append({"item": it, "summary": enriched.get("summary"), "score": s["score"], "explain": s["explain"]})
    memo = output.make_memo(analyses, goal="Autonomous Research Agent Memo")
    path = output.write_memo_file(memo)
    print(f"[agent] Wrote memo to {path}")
    output.log_action(memo, explain={"selected": [t['item']['id'] for t in top]})

    # Persist memo to memory
    mem.save_memo(memo["id"], memo["title"], memo["content"])
    print("[agent] Demo run complete.")
    mem.close()

if __name__ == "__main__":
    # for single agent. will switch to scheduler.py and coordinator for managing multiple agents at once
    demo()
