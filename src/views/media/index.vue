<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <!-- <el-button  type="text">上传图片</el-button> -->
        <!--
          action 上传文件的请求地址
          on-preview 上传预览事件
          on-remove  删除事件
          这个上传组件能帮我们自动发送请求，我们只需要把接口相关参数配置给它就可以了
          上传组件内部会自己去发请求提交文件，它内部使用的请求不是我们项目中的 axios
          所以也就不会有基础路径、拦截器。。。。都没有
          请求方法：默认应该就是 POST
          注意：这里需要手动配请求头
        -->
        <el-upload
          class="upload-demo"
          style="float: right;"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button
        style="float: right; margin-right: 10px;"
        @click="onUpload"
        type="success"
        size="small"
        >自己请求上传图片</el-button>
        <input type="file" hidden ref="file" @change="onFileChange">
      </div>
      <div style="margin-bottom: 20px;">
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <!--
        el-row 行
          gutter 间隔距离
        el-col 列
          span 用来指定列数
      -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="4" v-for="item in images" :key="item.id" class="col-item">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.url" class="image" height="200" />
            <div style="padding: 14px;" class="action">
              <!-- class 还支持对象语法， -->
              <i
                style="cursor: pointer;"
                :class="{
                  'el-icon-star-on': item.is_collected,
                  'el-icon-star-off': !item.is_collected
                }"
                @click="onCollect(item)"
              ></i>

              <!-- class 本来就是绑定数据字符串 -->
              <!-- 删除 -->
              <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user-token')
export default {
  name: 'MediaIndex',
  components: {},
  props: {},
  data () {
    return {
      images: [],
      type: '全部',
      // 给上传组件使用的请求头
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      })
        .then(res => {
          this.images = res.data.data.results
        })
        .catch(err => {
          console.log(err)
        })
    },
    /*
        该函数是radio的change事件处理函数
        通过文档可以得知,事件函数中有个回调参数:选中的radio label的值
        我们可以声明一个形参用来接收使用
    */
    onFind (value) {
      // console.log(value) //点击谁就是谁
      this.loadImages(value !== '全部')
    },
    //  ---------------------------------------------------收藏/取消收藏
    onCollect (item) {
      // 请求收藏/取消收藏
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          // 更新视图展示
          item.is_collected = !item.is_collected
        })
        .catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
    },
    /**
     * 删除图片
     */
    onDelete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定执行
          this.$axios({
            method: 'DELETE',
            url: `/user/images/${item.id}`
          })
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              // 更新列表
              this.loadImages(this.type !== '全部')
            })
            .catch(err => {
              console.log(err)
              this.$message.error('删除失败')
            })
        })
        .catch(() => {
          // 取消执行
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // upload组件上传成功触发的事件
    onUploadSuccess () {
      // 刷新图片列表
      this.loadImages(this.type !== '全部')
    },
    onUpload () {
      // 手动触发DOM的点击事件
      this.$refs.file.click()
    },
    onFileChange () {
      // 获取用户选择的文件对象
      const fileObj = this.$refs.file.files[0]
      //   创建一个表单数据对象
      const formData = new FormData()
      //   手动向表单数据汇总添加成员
      formData.append('image', fileObj)
      // 请求上传
      this.$axios({
        method: 'POST',
        url: '/user/images',
        // 接口要求:Content-Type为multipart/form-data,所以需要使用FormData对象
        data: formData
      }).then(result => {
        // console.log(result)
        // 上传成功,更新数据列表
        this.$message.success('上传成功')
        this.loadImages(this.type !== '全部')
      }).catch((error) => {
        console.log(error)
        this.$message.error('上传失败')
      })
    }
  },
  created () {
    this.loadImages()
  }
}
</script>

<style lang="less" scoped>
.grid-content {
  background-color: pink;
}
.col-item {
  margin-bottom: 20px;
  .action {
    display: flex;
    justify-content: space-around;
    font-size: 24px;
  }
}
</style>
