# 第 12 章：插件系统与市场

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南插件（https://geolibre.app/user-guide/plugins/）、Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测

## 12.1 插件架构

### 12.1.1 插件系统概述

GeoLibre 的插件系统允许扩展应用功能，分为两类：[已核实] https://geolibre.app/user-guide/plugins/

| 类型 | 说明 | 来源 |
|------|------|------|
| 内置插件 | 随 GeoLibre 打包，需手动激活 | 官方 |
| 外部插件 | 从插件市场安装，第三方开发 | 社区 |

### 12.1.2 插件技术基础

插件基于 GeoLibre 的 Plugin API 开发：[已核实] https://geolibre.app/user-guide/plugins/

**插件结构**：
- `plugin.json`：插件元数据（名称、版本、入口点、权限）
- 前端代码：React 组件或原生 JS
- 可选：后端代码（通过 sidecar 或 WASM）

### 12.1.3 插件生命周期

1. **注册**：GeoLibre 启动时扫描内置插件和已安装的外部插件
2. **激活**：用户在插件管理器中激活插件
3. **加载**：动态加载插件代码（桌面端 CSP 允许 `blob:` 脚本执行）
4. **运行**：插件 UI 集成到界面
5. **停用**：用户停用或卸载插件

[已核实] https://geolibre.app/user-guide/plugins/ https://geolibre.app/roadmap/

## 12.2 内置插件列表

### 12.2.1 已知的内置插件

GeoLibre 包含以下内置插件（部分需手动激活）：[已核实] https://geolibre.app/user-guide/plugins/

| 插件 | 功能 | 默认状态 |
|------|------|----------|
| Layer Control | 图层控制增强 | 激活 |
| Basemaps | 底图管理 | 激活 |
| MapLibre Components | FlatGeobuf/PMTiles/Zarr/LiDAR/Gaussian splat 面板 | 可选 |
| Swipe | 卷帘对比 | 可选 |
| Street View | 街景查看 | 可选 |
| Time Slider | 时序数据动画 | 可选 |
| Overture Maps | Overture Maps 数据浏览 | 可选 |
| LiDAR | 点云可视化 | 可选 |
| GeoAgent | [待核实] 具体功能待确认 | 可选 |
| GeoEditor | [待核实] 具体功能待确认 | 可选 |
| Atmosphere | 大气效果 | 可选 |
| GeoLens | 目录浏览器（v2.3+）| 可选 |
| H3 Grid | 六边形网格（v2.4+）| 可选 |

### 12.2.2 激活内置插件

1. 打开插件管理器（Tools -> Plugins）
2. 在内置插件列表中找到目标插件
3. 点击开关激活
4. 插件 UI 出现在工具栏或面板中

[已核实] https://geolibre.app/user-guide/plugins/

## 12.3 插件市场

### 12.3.1 市场概述

GeoLibre 内置插件市场，支持浏览、安装、更新和卸载第三方插件。[已核实] https://geolibre.app/user-guide/plugins/

**市场特点**：
- Curated registry：人工审核的插件列表
- 显式安装确认：用户必须明确同意安装
- 版本检查：检测插件更新
- 卸载确认：防止误操作

[已核实] https://geolibre.app/roadmap/ （v1.0 市场设计）

### 12.3.2 安装插件

1. Tools -> Plugins -> Marketplace
2. 浏览或搜索插件
3. 查看插件详情（描述、版本、作者、权限）
4. 点击 "Install"
5. 确认安装
6. 安装完成后自动激活或手动激活

[已核实] https://geolibre.app/user-guide/plugins/

### 12.3.3 更新与卸载

**更新**：
- 插件管理器显示可更新插件列表
- 点击 "Update" 进行更新
- 支持原地重新获取（in-place re-fetch）

**卸载**：
- 插件管理器中找到已安装插件
- 点击 "Uninstall"
- 确认卸载

[已核实] https://geolibre.app/roadmap/ （v1.0 市场设计）

## 12.4 插件控制位置

### 12.4.1 UI 集成

插件可以在以下位置添加 UI 控件：[已核实] https://geolibre.app/roadmap/ （v0.5 更新）

- **工具栏**：添加按钮或下拉菜单
- **左侧面板**：添加标签页
- **右侧面板**：添加标签页
- **地图覆盖层**：添加自定义 HTML 覆盖
- **菜单栏**：添加菜单项

### 12.4.2 控制位置配置

插件的 `plugin.json` 中声明 UI 入口点，GeoLibre 根据声明将插件 UI 挂载到对应位置。

[推断] 插件 UI 集成机制基于 Plugin API 设计和官网描述推断。

## 12.5 外部插件开发入门

### 12.5.1 开发环境

开发 GeoLibre 插件需要：[推断] 基于 GeoLibre 开源代码和通用插件开发实践推断

- Node.js 和 npm/yarn
- React 和 TypeScript 基础
- GeoLibre Plugin API 了解

### 12.5.2 插件包结构

```
my-plugin/
  plugin.json          # 插件元数据
  index.js / index.tsx  # 入口文件
  package.json         # 依赖
  README.md            # 文档
```

**plugin.json 示例**：
```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Plugin description",
  "author": "Your Name",
  "entry": "index.js",
  "permissions": ["layer:read", "map:write"]
}
```

[推断] plugin.json 结构基于官网"plugin.json contract"描述和通用插件元数据推断。

### 12.5.3 打包与分发

**方式一：Curated Registry（当前）**
- 提交插件到 GeoLibre 的 curated registry
- 通过市场安装

**方式二：直接 Manifest URL**
- 托管 plugin.json 和代码到任意 HTTP 服务器
- 用户通过 manifest URL 安装

**方式三：Zip 安装（v1.6+）**
- 打包为 zip 文件
- 用户直接上传安装

[已核实] https://geolibre.app/roadmap/ （v1.0、v1.6 更新）

## 12.6 插件注册表设计

### 12.6.1 注册表阶段

GeoLibre 的插件注册表分三个阶段实现：[已核实] https://geolibre.app/roadmap/ （v1.0 市场设计）

| 阶段 | 状态 | 说明 |
|------|------|------|
| Phase 1 | 已完成 | Curated static registry + 浏览/安装 UI |
| Phase 2 | 进行中 | 版本检查、更新和卸载流 |
| Phase 3 | 计划中 | 第三方作者提交工作流 |

### 12.6.2 安全模型

插件安全通过以下机制保障：[已核实] https://geolibre.app/user-guide/plugins/

- **Curated registry**：人工审核插件
- **显式安装确认**：用户必须同意安装
- **权限声明**：插件必须声明所需权限
- **代码审查**：curated registry 中的插件经过审核

[已核实] https://geolibre.app/roadmap/ （v1.0 安全说明）

## 12.7 MapLibre Components 插件

### 12.7.1 功能概述

MapLibre Components 插件封装了 `maplibre-gl-components` 库，提供多种高级数据格式的可视化面板。[已核实] https://geolibre.app/user-guide/adding-data/

**包含的面板**：
- FlatGeobuf 面板
- PMTiles 面板
- Zarr 面板
- LiDAR 面板
- Gaussian splat 面板

### 12.7.2 使用方法

1. 激活 MapLibre Components 插件
2. 在 Add Data 或图层面板中使用对应的面板
3. 输入数据源 URL 或选择本地文件
4. 面板渲染对应格式的数据

[已核实] https://geolibre.app/user-guide/adding-data/

## 12.8 常用插件详解

### 12.8.1 Swipe（卷帘对比）

Swipe 插件提供卷帘对比功能，用于比较两个图层的差异。[已核实] https://geolibre.app/user-guide/plugins/

**操作**：
1. 激活 Swipe 插件
2. 选择左右两个图层
3. 在地图上拖拽卷帘线对比

### 12.8.2 Street View（街景）

Street View 插件集成街景查看功能：[已核实] https://geolibre.app/user-guide/plugins/

**操作**：
1. 激活 Street View 插件
2. 在地图上点击位置
3. 显示该位置的街景图像

### 12.8.3 Overture Maps

Overture Maps 插件浏览 Overture Maps Foundation 提供的开放地图数据：[已核实] https://geolibre.app/user-guide/plugins/

**数据类型**：
- 行政区划
- 交通网络
- 建筑轮廓
- 地名

### 12.8.4 Time Slider（时间滑块）

Time Slider 插件已在第 8 章详细介绍，此处不重复。

### 12.8.5 Mapillary（v2.1+）

v2.1 引入的 Mapillary 插件集成 Mapillary 街景图像：[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

### 12.8.6 Historical Imagery（v2.1+）

v2.1 引入的历史影像插件，浏览历史卫星/航拍图像：[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

### 12.8.7 Elevation Profile（v2.1+）

v2.1 引入的高程剖面插件，沿选定的线要素生成高程剖面图：[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

## 12.9 GeoLens 目录浏览器（v2.3+）

### 12.9.1 功能概述

GeoLens 是 v2.3 引入的目录浏览器插件，用于浏览和发现地理空间数据集。[已核实] https://geolibre.app/roadmap/ （v2.3 更新）

**功能**：
- 浏览公开地理空间数据目录
- 搜索数据集
- 预览数据
- 一键加载到 GeoLibre

### 12.9.2 数据源

GeoLens 可能连接的数据源：[推断] 基于"catalog browser"描述和通用地理空间数据目录推断

- 公开数据门户
- STAC 目录
- 研究机构数据发布

## 12.10 H3 六边形网格插件（v2.4+）

### 12.10.1 功能概述

v2.4 将 H3 功能扩展为独立插件，提供六边形网格的生成和分析。[已核实] https://geolibre.app/roadmap/ （v2.4 更新）

**功能**：
- 在指定范围生成 H3 网格
- 点数据聚合到 H3 网格
- H3 网格的空间分析

## 12.11 本章小结

GeoLibre 的插件系统是功能扩展的核心机制：

1. **内置插件**：Layer Control、Basemaps、MapLibre Components、Swipe、Street View、Time Slider、Overture Maps、LiDAR、Atmosphere 等
2. **外部插件**：通过市场浏览、安装、更新、卸载
3. **市场机制**：Curated registry + 显式确认 + 权限声明
4. **开发入口**：Plugin API + plugin.json + React/TypeScript
5. **安全模型**：人工审核 + 用户确认 + 权限控制
6. **特色插件**：Mapillary、Historical Imagery、Elevation Profile（v2.1+）、GeoLens（v2.3+）、H3 Grid（v2.4+）

插件生态是 GeoLibre 长期竞争力的关键，Phase 3 的第三方提交工作流将进一步丰富插件库。

---

**本章信息源**
- [1] GeoLibre 插件文档：https://geolibre.app/user-guide/plugins/ [检索日期 2026-07-31]
- [2] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-07-31]
