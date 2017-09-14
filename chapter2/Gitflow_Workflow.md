#### GitFlow工作流

先放一张经典的图：

![](https://ws3.sinaimg.cn/large/006tKfTcly1fizajaiax3j30hw0nstbh.jpg)

GitFlow工作流定义了一个严格的分支模型，它依赖版本演进，为管理大型醒目也提供了一套规范的流程。和前面提到的工作流相比，它给不同的分支指定了特定的角色，定义它们应该如何、什么时候协作。除了功能分支之外，它还为准备发布、维护发布、记录发布分别使用了单独的分支。当然，你还能享受到功能分支工作流带来的所有好处：Pull Request、隔离实验和更高效的协作。因此，在团队开发中被广泛使用。

GitFlow工作流同样以远程仓库为沟通中心，开发者需要将分支推送到远程仓库，唯一区别就是项目的分支结构。

##### master分支

和单独的`master`分支不同，这里的`master`分支只用来储存官方发布历史。同时，我们也会在`master`分支上面提交打上的版本标签号。

##### develop分支

此为源自`master`分支的开发分支，是我们用来整合各个功能的分支，类似于集中式工作流里面的`master`，也是开发者打交道最多的分支。

##### feature分支

该分支叫功能分支，每个新功能都放在自己的分支中，并以develop分支作为父分支，当一个功能完成后，它将被合会develop分支，再由develop分支合并回master分支，而不应该直接与master分支交互。命名规范我们遵循`feature-*`或者`feature/*`。

##### release分支

一旦develop分支功能开发完成，或者预定的日期来临需要发布，我们可以从develop分支创建一个release分支，或者说是发布分支，这个分支的创建开始了下个发布周期，只有和发布相关的任务才在这个分支上进行，如修复bug，生成文档等等。我们在发布分支上面完成的需要合并进develop分支，一旦准备好了发布，发布分支将会合并进master，打上版本号的标签，同时合并回develop。

使用一个专门的分支来准备发布确保一个团队完善当前的发布，其他团队可以继续开发下一个发布的功能。它还建立了清晰的开发阶段（比如说，「这周我们准备 2.0 版本的发布」，而我们在仓库的结构中也能看到这个阶段），命名规范我们遵循`release-*`或者`release/*`。

##### hotfix分支

紧急修复分支用来快速给产品打上补丁，这是唯一一个可以从`master`分支上面fork的分支，一旦修复完成了，它应该被合并入`master`和`develop`分支中，其中`master`应该被打上更新的版本号的标签。

有一个专门的 bug 修复开发线使得团队能够及时处理 issues，而不打断其他工作流或是要等到下一个发布周期。你可以将维护分支看作在 `master` 分支上工作的临时发布分支。

接下来举例来说明一下这个工作流是如何工作的：

##### 1. 初始化中央仓库

首先是我们的项目负责人在服务器上创建中央仓库，如果这是一个新项目，你可以初始化一个空的仓库，不然，你需要导入一个已经存在的Git或者SVN项目。

中央仓库应该永远是裸仓库（没有工作目录），命令如下：

```
ssh user@host
git init --bare /path/to/repo.git
```

注意这里使用的SSH用户名`user`和`host`服务器域名或者IP地址、储存仓库的地址`/path/to/repo.git`都是有效的。

针对GitHub或者GitLab用户还可以使用图形界面来代替上面的操作。

##### 2. 创建开发分支

负责人小王首先在本地创建一个空的develop分支，并将它最后推送到远程仓库里面。

```
git branch develop
git push -u origin develop
```

其中这个分支包含了项目中的所有历史，其他开发者小张和小李将远程仓库克隆到本地，并创建一个分支来追踪远程分支。

```
git clone ssh://user@host/path/to/repo.git
git checkout -b develop origin/develop
```

现在所有人本地都有一个历史分支的副版本。

##### 3. 小张和小李分别开始开发新功能A和新功能B

首先，他们都需要为自己的功能创建单独的分支，此分支是基于develop，而不是master:

```
git checkout -b feature-A develop
git checkout -b feature-B develop
```

然后同样用我们之前的Git标准流程进行编辑、暂存、提交

```
git status
git add <some-file>
# git add .
git commit -m "提交说明"
```

##### 4. 小张完成了功能A

小张添加了一些提交，然后确定功能完成了，如果我们使用GitHub或者Gitlab这类平台的话，这时候就可以发起Pull Request了，请求将他的功能合并入develop分支，如果没有使用的话，我们可以通过下面的方式来请求将它的本地develop分支推送到远程仓库：

```
git pull origin develop
git checkout develop
git merge feature-A
git push
git branch -d feature-A
```

第一条命令是确保功能分支并入之前，我们的develop分支是最新，这里注意的是一定不要并入master分支。

##### 5. 小李完成了功能B

小李以同样的方式将功能B合并入develop分支，并将其push到远程仓库。这里需要注意的是小李需要先将小张的提交更新到本地，如果这中间出现冲突的话，解决方式与之前说的一样。

##### 6. 小王准备发布版本

当小张和小李完成了他们各自的功能并入develop分支后，小王开始着手准备发布版本，和开发功能一样，他先从develop分支新建发布分支：

```
git checkout -b release-1.0.0 develop
git push -u origin release-1.0.0
```

这个分支用来修复bug，整理需求，更新文档等等，为即将到来的发布做准备，来完善我们的功能分支。理论上，一旦创建了这个分支，推送到远程仓库，不在develop分支中的功能都将被推迟到下个发布周期。

##### 7. 小张和小李完善发布分支

小张和小李分别完善自己的功能，修复bug，编辑、暂存、提交，最后push到远程仓库：

```
git checkout -b release-1.0.0 release-1.0.0

git status
git add <some-file>
#   git add .
git commit -m "提交说明"

# 经过多次commit 最后提交
git push
```

##### 8. 小王完成发布

一旦所有功能完善，这时候就需要将release分支并入master和develop分支，然后删除发布分支，注意这里的合并回两个分支。

```
git checkout master
git merge release-1.0.0
git push
git checkout develop
git merge release-1.0.0
git push
git branch -d release-1.0.0
```

发布分支是功能开发develop和公开发布master分支之间的过渡阶段，记得不论什么时候提交到master的分支都需要打上方便引用的标签：

```
git checkout master
git tag -a 1.0.0 -m "initial release 1.0.0" master
git push origin --tags
```

Git提供了许多钩子，即仓库中特定时间发生时被执行的脚本，当向仓库推送master分支或者标签的时候，可以配置在这里一个钩子来做自动糊构建。

##### 9. 终端用户发现BUG

正式发布之后，小张和小李紧接着下一个版本的开发功能，这时，终端用户发现一个问题说当前项目存在一个bug，为了解决这个BUG，负责出现与bug相关功能的那个人创建一个维护分支hotfix，用几个提交解决了这个BUG，然后合并回master和develop。

```
git checkout -b bug-#001 master

git status
git add <some-file>
#  git add .
git commit -m "提交说明"

git checkout master
git merge bug-#001
git push origin master

git checkout develop
git merge bug-#001
git push origin master
git branch -d bug-#001
```

这样一来整个流程就算说完了，这是算相对复杂的一个，不过如果整个条例理清楚了，我们就可以灵活的掌握Git的使用。

关于[GitFlow](https://github.com/nvie/gitflow)这里推荐提出者nvie写的命令行工具，简化了上面我们模拟的工作流程，由于此项目太过久远没有更新，后来petervanderdoes在此基础上加入了bugfix修复分支：[gitflow-avh](https://github.com/petervanderdoes/gitflow-avh)，具体安装可以参考该链接，里面有具体的安装方法。

首先初始化仓库：

```
git flow init
```

紧接着输入一些配置信息：

```
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]
How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

这里建议都用默认配置，不用更改，完成后自动创建了master和develop分支，并且当前所在分支即为develop分支。

**管理feature**

开始创建功能分支：

```
git flow feature start <feature-name>
```

如果有多人协作时，也可以同步到远程仓库：

```
git flow feature publish <feature-name>
```

其他人可以同步下来：

```
git flow feature track <feature-name>
```

然后其他人通过push推送代码

```
git push origin feature/<feature-name>
```

创建人通过pull同步其他人写的代码：

```
git pull origin feature/<feature-name>
```

同理创建人同步自己写的功能也用同样方式，最后完成功能后：

```
git flow feature finish <feature-name>
```

![](https://ws4.sinaimg.cn/large/006tKfTcly1fj47iwu9jrj312g0uw421.jpg)

这里finish操作会完成以下操作：

1. 它会把feature分支整合进develop分支
2. 删除当下的feature分支，并且切换到develop分支

**管理bugfix**

功能完成时我们开始修复bug，并创建bugfix分支

```
git flow bugfix start <bugfix-name>
```

可以通过publish同步到远程仓库：

```
git flow bugfix publish <feature-name>
```

其他人可以同步下来：

```
git flow bugfix track <feature-name>
```

然后其他人通过push推送代码

```
git push origin bugfix/<feature-name>
```

创建人通过pull同步其他人写的代码：

```
git pull origin bugfix/<feature-name>
```

同理创建人同步自己写的功能也用同样方式，最后完成功能后：

```
git flow bugfix finish <feature-name>
```

该finish操作会执行以下动作：

1. 它会把bugfix分支整合进develop分支
2. 删除当下的bugfix分支，并且切换到develop分支

**管理release**

当我们的develop分支是一个成熟的release版本时，第一，它包括所有新的功能和必要的修复；第二，它已经被彻底的测试过了。如果上述两点都满足，那就是时候开始生成一个新的 release 了。

```
git flow release start v1.0.0
```

请注意，release 分支是使用版本号命名的。完成一些上线的准备工作，比如文档版本说明等等，然后就执行finish。

```
git flow release finish v1.0.0
```

这个命令会完成如下一系列的操作:

1. 首先，git-flow 会拉取远程仓库，以确保目前是最新的版本。
2. 然后，release 的内容会被合并到 “master” 和 “develop” 两个分支中去，这样不仅产品代码为最新的版本，而且新的功能分支也将基于最新代码。
3. 为便于识别和做历史参考，release 提交会被标记上这个 release 的名字，在这里为v1.0.0
4. 清理操作，版本分支会被删除，并且回到 “develop”。

从 Git 的角度来看，release 版本现在已经完成。如果我们做了CI，对 “master” 的提交就是在这里触发了定义的部署流程，当然也可以通过手动部署。

![](https://ws2.sinaimg.cn/large/006tKfTcly1fj48ce5vsrj30kf0ff408.jpg)

**管理hotfix**

很多时候，仅仅在几个小时或几天之后，当对 release 版本作做全面测试时，可能就会发现一些小错误。这时候创建hotfix分支：

```
git flow hotfix start <bugfix-name>
```

这个命令会创建一个名为 “hotfix/<bugfix-name>” 的分支。因为这是对产品代码进行修复，所以这个 hotfix 分支是基于 “master” 分支。这也是和 release 分支最明显的区别，release 分支都是基于 “develop” 分支的。因为你不应该在一个还不完全稳定的开发分支上对产品代码进行地修复。

就像 release 一样，修复这个错误当然也会直接影响到项目的版本号.修复完成后执行finish：

```
git flow bugfix finish <bugfix-name>
```

这个过程非常类似于发布一个 release 版本：

1. 完成的改动会被合并到 “master” 中，同样也会合并到 “develop” 分支中，这样就可以确保这个错误不会再次出现在下一个 release 中。
2. 这个 hotfix 程序将被标记起来以便于参考。
3. 这个 hotfix 分支将被删除，然后切换到 “develop” 分支上去。
