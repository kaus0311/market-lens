# core/memory.py
import sqlite3
import os
import time
from typing import List, Tuple

DB_PATH = os.environ.get("MEMORY_DB", "outputs/memory.sqlite")

class SimpleMemory:
    """Minimal, reliable memory used for demos."""
    def __init__(self, db_path: str = DB_PATH):
        os.makedirs(os.path.dirname(db_path) or ".", exist_ok=True)
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self._ensure_tables()

    def _ensure_tables(self):
        c = self.conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id TEXT PRIMARY KEY,
                title TEXT,
                text TEXT,
                created_at REAL
            )
        """)
        c.execute("""
            CREATE TABLE IF NOT EXISTS memos (
                id TEXT PRIMARY KEY,
                title TEXT,
                content TEXT,
                created_at REAL
            )
        """)
        self.conn.commit()

    def save_item(self, item: dict):
        c = self.conn.cursor()
        c.execute(
            "INSERT OR REPLACE INTO items (id, title, text, created_at) VALUES (?,?,?,?)",
            (item.get("id"), item.get("title"), item.get("text"), time.time())
        )
        self.conn.commit()

    def save_memo(self, memo_id: str, title: str, content: str):
        c = self.conn.cursor()
        c.execute("INSERT OR REPLACE INTO memos (id, title, content, created_at) VALUES (?,?,?,?)",
                  (memo_id, title, content, time.time()))
        self.conn.commit()

    def list_memos(self) -> List[Tuple[str,str]]:
        c = self.conn.cursor()
        c.execute("SELECT id, title FROM memos ORDER BY created_at DESC")
        return c.fetchall()

    def find_similar(self, text: str, k: int = 3) -> List[Tuple[str, float]]:
        # super-simple fallback: returns empty list (no similarity)
        # keeps decision logic workable without sklearn or embeddings
        return []
    
    def close(self):
        self.conn.close()
