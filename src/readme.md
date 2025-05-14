# 3D 互动述职 Web 项目

> 沉浸式、全3D、AI与实时互动结合的述职/汇报/展示平台

## 项目简介

本项目采用 **React + Three.js (react-three-fiber)** 技术栈，结合 AI 能力（OpenAI）、实时互动（Firebase）、3D动画、粒子、烟花等前沿前端技术，打造极具视觉冲击力和互动性的述职体验。适用于转正述职、项目汇报、个人展示等多种场景。

## 主要特性

- **首页3D动画/粒子/烟雾/AI欢迎语**：沉浸式开场，点击进入主内容
- **个人介绍**：3D人物/卡片/时间轴，交互动画
- **项目成果**：3D空间悬浮卡片，点击展开详情，AI自动摘要
- **AI互动**：观众可输入问题，AI实时答复
- **实时互动**：Firebase 实时评论区，观众扫码参与
- **未来规划**：3D时间轴/路线图，节点可交互
- **结尾**：3D烟花/粒子，AI祝福语，支持返回首页

## 技术栈

- React 18
- Three.js + @react-three/fiber + @react-three/drei
- Tailwind CSS
- OpenAI API (可选)
- Firebase Realtime Database
- Vite

## 快速开始

1. **克隆项目并安装依赖**

   ```bash
   git clone <your-repo-url>
   cd my-showcase
   npm install
   ```

2. **配置 Firebase**

   - 在 [Firebase 控制台](https://console.firebase.google.com/) 创建项目，开通 Realtime Database
   - 将你的 `firebaseConfig` 填入 `src/components/RealtimePanel.tsx`

3. **（可选）配置 OpenAI API Key**

   - 在 `src/components/AIChat.tsx` 填入你的 OpenAI API Key
   - 建议用 `.env` 管理，或用后端代理保护 Key

4. **运行项目**

   ```bash
   npm run dev
   ```

   打开浏览器访问 [http://localhost:5173](http://localhost:5173)

## 目录结构
src/
components/
Home3D.tsx # 首页3D动画/粒子/AI欢迎语
Profile3D.tsx # 个人介绍3D人物/时间轴
Projects3DSpace.tsx# 项目成果3D空间卡片
AIChat.tsx # AI互动问答
RealtimePanel.tsx # 实时评论区
Timeline3D.tsx # 未来规划3D时间轴
Fireworks3D.tsx # 结尾烟花/AI祝福
App.tsx # 页面路由与导航
index.css # 全局样式


## 主要页面与交互

- **首页**：3D星空/粒子背景，AI欢迎语，点击进入
- **个人介绍**：3D人物/时间轴，节点悬停/点击动画
- **项目成果**：3D空间卡片，点击弹窗详情，AI摘要
- **AI互动**：输入问题，AI实时答复
- **实时互动**：评论区，所有观众实时同步
- **未来规划**：3D时间轴，节点弹窗详情
- **结尾**：3D烟花，AI祝福语，返回首页

## 部署

1. 构建静态文件

   ```bash
   npm run build
   ```

2. 部署 `dist/` 目录到任意静态服务器（如 Vercel、Netlify、GitHub Pages、阿里云OSS等）

## 亮点与创新

- 全3D交互，动画流畅，视觉冲击力强
- AI能力与实时互动结合，极具现代感
- 代码结构清晰，易于扩展和二次开发
- 支持移动端适配

## 致谢

- [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Firebase](https://firebase.google.com/)
- [OpenAI](https://platform.openai.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

> 如需定制更多互动/可视化/AI功能，欢迎联系作者！