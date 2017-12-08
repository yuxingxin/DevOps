#### 标签操作

当我们开发完一个阶段功能，测试通过，需要发布版本来部署，这时候我们就要给版本打标签，标明这是一个里程碑。

打标签，如1.0.0版本：

```
git tag -a v1.0.0 -m "version 1.0.0"
```

> -a 表示带附注的标签，利用电子邮件和日期来签署或验证，一般我们都建议使用含附注型的标签，以便保留相关信息。
>
> -m 表示备注信息
>
> 如果你有自己的私钥，还可以用 GPG 来签署标签，只需要把之前的`-a`改为`-s`
>
> 我们可以使用git tag -v \[tag-name\] 的方式验证已经签署的标签，此命令会调用 GPG 来验证签名，所以你需要有签署者的公钥，存放在 keyring 中，才能验证。若是没有签署者的公钥，则会报错。

当然了，我们也可以针对某次提交打标签，前提是我们知道这次提交的commit ID

```
git tag -a v1.0.1 <commit-id> -m "commit info"
```

查看我们刚刚创建的标签：

```
git tag
```

我们也可以查看其附注信息：

```
git show v1.0.0 
```

> 输出显示了打标签者的信息、打标签的日期时间、附注信息，然后显示具体的提交信息，如果用GPG签署，签名也会在里面显示。

接下来，我们需要同步到远程仓库：

```
git push origin v1.0.0
```

> git push origin \[tagname\] 这个是推送指定标签到远程

如果我们想把本地所有标签一次性推送上去：

```
git push origin --tags
```

检出本地标签：

```
git tag -d v1.0.0
```

到这一步我们只是删除了本地 v1.0.0的版本，线上的版本从git1.7之后，可以用下面方式删除：

```
git push origin --delete tag v1.0.0
```

> 同删除远程分支很像，回忆一下删除远程分支的操作：git push origin --delete&lt;branchName&gt;
>
> 删除远程标签：git push origin --delete tag&lt;tagname&gt;

当然也可以通过推送一个空分支或者一个空tag到远程来删除远程的分支或者tag，

推送空分支到远程分支如下：

```
git branch -d <branch-name>

git push origin :<branch-name>
```

推送空tag到远程tag如下：

```
git tag -d <tag-name>

git push origin :refs/tags/<tag-name>
```

获取远程某个tag到本地：

```
git fetch origin tag v1.0.0
```

这样我们可以精准拉取指定的某一个版本.适用于运维同学部署指定版本.

本地如果想从某个tag检出的话，可以用如下：

```
git checkout -b version_1.0.0 v1.0.0
```

> 语法为`git checkout -b [branchname][tagname]`注意分支名和标签名的先后顺序



