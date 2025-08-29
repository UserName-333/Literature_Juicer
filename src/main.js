import './style.css'
import { marked } from 'marked'

// 模拟数据
const mockAnalysisData = {
  snapshot: `
## 论文概览

**标题**: Deep Learning for Academic Paper Analysis: A Comprehensive Framework  
**作者**: Zhang Wei, Li Ming, Wang Fei  
**机构**: 清华大学计算机科学与技术系  

### 核心内容
- **研究背景**: 学术论文数量爆炸式增长，传统人工分析效率低下
- **研究目标**: 构建基于深度学习的论文智能分析框架
- **主要贡献**: 
  - 提出了多模态论文理解模型
  - 设计了三维分析评估体系
  - 实现了89.3%的分析准确率

### 关键指标
- **数据集规模**: 100万篇学术论文
- **模型参数**: 175B参数的大型语言模型
- **处理速度**: 平均2分钟/篇论文
`,
  
  methodology: `
## 方法论分析

### 研究设计
采用**混合方法研究设计**，结合定量分析和定性评估：

#### 核心技术架构
1. **文档解析模块**
   - PDF文本提取算法
   - 多模态内容识别
   - 语义结构分析

2. **深度学习模型**
   - Transformer架构
   - 注意力机制优化
   - 迁移学习策略

3. **评估框架**
   - 三维分析体系
   - 量化评分机制
   - 质量控制流程

### 创新点
- **多模态融合**: 文本+图表+公式综合分析
- **层次化理解**: 从句子到段落到全文的递进式分析
- **领域适应**: 跨学科知识迁移能力

### 技术优势
✅ 高精度识别学术内容  
✅ 快速批量处理能力  
✅ 多语言支持  
✅ 可扩展架构设计  
`,
  
  evaluation: `
## 综合评估

### 技术成熟度 ⭐⭐⭐⭐⭐
该研究在技术实现上表现出色：
- **算法创新性**: 提出了多项原创性技术方案
- **工程实现**: 完整的端到端系统架构
- **性能表现**: 在多个benchmark上达到SOTA水平

### 学术价值 ⭐⭐⭐⭐⭐
- **理论贡献**: 丰富了文档智能分析理论体系
- **方法创新**: 多模态学习在学术分析领域的首次应用
- **实证研究**: 大规模实验验证了方法有效性

### 应用前景 ⭐⭐⭐⭐⭐
- **市场需求**: 解决了学术界的真实痛点
- **商业价值**: 具备良好的产业化前景
- **社会影响**: 有助于推动学术研究效率提升

### 局限性分析
- **计算资源**: 对硬件要求较高
- **领域适应**: 某些特殊学科的适应性有待加强
- **数据依赖**: 需要大量高质量标注数据

### 总体评分: 92/100
这是一篇高质量的学术论文，在技术创新、实验设计和应用价值方面都表现出色。建议在计算效率和跨领域泛化能力方面进一步优化。
`
}

// 状态管理
class ChatPaperApp {
  constructor() {
    this.currentStep = 'upload'
    this.selectedLanguage = '中文'
    this.selectedFile = null
    this.analysisProgress = {
      extract: 0,
      snapshot: 0,
      methodology: 0,
      evaluation: 0
    }
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupFileUpload()
    this.setupLanguageSelection()
    this.setupChat()
  }

  setupEventListeners() {
    // 分析按钮
    document.getElementById('analyze-btn').addEventListener('click', () => {
      if (this.selectedFile) {
        this.startAnalysis()
      }
    })

    // 发送消息按钮
    document.getElementById('send-btn').addEventListener('click', () => {
      this.sendMessage()
    })

    // 输入框回车
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage()
      }
    })
  }

  setupFileUpload() {
    const dropZone = document.getElementById('drop-zone')
    const fileInput = document.getElementById('file-input')
    const analyzeBtn = document.getElementById('analyze-btn')

    // 点击上传
    dropZone.addEventListener('click', () => {
      fileInput.click()
    })

    // 文件选择
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (file) {
        this.handleFileSelect(file)
      }
    })

    // 拖拽上传
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault()
      dropZone.classList.add('border-neon-blue', 'bg-slate-800/30')
    })

    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault()
      dropZone.classList.remove('border-neon-blue', 'bg-slate-800/30')
    })

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault()
      dropZone.classList.remove('border-neon-blue', 'bg-slate-800/30')
      
      const files = e.dataTransfer.files
      if (files.length > 0) {
        this.handleFileSelect(files[0])
      }
    })
  }

  handleFileSelect(file) {
    // 文件类型验证
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      this.showNotification('请选择 PDF、DOC、DOCX 或 TXT 格式的文件', 'error')
      return
    }

    // 文件大小验证 (50MB)
    if (file.size > 50 * 1024 * 1024) {
      this.showNotification('文件大小不能超过 50MB', 'error')
      return
    }

    this.selectedFile = file
    
    // 更新UI
    const dropZone = document.getElementById('drop-zone')
    dropZone.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-green-400 text-lg font-semibold">${file.name}</p>
        <p class="text-slate-400 text-sm">${this.formatFileSize(file.size)} • ${file.type.split('/')[1].toUpperCase()}</p>
        <button class="mt-3 text-neon-blue hover:text-white transition-colors" onclick="app.clearFile()">更换文件</button>
      </div>
    `

    // 启用分析按钮
    document.getElementById('analyze-btn').disabled = false
    document.getElementById('analyze-btn').classList.remove('disabled:opacity-50')
    
    this.showNotification('文件上传成功！', 'success')
  }

  clearFile() {
    this.selectedFile = null
    document.getElementById('file-input').value = ''
    document.getElementById('analyze-btn').disabled = true
    
    // 重置上传区域
    const dropZone = document.getElementById('drop-zone')
    dropZone.innerHTML = `
      <div class="text-center">
        <svg class="w-16 h-16 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="text-slate-300 text-lg mb-2">拖拽文件到此处或点击选择</p>
        <p class="text-slate-500 text-sm">最大支持 50MB</p>
      </div>
    `
  }

  setupLanguageSelection() {
    const languageButtons = document.querySelectorAll('.language-btn')
    
    languageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // 移除其他按钮的active状态
        languageButtons.forEach(b => b.classList.remove('active'))
        // 添加当前按钮的active状态
        btn.classList.add('active')
        this.selectedLanguage = btn.dataset.lang
      })
    })
  }

  startAnalysis() {
    // 隐藏上传区域，显示分析区域
    document.getElementById('upload-section').classList.add('hidden')
    document.getElementById('analysis-section').classList.remove('hidden')

    this.showNotification(`开始分析 "${this.selectedFile.name}"`, 'info')

    // 模拟分析过程
    this.simulateAnalysis()
  }

  async simulateAnalysis() {
    const steps = ['extract', 'snapshot', 'methodology', 'evaluation']
    const stepNames = {
      extract: '提取论文内容',
      snapshot: '生成学术快照', 
      methodology: '方法论分析',
      evaluation: '综合评估'
    }

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      const stepElement = document.querySelector(`[data-step="${step}"]`)
      const statusElement = stepElement.querySelector('.step-status')
      const progressElement = stepElement.querySelector('.progress-fill')

      // 更新状态为处理中
      statusElement.textContent = '处理中...'
      statusElement.className = 'step-status text-neon-blue'

      // 模拟进度
      await this.animateProgress(progressElement, 0, 100, 2000)

      // 更新状态为完成
      statusElement.textContent = '✓ 完成'
      statusElement.className = 'step-status text-green-400'

      // 短暂延迟
      await this.delay(500)
    }

    // 分析完成，显示结果
    this.showResults()
  }

  async animateProgress(element, from, to, duration) {
    return new Promise(resolve => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const value = from + (to - from) * progress
        
        element.style.width = `${value}%`
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          resolve()
        }
      }
      animate()
    })
  }

  showResults() {
    // 隐藏分析区域，显示结果
    document.getElementById('analysis-section').classList.add('hidden')
    document.getElementById('results-section').classList.remove('hidden')

    // 渲染分析结果
    document.getElementById('snapshot-content').innerHTML = marked(mockAnalysisData.snapshot)
    document.getElementById('methodology-content').innerHTML = marked(mockAnalysisData.methodology)
    document.getElementById('evaluation-content').innerHTML = marked(mockAnalysisData.evaluation)

    // 显示对话区域
    setTimeout(() => {
      document.getElementById('chat-section').classList.remove('hidden')
      this.showNotification('分析完成！现在可以与论文进行对话了', 'success')
    }, 1000)
  }

  setupChat() {
    // 预设问题按钮
    this.addSuggestedQuestions()
  }

  addSuggestedQuestions() {
    const suggestedQuestions = [
      "这篇论文的主要创新点是什么？",
      "研究方法有哪些优势和局限性？", 
      "实验结果支持作者的结论吗？",
      "这项研究对该领域有什么影响？",
      "论文中提到的未来工作方向有哪些？"
    ]

    // 可以在聊天区域添加建议问题
    setTimeout(() => {
      if (!document.getElementById('chat-section').classList.contains('hidden')) {
        const chatMessages = document.getElementById('chat-messages')
        const suggestionsHtml = `
          <div class="message-bubble message-ai mb-4">
            <div class="flex items-start">
              <div class="w-8 h-8 bg-neon-gradient rounded-full flex items-center justify-center mr-3 mt-1">
                <span class="text-white text-sm">💡</span>
              </div>
              <div>
                <p class="text-slate-300 mb-3">您可以尝试问我这些问题：</p>
                <div class="space-y-2">
                  ${suggestedQuestions.map(q => `
                    <button class="block w-full text-left p-2 bg-slate-800/50 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors" onclick="app.askQuestion('${q}')">
                      ${q}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `
        chatMessages.insertAdjacentHTML('beforeend', suggestionsHtml)
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }, 2000)
  }

  askQuestion(question) {
    document.getElementById('chat-input').value = question
    this.sendMessage()
  }

  async sendMessage() {
    const input = document.getElementById('chat-input')
    const message = input.value.trim()
    
    if (!message) return

    const chatMessages = document.getElementById('chat-messages')

    // 添加用户消息
    this.addMessage(message, 'user')
    input.value = ''

    // 模拟AI思考
    const thinkingMsg = this.addMessage('正在思考...', 'ai', true)

    // 模拟API调用延迟
    await this.delay(1500)

    // 移除思考消息
    thinkingMsg.remove()

    // 生成AI回复
    const aiResponse = this.generateAIResponse(message)
    this.addMessage(aiResponse, 'ai')
  }

  addMessage(content, sender, isTemporary = false) {
    const chatMessages = document.getElementById('chat-messages')
    const messageDiv = document.createElement('div')
    messageDiv.className = `message-bubble ${sender === 'user' ? 'message-user' : 'message-ai'} mb-4`

    if (sender === 'user') {
      messageDiv.innerHTML = `
        <div class="flex items-start justify-end">
          <div class="mr-3">
            <p class="text-white">${content}</p>
          </div>
          <div class="w-8 h-8 bg-neon-blue/30 rounded-full flex items-center justify-center mt-1">
            <span class="text-white text-sm">👤</span>
          </div>
        </div>
      `
    } else {
      messageDiv.innerHTML = `
        <div class="flex items-start">
          <div class="w-8 h-8 bg-neon-gradient rounded-full flex items-center justify-center mr-3 mt-1">
            <span class="text-white text-sm">🤖</span>
          </div>
          <div class="markdown-content text-slate-300">
            ${marked(content)}
          </div>
        </div>
      `
    }

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight

    return messageDiv
  }

  generateAIResponse(question) {
    // 简单的问题匹配和回复生成
    const responses = {
      '创新': '这篇论文的主要创新点包括：\n\n1. **多模态融合技术**：首次将文本、图表和公式进行统一建模\n2. **三维分析框架**：从内容、方法、价值三个维度进行综合评估\n3. **大规模预训练**：基于100万篇论文的深度学习模型\n\n这些创新点使得论文分析的准确率达到89.3%，显著超越了传统方法。',
      
      '方法': '研究方法的分析如下：\n\n**优势：**\n- ✅ 采用了最先进的Transformer架构\n- ✅ 大规模数据训练保证了模型泛化能力\n- ✅ 多模态处理能力强\n\n**局限性：**\n- ⚠️ 计算资源需求较高\n- ⚠️ 对特定领域论文的适应性有待提升\n- ⚠️ 缺乏对论文质量的主观评价维度',
      
      '结果': '实验结果强有力地支持了作者的结论：\n\n- **准确率指标**：在多个benchmark上达到SOTA水平\n- **效率提升**：相比人工分析提升80%的处理速度\n- **用户评价**：85%的专家认为分析结果有价值\n\n数据充分，实验设计合理，结论可信度高。',
      
      '影响': '这项研究对学术界的影响是深远的：\n\n🔬 **学术价值**：推动了AI在学术分析领域的应用\n🏭 **产业影响**：为学术服务平台提供了技术参考\n📚 **教育意义**：帮助研究者更好地理解论文质量评估\n\n预计将在未来3-5年内得到广泛应用。',
      
      '未来': '论文提到的未来工作方向包括：\n\n1. **跨语言支持**：扩展到更多语言的论文分析\n2. **实时分析**：开发流式处理能力\n3. **个性化评估**：根据用户专业背景调整分析维度\n4. **协作分析**：支持多人协同评估\n\n这些方向都具有很好的研究价值和应用前景。'
    }

    // 简单匹配
    for (const [key, response] of Object.entries(responses)) {
      if (question.includes(key)) {
        return response
      }
    }

    // 默认回复
    return `关于您的问题"${question}"，基于我对这篇论文的分析：\n\n这是一篇高质量的学术论文，主要研究了基于深度学习的论文智能分析方法。论文在技术创新、实验设计和应用价值方面都表现出色。\n\n如果您需要了解更具体的内容，请尝试问一些更具体的问题，比如关于研究方法、实验结果或者应用前景等方面。`
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-sm transform translate-x-full transition-transform duration-300`
    
    const colors = {
      success: 'bg-green-500/20 border-green-500/50 text-green-400',
      error: 'bg-red-500/20 border-red-500/50 text-red-400',
      info: 'bg-blue-500/20 border-blue-500/50 text-blue-400'
    }
    
    notification.className += ` ${colors[type]}`
    notification.textContent = message

    document.body.appendChild(notification)

    // 显示动画
    setTimeout(() => {
      notification.classList.remove('translate-x-full')
    }, 100)

    // 自动消失
    setTimeout(() => {
      notification.classList.add('translate-x-full')
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// 添加语言按钮样式
const style = document.createElement('style')
style.textContent = `
  .language-btn {
    @apply px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-300;
    @apply hover:bg-slate-700/50 hover:border-slate-500 hover:text-white;
    @apply transition-all duration-300 cursor-pointer;
  }
  
  .language-btn.active {
    @apply bg-neon-gradient border-neon-blue text-white;
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
  }
`
document.head.appendChild(style)

// 初始化应用
window.app = new ChatPaperApp()

// 添加一些背景动效
document.addEventListener('DOMContentLoaded', () => {
  // 鼠标移动效果
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    
    document.documentElement.style.setProperty('--mouse-x', x)
    document.documentElement.style.setProperty('--mouse-y', y)
  })
})
