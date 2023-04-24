const ENV = process.env.MODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'prod',
  notProd: ENV !== 'prod',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}
