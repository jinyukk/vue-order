<template>
  <div class="star" :class="starType">
    <span class="star-item"
          v-for="(itemClass, index) in itemClasses"
          :class="itemClass"
          :key="index">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        const LENGTH = 5
        const ON = 'on'
        const OFF = 'off'
        const HALF = 'half'
        const score = Math.floor(this.score * 2) / 2
        const hasDecimal = score % 1 !== 0
        const result = []
        for (let i = 0; i < Math.floor(score); i++) {
          result.push(ON)
        }
        if (hasDecimal) {
          result.push(HALF)
        }
        while (result.length < LENGTH) {
          result.push(OFF)
        }
        return result
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
           bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
