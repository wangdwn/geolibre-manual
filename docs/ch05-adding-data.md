---
last_update:
  date: 2026-09-04
  author: 手册维护
---

# 第 5 章：添加数据

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南添加数据（https://geolibre.app/user-guide/adding-data/）、官网功能列表
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测
> 手册内容最后更新：2026-09-04

## 5.1 添加数据总览


![添加数据菜单全览](/img/ch05/ch05-01.png)
*Layer -> Add Data 菜单全览*


GeoLibre 支持的数据源类型极为丰富，涵盖本地文件、Web 服务、云格式、3D 数据和数据库五大类。[已核实] https://geolibre.app/user-guide/adding-data/

**添加数据的入口**：
- Layer -> Add Data
- 工具栏 "Add Data" 按钮
- 拖放文件到地图区域
- 数据源管理器（Data Source Manager，v2.1+）

[已核实] https://geolibre.app/user-guide/adding-data/

## 5.2 本地矢量文件

### 5.2.1 支持的矢量格式

GeoLibre 支持以下本地矢量文件格式：[已核实] https://geolibre.app/user-guide/adding-data/

| 格式 | 扩展名 | 加载方式 | 备注 |
|------|--------|----------|------|
| GeoJSON | .geojson, .json | 直接渲染 | 原生支持 |
| Shapefile | .shp | DuckDB-WASM / shpjs | 需配套 .dbf, .shx |
| GeoPackage | .gpkg | DuckDB-WASM Spatial | 支持多图层 |
| KML | .kml | 内置解析器 / DuckDB | 保留 simplestyle 样式 |
| KMZ | .kmz | 解压后解析 KML | 保留 embedded symbology |
| GPX | .gpx | 内置解析器 | 拆分为 waypoint/track/route 图层 |
| GML | .gml | DuckDB-WASM Spatial | |
| FlatGeobuf | .fgb | DuckDB-WASM | 云原生优化 |
| GeoParquet | .parquet | DuckDB-WASM | 云原生优化 |

桌面端还可添加 **File Geodatabase（`.gdb`）** 要素类。v2.5 起支持 KML Super-Overlay；v2.7 起支持 Excel XY 点图层导入。[已核实] https://geolibre.app/comparison/ https://github.com/opengeos/GeoLibre/releases/tag/v2.5.0 https://github.com/opengeos/GeoLibre/releases/tag/v2.7.0

### 5.2.2 加载方式


![添加矢量图层面板](/img/ch05/ch05-02.png)
*添加矢量文件时的面板选项*


**方式一：Add Data 对话框**
- Layer -> Add Data -> Vector File
- 选择文件（桌面端用原生对话框，Web 端用浏览器文件选择器）

**方式二：拖放**
- 将文件直接拖放到地图区域
- 支持多个文件同时拖放

**方式三：数据源管理器**
- 在 Data Source Manager 中浏览本地文件
- 双击或拖拽到地图

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.2.3 格式特殊处理


![示例数据下拉](/img/ch05/ch05-03.png)
*示例数据下拉菜单，包含 Countries 等内置数据集*


**GeoJSON**：MapLibre 原生渲染，无需转换，加载速度最快。

**Shapefile**：通过 `shpjs` 解析器或 DuckDB-WASM Spatial 的 `ST_Read` 加载。若 `shpjs` 无法读取，自动回退到 DuckDB。[已核实] https://geolibre.app/

**KML/KMZ**：内置解析器优先，保留 simplestyle-spec 属性（`fill`、`stroke`、`stroke-width` 等）。无法解析的部分回退到 DuckDB Spatial（不保留样式）。[已核实] https://geolibre.app/

**GPX**：自动拆分为三个独立图层：航点（waypoints）、轨迹（tracks）、路线（routes）。[已核实] https://geolibre.app/roadmap/ （v0.6 更新）

**GeoPackage**：支持多图层，加载时可以选择具体图层。[已核实] https://geolibre.app/user-guide/adding-data/

## 5.3 本地栅格文件

### 5.3.1 支持的栅格格式

| 格式 | 扩展名 | 加载方式 | 备注 |
|------|--------|----------|------|
| GeoTIFF | .tif, .tiff | maplibre-gl-raster | 标准栅格 |
| COG | .tif (Cloud-Optimized) | maplibre-gl-raster / HTTP 范围请求 | 云优化 |
| Cloud-Optimized NetCDF/HDF | .nc, .hdf | kerchunk 引用 | v1.1+ |
| MBTiles | .mbtiles | 桌面端原生读取 / URL | 桌面端直接读取 |

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.3.2 COG 加载

Cloud-Optimized GeoTIFF（COG）是 GeoLibre 栅格工作的核心格式：[已核实] https://geolibre.app/user-guide/adding-data/

**COG 优势**：
- 支持 HTTP 范围请求，只下载需要的数据块
- 无需下载完整文件即可渲染
- 内置多分辨率金字塔，自动适配缩放级别

**加载方式**：
- Add Data -> Raster -> COG / GeoTIFF
- 选择本地文件或输入远程 URL
- 对于本地 COG，GeoLibre 直接读取并渲染

### 5.3.3 MBTiles

MBTiles 是 SQLite 数据库格式的瓦片集：[已核实] https://geolibre.app/user-guide/adding-data/

**桌面端**：直接读取本地 .mbtiles 文件，通过 Tauri 命令读取元数据和瓦片数据。

**Web 端**：需要通过 URL 方式加载（如托管在 HTTP 服务器上）。

[已核实] https://geolibre.app/roadmap/ （v0.5、v1.0 更新）

## 5.4 云原生格式

### 5.4.1 云原生格式概览

云原生格式专为云存储和流式访问设计，是 GeoLibre 的核心优势之一：

| 格式 | 特点 | GeoLibre 支持 |
|------|------|--------------|
| GeoParquet | Apache Parquet + 地理空间扩展 | 导入/导出，DuckDB-WASM |
| FlatGeobuf | 平面二进制，流式友好 | 导入，DuckDB-WASM / Components |
| PMTiles | 单文件瓦片集 | 加载，Components 插件 |
| COG | 云优化 GeoTIFF | 加载，maplibre-gl-raster |
| Zarr | 多维数组，数据立方体 | v1.1+，Components / Add Zarr |

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.4.2 GeoParquet

GeoParquet 基于 Apache Parquet 列式存储格式，添加地理空间元数据：

**加载方式**：
- Add Data -> Cloud Formats -> GeoParquet
- 支持本地文件和远程 URL
- 通过 DuckDB-WASM 的 Parquet reader 加载，需先 `INSTALL spatial` / `LOAD spatial`

**导出方式**：
- 右键图层 -> Export -> GeoParquet
- Conversion 菜单 -> To GeoParquet

[已核实] https://geolibre.app/user-guide/adding-data/ https://geolibre.app/roadmap/ （v0.3 更新）

### 5.4.3 FlatGeobuf

FlatGeobuf 是 FlatBuffers 编码的地理要素格式：

**加载方式**：
- Add Data -> Cloud Formats -> FlatGeobuf
- Components 插件也提供 FlatGeobuf 面板
- 支持本地文件和远程 URL

**导出方式**：
- Conversion 菜单 -> To FlatGeobuf（v2.2+，浏览器原生转换）

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.4.4 PMTiles

PMTiles 是 Protocol Buffers 编码的单文件瓦片集：

**加载方式**：
- Add Data -> Cloud Formats -> PMTiles
- Components 插件提供 PMTiles 面板
- 输入 PMTiles URL 即可加载

**导出方式**：
- Conversion 菜单 -> To PMTiles（v2.2+，浏览器原生转换）

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.4.5 Zarr

Zarr 是用于存储多维数组的云原生格式，常用于气象、海洋等时空数据：

**加载方式**（v2.4+）：
- Add Data -> Add Zarr Layer
- 输入 Zarr store URL
- 支持数据立方体的时间维度动画

[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

## 5.5 Web 服务

### 5.5.1 XYZ 瓦片服务

XYZ 是最简单的瓦片服务协议：

**URL 格式**：
```
https://example.com/tiles/{z}/{x}/{y}.png
```

**加载方式**：
- Add Data -> Web Service -> XYZ
- 输入 URL 模板
- 可选：设置最小/最大缩放级别、归属信息

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.5.2 WMS / WFS / WMTS

OGC 标准 Web 服务：

| 服务 | 协议 | GeoLibre 支持 |
|------|------|--------------|
| WMS | 地图图像服务 | GetMap 请求 |
| WFS | 要素服务 | GetFeature 请求 |
| WMTS | 瓦片地图服务 | 瓦片矩阵集 |

**加载方式**：
- Add Data -> Web Service -> WMS / WFS / WMTS
- 输入服务 URL
- 选择可用图层

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.5.3 ArcGIS 服务

支持 Esri 的两种服务类型：

- **ArcGIS FeatureServer**：矢量要素服务
- **ArcGIS VectorTileServer**：矢量瓦片服务

**加载方式**：
- Add Data -> Web Service -> ArcGIS
- 输入服务 URL

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.5.4 STAC 服务

SpatioTemporal Asset Catalog（STAC）是时空资产目录标准：[已核实] https://geolibre.app/user-guide/adding-data/

GeoLibre v2.4 新增 STAC 和 NASA Earthdata 目录浏览器：
- 搜索 STAC API 目录
- 浏览和预览时空资产
- 直接加载到地图

[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

### 5.5.5 OGC API - Features

GeoLibre v2.4 支持 OGC API - Features 标准作为矢量图层直接加载：[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

## 5.6 数据库

### 5.6.1 DuckDB

DuckDB 是 GeoLibre 的核心数据处理引擎：

**连接方式**：
- Add Data -> Database -> DuckDB
- 选择本地 .duckdb 文件或内存数据库
- 执行 SQL 查询加载结果

[已核实] https://geolibre.app/user-guide/sql-workspace/

### 5.6.2 PostgreSQL / PostGIS

连接远程 PostgreSQL + PostGIS 数据库：

**连接参数**：
- Host / Port
- Database name
- Username / Password
- Schema

**加载方式**：
- Add Data -> Database -> PostgreSQL
- 或数据源管理器中配置连接
- 选择空间表加载为图层

[已核实] https://geolibre.app/user-guide/adding-data/

## 5.7 3D 与高级图层

### 5.7.1 3D Tiles

3D Tiles 是 Cesium 开发的开放标准，用于流式传输 3D 地理空间数据：

**加载方式**：
- Add Data -> 3D -> 3D Tiles
- 输入 tileset.json URL
- 支持认证瓦片集（自定义请求头）

[已核实] https://geolibre.app/user-guide/adding-data/ https://geolibre.app/roadmap/ （v1.1 更新）

### 5.7.2 LiDAR

点云数据通过 Components 插件的 LiDAR 面板加载：

- 支持 .las、.laz 等格式
- 通过 deck.gl 渲染点云
- 支持颜色映射和高程着色

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.7.3 Gaussian Splats

高斯 splat 是一种新型 3D 场景表示方法：

- 通过 Components 插件加载
- 用于渲染摄影测量生成的 3D 场景

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.7.4 Georeferenced Video

地理配准的视频叠加图层（v1.1+）：

- 视频文件带有地理配准信息
- 在地图上以覆盖层形式播放
- 支持时间同步

[已核实] https://geolibre.app/roadmap/ （v1.1 更新）

### 5.7.5 Deck.gl 图层

通过 deck.gl 创建的高级可视化图层：

- 自定义 deck.gl layer 配置
- 支持多种渲染器（Scatterplot、Heatmap、Grid 等）
- v2.4 新增 Deck.gl Layer builder

[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

## 5.8 拖放加载

### 5.8.1 支持的拖放操作

GeoLibre 支持将以下文件直接拖放到地图区域：

- GeoJSON、Shapefile（.shp + 配套文件）、GeoPackage、KML、KMZ、GPX
- GeoTIFF、COG
- 包含地理数据的 CSV（需指定坐标字段）

[已核实] https://geolibre.app/user-guide/adding-data/

### 5.8.2 拖放行为

拖放文件后：
1. 自动识别文件格式
2. 调用对应的加载器
3. 添加到图层列表
4. 自动缩放到数据范围

[推断] 拖放行为基于标准文件拖放 API 和 GeoLibre 的加载机制推断。

## 5.9 数据转换

### 5.9.1 Conversion 菜单

Layer -> Conversion 提供格式转换功能：[已核实] https://geolibre.app/user-guide/adding-data/

**支持的转换目标**：
- GeoParquet
- FlatGeobuf
- PMTiles
- COG

### 5.9.2 浏览器内转换（v2.2+）

从 v2.2 开始，部分转换可在浏览器内完成，无需 Python sidecar：

- COG 转换
- FlatGeobuf 转换
- Shapefile 转换
- GeoPackage 转换
- Vector to PMTiles

[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

### 5.9.3 转换工作流

1. 选中源图层
2. Layer -> Conversion -> 选择目标格式
3. 配置转换参数（坐标系、压缩等）
4. 执行转换
5. 保存结果文件（桌面端）或下载（Web 端）

[推断] 转换工作流基于官网描述和通用 GIS 转换流程推断。

## 5.10 本章小结

GeoLibre 的数据加载能力覆盖了整个地理空间数据生态：

1. **本地文件**：20+ 种矢量/栅格格式，拖放即加载
2. **云原生格式**：GeoParquet、FlatGeobuf、PMTiles、COG、Zarr 开箱即用
3. **Web 服务**：XYZ、WMS、WFS、WMTS、ArcGIS、STAC
4. **数据库**：DuckDB、PostgreSQL/PostGIS
5. **3D 与高级**：3D Tiles、LiDAR、Gaussian splats、georeferenced video、deck.gl
6. **数据转换**：多种格式互转，部分支持浏览器内完成

这种广度的数据支持使 GeoLibre 能够处理绝大多数实际工作中的地理空间数据场景。

---

**本章信息源**
- [1] GeoLibre 添加数据文档：https://geolibre.app/user-guide/adding-data/ [检索日期 2026-09-04]
- [2] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-09-04]
- [3] GeoLibre SQL 工作区：https://geolibre.app/user-guide/sql-workspace/ [检索日期 2026-09-04]
