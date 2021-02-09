<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 18px;">
      <!-- <el-input v-model="listQuery.title" size="small" placeholder="文章标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button> -->
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      size="mini"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + (listQuery.pageNum - 1) * listQuery.pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button class="btn-edit" type="primary" size="mini" @click="handleUpdate(scope)">
            编辑
          </el-button>
          <el-popover
            :ref="'popover_' + scope.row._id"
            trigger="click"
            placement="top"
            width="160"
            >
            <p>确认删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="handleClosePop(scope)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope)">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="danger">
              删除
            </el-button>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total > 0"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageSize"
      layout="prev, pager, next"
      @pagination="getList"
    >
    </el-pagination>

    <el-dialog :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="dataForm" :model="temp" size="medium" label-position="left" label-width="100px" style="padding: 0 80px 0 40px;">
        <el-form-item label="日期" prop="date">
          <el-date-picker type="date" placeholder="请选择日期" v-model="temp.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="temp.content" type="textarea" rows="3" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="temp.url" placeholder="请输入链接"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle, deleteArticle } from '@/api/article'
import waves from '@/directive/waves' // 查询按钮水波纹效果
import { parseTime } from '@/utils'

export default {
  name: 'ArticleList',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 12
      },
      temp: {
        _id: '',
        date: '',
        title: '',
        content: '',
        url: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      // rules: {
      //   title: [{ required: true, message: '标题必填', trigger: 'change' }]
      // },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.currentPage = this.listQuery.pageNum
        this.total = response.total
        this.listLoading = false
      })
    },
    //关闭弹窗
    handleClosePop(scope) {
      this.$refs['popover_' + scope.row._id].doClose()
    },
     //改变时
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    //条目改变时
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'date') {
        this.sortByDate(order)
      }
    },
    sortByDate(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+date'
      } else {
        this.listQuery.sort = '-date'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        date: '',
        title: '',
        content: '',
        url: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.date = parseTime(this.temp.date,'{y}-{m}-{d}')
          createArticle(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(scope) {
      this.temp = Object.assign({}, scope.row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.date = parseTime(tempData.date,'{y}-{m}-{d}')
          updateArticle(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(scope) {
      this.$refs['popover_' + scope.row._id].doClose()
      this.temp = Object.assign({}, scope.row)
      deleteArticle(this.temp).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  },
  watch: {
    total() {
      if (
        this.total == (this.listQuery.pageNum - 1) *  this.listQuery.pageSize &&
        this.total != 0
      ) {
        this.listQuery.pageNum -= 1
        this.getList(this) //获取列表数据
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  padding: 20px 0;
}

.btn-edit {
  margin-right: 8px;
}
</style>
