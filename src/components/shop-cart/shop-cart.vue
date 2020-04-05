<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
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
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const BALL_NUM = 10
  const INNER_CLS = 'inner-hook'

  function createBalls() {
    const res = []
    for (let i = 0; i < BALL_NUM; i++) {
      res.push({ show: false })
    }
    return res
  }

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
    data() {
      return {
        balls: createBalls(),
        listFold: true
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
    },
    created() {
      this.dropBalls = []
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop(el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        const rect = ball.el.getBoundingClientRect()
        const x = rect.left - 32
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = 'translate3d(0, ' + y.toString() + 'px, 0)'
        const inner = el.getElementsByClassName(INNER_CLS)[0]
        inner.style.transform = inner.style.webkitTransform = 'translate3d(' + x.toString() + 'px, 0, 0)'
      },
      dropping(el, done) {
        // 小球初始位置变化，触发重绘
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName(INNER_CLS)[0]
        inner.style.transform = inner.style.webkitTransform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      },
      afterDrop(el) {
        const ball = this.dropBalls.shift()
        ball.show = false
        el.style.display = 'none'
      },
      toggleList() {
        if (this.listFold) {
          if (this.totalCount === 0) {
            return
          }
          this.listFold = false
          this._showShopCartList()
        } else {
          this.listFold = true
          this._hideShopCartList()
        }
      },
      _showShopCartList() {
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          $events: {
            hide: () => {
              this.listFold = true
            }
          }
        })
        this.shopCartListComp.show()
      },
      _hideShopCartList() {
        this.shopCartListComp.hide()
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
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $color-blue
          transition all 0.4s linear
</style>
