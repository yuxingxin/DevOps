#### 注册Runner

向GitLab CI注册Runner需要两样东西：

- GitLab CI 的URL地址
- 注册token

在安装GitLab Runner的机子终端下运行下面命令：

```
sudo gitlab-ci-multi-runner register
```

就会出现如下提示：

```
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/ci):
http://192.168.1.2/ci   // 在这里输入gitlab安装的服务器ip/ci 即可
Please enter the gitlab-ci token for this runner:
eaYyokc57xxZbzAsoshT    // 这里的token可通过Gitlab上的项目Runners选项查看
Please enter the gitlab-ci description for this runner:
[E5]: spring-demo       // 这里填写一个描述信息
Please enter the gitlab-ci tags for this runner (comma separated):
demo                    // 在这里填写tag信息，多个tag可通过逗号,分割。
Registering runner... succeeded                     runner=eaYyokc5
Please enter the executor: docker, docker-ssh, parallels, shell, ssh, virtualbox, docker+machine, docker-ssh+machine:
shell                   // 在这里需要输入runner的执行方式,可以使用shell或者docker
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
// 出现这样信息表示服务端的配置就已经成功结束了，如果需要使用到自动构建，还需要再添加一个配置文件
```

项目token,下图左边红色分别是CI的URL和token:

![](https://docs.gitlab.com/ce/ci/quick_start/img/runners_activated.png)

创建完成以后，我们可以通过命令来查看各个Runner的状态：

```
sudo gitlab-ci-multi-runner list
```

#### 配置文件

这里说的配置文件就是`.gitlab-ci.yml`文件，它告诉我们的GitLab Runner要执行的事情，默认它将运行的流水线分为三个阶段：`build`、`test`、`deploy`，你不必把这三个阶段都添加上，那是因为没有任务的阶段会自动被Runner忽略，不会执行。

如果每个阶段都运行OK（没有非0返回值），那么就会看到一个此次提交完成的标识，如果有一个失败了，那么本次就执行不成功。然后我们可以通过日志看到出错的原因。

##### 先来看下一个简单的例子：

```
# 定义 stages
stages:
  - build
  - test
  - deploy
# 定义 job1
job1:
  stage: build
  script:
    - echo "I am job1"
    - echo "I am in build stage"
# 定义 job2
job2:
  stage: test
  script:
    - echo "I am job2"
    - echo "I am in test stage"
# 定义job3
job3:
 stage: deploy
 script:
 	- echo "I am job3"
    - echo "I am in deploy stage"
```

其中，我们用`Stages`关键字来定义Pipeline中的各个构建阶段，然后用一些非关键字来定义Jobs，每个job中可以使用Stage来指定当前job属于哪个stage。其中job中的script关键字来表示每个job要执行的命令。

注意，一些关键字不能用于job名字：

| 关键字           | 是否必须 | 描述                         |
| ------------- | ---- | -------------------------- |
| image         | 否    | 使用docker镜像，后面在docker知识块会详述 |
| services      | 否    | 使用docker服务，后面在docker知识块会详述 |
| stages        | 否    | 定义构建阶段                     |
| types         | 否    | 重命名stages，（已废弃，不建议使用）      |
| before_script | 否    | 运行在每个job执行前的命令             |
| after_script  | 否    | 运行在每个job执行后的命令             |
| variables     | 否    | 定义构建变量                     |
| cache         | 否    | 定义那些在后续运行时需要缓存的文件列表        |

执行提交后，我们可以通过项目—>Pipeline查看流水线状态：

![](https://docs.gitlab.com/ce/ci/quick_start/img/pipelines_status.png)

也可以通过点击最左侧状态进入控制台页面：

![](https://docs.gitlab.com/ce/ci/quick_start/img/build_log.png)

可以用前面提到的特点，来看下它的运行结果：

```
I am job1
I am in build stage
I am job2
I am in test stage
I am job3
I am in deploy stage
```

我们先编译代码，完成测试，最后部署。
