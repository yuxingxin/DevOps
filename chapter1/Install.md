# Git知识

#### 安装

RedHat系列：yum install git     Debian系列：apt-get install git

[Windows](https://git-scm.com/download/win)    [Mac](https://sourceforge.net/projects/git-osx-installer/)

#### 配置

* --system 该计算机范围内，基本上不会用到这个

* --global 该计算机当前登陆用户范围内（配置自己常用的用户名和邮箱，如 GitHub 的）

* --local 当前仓库范围内（多用于在公司项目的目录里，配置公司的项目范围里的用户名和邮箱）

> 配置常用别名\(根据自己喜好设置\)，如：

```
git config --global alias.cfg "config"


可以这样用：

git cfg --global user.name "yuxingxin"


git cfg --global user.email "yuxingxin@gmail.com"
```

> 配置当前登录用户的名字和邮箱

```
git config --global user.name "yuxingxin"


git config --global user.email "yuxingxin@gmail.com"
```

> 也可以局部配置，比如公司的某个项目，跳转到该目录下，配置该项目范围内的用户名和邮箱

```
git config --local user.name "seanliu"

git config --local user.email "seanliu@domain.com"
```

> **设置Git大小写敏感**，这个在windows系统上一定要做，因为windows系统文件名不区分大小写，不设置的话容易出现莫名其妙的坑，比如新建a.CSS，后又重命名为a.css，在windows系统上面是显示一个干净的工作区，这其实是不符合我们预期的，而Linux则是区分大小写的

```
git config --global core.ignorecase false
```

> 如果你在执行git status时，发现中文乱码，可以设置下面解决：

```
git config --global core.quotepath false
```

> 当postBuffer值太小，这时候clone出现错误「Unable to rewind rpc post data - try increasing http.postBuffer」可以重新设置postBuffer大小解决

```
git config --global http.postBuffer 20480000
```

> Git需要你输入一些信息时会默认调用一个外部编辑器，一般可能会是Vi或者Vim，你也可以设置Emacs

```
git config --global core.editor emacs
```

> 查看当前的配置信息

```
git config -l 
  //如果当前在一个 Git 仓库的目录中,则和下面效果一样


git config --local -l 
 //当前项目目录下运行
```

> 删除某项配置，例如删除用户名

```
git config --global --unset user.name
```

> 以上均可直接在每个仓库编辑「.git/config」文件来配置，每个仓库的 Git 配置文件都放在这个文件中,而当前用户的 Git 配置文件则放在用户主目录下的一个隐藏文件「.gitconfig」中



