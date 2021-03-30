<template>
  <div>
    <el-select class="order-cover-select" v-model="selectModel" clearable placeholder="请选择设备名称" filterable multiple collapse-tags v-el-select-loadmore="loadmore" :filter-method="filterVmModel">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
// select 分页
export default {
  name: 'selectDemo',
  // 此处详见：https://blog.csdn.net/zhangshineng/article/details/89676413?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
  // 文档：https://cn.vuejs.org/v2/guide/custom-directive.html
  directives: {
    // 计算是否滚动到最下面
    'el-select-loadmore': {
      bind (el, binding) {
        // 获取element-ui定义好的scroll盒子 
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          /**
          * scrollHeight 获取元素内容高度(只读)
          * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
          * clientHeight 读取元素的可见高度(只读)
          * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
          */
          const condition = Math.round(this.scrollHeight - this.scrollTop) <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data () {
    return {
      selectModel: '',// select 选择的数据
      optionAll: [], // 全部的数据
      options: [], // 分页数据
      // 分页参数
      query: {
        page: 1,
        limit: 10
      },
      filterText: '' // 筛选文本
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () {
      // http request....
      // 模拟2k条数据
      let demoData = []
      for (let index = 0; index < 2000; index++) {
        demoData.push({ name: `测试${index}`, id: index })
      }
      this.optionAll = demoData
      this.loadmore(true)
    },
    // 分页方法 详见 directives
    loadmore (firstTag) {
      // 筛选时下拉不触发分页 
      if (!this.filterText) {
        if (!firstTag) {
          this.query.page++
        }
        // 前端分页简单版本
        // 分页开始坐标
        const begin = this.query.limit * (this.query.page - 1)
        // 分页结束坐标
        const end = (this.query.limit * (this.query.page - 1)) + this.query.limit
        // 这里使用slice 进行分页
        this.options.push(...this.optionAll.slice(begin, end))
      }
    },
    // 筛选方法 
    // 此处详见：https://www.cnblogs.com/mianbaodaxia/p/11153341.html 
    filterVmModel (value) {
      this.filterText = value
      // 筛选数据
      if (value) {
        this.options = this.optionAll.filter(item => {
          if (item.name && item.name.indexOf(value) !== -1) {
            return true
          } else {
            return false
          }
        })
      } else {
        // 直接赋值会连续触发 loadmore 分页事件
        this.options = []
        this.$nextTick(() => {
          this.options = this.optionAll.slice(0, this.query.limit * this.query.page)
        })
      }
    },
  }
}
</script>

<style>
</style>