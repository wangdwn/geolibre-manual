# 第 1 章：GeoLibre 概述

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官网（https://geolibre.app/）、GitHub 仓库 README、官方 Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 1.1 什么是 GeoLibre

GeoLibre 是一个免费开源的轻量级云原生 GIS（地理信息系统）平台。[已核实] 它可以在 Web 浏览器、桌面操作系统、移动设备和 Jupyter Notebook 中运行，且所有数据处理均在本地完成，不依赖远程服务器。[已核实] https://geolibre.app/

GeoLibre 的核心定位是：为地理空间数据的**可视化、探索和分析**提供一个统一的工作环境，同时保持数据的本地性和隐私性。

### 1.1.1 项目背景

GeoLibre 由 Qiusheng Wu 发起并主导开发，隶属于 opengeos GitHub 组织。[已核实] https://github.com/opengeos/GeoLibre Qiusheng Wu 同时是 geemap 和 leafmap 等广受欢迎的 Python 地理空间可视化库的作者，[推断] GeoLibre 的设计理念明显继承自这些项目对"降低 GIS 使用门槛"的追求。

### 1.1.2 核心特性概览

GeoLibre v2.4 提供以下核心能力：[已核实] https://geolibre.app/

- **多平台运行**：同一套代码编译为 Web 应用、桌面应用（Windows / macOS / Linux）、Android 应用和 Jupyter 插件
- **云原生数据支持**：原生支持 GeoParquet、FlatGeobuf、PMTiles、COG、Zarr 等云优化格式
- **浏览器内空间分析**：通过 DuckDB-WASM Spatial 和 Turf.js 在浏览器中执行矢量分析；通过 Pyodide 运行 GeoPandas
- **丰富的数据源**：支持 XYZ、WMS、WFS、ArcGIS、STAC、PostGIS、DuckDB 等数十种数据源
- **AI 集成**：内置自然语言 AI 助手（支持 Google Gemini、Anthropic、OpenAI）和 SamGeo 图像分割
- **插件生态**：内置市场支持浏览、安装、更新和卸载第三方插件
- **实时协作**：多人同时编辑同一项目（MVP 阶段）
- **3D 支持**：MapLibre GL JS 2D 地图 + deck.gl 高级叠加 + CesiumJS 3D 地球视图

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

**Web 版**（https://web.geolibre.app）是完全静态站点，部署在 GitHub Pages 上，无分析追踪、无服务器账户，数据仅在浏览器会话中客户端处理。[已核实] https://geolibre.app/

## 1.4 与同类工具对比

### 1.4.1 QGIS

QGIS 是桌面 GIS 的标杆开源产品，功能全面、插件生态丰富。GeoLibre 与 QGIS 的关系更偏向互补而非替代：

| 维度 | QGIS | GeoLibre |
|------|------|----------|
| 部署方式 | 桌面安装 | Web + 桌面 + 移动 + Jupyter |
| 启动速度 | 较慢（完整桌面应用）| 快（Web 版即开即用）|
| 数据隐私 | 本地处理 | 本地处理（Web 版无服务器）|
| 分析能力 | 极强（GRASS、SAGA、Whitebox）| 中等（浏览器内 + 可选 sidecar）|
| 插件生态 | 极丰富（20 年积累）| 成长中（内置市场）|
| 3D 支持 | QGIS 3D | MapLibre + deck.gl + CesiumJS |
| 学习曲线 | 陡峭 | 较平缓 |

[推断] 以上对比基于两个产品的公开文档和功能列表，未进行严格的功能矩阵逐一核对。

### 1.4.2 ArcGIS Online / ArcGIS Pro

Esri 的 ArcGIS 产品线是企业 GIS 的标准。GeoLibre 定位更轻量、更开放：

- GeoLibre 完全开源免费，ArcGIS 需许可费用
- GeoLibre 数据不离开本地，ArcGIS Online 需上传至云端
- GeoLibre 支持 Jupyter 集成，ArcGIS 有 ArcPy
- [待核实] GeoLibre 的功能深度目前不及 ArcGIS Pro

### 1.4.3 Google Earth Engine (GEE)

GEE 是云端遥感分析平台，与 GeoLibre 定位差异显著：

- GEE：云端计算、PB 级卫星影像数据、JavaScript/Python API
- GeoLibre：本地计算、自带数据、交互式 GUI
- GeoLibre 通过 Planetary Computer 面板和 Earth Engine 面板提供云数据入口 [已核实] https://geolibre.app/

### 1.4.4 geemap / leafmap

geemap 和 leafmap 是 Qiusheng Wu 开发的 Python 库，用于在 Jupyter 中交互式可视化地理空间数据：

- GeoLibre 的 Python 包 (`geolibre`) 采用 leafmap 风格的 API（`add_geojson`、`add_tile_layer`、`add_cog`）
- [已核实] 两个方向同步：Python 代码驱动地图，UI 编辑也回读到 Python https://geolibre.app/python/
- [推断] GeoLibre 可以视为 geemap/leafmap 的"桌面/Web GUI 封装"

## 1.5 适用场景与定位

### 1.5.1 推荐使用场景

- **快速数据探索**：有一个 GeoJSON/GeoParquet/COG 文件，想立即在地图上查看和简单分析
- **教学演示**：Web 版即开即用，无需安装，适合课堂展示
- **云原生数据工作流**：处理 GeoParquet、FlatGeobuf、PMTiles 等现代云格式
- **轻量分析**：缓冲区、叠加分析、SQL 查询等不需要重型桌面 GIS 的场景
- **Jupyter 内交互**：在 Notebook 中嵌入完整 GIS 界面，与 Python 数据分析流衔接
- **插件开发**：基于 GeoLibre 的插件 API 开发自定义工具

### 1.5.2 暂不推荐使用场景

- **大规模批处理**：涉及 GB/TB 级数据的复杂分析链
- **专业制图出版**：高精度印刷制图、复杂图例和版式设计
- **企业级空间数据库管理**：PostGIS/Enterprise Geodatabase 的管理和调优
- [推断] 以上"不推荐"场景基于 GeoLibre 当前功能边界，非官方声明

## 1.6 版本演进与路线图

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
| v2.3 | [待核实] | 自动图例、GeoLens、iOS 脚手架、Emerging Hot Spot、AI Profiles、Whitebox 深度链接 |
| v2.4 | [已核实] 当前 | STAC/NASA Earthdata 浏览器、Hugging Face Hub、飞行模拟器、Time Slider 动画、OGC API - Features |

[待核实] 早期版本的准确发布时间未在官方文档中找到，仅根据 GitHub Release 推断。

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
- [1] GeoLibre 官网首页：https://geolibre.app/ [检索日期 2026-07-31]
- [2] GeoLibre GitHub 仓库：https://github.com/opengeos/GeoLibre [检索日期 2026-07-31]
- [3] GeoLibre 官方 Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
- [4] GeoLibre Python 包文档：https://geolibre.app/python/ [检索日期 2026-07-31]
- [5] GeoLibre 插件文档：https://geolibre.app/user-guide/plugins/ [检索日期 2026-07-31]
