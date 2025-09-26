# 文献榨汁机 - 智能论文分析系统

用于探索 AI & RAG 领域的工程实践。

# 体验地址

https://username-333.github.io/Literature_Juicer/

## 🚀 特性

- 🎨 **科幻美学设计** - 霓虹灯效果、渐变背景、动画交互
- 📄 **智能文件上传** - 支持拖拽、文件验证、进度显示
- 🔬 **三维分析展示** - 学术快照、方法透视、综合评估
- 💬 **智能对话交互** - 模拟AI对话，支持预设问题
- 📱 **响应式设计** - 适配各种屏幕尺寸
- ⚡ **流畅动画** - 使用CSS动画和JavaScript交互

## 🛠️ 技术栈

- **前端框架**: Vanilla JavaScript (ES6+)
- **构建工具**: Vite
- **样式框架**: TailwindCSS
- **图标库**: Lucide Icons
- **Markdown渲染**: Marked.js
- **字体**: Orbitron (科幻字体) + Fira Code (等宽字体)

## 📦 项目结构

```
literature-juicer/
├── index.html              # 入口选择页面  
├── start.html              # 主应用页面
├── 文献榨汁机.html           # 产品宣传页面
├── ChatPaper (1).yml       # Dify工作流配置文件
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── tailwind.config.js      # TailwindCSS配置
├── postcss.config.js       # PostCSS配置
├── .gitignore             # Git忽略文件
├── deploy-commands.md      # 部署命令指南
└── src/
    ├── main.js            # 主要JavaScript逻辑
    └── style.css          # 自定义样式和TailwindCSS
```

## 🚀 快速开始

### 方式一：直接运行（推荐）
项目是纯静态网站，可以直接在浏览器中打开：

```bash
# 直接打开入口页面
open index.html
# 或者直接访问主应用
open start.html
# 或者查看产品介绍
open 文献榨汁机.html
```

### 方式二：本地服务器（可选）

```bash
# 使用Python启动本地服务器
python -m http.server 8000
# 或使用Node.js
npx serve .
# 然后访问 http://localhost:8000
```

### 开发环境（如需修改样式）

```bash
npm install
npm run dev
```

## 🎮 使用说明

### 1. 上传论文
- 点击或拖拽上传PDF、DOC、DOCX、TXT格式的文件
- 选择分析语言（中文、英文、日语、法语、德语）
- 点击"开始AI分析"按钮

### 2. 查看分析进度
- 实时显示四个分析步骤的进度
- 每个步骤都有动画进度条和状态提示

### 3. 浏览分析结果
- **学术快照**: 论文基本信息和核心内容
- **方法透视**: 详细的方法论分析
- **综合评估**: 多维度质量评估

### 4. 与论文对话
- 在聊天区域提问关于论文的任何问题
- 支持预设问题快速提问
- AI会基于分析结果给出专业回答

## 🎨 设计特色

### 色彩主题
- **主色调**: 深蓝色科技风 (`cyber` 色系)
- **强调色**: 霓虹蓝 (`#00d4ff`)、霓虹紫 (`#a855f7`)、霓虹绿 (`#22d3ee`)
- **背景**: 深色渐变背景配合模糊光晕效果

### 动画效果
- **悬浮动画**: 图标和卡片的微动效果
- **发光效果**: 按钮和边框的霓虹灯效果
- **扫描线**: 顶部的移动扫描线
- **进度动画**: 平滑的进度条填充动画
- **过渡效果**: 页面状态切换的流畅过渡

### 交互体验
- **文件拖拽**: 直观的文件上传体验
- **实时反馈**: 操作状态的即时提示
- **响应式按钮**: 悬停和点击的视觉反馈
- **自动滚动**: 聊天消息的自动滚动

## 📊 模拟数据

项目包含完整的模拟数据，展示了一篇关于"Deep Learning for Academic Paper Analysis"的论文分析结果：

- **论文信息**: 标题、作者、机构等基本信息
- **技术指标**: 数据集规模、模型参数、处理速度等
- **方法分析**: 研究设计、核心技术、创新点评估
- **综合评价**: 技术成熟度、学术价值、应用前景等

## 🔧 自定义配置

### 修改颜色主题
在 `tailwind.config.js` 中修改 `colors` 配置：

```javascript
colors: {
  cyber: { /* 自定义cyber色系 */ },
  neon: {
    blue: '#00d4ff',    // 霓虹蓝
    purple: '#a855f7',  // 霓虹紫
    green: '#22d3ee',   // 霓虹绿
    pink: '#ec4899'     // 霓虹粉
  }
}
```

### 添加新的动画
在 `src/style.css` 中添加自定义动画：

```css
@keyframes yourAnimation {
  /* 动画定义 */
}

.your-element {
  animation: yourAnimation 2s ease-in-out infinite;
}
```

### 修改模拟数据
在 `src/main.js` 中修改 `mockAnalysisData` 对象来更改展示内容。

## 🌟 未来扩展

这个界面框架为将来集成真实的Dify API做好了准备：

1. **API集成点**: `startAnalysis()` 和 `sendMessage()` 方法
2. **状态管理**: 完整的应用状态管理架构
3. **错误处理**: 预留了错误处理和重试机制
4. **数据流**: 清晰的数据流转和状态更新逻辑

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交问题和功能请求！

---

## 🌐 部署指南

### 在线部署（推荐方案）

#### 1. Vercel部署（最简单）
1. 访问 [vercel.com](https://vercel.com)
2. 用GitHub账号登录
3. 点击"Import Project"导入您的仓库
4. 直接部署，无需配置

#### 2. Netlify部署
1. 访问 [netlify.com](https://netlify.com)
2. 连接GitHub仓库
3. 部署设置：
   - Build command: 留空
   - Publish directory: `/` (根目录)

#### 3. GitHub Pages
1. 仓库设置 → Pages
2. Source选择"Deploy from a branch"
3. Branch选择"main"
4. 访问: `https://您的用户名.github.io/仓库名`

#### 4. Surge.sh（命令行部署）
```bash
npm install -g surge
surge .
```

### 自定义域名
在Vercel/Netlify中可以轻松绑定自定义域名，支持免费SSL证书。

---

**注意**: 这是一个演示版本，使用模拟数据。要连接真实的Dify API，需要实现后端代理服务和API调用逻辑。
