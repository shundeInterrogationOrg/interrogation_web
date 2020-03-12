//问题模版页面
<template>
  <div class="app-container">
    <span class="title">{{ templateName }}</span>
    <!-- 按钮行 -->
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
    <!-- 表格展示数据 -->
    <el-table
      ref="multipleTable"
      border
      size="small"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;"
      row-key="id"
      lazy
      :expand-row-keys="expandRowId"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
    >
      <!-- 子问题表格 -->
      <el-table-column type="expand">
        <template v-show="zitableData">
          <el-table
            v-show="zitableData"
            size="small"
            :data="zitableData"
            header-row-class-name="headStyle"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            align="center"
            stripe
            border
          >
            <el-table-column label="问题序号" width="110">
              <template slot-scope="scope">{{ scope.row.sequence }}</template>
            </el-table-column>
            <el-table-column label="是否虚拟问题" align="center" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.isVirtual == 'true' || scope.row.isVirtual == '1' ">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="问题内容" />
            <el-table-column prop="replyNum" label="回复情况" align="center" width="100" />
            <el-table-column fixed="right" label="操作" align="center" width="140">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="doAdd('updateChild', scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" />
      <el-table-column label="问题序号" width="110">
        <template slot-scope="scope">{{ scope.row.sequence }}</template>
      </el-table-column>
      <el-table-column label="是否虚拟问题" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isVirtual == 'true' || scope.row.isVirtual == '1' ">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="问题内容" />
      <el-table-column prop="replyNum" label="回复情况" width="100" align="center" />
      <el-table-column fixed="right" label="排序" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-arrow-up iSize" @click="handleSortClick(scope.row,'up')" />
          <i class="el-icon-arrow-down iSize" @click="handleSortClick(scope.row,'down')" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doAdd('update', scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="doAdd('addChild', scope.row)">新增子问题</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <el-pagination
      v-if="total > 10"
      background
      layout="total,prev, pager, next,jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <!-- 弹出框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="问题序号" :label-width="formLabelWidth">
          <el-input v-model="form.sequence" autocomplete="off" style="width:82%;" size="mini" />
        </el-form-item>
        <el-form-item label="问题内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autosize type="textarea" style="width:80%;" size="mini" autocomplete="off" />
        </el-form-item>
        <el-form-item label="虚拟问题" :label-width="formLabelWidth">
          <el-switch v-model="isVirtual" active-text="是" inactive-text="否" @change="changeVirtual" />
        </el-form-item>
        <!-- 添加回复情况 -->
        <template v-for="(item, index) in replayArr">
          <el-form-item v-if="item.status === '1'" :key="index" :label-width="formLabelWidth">
            <el-form style="width:80%;position:relative;border-top:1px solid #999;" :model="item">
              <el-form-item :label="'回复情况' + (index + 1)">
                <el-radio-group v-model="item.parsingWay">
                  <el-radio :key="index + Math.random()" label="0">
                    调用模型
                    <el-select v-model="item.modelId" placeholder="请选择" class="qSelect" size="mini">
                      <el-option
                        v-for="answ in answewrModule1"
                        :key="answ.name"
                        :label="answ.name"
                        :value="answ.id"
                      />
                    </el-select>
                    <el-select v-model="item.retValue" placeholder="请选择" size="mini">
                      <el-option
                        v-for="anModule2 in answewrModule2"
                        :key="anModule2.name"
                        :label="anModule2.name"
                        :value="anModule2.value"
                      />
                    </el-select>
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="item.regularNegation">
                  <el-radio :key="index + Math.random()" label="0">
                    <span>正则表达式</span>
                    <el-input v-model="item.regularExpression" size="mini" autosize clearable type="textarea"/>
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="item.regularNegation">
                  <el-radio :key="index + Math.random()" label="1">正则取反</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="'流转方式' + (index + 1)">
                <el-radio-group v-model="item.jumpTo" @change="changeRoamWay(index)">
                  <el-radio :key="index + Math.random()" label="1">默认流程</el-radio>
                </el-radio-group>
                <el-radio-group v-model="item.jumpTo" @change="changeRoamWay(index)">
                  <el-radio :key="index + Math.random()" label="2">
                    跳转到问题
                    <el-input v-model="item.jumpToQuestion" type="text" clearable size="mini" />
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="item.jumpTo" @change="changeRoamWay(index)">
                  <el-radio :key="index + Math.random()" label="3">
                    重复问题,同样情况
                    <el-input
                      v-model="item.repetitions"
                      type="number"
                      placeholder="请输入次数"
                      size="mini"
                    />遍后,
                    <el-select v-model="item.afterRepeat" placeholder="请选择" size="mini">
                      <el-option
                        v-for="it in jumpTypes"
                        :key="it.name"
                        :label="it.name"
                        :value="it.value"
                      />
                    </el-select>
                  </el-radio>
                </el-radio-group>
                <el-radio-group v-model="item.jumpTo" @change="changeRoamWay(index)">
                  <el-radio :key="index + Math.random()" label="4">
                    跳转到人工干预，干预后跳转到问题
                    <el-input
                      v-model="item.afterIntervention"
                      placeholder="请输入内容"
                      clearable
                      size="mini"
                    />
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div class="el-icon-error delete" @click="deleteAnswer(index)" />
          </el-form-item>
        </template>
        <el-form-item label :label-width="formLabelWidth">
          <el-button type="primary" @click="addAnswer">添加回复情况</el-button>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="doSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import dayjs from 'dayjs'
import { questionSearch, questionAdd, questionUpdate, questionDelete, sequenceSort, queryPage, questionReply } from '@/api/questionConfig'

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
      trialTemplateId: null, // 审讯模版ID
      templateName: null, // 审讯模版名称
      title: null, // 标题
      parentTitle: null,
      type: null, // 判断提示框是新增还是修改
      list: null,
      listLoading: true,
      searchValue: '',
      trialName: '', // 审讯模板名称
      parentId: '', // 父问题ID
      traidType: [], // 案件类别选择
      tableData: [],
      expandRowId: [], // 表格展开行的ID数组
      zitableData: [], // 子问题数据
      options: [
        { value: '二次酒驾' },
        { value: '醉酒驾驶' },
        { value: '无证驾驶' },
        { value: '伪造车牌号码' },
        { value: '盗窃(行政)' },
        { value: '盗窃(刑事)' },
        { value: '赌博(行政)' }
      ],
      multipleSelection: [], // 表格选中数据
      multipleSelectionId: [], // 表格选中的ID数组
      childSelection: [], // 子问题选中
      currentPage: 1, // 当前页
      total: 0,
      dialogFormVisible: false, // 弹框关闭
      isVirtual: false, // 弹出框是否虚拟
      form: {
        sequence: '', // 问题序号
        content: '', // 问题内容
        isVirtual: false, // 是否是虚拟问题
        // 回复情况集合
        answer: [
          {
            type: [],
            content: {
              module1: '',
              module2: '',
              rules: ''
            }
          }
        ],
        way: {
          resource: '',
          jump: null,
          num: null,
          jumpType: '',
          jumpNum: null
        }// 流转方式
      },
      replayObj: {// 回复情况
        'id': '',
        'questionId': '',
        'parsingWay': '',
        'modelId': '',
        'regularExpression': '',
        'jumpTo': '',
        'repetitions': '',
        'afterRepeat': '',
        'afterIntervention': '',
        'retValue': '',
        'jumpToQuestion': '',
        'regularNegation': '',
        'status': '1',
        'addTime': dayjs().format('YYYY-MM-DD HH:mm:ss'),
        'sequence': '',
        'subSequence': ''
      },
      // 回复情况数据
      replayArr: [
        {
          'id': '',
          'questionId': '',
          'parsingWay': '',
          'modelId': '',
          'regularExpression': '',
          'jumpTo': '',
          'repetitions': '',
          'afterRepeat': '',
          'afterIntervention': '',
          'retValue': '',
          'jumpToQuestion': '',
          'regularNegation': '',
          'status': '1',
          'addTime': dayjs().format('YYYY-MM-DD HH:mm:ss'),
          'sequence': '',
          'subSequence': ''
        }
      ],
      jumpTypes: [
        { name: '跳到下一个问题', value: '0' },
        { name: '跳到人工干预', value: '1' }
      ],
      // 回复情况调用模型选择1
      answewrModule1: [],
      // 回复情况调用模型选择2
      answewrModule2: [
        { name: '否定回答', value: '0' },
        { name: '肯定回答', value: '1' }
      ],
      formLabelWidth: '100px',
      timer: null,
      lastTime: null,
      // 编辑时拿到的row数据
      updateRow: null
    }
  },
  mounted() {
    // 获取时间
    this.getDay()
    // console.log(this.$route)
    this.trialTemplateId = this.$route.params.id
    this.templateName = this.$route.params.template_name
    this.title = this.$route.params.traidName
    // 获取列表数据
    this.fetchBigData()
    // console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  },
  methods: {
    // 查询大问题表格数据
    fetchBigData() {
      this.listLoading = true
      this.tableData = []
      const params = {
        page: this.currentPage,
        rows: 10,
        trialTemplateId: this.trialTemplateId,
        content: '', // 问题内容
        flag: '0', // 大问题查询
        sequence: '' // 子问题序号
      }
      // console.log(params.trialTemplateId)
      questionSearch(params).then(res => {
        // console.log(res.data)
        this.listLoading = false
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    },
    // 获取大问题的子问题数据 并保持表格每次指展开一行数据
    handleExpandChange(row, expandedRows) {
      // console.log(row)
      this.parentTitle = row.sequence
      this.zitableData = []
      // 展开时获取数据
      if (expandedRows.length > 0) {
        this.expandRowId = []
        this.zitableData = []
        if (row) {
          // 插入当前要展示行的ID
          this.expandRowId.push(row.id)
          const params = {
            // page: this.currentPage,
            // rows: 10,
            trialTemplateId: this.trialTemplateId,
            parentId: row.id,
            content: '', // 问题内容
            flag: '1', // 子问题查询
            sequence: row.sequence // 大问题序号
          }
          questionSearch(params).then(res => {
            // console.log(res.data)
            this.zitableData = res.data.rows
          })
        }
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowExpansion(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 删除子问题
    handleDeleteClick(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { 'idList': [row.id] }
        questionDelete(params).then(res => {
          if (res.data.status === 'success') {
            this.$message({ type: 'success', message: '删除成功!' })
            // 重新获取表格数据
            this.fetchBigData()
          } else {
            this.$message({ type: 'error', message: '删除失败!' })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 表格数据排序
    handleSortClick(row, type) {
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
    // 表格数据升序排列
    sortUp(row) {
      const params = {
        id: row.id,
        sequence: row.sequence,
        status: row.status,
        trialTemplateId: row.trialTemplateId,
        orderFlag: '1'
      }
      sequenceSort(params).then(res => {
        if (res.data.status === 'success') {
          this.fetchBigData()
          this.$message({ type: 'success', message: '升序排列完成！' })
        } else if (res.data.status === 'none') {
          this.$message({ type: 'info', message: '已经在最高位置啦！' })
        } else {
          this.$message({ type: 'error', message: '升序排列失败！' })
        }
      })
    },
    // 表格数据降序排序
    sortDown(row) {
      const params = {
        id: row.id,
        sequence: row.sequence,
        status: row.status,
        trialTemplateId: row.trialTemplateId,
        orderFlag: '0'
      }
      sequenceSort(params).then(res => {
        if (res.data.status === 'success') {
          this.fetchBigData()
          this.$message({ type: 'success', message: '降序排列完成！' })
        } else if (res.data.status === 'none') {
          this.$message({ type: 'info', message: '已经在最后面位置啦！' })
        } else {
          this.$message({ type: 'error', message: '降序排列失败！' })
        }
      })
    },
    // 选中表格数据
    handleSelectionChange(row) {
      // 存储选中的行数据
      // console.log(row)
      this.multipleSelectionId = []
      this.multipleSelection = row
      row.forEach((v, id) => {
        this.multipleSelectionId.push(v.id)
      })
      // console.log(this.multipleSelectionId)
    },
    // 搜索内容
    onSearch() {
      const params = {
        page: 1,
        rows: 10,
        trialTemplateId: this.trialTemplateId,
        content: this.searchValue // 问题内容
      }
      questionSearch(params).then(res => {
        // console.log(res.data)
        this.listLoading = false
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    },
    // 一级模型查询
    modelSearch() {
      const params = {
        'rows': 10,
        'page': 1,
        'model_name': '',
        'model_category_name': ''
      }
      queryPage(params).then(res => {
        // console.log(res.data.rows)
        this.answewrModule1 = res.data.rows
      })
    },
    /** 打开新增/编辑问题弹框 */
    doAdd(type, row) {
      // console.log(row)
      this.updateRow = row
      // 清空表单
      this.form.sequence = ''
      this.form.content = ''
      this.isVirtual = false
      this.replayArr = [
        {
          'id': '',
          'questionId': '',
          'parsingWay': '',
          'modelId': '',
          'regularExpression': '',
          'jumpTo': '',
          'repetitions': '',
          'afterRepeat': '',
          'afterIntervention': '',
          'retValue': '',
          'jumpToQuestion': '',
          'regularNegation': '',
          'status': '1',
          'addTime': '',
          'sequence': '',
          'subSequence': ''
        }
      ]
      this.modelSearch()
      if (type === 'add') {
        this.title = '新增问题'
        this.type = 'add'
      } else if (type === 'update') { // 编辑父问题
        // console.log(row.isVirtual)
        this.title = `编辑${row.sequence}`
        this.type = 'update'
        this.form.sequence = row.sequence
        this.form.content = row.content
        if (row.isVirtual === 'true' || row.isVirtual === '1') {
          this.isVirtual = true
        } else {
          this.isVirtual = false
        }
        // console.log(this.isVirtual)
        // 回复情况集合
        this.replayArr = row.replyList
      } else if (type === 'updateChild') { // 编辑子问题
        // console.log('编辑子问题')
        // console.log(row)
        this.title = `编辑${this.parentTitle}的子问题${row.sequence}`
        this.type = 'updateChild'
        this.form.sequence = row.sequence
        this.form.content = row.content
        if (row.isVirtual === 'true' || row.isVirtual === '1') {
          this.isVirtual = true
        } else {
          this.isVirtual = false
        }
        // 回复情况集合
        this.replayArr = row.replyList
      } else if (type === 'addChild') { // 父问题新增子问题
        // console.log(row)
        this.title = `${row.sequence} 新增子问题`
        this.parentId = row.id
        this.type = 'addChild'
      }
      // 打开弹框
      this.dialogFormVisible = true
    },
    // 切换是否虚拟按钮值
    changeVirtual(val) {
      this.isVirtual = val
    },
    // 改变流转方式切换清空input框数据
    changeRoamWay(index) {
      this.replayArr[index].jumpToQuestion = ''
      this.replayArr[index].repetitions = ''
      this.replayArr[index].afterRepeat = ''
      this.replayArr[index].afterIntervention = ''
    },
    /** 删除 */
    deleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message('请选择要删除的信息')
      } else {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确认删除
          const params = {
            idList: this.multipleSelectionId
          }
          questionDelete(params).then(res => {
            if (res.data.status === 'success') {
              // 清空选中的数据
              this.multipleSelection = []
              this.$message({ type: 'success', message: '删除成功!' })
              this.multipleSelection.forEach(row => {
                // 用于多选表格，切换某一行的选中状态
                this.$refs.multipleTable.toggleRowSelection(row)
              })
              // 重新获取表格数据
              this.fetchBigData()
            } else {
              this.$message({ type: 'error', message: '删除失败!' })
            }
          })
        }).catch((action) => {
          if (action === 'cancel') {
            this.$message({ type: 'info', message: '已取消删除' })
          } else {
            this.$message({ type: 'error', message: '请求出现错误' })
          }
        })
      }
    },
    /** 复制模版 */
    copyModule() {
      if (this.multipleSelection.length === 0) {
        this.$message.info('请选择要复制的模板')
      } else if (this.multipleSelection.length === 1) {
        this.multipleSelection[0].sequence = this.multipleSelection[0].sequence + '复制'
        // console.log(this.multipleSelection[0])
        questionAdd(this.multipleSelection[0]).then(res => {
          this.dialogFormVisible = false
          if (res.data.status === 'success') {
            // 获取列表数据
            this.fetchBigData()
          } else if (res.data.status === 'repeat') {
            this.$message.info('数据重复提交！')
          } else {
            this.$message.error('数据提交有误！')
          }
        })
        // this.multipleSelection.forEach(ele => {
        //   this.$refs.multipleTable.toggleRowSelection(ele)
        //   const obj = {}
        //   Object.assign(obj, ele)
        //   obj.index = this.tableData.length + 1
        //   obj.date = this.getDay()
        //   this.tableData.push(obj)
        // })
      } else {
        this.$message.warning('每次只能选中一条数据进行复制！')
      }
    },
    // 切换分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchBigData()
    },
    /** 添加回复 */
    addAnswer() {
      this.replayArr.push(this.replayObj)
    },
    // 删除回复
    deleteAnswer(index) {
      // console.log(this.replayArr[index])
      const params = { 'idList': [this.replayArr[index].id] }
      questionReply(params).then(res => {
        if (res.data.status === 'success') {
          this.replayArr[index].status = '0'
          this.$message.success('该问题回复删除成功！')
        }
      })
    },
    /** 提交新增/编辑表单 */
    doSure() {
      // 问题新增
      if (this.type === 'add') {
        const params = {
          'sequence': this.form.sequence,
          'content': this.form.content,
          'isVirtual': this.form.isVirtual,
          'trialTemplateId': this.trialTemplateId,
          'replyList': this.replayArr
        }
        questionAdd(params).then(res => {
          this.dialogFormVisible = false
          if (res.data.status === 'success') {
            // 获取列表数据
            this.fetchBigData()
          } else if (res.data.status === 'repeat') {
            this.$message.info('数据重复提交！')
          } else {
            this.$message.error('数据提交有误！')
          }
        })
      } else if (this.type === 'update') { // 编辑父问题
        // console.log(this.updateRow)
        const params = {
          'id': this.updateRow.id,
          'sequence': this.form.sequence,
          'content': this.form.content,
          'isVirtual': this.isVirtual + '',
          'trialTemplateId': this.trialTemplateId,
          'parentId': this.updateRow.parentId,
          'status': this.updateRow.status,
          'replyNum': this.updateRow.replyNum,
          'replyList': this.replayArr
        }
        // console.log(params.isVirtual)
        questionUpdate(params).then(res => {
          this.dialogFormVisible = false
          if (res.data.status === 'success') {
            this.$message.success('编辑数据成功！')
            // 获取列表数据
            this.fetchBigData()
          } else if (res.data.status === 'repeat') {
            this.$message.info('数据重复提交！')
          } else {
            this.$message.error('数据提交有误！')
          }
        })
      } else if (this.type === 'addChild') { // 新增子问题
        const params = {
          'sequence': this.form.sequence,
          'content': this.form.content,
          'isVirtual': this.form.isVirtual,
          'trialTemplateId': this.trialTemplateId,
          'parentId': this.parentId,
          'replyList': this.replayArr
        }
        questionAdd(params).then(res => {
          this.dialogFormVisible = false
          if (res.data.status === 'success') {
            // 获取列表数据
            this.fetchBigData()
          } else if (res.data.status === 'repeat') {
            this.$message.info('数据重复提交！')
          } else {
            this.$message.error('数据提交有误！')
          }
        })
      } else if (this.type === 'updateChild') { // 编辑子问题
        // console.log(this.type)
        const params = {
          'id': this.updateRow.id,
          'sequence': this.form.sequence,
          'content': this.form.content,
          'isVirtual': this.isVirtual + '',
          'trialTemplateId': this.trialTemplateId,
          'parentId': this.updateRow.parentId,
          'status': this.updateRow.status,
          'replyNum': this.updateRow.replyNum,
          'replyList': this.replayArr
        }
        questionUpdate(params).then(res => {
          this.dialogFormVisible = false
          if (res.data.status === 'success') {
            this.$message.success('编辑数据成功！')
            // 获取列表数据
            this.fetchBigData()
          } else if (res.data.status === 'repeat') {
            this.$message.info('数据重复提交！')
          } else {
            this.$message.error('数据提交有误！')
          }
        })
      }
    },
    // 获取时间 格式 yyyy-mm-dd hh:mm:ss
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
.title {
  color: #97a8be;
  font-weight: bold;
}
.table-toolbar {
  padding: 0 10px 10px;
  margin-top: 10px;
  .el-col {
    margin-right: 10px;
  }
  .searchStyle {
    display: flex;
    // justify-items: baseline;
    justify-content: space-between;
    align-items: center;
    span {
      width: 60%;
    }
  }
}
.el-pagination {
  height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.headStyle {
  background: red !important;
}
/deep/ .el-dialog {
  width: 600px;
}
/deep/ .el-dialog input,
.el-dialog .el-select {
  width: 97%;
}
/deep/ .el-dialog .el-radio__label input,
/deep/ .el-dialog .el-radio__label .el-input {
  width: 130px;
}
.el-dialog .el-select {
  width: 40%;
}
/deep/ .el-checkbox {
  width: 100%;
}
/deep/ .el-checkbox__label {
  display: contents;
}
/deep/ .el-textarea {
  width: 87%;
}
/deep/ .el-dialog .el-select input {
  width: 100%;
}
.iSize {
  font-size: 24px;
}
/deep/ .el-table__expanded-cell {
  padding: 0 0 0 47px;
}
/deep/ .el-radio-group {
  width: 100%;
}
/deep/ .el-form-item__label {
  text-align: left;
}
.delete{
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 20%;
}
.delete:hover{
  cursor: pointer;
}
// /deep/ .el-input{
//   width: 0;
// }
/deep/ .qSelect {
  width: 60%;
}
// /deep/ .el-table th, .el-table tr{
//   background: lightgray
// }
</style>
