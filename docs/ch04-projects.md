---
last_update:
  date: 2026-09-04
  author: 手册维护
---

# 第 4 章：项目与数据管理

> [事实与研判分离说明]
> 本章信息源：GeoLibre 官方用户指南项目管理（https://geolibre.app/user-guide/projects/）、GitHub Roadmap
> 标注说明：[已核实] = 有明确来源；[待核实] = 来源单一或存疑；[推断] = 合理推测
> 手册内容最后更新：2026-09-04

## 4.1 项目概念与 .geolibre.json 格式

### 4.1.1 什么是项目

GeoLibre 的**项目**（Project）是一个工作单元，保存了当前地图工作区的完整状态。[已核实] https://geolibre.app/user-guide/projects/

一个项目包含：
- 所有加载的图层及其配置
- 图层的样式设置
- 图层顺序和分组
- 地图视图状态（中心、缩放、旋转、倾斜）
- 面板布局
- 环境变量（不含敏感 token）

### 4.1.2 .geolibre.json 文件格式

项目保存为 `.geolibre.json` 文件，这是一个基于 JSON 的开放格式。[已核实] https://geolibre.app/user-guide/projects/

**文件特点**：
- **纯文本**：可直接用文本编辑器查看和修改
- **自包含**：图层数据可以是内联的（GeoJSON）或引用的（URL）
- **可共享**：通过 URL 传递即可让他人打开相同项目
- **版本无关**：格式设计考虑向前兼容

**示例结构**（简化）：

```json
{
  "version": "2.4",
  "name": "My Project",
  "description": "Sample project",
  "map": {
    "center": [116.397, 39.916],
    "zoom": 10,
    "bearing": 0,
    "pitch": 0
  },
  "layers": [
    {
      "id": "layer-1",
      "name": "Cities",
      "type": "geojson",
      "source": {
        "type": "geojson",
        "data": { ... }
      },
      "style": { ... }
    }
  ],
  "settings": { ... }
}
```

[推断] 具体字段名称和结构基于官网描述推导，实际格式可能略有差异。

## 4.2 新建、打开、保存项目

### 4.2.1 新建项目

**操作路径**：
- Project -> New...
- 或工具栏 "New" 按钮
- 快捷键：Ctrl+N

新建项目会清空当前工作区，创建空白地图。如果当前项目有未保存的更改，会提示是否保存。

[已核实] https://geolibre.app/user-guide/projects/

### 4.2.2 打开项目

**从本地文件打开**（桌面端）：
- Project -> Open From -> File...
- 或工具栏 "Open" 按钮
- 快捷键：Ctrl+O
- 选择 `.geolibre.json` 文件

**从 URL 打开**：
- Project -> Open From -> URL...
- 输入项目的公开 URL

**从图库打开**：
- Project -> Open From -> Gallery... [已核实] https://geolibre.app/user-guide/projects/

[已核实] https://geolibre.app/user-guide/projects/

### 4.2.3 保存项目

**保存到本地**（桌面端）：
- Project -> Save
- 快捷键：Ctrl+S
- 首次保存会弹出文件对话框

**另存为**：
- Project -> Save As...
- 快捷键：Ctrl+Shift+S

[已核实] https://geolibre.app/user-guide/projects/

### 4.2.4 Web 版的保存差异

Web 版没有本地文件系统访问权限，因此：
- "Save" 会触发浏览器下载 `.geolibre.json` 文件
- "Open" 使用浏览器文件选择器

[已核实] https://geolibre.app/user-guide/projects/

## 4.3 通过 URL 分享项目


![Cloud 端分享页](/img/ch04/ch04-02.png)
*share.geolibre.app 项目分享页面*


### 4.3.1 Share 功能

Project -> Share... 可以将当前项目上传到 GeoLibre 的分享服务：[已核实] https://geolibre.app/user-guide/projects/

**要求**：
- 需要 GeoLibre 分享服务的个人 API token
- 数据通过 HTTPS 上传到 share.geolibre.app
- 上传后获得一个公开 URL

### 4.3.2 分享 URL 格式

分享后的项目 URL 格式：

```
https://share.geolibre.app/{username}/{project-name}.geolibre.json
```

示例：
```
https://share.geolibre.app/giswqs/3d-tiles.geolibre.json
```

[已核实] https://geolibre.app/user-guide/embedding/

### 4.3.3 接收者打开分享项目

接收者可以通过以下方式打开：

1. **直接访问 Web 版 URL**：
```
https://web.geolibre.app/?url=https://share.geolibre.app/giswqs/3d-tiles.geolibre.json
```

2. **在 GeoLibre 中通过 "Open from URL" 打开**

3. **嵌入 iframe**：
```html
<iframe src="https://web.geolibre.app/?url=https://share.geolibre.app/giswqs/3d-tiles.geolibre.json" width="100%" height="600"></iframe>
```

[已核实] https://geolibre.app/user-guide/embedding/

## 4.4 从 URL 打开项目

### 4.4.1 支持的 URL 类型

GeoLibre 可以从以下类型的 URL 打开项目：

- **直接 .geolibre.json URL**：任何可公开访问的 `.geolibre.json` 文件
- **share.geolibre.app URL**：GeoLibre 分享服务的 URL
- **GitHub Raw URL**：GitHub 仓库中的原始文件 URL
- **其他静态托管 URL**：如 Gist、S3 等

[已核实] https://geolibre.app/user-guide/projects/

### 4.4.2 URL 参数方式

通过 URL 参数传递项目地址是最直接的分享方式：

```
https://web.geolibre.app/?url={PROJECT_URL}
```

可以同时组合多个参数：

```
https://web.geolibre.app/?url={PROJECT_URL}&layout=compact&panels=none
```

[已核实] https://geolibre.app/user-guide/embedding/

## 4.5 最近项目管理

### 4.5.1 桌面端最近项目

桌面端维护两个级别的最近项目列表：[已核实] https://geolibre.app/roadmap/ （v0.6、v1.0 更新）

- **文件最近**：本地文件系统的最近打开文件
- **URL 最近**：最近通过 URL 打开的项目

最近项目列表显示在：
- File 菜单 -> Recent Projects
- 启动时的欢迎界面（如有）

### 4.5.2 Web 端最近项目

Web 端使用浏览器的 localStorage 或 IndexedDB 存储最近项目信息，包括：
- 项目名称
- 最后打开时间
- 项目 URL（如果是 URL 打开的项目）

[推断] Web 端最近项目存储机制基于浏览器的标准存储 API，官网未详细说明。

### 4.5.3 清除最近项目

Settings -> General 中可以清除最近项目历史记录。

[推断] 清除功能基于通用设置面板推断。

## 4.6 数据源管理器（Data Source Manager）


![界面文档页](/img/ch04/ch04-03.png)
*GeoLibre 官方用户指南文档站界面*


### 4.6.1 概述

数据源管理器是 GeoLibre v2.1 引入的 QGIS 风格浏览器面板，用于统一管理所有数据连接。[已核实] https://geolibre.app/roadmap/ （v2.1 更新）

**功能**：
- 浏览本地文件系统
- 连接 PostGIS 数据库
- 管理 Web 服务（WMS、WFS 等）
- 收藏常用数据源
- 拖拽加载数据到地图

### 4.6.2 打开数据源管理器

View -> Data Source Manager 或工具栏按钮。

[已核实] https://geolibre.app/roadmap/ （v2.1）

### 4.6.3 数据源类型

| 类型 | 说明 | 平台 |
|------|------|------|
| 本地文件 | 浏览本地文件系统 | 桌面端 |
| PostGIS | PostgreSQL + PostGIS 数据库连接 | 全平台 |
| WMS/WFS | OGC Web 服务 | 全平台 |
| 收藏夹 | 用户保存的常用连接 | 全平台 |

[推断] 数据源类型基于 QGIS 风格的通用设计和官网 v2.1 描述推断。

## 4.7 本地文件系统集成（桌面端）


![桌面端下载页](/img/ch04/ch04-01.png)
*geolibre.app/downloads 桌面端下载页面*


### 4.7.1 Tauri 原生文件访问

桌面端通过 Tauri 框架提供原生文件系统访问能力：[已核实] https://geolibre.app/

**优势**：
- 原生文件对话框（支持多选、文件类型过滤）
- 直接读取本地 MBTiles 文件
- 本地栅格文件直接渲染
- 项目文件直接保存到指定路径

### 4.7.2 外部原生图层

GeoLibre 支持注册外部原生图层（External Native Layers）：[已核实] https://geolibre.app/roadmap/ （v0.6 更新）

- 从本地目录注册 GeoJSON 文件为图层
- 注册栅格底图为外部原生图层
- 这些图层不嵌入项目文件，而是引用本地路径

### 4.7.3 文件类型关联

桌面端安装后可以打开本地 `.geolibre.json` 工程。v2.9 起支持从桌面拖放或直接打开 GeoLibre 工程文件。[已核实] https://github.com/opengeos/GeoLibre/releases/tag/v2.9.0

## 4.8 导入 QGIS / ArcGIS Pro 工程（v2.5+）

### 4.8.1 导入 QGIS 工程

Project → Import → Import QGIS Project… 读取 `.qgs` 或 `.qgz`，并在 GeoLibre 中重建图层、嵌套分组、组可见性、图层顺序、样式和保存的地图视图。[已核实] https://geolibre.app/user-guide/projects/

导入器针对文件型矢量图层以及应用能打开的栅格。无法导入的图层不会导致整份工程失败，而是按原因汇总报告（不支持的数据提供者 / 格式、缺失源、网络共享路径、远程源等）。[已核实] https://geolibre.app/user-guide/projects/

官方格式参考补充：解析使用 DOMParser 读 XML，**不执行 QGIS 代码**；仅导入已识别的矢量格式与 GeoTIFF。[已核实] https://geolibre.app/tutorials/supported-formats-en/

浏览器构建无法重开本机磁盘路径，这类图层会列为跳过；请在 GeoLibre Desktop 中打开同一工程。[已核实] https://geolibre.app/user-guide/projects/

### 4.8.2 导入 ArcGIS Pro 工程

Project → Import → Import ArcGIS Pro Project… 读取 `.aprx` 或独立 `.mapx`。GeoLibre 直接读文件内 CIM JSON，**无需安装** ArcGIS Pro 或 ArcPy。[已核实] https://geolibre.app/user-guide/projects/

多地图工程只导入第一张 2D 地图。文件地理数据库等不受支持的源会在导入后按原因列出；桌面端可用 Add Data → File Geodatabase (GDB) 补加要素类。[已核实] https://geolibre.app/user-guide/projects/

### 4.8.3 自动保存、崩溃恢复与模板

GeoLibre 会在编辑停顿约 3 秒后把快照写入本机 IndexedDB，**不会**改写 `.geolibre.json`。Project → History... 可浏览并恢复快照（上限约每项目 20 份、单份 10 MB、合计 50 MB）。崩溃恢复提示仅出现在独立浏览器构建（非 iframe）。[已核实] https://geolibre.app/user-guide/projects/

Project → Save as template... 可将当前工程存为个人模板；可选 Strip data layers，只保留底图、分组、样式与布局。[已核实] https://geolibre.app/user-guide/projects/

## 4.9 本章小结

GeoLibre 的项目管理围绕 `.geolibre.json` 这一开放格式展开：

1. **本地工作流**：新建 -> 编辑 -> 保存 -> 打开（桌面端原生文件系统）
2. **分享工作流**：Share -> 获得 URL -> 他人通过 URL 打开
3. **嵌入工作流**：URL 参数 -> iframe 嵌入 -> 自定义界面
4. **数据源管理**：统一的面板管理本地文件、数据库、Web 服务
5. **从 QGIS / ArcGIS Pro 导入**：保留图层结构与样式，不支持的源按原因报告

项目的开放格式设计确保了数据的可移植性和长期可访问性，不锁定在特定平台或软件中。也可以在 QGIS 中制图后导入 GeoLibre 发布或嵌入。[已核实] https://geolibre.app/comparison/

---

**本章信息源**
- [1] GeoLibre 项目管理：https://geolibre.app/user-guide/projects/ [检索日期 2026-09-04]
- [2] GeoLibre 嵌入与分享：https://geolibre.app/user-guide/embedding/ [检索日期 2026-09-04]
- [3] GeoLibre Roadmap：https://geolibre.app/roadmap/ [检索日期 2026-09-04]
- [4] 支持格式参考（含 QGIS 工程）：https://geolibre.app/tutorials/supported-formats-en/ [检索日期 2026-09-04]
- [5] 平台对比：https://geolibre.app/comparison/ [检索日期 2026-09-04]
