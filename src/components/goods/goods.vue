<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        v-if="goods.length"
        :side="true"
        :data="goods"
        :options="scrollOptions"
        >
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name">
          <ul>
            <li v-for="(food, index) in good.foods"
                :key="index"
                class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control
                    :food="food"
                    @add="onAdd"
                  >
                  </cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        :selectFoods="selectFoods"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        ref="shopCart"
      >
      </shop-cart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getGoods } from '../../api'
  import ShopCart from '../shop-cart/shop-cart'
  import CartControl from '../cart-control/cart-control'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        goods: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        fetched: false
      }
    },
    computed: {
      seller() {
        return this.data.seller
      },
      selectFoods() {
        const res = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              res.push(food)
            }
          })
        })
        return res
      }
    },
    methods: {
      fetch() {
        if (!this.fetched) {
          this.fetched = true
          getGoods().then(goods => {
            this.goods = goods
          })
        }
      },
      onAdd(el) {
        this.$refs.shopCart.drop(el)
      }
    },
    components: {
      ShopCart,
      CartControl
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .goods
    position relative
    height 100%
    .scroll-nav-wrapper
      position absolute
      width 100%
      top 0
      left 0
      bottom 48px
    >>> .cube-scroll-nav-bar
      width 80px
      white-space normal
    >>> .cube-scroll-nav-bar-item
      padding 0 10px
      display flex
      align-items center
      height 56px
      line-height 14px
      font-size $fontsize-small
      background $color-background-sss
      .text
        flex 1
        position: relative
    >>> .cube-scroll-nav-bar-item_active
      color $color-dark-grey
      background $color-white
    >>> .cube-scroll-nav-panel-title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid $color-col-line
      font-size $fontsize-small
      color $color-grey
      background $color-background-sss
    .food-item
      position relative
      display flex
      margin 18px
      padding-bottom 18px
      &:last-child
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
        img
          height auto
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size $fontsize-medium
          color $color-dark-grey
        .desc
        .extra
          font-size $fontsize-small-s
          color $color-light-grey
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size $fontsize-medium
            color $color-red
          .old
            text-decoration line-through
            font-size $fontsize-small-s
            color $color-light-grey
        .cart-control-wrapper
          position absolute
          right 0
          bottom 5px
    .shop-cart-wrapper
      position absolute
      left 0
      bottom 0
      z-index 50
      width 100%
      height 48px
</style>
