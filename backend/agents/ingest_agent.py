# agents/ingest_agent.py

#agents for multi-agent architecture orhcestrated using coordinator agent
import yaml
import os
from core import ingest

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "../configs/sources.yml")

def load_config(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def main():
    cfg = load_config(CONFIG_PATH)
    print("[agent] starting ingest run")
    items = ingest.ingest_all(cfg)
    print(f"[agent] fetched {len(items)} items")
    for i, it in enumerate(items[:5]):
        print(f" - {i+1}. {it['title'][:80]} ({it['source']})")
        
    # For demo: write normalized items to outputs/ for downstream modules to pick up
    os.makedirs("outputs/ingest", exist_ok=True)
    import json
    with open("outputs/ingest/items.json", "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print("[agent] items written to outputs/ingest/items.json")

if __name__ == "__main__":
    main()
