#!/bin/bash

# 获取端口号
PORT=3000

# 测试图片生成
echo "测试图片生成..."
curl -X POST "http://localhost:$PORT/api/generate" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A cute dog","style":"photo"}'

echo -e "\n\n测试监控指标..."
curl "http://localhost:$PORT/api/metrics" 