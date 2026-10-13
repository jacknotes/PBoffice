# PBoffice · 企业官网模板

深色科技风 + 品牌红点缀的企业官网静态模板（首发用于「绍兴芃博网络科技有限公司」：智慧安防 · 弱电工程 · LED显示屏服务商）。纯 HTML/CSS/JS，零依赖、无构建步骤，复制即用。

> 模板特色：内置「换站标记」体系，做新站时按标记逐项替换即可，无需理解全部代码。

## 项目结构

```
PBoffice/
├── index.html          # 页面结构与全部文案（含换站清单注释）
├── css/
│   └── style.css       # 样式（顶部 :root 为配色主题变量）
├── js/
│   └── main.js         # 交互：导航高亮 / Tab切换 / 滚动动画 / 数字滚动
└── assets/
    └── wechat-qr.jpg   # 微信二维码（换站时替换）
```

## 页面板块

首屏（大标题 + CTA + 数据统计）→ 业务体系（Tab 切换）→ 行业方案 → 服务优势 + 服务流程 → 项目案例 → 合作伙伴 → 联系我们 → 页脚（含 ICP 备案占位）

## 本地预览

方式一：直接双击 `index.html`（纯静态，无接口依赖）

方式二：本地起服务（任选其一）

```bash
# Python
python -m http.server 8080
# Node
npx serve .
# PowerShell（无 Python/Node 时）
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```

## 线上部署

纯静态站点，将整个文件夹上传至任意服务器即可（Nginx / IIS / 虚拟主机 / GitHub Pages），无需数据库与运行环境。

Nginx 参考配置：

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/pboffice;
    index index.html;
}
```

## 换站指南（复用模板做新站）

1. 复制整个项目文件夹，按新站命名
2. 用编辑器打开 `index.html`，`Ctrl+F` 搜索「换站」，按文件头部「换站清单」逐项替换（共 13 类）：
   - SEO（title / description / keywords）
   - 站名 Logo（顶栏 + 页脚）、公司全称
   - 服务热线 / 邮箱 / 地址（各 2~4 处，标记带序号防遗漏）
   - 微信二维码（`assets/wechat-qr.jpg`）
   - 首屏统计数字（`data-count` 属性）
   - 业务 Tab / 行业方案 / 优势 / 案例 / 合作伙伴
   - 页脚简介与 ICP 备案号
3. 换配色：改 `css/style.css` 顶部 `:root` 变量（`--bg` 系背景、`--red` 系品牌色），同步改 favicon 的 `fill` 颜色
4. 图片：当前为 AI 生成占位图，正式站替换为实拍图

## 说明

- 首屏统计数字与案例均为**占位内容**，上线前请替换为真实数据
- 合作伙伴 Logo 需有实际合作授权方可展示
- 上线前请完成 ICP 备案并替换页脚占位号
- 响应式适配桌面 / 平板 / 手机，动画遵循 `prefers-reduced-motion`
