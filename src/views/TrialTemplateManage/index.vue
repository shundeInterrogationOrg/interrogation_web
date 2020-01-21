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
        prop="traidName"
        label="审讯模板名称"
      />
      <el-table-column
        prop="name"
        label="案件类别"
      />
      <el-table-column
        label="更新时间"
        width="160"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
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
          <el-input v-model="form.traidName" autocomplete="off" />
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
import { getList } from '@/api/table'

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
      tableData: [{
        traidName: '酒驾、无证驾驶及伪造车牌号码审讯模板',
        date: '2016-05-03',
        name: '二次酒驾、无证驾驶、伪造车牌号码',
        address: '二次酒驾、无证驾驶、伪造车牌号码'
      }, {
        date: '2016-05-02',
        name: '醉酒驾驶',
        traidName: '醉酒驾驶',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '盗窃(行政)',
        traidName: '盗窃(行政)',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '盗窃(刑事)',
        traidName: '盗窃(刑事)',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '赌博(行政)',
        traidName: '赌博(行政)',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
    this.fetchData()
  },
  mounted() {
    this.getDay()
  },
  methods: {
    handleClick(row) {
      this.type = 'updata'
      this.dialogFormVisible = true
      this.form.traidName = row.traidName
      this.traidType = row.name.split('、')
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onSearch() {},
    /** 新增 */
    doAdd() {
      this.dialogFormVisible = true
      Object.assign(this.form, {})
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
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.multipleSelection.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
          this.multipleSelection = []
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        console.log(this.multipleSelection)
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
    },
    /** 提交表单 */
    doSure() {
      if (this.type === 'add') {
        const add = {}
        add.traidName = this.form.traidName
        add.name = this.traidType.join('、')
        add.date = this.getDay()
        this.tableData.push(add)
      }
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
