# GitLab CI
先放官方一张图：

![](https://docs.gitlab.com/ce/ci/img/cicd_pipeline_infograph.png)

从这张图我们也可以看出GitLab的工作流程，从提交代码，到CI（持续集成）流水线，再到CD（持续部署）流水线完成整个过程。它是一套与GitLab结合使用的持续集成系统。从8.0开始，GitLab就已经集成到GitLab中了，它允许我们只用在项目中添加一个配置文件，然后再创建一个Runner就可以进行持续集成，即当我们每次提交或者推送代码时，就会触发CI流水线。
在展开说之前，这里不得不提几个概念。
* Pipeline
* Stages
* Jobs
* GitLab Runner
