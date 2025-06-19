import csv
import os
from pymongo import MongoClient
from collections import defaultdict
from dotenv import load_dotenv

# .env.local에서 MONGO_URI 읽기
env_path = '.env.local'
if os.path.exists(env_path):
    load_dotenv(env_path)
MONGO_URI = os.environ.get('MONGO_URI')

client = MongoClient(MONGO_URI)
db = client["skillgo"]
collection = db["tool_reviews"]

# 1. CSV 읽기
tools_data = defaultdict(lambda: {"user_reviews": [], "sample_videos": []})

with open("tools.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        tool = row["tool"]
        # 후기 추가
        if row["user_review_content"]:
            tools_data[tool]["user_reviews"].append({
                "content": row["user_review_content"],
                "source": row["user_review_source"]
            })
        # 샘플 영상 추가
        if row["sample_video_url"]:
            tools_data[tool]["sample_videos"].append({
                "url": row["sample_video_url"],
                "desc": row["sample_video_desc"]
            })

# 2. MongoDB에 upsert
for tool, data in tools_data.items():
    doc = {"tool": tool, **data}
    collection.update_one({"tool": tool}, {"$set": doc}, upsert=True)

print("MongoDB 자동 반영 완료!") 