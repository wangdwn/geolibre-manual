# 附录 D：版本历史

> 基于 GeoLibre 官方 Roadmap 和 Release Notes 整理
> 检索日期：2026-07-31

## v2.4（当前稳定版）

**用户手册**：本版用户手册已全面图文化更新，所有章节均配有 GeoLibre v2.4.0 界面截图。

**新增功能**：
- STAC 和 NASA Earthdata 目录浏览器
- Hugging Face Hub 面板（读取和上传）
- 飞行模拟器自由飞行相机
- Time Slider 动画支持 tiled 数据和 Zarr 数据立方体
- Add Zarr Layer 路径
- OGC API - Features 作为矢量图层
- 版本化 postMessage API
- 外部 Jupyter 客户端驱动地图
- H3 六边形网格插件
- 地理标签照片对象检测
- Dashboard 面板 KPI 指标瓦片
- GeoLens 数据集原地编辑
- 自更新 Linux AppImage

[已核实] https://geolibre.app/roadmap/

## v2.3

**新增功能**：
- 自动生成的地图图例面板
- 图层面板符号化 swatches
- GeoLens 目录浏览器插件
- iOS 脚手架支持
- Google Play-ready Android 构建
- Emerging Hot Spot Analysis（空间时间立方体）
- Time Slider 动画 MosaicJSON 和 STAC mosaic
- 图层间样式复制
- 多个命名 AI 配置
- Whitebox 工具深度链接（`?tool=`）
- 分隔文本源 CRS 字段
- 多图层 GeoPackage 图层选择器
- GeoTIFF 头地理配准元数据读取

[已核实] https://geolibre.app/roadmap/

## v2.2

**新增功能**：
- 规则渲染器（Rule-based renderer）
- Expression Builder（共享表达式构建器）
- 数据定义标签引擎
- Select by Expression
- 虚拟字段
- 持久化属性连接
- 属性表单设计器
- 栅格属性表（RAT）
- Atlas / 地图系列生成（Print Layout）
- 浏览器原生 COG / FlatGeobuf / Shapefile / GeoPackage / Vector to PMTiles 转换
- 实时 GPS 追踪
- 数据质量工具（检查有效性、修复几何、检查拓扑）
- Processing History 面板
- Natural Earth 和 Source Cooperative 数据浏览器
- Style Manager 预设库
- 符号包（倒多边形遮罩、箭头线、几何生成器）
- 图表符号化

[已核实] https://geolibre.app/roadmap/

## v2.1

**新增功能**：
- QGIS 风格浏览器面板（Data Source Manager）
- 路线动画（带 3D 追踪相机控制和 MP4 导出）
- 浏览器内 ONNX/YOLO 对象检测
- 地图录制（画布或边界框到视频）
- 原生分辨率地理标签照片查看器
- Wikipedia 知识卡片
- 9 个额外天体 USGS 底图
- OpenAerialMap 影像搜索插件
- Mapillary 插件
- Historical Imagery 插件
- Elevation Profile 插件

[已核实] https://geolibre.app/roadmap/

## v2.0

**新增功能**：
- CesiumJS 3D 地球视图
- 行星映射（火星、月球、水星、金星、木卫、土卫六、冥王星、卡戎）
- OGC SLD / QGIS QML / Mapbox GL style JSON 符号交换
- 可编辑源图层（GeoPackage、GeoJSON、PostGIS 回写）
- Weather 菜单（实时云量、降水雷达、太阳位置模拟）

[已核实] https://geolibre.app/roadmap/

## v1.7

**新增功能**：
- Plugin UI host API
- 色带预览
- Whitebox 工具分类浏览

[已核实] https://geolibre.app/roadmap/

## v1.6

**新增功能**：
- 多地图布局
- 高级符号化和标签
- 插件 zip 安装
- Windows Microsoft Store 上架

[已核实] https://geolibre.app/roadmap/

## v1.3

**新增功能**：
- 空间统计工具箱
- Vector 工具：Smooth、Regular grid、Voronoi/Delaunay
- IDW / Kriging 插值
- Attribute Join
- 栅格分析工具：Zonal statistics 等
- Homebrew Cask（macOS）
- 原生 Android 应用（Tauri v2 mobile）

[已核实] https://geolibre.app/roadmap/

## v1.1

**新增功能**：
- 浏览器内 GeoPandas 引擎（Pyodide）
- deck.gl 暴露给外部插件
- OpenStreetMap PBF 文件加载（osmix 解析）
- Cloud-Optimized NetCDF/HDF 图层（kerchunk）
- 认证 3D Tiles
- Georeferenced video 叠加图层
- Deck.gl Layer builder

[已核实] https://geolibre.app/roadmap/

## v1.0

**新增功能**：
- GDAL / Rasterio / GeoPandas 处理流水线
- Buffer、Reproject、Export GeoJSON 处理工具
- WhiteboxTools 扩展
- 外部插件包分发工作流
- 插件市场 MVP（curated registry + 浏览/安装 UI）
- 插件更新和卸载
- Share 功能（share.geolibre.app）
- Python 包 `geolibre`（anywidget）
- 性能调优和测试套件
- 跨平台安装程序
- Docker 支持

[已核实] https://geolibre.app/roadmap/

## v0.6

**新增功能**：
- Add Data 对话框（XYZ、WMS、vector files、GeoJSON URLs、vector tiles、raster tiles、COG、GeoTIFF、MBTiles、ArcGIS）
- MapLibre Components 插件（FlatGeobuf、PMTiles、Zarr、LiDAR、Gaussian splat）
- 桌面 MBTiles 元数据和瓦片读取
- 插件控制位置
- 图层控制集成

[已核实] https://geolibre.app/roadmap/

## v0.5

**新增功能**：
- 高级 Add Data 和插件支持图层
- Components 插件面板
- 桌面 MBTiles 读取

[已核实] https://geolibre.app/roadmap/

## v0.4

**新增功能**：
- DuckDB-WASM 集成
- `INSTALL spatial` / `LOAD spatial`
- Shapefile、KMZ/KML、GeoPackage、GeoParquet、FlatGeobuf、GML 导入

[已核实] https://geolibre.app/roadmap/

## v0.3

**新增功能**：
- GeoParquet 导入（DuckDB-WASM）
- FlatGeobuf 导入
- PMTiles（Components 插件）
- COG 和 GeoTIFF 栅格渲染
- Zoom to layer

[已核实] https://geolibre.app/roadmap/

## v0.2

**新增功能**：
- `.geolibre.json` 保存/打开
- 会话内最近项目跟踪
- 属性表要素高亮
- 缩放到选中要素
- 最近项目 UI

[已核实] https://geolibre.app/roadmap/

## v0.1

**初始版本**：
- Tauri + React + MapLibre shell
- GeoJSON 加载
- 图层面板
- 样式面板
- 属性表（基础）
- Processing UI（本地算法）
- 插件接口 + 示例插件

[已核实] https://geolibre.app/roadmap/

---

**本章信息源**
- [1] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
