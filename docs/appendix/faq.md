---
last_update:
  date: 2026-09-04
  author: 手册维护
---

# 附录 B：FAQ 与故障排除

> 检索日期：2026-09-04
> 手册内容最后更新：2026-09-04（对照 GeoLibre v2.9.0）

## B.1 常见问题

### Q1: GeoLibre Web 版加载很慢，怎么办？

**A**: Web 版首次加载需要下载 DuckDB-WASM 和 Pyodide（约 50-100MB），耗时取决于网络速度。建议：
- 使用稳定的网络连接
- 首次加载后浏览器会缓存资源，后续访问更快
- 桌面端安装后无此问题

[已核实] https://geolibre.app/

### Q2: 为什么某些数据格式在 Web 版中无法加载？

**A**: Web 版受浏览器安全沙箱限制，无法访问本地文件系统。以下功能仅在桌面端可用：
- 本地 MBTiles 文件
- 本地栅格文件直接读取
- 原生文件系统保存/打开
- 完整 JupyterLab 服务器

[已核实] https://geolibre.app/

### Q3: CesiumJS 3D 地球视图不显示？

**A**: v2.9 起即使没有 Cesium Ion token 也可以打开 3D 地球窗格（使用商店底图）。若需要 Cesium World Imagery / Terrain：
1. 访问 https://cesium.com/ion/ 注册免费账户
2. 创建 Access Token
3. 在 GeoLibre Settings -> Environment Variables 中输入 token

[已核实] https://geolibre.app/user-guide/interface/ https://github.com/opengeos/GeoLibre/releases/tag/v2.9.0

### Q4: WhiteboxTools 工具无法运行？

**A**: Whitebox 工具箱在浏览器 **WebAssembly** 中运行，**不需要** Python sidecar，Web / 桌面 / Android / iOS 均可使用完整工具集。若失败，请检查：
- 浏览器是否支持 WebAssembly
- 首次加载是否已完成 WASM 运行时下载
- 栅格 sidecar 工具（rasterio）与 Whitebox 不是同一套引擎

[已核实] https://geolibre.app/

### Q5: AI 助手无法使用？

**A**: AI 助手默认禁用，需要配置 API Key：
1. Settings -> AI Assistant
2. 选择提供商（Google Gemini / Anthropic / OpenAI）
3. 输入 API Key
4. 保存后 AI 助手激活

[已核实] https://geolibre.app/user-guide/ai-assistant/

### Q6: 如何分享我的项目？

**A**: 三种方式：
1. **Share 功能**：Project -> Share...，上传后获得公开 URL
2. **下载项目文件**：Project -> Save，分享 `.geolibre.json` 文件
3. **嵌入 iframe**：使用 URL 参数嵌入到网页

[已核实] https://geolibre.app/user-guide/projects/ https://geolibre.app/user-guide/embedding/

### Q7: GeoLibre 与 QGIS 的区别是什么？

**A**: 官方对比页把二者写成互补：QGIS 是功能最深的桌面 GIS；GeoLibre 是浏览器即开即用、跨平台的云原生 GIS。[已核实] https://geolibre.app/comparison/

- **部署**：GeoLibre 支持 Web / 桌面 / Android / iOS / Jupyter；QGIS 以桌面为主（外业常用独立的 QField）
- **工程互通**：GeoLibre v2.5 起可导入 QGIS `.qgs` / `.qgz`，并交换 QML / SLD 样式
- **分析**：QGIS 格式与工具广度仍最大（GDAL/OGR、GRASS、SAGA）；GeoLibre 在浏览器内提供 1,000+ Whitebox 工具
- **何时选 QGIS**：最广格式、最深制图/标签、超过浏览器内存的本地处理、特定成熟插件

[已核实] https://geolibre.app/comparison/ https://geolibre.app/user-guide/projects/

### Q8: 如何安装第三方插件？

**A**: 
1. Tools -> Plugins -> Marketplace
2. 浏览或搜索插件
3. 查看详情后点击 Install
4. 确认安装

[已核实] https://geolibre.app/user-guide/plugins/

### Q9: 协作编辑功能如何使用？

**A**: 需要配置协作中继 URL（`VITE_GEOLIBRE_COLLAB_URL`）。v2.5 起可自托管分享与协作服务，不必使用 Cloudflare 或官方托管。[已核实] https://geolibre.app/collaboration/ https://github.com/opengeos/GeoLibre/releases/tag/v2.5.0

### Q10: 支持哪些编程语言 API？

**A**:
- **Python**：`geolibre` 包（Jupyter / anywidget）
- **R**：`geolibre` R 包（RStudio / Quarto / Shiny）
- **JavaScript**：插件开发 API 与 `@geolibre/embed`
- **SQL**：DuckDB Spatial / PostGIS / Sedona

[已核实] https://geolibre.app/python/ https://geolibre.app/r/ https://geolibre.app/user-guide/plugins/

### Q11: 如何把现有 QGIS 工程转到 GeoLibre？

**A**: 在桌面端使用 Project → Import → Import QGIS Project…，选择 `.qgs` 或 `.qgz`。导入器会重建图层、分组、可见性、顺序、样式和地图视图，并列出无法导入的图层及原因。浏览器无法重开本机路径，请用 Desktop 导入后再分享。[已核实] https://geolibre.app/user-guide/projects/

### Q12: 托管的 web.geolibre.app 会上传我的数据吗？

**A**: 数据在浏览器会话中客户端处理。只有当你主动添加远程 URL 或明确分享工程时，数据才会离开浏览器。托管站点用 Google Analytics 统计**页面访问**，看不到你加载的图层；自行托管的构建不含分析。[已核实] https://geolibre.app/ https://geolibre.app/privacy/

## B.2 故障排除

### 问题：地图不显示或显示空白

**排查步骤**：
1. 检查网络连接（底图需要联网）
2. 检查浏览器 WebGL 支持（访问 https://get.webgl.org/）
3. 尝试刷新页面
4. 清除浏览器缓存后重试
5. 尝试其他浏览器

### 问题：数据加载失败

**排查步骤**：
1. 检查文件格式是否受支持（第 5 章格式列表）
2. 检查文件是否完整（如 Shapefile 需要 .shp + .dbf + .shx）
3. 检查文件编码（建议使用 UTF-8）
4. 检查坐标参考系统是否可识别
5. 查看浏览器控制台错误信息

### 问题：DuckDB-WASM 初始化失败

**排查步骤**：
1. 检查浏览器 WASM 支持
2. 确保浏览器未禁用 WebAssembly
3. 尝试禁用浏览器扩展（部分扩展可能干扰）
4. 刷新页面重试

### 问题：性能卡顿

**优化建议**：
1. 简化复杂样式（减少分级数量）
2. 减少同时显示的图层数量
3. 对大图层使用简化（Simplify）
4. 使用聚合（聚类或 H3 分箱）减少要素数量
5. 关闭不必要的面板和插件

## B.3 获取帮助

- **官方文档**：https://geolibre.app/user-guide/
- **GitHub Issues**：https://github.com/opengeos/GeoLibre/issues
- **官方教程**：https://geolibre.app/tutorials/

---

**本章信息源**
- [1] GeoLibre 官方文档：https://geolibre.app/user-guide/ [检索日期 2026-09-04]
- [2] GeoLibre GitHub：https://github.com/opengeos/GeoLibre [检索日期 2026-09-04]
