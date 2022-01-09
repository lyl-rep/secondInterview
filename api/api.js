//三层封装的api层，或者叫模块层
import req from '@/utils/utils.js'
// 1.请求商家api
// console.log(req)
export const getMerchantInfo=()=>req.get('/shop/seller',{})
export const getGoodsInfo=()=>req.get('http://127.0.0.1:5000/goods/goods_list')