# core/output.py
import os
import uuid
from datetime import datetime

def make_memo(analyses: list, goal: str = "Research memo") -> dict:
    """Combine analyses into a single markdown memo object."""
    now = datetime.utcnow().strftime("%Y-%m-%dT%H%M%SZ")
    title = f"{goal} - {now}"
    body_parts = []
    for a in analyses:
        item = a.get("item") if "item" in a else None
        summary = a.get("summary") or a.get("item",{}).get("summary") or ""
        if item:
            header = f"### {item.get('title')}\n\nSource: {item.get('origin')}\n\n"
        else:
            header = ""
        mem = header + summary
        body_parts.append(mem)
    body = "\n\n---\n\n".join(body_parts)
    memo_id = "memo:" + uuid.uuid4().hex
    return {"id": memo_id, "title": title, "content": f"# {title}\n\n{body}\n", "created_at": now}

def write_memo_file(memo: dict, path_dir: str = "outputs/memos"):
    os.makedirs(path_dir, exist_ok=True)
    fname = f"{memo['id'].replace(':','_')}.md"
    path = os.path.join(path_dir, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(memo["content"])
    return path

def log_action(memo: dict, explain: dict = None, path: str = "outputs/logs/actions.log"):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "a", encoding="utf-8") as f:
        ts = datetime.utcnow().isoformat() + "Z"
        f.write(f"{ts} | memo_id={memo.get('id')} title={memo.get('title')}\n")
        if explain:
            f.write(f"EXPLAIN: {explain}\n")
    return
