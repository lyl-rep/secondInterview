//三级封装的底层，也叫工具函数层
import axios from 'axios'
import qs from 'qs'
//1.服务器请求基本设置
axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000

//2.封装get和post方法
export default {//2-1.这里是用得default方式，所以后面引用时不用加{}
    get(url, data={}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: data})
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })

        })
    },
    post(url, data={}) {
        return  new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data))
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
