<template>
  <div class="onlineWrapper">
    <div class="searchTool">
      <span>审讯模板</span>
      <div class="moduleNameIpt">
        <el-input v-model="moduleName" size="mini"></el-input>
      </div>
      <div class="moduleBtn">
        <el-button size="mini" type="primary" @click="moduleSearch">查询预览</el-button>
      </div>
    </div>
    <div v-if="viewFlag">
      <div class="moduleName">{{moduleName}}</div>
      <div class="moduleView">
        <div class="moduleWrapper">
          <div class="moduleViewBtn1">开始</div>
          <div class="questionWrapper">
            <ul>
              <li v-for="(item, index) in data" class="item">
                <div class="con">
                  <h6>问题{{item.sequence}}</h6>
                  <p>{{item.content}}</p>
                  <div class="moduleType"><b>{{item.modelName}}</b></div>
                  <div class="line" v-if="item.modelName.indexOf('是非模型') != -1"><u>是</u><i>否</i></div>
                </div>
              </li>
            </ul>
          </div>
          <div class="moduleViewBtn2">结束</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function kkk(sum) {
  return sum+"win"
}
import { getOnlineData, numStr } from '@/api/onlineChat'
import axios from '@/utils/axios'

export default {
  data() {
    return {
      data: [],
      moduleName: '',
      viewFlag: false
    }
  },
  created() {
    this.moduleSearch()
  },
  methods: {
    async moduleSearch() {
      const params = {
        'name': this.moduleName
        // 'name': "qqq1 复制"
      }
      try {
        let data = await getOnlineData(params)
        let newdata = []
        for (var i = 0; i < data.data.rows.length; i++) {
          newdata.push({
            sequence : numStr(i+1),
            content : data.data.rows[i].content,
            modelName : data.data.rows[i].modelName || "- - -"
          })
        }
        //---
        newdata[0].content = "我们是佛山市顺德区公安局交通警察大队机动中队的民警，现就有关案情依法对你进行询问，你应当如实回答，故意作伪证或者隐匿证据会负相应的法律责任，对案件无关问题，你有拒绝回答的权利，你有要求办案人员或者公安机关负责人回避的权利，有陈述和申辩的权利，以上权利义务告知，你听清楚了吗？"
        newdata[0].modelName = "是非模型"
        newdata[1].modelName = "是非模型"
        newdata[1].content = "陈述和申辩的权利，以上权利义务告知，你听清楚了吗？"
        this.data = newdata
        this.viewFlag = true
      } catch (error) {
        this.data = []
        this.viewFlag = false
      }
    }
  }


}
</script>

<style scoped lang="scss">
.onlineWrapper{width: 80%;margin: 0 auto;font-size: 12px;
  .searchTool {
    padding: 15px 0;text-align: right;
    .moduleNameIpt{width: 200px;display: inline-block;}
    .moduleBtn{display: inline-block;}
  }
  .moduleName{font-size: 16px;border-bottom: 1px solid #EBEEF5;padding-bottom: 5px;margin-bottom: 20px}
  .moduleView{
    .moduleWrapper{
      padding-bottom: 40px;
      .moduleViewBtn1{width: 150px;line-height: 40px;background: #3366ff;border-radius: 20px;margin: 0 auto;text-align: center;color: white;}
      .moduleViewBtn2{position: absolute;left:50%;margin-left: -75px;width: 150px;line-height: 40px;background: #3366ff;border-radius: 20px;text-align: center;color: white;}
      .questionWrapper{
        position: relative;
        ul{list-style:none;margin: 0 auto;max-width: 600px;color: #606266;padding: 0;}
        ul:before{content: '';display: block;position: absolute;left: 50%;width: 2px;height: 100%;background:#EBEEF5;z-index: -1}
        ul li:first-child .con{margin-top: 60px}
        ul li:last-child .con{margin-bottom: 60px}
        ul li:last-child .con .line{display: none}
        ul li:last-child .con .moduleType{display: none}
        .item{text-align: center;width: 600px;position: relative;}
        .item:after{content: '';display: block;position: absolute;bottom:2px;left:50%;margin-left: -7px;margin-bottom: -10px;width: 0;height: 0;border:8px solid transparent;border-color:#fff;border-top-color:#EBEEF5;}
        .item .con{position: relative;min-width: 250px;background: #fff;border: 5px solid #CDE6FF;margin: 0 0 100px;padding: 10px;border-radius: 30px;line-height: 18px;display: inline-block;text-align: left;}
        .item .con .line{position: absolute;bottom:-80px;left:50%;width: 40%;height: 80px;border:2px solid #EBEEF5;z-index: -1}
        .item .con .line:before{content: '';display: block;position: absolute;top:-2px;left:100%;margin-left: -7px;width: 0;height: 0;border:8px solid transparent;border-color:#fff;border-bottom-color:#EBEEF5;}
        .item .con .line u{position: absolute;top:45px;left:-12px;width: 20px;height: 20px;background: #fff;text-decoration: none;text-align: center;}
        .item .con .line i{position: absolute;bottom:-13px;left:60%;width: 20px;height: 20px;background: #fff;text-decoration: none;font-style: normal;text-align: center;}
        .item .con .moduleType{position: absolute;bottom:-35px;font-weight: 100;text-align: center;width: 100%;margin-left: -10px}
        .item .con .moduleType b{display:inline-block;color:#fff;background: #85C0FD;font-size: 12px;padding: 2px 7px;border-radius: 10px}
        .item .con h6{font-size: 16px;margin: 0;font-weight: bold;color: #000}
        .item .con p{margin:5px 0 0 0 }
      }
    }
  }
}
</style>
