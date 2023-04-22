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
