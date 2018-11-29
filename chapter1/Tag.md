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

删除本地标签：

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

查看远程所有标签：

```
git ls-remote --tags

```

另外，参数`--tags`可以简化为`-t`；`--heads`会获取远程仓库的分支信息。如果没有任何参数，将获取所有的分支和标签信息。

获取远程所有tag到本地：

```
git fetch origin --tags

```

本地如果想从某个tag检出的话，可以用如下：

```
git checkout -b version_1.0.0 v1.0.0
```

> 语法为`git checkout -b [branchname][tagname]`注意分支名和标签名的先后顺序

##### GPG

最后，关于GPG，这里做简单介绍：GnuPG 是一个用来进行非对称加密(PGP)的免费软件，简称GPG，先说说什么是非对称加密。传统的加密手段往往是使用同一个密码进行加密和解密。例如你加密时用的密码是“abc”， 则解密时也要使用“abc”才行。这样就存在一个问题，你不能够把一段加密信息发送给你的朋友。试想，如果采用这种加密方式把信息发送给你的朋友时，你的朋友必须要知道你的密码才能把你的信息解密出来。但你如何保证你的朋友是绝对可靠的呢？也就是说，如果你的朋友把你的密码告诉了别人，你的密码就不再安全了。非对称加密采用的是另一种思想。它会给你产生两个密钥，一个称为“公钥”，另一个称为“私钥”。公钥是可以公开的，你尽管把它传给别人；私钥你一定要保管好不让其他任何人知道。当某人得到你的公钥后，他就可以给你发送加密信息了。具体来说，他把他要发给你的信息用你的公钥加密后发给你，加密的信息只能用你的私钥去解密。这样，因为世界上除了你以外没有别人知道你的私钥，所以即使别人看到发送给你的加密信息他也无法解密，甚至连发送者本人也不行。因为他不知道你的私钥。简单说来，就是用公钥去加密；用对应的私钥去解密。想给谁发送加密信息，首先要得到他的公钥。支持非对称加密的软件有多种，最著名的可能是美国的PGP了，不过它是个商业软件，价格不便宜。因此建议使用免费开源的GnuPG软件进行信息的加密和解密。

关于GPG生成和使用，可以参考这一篇[文章](http://www.ruanyifeng.com/blog/2013/07/gpg.html)

另外github也支持GPG ，可以将上面那篇文章生成的public key按照这里的[帮助文档](https://help.github.com/articles/adding-a-new-gpg-key-to-your-github-account/)添加上去，然后配置git签名用到的key：

```
git config --global user.signingkey <PGP public key ID>
```

然后开启GPG 签名commit的状态：

```
git config commit.gpgsign true
```

如果让所有本地仓库都使用GPG签名：

```
git config --global commit.gpgsign true
```

这样你在push到GitHub上面就可以看到带有绿色**Verified**字样的签名认证。

