<template>
  <div class="channel-select">
    <!-- :value="value" : 前者为组件的属性名称,后者为props中的值 -->
    <el-select placeholder="请选择频道" :value="value" @input="onInput">
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="channel in channels"
        :key="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'channelSelect', // 组件名称(方便在调试工具中查找、调试)
  components: {},
  props: {
    // 父组件('/publish/index')传递了channel_id,相当于select的value值,需要接收
    value: {
      type: [String, Number], // 父组件传递的chennel_id为字符串(这里:字符串、id都可以)
      require: true // 必填项(必须传递v-model的value)
    }
  },
  data () {
    return {
      channels: [] // 存储频道列表
    }
  },
  methods: {
    loadchannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(result => {
          this.channels = result.data.data.channels
        })
        .catch(err => {
          console.log(err, '获取频道数据失败')
        })
    },
    onInput (data) {
      //   console.log(data)
      // 发布一个自定义事件,由于父组件使用的v-model简写,所以必须为input
      // data: 选中的option的value
      this.$emit('input', data)
    }
  },
  created () {
    this.loadchannels()
  }
}
</script>

<style lang="less" scoped>
</style>
