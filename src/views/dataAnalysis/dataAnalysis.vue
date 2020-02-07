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
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      trialName: ''
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
