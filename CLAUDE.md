# THE100 Project

## 项目简介

基于书籍《影响人类历史进程的100名人排行榜》（The 100: A Ranking of the Most Influential Persons in History）创建的网站项目。

目标：将 Obsidian 笔记转换为公开网站。

## 数据源位置

- `C:\Users\admin\iCloudDrive\iCloud~md~obsidian\A\wiki\_work\THE100\` — 93 个人物 markdown 文件
- `C:\Users\admin\iCloudDrive\iCloud~md~obsidian\A\wiki\_work\THE100.md` — 索引文件（含 Dataview 查询）

## 数据源结构

每个人物文件的 YAML frontmatter：
- `rank`：排名（1–100）
- `about`：链接到 `wiki/_people/` 下的人物页
- `links`：PDF 链接（英文版和中文版）

正文格式：中英双语段落，段落之间用 `---` 分隔。

文件命名：`THE100-{NNN} {中文名} {英文名}.md`，例如 `THE100-001 穆罕默德 Muhammad.md`

## 覆盖情况

100 个人物文件，编号 001–100 完整，全部为中英双语内容。
