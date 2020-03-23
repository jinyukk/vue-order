<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SupportIco from '../support-ico/support-ico.vue'

  export default {
    name: 'v-header',
    // template 可直接使用 props 的内容
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      SupportIco
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // vue.config.js 修改后才能使用 ~，来进行相对定位
  @import"~common/stylus/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .header
    position relative
    color $color-white
    background $color-background-ss
    .content-wrapper
      position relative
      display flex
      align-items center
      // top right bottom left
      padding 24px 12px 18px 24px
      // avatar
      .avatar
        // none = 0 0 auto
        flex none
        margin-right 16px
        img
          border-radius 2px
      // content
      .content
        flex 1
        .title
          display flex
          align-items center
          margin-bottom 8px
          .brand
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size $fontsize-large
            font-weight bold
        .description
          margin-bottom 8px
          font-size $fontsize-small
          line-height 12px
        .support
          display flex
          align-items center
          .support-ico
            margin-right 4px
          .text
            line-height 12px
            font-size $fontsize-small-s
      // support-count
      .support-count
        position absolute
        right 12px
        bottom 14px
        display flex
        align-items center
        padding 0 8px
        height 24px
        line-height 24px
        text-align center
        border-radius 14px
        background $color-background-sss
        .count
          font-size $fontsize-small-s
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size $fontsize-small-s
    .bulletin-wrapper
      display flex
      align-items center
      background-color $color-background-sss
      padding 0 8px
      height 28px
      line-height 28px
      .bulletin-title
        flex none
        width 22px
        height 12px
        margin-right 4px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        flex 1
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        font-size $fontsize-small-s
      .icon-keyboard_arrow_right
        flex none
        font-size $fontsize-small-s
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
</style>
