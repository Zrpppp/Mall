import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'

export default{
  //mutations唯一的目的就是修改state中的状态
  //每个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  },
}
