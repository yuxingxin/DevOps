# DevOps实践总结

* **版本控制&协作开发**：Git命令操作、Gitlab、GitFlow工作流

* **自动化构建和测试**：Maven、Gradle、Node、Cocoapods

* **持续集成&交付**：Gitlab-CI，后期可以拓展到**Jenkins**

* **容器平台**：Docker、Ubuntu、CenterOS、Debian

  后续要做的计划：

* 监控、警告&分析：zabbix

* 日志管理：syslog —&gt; LogStash

* 配置管理等



!\[DevOps\]\([https://www.ctl.io/developers/assets/images/blog/Cloud-Application-Manager-DevOps\_Open\_Source\_Tools.png](https://www.ctl.io/developers/assets/images/blog/Cloud-Application-Manager-DevOps_Open_Source_Tools.png%29\)\)



* 1.代码仓库

  * 以Git工具实现的团队内部代码共享仓库

  * 分支保护和权限控制,可轻松地管理和审查成员代码;

  * 详细的数据统计,清晰了解团队成员的贡献和提交情况;

* 2.编译构建

  * 提供的通用构建环境将源代码打包成产品

  * 通过脚本命令完成代码编译，生成最终产品

  * 无论docker镜像、APK、Jar包都会有被永久保存到服务器，提供随时下载

  * 提交代码即可自动完成构建，实现快速迭代

* 3.产品版本

  * 构建后的产品将依据项目类型而储存在不同的仓库中

  * 不限量存放产品历史版本,无视服务器环境之间的差异一键部署;

* 4.部署管理

  * 推荐Docker技术，自动将应用部署到服务器

  * 原来需要几个小时才能部署一次，现在只需要几分钟进行简单配置即可完成一次部署;

  * 只需要提交代码，稍等几分钟即可完成一次版本迭代;

* 5.集群管理

  * 基于Kubernetes集群技术轻松管理数千台服务器

  * 部署环境安全隔离，可在同一集群部署多个应用；

  * 同时管理多台服务器，同时监控每一台服务器；

  * 分布式处理、负载均衡、服务器状态、应用状态数据集中在一起，轻松查看和管理每一台服务器；



