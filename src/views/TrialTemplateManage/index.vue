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
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small">发布</el-button>
          <el-button type="text" size="small" @click.stop="handleClick(scope.row)">编辑</el-button>
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
          <el-select v-model="traidType" multiple placeholder="请选择" autocomplete="off">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
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
      list: null,
      listLoading: true,
      searchValue: '',
      trialName: '', // 审讯模板名称
      traidType: [], // 案件类别选择
      tableData: [],
      options: [
        { value: '二次酒驾' },
        { value: '醉酒驾驶' },
        { value: '无证驾驶' },
        { value: '伪造车牌号码' },
        { value: '盗窃(行政)' },
        { value: '盗窃(刑事)' },
        { value: '赌博(行政)' }
      ],
      multipleSelection: [], // 表格选中
      currentPage: 1, // 当前页
      total: 30,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.getDay()
  },
  methods: {
    /** 编辑表格 */
    handleClick(row) {
      this.type = 'updata'
      this.dialogFormVisible = true
      this.form.name = row.template_name
      this.form.id = row.id
      this.traidType = row.case_name.split('、')
    },
    /** 获取表格信息 */
    async getData() {
      const params = {
        'template_name': this.trialName,
        'caseName': this.searchValue,
        'page': this.currentPage,
        'rows': 10 }
      console.log(params)
      this.listLoading = true
      try {
        const data = await getTrialTemplate(params)
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
      this.traidType = []
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
          try {
            const data = await deleteTrialTemplate(params)
            if (data.status === 'success') {
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
    copyModule() {
      if (this.multipleSelection.length === 0) {
        this.$message('请选择要复制的模板')
      } else {
        this.multipleSelection.forEach(ele => {
          this.$refs.multipleTable.toggleRowSelection(ele)
          const obj = {}
          Object.assign(obj, ele)
          obj.traidName = obj.traidName + ' 复制'
          obj.date = this.getDay()
          this.tableData.push(obj)
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
    },
    /** 提交表单
     * {"name":"伪造牌照审讯模板_30","case_classification_id":"97b47072-712a-4454-b129-a156579474c4"}
     */
    async doSure() {
      if (this.type === 'add') {
        const params = {
          'name': this.form.name,
          'case_classification_id': this.traidType
        }
        try {
          const data = await addTrialTemplate(params)
          if (data.status === 'success') {
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
          'id': this.form.id
        }
        try {
          const data = await updataTrialTemplate(params)
          if (data.status === 'success') {
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
    },
    toQuestion(row) {
      this.$router.push({ name: 'Question', params: row })
    },
    getDay() {
      const date = new Date()
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let hh = date.getHours()
      let mm = date.getMinutes()
      let ss = date.getSeconds()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      if (hh < 10) {
        hh = '0' + hh
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      if (ss < 10) {
        ss = '0' + ss
      }
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      // console.log(y, m, d, hh, mm, ss)
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
