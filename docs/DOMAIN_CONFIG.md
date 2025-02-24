# 域名配置和部署说明

## 域名配置
### 1. 域名注册
- 域名：deepseek-image.com（示例）
- 注册商：Namecheap/GoDaddy 等
- 域名类型：.com/.net/.org

### 2. DNS 配置
```nginx
# A 记录
@  A  服务器IP
www  A  服务器IP

# CNAME 记录（如果需要）
api  CNAME  api.deepseek-image.com
```

## Nginx 配置
```nginx
server {
    listen 80;
    server_name deepseek-image.com www.deepseek-image.com;

    root /var/www/deepseek-image-generator;
    index index.html;

    # API 代理
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 静态文件缓存
    location /static/ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## SSL 配置（HTTPS）
```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d deepseek-image.com -d www.deepseek-image.com
```

## 部署步骤
1. 配置域名 DNS
2. 设置 Nginx 配置
3. 配置 SSL 证书
4. 部署应用代码
5. 测试访问 