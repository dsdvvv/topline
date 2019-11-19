<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 卡片内容 -->
      <el-form ref="form" :model="filterForm" label-width="80px">
        <el-form-item label="文章状态">
          <!-- 单选框组会将选中的radio的label同步给绑定的数据 -->
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- 下拉列表会把选中的option的value同步导数据中 -->
          <ChannelSelect  v-model="filterForm.channel_id"></ChannelSelect>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- 点击查询按钮重新发送请求获取筛选的数据,重新获取的数据从第一页开始 -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 展示所有文章(文章列表) -->
    <el-card style="margin-top: 20px" class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59806条符合条件的内容</span>
      </div>
      <!-- 表格组件,data表格的数组,要求是数组
      表格组件会使用data数据,在内部自己进行遍历
      -->
      <el-table
        :data="articles"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.cover.images[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status]"
            >{{ articlesStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
            type="primary"
            size="mini"
            @click="$router.push('/publish/' + scope.row.id)"
            >编辑</el-button>
            <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页
    默认每页十条
    background:背景色
    layout:用来控制布局
    total:用来指定一共有多少条数据
    prev(上一页), pager(页码), next(下一页)
    current-change事件:改变页码都会触发该事件
    disabled:禁用分页(当loading运行时,禁止用户点击分页)
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onPageChange"
      :disabled="loading"
    ></el-pagination>
  </div>
</template>

<script>
import ChannelSelect from '@/components/channel-select'
export default {
  name: 'articles', // 便于在调试工具中根据名字搜索组件
  components: {
    ChannelSelect
  },
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null
        // begin_pubdata: '',
        // end_pubdata: ''
      },
      rangeDate: [], // 日期范围
      articles: [], // 定义数组接收接口返回的数据
      articleStatus: '',
      articlesStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      totalCount: 0, // 分页功能动态数据
      loading: true, // table表格的loading状态
      page: 1 // 存储当前页码
    }
  },
  methods: {
    // 请求文章列表数据
    // 如果传递了page就是用传递的,如果没传递默认为1
    loadArticles (page = 1) {
      // 加载loading
      this.loading = true
      // 除了login不需要token,其他所有的接口都需要提供token才可以请求
      // 否则会出现401错误(后端要求吧token放到请求头中)
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // Query参数使用params传递
        params: {
          page, // 页码(简写方式,本来为: page:page)
          per_page: 10, // 每页大小(默认十条)
          /*
            status:(文章状态)
            0:草稿
            1:待审核
            2:审核通过
            3:审核失败
            4:已删除
            默认为全部
            */
          status: this.filterForm.status,
          channel_id: this.filterForm.channel_id, // 频道id
          begin_pubdata: this.rangeDate ? this.rangeDate[0] : null, // 起始时间
          end_pubdata: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      })
        .then(result => {
          //   console.log(result)
          //   更新文章列表数组
          this.articles = result.data.data.results
          //   更新总记录数
          this.totalCount = result.data.data.total_count
        })
        .catch(error => {
          console.log('获取数据失败' + error)
        })
        .finally(() => {
          // finally:无论成功或失败,都会执行
          this.loading = false
        })
    },
    // 分页功能
    onPageChange (page) {
      // console.log(page)
      //   记录当前页码(用于删除功能)
      this.page = page
      // 请求加载指定页面的文章列表
      this.loadArticles(page)
    },
    // 删除功能
    onDelete (articleId) {
      console.log(articleId)
      this.$axios({
        method: 'DELETE',
        // 接口文档中的:target为一个路径参数(动态),不要写:
        url: `/articles/${articleId}`
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      })
        .then(result => {
          // console.log(result)
          // 删除成功,重新加载当前页码文章列表
          this.loadArticles(this.page)
        })
        .catch(error => {
          console.log('该账号无删除权限:' + error)
        })
    }
  },
  created () {
    //   页面初始化加载第一页数据
    this.loadArticles(1)
  }
}
</script>

<style lang="less" scoped>
</style>
