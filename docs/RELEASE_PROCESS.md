# 版本发布规范

## 版本号规则
- 主版本号：重大更新，不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修复

## 发布流程
1. 预发布检查
   - [ ] 所有自动化测试通过
   - [ ] 文档更新完成
   - [ ] 性能指标达标
   - [ ] 安全检查通过

2. 发布步骤
   ```bash
   # 1. 更新版本号
   npm version patch/minor/major
   
   # 2. 生成更新日志
   npm run changelog
   
   # 3. 创建发布标签
   git tag -a v1.x.x -m "Release version 1.x.x"
   
   # 4. 推送到远程
   git push origin main --tags
   ```

3. 发布后验证
   - [ ] 生产环境功能验证
   - [ ] 监控系统正常
   - [ ] 错误追踪正常 