#!/bin/bash

# 检查是否有未提交的更改
if [[ $(git status -s) ]]; then
  echo "Error: 有未提交的更改"
  exit 1
fi

# 运行测试
npm run test
if [ $? -ne 0 ]; then
  echo "Error: 测试未通过"
  exit 1
fi

# 更新版本号
npm version $1

# 生成更新日志
npm run changelog

# 提交更改
git add CHANGELOG.md
git commit -m "docs: 更新更新日志"

# 创建标签
VERSION=$(node -p "require('./package.json').version")
git tag -a v$VERSION -m "Release version $VERSION"

# 推送到远程
git push origin main --tags 