<template>
  <div class="dataAnalysis_wrapper">
    <div class="dataAnalysis_tool">
      <el-button type="primary" size="mini" class="searchBtn">查询</el-button>
      <div class="tool_ipt">
        <el-input v-model="trialName" size="mini"></el-input>
      </div>
      <span class="iptName">审讯模块名称:</span>
    </div>
    <div class="dataAnalysis_table">
      <el-table
        :data="tableData"
        border="border"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="审讯模板名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="questionNum"
          label="问题数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modelNum"
          label="模型数量">
        </el-table-column>
        <el-table-column
          prop="useNum"
          label="使用次数">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
import { getAnalysisData } from '@/api/dataAnalysis'
export default {
  data() {
    return {
      tableData: [],
      trialName: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange() {},
    async moduleSearch() {
      const params = {
        'page': this.currentPage,
        'rows': this.pageSize,
        'name': this.trialName
      }
      try {
        const data = await getAnalysisData(params)
        this.tableData = data.rows
        this.total = data.total
      } catch (error) {
        this.tableData = []
        this.total = 0
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .dataAnalysis_wrapper{
    .dataAnalysis_tool{
      padding: 8px 15px;
      height: 45px;
      .iptName{float: right;font-size: 14px;line-height: 28px;margin-right: 10px}
      .tool_ipt{width: 200px;float: right;margin-right: 15px;}
      .searchBtn{float: right;margin-right: 15px}
    }
  }
</style>
