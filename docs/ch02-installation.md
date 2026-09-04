---
last_update:
  date: 2026-09-04
  author: 手册维护
---

# 第 2 章：安装与部署

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官网下载页（https://geolibre.app/downloads/）、Getting Started（https://geolibre.app/getting-started/）、GitHub README
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测
> 手册内容最后更新：2026-09-04（对照 GeoLibre v2.9.0）

## 2.1 系统要求

GeoLibre 在四个平台上运行，各平台的系统要求如下：

### Web 版

Web 版无需安装，对系统要求最低：[已核实] https://geolibre.app/

- **浏览器**：Chrome、Firefox、Safari、Edge（最新两个主版本）
- **WebAssembly 支持**：必需（DuckDB-WASM 和 Pyodide 依赖 WASM）
- **WebGL 支持**：必需（MapLibre GL JS 依赖 WebGL 渲染）
- **内存**：建议 4GB 以上（处理大型 GeoParquet 或 COG 文件时需要更多）
- **网络**：首次加载需下载约 50-100MB 的静态资源（含 DuckDB-WASM、Pyodide 等）

### 桌面端

| 平台 | 最低要求 | 推荐配置 |
|------|----------|----------|
| Windows | Windows 10+，x64 | Windows 11，8GB RAM |
| macOS | macOS 12+ (Intel/Apple Silicon) | macOS 14+，8GB RAM |
| Linux | 支持 AppImage 的 x64 发行版 | Ubuntu 22.04+，8GB RAM |

[推断] 以上配置基于 Tauri v2 的已知系统要求和 GeoLibre 的功能特性推导，官网未明确列出硬件配置表。

### Android

- **系统**：Android 8.0 (API 26) 或更高版本
- **架构**：arm64-v8a、armeabi-v7a（per-ABI 构建）
- **存储**：约 40MB APK，额外缓存空间取决于使用场景
- **来源**：Google Play 商店

[已核实] https://geolibre.app/android/ https://play.google.com/store/apps/details?id=org.geolibre.app

## 2.2 Web 版（零安装）


![GeoLibre Web 版主界面](/img/ch02/ch02-01.png)
*Web 端主界面全貌，零安装即可使用*


Web 版是体验 GeoLibre 最快的方式，无需任何安装步骤。

### 2.2.1 直接访问


![左侧浏览器面板](/img/ch02/ch02-02.png)
*左侧浏览器面板展开状态*


打开浏览器，访问以下 URL：

```
https://web.geolibre.app
```

[已核实] https://geolibre.app/

首次加载时，浏览器会下载 DuckDB-WASM、Pyodide 和其他依赖包，耗时约 10-30 秒（取决于网络速度）。后续访问会使用浏览器缓存，加载更快。

### 2.2.2 通过 URL 参数定制界面

Web 版支持多种 URL 参数来控制界面显示：

**精简布局**（隐藏项目元数据，使用图标工具栏）：
```
https://web.geolibre.app/?layout=compact
```

**隐藏面板**（仅显示地图，隐藏图层/样式/属性表面板）：
```
https://web.geolibre.app/?panels=none
```

**纯地图模式**（隐藏工具栏、面板和状态栏）：
```
https://web.geolibre.app/?maponly
```

**打开指定项目**：
```
https://web.geolibre.app/?url=https://share.geolibre.app/giswqs/3d-tiles.geolibre.json
```

[已核实] https://geolibre.app/user-guide/embedding/

### 2.2.3 Web 版的限制


![左侧图层面板](/img/ch02/ch02-03.png)
*左侧图层面板，显示图层列表与叠加顺序*


Web 版虽然功能完整，但存在以下平台限制：[已核实] https://geolibre.app/

| 功能 | Web 版 | 桌面端 |
|------|--------|--------|
| 本地文件选择器 | 浏览器标准文件选择 | 原生文件对话框 |
| 本地 MBTiles | 不支持 | 支持 |
| 本地栅格读取 | 不支持 | 支持 |
| 文件系统保存/打开 | 浏览器下载 | 原生文件系统 |
| JupyterLab 服务器 | JupyterLite | 完整 JupyterLab |
| Python Sidecar | Pyodide（浏览器内）| 可选本地 Python |

## 2.3 桌面端安装


![顶部工具栏](/img/ch02/ch02-04.png)
*顶部工具栏，包含菜单、快捷操作和地图控制按钮*


### 2.3.1 Windows

**方法一：Microsoft Store（推荐）**

GeoLibre 已在 Microsoft Store 上架，支持自动更新：[已核实] https://geolibre.app/downloads/

1. 打开 Microsoft Store
2. 搜索 "GeoLibre"
3. 点击 "获取" 安装

**方法二：winget**

Windows Package Manager 分发 GitHub Release 构建，包名为 `OpenGeos.GeoLibre`：[已核实] https://geolibre.app/downloads/

```bash
winget install OpenGeos.GeoLibre
```

**方法三：直接下载安装包**

1. 访问 https://geolibre.app/downloads/ 或镜像 https://downloads.geolibre.app/
2. 下载 Windows 安装程序（.msi 或 .exe）
3. 双击运行安装程序，按向导完成安装

GitHub Release 的 Windows 构建**未签名**，SmartScreen 可能提示；选「更多信息 → 仍要运行」。Microsoft Store 构建已签名并自动更新。[已核实] https://geolibre.app/downloads/

也可下载 `*-x64-portable.zip` 解压即用，无需安装。[已核实] https://geolibre.app/downloads/

**方法四：Docker**

```bash
docker run -p 3000:3000 ghcr.io/opengeos/geolibre:latest
```

然后在浏览器中访问 `http://localhost:3000`。

[已核实] Docker 支持在 GitHub README 和官网均有提及。

### 2.3.2 macOS

**方法一：Homebrew Cask（推荐）**

```bash
brew install --cask geolibre
```

[已核实] https://geolibre.app/downloads/ 提供了 Homebrew 安装命令。

**方法二：直接下载**

1. 访问 https://geolibre.app/downloads/
2. 下载 macOS 安装包（.dmg）
3. 双击挂载 DMG，将 GeoLibre 拖入 Applications 文件夹

macOS 安装包已使用 Apple Developer ID 证书签名并经过 Apple Notarization，打开时无需 Gatekeeper 绕过。[已核实] https://geolibre.app/downloads/

**方法三：Mac App Store**

GeoLibre Desktop 已上架 Mac App Store（沙箱构建，包 ID `org.geolibre.desktop`）：https://apps.apple.com/app/geolibre-desktop/id6796848769

沙箱版**不含** Python sidecar、本地 JupyterLab 服务器、从 zip/市场安装外部插件、Earth Engine 登录、以及通过 martin 的 PostgreSQL/PostGIS。需要这些能力请用 Homebrew / DMG 完整版。[已核实] https://geolibre.app/downloads/ https://geolibre.app/mac-app-store/

### 2.3.3 Linux

**方法一：AppImage（推荐，支持自更新）**

1. 访问 https://geolibre.app/downloads/
2. 下载 GeoLibre-x86_64.AppImage
3. 赋予执行权限：`chmod +x GeoLibre-x86_64.AppImage`
4. 双击运行或命令行执行

[已核实] v2.4 新增自更新 Linux AppImage。https://geolibre.app/roadmap/

**方法二：发行版软件源**

| 渠道 | 命令 | 来源 |
|------|------|------|
| Arch / Manjaro（AUR `geolibre-bin`） | `yay -S geolibre-bin` | [已核实] https://geolibre.app/downloads/ |
| Fedora / RHEL（COPR） | `sudo dnf copr enable giswqs/geolibre && sudo dnf install geolibre` | 同上 |
| Flatpak（FlatPark） | `flatpak install flatpark app.geolibre.GeoLibre` | 同上 |
| Debian / Ubuntu（.deb） | `sudo apt install ./GeoLibre.Desktop_<version>_amd64.deb` | 同上 |
| 其他 RPM | `sudo dnf install ./GeoLibre.Desktop-<version>-1.x86_64.rpm` | 同上 |

[已核实] https://geolibre.app/downloads/

AppImage 在 v2.3.0 之后内嵌更新信息，可用 AppImageUpdate 做增量更新；v2.4 起文档也强调自更新 Linux AppImage。[已核实] https://geolibre.app/downloads/ https://geolibre.app/roadmap/

## 2.4 移动端与浏览器扩展

### 2.4.1 Android

1. 打开 Google Play 商店
2. 搜索 "GeoLibre"
3. 安装应用

或直接访问：https://play.google.com/store/apps/details?id=org.geolibre.app

[已核实] https://play.google.com/store/apps/details?id=org.geolibre.app

Android 版本采用响应式触摸布局，针对手机屏幕优化。支持离线区域下载和服务工作者缓存 CDN 加载的 Pyodide 和 PGlite/PostGIS 引擎。[已核实] https://geolibre.app/android/

### 2.4.2 iOS

GeoLibre 已作为原生 iPhone / iPad 应用上架 App Store（包 ID `org.geolibre.app`，与 Mac App Store 桌面版不是同一个应用）：[已核实] https://geolibre.app/downloads/ https://geolibre.app/ios/

1. 打开 App Store，搜索 "GeoLibre"
2. 或直接访问：https://apps.apple.com/app/geolibre/id6796039674

官方**不向最终用户提供可侧载的 IPA**。Release 里的 `*_ios_app-store.ipa` 仅用于商店提交，不能直接安装。测试版走 TestFlight。[已核实] https://geolibre.app/downloads/

与 Android 相同：需要本机桌面进程的 Raster / Conversion / AI Segmentation 工具箱和 PostgreSQL 数据源在 iOS 上隐藏；Whitebox 工具箱走 WebAssembly，仍然可用。[已核实] https://geolibre.app/downloads/

### 2.4.3 Chrome 扩展

「Open data in GeoLibre」可在网页上发现地理空间数据集和地图服务，并在 GeoLibre 中打开。[已核实] https://geolibre.app/downloads/ https://geolibre.app/user-guide/chrome-extension/

- Chrome Web Store：https://chromewebstore.google.com/detail/open-data-in-geolibre/joinecgbfoldanidcoakpjgkbaceaooj
- 也可从 GitHub Release 下载 `geolibre-chrome-*.zip` 以未打包方式加载

## 2.5 Docker 部署

GeoLibre 提供 Docker 镜像，适用于服务器部署或本地开发环境。

### 2.5.1 快速启动

```bash
# 拉取镜像
docker pull ghcr.io/opengeos/geolibre:latest

# 运行容器
docker run -d -p 3000:3000 --name geolibre ghcr.io/opengeos/geolibre:latest

# 访问
open http://localhost:3000
```

### 2.5.2 持久化配置

```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/geolibre-data:/data \
  --name geolibre \
  ghcr.io/opengeos/geolibre:latest
```

[推断] Docker 具体用法基于 GeoLibre 的 GitHub Packages 页面和通用 Docker 实践，非官方完整文档。

## 2.6 环境变量配置

### 2.6.1 Cesium Ion Token

CesiumJS 3D 地球视图需要 Cesium Ion token 才能加载 Cesium World Imagery 和 Terrain。[已核实] https://geolibre.app/user-guide/interface/

**获取方式**：
1. 访问 https://cesium.com/ion/
2. 注册免费账户
3. 在 Access Tokens 页面创建新 token

**配置方式**：

- **构建时**：设置环境变量 `CESIUM_TOKEN=your_token_here`
- **运行时**：Settings -> Environment Variables -> Cesium Ion token
- **项目文件外**：token 存储在 `DesktopSettings`（桌面端 localStorage，Web 端 localStorage），不写入共享的 `.geolibre.json` 项目文件

[已核实] https://geolibre.app/user-guide/interface/

### 2.6.2 协作服务器 URL

实时协作功能需要配置协作服务器：

```
VITE_GEOLIBRE_COLLAB_URL=https://your-collab-server.example.com
```

[已核实] https://geolibre.app/collaboration/

### 2.6.3 其他环境变量

| 变量名 | 用途 | 默认值 |
|--------|------|--------|
| `VITE_CESIUM_TOKEN` | Cesium Ion token | 无 |
| `CESIUM_TOKEN` | Cesium Ion token（构建时）| 无 |
| `VITE_GEOLIBRE_COLLAB_URL` | 协作服务器地址 | 无 |

[已核实] GitHub README 环境变量章节

## 2.7 更新与卸载

### 2.7.1 自动更新

- **Microsoft Store 版**：通过 Windows Store 自动更新
- **macOS Homebrew Cask**：`brew upgrade --cask geolibre`
- **Linux AppImage**：内置自更新机制（v2.4+）
- **Web 版**：刷新页面即获取最新版本

[已核实] Microsoft Store、Homebrew、自更新 AppImage 的功能在 Roadmap 中有记录。

### 2.7.2 手动更新

1. 访问 https://geolibre.app/downloads/
2. 下载最新版本安装包
3. 覆盖安装（保留项目和设置）

### 2.7.3 卸载

| 平台 | 卸载方式 |
|------|----------|
| Windows | 控制面板 -> 卸载程序，或 Microsoft Store 卸载 |
| macOS | 将 Applications/GeoLibre 拖入废纸篓 |
| Linux | 删除 AppImage 文件即可 |
| Android | 长按应用图标 -> 卸载 |

[推断] 卸载方式基于各平台的通用实践，GeoLibre 未提供专用卸载程序。

## 2.8 本章小结

GeoLibre 的安装和部署非常灵活：

- **最快体验**：Web 版（https://web.geolibre.app），零安装
- **日常使用**：桌面端（Microsoft Store / winget / Homebrew / Mac App Store / AppImage / AUR / COPR / Flatpak）
- **移动场景**：Android（Google Play）与 iOS（App Store）
- **服务器部署**：Docker 镜像；GitHub 不可达时可走 https://downloads.geolibre.app/

桌面端独有的能力（本地文件系统、MBTiles、完整 JupyterLab）使其成为重度用户的首选。Web 版则适合快速数据探索和教学演示。

---

**本章信息源**
- [1] GeoLibre 下载页：https://geolibre.app/downloads/ [检索日期 2026-09-04]
- [2] GeoLibre 快速开始：https://geolibre.app/getting-started/ [检索日期 2026-09-04]
- [3] GeoLibre Android 文档：https://geolibre.app/android/ [检索日期 2026-09-04]
- [4] Google Play 商店：https://play.google.com/store/apps/details?id=org.geolibre.app [检索日期 2026-09-04]
- [5] GitHub README 环境变量：https://github.com/opengeos/GeoLibre [检索日期 2026-09-04]
- [6] 嵌入与分享文档：https://geolibre.app/user-guide/embedding/ [检索日期 2026-09-04]
- [7] GeoLibre iOS：https://geolibre.app/ios/ [检索日期 2026-09-04]
- [8] Mac App Store 说明：https://geolibre.app/mac-app-store/ [检索日期 2026-09-04]
- [9] App Store（iOS）：https://apps.apple.com/app/geolibre/id6796039674 [检索日期 2026-09-04]
- [10] 下载镜像：https://downloads.geolibre.app/ [检索日期 2026-09-04]
- [11] Chrome 扩展指南：https://geolibre.app/user-guide/chrome-extension/ [检索日期 2026-09-04]
