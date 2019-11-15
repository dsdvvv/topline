<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>全部图文</span>
    </div>
    <!-- 卡片内容 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="filterForm.status">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select placeholder="请选择活动区域" v-model="filterForm.channel_id">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="rangeDate"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdata: '',
        end_pubdata: ''
      },
      rangeDate: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
