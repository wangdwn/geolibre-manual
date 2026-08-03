# 附录 A：术语表

> 本术语表基于 GeoLibre v2.4 官方文档与代码仓库整理。
> 检索日期：2026-07-31

## A

- **AI Assistant / AI 助手** — GeoLibre 内置的自然语言交互模块，可将自然语言请求转换为 GeoLibre 操作（Spatial SQL、符号化、数据加载、地图控制）。支持 Google Gemini、Anthropic、OpenAI 等提供商，需用户自行配置 API Key。[已核实]
- **Add Data / 添加数据** — GeoLibre 的数据加载入口，支持本地文件、远程 URL、Web 服务、云格式、3D 图层和数据库等多种数据源。[已核实]
- **Anywidget** — Jupyter 生态的 widget 标准，GeoLibre 的 Python 包 (`geolibre`) 通过 anywidget 将完整应用嵌入 Jupyter Notebook。[已核实]
- **ArcGIS** — Esri 公司的 GIS 平台产品线。GeoLibre 支持加载 ArcGIS FeatureServer 和 VectorTileServer 图层。[已核实]
- **Aspect / 坡向** — 坡面朝向下坡方向的方位角，0 度为正北，90 度为正东。[已核实]
- **Attribute Table / 属性表** — 显示和编辑图层属性数据的表格界面，支持字段计算器、图表、统计分析和导出。[已核实]

## B

- **Basemap / 底图** — 地图最底层的参考图层，GeoLibre 默认使用 OpenFreeMap 底图，也支持自定义 XYZ、WMS 等底图源。[已核实]
- **Buffer / 缓冲区** — 在要素周围创建指定距离的等距区域。[已核实]
- **Bounding Box / 边界框** — 包含几何对象的最小矩形。[已核实]

## C

- **Centroid / 质心** — 面要素的几何中心点。[已核实]
- **COG / Cloud-Optimized GeoTIFF** — 云优化 GeoTIFF 格式，支持 HTTP 范围请求分块读取。[已核实]
- **Contour / 等高线** — 连接相同高程点的线。[已核实]
- **Convex Hull / 凸包** — 包含所有点的最小凸多边形。[已核实]
- **CRS / Coordinate Reference System / 坐标参考系统** — 定义地理坐标与平面坐标之间映射关系的数学模型。[已核实]
- **CesiumJS / Cesium** — 开源 3D 地球仪渲染库，GeoLibre 通过可选的 Cesium Ion token 集成。[已核实]
- **Cloud-Native / 云原生** — 专为云环境优化的数据格式和协议，支持流式分块访问。[已核实]
- **Collaboration / 协作** — GeoLibre 的多用户实时协作功能（MVP 阶段）。[已核实]
- **Conversion / 转换** — GeoLibre 的数据格式转换功能，支持 GeoParquet、FlatGeobuf、PMTiles、COG 等目标格式。[已核实]

## D

- **DEM / Digital Elevation Model / 数字高程模型** — 地表高程的栅格表示。[推断]
- **Dissolve / 融合** — 将相邻且属性相同的要素合并为一个要素。[已核实]
- **DuckDB-WASM** — DuckDB 数据库的 WebAssembly 版本，在浏览器内运行。GeoLibre 用它加载和查询空间数据。[已核实]
- **Data Source Manager / 数据源管理器** — GeoLibre v2.1 引入的浏览器面板，用于统一管理本地文件、PostGIS 数据库、Web 服务和收藏夹。[已核实]
- **Deck.gl** — Uber 开源的 Web 端大规模数据可视化库，GeoLibre 用它渲染高级栅格、点云和 3D 叠加图层。[已核实]

## E

- **Expression / 表达式** — Mapbox GL 表达式语法，用于动态样式和筛选。[已核实]
- **Expression Builder / 表达式构建器** — GeoLibre v2.2+ 引入的可视化表达式编辑工具。[已核实]
- **EVI / Enhanced Vegetation Index** — 增强植被指数，减少大气和土壤背景影响。[已核实]

## F

- **FlatGeobuf** — 用于地理要素的平面二进制编码格式，专为网络传输优化。[已核实]
- **Field Collection / 野外采集** — GeoLibre 的数据采集工具，支持 GPS 定位和自定义表单。[已核实]

## G

- **GDAL / Geospatial Data Abstraction Library** — 开源栅格和矢量地理空间数据转换库。[已核实]
- **Geocoding / 地理编码** — 地址与坐标之间的转换。[已核实]
- **GeoDataFrame** — GeoPandas 的数据结构，在 pandas DataFrame 基础上增加几何列。[已核实]
- **GeoJSON** — 基于 JSON 的开放地理数据交换格式。[已核实]
- **GeoLibre** — 开源的轻量级云原生 GIS 平台，基于 Tauri + React + MapLibre GL JS + DuckDB-WASM + deck.gl 构建。[已核实]
- **GeoPackage** — OGC 标准的 SQLite 数据库格式，用于存储矢量和栅格数据。[已核实]
- **GeoParquet** — 基于 Apache Parquet 的地理空间数据编码格式。[已核实]
- **GPX / GPS Exchange Format** — GPS 数据交换格式，用于存储航点、轨迹和路线。[已核实]
- **Graduated / 分级渲染** — 按数值字段的范围将要素分级，每级分配不同颜色。[已核实]

## H

- **H3** — Uber 开源的六边形层级地理索引系统。[已核实]
- **Hillshade / 山体阴影** — 通过模拟光照效果增强地形可视化的栅格分析方法。[已核实]
- **Hot Spot Analysis / 热点分析** — 识别统计显著的空间聚类的分析方法。[已核实]

## I

- **IDW / Inverse Distance Weighting** — 反距离加权插值方法。[已核实]
- **Interpolation / 插值** — 从已知点估算未知点值的方法。[已核实]
- **Intersect / 相交** — 计算两个图层的几何交集。[已核实]
- **Isochrone / 等时线** — 从某点出发在给定时间内可达范围的边界线。[已核实]

## K

- **KML / KMZ** — Keyhole Markup Language，Google Earth 使用的地理数据格式。[已核实]
- **Kriging / 克里金** — 基于变异函数的最优无偏插值方法。[已核实]

## L

- **Layer / 图层** — 地图上的一种数据表示，可以是矢量或栅格。[已核实]
- **Leafmap** — Qiusheng Wu 开发的 Python 地理空间可视化库。GeoLibre 的 Python API 采用 leafmap 风格。[已核实]

## M

- **MapLibre GL JS** — 开源的 Web 地图渲染库（Mapbox GL JS 的分支），GeoLibre 的核心地图引擎。[已核实]
- **MBTiles** — Mapbox 定义的 SQLite 瓦片存储格式。[已核实]
- **Mosaic / 镶嵌** — 将多个栅格图层合并为一个连续图层。[已核实]

## N

- **NDVI / Normalized Difference Vegetation Index** — 归一化植被指数，用于评估植被健康度。[已核实]
- **NDWI / Normalized Difference Water Index** — 归一化水体指数，用于识别水体。[已核实]

## O

- **OGC / Open Geospatial Consortium** — 开放地理空间联盟，制定地理空间标准。[推断]
- **Overlay / 叠加分析** — 包括相交、差异、并集等空间操作。[已核实]

## P

- **PGlite / PostGIS** — 在浏览器中运行的 PostgreSQL + PostGIS（通过 WASM）。[已核实]
- **Plugin / 插件** — GeoLibre 的扩展机制。[已核实]
- **PMTiles** — 单文件瓦片集格式，专为云存储优化。[已核实]
- **Polygonize / 矢量化** — 将分类栅格转换为矢量多边形。[已核实]
- **Pyodide** — CPython 的 WebAssembly 版本，在浏览器内运行 Python。[已核实]

## R

- **Raster / 栅格** — 像素化空间数据。[已核实]
- **Raster Calculator / 栅格计算器** — 基于像元值的代数运算生成新栅格。[已核实]
- **Reclassify / 重分类** — 将栅格像元值按规则重新分类。[已核实]
- **Reproject / 重投影** — 将数据从一个坐标参考系统转换到另一个。[已核实]
- **Resample / 重采样** — 改变栅格的空间分辨率。[已核实]
- **Rule-based / 规则渲染** — 基于多条规则的复合渲染方式（v2.2+）。[已核实]

## S

- **SamGeo / SAM** — Segment Anything Model，Meta 开源的图像分割模型。[已核实]
- **Shapefile** — Esri 开发的矢量数据格式。[已核实]
- **Simplestyle-spec** — Mapbox 定义的 GeoJSON 样式规范。[已核实]
- **Slope / 坡度** — 坡面与水平面的夹角。[已核实]
- **Spatial Join / 空间连接** — 根据空间关系将属性从一个图层连接到另一个。[已核实]
- **Spatial SQL / 空间 SQL** — 扩展了空间函数的 SQL 方言。[已核实]
- **STAC / SpatioTemporal Asset Catalog** — 时空资产目录标准协议。[已核实]
- **Story Map / 故事地图** — 滚动驱动的交互式叙事地图。[已核实]
- **Swipe / 卷帘** — 通过可拖拽的分割线对比两个图层的插件。[已核实]
- **Symbology / 符号化** — 将数据属性映射为视觉外观的过程。[已核实]

## T

- **Tauri** — 用 Web 技术构建桌面应用的框架，GeoLibre 的桌面端基于此构建（Tauri v2）。[已核实]
- **Tile / 瓦片** — 地图切片。[已核实]
- **Turf.js** — JavaScript 地理空间分析库，GeoLibre 的 Processing -> Vector 工具在浏览器内使用 Turf.js 执行。[已核实]

## V

- **Vector / 矢量** — 几何对象空间数据。[已核实]
- **Virtual Field / 虚拟字段** — 由表达式动态计算、不存储在数据源中的字段（v2.2+）。[已核实]
- **Voronoi / Voronoi 图** — 从点生成泰森多边形的空间分析方法（v1.3+）。[已核实]

## W

- **WMS / Web Map Service** — OGC 标准的地图服务协议。[已核实]
- **WhiteboxTools** — Qiusheng Wu 维护的开源地理空间处理工具集。[已核实]
- **WKT / Well-Known Text** — 地理空间数据的文本表示格式。[已核实]

## Z

- **Zarr** — 用于存储多维数组数据的云原生格式。[已核实]
- **Zonal Statistics / 分区统计** — 计算矢量区域范围内栅格的统计值。[已核实]
- **Zustand** — React 状态管理库，GeoLibre 的应用状态存储在 Zustand store 中。[已核实]
