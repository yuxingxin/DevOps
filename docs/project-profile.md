#### 项目主页

> 各个项目主页会因用户所有者权限不同，展示略有不同，大体一致。

![](https://tva1.sinaimg.cn/large/006tNc79ly1fjauaa1475j30rv0muwhy.jpg)

- 维基：即Wiki，维基百科都听过，wiki一般是指我们项目的一些文档，比如使用文档，API文档，软件安装文档等等。

- 流水线：后面提到持续集成时会详说。

- 设置：针对项目的一些资料设置和权限设置。不同权限的用户看到的界面也是不一样的。

- Activity：等同于前面『菜单』中的活动。

- Cycle Analytics：周期分析，这是一种使用 GitLab 收集的数据来跟踪软件开发的新方法，它是GitLab 工作流的最后一步。它跟踪统计了各个功能以及生命周期，从 issue 到 production，一个 特性平均都花了多少时间。从中可以发现哪个阶段花的时间多，哪个阶段可以改进d等。

- Star：前面提到的收藏，或者加星，一般用于开源项目。

- Fork：前面在工作流中提到这个，它是开源协作的一种工作流方式。

- Git地址：我们前面Git将基础时说到的clone用的地址就在这里，支持HTTP和SSH协议。

- 项目打包下载：支持Windows、Linux、Mac多个平台压缩包下载。

- 新建：创建issue/文件/MR/分支/标签等。

- 通知设置：当我们想关注项目进展时，点击这里可以设置，这样项目有动态，就会通过消息和邮件的方式通知你：

  - Global：默认全局设置。
  - Watch：项目中的任何活动都会收到通知。
  - On mention：只有当别人@你时，才会收到通知。
  - Participate：参与时收到通知。
  - Disabled：禁用，收不到任何通知邮件。
  - 自定义：只针对你设置的事件才会触发通知消息。

- 切换分支：**这里一定要注意你当前所在的分支，因为后续所有的操作都是在当前分支的基础上改动的**。

- Find File：我们可以通过这个搜索来查找项目中的某个文件。

- History：通过这个可以查找项目所有历史提交记录。

- ReadMe：一个项目的说明文件，一般我们都会添加这个文件，来对项目作说明它也默认显示在项目首页，即项目目录的下方。

- ChangeLog：一个由人工编辑，以时间为倒叙的列表，它记录了所有版本的重大变动。[如何维护更新日志](http://keepachangelog.com/zh-CN/)

  如下所示：[keep a changelog](https://github.com/olivierlacan/keep-a-changelog/blob/master/CHANGELOG.md)

  ![](https://tva1.sinaimg.cn/large/006tNc79ly1fjayy45imlj30og0mv41l.jpg)

- 版权协议：一般我们在做开源软件时都需要加一份协议，而**开源协议**，或者叫开源许可证，就是为保护自由软件原作者的相关知识产权，在作者与用户之间设立的一种虚拟合同，或者称之为授权方式。其中的条款内容，就是用来限制软件使用者的使用方式等。他人如有违反协议，作者有权利发起诉讼，维护自身权益。GNU上面有个[网页](http://www.gnu.org/licenses/license-list.html)列出了所有的开源协议，而主流的也就那么几种：

  阮一峰老师翻译的六种流行开源协议使用区分：

  ![](http://image.beekka.com/blog/201105/bg2011050101.png)

还有一张更复杂的图来调侃这些复杂的协议：

![](https://coolshell.cn/wp-content/uploads/2011/05/OSS-License.jpg)

翻译的版本：

![](https://diycode.b0.upaiyun.com/photo/2016/f1989e42b25bb73fead5cb1d09036e6f.png)

那些有意思的协议：

[WTFPL](http://www.wtfpl.net/txt/copying/)全称 What The Fuck Public License

```
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
```

看起来就是你爱怎么着就怎么着吧。😂

[DBAD](https://github.com/SFEley/candy/blob/2f964916961a2dcccbb374cd389520ac2ac62226/LICENSE.markdown)全称 Don’t Be A Dick，dick字面意思这里就不说了，自行查字典吧。这里代表项目中扯淡的人，这个协议在于其不限制软件的版权，而是限制了软件开发中的人的行为。

- Contribution Guide：通常是在在开源项目中，介绍别人如何参与这个项目的一份指南。
- CI：这里指持续集成，后面会提到。
