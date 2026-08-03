# 附录 B：FAQ 与故障排除

> 检索日期：2026-07-31

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

**A**: 3D 地球视图需要 Cesium Ion token。请：
1. 访问 https://cesium.com/ion/ 注册免费账户
2. 创建 Access Token
3. 在 GeoLibre Settings -> Environment Variables 中输入 token
4. 2D/3D 切换按钮将自动出现

[已核实] https://geolibre.app/user-guide/interface/

### Q4: WhiteboxTools 工具无法运行？

**A**: WhiteboxTools 需要 Python sidecar 环境。请确保：
- 桌面端已安装并配置 sidecar
- 或在浏览器内使用 Pyodide GeoPandas 引擎（功能可能受限）

[已核实] https://geolibre.app/user-guide/processing/

### Q5: AI 助手无法使用？

**A**: AI 助手默认禁用，需要配置 API Key：
1. Settings -> AI Assistant
2. 选择提供商（Google Gemini / Anthropic / OpenAI）
3. 输入 API Key
4. 保存后 AI 助手激活

[已核实] https://geolibre.app/user-guide/ai-assistant/

### Q6: 如何分享我的项目？

**A**: 三种方式：
1. **Share 功能**：File -> Share Project，上传后获得公开 URL
2. **下载项目文件**：File -> Save，分享 `.geolibre.json` 文件
3. **嵌入 iframe**：使用 URL 参数嵌入到网页

[已核实] https://geolibre.app/user-guide/projects/ https://geolibre.app/user-guide/embedding/

### Q7: GeoLibre 与 QGIS 的区别是什么？

**A**: 核心差异：
- **部署**：GeoLibre 支持 Web/桌面/移动/Jupyter，QGIS 仅桌面
- **启动**：GeoLibre Web 版即开即用，QGIS 需要安装
- **分析**：QGIS 分析能力更强（GRASS、SAGA），GeoLibre 侧重轻量分析
- **插件**：QGIS 插件生态更丰富（20 年积累），GeoLibre 在成长中

[推断] 基于两个产品的公开文档对比。

### Q8: 如何安装第三方插件？

**A**: 
1. Tools -> Plugins -> Marketplace
2. 浏览或搜索插件
3. 查看详情后点击 Install
4. 确认安装

[已核实] https://geolibre.app/user-guide/plugins/

### Q9: 协作编辑功能如何使用？

**A**: 协作功能为 MVP 阶段，需要配置协作服务器 URL（`VITE_GEOLIBRE_COLLAB_URL`）。当前可能不适合生产环境使用。

[已核实] https://geolibre.app/collaboration/

### Q10: 支持哪些编程语言 API？

**A**: 
- **Python**：`geolibre` 包（Jupyter / anywidget）
- **JavaScript**：插件开发 API
- **SQL**：DuckDB Spatial / PostGIS / Sedona

[已核实] https://geolibre.app/python/ https://geolibre.app/user-guide/plugins/

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
- [1] GeoLibre 官方文档：https://geolibre.app/user-guide/ [检索日期 2026-07-31]
- [2] GeoLibre GitHub：https://github.com/opengeos/GeoLibre [检索日期 2026-07-31]
