#### 个人主页

点击首页右上角用户头像选择「个人资料」进入个人主页：

![](https://tva1.sinaimg.cn/large/006tNc79ly1fjb1jzpziwj30rs0knq5t.jpg)

#### 个人设置主页

点击首页右上角用户头像选择「设置」进入个人资料设置页面：

![](https://tva1.sinaimg.cn/large/006tNc79ly1fjb1x3kx3mj30rt0ijabn.jpg)

关于个人资料，其他的都不用再说，这里主要说一下SSH密钥，还记得我们创建git账户后提到的SSH keys，它提供了一种本机与GitLab通信的方式，通过这种方式，能够在不输入密码的情况下，将GitLab作为自己的remote端服务器，进行版本控制

打开终端，输入：

```
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
```

默认执行下去生成公司钥对，记得换成你自己的邮箱，然后会在~/.ssh/id_rsa.pub中找到公钥，复制里面的内容粘贴到密钥输入框里，然后点击按钮「增加密钥」添加完成，这样就可以通过Git将代码文件推送到GitLab上面了。别人无法push代码到你的仓库原因也在这，因为他们没有你的私钥。他们想提交代码到你的仓库，只能通过发起Merge Request的方式，然后由你审核通过后才可以并入你的项目。
