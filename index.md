## express

### 初始化 express 项目

npx express-generator

### express 接收客户端的参数

- 接收 application/x-www-form-urlencoded 格式的数据（app.use(express.urlencoded())）
- 接收 application/json 格式的数据（app.use(express.json())）

接收什么类型的参数，需要使用 app.use 声明一下

### query、params 和 body 的区别

- query：使用请求头 url ? 后面传参（http:127.0.0.1:3000/?id=1）
- params：使用请求头 url 动态传参（http:127.0.0.1:3000/1）
- body: 使用请求体传参

### express 中间件分类

- 应用程序级别中间件：app.use、app.get 等
- 路由级别中间件：express.Router().get
- 错误处理中间件：app.use((err, req, res, next) => {})
- 内置中间件
- 第三方中间件

## mongodb

### mongodb 的安装

1. 下载并安装（选择不安装 compass）
2. 配置环境变量（找到 mongodb 的 bin 目录）
3. 在 mongodb 的 data 目录下，新建一个 db 的目录
4. 在新建的 db 目录下面打开 cmd，输入 mongod --dbpath 'db 目录所在的文件路径'，如果 mongodb 启动成功，在 27017 端口就可以访问了

### 配置快捷启动

1. 在 mongodb 的 data 目录下，新建一个 log 的目录
2. 在 mongodb 中新建一个 mongo.config 文件，并写入内容：dppath='db 目录所在的文件路径' logpath='log 目录所在的文件路径' + mongo.log
3. 在 mongodb 的 bin 目录下打开 cmd，输入 mongod -dbpath="D:\Program Files (x86)\mongodb\data\db" -logpath="D:\Program Files (x86)\mongodb\data\log\mongo.log" -install -serviceName "MongoDB"
4. 以后可以直接已管理员的身份打开 cmd，输入 net start MongoDB 启动 mongodb 了
5. 使用 net stop MongoDB 关闭 mongodb

### mongodb 的基础命令

- 查看所有的数据库：show dbs
- 使用某个数据库：use user
- 查看当前在哪个数据库：db
- 创建数据库：use demo（如果数据库中没有 demo 库，就是创建 demo 库了）
- 删除数据库：db.dropDatabase()
- 创建集合并插入数据：db.user.insert({name:'zhangsan',age:18})
- 查看所有的集合：show collections
- 插入一条数据：db.user.insertOne({name:'lisi',age:20})
- 插入多条数据：db.user.insertOne([{name:'zhangsan',age:18},{name:'lisi',age:20}])
- 查找一条数据：db.user.findOne({name:'zhangsan'})
- 查找多条数据：db.user.find({age:{$gt:10}})
- 更新一条数据：db.user.updateOne({name:'zhangsan'}, {$set:{age:30}})
- 更新多条数据：db.user.updateMany({age:{$gt:10}}, {$set:{name:'monica'}})
- 删除一条数据：db.user.deleteOne({name:'zhangsan'})
- 删除多条数据：db.user.deleteMany({age:{$gt:10}})

## redis

### redis 启动

在 redis 的安装目录下面，打开 cmd 终端，运行 `redis-server redis.windows.conf`

### redis 密码

- 设置密码：CONFIG SET requirepass '密码'，这个只是在当前服务中设置，退出后就没有了，永久设置还是要去 redis 的 conf 文件中，找到 requirepass 设置
- 取消密码：CONFIG SET requirepass ''
- 使用密码链接 redis-cli：redis-cli -a '密码'
- 查看密码：CONFIG GET requirepass

### redis 数据库

redis 默认启动的 0 数据库，可以通过 select 选择不同的数据库，比如：select 1

**redis 数据库之间的数据的隔离并不是绝对的，有些操作是全局的，比如：FLUSHALL（清空所有的数据库）**

### redis 常用命令

- redis-cli: 打开连接 redis 的终端
- info: 查看服务器信息
- keys: 查看所有的 key
- set key value：设置数据
- get key：获取数据
- del key：删除数据
- type key：查询值的类型

### redis 存储的数据类型

| --- | --- |
| 类型 | 类型说明 |
| String | 字符串，其他数据类型的基础类型 |
| Lists | 按插入顺序排序的字符串元素的集合 |
| Sets | 不重复且无序的字符串元素的集合 |
| Sorted sets | 类似 Sets,但是每个字符串元素都关联到一个叫 score 浮动数值（floating number value）。里面的元素总是通过 score 进行着排序 |
| Hashes | 由 field 和关联的 value 组成的 map |
| ... | ... |

## nginx

### linux 安装 nginx

sodo apt-get install nginx

### 启动 nginx

sudo netstat -tupln | grep 80

### 停止 nginx

nginx -s stop 或 nginx -s quit

quit 是优雅停止，等所有子进程把当前的任务处理完再停止

### nginx 启用新的配置文件

nginx -s reload

### 启用新的日志文件

nginx -s reopen

### 检测配置文件是否有问题

nginx -t

### nginx 配置文件

```bash
Main # 全局配置区，Nginx 核心功能配置

events { # events 事件区，子进程核心配置

}

http { # http 服务器配置区
  server { # 不同服务配置区
    location { # location 不同请求配置区
      # 具体配置选项
    }
  }
}

mail { # 邮件代理配置区
  server { # 邮件服务配置区
    # 具体配置选项
  }
}
```
