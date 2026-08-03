# 第 3 章：界面与基本操作

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南界面概览（https://geolibre.app/user-guide/interface/）、产品实测
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 3.1 首次启动

### 3.1.1 Web 版首次启动

打开 https://web.geolibre.app 后，界面会经历以下加载阶段：

1. **应用 shell 加载**：HTML/CSS/JS 资源下载（约 1-3MB）
2. **WASM 引擎初始化**：DuckDB-WASM 和 Pyodide 下载并编译（约 30-80MB，首次访问）
3. **地图渲染**：MapLibre GL JS 初始化，加载默认底图

[推断] WASM 引擎大小基于 DuckDB-WASM 和 Pyodide 的已知包体积估算，实际大小因版本而异。

加载完成后，你将看到一个完整的地图工作区，中心定位在默认视图位置。

### 3.1.2 桌面端首次启动

桌面端启动时会检查更新（如果配置了自动更新），然后加载与 Web 版相同的界面。桌面端额外支持：

- 本地文件系统访问（通过 Tauri 原生对话框）
- 最近文件跟踪
- 本地设置持久化

[已核实] https://geolibre.app/user-guide/interface/

## 3.2 主界面布局

GeoLibre 的界面采用经典的 GIS 应用布局，包含四个主要区域：[已核实] https://geolibre.app/user-guide/interface/

```
+------------------+------------------+------------------+
|                  |    工具栏         |                  |
+------------------+------------------+------------------+
|                  |                  |                  |
|   左侧面板       |     地图区域      |   右侧面板       |
|   (图层面板)      |                  |   (样式面板)      |
|                  |                  |                  |
+------------------+------------------+------------------+
|                  |    状态栏         |                  |
+------------------+------------------+------------------+
```

### 3.2.1 工具栏

工具栏位于界面顶部，包含以下元素（从左到右）：

- **GeoLibre Logo**：点击返回主页
- **菜单按钮**：File / Edit / View / Layer / Processing / Tools / Settings / Help
- **快速操作按钮**：新建项目、打开项目、保存、撤销、重做
- **地图控制按钮**：缩放、全屏、定位
- **插件控制按钮**（动态显示）

[已核实] https://geolibre.app/user-guide/interface/

### 3.2.2 地图区域

地图区域是界面的核心，显示 MapLibre GL JS 渲染的地图。

**基本操作**：
- **平移**：鼠标左键拖拽，或触摸拖拽
- **缩放**：鼠标滚轮，双击放大，双指捏合
- **旋转**：右键拖拽 或 Shift + 左键拖拽
- **倾斜**：Ctrl + 鼠标滚轮 或 双指垂直滑动

[已核实] MapLibre GL JS 标准交互方式。

**地图控件**（可开关）：
- 导航控件（缩放、旋转、指南针）
- 比例尺
- 归属信息
- Logo

[已核实] https://geolibre.app/user-guide/map-controls/

### 3.2.3 左侧面板（图层面板）

左侧面板默认显示图层面板，包含：

- **图层列表**：按叠加顺序显示所有图层，可拖拽排序
- **图层控制**：显示/隐藏、展开/折叠、删除
- **图层分组**：支持创建图层组
- **底图切换**：OpenFreeMap 或其他配置的底图

[已核实] https://geolibre.app/user-guide/layers/

### 3.2.4 右侧面板（样式与属性）

右侧面板可切换显示不同内容：

- **样式面板**：配置当前选中图层的渲染样式
- **属性表面板**：查看和编辑图层属性数据
- **其他面板**：根据激活的插件动态变化

[已核实] https://geolibre.app/user-guide/styling/ https://geolibre.app/user-guide/attribute-table/

### 3.2.5 状态栏

状态栏位于底部，显示：

- 当前鼠标位置的坐标（经度/纬度）
- 当前缩放级别
- 数据加载状态
- 处理任务进度（如有）

[已核实] https://geolibre.app/user-guide/interface/

## 3.3 工具栏详解

### 3.3.1 File 菜单

| 选项 | 功能 | 快捷键 |
|------|------|--------|
| New Project | 新建空项目 | Ctrl+N |
| Open Project | 打开本地 .geolibre.json 文件 | Ctrl+O |
| Open from URL | 通过 URL 打开项目 | |
| Save Project | 保存当前项目 | Ctrl+S |
| Save As | 另存为 | Ctrl+Shift+S |
| Share Project | 上传到 share.geolibre.app | |
| Recent Projects | 最近打开的项目列表 | |
| Print | 打印/导出地图 | Ctrl+P |

[已核实] https://geolibre.app/user-guide/projects/ https://geolibre.app/user-guide/interface/

### 3.3.2 Edit 菜单

- Undo / Redo（支持图层操作的历史记录）
- 复制/粘贴图层样式（v2.3+）

[已核实] https://geolibre.app/user-guide/interface/

### 3.3.3 View 菜单

控制界面元素的显示/隐藏：

- 图层面板（Layers Panel）
- 样式面板（Style Panel）
- 属性表面板（Attribute Table Panel）
- 数据源管理器（Data Source Manager，v2.1+）
- 暗色模式切换
- 全屏模式

[已核实] https://geolibre.app/user-guide/interface/

### 3.3.4 Layer 菜单

- Add Data（添加数据入口）
- New Layer（新建空图层）
- Duplicate Layer（复制图层）
- Remove Layer（删除图层）
- Zoom to Layer（缩放至图层范围）

[已核实] https://geolibre.app/user-guide/layers/

### 3.3.5 Processing 菜单

处理工具的入口，分为：
- Vector（矢量工具）
- Raster（栅格工具）
- Conversion（格式转换）
- Whitebox（WhiteboxTools）
- Spatial Statistics（空间统计，v1.3+）

[已核实] https://geolibre.app/user-guide/processing/

### 3.3.6 Tools 菜单

内置工具的快捷入口：
- Measure（测量）
- Bookmark（书签）
- Minimap（小地图）
- View State（视图状态）
- Field Collection（野外采集）

[已核实] https://geolibre.app/user-guide/map-controls/

## 3.4 图层面板

### 3.4.1 图层列表操作

**图层顺序**：列表顶部的图层在地图上显示在最上层，底部图层在最下层。

**拖拽排序**：按住图层项上下拖拽可改变叠加顺序。

**显示/隐藏**：点击图层项左侧的眼睛图标切换可见性。

**展开/折叠**：点击图层项右侧的箭头展开/折叠子项（如分组图层）。

[已核实] https://geolibre.app/user-guide/layers/

### 3.4.2 图层分组

右键点击图层列表空白处 -> "New Group" 创建图层组。支持嵌套分组。

分组后可以对整组进行统一操作（显示/隐藏、删除）。

[已核实] https://geolibre.app/user-guide/layers/

### 3.4.3 底图管理

图层面板底部可切换底图。默认使用 OpenFreeMap 底图，也可以通过 Add Data 添加自定义底图（XYZ、WMS 等）。

底图作为特殊图层始终位于图层栈的最底层。

[推断] 底图管理逻辑基于 MapLibre 的标准实践和官网描述。

## 3.5 样式面板

选中图层后，右侧面板自动切换为样式面板。不同图层类型显示不同的样式选项。

### 3.5.1 矢量图层样式

- **Simple（简单样式）**：统一颜色、线宽、填充
- **Categorized（分类渲染）**：按字段值分类着色
- **Graduated（分级渲染）**：按数值字段分级着色
- **Expression（表达式渲染）**：使用 Mapbox GL 表达式
- **Heatmap（热力图）**：点密度热力图
- **Clustering（聚类）**：点聚类显示
- **Rule-based（规则渲染，v2.2+）**：基于规则的复合渲染

[已核实] https://geolibre.app/user-guide/styling/

### 3.5.2 栅格图层样式

- **Single-band（单波段）**：灰度或伪彩色渲染
- **RGB（三波段合成）**：真彩色或假彩色合成
- **Spectral Index（光谱指数）**：NDVI、NDWI、EVI 等

[已核实] https://geolibre.app/user-guide/styling/

## 3.6 属性表面板

### 3.6.1 打开属性表

- 选中图层 -> 右键 -> "Open Attribute Table"
- 或点击图层面板中的属性表图标

[已核实] https://geolibre.app/user-guide/attribute-table/

### 3.6.2 属性表功能

属性表面板提供以下功能：

- **数据浏览**：分页显示要素属性
- **字段计算器**：计算新字段值
- **筛选**：按条件筛选记录
- **排序**：按字段排序
- **选择**：在表中选择要素（地图同步高亮）
- **图表**：字段统计图表
- **导出**：导出为 GeoJSON、CSV 等格式

[已核实] https://geolibre.app/user-guide/attribute-table/

## 3.7 地图导航

### 3.7.1 基本导航

| 操作 | 鼠标 | 触摸 |
|------|------|------|
| 平移 | 左键拖拽 | 单指拖拽 |
| 缩放 | 滚轮 | 双指捏合 |
| 放大 | 双击 | 双击 |
| 旋转 | 右键拖拽 / Shift+左键 | 双指旋转 |
| 倾斜 | Ctrl+滚轮 | 双指垂直滑动 |

[已核实] MapLibre GL JS 标准交互。

### 3.7.2 导航控件

地图右上角（可配置位置）的导航控件提供：

- **放大按钮**（+）
- **缩小按钮**（-）
- **指南针**：点击恢复北向
- **定位按钮**：定位到当前地理位置（需浏览器授权）

[已核实] https://geolibre.app/user-guide/map-controls/

### 3.7.3 书签

Tools -> Bookmark 可以保存当前视图状态（位置、缩放、旋转、倾斜），便于快速返回。

书签随项目保存，可在不同设备间同步（通过项目文件）。

[已核实] https://geolibre.app/user-guide/map-controls/

## 3.8 暗色模式切换

View 菜单或设置面板可切换暗色/亮色模式。

暗色模式下：
- 界面元素（面板、工具栏、菜单）切换为深色主题
- 地图底图保持原样（底图本身有独立的暗色变体）
- 代码编辑器、SQL 工作区切换为暗色主题

[已核实] https://geolibre.app/user-guide/interface/

## 3.9 视图状态保存与恢复

### 3.9.1 自动保存

项目文件（`.geolibre.json`）自动保存以下视图状态：

- 地图中心坐标和缩放级别
- 旋转角度和倾斜角度
- 面板布局（展开/折叠、宽度）
- 当前选中的图层

[推断] 基于项目文件格式和官网"Save/Open"功能描述推导。

### 3.9.2 手动保存视图

Tools -> View State 可以显式保存和恢复命名视图。

[已核实] https://geolibre.app/user-guide/map-controls/

## 3.10 本章小结

GeoLibre 的界面设计遵循 GIS 应用的经典范式：

- **工具栏**：菜单和快捷操作
- **左侧面板**：图层管理
- **右侧面板**：样式和属性
- **地图区域**：核心可视化
- **状态栏**：坐标和状态信息

这种布局对 QGIS 和 ArcGIS 用户来说非常熟悉，学习成本低。Web 版和桌面端保持一致的界面，确保跨平台的无缝切换。

---

**本章信息源**
- [1] GeoLibre 界面概览：https://geolibre.app/user-guide/interface/ [检索日期 2026-07-31]
- [2] GeoLibre 图层面板：https://geolibre.app/user-guide/layers/ [检索日期 2026-07-31]
- [3] GeoLibre 样式面板：https://geolibre.app/user-guide/styling/ [检索日期 2026-07-31]
- [4] GeoLibre 属性表：https://geolibre.app/user-guide/attribute-table/ [检索日期 2026-07-31]
- [5] GeoLibre 地图控制：https://geolibre.app/user-guide/map-controls/ [检索日期 2026-07-31]
- [6] GeoLibre 项目管理：https://geolibre.app/user-guide/projects/ [检索日期 2026-07-31]
