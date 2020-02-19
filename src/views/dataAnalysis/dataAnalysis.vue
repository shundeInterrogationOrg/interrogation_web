<template>
  <div class="app-container">
    <el-row class="table-toolbar">
      <el-col :span="13">&nbsp;</el-col>
      <el-col :span="7" class="searchStyle">
        <span style="font-size:14px;">审讯模板名称&nbsp;</span>
        <el-input
          v-model="searchValue"
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
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        label="审讯模板名称"
      />
      <el-table-column
        prop="questionNum"
        width="150"
        label="问题数量"
      />
      <el-table-column
        prop="modelNum"
        width="150"
        label="模型数量"
      />
      <el-table-column
        prop="useNum"
        width="150"
        label="使用次数"
      />
      <el-table-column
        prop="updateTime"
        width="160"
        label="更新时间"
      />
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getAnalysisData } from '@/api/dataAnalysis'

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
      getAnalysisData(params).then(({ data }) => {
        this.tableData = data.rows
        this.total = data.total
        this.listLoading = false
      })
    },

    /** 搜索 */
    onSearch() {
      this.currentPage = 1
      this.getData()
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
    .el-input--mini .el-input__inner,.el-button--mini{height:32px;line-height: 32px}
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
</style>
