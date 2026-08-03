# 第 13 章：高级功能与集成

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官网功能列表、用户指南各章节、Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 13.1 AI 助手


![AI 助手文档页](/img/ch13/ch13-01.png)
*AI 助手文档页，支持自然语言交互*


### 13.1.1 功能概述

GeoLibre 内置 AI 助手，支持自然语言交互，将自然语言请求转换为 GeoLibre 操作。[已核实] https://geolibre.app/user-guide/ai-assistant/

**支持的操作类型**：
- Spatial SQL 查询生成和执行
- 图层符号化设置
- 添加/删除数据
- 地图控制（缩放、平移、定位）

### 13.1.2 提供商配置

AI 助手支持多提供商，需用户自行配置 API Key：[已核实] https://geolibre.app/user-guide/ai-assistant/

| 提供商 | 模型 | 配置方式 |
|--------|------|----------|
| Google | Gemini | API Key |
| Anthropic | Claude | API Key |
| OpenAI | GPT | API Key |

**配置路径**：Settings -> AI Assistant -> 选择提供商并输入 API Key

[已核实] https://geolibre.app/user-guide/ai-assistant/

### 13.1.3 使用示例

```
用户：把人口超过 100 万的城市标成红色
AI：执行符号化设置 -> 分类渲染 -> 选择 population 字段 -> 设置阈值 -> 应用红色
```

**特点**：
- 操作通过 GeoLibre 应用执行，保持可审计和可撤销
- 不直接操作底层数据
- 禁用状态直到配置 API Key

[已核实] https://geolibre.app/user-guide/ai-assistant/

### 13.1.4 多 AI 配置（v2.3+）

v2.3 支持多个命名的 AI 配置：[已核实] https://geolibre.app/roadmap/ （v2.3 更新）

- 为不同任务配置不同的 AI 提供商/模型
- 快速切换配置

## 13.2 AI 图像分割（SamGeo / SAM 3）

### 13.2.1 功能概述

AI Segmentation 功能基于 Meta 的 Segment Anything Model（SAM），用于图像分割。[已核实] https://geolibre.app/user-guide/segmentation/

**输入**：栅格图像（如卫星影像）
**输出**：分割后的矢量多边形

### 13.2.2 使用方式

1. 加载栅格图像
2. Tools -> AI Segmentation
3. 选择 SAM 模型版本（SAM 1/2/3）
4. 在图像上点击或框选区域
5. AI 自动分割目标对象
6. 导出分割结果为矢量图层

[已核实] https://geolibre.app/user-guide/segmentation/

### 13.2.3 SamGeo

SamGeo 是 Qiusheng Wu 开发的 SAM 地理空间封装库，GeoLibre 的 AI 分割功能基于此实现。[已核实] https://geolibre.app/user-guide/segmentation/

## 13.3 ONNX / YOLO 对象检测（v2.1+）

### 13.3.1 功能概述

v2.1 引入的浏览器内 ONNX/YOLO 对象检测，在浏览器中运行深度学习模型。[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

**特点**：
- 完全在浏览器内运行（ONNX Runtime Web）
- 无需服务器或 sidecar
- 支持 YOLO 系列模型

### 13.3.2 应用场景

- 卫星影像中的建筑/车辆检测
- 地理标签照片中的对象识别
- 快速目标提取

[推断] 应用场景基于通用对象检测和地理空间应用推断。

## 13.4 Python 控制台


![Python 控制台文档页](/img/ch13/ch13-02.png)
*Python 控制台文档页，支持应用内脚本控制*


### 13.4.1 功能概述

GeoLibre 内置 Python 控制台，允许通过 Python 脚本控制应用。[已核实] https://geolibre.app/user-guide/python-console/

**特点**：
- 在应用内直接编写和执行 Python 代码
- 访问当前项目的图层和数据
- 调用 GeoLibre 的 Python API

### 13.4.2 使用方式

1. Tools -> Python Console
2. 在控制台中输入 Python 代码
3. 按 Enter 执行
4. 查看输出结果

[已核实] https://geolibre.app/user-guide/python-console/

### 13.4.3 API 示例

```python
# 获取当前图层列表
layers = app.get_layers()

# 添加 GeoJSON
app.add_geojson({
    "type": "FeatureCollection",
    "features": [...]
})

# 添加瓦片图层
app.add_tile_layer("https://example.com/tiles/{z}/{x}/{y}.png")

# 添加 COG
app.add_cog("https://example.com/image.tif")
```

[已核实] https://geolibre.app/python/

## 13.5 Jupyter Notebook 面板

### 13.5.1 功能概述

GeoLibre 提供 Notebook 面板，在应用内运行 Jupyter Notebook。[已核实] https://geolibre.app/user-guide/python-console/

**两种模式**：
- **Web 版**：JupyterLite（浏览器内运行，无需服务器）
- **桌面端**：JupyterLab 服务器（需本地安装 Jupyter）

### 13.5.2 使用方式

1. Tools -> Notebook Panel
2. 新建或打开 Notebook
3. 编写代码单元格
4. 执行并查看结果
5. Notebook 中的代码可以控制 GeoLibre 地图

[已核实] https://geolibre.app/user-guide/python-console/

## 13.6 geolibre Python 包与 anywidget

### 13.6.1 geolibre 包

`geolibre` 是 PyPI 上的 Python 包，允许在 Jupyter Notebook 中嵌入完整 GeoLibre 应用。[已核实] https://geolibre.app/python/

**安装**：
```bash
pip install geolibre
```

### 13.6.2 anywidget 集成

geolibre 包基于 anywidget 标准，将 GeoLibre 作为 Jupyter widget 嵌入：[已核实] https://geolibre.app/python/

**特点**：
- leafmap 风格的 API
- 双向同步：Python 代码驱动地图，UI 编辑回读到 Python
- `.geolibre.json` 项目文件双向同步

### 13.6.3 API 示例

```python
import geolibre

# 创建地图
m = geolibre.Map()
m

# 添加数据
m.add_geojson("cities.geojson")
m.add_tile_layer("https://example.com/tiles/{z}/{x}/{y}.png")
m.add_cog("https://example.com/image.tif")

# 保存项目
m.save("my_project.geolibre.json")

# 从项目加载
m.load("my_project.geolibre.json")
```

[已核实] https://geolibre.app/python/

## 13.7 实时协作编辑

### 13.7.1 功能概述

GeoLibre 支持多人实时协作编辑同一项目（MVP 阶段）。[已核实] https://geolibre.app/collaboration/

**特点**：
- 多人同时查看和编辑
- 操作实时同步
- 冲突处理

### 13.7.2 配置要求

协作功能需要配置协作服务器：[已核实] https://geolibre.app/collaboration/

```
VITE_GEOLIBRE_COLLAB_URL=https://your-collab-server.example.com
```

[待核实] 协作功能目前为 MVP，完整功能的稳定性和扩展性尚待验证。

## 13.8 故事地图构建器

### 13.8.1 功能概述

故事地图构建器允许创建滚动驱动的交互式叙事地图。[已核实] https://geolibre.app/user-guide/storymaps/

**功能**：
- 滚动驱动的章节导航
- 每个章节关联地图视图和图层
- 支持文本、图片、视频嵌入
- 演示视图（Presenter View）
- 导出独立 HTML 文件

### 13.8.2 导出与发布

故事地图可以导出为独立的 HTML 文件，发布到任何 Web 服务器或静态托管服务。[已核实] https://geolibre.app/user-guide/storymaps/

## 13.9 网络分析

### 13.9.1 功能概述

GeoLibre 提供网络分析工具，基于线图层计算网络指标。[已核实] https://geolibre.app/user-guide/data-integrations/

**支持的分析**：
- **等时线**（Isochrone）：从某点出发在给定时间/距离内可达范围
- **服务区**（Service Area）：多个设施的服务范围划分
- **OD 成本矩阵**（Origin-Destination Cost Matrix）：多起点到多终点的成本计算

### 13.9.2 等时线

等时线计算从指定点出发的可达范围：[已核实] https://geolibre.app/user-guide/data-integrations/

**参数**：
- 起点：地图上的点或点图层
- 时间/距离阈值：多个阈值可一次计算
- 网络图层：道路网络线图层
- 方向：单向或双向

## 13.10 地理编码（Geocoding）

### 13.10.1 功能概述

GeoLibre 提供多提供商的地理编码服务：[已核实] https://geolibre.app/user-guide/data-integrations/

**支持的操作**：
- **正向地理编码**：地址 -> 坐标
- **批量地理编码**：多个地址一次性编码
- **反向地理编码**：坐标 -> 地址

### 13.10.2 提供商

地理编码支持多提供商抽象，可插拔不同服务：[已核实] https://geolibre.app/user-guide/data-integrations/

| 提供商 | 类型 | 备注 |
|--------|------|------|
| Nominatim | 开源 | OpenStreetMap 数据 |
| [待核实] | 其他 | 官网未列出完整提供商列表 |

[待核实] 官网未明确列出所有支持的地理编码提供商。

## 13.11 CesiumJS 3D 地球视图

### 13.11.1 功能概述

GeoLibre v2.0+ 支持通过 CesiumJS 切换到 3D 地球视图。[已核实] https://geolibre.app/user-guide/interface/

**特点**：
- 每个地图面板可独立切换 2D/3D
- Cesium World Imagery 和 Terrain 需要 Cesium Ion token
- 无 token 时 2D/3D 切换按钮隐藏

### 13.11.2 配置

1. 获取 Cesium Ion token（https://cesium.com/ion/）
2. Settings -> Environment Variables -> Cesium Ion token
3. 输入 token 后地图面板显示 2D/3D 切换按钮
4. 切换后地图以 3D 地球模式渲染

[已核实] https://geolibre.app/user-guide/interface/

## 13.12 行星映射（Planetary Mapping）

### 13.12.1 功能概述

GeoLibre v2.0+ 支持除地球外的其他行星和天体。[已核实] https://geolibre.app/roadmap/ （v2.0 更新）

**支持的天体**：

| 天体 | 数据来源 |
|------|----------|
| 火星 | OpenPlanetaryMap |
| 月球 | OpenPlanetaryMap |
| 水星 | USGS Astrogeology |
| 金星 | USGS Astrogeology |
| 木卫一~四 | USGS Astrogeology |
| 土卫六（泰坦）| USGS Astrogeology |
| 冥王星 | USGS Astrogeology |
| 卡戎 | USGS Astrogeology |

[已核实] https://geolibre.app/roadmap/ （v2.0 更新）
v2.1 新增 9 个天体的 USGS 底图。[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

### 13.12.2 使用方法

1. 配置 Cesium Ion token（行星数据需要）
2. Layers 面板中选择 Planet Switcher
3. 选择目标天体
4. 地图切换为该天体的坐标系和底图
5. 加载该天体的数据进行分析

[推断] 使用方法基于官网行星映射描述和 CesiumJS 的通用模式推断。

## 13.13 气象数据叠加（v2.0+）

### 13.13.1 功能概述

v2.0 引入 Weather 菜单，提供实时气象数据叠加。[已核实] https://geolibre.app/roadmap/ （v2.0 更新）

**数据类型**：
- 实时云量覆盖
- 降水雷达
- 太阳位置模拟

### 13.13.2 太阳位置模拟

根据日期、时间和位置计算太阳位置，模拟日照效果。[推断] 基于"sun position simulation"描述推断。

## 13.14 嵌入与分享

### 13.14.1 URL 参数

GeoLibre Web 版支持丰富的 URL 参数控制嵌入行为：[已核实] https://geolibre.app/user-guide/embedding/

| 参数 | 值 | 效果 |
|------|-----|------|
| `url` | 项目 URL | 打开指定项目 |
| `layout` | `compact` | 精简布局 |
| `panels` | `none`/`hidden`/`off` | 隐藏面板 |
| `toolbar` | `icons` | 仅图标工具栏 |
| `maponly` | 无值 | 纯地图模式 |
| `tool` | Whitebox 工具名 | 深度链接到工具（v2.3+）|

### 13.14.2 iframe 嵌入

```html
<iframe
  src="https://web.geolibre.app/?url={PROJECT_URL}&layout=compact"
  width="100%"
  height="600"
  frameborder="0"
></iframe>
```

[已核实] https://geolibre.app/user-guide/embedding/

### 13.14.3 postMessage API（v2.4+）

v2.4 引入版本化的 postMessage API，允许父页面与嵌入的 GeoLibre 通信：[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

## 13.15 飞行模拟器自由飞行相机（v2.4+）

### 13.15.1 功能概述

v2.4 引入的飞行模拟器模式，提供第一人称自由飞行相机控制。[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

**控制**：
- WASD：前后左右移动
- 鼠标：视角转向
- Q/E：上升/下降
- 速度调节

### 13.15.2 应用场景

- 3D 地形漫游
- 城市景观浏览
- 演示和展示

[推断] 应用场景基于通用飞行模拟器和 3D 可视化推断。

## 13.16 地图录制（v2.1+）

### 13.16.1 功能概述

v2.1 引入的地图录制功能，将地图渲染录制为视频。[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

**录制模式**：
- 全画布录制
- 指定边界框录制
- 路线动画录制（配合 Route Animation）

### 13.16.2 输出格式

- MP4 视频文件
- 可配置分辨率和帧率

[推断] 输出格式基于通用录屏工具和官网描述推断。

## 13.17 本章小结

GeoLibre 的高级功能覆盖 AI、开发集成、协作和多媒体：

1. **AI 助手**：自然语言操作，多提供商支持
2. **AI 分割**：SamGeo/SAM 3 图像分割
3. **对象检测**：ONNX/YOLO 浏览器内检测（v2.1+）
4. **Python 控制台**：应用内脚本控制
5. **Jupyter 集成**：geolibre 包 + anywidget，双向同步
6. **实时协作**：多人同时编辑（MVP）
7. **故事地图**：滚动驱动叙事，独立 HTML 导出
8. **网络分析**：等时线、服务区、OD 矩阵
9. **地理编码**：正向/反向/批量，多提供商
10. **3D 地球**：CesiumJS 集成，需 token
11. **行星映射**：火星、月球等 10+ 天体
12. **气象叠加**：云量、降水、太阳位置
13. **嵌入分享**：URL 参数、iframe、postMessage API（v2.4+）
14. **飞行模拟器**：第一人称 3D 漫游（v2.4+）
15. **地图录制**：MP4 视频导出（v2.1+）

这些功能使 GeoLibre 从 GIS 工具扩展为综合性的地理空间平台。

---

**本章信息源**
- [1] GeoLibre AI 助手文档：https://geolibre.app/user-guide/ai-assistant/ [检索日期 2026-07-31]
- [2] GeoLibre AI 分割文档：https://geolibre.app/user-guide/segmentation/ [检索日期 2026-07-31]
- [3] GeoLibre Python 控制台：https://geolibre.app/user-guide/python-console/ [检索日期 2026-07-31]
- [4] GeoLibre Python 包：https://geolibre.app/python/ [检索日期 2026-07-31]
- [5] GeoLibre 协作：https://geolibre.app/collaboration/ [检索日期 2026-07-31]
- [6] GeoLibre 故事地图：https://geolibre.app/user-guide/storymaps/ [检索日期 2026-07-31]
- [7] GeoLibre 嵌入与分享：https://geolibre.app/user-guide/embedding/ [检索日期 2026-07-31]
- [8] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
