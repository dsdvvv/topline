<template>
  <el-card>
    <div slot="header" class="clearfix">
      <!-- <span>发表文章</span> -->
      <span>{{ $route.params.articleId ? '编辑文章' : '发布文章' }}</span>
    </div>
    <el-form ref="form" :model="article" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="article.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor v-model="article.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </el-form-item>
      <!-- 单选框 -->
      <!-- <el-form-item label="封面">
        <el-radio-group v-model="article.cover">
          <el-radio label="单图"></el-radio>
          <el-radio label="三图"></el-radio>
          <el-radio label="无图"></el-radio>
          <el-radio label="自动"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <!-- select -->
      <el-form-item label="频道">
        <!-- 导入的频道下拉列表组件
        下拉列表的选中手绑定数据额影响
        下拉列表切换选中状态也会改变绑定的数据
        -->
        <ChannelSelect v-model="article.channel_id"></ChannelSelect>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(false)">发表</el-button>
        <el-button @click="onSubmit(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 加载富文本编辑器的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
// 导入频道列表数据组件
import ChannelSelect from '@/components/channel-select'
export default {
  name: 'publishArticle',
  components: {
    //   注册局部组件
    quillEditor,
    ChannelSelect // 注册频道列表组件
  },
  data () {
    return {
      // 发布文章
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          // 封面
          type: 0, // -1:自动;0:无图;1:单图;3:三图
          images: [] // 图片,无图为空数组
        },
        channel_id: 3 // 文章所属频道id
      },
      // channels: [], // 获取频道数据
      editorOption: {} // 富文本编辑器的配置选项对象
    }
  },
  methods: {
    // 点击发布功能
    onSubmit (Boole) {
      if (this.$route.params.articleId) {
        // 请求编辑文章
        this.updateArticle(Boole)
      } else {
        // 请求添加文章
        this.addArtic(Boole)
      }
    },
    // 添加文章
    addArtic (Boole) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // Headers参数
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // Query参数需要使用params传递
        params: {
          draft: Boole // true: 存入草稿; false: 发表
        },
        // Body参数(data传递)
        data: this.article
      })
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log('保存失败:' + error)
        })
    },
    // 编辑文章
    updateArticle (Boole) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          Boole
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    },
    // 编辑文章
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      })
        .then(result => {
          console.log(result)
          this.article = result.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // this.loadChannels()
    // 发表文章和编辑使用的都是这个组件
    // 只有编辑时才需要在初始化的时候, 根据id获取加载文章的内容
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
