import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.ItemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 350);
    },
    listenShowBackTop(position) {
      this.isShow = position.y < -1000;
    }
  },
}
