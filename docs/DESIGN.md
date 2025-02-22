# 设计规范文档

## 颜色系统
```css
:root {
  /* 主色 */
  --primary: #007AFF;      /* 按钮、重要操作 */
  --primary-light: #47A1FF;/* 悬停状态 */
  --primary-dark: #0055B8; /* 点击状态 */

  /* 中性色 */
  --bg: #FFFFFF;           /* 背景 */
  --text: #333333;        /* 主要文本 */
  --text-secondary: #666666; /* 次要文本 */
  --border: #E5E5E5;      /* 边框 */

  /* 功能色 */
  --success: #34C759;     /* 成功 */
  --error: #FF3B30;       /* 错误 */
  --warning: #FFCC00;     /* 警告 */
}
```

## 字体系统
```css
:root {
  /* 字体家族 */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* 字号 */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;

  /* 行高 */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-loose: 1.75;
}
```

## 间距系统
```css
:root {
  /* 间距 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

## 动画系统
```css
:root {
  /* 过渡 */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}
```

## 组件规范

### 1. 按钮
```css
.button {
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: var(--transition-fast);
}

.button:hover {
  background: var(--primary-light);
}
```

### 2. 输入框
```css
.input {
  padding: var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
}
```

### 3. 加载状态
```css
.loading {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}
```

### 4. 错误提示
```css
.error {
  color: var(--error);
  font-size: var(--text-sm);
  padding: var(--space-sm);
}
``` 