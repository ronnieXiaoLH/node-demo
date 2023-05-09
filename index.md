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

### mongodb 的索引

#### 索引的概念

文档对指定字段进行排序的数据结构，mongodb 使用 B-tree 结构

#### 索引的作用

如果没有索引，找一个匹配的文档，需要扫描整个 collection，所以索引的作用就是提升查找文档和文档排序的效率

#### 索引的分类

- 单键索引
- 复合键索引
- 多键索引

##### 单键索引

单键索引即文档中只有一个字段是索引

##### 复合键索引

复合键索引即文档中有多个字段是索引，比如：(A,B,C) 三个字段都是索引，那么在查找条件包含(A/A,B/A,B,C)等复合前缀规则时，才能提升查找的效率

##### 多键索引

多键索引是为文档中数组字段创建的索引，数组字段中的每一个元素，都会在多键索引中创建一个键

#### 更改索引

如果需要更改某些字段上已经创建的索引，必须先删除原有的索引，再重新创建新的索引，否则，新索引不会包含已经创建的文档

#### 索引的操作

- 创建：createIndex()
- 查询：getIndexes()
- 删除：dropIndex()

#### 索引使用的注意事项

- 索引虽然可以提升查询性能，但会降低插件性能，对于插入多查询少不要创索引

- 数据量不大时不需要使用索引。性能的提升并不明显，反而大大增加了内存和硬盘的消耗。

- 查询数据超过表数据量30%时，不要使用索引字段查询

- 排序工作的时候可以建立索引以提高排序速度

- 数字索引，要比字符串索引快的

### mongodb 的复制集

MongoDB复制集（Replica Set）是一组 MongoDB 服务器的集合，其中包括一个主节点（Primary）和多个从节点（Secondary），用于提供数据冗余和高可用性

#### 复制集的优点

1. 高可用性：当主节点不可用时，复制集会自动将一个从节点选举为新的主节点，并保持服务的可用性。
2. 数据冗余：数据在多个节点之间进行复制，以确保数据在多个节点之间的备份。
3. 扩展性：可以添加更多的从节点来扩展读取操作的容量，并在需要时添加更多的主节点以处理更多的写操作。
4. 数据备份：可以利用从节点来创建数据备份，以保护数据免受故障和数据丢失的影响。

#### 复制集的节点

- 主节点负责处理所有的写入请求
- 主节点（默认）和从节点都可以处理读取请求
- 从节点从主节点（或者符合条件的从节点）处复制数据
- 每个节点都会向其他节点发送心跳请求，每隔 2 秒发送一次，超过 10 秒则请求超时
- 复制集最多可以有 50 个节点

#### 复制集选举

- 候选节点发起选举，每个节点投票给比自己更同步的节点
- 得到超过半数选票的候选节点会当选主节点
- 复制集中最多可以有 7 个投票节点
- 复制集节点的数量最少应该是 3 个，节点个数最好是奇数

#### 触发选举的事件

- 主节点与从节点之间的心跳请求超时
- 复制集初始化
- 新节点加入复制集

#### 投票机

- 没有数据
- 可以投票
- 不能成为主节点

#### windows创建复制集

1. 启动三个 mongodb 服务

```bash
# 创建三个 db 文件夹 db1, db2, db3，每个文件夹里新增一个 mongod.log 和 mongod.conf 文件
# db1 的 mongd.conf 文件的内容
dbpath=D:\mongodb\data\db1
logpath=D:\mongodb\data\db1\mongod.log
journal=true
port=28017
replSet=rs0
# db2 的 mongd.conf 文件的内容
dbpath=D:\mongodb\data\db2
logpath=D:\mongodb\data\db2\mongod.log
journal=true
port=28018
replSet=rs0
# db3 的 mongd.conf 文件的内容
dbpath=D:\mongodb\data\db3
logpath=D:\mongodb\data\db3\mongod.log
journal=true
port=28018
replSet=rs0

# 打开三个 cmd 终端，分别执行 mongod -f D:\mongodb\data\db1\mongod.conf,mongod -f D:\mongodb\data\db2\mongod.conf,mongod -f D:\mongodb\data\db3\mongod.conf
```

2. 连接主节点

```bash
mongosh "mongodb://localhost:28017"
```

3. 添加从节点

```bash
rs.initiate()
rs.conf()
rs.add("localhost:28018")
rs.add("localhost:28019")
rs.status()
```



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
	# limit_conn_zone $binary_remote_addr zone=limit_addr:10m; # 根据 IP 做限制,10M 共享内存
    # limit_req_zone $binary_remote_addr zone=limit_req:15m rate=6r/m; # 根据 IP 做限制,15M 共享内存，每分钟处理 6 个请求
	server {
        listen 80;
        # server_name name1 name2 name3
        # 支持通配符和正则表达式(以~开头)，优先级 精准匹配 > 左侧通配符匹配 > 右侧通配符匹配 > 正则表达式匹配
        # server_name www.nginx.com *.nginx.org www.nginx.* ~^www\.imooc\..*$
        server_name www.nginx-test.com *.nginx-test.com;
        # location 匹配规则 1. 精准匹配(=) 2. 正则匹配区分大小写(~) 3. 正则匹配不区分大小写(~*) 4. 匹配到即停止搜索(^~) 5. 不到任何符号；匹配规则的优先级 1 > 4 > 2 > 3 > 5
        # location /test 表示如果没有找到 test 目录，会尝试找 test 文件；/test/ 则不会尝试找 test 文件
        location / {
            root html/nginx-test; # html 文件夹
            index index.html index.htm;

            # 限制请求数的配置
            # limit_conn_status 503; # 限制请求数发生时，返回给客户端的状态码
            # limit_conn_log_level warn; # 限制请求数发生时的日志级别
            # limit_conn limit_addr 2; # 限制的请求数个数
            # limit_rate 50; # 每个请求响应的结果的传输速率

            # limit_req_status 504; # 限速发生时，返回给客户端的状态码
            # limit_req_log_level error; # 限速数发生时的日志级别
            # limit_req zone=limit_req;
            # # limit_req zone=limit_req brust=7 nodelay;

            # allow 172.16.204.217; # allow 允许访问
            # deny all; # deny 不允许访问，不允许访问的 IP 访问返回 403
        }
        location /test {
            alias D:/my-code/node-project/node-demo/node/; # alias 是绝对路径，并且末尾必须带 /
            index index.html index.htm;
        }
        location /img {
            root html/nginx-test;
        }
        location /abc {
            stub_status; # 查看 nginx 的运行状态
        }
    }
    
    server {
      listen 8000;
      root html;

      location / {
        # return 200 "return 200 HTTP Code";
        # return 302 /bbs; # 重定向到 /bbs 
        return http://localhost:8000/bbs; # 不带状态码，需要返回一个绝对地址
      }

      location /bbs {
        index index.html index.htm;
      }

      location /search {
        rewrite ^/(.*) https://www.baidu.com permanent; # permanent 301, redirect 302
        return 200 "return 200 HTTP Code";
      }

      location /images {
        rewrite /images/(.*) http://www.nginx-test.com/img/$1 break; # break 表示不会继续再重定向到其它的地址
      }

      location /if {
        # if ($remote_addr = "172.16.204.217") {
        #   return 302 /bbs;
        # }
        if ($uri = "/if/a") {
          return 302 /bbs;
        }
        if ($uri != "/if/a") {
          return https://www.baidu.com;
        }
      }
    }
}

mail { # 邮件代理配置区
  server { # 邮件服务配置区
    # 具体配置选项
  }
}
```
