//审讯模版
<template>
  <div class="app-container">
    <el-row class="table-toolbar">
      <el-col :span="10">
        <el-button type="primary" size="small" @click="doAdd('add')">添加模版</el-button>
        <el-button type="primary" size="small" @click="copyModule">复制模版</el-button>
        <el-button type="primary" size="small" @click="deleteAll">删除</el-button>
      </el-col>
      <el-col :span="5" class="searchStyle">
        <span>案件类型:</span>
        <el-input
          v-model="searchValue"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="案件类型名称"
          clearable
        />
      </el-col>
      <el-col :span="5" class="searchStyle">
        <span>审讯模板:</span>
        <el-input
          v-model="trialName"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="审讯模板名称"
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
      @row-click="toQuestion"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="template_name"
        label="审讯模板名称"
      />
      <el-table-column
        prop="case_name"
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
        width="120"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.release_status==='1'" type="text" size="small" @click.stop="handleStatus(scope.row)">取消发布</el-button>
          <el-button v-else type="text" size="small" @click.stop="handleStatus(scope.row)">发布</el-button>
          <el-button type="text" size="small" style="float:right" @click.stop="handleClick(scope.row)">编辑</el-button>
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
        <el-form-item label="审讯模版名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="案件类别" :label-width="formLabelWidth">
          <el-select v-model="traidType" placeholder="请选择" autocomplete="off">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTrialTemplate, addTrialTemplate, deleteTrialTemplate, updataTrialTemplate } from '@/api/trialTemplate'
import { getCases } from '@/api/caseType'
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
      type: 'add', // 判断提示框是新增还是修改
      listLoading: true,
      searchValue: '', // 搜索时案件类型
      trialName: '', // 审讯模板名称
      traidType: '', // 案件类别选择
      tableData: [], // 表格数据
      options: [], // 案件类别数据
      multipleSelection: [], // 表格选中
      currentPage: 1, // 当前页
      total: 30,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '100px',
      status: '1'// 选中数据的状态
    }
  },
  created() {
    this.getCaseType()
    this.getData()
  },
  mounted() {
  },
  methods: {
    /** 获取案件类别 */
    async getCaseType() {
      const params = {
        'rows': 100,
        'page': 1,
        'name': '',
        'status': '1'
      }
      try {
        const { data } = await getCases(params)
        this.options = data.rows
      } catch (error) {
        this.options = []
      }
    },
    /** 编辑表格 */
    handleClick(row) {
      this.type = 'updata'
      this.dialogFormVisible = true
      this.form.name = row.template_name
      this.form.id = row.id
      this.form.release_status = row.release_status
      this.traidType = row.case_id
      this.form.status = row.status
    },
    /** 发布和取消发布 */
    async handleStatus(row) {
      const params = {
        'name': row.template_name,
        'case_classification_id': row.case_id,
        'id': row.id,
        'release_status': row.release_status,
        'status': row.status
      }
      if (row.release_status === '1') {
        params.release_status = '0'
      } else {
        params.release_status = '1'
      }
      try {
        const { data } = await updataTrialTemplate(params)
        if (data.status === 'sucess') {
          this.$message.success('修改发布状态成功')
          this.getData()
        } else {
          this.$message.error('修改发布状态失败')
        }
      } catch (error) {
        this.$message.error('修改发布状态失败')
      }
    },
    /** 获取表格信息 */
    async getData() {
      const params = {
        'template_name': this.trialName,
        'caseName': this.searchValue,
        'page': this.currentPage,
        'status': this.status,
        'rows': 10 }
      this.listLoading = true
      try {
        const { data } = await getTrialTemplate(params)
        this.tableData = data.rows
        this.total = data.total
        this.listLoading = false
      } catch (error) {
        this.tableData = []
        this.total = 0
        this.listLoading = false
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onSearch() {
      this.currentPage = 1
      this.getData()
    },
    /** 新增 */
    doAdd() {
      this.dialogFormVisible = true
      this.form.name = ''
      this.form.id = ''
      this.form.status = ''
      this.form.release_status = ''
      this.traidType = ''
      this.type = 'add'
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
          params.status = '0'
          try {
            const { data } = await deleteTrialTemplate(params)
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
    /** 复制模版 */
    async copyModule() {
      if (this.multipleSelection.length === 0) {
        this.$message('请选择要复制的模板')
      } else {
        if (this.multipleSelection.length > 1) {
          this.$message.info('请选着单一模版进行复制')
        } else {
          // this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0])
          const obj = {}
          obj.name = this.multipleSelection[0].template_name + ' 复制'
          obj.case_classification_id = this.multipleSelection[0].case_id
          obj.status = this.multipleSelection[0].status

          try {
            const { data } = await addTrialTemplate(obj)
            if (data.status === 'sucess') {
              this.$message.success('复制审讯模版成功')
              this.currentPage = 1
              this.getData()
            } else {
              this.$message.error('复制审讯模版失败')
            }
          } catch (error) {
            this.$message.error('复制审讯模版失败')
          }
        }
      }
    },
    /**
     * @dec 当前页发生改变时触发 1.更换当前页值 2.发射获取数据的事件
     * @param val 页码
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    /** 提交表单
     * {"name":"伪造牌照审讯模板_30","case_classification_id":"97b47072-712a-4454-b129-a156579474c4"}
     */
    async doSure() {
      if (this.form.name === '') {
        this.$message.error('模版名称不能为空')
      } else if (this.traidType === '') {
        this.$message.error('案件类别不能为空')
      } else {
        if (this.type === 'add') {
          const params = {
            'name': this.form.name,
            'case_classification_id': this.traidType,
            'status': '0'
          }
          try {
            const { data } = await addTrialTemplate(params)
            if (data.status === 'sucess') {
              this.$message.success('新增审讯模版成功')
              this.currentPage = 1
              this.getData()
            } else {
              this.$message.error('新增审讯模版失败')
            }
          } catch (error) {
            this.$message.error('新增审讯模版失败')
          }
        } else {
          const params = {
            'name': this.form.name,
            'case_classification_id': this.traidType,
            'id': this.form.id,
            'release_status': this.form.release_status,
            'status': this.form.status
          }
          try {
            const { data } = await updataTrialTemplate(params)
            if (data.status === 'sucess') {
              this.$message.success('修改审讯模版成功')
              this.getData()
            } else {
              this.$message.error('修改审讯模版失败')
            }
          } catch (error) {
            this.$message.error('修改审讯模版失败')
          }
        }
        this.dialogFormVisible = false
      }
    },
    toQuestion(row) {
      this.$router.push({ name: 'Question', params: row })
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
   .el-pagination {
    height: 44px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  /deep/ .el-dialog{
    width: 40%
  }
  /deep/ .el-dialog input,.el-dialog .el-select{
    width: 80%
  }
   /deep/ .el-dialog .el-select input{
    width: 100%
  }
  // /deep/ .el-table th, .el-table tr{
  //   background: lightgray
  // }
</style>
