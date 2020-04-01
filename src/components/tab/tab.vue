<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      :showSlider=true
      :inline=false
      :useTransition=false
      ref="tabBar"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :initialIndex="currentIndex"
        :loop=false
        :showDots=false
        :autoPlay=false
        :options="slideOptions"
        ref="slide"
        @change="onChange"
        @scroll="onScroll"
        >
        <cube-slide-item v-for="tab in tabs" :key="tab.label">
          <!-- 动态组件 -->
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    data() {
      return {
        currentIndex: this.initialIndex,
        slideOptions: {
          // 监听 scroll 事件
          listenScroll: true,
          // 设置何时派发 scroll 事件
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.currentIndex].label
        },
        set(newVal) {
          this.currentIndex = this.tabs.findIndex((tab) => {
            return tab.label === newVal
          })
        }
      }
    },
    mounted() {
      this.onChange(this.currentIndex)
    },
    methods: {
      onChange(newIndex) {
        this.currentIndex = newIndex
        const component = this.$refs.component[this.currentIndex]
        // 当 fetch() 方法存在时，再进行调用
        component.fetch && component.fetch()
      },
      onScroll(pos) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        // 内部的 slide 的为一个 better-scroll 实例
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    display flex
    flex-direction column
    height 100%
    >>> .cube-tab
      padding 10px 0
    .slide-wrapper
      flex 1
      // 内容隐藏
      overflow hidden
</style>
