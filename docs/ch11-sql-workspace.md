---
last_update:
  date: 2026-09-04
  author: 手册维护
---

# 第 11 章：SQL 工作区与高级查询

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南 SQL 工作区（https://geolibre.app/user-guide/sql-workspace/）、Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测
> 手册内容最后更新：2026-09-04

## 11.1 SQL 工作区概览


![SQL 工作区](/img/ch11/ch11-01.png)
*SQL 工作区文档页，展示多引擎查询环境*


### 11.1.1 什么是 SQL 工作区

SQL 工作区是 GeoLibre 的 SQL 查询执行环境，支持在浏览器内运行空间 SQL 查询，分析已加载图层、本地文件和远程 URL。[已核实] https://geolibre.app/user-guide/sql-workspace/

**核心特点**：
- 无需安装数据库服务器
- 多个 SQL 引擎可选
- 查询结果可直接添加到地图
- 支持导出为 CSV 或 GeoParquet

### 11.1.2 支持的 SQL 引擎

GeoLibre 提供三种 SQL 引擎：[已核实] https://geolibre.app/user-guide/sql-workspace/

| 引擎 | 实现 | 特点 |
|------|------|------|
| DuckDB Spatial | DuckDB-WASM + Spatial 扩展 | 默认引擎，功能最全面 |
| PGlite | PostgreSQL + PostGIS (WASM) | PostGIS 兼容语法 |
| Apache Sedona | Sedona (WASM) | 大数据空间分析 |

### 11.1.3 打开 SQL 工作区

- Tools -> SQL Workspace
- 或工具栏 SQL 图标

[已核实] https://geolibre.app/user-guide/sql-workspace/

## 11.2 DuckDB Spatial SQL

### 11.2.1 DuckDB Spatial 概述

DuckDB Spatial 是 GeoLibre 的默认 SQL 引擎，基于 DuckDB-WASM 运行。[已核实] https://geolibre.app/user-guide/sql-workspace/

**特点**：
- 列式存储，查询速度快
- 支持 GeoParquet 原生读写
- 空间函数丰富
- 支持 HTTP 范围请求读取远程文件

### 11.2.2 加载空间扩展

首次使用 DuckDB Spatial 时，自动执行：

```sql
INSTALL spatial;
LOAD spatial;
```

[已核实] https://geolibre.app/

### 11.2.3 核心空间函数

DuckDB Spatial 提供以下空间函数类别：[推断] 基于 DuckDB Spatial 文档和 GeoLibre 功能推断

**几何构造**：
- `ST_Point(x, y)`：创建点
- `ST_LineFromText(wkt)`：从 WKT 创建线
- `ST_GeomFromGeoJSON(json)`：从 GeoJSON 创建几何

**几何访问**：
- `ST_X(geom)`、`ST_Y(geom)`：获取坐标
- `ST_Area(geom)`：计算面积
- `ST_Length(geom)`：计算长度
- `ST_Perimeter(geom)`：计算周长
- `ST_Centroid(geom)`：计算质心
- `ST_Boundary(geom)`：获取边界

**空间关系**：
- `ST_Intersects(a, b)`：判断是否相交
- `ST_Contains(a, b)`：判断是否包含
- `ST_Within(a, b)`：判断是否在内部
- `ST_Distance(a, b)`：计算距离
- `ST_Buffer(geom, distance)`：缓冲区

**空间变换**：
- `ST_Transform(geom, crs)`：坐标变换
- `ST_Simplify(geom, tolerance)`：几何简化
- `ST_Union(a, b)`：几何并集

### 11.2.4 查询加载的图层

已加载的 GeoLibre 图层在 DuckDB 中注册为虚拟表，可直接查询：

```sql
-- 查看图层所有记录
SELECT * FROM cities;

-- 条件筛选
SELECT name, population FROM cities WHERE population > 1000000;

-- 空间筛选
SELECT * FROM cities 
WHERE ST_Intersects(geom, ST_Buffer(ST_Point(116.4, 39.9), 50000));
```

[推断] 图层注册为虚拟表的行为基于 GeoLibre 的 DuckDB-WASM 集成推断。

### 11.2.5 加载外部文件

DuckDB Spatial 可直接读取远程和本地文件：

```sql
-- 读取远程 GeoParquet
SELECT * FROM read_parquet('https://example.com/data.parquet');

-- 读取远程 FlatGeobuf
SELECT * FROM ST_Read('https://example.com/data.fgb');

-- 读取本地 Shapefile（桌面端）
SELECT * FROM ST_Read('/path/to/data.shp');
```

[已核实] DuckDB Spatial 的 `ST_Read` 支持 FlatGeobuf、Shapefile、GeoJSON、KML 等格式。https://geolibre.app/

### 11.2.6 自动 URL 包装

GeoLibre 的 SQL 工作区支持自动 URL 包装：裸 URL 自动匹配到对应读取器并执行 HTTP 范围请求。[已核实] https://geolibre.app/user-guide/sql-workspace/

```sql
-- 以下 URL 自动识别为 GeoParquet 并加载
SELECT * FROM 'https://example.com/data.parquet';
```

## 11.3 PGlite PostGIS

### 11.3.1 PGlite 概述

PGlite 是在浏览器内运行的 PostgreSQL + PostGIS，通过 WASM 实现。[已核实] https://geolibre.app/user-guide/sql-workspace/

**特点**：
- 完全兼容 PostGIS 语法
- 支持 PostGIS 的全部空间函数
- 适合已有 PostGIS 经验的用户

### 11.3.2 与 DuckDB Spatial 的差异

| 维度 | DuckDB Spatial | PGlite PostGIS |
|------|---------------|----------------|
| 语法 | DuckDB 方言 | PostgreSQL/PostGIS 方言 |
| 性能 | 列式，分析快 | 行式，事务强 |
| 空间函数 | 核心函数 | PostGIS 全套 |
| 扩展性 | 有限 | 丰富 |

[推断] 差异对比基于两种数据库的公开特性推断。

## 11.4 Apache Sedona

### 11.4.1 Sedona 概述

Apache Sedona 是 Apache 基金会的开源空间数据处理系统。GeoLibre 通过 WASM 版本集成。[已核实] https://geolibre.app/user-guide/sql-workspace/

**特点**：
- 针对大数据优化
- 支持分布式空间连接
- 适合复杂的空间分析查询

[推断] Sedona 的具体功能基于 Apache Sedona 公开文档推断，GeoLibre 中 WASM 版本的功能可能有所裁剪。

## 11.5 示例查询库

### 11.5.1 官方示例

SQL 工作区提供示例查询库，帮助用户快速上手：[已核实] https://geolibre.app/user-guide/sql-workspace/

示例类别：
- 基础 SELECT 查询
- 空间筛选
- 空间连接
- 几何运算
- 聚合统计

### 11.5.2 常用查询模板

```sql
-- 1. 缓冲区查询
SELECT name, ST_Buffer(geom, 1000) AS buffer_geom 
FROM facilities;

-- 2. 空间连接：查找每个城市最近的机场
SELECT c.name AS city, a.name AS nearest_airport,
       ST_Distance(c.geom, a.geom) AS distance
FROM cities c
CROSS JOIN LATERAL (
  SELECT name, geom
  FROM airports
  ORDER BY c.geom <-> geom
  LIMIT 1
) a;

-- 3. 范围内计数：统计每个区域内的点数
SELECT z.name, COUNT(p.*) AS point_count
FROM zones z
LEFT JOIN points p ON ST_Intersects(z.geom, p.geom)
GROUP BY z.name;

-- 4. 面积计算与排序
SELECT name, ST_Area(geom) / 1000000 AS area_km2
FROM districts
ORDER BY area_km2 DESC;
```

[推断] 查询模板基于通用空间 SQL 和 DuckDB Spatial 语法推断。

## 11.6 查询历史

### 11.6.1 历史记录

SQL 工作区自动保存查询历史：[已核实] https://geolibre.app/user-guide/sql-workspace/

**功能**：
- 查看最近执行的查询
- 重新执行历史查询
- 收藏常用查询
- 清除历史记录

### 11.6.2 查询管理

- 每条历史记录显示执行时间和结果行数
- 失败的查询显示错误信息
- 可编辑历史查询后重新执行

[推断] 查询管理功能基于通用 SQL 客户端和官网描述推断。

## 11.7 结果添加到地图

### 11.7.1 空间结果可视化

包含几何列的查询结果可直接添加到地图：[已核实] https://geolibre.app/user-guide/sql-workspace/

**操作**：
1. 执行查询
2. 结果面板显示数据预览
3. 点击 "Add to Map"
4. 选择图层名称和样式
5. 结果作为新图层添加到图层面板

### 11.7.2 非空间结果

不含几何列的结果可导出为表格，或通过 JOIN 关联到空间数据后可视化。

## 11.8 结果导出

### 11.8.1 导出格式

SQL 工作区支持将查询结果导出为：[已核实] https://geolibre.app/user-guide/sql-workspace/

| 格式 | 说明 |
|------|------|
| CSV | 逗号分隔文本，无几何 |
| GeoParquet | 云优化地理空间格式，含几何 |

### 11.8.2 导出设置

- 坐标参考系统选择
- 字段筛选
- 记录筛选（全部或仅前 N 条）

[推断] 导出设置基于通用数据导出功能和官网描述推断。

## 11.9 表达式构建器（Expression Builder，v2.2+）

### 11.9.1 概述

v2.2 引入的 Expression Builder 是一个可视化的表达式编辑工具，集成在 SQL 工作区、筛选器和样式面板中。[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

**功能**：
- 拖拽字段和函数构建表达式
- 实时语法检查
- 实时结果预览
- 保存和复用表达式

### 11.9.2 应用场景

- 复杂的 SQL WHERE 条件
- 样式面板中的动态表达式
- 字段计算器的计算表达式
- 筛选器的条件表达式

## 11.10 按表达式选择（Select by Expression，v2.2+）

### 11.10.1 功能说明

v2.2 引入的 Select by Expression 功能，使用 Expression Builder 按条件选择要素。[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

**操作**：
1. 选中图层
2. 属性表或地图 -> "Select by Expression"
3. 使用 Expression Builder 构建条件
4. 执行选择
5. 选中的要素在地图和属性表中高亮

### 11.10.2 与 SQL 工作区的关系

Select by Expression 使用与 SQL 工作区相同的表达式语法，但作用于当前图层而非执行完整 SQL 查询。

## 11.11 本章小结

GeoLibre 的 SQL 工作区是一个强大的空间数据分析环境：

1. **多引擎支持**：DuckDB Spatial（默认）、PGlite PostGIS、Apache Sedona
2. **浏览器内执行**：无需服务器，WASM 驱动
3. **丰富的空间函数**：几何构造、访问、关系、变换
4. **自动 URL 包装**：裸 URL 自动识别格式并加载
5. **查询历史**：自动保存、收藏、复用
6. **结果可视化**：空间查询结果直接添加到地图
7. **灵活导出**：CSV、GeoParquet
8. **Expression Builder**（v2.2+）：可视化表达式编辑
9. **Select by Expression**（v2.2+）：图层内条件选择

SQL 工作区使 GeoLibre 超越了纯 GUI 工具，为熟悉 SQL 的用户提供了高效的数据分析入口。

---

**本章信息源**
- [1] GeoLibre SQL 工作区文档：https://geolibre.app/user-guide/sql-workspace/ [检索日期 2026-09-04]
- [2] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-09-04]
- [3] DuckDB Spatial 文档：https://duckdb.org/docs/stable/core_extensions/spatial/overview [检索日期 2026-09-04]
