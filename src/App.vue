<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header.vue'
import Tab from './components/tab/tab.vue'
import Good from './components/good/good.vue'
import Rating from './components/rating/rating.vue'
import Seller from './components/seller/seller.vue'
import { getSeller } from './api/index.js'

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Good,
          data: { seller: this.seller }
        },
        {
          label: '评价',
          component: Rating,
          data: { seller: this.seller }
        },
        {
          label: '商家',
          component: Seller,
          data: { seller: this.seller }
        }
      ]
    }
  },
  created() {
    this.__getSeller()
  },
  methods: {
    __getSeller() {
      getSeller().then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus">
    .tab-wrapper
      position fixed
      top 137px
      left 0
      right 0
      bottom 0
</style>
