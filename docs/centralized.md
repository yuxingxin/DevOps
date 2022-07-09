#### 集中式工作流

从SVN切换过来的人，其实已经很熟悉这一套工作流了，与Subversion一样，集中式工作流以中央仓库作为项目所有修改的核心点。相比SVN开发主干的trunk，在Git里面叫做master，我们所有的修改最后都提交到这个分支上，其实该工作流也只用到了这一个分支。

各个开发者成员先克隆中央仓库到本地，各自在自己的项目拷贝中编写自己的文件并提交修改，这里需要注意的是提交都是本地的，如果同步，必须将修改内容push到远程仓库。再由别的成员拉取下来，合并入本地分支。

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

##### 2. 所有人将仓库克隆到本地

接下来，每个开发者在本地clone一份完整项目的副本：

```
git clone ssh://user@host/path/to/repo.git
```

当克隆完仓库时，Git自动添加一个名为`origin`的远程连接，指向父仓库，以便你以后和这个仓库交换数据。

##### 3. 小张开发功能A

在他的本地仓库中，小张可以用Git的标准流程开发功能：编辑、暂存、提交。于是，本地做了很多修改：

```
git status  # 查看仓库状态
git add <some-file>   #暂存某个文件
git add .    #暂存当前目录下所有文件
git commit -m "add A feature"   # 提交
```

小张可以周而复始的重复这个过程，一直都提交到本地仓库，而不用考虑远程仓库。

##### 4. 小李开发功能B

同时，小李在他自己的本地仓库用相同的流程做着功能B，和小张一样，他也不需要关心远程仓库，只在本地做提交。

##### 5. 小张push到远程仓库

一旦小张完成了他的功能开发，并且都提交到了本地仓库，那么他应该push到远程仓库，这样其他项目组员就可以同步下来了：

```
git push origin master
```

这里的`origin`是小张克隆远程仓库指向的远程连接，由于只有小张在提交，所以这里没有产生冲突。

##### 6. 小李试图push到远程仓库

小张已经将他的功能push到远程服务器，这时候如果小李同样push的话就会报错：

```
git push origin master
```

但是这时候本地历史已经不是最新的了，Git会拒绝这个请求：

```
error: failed to push some refs to '/path/to/repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

这时候小李需要将最新的拉取到他的仓库，然后和他本地的修改进行整合，再次push。

##### 7. 小李在小张提交的基础上先合并

这里可以优先使用`--rebase`来进行合并，即：

```
git pull --rebase origin master
```

`--rebase`选项告诉Git，在同步了远程仓库后，将小李的提交移到`master`分支的顶端，这时候又变成了一条直线。

如果忽略这个选项，同样也会拉取成功，只不过远程仓库每次在同步都会多出一个「合并提交」，即有无意义的合并节点出现。

##### 8. 小李解决合并冲突，如果有的话

rebase的工作是将他在本地的一个个提交都转移到`master`分支上面去，也就是说，你可以一个个提交分别解决合并冲突，而不是在一个庞大的合并提交中去解决，他会让你保持每个提交的专注，并获得一个相对干净的项目历史，另外也可以很容易的发现bug是在哪引入的，有必要的话，用最小的代价来回滚这些修改。

如果小张和小李开发的功能没有涉及到公共模块，即没有关联，rebase的过程不太可能出现冲突，但一旦出现冲突，rebase的过程就会停止，输出下面信息：

```
CONFLICT (content): Merge conflict in <some-file>
```

这时候，小李只要运行一个`git status`就可以发现问题出在哪里。冲突的文件会出现在未合并的路径中：

```
# Unmerged paths:
# (use "git reset HEAD <some-file>..." to unstage)
# (use "git add/rm <some-file>..." as appropriate to mark resolution)
#
# both modified: <some-file>
```

接下来，修改这些文件，如果解决了冲突，那么和往常一样暂存这些文件，然后让`git rebase`完成接下来的工作。

```
git add <add-file>
git rebase --continue
```

这样一来，Git会继续检查下个提交，对冲突的提交一直重复这个过程，直到所有提交完成。

如果这时候查不出来为什么冲突，不知道自己做了什么导致这个问题，你也可以回到开始之前的状态：

```
git rebase --abort
```

##### 9. 小李成功push到了远程仓库

如果和远程仓库同步后，小李就也可以将他所写的功能push到远程仓库了：

```
git push origin master
```
