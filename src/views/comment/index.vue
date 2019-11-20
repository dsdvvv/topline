<template>
  <!-- <div>评论组件</div> -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
            <!-- 开关组件绑定的数据是一个布尔值，它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push('/comment/' + scope.row.id )">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [] // 存储评论列表数据
      // status: '' // 存储评论状态
    }
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      })
        .then(result => {
          console.log(result.data)
          this.articles = result.data.data.results
        })
        .catch(err => {
          console.log(err, '获取评论列表数据失败')
        })
    },
    // 评论状态
    onStatus (article) {
      // console.log(article)
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        // Headers参数
        // headers: 'application/json',
        // Query参数
        params: {
          article_id: article.id.toString()
        },
        // Body参数
        data: {
          /* 开关组件对article.comment_status进行了双向绑定
          所以获取article.comment_sttatus也就是在获取开关组件的选中状态
          */
          allow_comment: article.comment_status
        }
      }).then(result => {
        // console.log(result)
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '开启' : '关闭'}成功`
        })
      }).catch(err => {
        this.$message.error(err, '操作失败')
      })
    }
  },
  created () {
    this.loadArticles()
    // 评论状态
    // this.onStatus()
  }
}
</script>

<style lang="less" scoped>
</style>
