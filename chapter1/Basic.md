#### 基础操作

> 基本概念

- 工作区：（修改后，执行「git add .」前）
- 暂存区 stage：（执行「git add .」后，commit 前）
- 版本库：（执行commit后，push推送到远程仓库前）
- 远程库：（执行push推送后）

> 生成SSH keys

```
ssh-keygen -t rsa -C "username@domain.com"     //填写自己的邮箱
```

> 初始化仓库

```
mkdir HelloGit
cd HelloGit
git init
```

**追踪文件**

> 跟踪文件：将工作区里的修改添加到暂存区，git不会自动跟踪新建或删除的文件，每次添加或删除文件都需要执行如下命令：

```
git add xxx  //提交单个文件
git rm xxx   //删除单个文件
git add .   //提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件(仅在Git 1.x版本中表现这样，2.x版本同git add -A)
git add -u  //提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
git add -A  //提交所有变化
git add --ignore-removal .  //2.x版本提供的，同Git 1.x版本中的git add .操作
```

> 查看已经被跟踪的文件

```
git ls-files
```

##### 比较操作

> 查看工作区和暂存区之间的差异(会显示具体修改了哪些内容)，如果最后面跟了文件路径则是对比单个文件

```
git diff
git diff xxx.java
```

> 查看暂存区和 HEAD 之间的差异(会显示具体修改了哪些内容)

```
git diff --staged
git diff --cached
```

> 查看工作区和 HEAD(最近一次提交) 之间的差异(会显示具体修改了哪些内容)

```
git diff HEAD
```

> 查看工作区和 倒数第二次提交之间的差异(会显示具体修改了哪些内容)

```
git diff HEAD^
```

git diff用一张图来总结：

```
Working Directory    <----+--------+-------+
        |                 |        |       |
        |              diff HEAD   |       |
        V                 |        |       |
   "git add"              |        |       |
        |                 |        |     diff
        |                 |        |       |
        V                 |        |       |
     Index     <----+-----|--------|-------+
        |           |     |        |       
        |   diff --cached |        |       
        V           |     |        |       
  "git commit"      |     |        |
        |           |     |        |
        |           |     |        |
        V           |     |        |
      HEAD     <----+-----+        |
        |                          |
        |                       diff HEAD^
        V                          |
previous "git commit"              |
        |                          |
        |                          |
        V                          |
      HEAD^          <-------------+
```

> 关于HEAD的说明，可以理解为只是简单的一个文件，包含了你当前分支指向的最新那个提交的 SHA-1 索引值

```
➜ cd .git
➜ .git git:(master) cat HEAD
ref: refs/heads/master
➜ .git git:(master) cat refs/heads/master
b9346150f3624eb0c9b793917cb37bde9a4abb19
➜  .git git:(master) cat ORIG_HEAD
002d4e216df0c5633f2b7d7481b43e20bc5a4f0a
```

> 比较版本文件

```
//查看某两个版本之间的差异
git diff ffd98b291e0caa6c33575c1ef465eae661ce40c9 b8e7b00c02b95b320f14b625663fdecf2d63e74c

//查看某两个版本的某个文件之间的差异
git diff ffd98b291e0caa6c33575c1ef465eae661ce40c9:filename b8e7b00c02b95b320f14b625663fdecf2d63e74c:filename

//查看 develop 分支最新提交和 master 分支最新提交的差别
git diff master..develop
```

> 查看工作区、暂存区与 HEAD 之间的差异(只显示增、删、改、未被跟踪，不会显示文件的具体内容)

```
git status
```

**提交文件**

> 将暂存区的修改提交到当前分支

```
git commit -m "本次修改的注释"
```

> 有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用「--amend」选项重新提交

```
git commit --amend -m "追加修改的注释"
```

**日志操作**

> 查看日志，会显示所有的信息，包括文件的详细修改内容。最上面是最新的提交

```
git log
```

> 单行显示每一个 commit，包含分支合并图,参考「配置」章节的「配置常用别名」

```
git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

> 查看所有日志，包括已经通过「reset」版本回退的日志

```
git reflog
```

**对比/比较扩展：对比分支差异，其中分支的概念后面会详细讲到**

> 查看develop有，而master分支没有的提交

```
git log develop ^master

同理查看 master 中有，而 develop 中没有的内容：
git log master ^develop
```

> 查看develop比master多提交了哪些内容

```
git log master..develop

注意，列出来的是两个点后边（此处即develop）多提交的内容。同理，想知道 master 比 develop 多提交了什么：
git log develop..master
```

> 不知道谁提交的多，谁提交的少，单纯想知道有什么不一样

```
git log develop...master
```

> 在上述情况下，再显示出每个提交是在哪个分支上

```
git log --left-right develop...master
//输出结果中左箭头 < 表示是 develop 的，右箭头 > 表示是 master的
```

​

**删除操作**

> 忽略某个已被跟踪的文件，但不会删除该文件

```
git rm --cached 文件
```

> 删除某个已被跟踪的文件，如果是删除整个目录需加上-r参数

```
git rm 文件相对路径
git rm -rf 文件夹相对路径
```

> 删除未被跟踪的文件

```
// 删除 untracked files
git clean -f

// 连 untracked 的目录也一起删掉
git clean -fd

// 连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）
git clean -xfd

// 在用上述 git clean 前，强烈建议加上 -n 参数来先看看将会删掉哪些文件，以防止重要文件被误删
git clean -nxfd
git clean -nf
git clean -nfd

-n 显示 将要 删除的 文件 和  目录
-f 删除 文件
-df 删除 文件 和 目录
```

**撤销操作**

> checkout：如果你文件只是在工作区修改了，但是还没提交到暂存区的时候，你可以用如下命令来撤销，简单的说就是暂存区覆盖工作区

```
git checkout -- [file]

上面checkout作用于文件层面，它也可以作用于提交层面
这时checkout 只是移动了 HEAD 到指定的 commit 上，然后更新工作目录，因为这可能会覆盖本地的修改，Git会强制你提交或者缓存工作目录中的所有更改，不然在checkout的时候这些更改都会丢失。
```

恢复版本或文件

> 当前分支，从某个历史版本创建新的分支

```
git checkout -b <branch>
```

> 指定分支，从某个历史版本创建新的分支

```
git checkout -b <new-branch> <current-branch>
```

Git 的每个提交都有一个 SHA1 散列值（Hash 值）作为 ID，我们可以使用这些提交的ID来作为起点。

```
git checkout -b <new-branch> <commit-id>   //切换到该分支
git branch <new-branch> <commit-id>   //不切换到该分支
```

这时候，该新分支就以commit-id内容保持一致。注意的是完整的SHA-1大概有40位长，Git允许我们以前几位作为简写来标识ID。

**将某个历史版本checkout到工作区**

这样做会产生一个分离的HEAD指针（Detached HEAD），所以不推荐这么做。如果我们工作在 `master` 分支上，希望 checkout 到 `develop` 分支上，我们会这么做：

```
git checkout develop
```

这里develop实际上是一个别名，其本质也是SHA1的散列值。它相当于：

```
git checkout <commit-id>
```

将某个历史版本 checkout 到工作区。

详细说下Detached HEAD ：

我们checkout本质上是修改HEAD里面的内容来让它指向不同分支的,而HEAD文件指向的分支就是我们当前的分支,该分支指向了一个commit，但是有时候HEAD不会指向任何分支，而是指向了一个commit，或者说是HEAD指向了一个没有分支名字的修订版本,此时,已经处于游离状态了，这时候我们在进行commit操作时就不会提交到任何分支上去。输入`git status`你也会发现没有在任何本地分支上。对于这类问题解决：

- 基于本次提交创建一个临时分支.
- 然后merge到当前工作分支.
- 删除临时分支

将某个文件checkout到工作区

```
git checkout <commit-id> </path/to/file>
```

如果checkout之后以一个新文件命名：

```
git show <commit-id>:</path/to/file> > <new file name>
```

> reset：如果你文件在工作区修改了,并且也执行git add命令提交给暂存区了，这时候想撤销，就用如下命令，简单来说就是让HEAD来覆盖暂存区,注意默认工作区内容不变

```
git reset HEAD [file]

所以接上面来讲，如果想工作区内容也撤销到原来的那样，可以加上--hard参数
git reset --hard HEAD

说明：
reset三种方式：git reset [mode] [<commit>]
--soft（这种不会修改你目前暂存区或者工作区中所做的任何修改,只会回滚commit）
--mixed/--（这种是在reset时不加任何参数的默认行为，暂存区和你指定的提交同步，但工作目录不受影响）
--hard（这种会把暂存区和工作目录都同步到你指定的提交，使用之前请三思，这确实是你要的行为！）

Working Directory    <-------------+
        |                          |
        |                          |
        V                          |
   "git add"  <-----------+        |
        |                 |        |
        |                 |        |
        V                 |   --hard HEAD
     Index     			 |        |
        |         --mixed/-- HEAD  |       
        |    			 |        |       
        V                 |        |       
  "git commit" <----|     |        |
        |           |     |        |
        |     --soft HEAD |        |
        V           |     |        |
      HEAD     <----+-----+--------+        
        |                          
        |                       
        V                         
previous "git commit"              
        |                          
        |                          
        V                          
      HEAD^          

因此我们可以用这个来回溯版本，其中commit指定版本ID，可以通过git reflog查看要回溯到的版本。
综上，git reset 也可以用于提交层面和文件层面（就是说操作可以是针对一个提交的，也可以单独作用于某个文件的），当 git reset 命令加上文件路径的时候，这个操作就是针对文件层面的。git reset 将暂存区同步到你指定的那个提交。而--soft、--mixed/-- 和 --hard 对文件层面的 git reset 毫无作用，只作用与提交层面。

reset在提交层面和checkout在提交层面最大的不同就是：reset会删除在这之前的commit，而checkout只是移动HEAD 到指定的commit上。
```

> revert：如果你将错误的提交同步到了远端，而你又想撤销，这个时候可以用 git revert 命令。

```
与前面两个不同的是git revert 只能作用于提交层面。
它和指定 SHA 对应的 commit 是相反的（或者说是反转的）。如果原先的 commit 是“物质”，新的 commit 就是“反物质” — 任何从原先的 commit 里删除的内容会在新的 commit 里被加回去，任何在原先的 commit 里加入的内容会在新的 commit  里被删除。
git revert <commit>

说明：
1.不加-n 参数会直接让我们输入这次回退的注释，加了的话会将改动的文件放入暂存区，并手动执行「git commit -m "注释"」来提交这次回退的信息，这种情况往往用在一次回退多个提交的情况，否则里面的每一个扔到的提交都会让我们输入一遍注释。
撤销多个提交。左开右闭(]，撤销 HEAD~2 和 HEAD 之间的提交（不包含HEAD~2, 包含HEAD]
git revert -n HEAD~2..HEAD

2.revert命令会产生一个新的提交，新的 commit 用于回滚之前的 commit。这个和 reset 有很大的不同，reset是直接删除 commit 节点，而不是产生新节点。当然你也可以用 git reset 和 git push -f 来撤销远端错误的提交，但这种方式并不优雅，而且有可能会影响到其他的协作者。

3.revert会产生一个新的 commit，期间如果有冲突的话解决完冲突后执行「git revert --continue」，解决冲突的时候如果想取消这次revert的话执行「git revert --abort」。
```

试想一个问题，撤销了之后，如何『恢复』之前的『撤销』呢？它取决于你想做的到底是什么?

- 如果你希望准确地恢复项目的历史到某个时间点，用 `git reset --hard <commit>`
- 如果你希望重建工作目录里的一个或多个文件，让它们恢复到某个时间点的状态，用 `git checkout <commit> -- <filename>`
- 如果你希望把这些 commit 里的某一个重新提交到你的代码库里，可以用后面提到的cherry-pick: `git cherry-pick <commit>`
- ……

**cherry-pick**

> 把已经提交的 commit, 从一个分支放到另一个分支。加上 -n 参数不会立即提交，而是放入暂存区，这一点和 revert 时类似。

```
git checkout master
git cherry-pick <commit>
git cherry-pick -x <commit> //保留原提交中信息
例如，假设我们有个稳定版本的分支，叫v2.0，另外还有个开发版本的分支v3.0，我们不能直接把两个分支合并，这样会导致稳定版本混乱，但是又想增加一个v3.0中的功能到v2.0中，这里就可以使用cherry-pick了,其实也就是对已经存在的commit 进行再次提交.
git checkout v2.0分支
git cherry-pick 38361a55 # 这个 38361a55 号码，位于v3.0分支中：
```

> 批量cherry-pick，就是一次可以cherry-pick一个区间的commit。

```
git cherry-pick <start-commit>..<end-commit>   左开右闭区间，不包含<start-commit>
git cherry-pick <start-commit>^..<end-commit>  闭区间，包含<start-commit>
注意<start-commit>时间上早于<end-commit>
```

> 中间出现失败，则可以执行如下对应操作：

```
git cherry-pick --continue
git cherry-pick --quit
git cherry-pick --abort
```

**储藏操作**

> 开发一个功能时，发现之前的版本有个bug，把刚才的修改储藏起来，然后去修复bug,修复完记得提交，然后再把刚才储藏的修改取出来，继续开发该功能

1. 文件已经被 git 跟踪，只是修改了代码（而不是新添加文件），我们 可以使用「git stash」或「git stash save "注释"」来暂存修改
2. 如果有新添加的文件，那么就需要添加「-a」参数（如「git stash -a」或「git stash save -a "注释"」）， 或先「git add .」然后再使用「git stash」或「git stash save "注释"」来暂存修改

> 查看所有 stash，最上面是最近添加的

```
git stash list
```

> 把刚才藏起来的修改取出并删除 stash，如果是删除最近的一个 stash，可以省略「stash@{0}」

```
git stash pop stash@{0}
```

> 把刚才藏起来的修改取出，如果是取出最近的一个 stash，可以省略「stash@{0}」

```
git stash apply stash@{0}
```

> 删除 stash，如果是删除最近的一个 stash，可以省略「stash@{0}」

```
git stash drop stash@{0}
```

综上，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了。

> 清空所有 stash

```
git stash clear
```
