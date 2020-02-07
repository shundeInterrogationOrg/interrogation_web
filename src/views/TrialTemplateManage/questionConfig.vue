//问题模版
<template>
  <div class="app-container">
    <span class="title">{{ title }}</span>
    <el-row class="table-toolbar">

      <el-col :span="15">
        <el-button type="primary" size="small" @click="doAdd('add')">添加问题</el-button>
        <el-button type="primary" size="small" @click="copyModule">复制问题</el-button>
        <el-button type="primary" size="small" @click="deleteAll">删除</el-button>
      </el-col>
      <el-col :span="5" class="searchStyle">
        <span>问题内容:</span>
        <el-input
          v-model="searchValue"
          size="small"
          prefix-icon="el-icon-search"
          placeholder="问题内容"
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template v-show="props.row.child" slot-scope="props">
          <el-table
            v-show="props.row.child"
            size="small"
            :data="props.row.child"
            header-row-class-name="headStyle"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            align="center"
            stripe
            border="true"
          >
            <el-table-column
              label="问题序号"
              width="70"
            >
              <template slot-scope="scope">问题{{ scope.row.index }}</template>
            </el-table-column>
            <el-table-column
              label="是否虚拟问题"
              width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.ifVR">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="question"
              label="问题内容"
            />
            <el-table-column
              prop="answer"
              label="回复情况"
              width="100"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="140"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleChildClick(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="问题序号"
        width="70"
      >
        <template slot-scope="scope">问题{{ scope.row.index }}</template>
      </el-table-column>
      <el-table-column
        label="是否虚拟问题"
        width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.ifVR">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="question"
        label="问题内容"
      />
      <el-table-column
        prop="answer"
        label="回复情况"
        width="120"
      />
      <el-table-column
        fixed="right"
        label="排序"
        width="100"
      >
        <template slot-scope="scope">
          <i class="el-icon-arrow-up iSize" @click="handleSortClick(scope.row,'up')" />
          <i class="el-icon-arrow-down iSize" @click="handleSortClick(scope.row,'down')" />
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="140"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="addChild(scope.row)">新增子问题</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="问题内容" :label-width="formLabelWidth">
          <el-input v-model="form.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="虚拟问题" :label-width="formLabelWidth">
          <el-switch v-model="form.ifVR" />
        </el-form-item>
        <el-form-item v-for="item in answers" :key="item" :label="'回复情况'+item" :label-width="formLabelWidth">
          <el-form :model="form.answer[item-1]">
            <el-form-item label="">
              <el-checkbox-group v-model="form.answer[item-1].type">
                <el-checkbox label="调用模型" name="type">
                  调用模型
                  <el-select v-model="form.answer[item-1].content.module1" placeholder="请选择" autocomplete="off" class="qSelect">
                    <el-option
                      v-for="answ in answewrModule1"
                      :key="answ.value"
                      :label="answ.value"
                      :value="answ.value"
                    />
                  </el-select>
                  <el-select v-model="form.answer[item-1].content.module2" placeholder="请选择" autocomplete="off">
                    <el-option
                      v-for="anModule2 in answewrModule2"
                      :key="anModule2.value"
                      :label="anModule2.value"
                      :value="anModule2.value"
                    />
                  </el-select>
                </el-checkbox>
                <el-checkbox label="正则" name="type">
                  正则
                  <el-input v-model="form.answer[item-1].content.rules" type="textarea" />
                </el-checkbox>
                <el-checkbox label="取反" name="type">取反</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="流转方式" :label-width="formLabelWidth">
          <el-form :model="form.way">
            <el-form-item label="">
              <el-radio-group v-model="form.way.resource">
                <el-radio label="radio1">默认流程</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.way.resource">

                <el-radio label="radio2">跳转到问题<el-input v-model="form.way.jump" size="mini" /></el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.way.resource">
                <el-radio label="radio3">重复问题,同样情况<el-input v-model="form.way.num" size="mini" />遍后,
                  <el-select v-model="form.way.jumpType" placeholder="请选择" autocomplete="off" size="mini">
                    <el-option
                      v-for="item in jumpTypes"
                      :key="item.value"

                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select></el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.way.resource">
                <el-radio label="radio4">跳转到人工干预，干预后跳转到问题<el-input v-model="form.way.jumpNum" size="mini" /></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="primary" @click="addAnswer">添加回复情况</el-button>
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
      title: '', // 标题
      type: 'add', // 判断提示框是新增还是修改
      list: null,
      listLoading: true,
      searchValue: '',
      trialName: '', // 审讯模板名称
      traidType: [], // 案件类别选择
      tableIndex: null, // 表格选中的序号
      tableData: [{
        ifVR: true,
        question: '二次酒驾、无证驾驶、伪造车牌号码',
        answer: '共3种回复情况',
        index: 1,
        child: [
          {
            ifVR: true,
            question: '二次酒驾、无证驾驶、伪造车牌号码',
            answer: '共3种回复情况',
            index: 1
          }, {
            ifVR: true,
            question: '醉酒驾驶',
            answer: '共2种回复情况',
            index: 2
          }
        ]
      }, {
        ifVR: true,
        question: '醉酒驾驶',
        answer: '共2种回复情况',
        index: 2
      }, {
        ifVR: false,
        question: '盗窃(行政)',
        answer: '共3种回复情况',
        index: 3
      }, {
        ifVR: true,
        question: '盗窃(刑事)',
        answer: '共3种回复情况',
        index: 4
      }, {
        ifVR: false,
        question: '赌博(行政)',
        answer: '共3种回复情况',
        index: 5
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
      childSelection: [], // 子问题选中
      currentPage: 1, // 当前页
      total: 30,
      dialogFormVisible: false,
      form: {
        question: '', // 问题内容
        ifVR: null, // 是否是虚拟问题
        answer: [{
          type: [],
          content: {
            module1: '',
            module2: '',
            rules: ''
          }
        },
        {
          type: [],
          content: {
            module1: '',
            module2: '',
            rules: ''
          }
        }
        ], // 回复情况
        way: {
          resource: '',
          jump: null,
          num: null,
          jumpType: '',
          jumpNum: null
        }// 流转方式
      },
      jumpTypes: [
        {
          value: '跳到下一个问题'
        },
        { value: '跳到人工干预' }
      ],
      answewrModule1: [// 回复情况调用模型选择1
        { value: '通用是非判断' },
        {
          value: '嫌疑人姓名抽取'
        }
      ],
      answewrModule2: [// 回复情况调用模型选择2
        { value: '否定回答' },
        {
          value: '肯定回答'
        }
      ],
      answers: [1],
      formLabelWidth: '100px',
      timer: null,
      lastTime: null,
      addType: 'father'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.getDay()
    this.title = this.$route.params.traidName
    // console.log('adfe',)
  },
  methods: {
    /** 编辑父表格 */
    handleClick(row) {
      this.title = `编辑问题${row.index}`
      this.type = 'updata'
      this.addType = 'father'
      this.dialogFormVisible = true
      this.form.ifVR = row.ifVR
      this.form.question = row.question
      this.tableIndex = row.index - 1
    },
    /** 编辑子问题 */
    handleChildClick(row) {
      this.title = `编辑问题${this.tableIndex + 1}的子问题${row.index}`
      this.type = 'updata'
      this.addType = 'child'
      this.dialogFormVisible = true
      this.form.ifVR = row.ifVR
      this.form.question = row.question
    },
    // 删除子问题
    handleDeleteClick(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSortClick: function(row, type) {
      const now = +new Date()
      if (this.lastTime && this.lastTime - now < 200) { // 在200ms内点击多次，只有一次生效
        clearTimeout(this.timer)
      }
      if (type === 'up') {
        this.timer = setTimeout(() => {
          this.sortUp(row)
          this.lastTime = +new Date()
        }, 200)
      } else {
        this.timer = setTimeout(() => {
          this.sortDown(row)
          this.lastTime = +new Date()
        }, 200)
      }
    },
    // 排序升序
    // handleUpClick(row) {
    //   this.debounce(this.up(row))
    // },
    sortUp(row) {
      if (row.index > 1) {
        this.tableData.splice(row.index - 1, 1, ...this.tableData.splice(row.index - 2, 1, this.tableData[row.index - 1]))
        this.tableData.forEach((ele, index) => {
          ele.index = index + 1
        })
      }
    },
    // 排序降序
    sortDown(row) {
      if (row.index < this.tableData.length) {
        this.tableData.splice(row.index, 1, ...this.tableData.splice(row.index - 1, 1, this.tableData[row.index]))
        this.tableData.forEach((ele, index) => {
          ele.index = index + 1
        })
      }
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
      this.title = '新增问题'
      this.dialogFormVisible = true
      this.answers = [1]
      this.form.answer.splice(1)
      Object.assign(this.form, {})
      this.traidType = []
      this.type = 'add'
      this.addType = 'father'
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
          obj.index = this.tableData.length + 1
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
    /** 新增子问题 */
    addChild(row) {
      this.dialogFormVisible = true
      this.tableIndex = row.index - 1
      this.title = `问题${row.index} 新增子问题`
      this.addType = 'child'
    },
    /** 添加回复 */
    addAnswer() {
      const obj = { type: [],
        content: {
          module1: '',
          module2: '',
          rules: ''
        }}
      this.form.answer.push(obj)
      this.answers.push(this.answers.length + 1)
    },
    /** 提交表单 */
    doSure() {
      if (this.type === 'add') {
        const add = {}
        add.ifVR = this.form.ifVR
        add.question = this.form.question
        if (this.addType === 'child') {
          if (this.tableData[this.tableIndex].child) {
            this.tableData[this.tableIndex].child.push(add)
          } else {
            this.tableData[this.tableIndex].child = []
            this.tableData[this.tableIndex].child.push(add)
          }
          console.log(this.tableData[this.tableIndex])
        } else {
          this.tableData.push(add)
        }
      }
      this.answers = [1]
      this.form.answer.splice(1)
      this.dialogFormVisible = false
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
.title{
color: #97a8be;
font-weight: bold;
}
.table-toolbar {
    padding: 0 10px 10px;
    margin-top: 10px;
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
  .headStyle{
    background: red!important
  }
  /deep/ .el-dialog{
    width: 600px
  }
  /deep/ .el-dialog input,.el-dialog .el-select{
    width: 97%
  }
   /deep/ .el-dialog  .el-radio__label input,/deep/ .el-dialog  .el-radio__label .el-input{
     width: 130px
   }
  .el-dialog .el-select{
    width: 40%
  }
  /deep/ .el-checkbox{
    width: 100%
  }
  /deep/ .el-checkbox__label{
    display: contents
  }
  /deep/ .el-textarea{
    width: 87%
  }
   /deep/ .el-dialog .el-select input{
    width: 100%
  }
  .iSize{
    font-size: 24px;
  }
  /deep/ .el-table__expanded-cell{
    padding:0 0 0 47px
  }
  /deep/ .el-radio-group{
    width: 100%
  }
  // /deep/ .el-input{
  //   width: 0;
  // }
  // .qSelect{
  //   width:
  // }
  // /deep/ .el-table th, .el-table tr{
  //   background: lightgray
  // }
</style>
