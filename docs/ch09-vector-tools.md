# 第 9 章：空间分析 - 矢量工具

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南处理工具（https://geolibre.app/user-guide/processing/）、Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 9.1 Processing 面板概览


![主界面](/img/ch09/ch09-01.png)
*Processing 面板所在的主界面环境*


### 9.1.1 打开 Processing 面板

Processing 面板是 GeoLibre 空间分析的核心入口：[已核实] https://geolibre.app/user-guide/processing/

**打开方式**：
- Processing 菜单 -> 选择工具类别
- 工具栏 Processing 按钮

### 9.1.2 工具分类


![处理菜单全览](/img/ch09/ch09-02.png)
*Processing 菜单全览，按矢量、栅格、转换、Whitebox 分类*


Processing 工具按数据类型分为四大类：[已核实] https://geolibre.app/user-guide/processing/

| 类别 | 说明 | 引擎 |
|------|------|------|
| Vector | 矢量几何分析 | Turf.js / GeoPandas |
| Raster | 栅格分析 | rasterio |
| Conversion | 格式转换 | DuckDB-WASM / GDAL |
| Whitebox | WhiteboxTools 工具箱 | WhiteboxTools (sidecar) |

### 9.1.3 执行引擎

矢量工具有两个执行引擎：[已核实] https://geolibre.app/user-guide/processing/

1. **Turf.js**（默认，浏览器内）：纯 JavaScript 实现，无需服务器或 sidecar
2. **GeoPandas**（可选 sidecar / Pyodide）：Python 实现，功能更丰富

**引擎选择**：
- 简单几何操作：Turf.js 足够
- 复杂分析或大数据量：GeoPandas
- 浏览器内无 sidecar 时：Pyodide 内 GeoPandas（v1.1+）

[已核实] https://geolibre.app/roadmap/ （v0.6、v1.1 更新）

## 9.2 缓冲区（Buffer）


![矢量子菜单](/img/ch09/ch09-03.png)
*Vector 子菜单中的几何处理选项*


### 9.2.1 功能说明

缓冲区工具在要素周围创建指定距离的缓冲多边形。[已核实] https://geolibre.app/user-guide/processing/

**输入**：点、线、面图层
**输出**：面图层（MultiPolygon）

### 9.2.2 参数设置


![缓冲区参数弹窗](/img/ch09/ch09-08.png)
*Buffer 参数弹窗，基于 Whitebox WASM 本地运行*


| 参数 | 说明 | 示例 |
|------|------|------|
| 距离 | 缓冲距离 | 1000（米）|
| 单位 | 距离单位 | 米、千米、英尺、英里 |
| 分段数 | 圆弧分段数 | 8（默认值）|
| 是否合并 | 重叠缓冲区是否合并 | 是/否 |

[推断] 参数基于通用缓冲区工具和 GeoLibre 功能推断。

### 9.2.3 应用场景

- 道路两侧保护区划定
- 河流缓冲区分析
- 设施服务半径分析

## 9.3 质心（Centroids）

### 9.3.1 功能说明

计算每个面要素的质心（几何中心点）。[已核实] https://geolibre.app/user-guide/processing/

**输入**：面图层
**输出**：点图层

### 9.3.2 注意事项

- 质心可能落在面要素外部（如 L 形区域）
- 对于多部分几何，计算整体质心
- 结果点的属性继承自原始面要素

[推断] 质心行为基于通用 GIS 质心算法推断。

## 9.4 凸包（Convex Hull）


![几何处理子菜单](/img/ch09/ch09-04.png)
*Geometry Processing 子菜单详细选项*


### 9.4.1 功能说明

计算要素或要素集合的凸包（包含所有点的最小凸多边形）。[已核实] https://geolibre.app/user-guide/processing/

**两种模式**：
- **按要素**：每个要素单独计算凸包
- **按图层**：所有要素合并后计算一个凸包

### 9.4.2 应用场景

- 物种分布范围概括
- 聚类结果的可视化边界
- 数据覆盖范围概览

## 9.5 融合（Dissolve）

### 9.5.1 功能说明

将相邻且具有相同属性值的要素合并为一个要素。[已核实] https://geolibre.app/user-guide/processing/

**输入**：面图层
**输出**：面图层（要素数量减少）

### 9.5.2 参数

- **融合字段**：按哪个字段值分组融合
- **统计方法**：对数值字段使用何种统计（总和、平均值、计数等）

[推断] 融合参数基于通用 GIS 融合工具和 GeoLibre 功能推断。

## 9.6 边界框（Bounding Box）


![GeoLibre 子菜单](/img/ch09/ch09-05.png)
*GeoLibre 子菜单，包含 Buffer 3D 等 70+ 工具*


### 9.6.1 功能说明

计算每个要素的最小边界矩形。[已核实] https://geolibre.app/user-guide/processing/

**输入**：任意几何类型
**输出**：面图层（矩形多边形）

## 9.7 简化（Simplify）

### 9.7.1 功能说明

使用 Douglas-Peucker 算法简化几何，减少顶点数量。[已核实] https://geolibre.app/user-guide/processing/

**参数**：
- **容差**：简化阈值（单位与数据 CRS 一致）
- 容差越大，简化越激进，顶点越少

### 9.7.2 应用场景

- 降低数据量以提升渲染性能
- 为不同缩放级别准备多细节层次数据
- 消除数据采集中的噪声

## 9.8 平滑（Smooth，v1.1+）

### 9.8.1 功能说明

v1.1 引入的平滑工具，对几何进行平滑处理，减少棱角。[已核实] https://geolibre.app/roadmap/ （v1.1 更新）

**输入**：线或面图层
**输出**：线或面图层

### 9.8.2 算法

平滑通常使用 Chaikin 算法或样条插值，在保持整体形状的同时平滑边界。

[推断] 平滑算法基于通用 GIS 平滑工具和官网描述推断。

## 9.9 规则网格（Regular Grid，v1.1+）

### 9.9.1 功能说明

v1.1 引入的规则网格工具，在指定范围内生成规则的点或面网格。[已核实] https://geolibre.app/roadmap/ （v1.1 更新）

**参数**：
- 范围：网格覆盖的边界框
- 间距：网格点/面之间的距离
- 类型：点网格或面网格（渔网）

## 9.10 裁剪（Clip）

### 9.10.1 功能说明

用裁剪要素（Clip Features）裁剪输入要素，只保留裁剪范围内的部分。[已核实] https://geolibre.app/user-guide/processing/

**输入**：
- 输入图层（被裁剪）
- 裁剪图层（裁剪边界）

**输出**：与输入图层同类型的图层，但几何被裁剪

### 9.10.2 注意事项

- 裁剪图层应为面类型
- 属性完全继承自输入图层
- 多部分几何可能被拆分为多个要素

## 9.11 叠加分析（Intersect / Difference / Union）


![叠加分析菜单](/img/ch09/ch09-06.png)
*Overlay Analysis：Intersect、Union、Clip、Dissolve 等工具*


### 9.11.1 相交（Intersect）

计算两个图层的几何交集，只保留重叠部分。[已核实] https://geolibre.app/user-guide/processing/

**输出**：两个图层的属性合并，几何为交集。

### 9.11.2 差异（Difference）

计算输入图层与差异图层的几何差异，保留输入图层中不在差异图层中的部分。[已核实] https://geolibre.app/user-guide/processing/

### 9.11.3 并集（Union）

合并两个图层，在重叠区域创建新要素，非重叠区域保留原要素。[已核实] https://geolibre.app/user-guide/processing/

**输出**：所有几何组合，属性包含两个图层的字段。

### 9.11.4 叠加分析对比

| 操作 | 结果几何 | 结果属性 |
|------|----------|----------|
| Intersect | 仅重叠部分 | 两个图层字段合并 |
| Difference | 输入减去差异 | 仅输入图层字段 |
| Union | 所有组合 | 两个图层字段合并 |

[推断] 叠加分析的行为基于通用 GIS 叠加分析和官网描述推断。

## 9.12 空间连接（Spatial Join）

### 9.12.1 功能说明

根据空间关系将一个图层的属性连接到另一个图层。[已核实] https://geolibre.app/user-guide/processing/

**空间关系类型**：
- **相交**（Intersects）：要素相交
- **包含**（Contains）：目标要素包含源要素
- **在内部**（Within）：目标要素在源要素内部
- **最近**（Nearest）：最近的要素

### 9.12.2 参数

- **目标图层**：接收属性的图层
- **连接图层**：提供属性的图层
- **空间关系**：匹配条件
- **连接字段**：要添加的字段
- **统计方法**（一对多时）：聚合方式

[推断] 空间连接参数基于通用 GIS 空间连接工具和官网描述推断。

## 9.13 属性连接（Attribute Join，v1.3+）

### 9.13.1 功能说明

v1.3 引入的属性连接工具，按字段值匹配将表数据连接到图层。[已核实] https://geolibre.app/roadmap/ （v1.3 更新）

与第 7 章中提到的属性表面板连接功能互补，Processing 中的属性连接通常是工具链中的一步。

## 9.14 Voronoi / Delaunay（v1.3+）

### 9.14.1 Voronoi 图

v1.3 引入的 Voronoi 图工具，从点图层生成 Voronoi 多边形。[已核实] https://geolibre.app/roadmap/ （v1.3 更新）

**应用场景**：
- 服务区域划分（如最近商店/医院）
- 泰森多边形分析
- 空间插值的预处理

### 9.14.2 Delaunay 三角网

从点图层生成 Delaunay 三角网：[已核实] https://geolibre.app/roadmap/ （v1.3 更新）

**应用场景**：
- TIN（不规则三角网）生成
- 空间插值的基础网格
- 地形分析

## 9.15 H3 网格与空间分箱

### 9.15.1 H3 概述

H3 是 Uber 开发的六边形层级地理索引系统。GeoLibre 支持 H3 网格生成和空间分箱。[已核实] https://geolibre.app/user-guide/processing/

**特点**：
- 全球统一的六边形网格
- 多层级（分辨率 0-15）
- 相邻单元共享边（不同于四边形网格）
- 近似等面积

### 9.15.2 H3 网格生成

Processing -> Vector -> H3 Grid：[已核实] https://geolibre.app/roadmap/ （v2.4 更新 H3 插件）

**参数**：
- 范围：生成网格的边界
- 分辨率：H3 层级（0=最大，15=最小）
- 类型：生成网格面或按网格聚合点

### 9.15.3 空间分箱

将点数据聚合到 H3 网格中，计算每个网格的统计值：[推断] 基于通用空间分箱和 H3 功能推断

- 计数（每个网格内的点数）
- 数值字段的聚合（总和、平均值）

## 9.16 空间统计工具箱（v1.3+）


![空间统计菜单](/img/ch09/ch09-07.png)
*Spatial Statistics：Moran's I、Getis-Ord 等空间统计工具*


### 9.16.1 工具列表

v1.3 引入的空间统计工具箱提供以下分析：[已核实] https://geolibre.app/roadmap/ （v1.3 更新）

- **平均最近邻**（Average Nearest Neighbor）：判断点分布是聚类、离散还是随机
- **空间自相关**（Spatial Autocorrelation）：Moran's I 指数
- **高低聚类**（High/Low Clustering）：Getis-Ord General G
- **热点分析**（Hot Spot Analysis）：Getis-Ord Gi*

### 9.16.2 Emerging Hot Spot Analysis（v2.3+）

v2.3 新增的空间时间立方体 Emerging Hot Spot Analysis：[已核实] https://geolibre.app/roadmap/ （v2.3 更新）

分析时序数据中的热点演化模式，分类包括：
- 新的热点（New Hot Spot）
- 持续的热点（Persistent Hot Spot）
- 增强的热点（Intensifying Hot Spot）
- 历史的热点（Historic Hot Spot）
- 等 16 种分类

## 9.17 批处理运行器与模型链


![处理菜单完整展开](/img/ch09/ch09-09.png)
*Processing 菜单完整展开状态*


### 9.17.1 批处理

Processing 面板支持批量运行工具：[已核实] https://geolibre.app/user-guide/processing/

**功能**：
- 对多个图层或文件批量执行同一工具
- 对同一图层批量执行多个参数组合
- 保存批处理配置以供复用

### 9.17.2 模型构建器

模型构建器（Model Builder）允许将多个工具串联为处理模型：[推断] 基于通用 GIS 模型构建器和官网"model/pipeline chaining"描述推断

**应用场景**：
- 重复性分析工作流的自动化
- 复杂分析的标准化
- 分享和复用分析流程

## 9.18 浏览器内 GeoPandas 引擎（Pyodide，v1.1+）

### 9.18.1 Pyodide 概述

v1.1 引入的浏览器内 GeoPandas 引擎通过 Pyodide（CPython 的 WebAssembly 版本）运行：[已核实] https://geolibre.app/roadmap/ （v1.1 更新）

**特点**：
- 无需安装 Python 或 sidecar
- 在浏览器内运行 GeoPandas 分析
- 结果与本地 GeoPandas sidecar 一致

### 9.18.2 与 Sidecar 的选择

| 场景 | 推荐引擎 |
|------|----------|
| 简单几何操作 | Turf.js（最快）|
| 复杂分析，无 sidecar | Pyodide GeoPandas |
| 大数据量，有 sidecar | 本地 GeoPandas sidecar |

## 9.19 可选 Python Sidecar 引擎

### 9.19.1 Sidecar 概述

Python sidecar 是可选的本地 Python 环境，提供更强大的分析能力：[已核实] https://geolibre.app/user-guide/processing/

**功能**：
- GeoPandas 矢量分析
- rasterio 栅格分析
- WhiteboxTools 批处理

### 9.19.2 配置

桌面端可配置 sidecar 路径，Web 端通过 Pyodide 替代。[推断] 基于官网"optional sidecar"描述推断。

## 9.20 本章小结

GeoLibre 的矢量工具集覆盖了从基础几何操作到高级空间统计的完整能力：

1. **基础几何**：Buffer、Centroid、Convex Hull、Dissolve、Bounding Box、Simplify
2. **高级几何**：Smooth、Regular Grid、Voronoi/Delaunay、H3 Grid
3. **叠加分析**：Clip、Intersect、Difference、Union
4. **连接分析**：Spatial Join、Attribute Join
5. **空间统计**：平均最近邻、空间自相关、热点分析、Emerging Hot Spot
6. **执行引擎**：Turf.js（浏览器内）、Pyodide GeoPandas（浏览器内）、本地 Sidecar（桌面端）

浏览器内执行是 GeoLibre 矢量工具的核心优势，无需服务器即可运行复杂的空间分析。

---

**本章信息源**
- [1] GeoLibre 处理工具文档：https://geolibre.app/user-guide/processing/ [检索日期 2026-07-31]
- [2] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
