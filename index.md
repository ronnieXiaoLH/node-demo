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
