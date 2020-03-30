<template>
  <transition name="fade">
    <div class="header-detail" v-show="visible">
      <div class="detail-wrapper clearFix">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item"
                v-for="(item, index) in seller.supports"
                :key="item.id">
              <support-ico :size="2" :type="seller.supports[index].type"></support-ico>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Star from '../star/star'
  import SupportIco from '../support-ico/support-ico'

  export default {
    name: 'header-detail',
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    },
    components: {
      Star,
      SupportIco
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
  @import "~common/stylus/variable"

  .fade-enter-active
  .fade-leave-active
    transition opacity 0.5s
  .fade-enter
  .fade-leave-to
    opacity 0
  .header-detail
    position fixed
    z-index 100
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    color $color-white
    background $color-background-s
    backdrop-filter: blur(10px)
    .detail-wrapper
      display inline-block
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        /* 为下面的图标留空间 */
        padding-bottom 64px
        .name
          line-height 16px
          text-align center
          font-size $fontsize-large
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        .title
          display flex
          width 80%
          margin 28px auto 24px auto
          .line
            flex 1
            position relative
            top -6px
            border-bottom 1px solid $color-white-sss
          .text
            padding 0 12px
            font-size $fontsize-medium
            font-weight 700
        .supports
          width 80%
          margin 0 auto
          .support-item
            display flex
            align-items center
            padding 0 12px
            margin-bottom 12px
            &:last-child
              margin-bottom 0
            .support-ico
              margin-right 6px
            .text
              line-height 16px
              font-size $fontsize-small
        .bulletin
          width 80%
          margin 0 auto
          .content
            padding 0 12px
            line-height 24px
            font-size $fontsize-small
    .detail-close
      position relative
      width 30px
      height 30px
      /* 与上面的 padding-bottom 搭配 */
      margin -64px auto 0 auto
      clear both
      font-size $fontsize-large-xxxx
</style>
