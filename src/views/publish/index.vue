<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>发表文章</span>
    </div>
    <el-form ref="form" :model="article" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="article.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="article.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- 单选框 -->
      <!-- <el-form-item label="封面">
        <el-radio-group v-model="article.cover">
          <el-radio label="单图"></el-radio>
          <el-radio label="三图"></el-radio>
          <el-radio label="无图"></el-radio>
          <el-radio label="自动"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- select -->
      <el-form-item label="频道">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'publishArticle',
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          // 封面
          type: 0, // -1:自动;0:无图;1:单图;3:三图
          images: [] // 图片,无图为空数组
        },
        channel_id: '' // 文章所属频道id
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
