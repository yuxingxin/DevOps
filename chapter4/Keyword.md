这里介绍一下配置文件里面的关键字：

- image

  docker镜像，后面在讲docker时会详述。

- services

  docker服务，后面在讲docker时会详述。


- types

  stages的别名，已不建议使用，使用stages来代替。

- before_script

  定义任何jobs在运行前都会去执行的命令。

- after_script

  定义任何jobs在运行后都会去执行的命令。

- variables

  GitLab CI 允许我们在配置文件中添加构建变量，这些变量存储在Git仓库中，常用来赋予非敏感的项目配置。当我们接收到来自GitLab CI的job时，Runner会准备构建环境，它会先设置一些系统预先定义的变量（环境变量）和一些用户自定义的变量。

  下面展示的是变量的用法，它是一个被定义在配置文件中的全局变量，例如数据库的地址：

  ```
  variables:
  	DATABASE_URL: "postgres://postgres@postgres/my_database"
  script:
  	- echo $DATABASE_URL
  ```

  另外它还有其他的种类，并且有一定的优先级，也就是说在名字相同的情况下，优先级高的会把优先级低的值覆盖：

  1. Trigger variables （触发器变量）
  2. 项目级的Secret variables （保密变量）或者 protected secret variables（受保护的保密变量）
  3. 群组级的Secret variables （保密变量）或者 protected secret variables（受保护的保密变量）
  4. 配置文件里面定义的job级变量
  5. 配置文件里面定义的全局变量
  6. Deployment variables （部署变量）
  7. 系统预定义的变量（这也是优先级最低的）

  例如，我们定义了一个`API_TOKEN=secure`作为保密变量，又在配置文件YAML中定义了一个`API_TOKEN=yaml`，这时候`API_TOKEN`会取`secure`作为其值。

  - 预定义变量

    对于系统预先定义的环境变量，更多可以查看[官网地址](https://docs.gitlab.com/ce/ci/variables/README.html#predefined-variables-environment-variables)

  - 配置文件定义的变量

    分为全局变量和job级变量，如果在你的job中关闭全局变量，只需做如下配置：

    ```
    job_name:
    	variables: {}
    ```

    当然也可以在变量中引用其他变量，官网给出一个例子：

    ```
    variables:
      LS_CMD: 'ls $FLAGS $$TMP_DIR'
      FLAGS: '-al'
    script:
      - 'eval $LS_CMD'  # will execute 'ls -al $TMP_DIR'
    ```

  - 保密变量

    > 需要GitLab Runner版本0.4.0及以上

    与上面的区别是，保密变量被存储在仓库外，即不在YAML配置文件中，它常用来存储密码，密钥，以及资格证书这一类的。在项目设置—>Pipelines（流水线）中设置。

  - 受保护的保密变量

    > 需要GitLab版本9.3及以上

    与上面区别是，无论何时，它都可以被传递到运行在受保护分支或者受保护标签的流水线中。通过如下打勾设置

    ![](https://ws4.sinaimg.cn/large/006tKfTcly1fjhsjod8i0j31ho0h8whh.jpg)

  - 部署变量

    > 需要GitLab CI版本8.15及以上。

    它用于定义负责部署配置的项目服务所需要的变量。
    ![](https://ws2.sinaimg.cn/large/006tNc79ly1fjnr6cwb2rj30v80gnwh1.jpg)
    ![](https://ws4.sinaimg.cn/large/006tNc79ly1fjnr6s3s72j30v20h2tbh.jpg)

  Debug Tracing

  > 注意它只在GitLab Runner 1.7及以上版本可用

  调试追踪：默认GitLab在运行Job时会隐藏大部分细节，这样就能让一些秘密的信息免遭泄露，除非是我们把它用脚本输出到屏幕上去。如果某个Job没有按照我们的预期执行，这样的话在诊断问题时就变得困难，这时候我们可以在配置文件启用调试追踪，这样就可以打印出所有的设置的变量。在启用之前，你需要先确保job对群组成员可见，并提前先清除所有已生成的job痕迹。

  要启用调试追踪，只需将`CI_DEBUG_TRACE`设置为`true`即可

  ```
  job_name:
    variables:
      CI_DEBUG_TRACE: "true"
  ```

  对应输出：

  ```
  ...

  export CI_SERVER_TLS_CA_FILE="/builds/gitlab-examples/ci-debug-trace.tmp/CI_SERVER_TLS_CA_FILE"
  if [[ -d "/builds/gitlab-examples/ci-debug-trace/.git" ]]; then
    echo $'\''\x1b[32;1mFetching changes...\x1b[0;m'\''
    $'\''cd'\'' "/builds/gitlab-examples/ci-debug-trace"
    $'\''git'\'' "config" "fetch.recurseSubmodules" "false"
    $'\''rm'\'' "-f" ".git/index.lock"
    $'\''git'\'' "clean" "-ffdx"
    $'\''git'\'' "reset" "--hard"
    $'\''git'\'' "remote" "set-url" "origin" "https://gitlab-ci-token:xxxxxxxxxxxxxxxxxxxx@example.com/gitlab-examples/ci-debug-trace.git"
    $'\''git'\'' "fetch" "origin" "--prune" "+refs/heads/*:refs/remotes/origin/*" "+refs/tags/*:refs/tags/*"
  else
    $'\''mkdir'\'' "-p" "/builds/gitlab-examples/ci-debug-trace.tmp/git-template"
    $'\''rm'\'' "-r" "-f" "/builds/gitlab-examples/ci-debug-trace"
    $'\''git'\'' "config" "-f" "/builds/gitlab-examples/ci-debug-trace.tmp/git-template/config" "fetch.recurseSubmodules" "false"
    echo $'\''\x1b[32;1mCloning repository...\x1b[0;m'\''
    $'\''git'\'' "clone" "--no-checkout" "https://gitlab-ci-token:xxxxxxxxxxxxxxxxxxxx@example.com/gitlab-examples/ci-debug-trace.git" "/builds/gitlab-examples/ci-debug-trace" "--template" "/builds/gitlab-examples/ci-debug-trace.tmp/git-template"
    $'\''cd'\'' "/builds/gitlab-examples/ci-debug-trace"
  fi
  echo $'\''\x1b[32;1mChecking out dd648b2e as master...\x1b[0;m'\''
  $'\''git'\'' "checkout" "-f" "-q" "dd648b2e48ce6518303b0bb580b2ee32fadaf045"
  '
  +++ hostname
  ++ echo 'Running on runner-8a2f473d-project-1796893-concurrent-0 via runner-8a2f473d-machine-1480971377-317a7d0f-digital-ocean-4gb...'
  Running on runner-8a2f473d-project-1796893-concurrent-0 via runner-8a2f473d-machine-1480971377-317a7d0f-digital-ocean-4gb...
  ++ export CI=true
  ++ CI=true
  ++ export CI_DEBUG_TRACE=false
  ++ CI_DEBUG_TRACE=false
  ++ export CI_COMMIT_SHA=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ CI_COMMIT_SHA=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ export CI_COMMIT_BEFORE_SHA=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ CI_COMMIT_BEFORE_SHA=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ export CI_COMMIT_REF_NAME=master
  ++ CI_COMMIT_REF_NAME=master
  ++ export CI_JOB_ID=7046507
  ++ CI_JOB_ID=7046507
  ++ export CI_REPOSITORY_URL=https://gitlab-ci-token:xxxxxxxxxxxxxxxxxxxx@example.com/gitlab-examples/ci-debug-trace.git
  ++ CI_REPOSITORY_URL=https://gitlab-ci-token:xxxxxxxxxxxxxxxxxxxx@example.com/gitlab-examples/ci-debug-trace.git
  ++ export CI_JOB_TOKEN=xxxxxxxxxxxxxxxxxxxx
  ++ CI_JOB_TOKEN=xxxxxxxxxxxxxxxxxxxx
  ++ export CI_PROJECT_ID=1796893
  ++ CI_PROJECT_ID=1796893
  ++ export CI_PROJECT_DIR=/builds/gitlab-examples/ci-debug-trace
  ++ CI_PROJECT_DIR=/builds/gitlab-examples/ci-debug-trace
  ++ export CI_SERVER=yes
  ++ CI_SERVER=yes
  ++ export 'CI_SERVER_NAME=GitLab CI'
  ++ CI_SERVER_NAME='GitLab CI'
  ++ export CI_SERVER_VERSION=
  ++ CI_SERVER_VERSION=
  ++ export CI_SERVER_REVISION=
  ++ CI_SERVER_REVISION=
  ++ export GITLAB_CI=true
  ++ GITLAB_CI=true
  ++ export CI=true
  ++ CI=true
  ++ export GITLAB_CI=true
  ++ GITLAB_CI=true
  ++ export CI_JOB_ID=7046507
  ++ CI_JOB_ID=7046507
  ++ export CI_JOB_TOKEN=xxxxxxxxxxxxxxxxxxxx
  ++ CI_JOB_TOKEN=xxxxxxxxxxxxxxxxxxxx
  ++ export CI_COMMIT_REF=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ CI_COMMIT_REF=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ export CI_COMMIT_BEFORE_SHA=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ CI_COMMIT_BEFORE_SHA=dd648b2e48ce6518303b0bb580b2ee32fadaf045
  ++ export CI_COMMIT_REF_NAME=master
  ++ CI_COMMIT_REF_NAME=master
  ++ export CI_COMMIT_NAME=debug_trace
  ++ CI_JOB_NAME=debug_trace
  ++ export CI_JOB_STAGE=test
  ++ CI_JOB_STAGE=test
  ++ export CI_SERVER_NAME=GitLab
  ++ CI_SERVER_NAME=GitLab
  ++ export CI_SERVER_VERSION=8.14.3-ee
  ++ CI_SERVER_VERSION=8.14.3-ee
  ++ export CI_SERVER_REVISION=82823
  ++ CI_SERVER_REVISION=82823
  ++ export CI_PROJECT_ID=17893
  ++ CI_PROJECT_ID=17893
  ++ export CI_PROJECT_NAME=ci-debug-trace
  ++ CI_PROJECT_NAME=ci-debug-trace
  ++ export CI_PROJECT_PATH=gitlab-examples/ci-debug-trace
  ++ CI_PROJECT_PATH=gitlab-examples/ci-debug-trace
  ++ export CI_PROJECT_NAMESPACE=gitlab-examples
  ++ CI_PROJECT_NAMESPACE=gitlab-examples
  ++ export CI_PROJECT_URL=https://example.com/gitlab-examples/ci-debug-trace
  ++ CI_PROJECT_URL=https://example.com/gitlab-examples/ci-debug-trace
  ++ export CI_PIPELINE_ID=52666
  ++ CI_PIPELINE_ID=52666
  ++ export CI_RUNNER_ID=1337
  ++ CI_RUNNER_ID=1337
  ++ export CI_RUNNER_DESCRIPTION=shared-runners-manager-1.example.com
  ++ CI_RUNNER_DESCRIPTION=shared-runners-manager-1.example.com
  ++ export 'CI_RUNNER_TAGS=shared, docker, linux, ruby, mysql, postgres, mongo'
  ++ CI_RUNNER_TAGS='shared, docker, linux, ruby, mysql, postgres, mongo'
  ++ export CI_REGISTRY=registry.example.com
  ++ CI_REGISTRY=registry.example.com
  ++ export CI_DEBUG_TRACE=true
  ++ CI_DEBUG_TRACE=true
  ++ export GITLAB_USER_ID=42
  ++ GITLAB_USER_ID=42
  ++ export GITLAB_USER_EMAIL=user@example.com
  ++ GITLAB_USER_EMAIL=user@example.com
  ++ export VERY_SECURE_VARIABLE=imaverysecurevariable
  ++ VERY_SECURE_VARIABLE=imaverysecurevariable
  ++ mkdir -p /builds/gitlab-examples/ci-debug-trace.tmp
  ++ echo -n '-----BEGIN CERTIFICATE-----
  MIIFQzCCBCugAwIBAgIRAL/ElDjuf15xwja1ZnCocWAwDQYJKoZIhvcNAQELBQAw'

  ...
  ```

  在脚本中使用变量：

  | Shell         | 使用语法          |
  | ------------- | ------------- |
  | bash/sh       | $variable     |
  | windows batch | %variable%    |
  | PowerShell    | $env:variable |

  在bash/sh中：

  ```
  job_name:
    script:
      - echo $CI_JOB_ID
  ```

  在Windows Batch中:

  ```
  job_name:
    script:
      - echo %CI_JOB_ID%
  ```

  在Windows PowerShell中：

  ```
  job_name:
    script:
      - echo $env:CI_JOB_ID
  ```

  你也可以使用`export`指令列出所有系统变量，但是这样也会在job日志中暴露出所有你设置的保密变量：

  ```
  job_name:
    script:
      - export
  ```

  打印如下：

  ```
  export CI_JOB_ID="50"
  export CI_COMMIT_SHA="1ecfd275763eff1d6b4844ea3168962458c9f27a"
  export CI_COMMIT_REF_NAME="master"
  export CI_REPOSITORY_URL="https://gitlab-ci-token:abcde-1234ABCD5678ef@example.com/gitlab-org/gitlab-ce.git"
  export CI_COMMIT_TAG="1.0.0"
  export CI_JOB_NAME="spec:other"
  export CI_JOB_STAGE="test"
  export CI_JOB_MANUAL="true"
  export CI_JOB_TRIGGERED="true"
  export CI_JOB_TOKEN="abcde-1234ABCD5678ef"
  export CI_PIPELINE_ID="1000"
  export CI_PROJECT_ID="34"
  export CI_PROJECT_DIR="/builds/gitlab-org/gitlab-ce"
  export CI_PROJECT_NAME="gitlab-ce"
  export CI_PROJECT_NAMESPACE="gitlab-org"
  export CI_PROJECT_PATH="gitlab-org/gitlab-ce"
  export CI_PROJECT_URL="https://example.com/gitlab-org/gitlab-ce"
  export CI_REGISTRY="registry.example.com"
  export CI_REGISTRY_IMAGE="registry.example.com/gitlab-org/gitlab-ce"
  export CI_RUNNER_ID="10"
  export CI_RUNNER_DESCRIPTION="my runner"
  export CI_RUNNER_TAGS="docker, linux"
  export CI_SERVER="yes"
  export CI_SERVER_NAME="GitLab"
  export CI_SERVER_REVISION="70606bf"
  export CI_SERVER_VERSION="8.9.0"
  export GITLAB_USER_ID="42"
  export GITLAB_USER_EMAIL="user@example.com"
  export CI_REGISTRY_USER="gitlab-ci-token"
  export CI_REGISTRY_PASSWORD="longalfanumstring"
  ```

- cache

  > 要求 GitLab Runner 0.7.0+

  cache常会被用来在不同job之间指定需要缓存的文件或目录，例如我们在编译之前所需要安装的依赖，如果不缓存这些文件，那么每次运行job都会重新安装下载，这样就会浪费很多时间。

  **从GitLab9.0开始，默认缓存是被启用的并且在各个Pipelines和jobs之间共享。**

  如果`cache`定义在jobs作用域外，那么它代表着全局缓存，所有jobs都会使用该设置。

  如缓存`binaries`和`.config`目录的所有文件：

  ```
  rspec:
    script: test
    cache:
      paths:
      - binaries/
      - .config
  ```

  缓存所有Git未追踪的文件：

  ```
  rspec:
    script: test
    cache:
      untracked: true
  ```

  缓存所有Git未追踪的和`binaries`文件夹下的所有文件：

  ```
  rspec:
    script: test
    cache:
      untracked: true
      paths:
      - binaries/
  ```

  局部定义的会覆盖全局定义的cache，下面`rspec`只会缓存`binaries/`目录下面的：

  ```
  cache:
    paths:
    - my/files

  rspec:
    script: test
    cache:
      key: rspec
      paths:
      - binaries/
  ```

  以上cache在各个jobs是共享的，如果你想单独为某个job设置cache，你需要设置一个`cache:key`，不然的话就会被覆盖掉。

  例如：

  启用单个job缓存设置：

  ```
  cache:
    key: "$CI_JOB_NAME"
    untracked: true
  ```

  启用单个分支的缓存设置：

  ```
  cache:
    key: "$CI_COMMIT_REF_NAME"
    untracked: true
  ```

  同时启用单个job或者单个分支的设置：

  ```
  cache:
    key: "$CI_JOB_STAGE/$CI_COMMIT_REF_NAME"
    untracked: true
  ```

  同样你用Windows Batch 或者Windows PowerShell 记得分别将`$`换成`%`和`$env:`

  默认一个设置过缓存的job开始执行时先下载文件，最后又上传上去，即pull-push策略，如果我们事先知道某些缓存文件没有修改，这样我们可以通过在job中设置`policy:pull`忽略掉上传这一步。同理，如果我们想忽略上传，也可以设置`policy:push`。

  举例如下：

  ```
  stages:
    - setup
    - test

  prepare:
    stage: setup
    cache:
      key: gems
      paths:
        - vendor/bundle
    script:
      - bundle install --deployment

  rspec:
    stage: test
    cache:
      key: gems
      paths:
        - vendor/bundle
      policy: pull
    script:
      - bundle exec rspec ...
  ```

- Jobs.script

  定义Runner要执行的脚本。

- Jobs.image

  使用docker镜像，后续在docker中说明。

- Jobs.services

  使用docker服务，后续在docker中说明。

- Jobs.stage

  定义job所在的构建阶段。

- Jobs.type

  stage别名。

- Jobs.variables

  定义job级别的变量。

- Jobs.only

  定义jobs被触发时的提交或者推送git的分支名称。

- Jobs.except

  与上面相反。

- Jobs.tags

  定义一系列用来选择Runner的标签。

- Jobs.allow_failure

  允许job失败标识，失败的job不影响提交状态。

- Jobs.when

  定义允许job的时间，可以是`on_success`, `on_failure`, `always` or `manual`。

- Jobs.dependencies

  定义一个job依赖的其他job，可以在他们之间传递附件。

- Jobs.artifacts

  定义job附件列表。

- Jobs.cache

  定义后续运行的缓存文件。

- Jobs.before_script

  定义job运行前要执行的命令。

- Jobs.after_script

  定义job运行后要执行的命令。

- Jobs.environment

  定义此作业完成部署的环境。

- Jobs.coverage

  为一个给定的job定义代码覆盖率设置。

- Jobs.retry

  定义一个job在失败时可以重试多少次。

更多详情，可以参考[官网](https://docs.gitlab.com/ce/ci/yaml/README.html)
