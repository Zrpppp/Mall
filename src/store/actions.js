import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload新添加新的商品
      let oldPrice = context.state.cartList.find(item => item.iid === payload.iid)

      //判断oldPrice
      if (oldPrice) {
        //数量加一
        context.commit(ADD_COUNTER, oldPrice)
        resolve('当前商品数量+1')
      } else {
        //添加商品
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
        resolve('当前商品加入购物车')
      }
    })
  }
}
