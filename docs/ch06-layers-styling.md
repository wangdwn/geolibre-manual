# 第 6 章：图层管理与符号化

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南图层管理（https://geolibre.app/user-guide/layers/）、样式（https://geolibre.app/user-guide/styling/）、Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 6.1 图层面板操作

### 6.1.1 图层列表

图层面板以垂直列表显示所有图层，顶部图层在地图上显示在最上层。[已核实] https://geolibre.app/user-guide/layers/

每个图层项显示：
- 可见性开关（眼睛图标）
- 图层类型图标（点/线/面/栅格）
- 图层名称
- 展开/折叠箭头（有子项时）

### 6.1.2 显示与隐藏

点击图层项左侧的眼睛图标切换图层可见性。隐藏图层不渲染，但仍保留在项目中。

批量操作：
- 按住 Shift/Ctrl 多选图层后统一切换可见性
- 图层组可以整组切换

[推断] 批量操作基于通用 UI 模式推断，官网未明确说明多选行为。

### 6.1.3 排序

拖拽图层项上下移动可改变叠加顺序。操作有即时视觉反馈，地图会实时更新渲染顺序。

[已核实] https://geolibre.app/user-guide/layers/

### 6.1.4 分组

右键图层面板空白处 -> "New Group" 创建图层组。[已核实] https://geolibre.app/user-guide/layers/

分组功能：
- 支持嵌套分组（组内再建组）
- 组可整体显示/隐藏
- 组可整体删除（可选是否删除组内图层）
- 拖拽图层到组内或移出组

### 6.1.5 删除图层

右键图层 -> "Remove Layer" 或按 Delete 键。

删除时可选择：
- 仅从项目中移除引用
- 同时删除本地源文件（桌面端，谨慎操作）

[推断] 删除选项基于通用 GIS 应用行为推断。

## 6.2 图层属性查看

### 6.2.1 图层信息

右键图层 -> "Layer Properties" 查看图层元数据：

- 数据源路径/URL
- 坐标参考系统（CRS）
- 要素数量
- 字段列表及类型
- 空间范围（边界框）
- 图层类型

[推断] 图层属性面板的具体字段基于通用 GIS 应用和 GeoLibre 功能推断。

### 6.2.2 缩放到图层

右键图层 -> "Zoom to Layer" 将地图视图缩放到该图层的空间范围。[已核实] https://geolibre.app/user-guide/layers/

对于跨大范围的图层（如全球数据），此操作会将地图缩放到能完整显示该图层的最小缩放级别。

## 6.3 符号化基础

### 6.3.1 符号化概念

**符号化**（Symbology / Styling）是将数据属性映射为视觉外观的过程。GeoLibre 的符号化系统基于 MapLibre GL JS 的样式规范，同时扩展了高级渲染能力。[已核实] https://geolibre.app/user-guide/styling/

### 6.3.2 打开样式面板

选中图层后，右侧面板自动切换为样式面板。也可以通过 View -> Style Panel 手动打开。

[已核实] https://geolibre.app/user-guide/styling/

### 6.3.3 样式属性

不同几何类型有不同的样式属性：

**点图层**：
- 圆点：颜色、半径、描边、透明度
- 图标：图标图片、大小、旋转
- 文本标签：字体、大小、颜色、偏移

**线图层**：
- 线颜色、线宽、线型（实线/虚线）
- 描边、透明度

**面图层**：
- 填充颜色、填充透明度
- 描边颜色、描边宽度
- 描边线型

[已核实] https://geolibre.app/user-guide/styling/

## 6.4 分类渲染器（Categorized）

### 6.4.1 什么是分类渲染

分类渲染按字段的离散值将要素分组，每组分配不同颜色。[已核实] https://geolibre.app/user-guide/styling/

**适用场景**：土地类型、行政区划、道路等级等分类数据。

### 6.4.2 配置分类渲染

1. 选中矢量图层
2. 样式面板 -> 渲染器类型选择 "Categorized"
3. 选择分类字段
4. GeoLibre 自动提取唯一值列表
5. 为每个值分配颜色（自动分配或手动选择）
6. 点击 "Apply" 应用

[已核实] https://geolibre.app/user-guide/styling/

### 6.4.3 颜色方案

GeoLibre 内置多种颜色方案（Color Ramp）：
- 定性方案（Qualitative）：适用于分类数据
- 渐变色方案（Sequential）：适用于有序分类
- 发散色方案（Diverging）：适用于有正负意义的数据

[已核实] https://geolibre.app/user-guide/styling/

## 6.5 分级渲染器（Graduated）

### 6.5.1 什么是分级渲染

分级渲染按数值字段的范围将要素分级，每级分配不同颜色或大小。[已核实] https://geolibre.app/user-guide/styling/

**适用场景**：人口密度、温度分布、收入等级等连续数据。

### 6.5.2 配置分级渲染

1. 选中矢量图层
2. 样式面板 -> 渲染器类型选择 "Graduated"
3. 选择数值字段
4. 选择分级方法：
   - **等间隔**（Equal Interval）：每级范围相等
   - **等数量**（Quantile）：每级要素数量相等
   - **自然断点**（Natural Breaks/Jenks）：基于数据分布的断点
   - **标准差**（Standard Deviation）：以均值为中心的分级
5. 设置分级数量
6. 选择颜色方案
7. 点击 "Apply"

[已核实] https://geolibre.app/user-guide/styling/

## 6.6 表达式渲染器（Expression）

### 6.6.1 Mapbox GL 表达式

GeoLibre 支持 Mapbox GL 表达式语法，可以实现基于数据属性的动态样式：[已核实] https://geolibre.app/user-guide/styling/

**基本语法**：
```json
[
  "interpolate",
  ["linear"],
  ["get", "population"],
  0, "#f7fbff",
  1000000, "#08306b"
]
```

**支持的表达式类型**：
- `get`：获取属性值
- `has`：检查属性存在
- `match`：条件匹配
- `interpolate`：插值
- `step`：阶梯函数
- 数学运算：+、-、*、/、%、^、abs、round、floor、ceil

[已核实] Mapbox GL JS 表达式规范。

### 6.6.2 表达式构建器（v2.2+）

GeoLibre v2.2 引入了可视化的 Expression Builder，降低了表达式编写门槛：[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

- 图形化拖拽构建表达式
- 字段列表自动提示
- 实时预览结果
- 应用于：筛选器、标签、样式、选择

## 6.7 热力图与聚类

### 6.7.1 热力图

热力图用于可视化点密度，颜色从冷色（低密度）到暖色（高密度）渐变。[已核实] https://geolibre.app/user-guide/styling/

**配置参数**：
- 半径：影响热力图的扩散范围
- 强度：密度权重
- 颜色渐变：自定义或预设方案
- 透明度

### 6.7.2 聚类

点聚类将相邻的点合并为一个聚合点，显示聚合数量。[已核实] https://geolibre.app/user-guide/styling/

**配置参数**：
- 聚类半径：多少像素范围内的点合并
- 最大缩放级别：超过此级别停止聚类
- 聚合点样式：按数量分级的大小/颜色

## 6.8 规则渲染器（Rule-based，v2.2+）

### 6.8.1 规则渲染概述

规则渲染允许为图层定义多个渲染规则，每个规则包含一个条件表达式和对应的符号设置。[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

**特点**：
- 多条规则按顺序匹配
- 支持嵌套规则（子规则）
- 支持比例尺依赖的可见性
- 每条规则有独立的符号属性

### 6.8.2 应用场景

- 同一图层中按不同条件显示不同样式（如：主干道用粗线、次干道用细线）
- 比例尺依赖的简化显示（放大后才显示细节）
- 复杂的多条件分类

[推断] 规则渲染的具体行为基于 QGIS 的规则渲染器和官网 v2.2 描述推断。

## 6.9 符号交换

### 6.9.1 支持的交换格式

GeoLibre v2.0+ 支持三种符号交换格式：[已核实] https://geolibre.app/roadmap/ （v2.0 更新）

| 格式 | 说明 | 支持 |
|------|------|------|
| OGC SLD | OGC 样式图层描述符标准 | 导入/导出 |
| QGIS QML | QGIS 样式文件 | 导入/导出 |
| Mapbox GL Style JSON | MapLibre/Mapbox 样式规范 | 导入/导出 |

### 6.9.2 导入符号

1. 选中图层
2. 样式面板 -> "Import Style"
3. 选择样式文件（.sld / .qml / .json）
4. 映射字段（如需要）
5. 应用

### 6.9.3 导出符号

1. 选中图层
2. 样式面板 -> "Export Style"
3. 选择目标格式
4. 保存文件

[推断] 导入/导出流程基于通用 GIS 应用行为和官网描述推断。

## 6.10 样式管理器预设库（v2.2+）

### 6.10.1 预设库

GeoLibre v2.2 引入了 Style Manager，提供预设符号库：[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

**功能**：
- 浏览内置预设样式
- 保存自定义样式到预设库
- 按类别浏览（基础、交通、自然、行政区划等）
- 快速应用到图层

### 6.10.2 符号包（v2.2+）

v2.2 还引入了符号包（Symbology Pack），包含：
- 倒多边形遮罩（Inverted polygon masks）
- 箭头和标记线（Arrow and marker lines）
- 几何生成器（Geometry generators）

[已核实] https://geolibre.app/roadmap/ （v2.2 更新）

## 6.11 图层间样式复制（v2.3+）

### 6.11.1 复制样式

v2.3 支持在图层间复制和粘贴样式：[已核实] https://geolibre.app/roadmap/ （v2.3 更新）

**操作**：
1. 右键源图层 -> "Copy Style"
2. 右键目标图层 -> "Paste Style"

### 6.11.2 适用条件

- 源图层和目标图层几何类型相同（点-点、线-线、面-面）
- 字段名称需匹配（分类/分级渲染时）
- 栅格图层样式只能在栅格图层间复制

[推断] 复制样式的限制条件基于通用 GIS 应用行为推断。

## 6.12 本章小结

GeoLibre 的符号化系统从简单到复杂提供了完整的能力梯度：

1. **简单样式**：统一颜色/线宽，适合快速查看
2. **分类渲染**：按离散值分组着色
3. **分级渲染**：按数值范围分级着色
4. **表达式渲染**：基于 Mapbox GL 表达式的动态样式
5. **规则渲染**（v2.2+）：多条件、比例尺依赖的复合渲染
6. **热力图/聚类**：点密度可视化
7. **符号交换**：与 QGIS、OGC 标准互操作
8. **预设库**：快速复用和标准化样式

这套符号化系统既满足基础用户的简单需求，也支持高级用户的复杂场景。

---

**本章信息源**
- [1] GeoLibre 图层面板：https://geolibre.app/user-guide/layers/ [检索日期 2026-07-31]
- [2] GeoLibre 样式面板：https://geolibre.app/user-guide/styling/ [检索日期 2026-07-31]
- [3] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
- [4] Mapbox GL JS 表达式规范：https://docs.mapbox.com/style-spec/reference/expressions/ [检索日期 2026-07-31]
