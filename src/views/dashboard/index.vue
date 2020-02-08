<template>
  <div class="app-container">
    <el-row class="table-toolbar">
      <el-col :span="13">
        <el-button type="primary" size="small" @click="doAdd">添加类别</el-button>
        <el-button type="primary" size="small" @click="deleteAll">删除</el-button>
      </el-col>
      <el-col :span="7" class="searchStyle">
        <span>案件类型名称:</span>
        <el-input
          v-model="searchValue"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="案件类型名称"
          clearable
        />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      border
      size="small"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      header-row-class-name="headStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        label="案件类别"
      />
      <el-table-column
        label="更新时间"
        width="160"
      >
        <template slot-scope="scope">{{ scope.row.update_time }}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="案件信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="案件类别" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCase">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCases, addCases, deleteCases, updataCases } from '@/api/caseType'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchValue: '',
      tableData: [],
      multipleSelection: [], // 表格选中
      currentPage: 1, // 当前页
      total: null,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '100px',
      type: 'add'// 判断是新增还是修改
    }
  },
  created() {
    this.getData()
  },
  methods: {
    /** 获取表格信息 */
    getData() {
      const params = {
        'rows': 10,
        'page': this.currentPage,
        'name': this.searchValue
      }
      this.listLoading = true
      getCases(params).then(({ data }) => {
        this.tableData = data.rows
        this.total = data.total
        this.listLoading = false
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /** 搜索 */
    onSearch() {
      this.currentPage = 1
      this.getData()
    },
    /** 新增 */
    doAdd() {
      this.dialogFormVisible = true
      this.form.name = ''
      this.form.id = ''
      this.type = 'add'
    },
    /** 编辑表格 */
    handleClick(row) {
      this.dialogFormVisible = true
      this.type = 'updata'
      this.form.name = row.name
      this.form.id = row.id
    },
    async handleCase() {
      if (this.type === 'add') {
        const params = {
          'name': this.form.name
        }
        try {
          const { data } = await addCases(params)
          if (data.status === 'sucess') {
            this.$message.success('新增案件成功')
            this.currentPage = 1
            this.getData()
          } else {
            this.$message.error('新增案件失败')
          }
        } catch (error) {
          this.$message.error('新增案件失败')
        }
      } else {
        const params = {
          'name': this.form.name,
          'id': this.form.id
        }
        try {
          const { data } = await updataCases(params)
          if (data.status === 'sucess') {
            this.$message.success('修改案件成功')
            this.getData()
          } else {
            this.$message.error('修改案件失败')
          }
        } catch (error) {
          this.$message.error('修改案件失败')
        }
      }
      this.dialogFormVisible = false
    },
    /** 删除 */
    deleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message('请选择要删除的信息')
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const idList = []
          this.multipleSelection.forEach(row => {
            idList.push(row.id)
          })
          const params = {
            idList
          }
          try {
            const { data } = await deleteCases(params)
            if (data.status === 'sucess') {
              this.$message.success('删除成功')
              this.currentPage = 1
              this.getData()
            } else {
              this.$message.error('删除失败')
            }
          } catch (error) {
            this.$message.error('删除失败')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          this.multipleSelection.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
          this.multipleSelection = []
        })
      }
    },
    /**
     * @dec 当前页发生改变时触发 1.更换当前页值 2.发射获取数据的事件
     * @param val 页码
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    }
  }
}
</script>
<style scoped lang="scss">
.table-toolbar {
    padding: 0 10px 10px;
    .el-col {
      margin-right: 10px;
    }
    .searchStyle{
      display: flex;
      // justify-items: baseline;
      justify-content: space-between;
      align-items: center;
      span{
        width: 60%
      }
    }
  }
  .headStyle th{
    color:red;
    background: #6666!important
  }
   .el-pagination {
    height: 44px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  // /deep/ .el-table th, .el-table tr{
  //   background: lightgray
  // }
</style>
