<template>
  <div class="template-manage">
    <el-row class="table-toolbar">
      <el-col :span="7">
        <div class="temp-title">
          <div class="toolBtn">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addTemp"
            >添加模型</el-button>
          </div>
          <div class="toolBtn">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-picture-outline"
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
      <el-col :span="15" class="searchStyle" style="margin-top:20px">
        <span style="font-size:14px;">模型类别&nbsp;</span>
        <el-input
          v-model="searchCategoryName"
          size="small"
          style="width:160px;margin-right:20px"
          prefix-icon="el-icon-search"
          placeholder="模型类别名称"
          clearable
        />
        <span style="font-size:14px;">模型名称&nbsp;</span>
        <el-input
          v-model="searchName"
          size="small"
          style="width:160px;margin-right:10px"
          prefix-icon="el-icon-search"
          placeholder="模型名称"
          clearable
        />
        <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
      </el-col>
    </el-row>

    <div class="temp-list">
      <el-table
        ref="module"
        @selection-change="handleSelectionChange"
        class="template-list"
        :data="tempList"
        style="width: 100%"
      >

      <el-table-column type="selection" width="55" />
      <el-table-column label="模型名称">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.name }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.name" placeholder="请填写模型名称" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="调用模型/程序">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.interface_url }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.interface_url" placeholder="请填写调用模型/程序" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="模型类别">
          <template slot-scope="scope">
            <div v-if="!scope.row.adding && !scope.row.editing">
              <span>{{ scope.row.model_category_name }}</span>
            </div>
            <div v-if="scope.row.adding">
              <el-select v-model="tempCategory" placeholder="请选择" @change="categoryChange">
                <el-option
                  v-for="item in categoryOpts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id + ',' + item.name">
                </el-option>
              </el-select>
            </div>
            <div v-if="scope.row.editing && !scope.row.adding">
              <el-select v-model="scope.row.model_category_name" placeholder="请选择" @change="categoryChange">
                <el-option
                  v-for="item in categoryOpts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id + ',' + item.name">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="返回值">
          <template slot-scope="scope">
            <div v-if="!scope.row.editing">
              <span>{{ scope.row.retValue }}</span>
            </div>
            <div v-else>
              <el-input v-model="scope.row.retValue" placeholder="请填写返回值" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operate-groups">
              <el-button
                v-if="!scope.row.editing"
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑
              </el-button>
              <el-button
                v-if="scope.row.editing"
                type="primary"
                size="mini"
                icon="el-icon-success"
                @click="handleSave(scope.$index, scope.row)"
              >保存
              </el-button>
              <!-- <el-button
                v-if="!scope.row.editing"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button> -->
              <el-button
                v-if="scope.row.editing"
                size="mini"
                type="warning"
                icon="el-icon-warning"
                @click="handleCancel(scope.$index, scope.row)"
              >取消
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
import { model, modelUpdate, modelAdd, modelDel } from '@/api/model'
import { modelCategory } from '@/api/modelCategory'

export default {
  data() {
    return {
      flag: false,
      searchCategoryName: '',
      searchName: '',
      currentPage: 1, // 当前页
      total: null,
      multipleSelection: [],
      tempList: [],
      tempName: "",
      tempUrl: "",
      tempCategory: "",
      tempCategoryId: "",
      tempRetValue: "",
      categoryOpts: [],
    }
  },
  created() {
    this.getCategory()
    this.getData()
  },
  methods: {
    // 数据初使化
    getData() {
      const params = {
        'rows': 10,
        'page': this.currentPage,
        'model_name': this.searchName,
        'model_category_name': this.searchCategoryName,
        'status': '1'
      }
      model(params).then(({ data }) => {
        this.tempList = data.rows
        this.total = data.total
      })
    },

    //获取模型类别
    getCategory() {
      const params = {
        'rows': 1000,
        'page': 1,
        'name': ''
      }
      modelCategory(params).then(({ data }) => {
        this.categoryOpts = data.rows
      })
    },

    //类别选择
    categoryChange(val){
      this.tempCategory = val.split(',')[1]
      this.tempCategoryId = val.split(',')[0]
    },

    // 编辑
    handleEdit($index, row) {
      if (this.flag == false) {
        this.flag = true
        this.$set(this.tempList[$index], 'editing', true)
        this.$set(this, 'tempName', row.name)
        this.$set(this, 'tempUrl', row.interface_url)
        this.$set(this, 'tempRetValue', row.retValue)
        this.$set(this, 'tempCategory', row.model_category_name)
        this.$set(this, 'tempCategoryId', row.model_category_id)
      }else {
        return
      }
    },

    // 保存
    handleSave($index, row) {
      if (!row.adding) {
        const params = {
          'id': row.id,
          'name': row.name,
          'retValue': row.retValue,
          'interface_url': row.interface_url,
          'model_category_id': this.tempCategoryId
        }
        modelUpdate(params).then(({ data }) => {
          if (data.status == "repeat") {
            this.$message({type: 'error', message: '模型名称已存在!'})
          }else {
            this.$message({type: 'success', message: '修改成功!'})
            this.flag = false
            this.getData()
          }
        })
        .catch(error => {
          this.$message({type: 'error', message: '修改模型名称，请填写完全！'})
        })
      }else {
        if (this.tempCategory == "", this.tempCategoryId == "") {
          this.$message({type: 'error', message: '请填写模型类别！'})
          return
        }
        modelAdd({"name": row.name, "interface_url":row.interface_url, "model_category_id": this.tempCategoryId, "model_category_name": this.tempCategory, "retValue": row.retValue}).then(({ data }) => {
          if (data.status == "repeat") {
            this.$message({type: 'error', message: '模型名称已存在!'})
          }else {
            this.$message({type: 'success', message: '添加成功!'})
            this.handleCancel($index, row)
          }
        })
        .catch(error => {
          this.$message({type: 'error', message: '新建模型名称，请填写完全！'})
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
        this.$set(this.tempList[$index], 'interface_url', this.tempUrl)
        this.$set(this.tempList[$index], 'retValue', this.tempRetValue)
      }
      this.flag = false
    },

    // 新增
    addTemp() {
      this.flag = true
      this.tempList = this.tempList || []
      this.tempList.push({
        name: '',
        interface_url: '',
        retValue: '',
        editing: true,
        adding: true
      })
    },

    // 复制模板数据
    copyTemp() {
      if (this.multipleSelection.length > 1) {
        this.$message.info('请选择单一模型进行复制')
      } else {
        modelAdd({"name": this.multipleSelection[0].name + " 复制", "interface_url": this.multipleSelection[0].interface_url, "retValue": this.multipleSelection[0].retValue, "model_category_id": this.multipleSelection[0].model_category_id }).then(({ data }) => {
          if (data.status == "repeat") {
            this.$message({type: 'error', message: '模型名称已存在!'})
          }else {
            this.$message({type: 'success', message: '复制成功!'})
            this.getData()
          }
        }).catch(error => {})

      }
    },

    // 删除模板数据
    deleteTemp() {
      console.log('delete')
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
    //     modelDel({"idList": [row.id]}).then(({ data }) => {
    //       this.$message({type: 'success', message: '删除成功!'})
    //       this.getData()
    //     })
    //     .catch(error => {
    //       this.$message({type: 'error', message: '服务器响应异常!'})
    //     })
    //   }).catch(err => {})
    // },

    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const idList = []
        this.multipleSelection.forEach(row => {
          idList.push(row.id)
        })
        modelDel({"idList": idList}).then(({ data }) => {
          if (data.status == "error") {
            this.$message({type: 'error', message: '模型在使用中，删除失败!'})
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
