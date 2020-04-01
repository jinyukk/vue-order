<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'highlight' : totalCount > 0 }">
            <i class="icon-shopping_cart" :class="{ 'highlight' : totalCount > 0 }"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{ 'highlight' : totalPrice > 0 }">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}</div>
      </div>
      <div class="content-right" :class="{ 'highlight' : totalPrice >= minPrice }">
        <div class="pay" :class="{ 'highlight' : totalPrice >= minPrice }">
          {{ payDesc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'shop-cart',
    props: {
      selectFoods: {
        // 如果 type 为 Array 或 Object
        // 那么 default 需要为一个函数
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach(food => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice.toString() + '起送'
        } else if (this.totalPrice < this.minPrice) {
          return '还差￥' + (this.minPrice - this.totalPrice).toString() + '起送'
        } else {
          return '去结算'
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"

  .shop-cart
    height 100%
    .content
      display flex
      font-size 0
      color $color-light-grey
      background #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          box-sizing border-box
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $color-blue
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color $color-white
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 14px
            line-height 14px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color $color-white
            background $color-red
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color $color-white
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background #2b333b
          &.highlight
            color $color-white
            background $color-green
</style>
