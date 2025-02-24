#!/bin/bash

echo "开始部署..."

# 1. 拉取最新代码
git pull

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build

# 4. 重启服务
pm2 restart app

echo "部署完成!" 