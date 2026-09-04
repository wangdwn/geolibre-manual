---
last_update:
  date: 2026-09-04
  author: 手册维护
---

# 第 1 章：GeoLibre 概述

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官网（https://geolibre.app/）、GitHub 仓库 README、官方 Roadmap、平台对比页
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测
> 手册内容最后更新：2026-09-04（对照 GeoLibre v2.9.0）

## 1.1 什么是 GeoLibre

GeoLibre 是一个免费开源的轻量级云原生 GIS（地理信息系统）平台。[已核实] 它可以在 Web 浏览器、桌面操作系统、移动设备和 Jupyter Notebook 中运行，数据处理默认在本地（设备 / 浏览器会话）完成。[已核实] https://geolibre.app/

GeoLibre 的核心定位是：为地理空间数据的**可视化、探索和分析**提供一个统一的工作环境，同时保持数据的本地性和隐私性。

### 1.1.1 项目背景

GeoLibre 由 Qiusheng Wu 发起并主导开发，隶属于 opengeos GitHub 组织。[已核实] https://github.com/opengeos/GeoLibre


![GeoLibre GitHub 仓库首页](/img/ch01/ch01-01.png)
*GeoLibre GitHub 仓库首页（7,100+ stars，活跃开发中；2026-09-04 检索为 7,131）*
 Qiusheng Wu 同时是 geemap 和 leafmap 等广受欢迎的 Python 地理空间可视化库的作者，[推断] GeoLibre 的设计理念明显继承自这些项目对"降低 GIS 使用门槛"的追求。

### 1.1.2 核心特性概览


![GeoLibre GitHub README](/img/ch01/ch01-02.png)
*GitHub README 中的项目介绍与核心特性*


GeoLibre v2.9 提供以下核心能力：[已核实] https://geolibre.app/ https://github.com/opengeos/GeoLibre/releases/tag/v2.9.0

- **多平台运行**：同一套代码编译为 Web 应用、桌面应用（Windows / macOS / Linux）、Android / iOS 应用和 Jupyter 插件
- **云原生数据支持**：原生支持 GeoParquet、FlatGeobuf、PMTiles、COG、Zarr 等云优化格式
- **浏览器内空间分析**：1,000+ Whitebox 工具在 WebAssembly 中运行（无需 Python sidecar）；DuckDB-WASM Spatial / Turf.js 矢量分析；可选 Pyodide GeoPandas
- **丰富的数据源**：支持 XYZ、WMS、WFS、ArcGIS、STAC、PostGIS、DuckDB 等；可导入 QGIS / ArcGIS Pro 工程
- **AI 集成**：内置自然语言 AI 助手（支持 Google Gemini、Anthropic、OpenAI）和 SamGeo 图像分割
- **插件生态**：内置市场支持浏览、安装、更新和卸载第三方插件
- **实时协作**：多人同时编辑同一项目（可自托管协作中继）
- **3D 支持**：MapLibre GL JS 2D 地图 + deck.gl 高级叠加 + CesiumJS 3D 地球视图（v2.9 起无 Cesium Ion token 也可打开地球窗格）

## 1.2 技术架构全景

GeoLibre 采用单一代码库（single npm workspaces monorepo）架构，通过不同构建目标输出多平台应用。[已核实] https://geolibre.app/

### 1.2.1 核心技术栈

| 技术 | 角色 | 版本 |
|------|------|------|
| Tauri v2 | 桌面端宿主框架 | v2.x |
| React | UI 框架 | 18.x |
| TypeScript | 开发语言 | 5.x |
| MapLibre GL JS | 2D 地图渲染引擎 | 最新 |
| deck.gl | 高级可视化叠加 | 最新 |
| DuckDB-WASM | 浏览器内数据库 | 最新 |
| Zustand | 状态管理 | @geolibre/core |
| Vite | 构建工具 | 最新 |

[已核实] https://geolibre.app/

### 1.2.2 架构分层

```
+---------------------+
|   UI Layer (React)  |
|  Toolbar / Panels   |
+---------------------+
|  State Layer (Zustand) |
|  @geolibre/core     |
+---------------------+
|  Map Engine Layer   |
|  MapLibre GL JS     |
|  deck.gl (overlay)  |
|  CesiumJS (3D globe)|
+---------------------+
|  Data Engine Layer  |
|  DuckDB-WASM Spatial|
|  Turf.js (vector)   |
|  rasterio (raster)  |
|  WhiteboxTools      |
+---------------------+
|  Platform Abstraction |
|  Tauri (desktop)    |
|  Browser (web)      |
|  Tauri Mobile (Android)|
+---------------------+
```

[推断] 上图基于官网描述和开源代码结构整理，非官方架构图。

### 1.2.3 数据流

用户通过 Add Data 菜单、Tauri 文件对话框、浏览器文件选择器、拖放或内置插件控件添加数据。[已核实] https://geolibre.app/

数据加载路径：
1. **矢量数据**：GeoJSON 直接由 MapLibre 渲染；其他格式通过 DuckDB-WASM Spatial 的 `ST_Read` 转换后渲染
2. **栅格数据**：COG/GeoTIFF 通过 `maplibre-gl-raster` 渲染；其他格式通过 DuckDB 或 sidecar 转换
3. **Web 服务**：XYZ/WMS/WFS 直接由 MapLibre 的 source 机制加载
4. **3D 数据**：3D Tiles、LiDAR 等通过 deck.gl 或 MapLibre 的 custom layer 渲染

## 1.3 支持平台对比


![GeoLibre Web 版主界面](/img/ch01/ch01-03.png)
*web.geolibre.app 主界面全貌*


GeoLibre 在四个平台上运行，功能存在差异：

| 功能 | Web 版 | 桌面端 | Android | Jupyter |
|------|--------|--------|---------|---------|
| 基础地图浏览 | 是 | 是 | 是 | 是 |
| GeoJSON 加载 | 是 | 是 | 是 | 是 |
| DuckDB-WASM 矢量导入 | 是 | 是 | 是 | 是 |
| 本地文件对话框 | 否 | 是 | 是 | 否 |
| 本地 MBTiles | 否 | 是 | 否 | 否 |
| 本地栅格读取 | 否 | 是 | 否 | 否 |
| 文件系统保存/打开 | 否 | 是 | 是 | 否 |
| Python Sidecar | 可选 | 可选 | 否 | 是 |
| Jupyter 双向同步 | 否 | 否 | 否 | 是 |
| 离线区域下载 | 否 | 否 | 是 | 否 |

[已核实] https://geolibre.app/ （"GeoLibre on the web" 和 "Android" 章节）

**Web 版**（https://web.geolibre.app）是完全静态站点，部署在 GitHub Pages 上，无服务器账户；你加载的数据只在浏览器会话中客户端处理。托管站点会用 Google Analytics 统计**页面访问**（看不到你加载的图层数据）；自行托管的构建不含分析。[已核实] https://geolibre.app/ https://geolibre.app/privacy/

## 1.4 与同类工具对比

### 1.4.1 QGIS

QGIS 是桌面 GIS 的标杆开源产品。官方对比页把二者写成**互补而非替代**：QGIS 更像专业相机（格式最广、制图与插件最深），GeoLibre 更像智能手机相机（浏览器即开即用、跨平台、云原生格式）。[已核实] https://geolibre.app/comparison/

| 维度 | QGIS | GeoLibre |
|------|------|----------|
| 许可证 | GPL-2.0+ | MIT |
| 部署 | 桌面（Windows / macOS / Linux） | 浏览器全量应用 + 桌面 + Android / iOS + Jupyter |
| 数据位置 | 本机 | 本机 / 浏览器会话客户端处理 |
| 工程文件 | `.qgs` / `.qgz`（开放） | `.geolibre` / `.geolibre.json`（开放、有文档） |
| 工程互通 | 读取自身工程 | **可导入** QGIS `.qgs` / `.qgz`（v2.5+） |
| 样式交换 | QML、SLD | 导入/导出 OGC SLD、**QGIS QML**、Mapbox GL JSON |
| 分析 | 最广（原生 + GDAL / GRASS / SAGA） | 1,000+ Whitebox（浏览器 WASM）+ 自有工具箱；超大本地作业仍属桌面 GIS |
| 插件 | 数量最多（Python 插件） | TypeScript 插件 API + 内置市场 |

[已核实] https://geolibre.app/comparison/ https://geolibre.app/user-guide/projects/

**从 QGIS 带到 GeoLibre**：`Project → Import → Import QGIS Project…` 会重建图层、嵌套分组、可见性、顺序、样式和保存的地图视图；不支持的数据源会按原因汇总报告，而不是整份工程失败。浏览器无法重开本机路径，这类图层请用桌面端导入。[已核实] https://geolibre.app/user-guide/projects/

官方也写明：复杂专业工作流、GDAL/OGR 最广格式、最深桌面制图与标签、以及超过浏览器内存上限的本地处理，仍应使用 QGIS。[已核实] https://geolibre.app/comparison/

### 1.4.2 ArcGIS Online / ArcGIS Pro

Esri 的 ArcGIS 产品线是企业 GIS 的标准。GeoLibre 定位更轻量、更开放：

- GeoLibre 完全开源免费（MIT），ArcGIS 需许可费用
- GeoLibre 数据默认留在本机；ArcGIS Online 以托管图层为主
- GeoLibre 支持 Jupyter 集成；ArcGIS 有 ArcPy
- v2.5 起可导入 ArcGIS Pro `.aprx` / `.mapx`（读取 CIM JSON，无需安装 Pro）[已核实] https://geolibre.app/user-guide/projects/
- 企业级地理数据库版本化编辑、最深 3D / 影像工作流仍属 ArcGIS Pro 更强项 [已核实] https://geolibre.app/comparison/

### 1.4.3 Google Earth Engine (GEE)

GEE 是云端遥感分析平台，与 GeoLibre 定位差异显著：

- GEE：云端计算、PB 级卫星影像数据、JavaScript/Python API
- GeoLibre：本地计算、自带数据、交互式 GUI
- GeoLibre 通过 Planetary Computer 面板和 Earth Engine 面板提供云数据入口 [已核实] https://geolibre.app/

### 1.4.4 geemap / leafmap

geemap 和 leafmap 是 Qiusheng Wu 开发的 Python 库，用于在 Jupyter 中交互式可视化地理空间数据：

- GeoLibre 的 Python 包 (`geolibre`) 采用 leafmap 风格的 API（`add_geojson`、`add_tile_layer`、`add_cog`）
- [已核实] 两个方向同步：Python 代码驱动地图，UI 编辑也回读到 Python https://geolibre.app/python/
- 另有 **R 包**，可在 RStudio、Quarto、R Markdown、Shiny 中构建交互地图 [已核实] https://geolibre.app/ https://geolibre.app/r/
- [推断] GeoLibre 可以视为 geemap/leafmap 的"桌面/Web GUI 封装"

## 1.5 适用场景与定位

### 1.5.1 推荐使用场景

- **快速数据探索**：有一个 GeoJSON/GeoParquet/COG 文件，想立即在地图上查看和简单分析
- **教学演示**：Web 版即开即用，无需安装，适合课堂展示
- **从 QGIS 出发的发布/嵌入**：在 QGIS 中制图后导入 GeoLibre，或交换 QML/SLD 后嵌入网页
- **云原生数据工作流**：处理 GeoParquet、FlatGeobuf、PMTiles 等现代云格式
- **轻量分析**：缓冲区、叠加分析、SQL 查询、浏览器内 Whitebox 工具等不需要重型桌面 GIS 的场景
- **Jupyter 内交互**：在 Notebook 中嵌入完整 GIS 界面，与 Python 数据分析流衔接
- **插件开发**：基于 GeoLibre 的插件 API 开发自定义工具

### 1.5.2 暂不推荐使用场景

- **大规模批处理**：涉及 GB/TB 级数据的复杂分析链
- **专业制图出版**：高精度印刷制图、复杂图例和版式设计
- **企业级空间数据库管理**：PostGIS/Enterprise Geodatabase 的管理和调优
- [推断] 以上"不推荐"场景基于 GeoLibre 当前功能边界，非官方声明

## 1.6 版本演进与路线图


![GeoLibre 文档站](/img/ch01/ch01-04.png)
*geolibre.app 官方文档站界面*


GeoLibre 的版本演进如下：[已核实] https://geolibre.app/roadmap/

| 版本 | 发布时间 | 核心新增 |
|------|----------|----------|
| v0.1-v0.6 | 早期 | Tauri + React + MapLibre 壳、GeoJSON、DuckDB-WASM、Add Data 基础、Vector 基础工具 |
| v1.0 | [待核实] | 处理流水线、Whitebox 扩展、插件市场 MVP、Python 包 (`geolibre`)、anywidget |
| v1.1 | [待核实] | 浏览器内 GeoPandas（Pyodide）、deck.gl 暴露、OpenStreetMap PBF、NetCDF/HDF、3D Tiles |
| v1.3 | [待核实] | 空间统计、IDW/Kriging、属性连接、栅格分析、Homebrew Cask、Android APK |
| v1.6 | [待核实] | 多地图布局、高级符号化、插件 zip 安装 |
| v1.7 | [待核实] | Plugin UI host API、色带预览、分类浏览 Whitebox 工具 |
| v2.0 | [待核实] | CesiumJS 3D 地球、行星映射（火星/月球等）、OGC SLD/QML/Mapbox style 交换、Weather 菜单 |
| v2.1 | [待核实] | QGIS 风格浏览器面板、路线动画、ONNX/YOLO 检测、地图录制、Mapillary 插件 |
| v2.2 | [待核实] | 规则渲染器、Expression Builder、虚拟字段、Atlas、COG/FlatGeobuf 转换、GPS 追踪 |
| v2.3 | 2026-07-25 | 自动图例、GeoLens、iOS 脚手架、Emerging Hot Spot、AI Profiles、Whitebox 深度链接 |
| v2.4 | 2026-07-29 | STAC/NASA Earthdata 浏览器、Hugging Face Hub、飞行模拟器、Time Slider 动画、OGC API - Features |
| v2.5 | 2026-08-06 | **QGIS / ArcGIS Pro 工程导入**、锚定评论、可自托管分享/协作、DGGS、Mac App Store |
| v2.6 | 2026-08-14 | R 包、`?data=` / `?style=` 深链、Python MCP、ArcGIS MapServer/ImageServer |
| v2.7 | 2026-08-22 | Excel XY 导入、Chrome 扩展、Model Builder 画布、STAC 静态目录树 |
| v2.8 | 2026-08-27 | 图层快速过滤、弹窗/工具提示设计器、SamGeo 交互插件、@geolibre npm 包 |
| v2.9 | 2026-09-03 **当前** | 无 token 也可开 3D 地球窗格、DashMap、Planet / Vantor 开放数据插件、拖放打开工程 |

[已核实] GitHub Releases：https://github.com/opengeos/GeoLibre/releases （发布时间取自各 tag 的 published_at）
早期 v0.x–v2.2 的准确日历日期仍以官网 Roadmap 与 Release 页为准。

## 1.7 本章小结

GeoLibre 是一个技术栈现代、定位清晰的云原生 GIS 平台。它的核心优势在于：

1. **零门槛 Web 访问**：无需安装，浏览器即开即用
2. **隐私优先**：数据本地处理，不上传服务器
3. **云原生格式原生支持**：GeoParquet、COG、PMTiles 等现代格式开箱即用
4. **统一多平台**：同一套代码覆盖 Web、桌面、移动和 Jupyter
5. **AI 集成**：自然语言助手降低复杂操作门槛

同时，它在重型分析、专业制图、企业级管理等方面的能力尚有边界，用户应根据实际需求选择工具。

---

**本章信息源**
- [1] GeoLibre 官网首页：https://geolibre.app/ [检索日期 2026-09-04]
- [2] GeoLibre GitHub 仓库：https://github.com/opengeos/GeoLibre [检索日期 2026-09-04]
- [3] GeoLibre 官方 Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-09-04]
- [4] GeoLibre Python 包文档：https://geolibre.app/python/ [检索日期 2026-09-04]
- [5] GeoLibre 插件文档：https://geolibre.app/user-guide/plugins/ [检索日期 2026-09-04]
- [6] GeoLibre 平台对比（含 QGIS）：https://geolibre.app/comparison/ [检索日期 2026-09-04]
- [7] GeoLibre 项目管理（含 QGIS 导入）：https://geolibre.app/user-guide/projects/ [检索日期 2026-09-04]
- [8] GeoLibre v2.9.0 Release：https://github.com/opengeos/GeoLibre/releases/tag/v2.9.0 [检索日期 2026-09-04]
