# Git推送命令

## 推送到GitHub (请替换为您的用户名)
```bash
git remote add origin https://github.com/您的用户名/literature-juicer.git
git branch -M main
git push -u origin main
```

## 推送到GitLab
```bash
git remote add origin https://gitlab.com/您的用户名/literature-juicer.git
git branch -M main
git push -u origin main
```

## 推送到Gitee (国内用户推荐)
```bash
git remote add origin https://gitee.com/您的用户名/literature-juicer.git
git branch -M main
git push -u origin main
```

# 部署选项

## 1. Vercel (推荐 - 免费且快速)
1. 访问 https://vercel.com
2. 用GitHub账号登录
3. 导入您的仓库
4. 自动部署完成！

## 2. Netlify (也很好用)
1. 访问 https://netlify.com
2. 连接您的Git仓库
3. 部署设置：
   - Build command: 留空 (纯静态项目)
   - Publish directory: / (根目录)

## 3. GitHub Pages (免费)
1. 在仓库设置中启用GitHub Pages
2. 选择main分支作为源
3. 访问: https://您的用户名.github.io/literature-juicer

## 4. Surge.sh (简单快速)
```bash
npm install -g surge
surge .
```
