#### 分支操作

几乎所有的版本控制系统都以分支的方式进行操作，分支是独立于项目主线的一条支线，我们可以在不影响主线代码的情况下，在分支下进行工作。Git分支是轻量且高效的，这是因为传统的版本控制系统存储的数据是文件的变更，而Git则是存储一系列的文件快照（snapshot）。

一些概念：

master：主干分支，Git初始化仓库时，默认创建的分支名就是master

origin：默认远程分支

HEAD：分支指针，我们可以在项目根目录.git文件下找到一个HEAD文件：`vi .git/HEAD`,其内保存了指向当前分支最新提交的指针，该指针指向refs/heads/分支名文件，我们进入.git/refs/heads/目录，其下以分支名为文件名列出了所有分支

```
ref:refs/heads/master

如图：       
       HEAD  
        |                          
        |                       
        V                         
	 master              
        |                          
        |                          
        V                          
     6d50f6 —— —— > eb4df5 —— —— > eed462
```

> 查看本地分支列表

```
git branch
```

> 列出全部分支和分支最新的 commit 版本

```
git branch -v
```

> 查看本地分支和远程分支的跟踪关联关系

```
git branch -vv
```

> 查看远程分支

```
git branch -r
git branch -rv
```

> 查看所有分支列表，包括本地分支和远程分支

```
git branch -a
git branch -av
```

> 添加一个新的远程仓库的关联。从远程仓库克隆到本地时，远程仓库名字就是「origin」

```
git remote add 远程仓库名字 仓库地址
```

> 删除与一个远程仓库的关联

```
git remote rm 远程仓库的名字
```

> 显示可以抓取和推送的远程仓库的地址。如果没有推送权限，就看不到 push 的地址。

```
git remote -v
```

> 重命名远程仓库名字

```
git remote rename [old-name] [new-name]
```

> 从当前分支创建分支，但不切换到新创建的分支去

```
git branch 分支名称
```

> 切换到指定分支

```
git checkout 分支名称
```

> 从当前分支创建分支，并且切换到新创建的分支去，前面两个命令的整合版

```
git checkout -b 分支名称
```

> 从当前分支的某个版本号新建一个分支,并且切换到新创建的分支去(注意，版本号写在「-b」的前面)

```
git checkout 43237 -b 分支名称
```

> 从「分支 old」新建一个「分支 new」,并且切换到新创建的分支去(注意，源分支名写在「-b」的前面)

```
git checkout old -b new
```

> 如果远程有个 develop 分支,而本地没有，想把远程的 develop 分支迁到本地

```
git checkout -b develop origin/develop
```

> 删除本地分支

```
git branch -d 分支名称
git branch -D 分支名称  //强制删除
```

> 删除远程分支，本地分支名称不写，相当于推一个空分支到远程要删除的那个分支去

```
git push origin --delete 远程分支名称
git push origin :远程分支名称
```

> 分支推送：来源地分支名称:目的地分支名称」

```
git pull origin 远程分支名称:本地分支名称
git push origin 本地分支名称:远程分支名称

//提交本地 develop 分支到远程的 master 分支
git push origin develop:master

//提交本地 develop 分支到远程的 develop 分支
git push origin develop:develop

//将本地的 develop 分支推送到 origin 主机上的 develop 分支。如果后者不存在，则会被新建
git push origin develop

//如果当前分支与远程分支之间存在关联关系，则本地分支和远程分支都可以省略。将当前分支推送到 origin 主机的对应分支
git push origin

//将本地的 develop 分支推送到 origin 主机，「-u」标记将它添加为远程跟踪的分支，后面就可以不加任何参数使用「git push」了
git push -u origin develop

//如果只关联了一个远程仓库，那么主机名都可以省略。将当前分支推送到关联的远程主机对应的分支+
git push

//如果远程主机的版本比本地版本更新，推送时会报错，要求先在本地做 git pull 合并差异，然后再推送到远程主机。这时，如果你一定要推送，可以加上「-f」,不建议使用
git push -f origin
```

> 本地分支重命名(还没有推送到远程)

```
git branch -m <旧分支名称> <新分支名称>
```

> 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)

```
//1.重命名远程分支对应的本地分支
git branch -m <旧分支名称> <新分支名称>

//2.删除远程分支
git push --delete origin <旧分支名称>

//3.上传新命名的本地分支
git push origin <新分支名称>

//4.把修改后的本地分支与远程分支关联
git branch --set-upstream-to origin/<新分支名称>
```

> 建立本地「develop」分支与远程「origin/develop」分支的关联关系

```
git branch --set-upstream-to=origin/develop develop
```

##### `-u`参数与`--set-upstream-to`区别：

1. 首先解释一下upstream

首先明确的是upstream并不是针对**远程库**，而是针对**branch**(分支)的，假设远程库origin上有分支branch1、branch2，本地分支有local1、local2。当初始状态时，远程库和本地库没有建立任何关联，当我们通过执行`git branch --set-upstream-to origin/branch1 local1  `命令后，这时候local1和branch1就建立了关联，也就是说local1的upstream指向了branch1，这样的好处是在local1分支上面执行 git push （git pull同理）命令不用再附加任何参数，Git会自动将local1分支上的内容push到branch1分支上面去，同理local2和branch2也可以用同样方式建立关联。

1. 再来解释一下`-u`参数：

`git push origin`

上面命令表示，将当前分支推送到origin主机的对应分支。

如果当前分支只有一个追踪分支，那么主机名都可以省略。

`git push`

如果当前分支与多个主机存在追踪关系，那么这个时候-u选项会指定一个默认的主机，这样后面就可以不加任何参数来使用git push/pull 命令了。

`git push -u origin master`

上面命令将本地的master分支推送到origin主机，同时指定origin主机为默认主机，后面就可以不加任何参数使用git push了。

不带任何参数的git push 默认只推送当前分支，这叫做simple方式，此外，还有一种matching方式，会推送所有对应的远程分支的本地分支，Git2.0版本之前会默认采用matching方式，现在改为默认采用simple方式。

1. 再来说说他们两者的区别：

假如我要将本地分支master与远程仓库origin里面的branch1建立关联，有下面两种方法：

- `git push -u origin branch1 `，该命令需要提前先把分支切换到master分支上面去
- `git branch --set-upstream-to=origin/branch1 master`

但是上面第一个方法更通用，因为我们的远程分支branch1有可能不存在，这时候你用第二个方法是不可行的，所以，git push -u origin branch1 相当于 git push origin branch1 + git branch --set-upstream-to=origin/branch1 master。

> 取消本地「develop」分支与远程分支的关联关系

```
git branch --unset-upstream develop
```

> 只克隆远程仓库里的「develop」分支到本地

```
git clone -b develop 远程仓库地址
```

> 刷新远程分支列表

```
git fetch -p
```

> 取回远程分支的更新

```
git fetch [远程主机名]
```

> 取回远程指定分支的更新，但并不会自动合并到本地相应的分支。在本地主机上要用「远程主机名/分支名」的形式读取。比如 origin 主机的 master，就要用「origin/master」读取

```
git fetch [远程主机名] 远程分支名

首先从远程的origin的master主分支下载最新的版本到origin/master分支上
git fetch origin master
然后比较本地的master分支和origin/master分支的差别
git log -p master..origin/master
最后进行合并
git merge origin/master

那换成更清晰一点的操作：从远程获取最新的版本到本地的tmp分支上，之后再进行比较合并
git fetch origin master:tmp
git diff tmp
git merge tmp
```

> 取回远程主机的更新以后，可以在它的基础上，创建一个新的分支。在「origin/master」的基础上，创建一个「develop」分支

```
git checkout -b develop origin/master
```

或者

```
git checkout -b develop --track origin/master
```

> 如果取回的远程分支名和本地分支名相同，即在本地创建一个master分支，那么还可以这样写：

```
git checkout --track origin/master
```

> 上面步骤也可以这样一步做完

```
git fetch origin master
或者：
git fetch origin origin/master:master
```

最后再切换下分支就可以了

```
git checkout master
```

> 取回远程分支并合并

```
git pull 相当于是从远程获取最新版本并merge到本地,如果加–rebase 参数，就是使用git rebase 代替git merge，后面会细说rebase。
git pull origin master

从某种意义上来说：
git pull = git fetch + git merge FETCH_HEAD

在实际使用中，git fetch更安全一些，因为在merge前，我们可以查看更新情况，然后再决定是否合并

//仅以快速合并方式来合并到本地代码
git pull --ff-only origin develop
```

> **关于FETCH_HEAD的理解**
>
> 它指某个branch在服务器上的最新状态，每一个执行fetch操作的项目都会存在一个FETCH_HEAD列表，这个列表保存在`.git/FETCH_HEAD`文件中，其中每一行都对应于远程服务器的一个分支，当前分支指向的是FETCH_HEAD，就是这个文件 第一行对应的那个分支。
>
> 一般存在两种情况：
>
> - 如果没有显示的指定远程分支，则远程分支的master将作为默认的FETCH_HEAD。
> - 如果指定了远程分支，就将这个远程分支作为FETCH_HEAD。
>
> 四种用法：
>
> 1. git fetch
>
>    这将更新git remote 中所有的远程repo 所包含分支的最新commit-id, 将其记录到.git/FETCH_HEAD文件中。
>
>
> 1. git fetch remote_repo
>
>    这将更新名称为remote_repo 的远程repo上的所有branch的最新commit-id，将其记录。
>
> 2. git fetch remote_repo remote_branch_name
>
>    这将更新名称为remote_repo 的远程repo上的名为remote_branch_name的分支。
>
> 3. git fetch remote_repo remote_branch_name:local_branch_name
>
>    这将更新名称为remote_repo 的远程repo上的名为remote_branch_name的分支 ，并在本地创建local_branch_name 本地分支保存远端分支的所有数据。

##### 合并分支操作

> 指定分支并入当前分支

```
git merge 指定分支
git merge --no-ff 指定分支     //非快速推进合并
```

![](https://ws1.sinaimg.cn/large/006tNc79ly1fi6n0qzaqvj308b05ygm7.jpg)

如上图所示，主干分支上有分叉，而功能分支有提交，此时如果将功能分支合并入主干，那么将会产生一个新的提交，如最右边图。

- Fast-Forward：快速推进合并

![](https://ws1.sinaimg.cn/large/006tNc79ly1fi6n87lmywj308105l74p.jpg)

```
主干分支没有分叉，git只是简单的将master的指针移动到功能分支的指针处。
```

- No-Fast-Forward：非快速推进合并

![](https://ws3.sinaimg.cn/large/006tNc79gy1fi6nx8tauyj307a066gly.jpg)

```
而我们传入--no-ff 指定非快速推进合并，此时将会创建一个新的提交，将功能分支和主干分支进行了合并，即便主干分支它没有分叉。默认git会智能的将能ff合并的执行ff合并，不能ff合并才会创建commit合并
```

##### rebase(变基/衍合)

首先它也是合并分支操作，说这个之前，我们先放张图：

![](http://ww4.sinaimg.cn/large/a74e55b4jw1dvnhy8lfndj.jpg)

如果你正在 code review，看到上图（下文将称之为：提交线图）之后，特别对于有某种洁癖的人，是否感觉线条特别乱？如果是的话，请继续往下看。

Git 作为分布式版本控制系统，所有修改操作都是基于本地的，在团队协作过程中，假设你和你的同伴在本地中分别有各自的新提交，而你的同伴先于你 push 了代码到远程分支上，所以你必须先执行 `git pull` 来获取同伴的提交，然后才能 push 自己的提交到远程分支。而按照 Git 的默认策略，如果远程分支和本地分支之间的提交线图有分叉的话（即不是 fast-forwarded），Git 会执行一次 merge 操作，因此产生一次没意义的提交记录，从而造成了像上图那样的混乱。

其实在 pull 操作的时候，，使用 `git pull --rebase` 选项即可很好地解决上述问题。 加上 `--rebase` 参数的作用是，提交线图有分叉的话，Git 会 rebase 策略来代替默认的 merge 策略。

举例如下：

> 假设提交线图在执行 pull 前是这样的：

```
    A---B---C  remotes/origin/master
    /
D---E---F---G  master
```

> 如果是执行 `git pull` 后，提交线图会变成这样：

```
    A---B---C remotes/origin/master
    /         \
D---E---F---G---H master
```

> 结果多出了 `H` 这个没必要的提交记录。如果是执行 `git pull --rebase` 的话，提交线图就会变成这样：

```
            remotes/origin/master
                |
D---E---A---B---C---F'---G'  master
```

`F` `G` 两个提交通过 `rebase` 方式重新拼接在 `C` 之后，多余的分叉去掉了，目的达到。

多数情况下，我们使用 `git pull --rebase` 是为了使提交线图更好看，从而方便 code review。不过，如果你对使用 git 还不是十分熟练的话，建议是 `git pull --rebase` 多练习几次之后再使用，因为 **rebase 在 git 中，算得上是『危险行为』**。

另外，还需注意的是，使用 `git pull --rebase` 比直接 pull 容易导致冲突的产生，如果预期冲突比较多的话，建议还是直接 fetch。

##### 对比刚刚讲的merge —no-diff

上述的 `git pull --rebase` 策略目的是修整提交线图，使其形成一条直线，而刚刚用到的 `git merge --no-ff <branch-name>` 策略偏偏是反行其道，刻意地弄出提交线图分叉出来。

假设你在本地准备合并两个分支，而刚好这两个分支是 fast-forwarded 的，那么直接合并后你得到一个直线的提交线图，当然这样没什么坏处，但如果你想更清晰地告诉你同伴：**这一系列的提交都是为了实现同一个目的**，那么你可以刻意地将这次提交内容弄成一次提交线图分叉。

执行 `git merge --no-ff <branch-name>` 的结果大概会是这样的：

![](http://ww1.sinaimg.cn/large/a74eed94jw1dvnhyrq8rhj.jpg)

往往更好的习惯是：在合并分支之前（假设要在本地将 feature 分支合并到 develop 分支），会先检查 feature 分支是否『部分落后』于**远程 develop 分支**：

```
git checkout develop
git pull //更新 develop 分支
git log feature..develop  //这里两个点表示打印出develop比feature多提交的内容
```

如果没有输出任何提交信息的话，即表示 feature 对于 develop 分支是 up-to-date 的。如果有输出的话而马上执行了 `git merge --no-ff` 的话，提交线图会变成这样：

![](http://ww2.sinaimg.cn/large/a74e55b4jw1dvnijr276hj.jpg)

所以这时在合并前，通常会先执行：

```
git checkout feature
git rebase develop

//变基后才开始合并
git checkout develop
git merge feature

git branch -d feature  //合并完删除功能分支
```

这样就可以将 feature 重新拼接到更新了的 develop 之后，然后就可以合并了，最终得到一个干净舒服的提交线图。

**遇到冲突**：

一般我们解决完冲突后加入暂存区后，接下来有这么三种指令：

- 执行`git rebase --continue`指令继续变基，后面无须再commit，它会自动apply补丁。
- 执行`git rebase --skip`指令，跳过解决冲突。
- 执行`git rebase --abort`指令，终止变基，回到分支变基前状态。

> 变基有风险，一定确定你熟悉rebase操作才可在项目中使用，这里有个黄金法则：
>
> **一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行衍合操作。**
>
> 它主要应用场景：
>
> 1. 在合并主分支至子分支时，来保持主分支树的整洁，方便版本回退和问题追踪。
> 2. 从主分支获取最新 commit 信息，并将当前子分支与主分支进行合并。

综上，使用 `git pull --rebase` 和 `git merge --no-ff` 其实和直接使用 `git pull` `git merge` 得到的代码应该是一样。使用 `git pull --rebase` 主要是为是将提交线图平坦化，而 `git merge --no-ff` 则是刻意制造分叉。
- #### 总结

  综上，在Git中，我们有两种方法来合并分支，一种是通过`git merge`，一种是通过`git rebase`,他们的区别：

  拿上面例子为例，merge所做的事情是：

  ![](https://ws4.sinaimg.cn/large/006tNc79ly1fiunuzl4svj30ou0ii0to.jpg)

  1. 首先找到feature分支和develop分支的最新的commit的最近公共祖先，在这C4和C3的最近公共祖先是C2
  2. 将feature分支上在C2以后的所有commit合并成一个commit，并与develop分支合并
  3. 如果有合并冲突（两个分支修改了一个文件），首先人工解决冲突
  4. 在develop上产生合并后的新的commit

  而rebase所做的事情也是合并分支，但是与merge相比略有不同：

  ![](https://ws3.sinaimg.cn/large/006tNc79ly1fiunvqs6vjj30ra0est9j.jpg)

  1. 首先找到feature分支和develop分支的最新的commit的最近公共祖先，在这C4和C3的最近公共祖先是C2
  2. 将feature分支上在C2以后的所有commit全部移动到develop分支的最新commit之后，在这里就是把C3移动到C4之后，也代表这在develop分支上面进行C3相应的修改，需要注意的是，rebase并不是直接将C3移动到develop分支上面去，而是创建了一个副本，这一点我们可以通过hashcode发现是不一样的。
  3. 最后，我们将feature分支上的功能合并入develop分支

  ![](https://ws4.sinaimg.cn/large/006tNc79ly1fiunw6za36j30qs0f40ti.jpg)

  ##### Squash

  有时候我们在开发一段时间以后，commits又多又乱，如果我们整理一下这些commits，同时也是为了他人阅读你的提交，将多个合并为一个，就用到了Squash。（**注意前提是，此分支是只有你一个人开发， 且没有跟master分支合并过**）

  ```
  git rebase -i <commit>
  ```

  > squash准确来说并不是一个命令，而是rebase命令的一个功能。squash的作用很简单——合并多个commit。

  如：

  ```
  git rebase -i HEAD~5

  执行完后，Git会把所有commit列出来，让你进行一些修改，修改完成之后会根据你的修改来rebase。HEAD-5的意思是只修改最近的5个commit。

  pick 033beb4 b1
  pick b426a8a b2
  pick c216era b3
  pick d627c9a b4
  pick e416c8b b5

  # Rebase 033beb4..e416c8b onto 033beb4
  #
  # Commands:
  #  p, pick = use commit
  #  r, reword = use commit, but edit the commit message
  #  e, edit = use commit, but stop for amending
  #  s, squash = use commit, but meld into previous commit
  #  f, fixup = like "squash", but discard this commit's log message
  #  x, exec = run command (the rest of the line) using shell
  #
  # If you remove a line here THAT COMMIT WILL BE LOST.
  # However, if you remove everything, the rebase will be aborted.
  #
  ```

  上面pick是要执行的commit指令，另外还有reword、edit、squash、fixup、exec这5个，具体的含义可以看上面的注释解释，比较简单，这里就不说了。

   我们要合并就需要修改前面的pick指令：

```
pick 033beb4 b1
squash b426a8a b2
squash c216era b3
squash d627c9a b4
squash e416c8b b5
```

   也就是下面这4个提交合并到最前面的那个提交里面，按esc，打上:wq提交保存离开。

   接着是输入新的commit message

```
b
# This is a combination of 2 commits.
# The first commit's message is:
# b1
#
# This is the 2nd commit message:
#
# b2
#
# This is the 3rd commit message:
#
# b3
#
# This is the 4th commit message:
#
# b4
#
# This is the 5th commit message:
#
# b5
#
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# Not currently on any branch.
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified:   a.txt
#
```

其中第一行的b就是需要我们输入的新信息，同样编辑完保存，出现类似下面的信息：

```
Successfully rebased and updated refs/heads/develop.
```

最后可以用git log指令来验证commits是不是我们要变成的样子。

##### merge --squash拓展

有时候我们在bugfix分支上面由于修改bug提交了很多次，修复好了之后，我们想把这些提交合并入我们的master分支，这时候就可以使用`--squash`。

```
git checkout master
git merge --squash bugfix
git commit -m "bug fixed"
```

  上面操作会将bugfix分支上的所有commit都合并为一个commit，并把它并入我们的master分支上去。这里还有一点需要注意的是：--squash含义代表的是本地内容与不使用该选项的合并结果相同，但是不提交，不移动HEAD指针，所以我们要另外多一条语句来移动我们的HEAD指针，即最后的commit。
