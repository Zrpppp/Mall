<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //1.创建BSrcoll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // setTimeout(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     probeType: this.probeType,
    //     click: true,
    //     pullUpLoad: this.pullUpLoad
    //   })
    // },1500)

    //2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }

    //3.监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        // console.log('pullingUp');
      })
    }
  },
  watch: {
    data () {
      setTimeout(this.refresh,30)
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      // this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  },
}
</script>

<style scoped>

</style>
