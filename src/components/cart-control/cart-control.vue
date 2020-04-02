<template>
  <div class="cart-control">
    <!-- @click.stop 防止点击事件冒泡 -->
    <!-- 外层组件负责平移，内层组件负责滚动 -->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop="decreaseCart">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add" @click.stop="addCart">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const EVENT_ADD = 'add'

  export default {
    name: 'cart-control',
    props: {
      food: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      addCart(event) {
        if (!this.food.count) {
          // Vue 中令对象添加到属性也能被观测到
          // 调用 this.$set
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // 派发事件
        this.$emit(EVENT_ADD, event.target)
      },
      decreaseCart() {
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/icon"
  @import "~common/stylus/variable"

  .cart-control
    display flex
    align-items center
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      .inner
        /* 令元素有宽高 */
        display inline-block
        line-height 24px
        font-size 24px
        color $color-blue
        transition all 0.4s linear
        transform rotate(0)
      &.move-enter
      &.move-leave-to
        opacity 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
      &.move-enter-active
      &.move-leave-active
        transition all 0.4s linear
    .cart-count
      display inline-block
      padding 6px
      line-height 24px
      text-align center
      font-size 10px
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $color-blue
</style>
