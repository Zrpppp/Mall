<template>
  <div class="bottom-bar">
    <div class="check-space">
      <!--全选按钮-->
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <!--合计-->
    <div class="price">
      合计: {{ totalPrice }}
    </div>

    <!--去计算-->
    <div class="calculate" @click="calculateClick">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach(item => item.checked = false);
      } else {
        //部分选中或者全不选中
        this.cartList.forEach(item => item.checked = true);
      }
    },
    calculateClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择要购买的商品', 2000);
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked === true
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList === 0) return false;
      // return !(this.cartList.filter(item => !item.checked).length)
      return !(this.cartList.find(item => !item.checked));
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  bottom: 0;
  background-color: #dae0e5;
  text-align: center;
  font-size: 16px;
  z-index: 99;
}

.bottom-bar .check-space {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 60px;
}

.check-button {
  line-height: 20px;
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.check-space span {
  /*font-weight: 900;*/
  color: var(--color-high-text);
}

.bottom-bar .price {
  margin-left: 20px;
  /*color: var(--color-high-text);*/
  color: var(--color-text);
  flex: 1;
}

.bottom-bar .calculate {
  width: 100px;
  background-color: #fd7e14;
}
</style>
