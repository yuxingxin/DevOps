#### Pipeline

流水线：执行一次流水线相当于一次构建任务，里面可以包含多个流程，如安装依赖，运行测试，编译，部署测试服务器，部署生成服务器等等。任何根据我们设置的提交或MR合并都可以触发Pipeline。

#### Stages

构建阶段：其实也就是上面提到的流程，我们可以在一次Pipeline里定义多个Stages，每个阶段都有这样的特点：

- 所有Stages都会按照顺序执行，即当一个Stage完成后，下一个Stage才会开始执行。
- 只有当所有Stages都执行完成以后，该Pipeline才会构建成功。
- 如果任何一个Stage失败，那么它后面的所有Stages都不再执行，该Pipeline就会失败。

#### Jobs

构建工作/任务：表示某个Stage里面要执行的工作。我们可以在Stages里定义多个Jobs，每个Job都会有这样的特点：

- 相同Stage中的Jobs会并行执行。
- 相同Stage中的Jobs都执行成功后，该Stage才算成功。
- 如果任何一个Job失败，那么该Stage就会失败，也就是整个Pipeline也会失败。

#### GitLab Runner

说完了上面几个概念后，那么由谁来执行这些构建任务呢？上面我们在说配置文件时已经提到它了，就是GitLab Runner。

一般来说，构建任务是耗时又耗资源的工作，如果这件事情交给GitLab CI来做的话，就会导致GitLab的性能大幅降低，更何况GitLab CI又要承担管理各个项目的构建状态，所以就引入了GitLab Runner来帮我们做这件事情。通常我们把GitLab Runner安装在不同的机器上，所以在构建任务运行期间并不会影响到GitLab的性能。

Runner类型可以分为下面两类：

- **Shared Runner（共享型）**

  这种Runner（工人）是所有项目都能够使用的。但是也只有系统管理员能够创建Shared Runner。


- **Specific Runner（指定型）**

  这种Runner（工人）只能为指定的项目服务。拥有该项目访问权限的人都能够为该项目创建Specific Runner。

##### 安装

```
# For Debian/Ubuntu
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.deb.sh | sudo bash
$ sudo apt-get install gitlab-ci-multi-runner
# For CentOS
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
$ sudo yum install gitlab-ci-multi-runner
```

#### 总结

每当我们执行提交或者推送操作时，GitLab就会将这个变动通知GitLab CI，这是GitLab CI会找出与这个工程相关联的GitLab Runner，并通知这些Runner运行一次我们的流水线，对应执行Stages里面的Jobs任务，也就是预先定义好的脚本。所以GitLab Runner 就是一个用来执行软件集成脚本的东西，它就像工厂里面一个个工人，而GitLab CI就是这个工厂的管理中心，所有工人都需要在GitLab CI里面进行注册，并且表明自己的身份，即是为哪个项目服务的，当我们的工程发生变化时，GitLab CI就会通知相应的负责这个项目的工人「Runner」执行对应项目的集成脚本，即流水线上面的工作/任务。
