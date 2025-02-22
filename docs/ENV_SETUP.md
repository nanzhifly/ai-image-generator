# 环境配置指南

## 本地开发环境

1. 初始配置
```bash
# 拉取环境变量
vercel env pull .env

# 验证配置
node scripts/api-test.js
```

2. 环境变量说明
- DEEPSEEK_API_KEY: DeepSeek API 密钥
- 其他环境变量...

3. 注意事项
- 不要提交 .env 文件
- 保持与 Vercel 环境同步
- 定期更新本地配置

## 环境同步

1. 更新本地环境
```bash
# 方式一：拉取所有环境变量
vercel env pull .env

# 方式二：获取单个变量
vercel env get DEEPSEEK_API_KEY
```

2. 验证配置
```bash
# 运行测试脚本
node scripts/api-test.js
```

3. 同步检查清单
- [ ] .env 文件存在
- [ ] API key 格式正确
- [ ] 测试脚本通过
- [ ] 本地调用成功

## 最佳实践

1. 环境管理
- 使用 .env 文件
- .gitignore 忽略配置
- 定期同步环境

2. 安全建议
- 不共享 API 密钥
- 定期轮换密钥
- 环境隔离

3. 故障排除
- 检查 .env 文件
- 验证 API key
- 查看错误日志 