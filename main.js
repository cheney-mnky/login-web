// 发送请求的拦截器
// var instance = axios.create();
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    console.log('post拦截')
    config.data = qs.stringify(config.data)
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

new Vue({
  el: '#app',
  render: h => h(App)
})
