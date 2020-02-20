<template>
  <div class="template-manage ">
    <el-row class="table-toolbar">
      <el-col :span="7">
        <div class="temp-title">
          <div class="toolBtn">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addTemp">添加别类</el-button>
          </div>
          <div class="toolBtn">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-picture-outline"
              style="margin-left:10px"
              @click="copyTemp"
            >复制</el-button>
          </div>
          <div class="toolBtn">
            <el-button
            type="primary"
            class="el-button--danger"
            size="small"
            @click="handleDelete"
            icon="el-icon-delete">删除</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="15" class="searchStyle" style="margin-top:20px;text-align: right;">
        <span style="font-size:14px;">模型类别&nbsp;</span>
        <el-input
          v-model="searchName"
          size="small"
          style="width:240px;margin-right:10px"
          prefix-icon="el-icon-search"
          placeholder="模型类别名称"
          clearable
        />
        <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
      </el-col>

    </el-row>


    <div class="temp-list">
      <el-table
        class="template-list"
        @selection-change="handleSelectionChange"
        :data="tempList"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="模型类别">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.name }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.name" placeholder="请填写模型类别"></el-input>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="是否使用中">
          <template slot-scope="scope">
            <div v-if="!scope.row.adding">
              <span>{{ scope.row.use_status == 0 ? '否' : '是' }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operate-groups">
              <el-button
                type="primary"
                size="mini"
                v-if="!scope.row.editing"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                type="primary"
                size="mini"
                v-if="scope.row.editing"
                icon="el-icon-success"
                @click="handleSave(scope.$index, scope.row)">保存
              </el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                v-if="!scope.row.editing"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button> -->
              <el-button
                size="mini"
                type="warning"
                v-if="scope.row.editing"
                icon="el-icon-warning"
                @click="handleCancel(scope.$index, scope.row)">取消
              </el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>

<script>
import { modelCategory, modelCategoryUpdate, modelCategoryAdd, modelCategoryDel } from '@/api/modelCategory'

export default {
  data() {
    return {
      flag: false,
      searchName: '',
      currentPage: 1, // 当前页
      total: null,
      multipleSelection: [],
      tempList: [],
      tempName: "",
      staOpts: [{
         value: '0',
         label: '否'
       }, {
         value: '1',
         label: '是'
       }],
       use_status: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {

    // 数据初使化
    getData() {
      const params = {
        'rows': 10,
        'page': this.currentPage,
        'name': this.searchName
      }
      modelCategory(params).then(({ data }) => {
        this.tempList = data.rows
        this.total = data.total
      })
    },

    // 编辑
    handleEdit($index, row) {
      if (this.flag == false) {
        this.flag = true
        this.$set(this.tempList[$index], 'editing', true)
        this.$set(this, 'tempName', row.name)
      }else {
        return
      }
    },

    // 保存
    handleSave($index, row) {
      if (!row.adding) {
        const params = {
          'id': row.id,
          'name': row.name
        }
        modelCategoryUpdate(params).then(({ data }) => {
          if (data.status == "repeat") {
            this.$message({type: 'error', message: '模型类别已存在!'})
          }else {
            this.$message({type: 'success', message: '修改成功!'})
            this.flag = false
            this.getData()
          }
        })
        .catch(error => {
          this.$message({type: 'error', message: '修改模型类别，请填写完全！'})
        })
      }else {
        modelCategoryAdd({"name": row.name}).then(({ data }) => {
          if (data.status == "repeat") {
            this.$message({type: 'error', message: '模型类别已存在!'})
          }else {
            this.$message({type: 'success', message: '添加成功!'})
            this.handleCancel($index, row)
          }
        })
        .catch(error => {
          this.$message({type: 'error', message: '新建模型类别，请填写完全！'})
        })
      }
    },

    // 取消
    handleCancel($index, row) {
      if (row.adding) {
        this.$set(this.tempList[$index], 'editing', false)
        this.$set(this.tempList[$index], 'adding', false)
        this.getData()
      }else {
        this.$set(this.tempList[$index], 'editing', false)
        this.$set(this.tempList[$index], 'name', this.tempName)
      }
      this.flag = false
    },

    // 新增
    addTemp() {
      this.flag = true
      this.tempList = this.tempList || []
      this.tempList.push({
        name: '',
        editing: true,
        adding: true
      })
    },

    // 复制
    copyTemp() {
      if (this.multipleSelection.length > 1) {
        this.$message.info('请选择单一模型类别进行复制')
      } else {
        modelCategoryAdd({"name": this.multipleSelection[0].name + " 复制"}).then(({ data }) => {
          this.$message({type: 'success', message: '复制成功!'})
          this.getData()
        }).catch(error => {})

      }
    },

    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 删除
    // handleDelete($index, row) {
    //   this.$confirm('此操作将永久删除, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     modelCategoryDel({"idList": [row.id]}).then(({ data }) => {
    //       this.$message({type: 'success', message: '删除成功!'})
    //       this.getData()
    //     })
    //     .catch(error => {
    //       this.$message({type: 'error', message: '服务器响应异常!'})
    //     })
    //   }).catch(err => {})
    // },

    // 删除
    handleDelete(){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const idList = []
        this.multipleSelection.forEach(row => {
          idList.push(row.id)
        })
        modelCategoryDel({"idList": idList}).then(({ data }) => {
          if (data.status == "error") {
            this.$message({type: 'error', message: '模型类别在使用中，删除失败!'})
          }else {
            this.$message({type: 'success', message: '删除成功!'})
            this.getData()
          }
        })
        .catch(error => {
          this.$message({type: 'error', message: '服务器响应异常!'})
        })
      }).catch(err => {})
    },

    onSearch() {
      this.currentPage = 1
      this.getData()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    }

  }
}
</script>

<style scoped lang="scss">
  .template-manage {
    width: 80%;
    margin: 0 auto;
    .temp-title {
      justify-content: space-between;
      height: 30px;
      margin-top: 20px;
      .toolBtn{display: inline-block}
    }
    .el-table {
      background-color: #f7f7f7;
      margin-top: 20px;
      th>.cell {
        text-align: center !important;
      }
    }
    .operate-groups {
      display: flex;
      justify-content: flex-start;
      .upAndDown {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .el-button--mini {
          padding: 0;
          width: 30px;
          margin-left: 0;
        }
        .down {
          margin-top: 2px;
        }
      }
    }
  }
  .template-manage >>> .el-table__header-wrapper .el-checkbox{display: none}
  .el-pagination {height: 44px;display: flex;justify-content: flex-end;align-items: center;}
</style>
