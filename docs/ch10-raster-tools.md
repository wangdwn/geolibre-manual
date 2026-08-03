# 第 10 章：空间分析 - 栅格工具

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南处理工具（https://geolibre.app/user-guide/processing/）、Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 10.1 栅格工具概览


![栅格子菜单分类](/img/ch10/ch10-01.png)
*Raster 子菜单分类：地形分析、变换、转换、统计、代数等*


### 10.1.1 栅格分析引擎

GeoLibre 的栅格分析通过可选的 Python sidecar 运行 rasterio 实现：[已核实] https://geolibre.app/user-guide/processing/

**执行模式**：
- **Sidecar 模式**（推荐）：本地 rasterio，功能完整
- **客户端回退**：部分简单操作在浏览器内完成

[已核实] https://geolibre.app/user-guide/processing/

### 10.1.2 工具分类

Processing -> Raster 包含以下工具类别：[已核实] https://geolibre.app/user-guide/processing/

- 地形分析（Hillshade、Slope、Aspect）
- 栅格变换（Reproject、Resample、Clip）
- 栅格转换（Polygonize、Contour）
- 栅格统计（Zonal、Focal Statistics）
- 栅格代数（Raster Calculator、Reclassify）
- 镶嵌（Mosaic）
- 光谱指数（Spectral Index Toolbox）
- 地理配准（Georeferencer）
- 插值（IDW / Kriging，v1.3+）

## 10.2 山体阴影（Hillshade）

### 10.2.1 功能说明

山体阴影通过模拟光照效果增强地形可视化。[已核实] https://geolibre.app/user-guide/processing/

**输入**：DEM（数字高程模型）栅格
**输出**：灰度山体阴影栅格

### 10.2.2 参数

| 参数 | 说明 | 典型值 |
|------|------|--------|
| 太阳方位角 | 光源方向（0-360度）| 315（西北）|
| 太阳高度角 | 光源仰角（0-90度）| 45 |
| Z 因子 | 高程缩放因子 | 1 |

[推断] 参数基于通用山体阴影算法和 GeoLibre 功能推断。

### 10.2.3 应用场景

- 地形图制作
- 地貌特征识别
- 与彩色 DEM 叠加增强立体感

## 10.3 坡度（Slope）

### 10.3.1 功能说明

计算每个像元的坡度（坡面与水平面的夹角）。[已核实] https://geolibre.app/user-guide/processing/

**输入**：DEM 栅格
**输出**：坡度栅格（单位：度或百分比）

### 10.3.2 输出值

- **度**（Degrees）：0-90 度，0 为平地，90 为垂直
- **百分比**（Percent）：rise/run * 100，0% 为平地

[推断] 输出单位基于通用坡度算法推断。

## 10.4 坡向（Aspect）

### 10.4.1 功能说明

计算每个像元的坡向（坡面朝向下坡方向）。[已核实] https://geolibre.app/user-guide/processing/

**输入**：DEM 栅格
**输出**：坡向栅格（单位：度，0=北，90=东，180=南，270=西）

### 10.4.2 特殊情况

- 平地（坡度为 0）的坡向值为 -1 或 NoData
- 北向坡（0度）和南向坡（180度）的植被、日照条件差异显著

[推断] 平地坡向处理基于通用坡向算法推断。

## 10.5 重投影（Reproject）

### 10.5.1 功能说明

将栅格数据从一个坐标参考系统转换到另一个。[已核实] https://geolibre.app/user-guide/processing/

**参数**：
- 目标 CRS（EPSG 代码或 WKT）
- 重采样方法

### 10.5.2 重采样方法

| 方法 | 适用场景 |
|------|----------|
| 最近邻（Nearest Neighbor）| 分类数据，保持原始值 |
| 双线性（Bilinear）| 连续数据，平滑结果 |
| 立方卷积（Cubic Convolution）| 连续数据，更平滑 |

[推断] 重采样方法基于 rasterio 标准方法和 GeoLibre 功能推断。

## 10.6 重采样（Resample）

### 10.6.1 功能说明

改变栅格的空间分辨率（像元大小）。[已核实] https://geolibre.app/user-guide/processing/

**升采样**（增大分辨率/减小像元）：增加像元数量，需要插值
**降采样**（减小分辨率/增大像元）：减少像元数量，需要聚合

### 10.6.2 参数

- 目标分辨率：输出像元大小
- 重采样方法：同上

## 10.7 裁剪（Clip）

### 10.7.1 功能说明

用矢量要素裁剪栅格，只保留裁剪范围内的像元。[已核实] https://geolibre.app/user-guide/processing/

**输入**：
- 栅格图层
- 矢量图层（裁剪边界）

**输出**：裁剪后的栅格

## 10.8 矢量化（Polygonize）

### 10.8.1 功能说明

将分类栅格转换为矢量多边形。[已核实] https://geolibre.app/user-guide/processing/

**输入**：分类栅格（如土地利用分类）
**输出**：面图层，每个类别一个多边形（或多个，如果有不连续区域）

### 10.8.2 参数

- **字段名称**：存储类别值的字段名
- **8连通/4连通**：像元连接性定义

[推断] 参数基于 GDAL polygonize 工具和 GeoLibre 功能推断。

## 10.9 等高线（Contour）

### 10.9.1 功能说明

从 DEM 栅格提取等高线。[已核实] https://geolibre.app/user-guide/processing/

**输入**：DEM 栅格
**输出**：线图层（等高线）

### 10.9.2 参数

| 参数 | 说明 |
|------|------|
| 等高距 | 相邻等高线的高程差 |
| 起始高程 | 第一条等高线的高程 |
| 最大/最小高程 | 生成范围限制 |

## 10.10 分区统计（Zonal Statistics）

### 10.10.1 功能说明

计算矢量区域范围内栅格的统计值。[已核实] https://geolibre.app/user-guide/processing/

**输入**：
- 栅格图层（数值数据）
- 矢量图层（区域边界，面类型）

**输出**：矢量图层，新增统计字段

### 10.10.2 统计指标

| 指标 | 说明 |
|------|------|
| Mean | 平均值 |
| Median | 中位数 |
| Std Dev | 标准差 |
| Min | 最小值 |
| Max | 最大值 |
| Range | 范围 |
| Sum | 总和 |
| Count | 像元数 |

[推断] 统计指标基于通用分区统计工具和 GeoLibre 功能推断。

## 10.11 焦点统计（Focal Statistics）

### 10.11.1 功能说明

对每个像元，计算其邻域内的统计值。[已核实] https://geolibre.app/user-guide/processing/

**邻域定义**：
- 矩形：3x3、5x5 等
- 圆形：指定半径

### 10.11.2 统计方法

- Mean、Median、Mode
- Min、Max、Range
- Std Dev、Variety

[推断] 焦点统计方法基于通用焦点统计工具和 GeoLibre 功能推断。

## 10.12 栅格计算器（Raster Calculator）

### 10.12.1 功能说明

基于像元值的代数运算生成新栅格。[已核实] https://geolibre.app/user-guide/processing/

**支持的运算**：
- 算术：+、-、*、/、^、%
- 逻辑：AND、OR、NOT、XOR
- 比较：=、!=、<、>、<=、>=
- 条件：IF/THEN/ELSE

### 10.12.2 表达式示例

```
# NDVI 计算
(band4 - band3) / (band4 + band3)

# 坡度筛选（只保留坡度 < 15 度的区域）
IF(slope < 15, 1, 0)

# 多波段合成
band1 * 0.3 + band2 * 0.5 + band3 * 0.2
```

[推断] 表达式语法基于通用栅格计算器和 GeoLibre 功能推断。

## 10.13 重分类（Reclassify）

### 10.13.1 功能说明

将栅格像元值按规则重新分类。[已核实] https://geolibre.app/user-guide/processing/

**重分类方式**：
- 单值映射：旧值 -> 新值
- 范围映射：最小值-最大值 -> 新值
- 表映射：从 CSV/表加载映射规则

## 10.14 镶嵌（Mosaic）

### 10.14.1 功能说明

将多个栅格图层合并为一个连续图层。[已核实] https://geolibre.app/user-guide/processing/

**处理重叠**：
- 第一个/最后一个优先
- 平均值
- 最小值/最大值

[推断] 重叠处理方式基于通用镶嵌工具和 GeoLibre 功能推断。

## 10.15 光谱指数工具箱（NDVI、NDWI、EVI）


![栅格 GeoLibre 工具列表](/img/ch10/ch10-02.png)
*栅格 GeoLibre 工具列表，Spectral Index 中包含 NDVI 等指数*


### 10.15.1 功能说明

光谱指数工具箱提供遥感常用植被/水体指数的一键计算。[已核实] https://geolibre.app/user-guide/processing/

**内置指数**：

| 指数 | 公式 | 用途 |
|------|------|------|
| NDVI | (NIR - Red) / (NIR + Red) | 植被健康度 |
| NDWI | (NIR - SWIR) / (NIR + SWIR) | 水体识别 |
| EVI | 2.5 * (NIR - Red) / (NIR + 6*Red - 7.5*Blue + 1) | 增强植被指数 |

### 10.15.2 波段预设

工具箱提供常见卫星传感器的波段预设：[已核实] https://geolibre.app/user-guide/processing/

- Landsat 8/9
- Sentinel-2
- 自定义波段配置

## 10.16 地理配准器（Georeferencer）


![1000+ 地理处理工具箱](/img/ch10/ch10-03.png)
*1000+ 地理处理工具箱总览*


### 10.16.1 功能说明

为未配准的栅格图像（如扫描地图、历史航拍图）添加地理参考。[已核实] https://geolibre.app/user-guide/processing/

**工作流**：
1. 加载未配准图像
2. 在图像上标记控制点（GCP）
3. 为每个 GCP 输入对应的地理坐标
4. 选择变换模型
5. 执行配准

### 10.16.2 变换模型

| 模型 | 最少 GCP | 适用场景 |
|------|----------|----------|
| 仿射（Affine）| 3 | 一般情况 |
| 投影（Projective）| 4 | 透视变形 |
| 多项式 1 阶 | 3 | 简单变形 |
| 多项式 2 阶 | 6 | 复杂变形 |

[推断] 变换模型基于通用地理配准工具和 GeoLibre 功能推断。

### 10.16.3 配准精度

- RMS 误差（均方根误差）评估配准精度
- 建议 RMS < 1 个像元
- 可删除误差过大的 GCP 后重新计算

[推断] 配准精度评估基于通用地理配准工具推断。

## 10.17 IDW / Kriging 插值（v1.3+）

### 10.17.1 功能说明

v1.3 引入的点图层到连续栅格表面的插值工具。[已核实] https://geolibre.app/roadmap/ （v1.3 更新）

**IDW（反距离加权）**：
- 基于已知点距离的加权平均
- 距离越近权重越大
- 简单、计算快

**Kriging（克里金）**：
- 基于变异函数的最优无偏插值
- 提供预测方差估计
- 更精确但计算复杂

### 10.17.2 参数

| 参数 | IDW | Kriging |
|------|-----|---------|
| 幂指数 | 距离权重衰减速率 | - |
| 搜索半径 | 参与计算的最大距离 | 变程（Range）|
| 最小点数 | 参与计算的最少点数 | 最少点数 |
| 变异函数模型 | - | 球形、指数、高斯 |

[推断] 参数基于通用插值算法和 GeoLibre 功能推断。

## 10.18 本章小结

GeoLibre 的栅格工具集覆盖地形分析、栅格变换、统计分析和遥感指数：

1. **地形分析**：Hillshade、Slope、Aspect
2. **栅格变换**：Reproject、Resample、Clip
3. **栅格转换**：Polygonize、Contour
4. **栅格统计**：Zonal Statistics、Focal Statistics
5. **栅格代数**：Raster Calculator、Reclassify
6. **镶嵌**：多栅格合并
7. **遥感指数**：NDVI、NDWI、EVI 工具箱
8. **地理配准**：扫描图像的地理参考
9. **插值**：IDW、Kriging（v1.3+）

栅格分析依赖 Python sidecar（桌面端）或客户端回退，功能完整度受执行环境限制。

---

**本章信息源**
- [1] GeoLibre 处理工具文档：https://geolibre.app/user-guide/processing/ [检索日期 2026-07-31]
- [2] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
