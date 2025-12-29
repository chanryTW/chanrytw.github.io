# chanryPortfolioV2

![Demo](public/image/demo.png)

Chanry 的個人網站，第二代版本（2025）

## ✨ 特色

- ⚡ **高效能架構**：採用 Code Splitting 與 Lazy Loading
- 🎨 **GSAP 動畫**：結合 ScrollTrigger 打造敘事體驗
- 🌐 **多語系支援**：中文 / 英文 / 日文切換
- 🎯 **現代化技術棧**：React 18 + TypeScript + Vite
- 📱 **響應式設計**：支援所有裝置尺寸
- 🚀 **效能優化**：
  - 頁面級別的 Code Splitting
  - React.lazy() + Suspense 按需加載
  - 自訂 Loading Fallback 組件

## 🛠️ 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | React 18.3+ |
| 語言 | TypeScript |
| 建構工具 | Vite |
| 路由 | React Router DOM v6 |
| 動畫 | GSAP + @gsap/react, Framer Motion |
| 3D | Three.js + React Three Fiber |
| 樣式 | TailwindCSS |
| 國際化 | i18next + react-i18next |

## 🚀 快速開始（本機開發）

1. **取得專案**

```bash
git clone https://github.com/chanryTW/chanryPortfolioV2.git
cd chanryPortfolioV2
```

2. **安裝套件**

```bash
npm install
# 或者使用 yarn
yarn
```

3. **啟動開發伺服器**

```bash
npm run dev
# 或者
yarn dev
```

開啟瀏覽器並訪問 `http://localhost:3000`

## 📦 常用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動本機開發伺服器 |
| `npm run build` | 建置生產版本 |
| `npm run preview` | 預覽生產版本 |
| `npm run deploy` | 部署到 GitHub Pages |

## 📁 專案結構

```
chanryPortfolioV2/
├── index.html              # HTML 入口
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── package.json           # 專案依賴
├── public/                # 靜態資源
│   └── locales/          # 多語系檔案 (JSON)
│       ├── en.json       # 英文
│       ├── zh.json       # 繁體中文
│       └── ja.json       # 日文
└── src/                   # 原始碼
    ├── App.tsx            # 主應用 (路由 + Lazy Loading)
    ├── index.tsx          # React 入口點
    ├── i18n.ts            # 國際化配置 (HTTP Backend)
    ├── types.ts           # TypeScript 型別定義
    ├── constants.ts       # 常數定義
    ├── pages/            # 頁面組件 (Lazy Loaded)
    │   ├── Home.tsx      # 首頁
    │   └── StoryPage.tsx # GSAP 動畫故事頁
    ├── sections/         # 首頁區塊組件
    │   ├── Hero.tsx      # 英雄區塊
    │   ├── About.tsx     # 關於區塊
    │   ├── Experience.tsx # 經歷區塊
    │   ├── Skills.tsx    # 技能區塊
    │   ├── Works.tsx     # 作品區塊
    │   └── Contact.tsx   # 聯絡區塊
    └── components/       # 通用組件
        ├── NavBar.tsx    # 導航欄
        ├── Footer.tsx    # 頁尾
        ├── Globe3D.tsx   # 3D 地球
        ├── ParticleBackground.tsx
        └── ui/          # 可重用 UI 組件
            ├── GlassCard.tsx
            ├── RevealOnScroll.tsx
            └── SectionTitle.tsx
```

## 🎯 頁面路由

| 路徑 | 組件 | 說明 |
|------|------|------|
| `/` | Home | 主頁面（Portfolio） |
| `/story` | StoryPage | GSAP 滾動敘事動畫頁 |

## ⚡ 效能優化策略

1. **Code Splitting**：使用 React.lazy() 將不同頁面分割成獨立的 chunk
2. **Lazy Loading**：按需加載頁面組件，減少初始加載時間
3. **Suspense**：提供優雅的載入狀態
4. **Tree Shaking**：Vite 自動移除未使用的代碼

## 📄 授權

個人專案，僅供參考學習使用。