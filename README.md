# 沉浸式3D互动述职演示项目

本项目是一款基于 React、Three.js、等前沿技术打造的沉浸式3D述职演示系统。通过3D可视化、实时互动等功能，为述职场景带来极具视觉冲击力和参与感的全新体验。

## 技术栈

- **前端框架**：React + TypeScript
- **3D渲染**：Three.js（react-three-fiber）
- **构建工具**：Vite
- **样式**：CSS/SCSS/Tailwind CSS

## 主要功能模块

1. **首页与开场动画**
   - 3D动画与视觉特效营造沉浸式开场氛围，点击进入主内容区。
2. **个人简介与成长时间轴**
   - 以3D时间轴方式展示个人成长经历，节点可交互查看详细内容。
3. **项目成果展示**
   - 3D空间悬浮卡片展示项目成果，点击可展开详情。
4. **项目成果总结**
   - AI自动为每个项目生成摘要，帮助快速了解核心价值。
5. **成长目标时间轴/未来规划**
   - 以3D时间轴/路线图形式展示未来规划和阶段性目标。
6. **反思与总结**
   - 通过问答与AI总结，对成长过程和项目进行反思与总结。
7. **致谢**
   - 结尾烟花动画与AI祝福语，表达感谢与美好祝愿。

## 目录结构

```
my-showcase/
├── public/                # 静态资源
├── src/                   # 源码目录
│   ├── components/        # 组件（如Home3D, Profile3D, Projects3DSpace等）
│   ├── pages/             # 页面（如有）
│   ├── assets/            # 图片、模型等资源
│   ├── utils/             # 工具函数
│   ├── ai/                # AI相关逻辑
│   └── ...                # 其他
├── my-showcase/11.md      # 述职脚本/演示文案
├── README.md              # 项目说明文档
├── package.json           # 依赖与脚本
├── tsconfig.json          # TypeScript配置
└── vite.config.ts         # Vite配置
```

## 快速开始

1. **安装依赖**

   ```bash
   npm install
   # 或
   yarn install
   ```

2. **本地运行**

   ```bash
   npm run dev
   # 或
   yarn dev
   ```

3. **打包构建**

   ```bash
   npm run build
   # 或
   yarn build
   ```

4. **预览生产环境**

   ```bash
   npm run preview
   # 或
   yarn preview
   ```

## 部署到 GitHub Pages

本项目支持一键部署到 GitHub Pages，步骤如下：

1. **安装 gh-pages 依赖**

   ```bash
   npm install gh-pages --save-dev
   # 或
   yarn add gh-pages --dev
   ```

2. **配置 `vite.config.ts`**

   ```ts
   // vite.config.ts
   export default defineConfig({
     // ...其他配置
     base: '/my-showcase/', // 注意替换为你的仓库名
   })
   ```

3. **在 `package.json` 中添加部署脚本和 homepage 字段**

   ```json
   {
     "homepage": "https://<你的GitHub用户名>.github.io/my-showcase",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **构建并部署**

   ```bash
   npm run deploy
   # 或
   yarn deploy
   ```

5. **在 GitHub 仓库设置 Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 `gh-pages` 分支，目录为 `/ (root)`
   - 保存后等待几分钟，访问 `https://<你的GitHub用户名>.github.io/my-showcase/`

> 如需自定义域名，可在 Pages 设置中配置 Custom domain。

## 亮点特色

- **3D可视化**：全流程3D动画与交互，沉浸式体验。
- **实时互动**：增强观众参与感。
- **可扩展性强**：支持多种述职、展示、互动场景扩展。

## 适用场景

- 个人/团队述职
- 项目成果展示
- 年会/路演/招聘宣讲
- 其他需要沉浸式互动演示的场合

## 交流与反馈

如需了解更多技术细节、实现方式或扩展应用，欢迎随时交流！

---

# React + TypeScript + Vite

本模板为 React 在 Vite 中的最小化配置，支持 HMR（热模块替换）和部分 ESLint 规则。

目前官方推荐两种插件：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)：基于 [Babel](https://babeljs.io/) 实现 Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)：基于 [SWC](https://swc.rs/) 实现 Fast Refresh

## 扩展 ESLint 配置

如果你在开发生产级应用，建议升级配置以启用类型感知的 lint 规则：

```js
export default tseslint.config({
  extends: [
    // 移除 ...tseslint.configs.recommended，替换为如下配置
    ...tseslint.configs.recommendedTypeChecked,
    // 或者使用更严格的规则
    ...tseslint.configs.strictTypeChecked,
    // 可选，添加风格化规则
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // 其他选项...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

你也可以安装 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) 来获得 React 相关的 lint 规则：

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // 添加 react-x 和 react-dom 插件
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // 其他规则...
    // 启用其推荐的 typescript 规则
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
