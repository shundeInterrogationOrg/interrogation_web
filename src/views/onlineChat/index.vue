<template>
  <div class="onlineWrapper">
    <div class="searchTool">
      <span>审讯模板</span>
      <div class="moduleNameIpt">
        <el-input v-model="moduleName" size="mini"></el-input>
      </div>
      <div class="moduleBtn">
        <el-button size="mini" type="primary">查询预览</el-button>
      </div>
    </div>
    <div class="moduleView">
      <div class="moduleTitle">{{moduleName}}</div>
      <div class="moduleWrapper">
        <div class="moduleViewBtn">开始</div>
        <div class="questionWrapper">
          <div class="questionItem" v-for="(item,index) in data" :key="item.moduleType">
            <h4>问题{{index}}</h4>
            <p>{{item.question}}</p>
            <div class="moduleStep" v-if="item.moduleType?true:false">
              <div class="typeStep">{{item.moduleType}}</div>
              <div class="stepYes">是</div>
              <div class="stepNo">否</div>
            </div>
          </div>
        </div>
        <div class="moduleViewBtn">结束</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        question: '我们是佛山市顺德区公安局交通警察大队机动中队的民警，现就有' +
            '关案情依法对你进行询问，你应当如实回答，故意作伪证或者隐匿证据会负相应的法律' +
            '责任，对案件无关问题，你有拒绝回答的权利，你有要求办案人员或者公安机关负责' +
            '人回避的权利，有陈述和申辩的权利，以上权利义务告知，你听清楚了吗？',
        moduleType: '是非模型' },
      {
        question: '你今天因何事主动前来佛山市顺德区公安局交通警察大队机动中队',
        moduleType: '通用模型' },
      {
        question: '办案民警有否将《行政案件权利义务告知书》送达给你？你是否阅读过《行政案件权利义务告知书》上的内容？',
        moduleType: '' }],
      moduleName: ''
    }
  }
}
</script>

<style scoped lang="scss">
    .onlineWrapper{width: 80%;margin: 0 auto;font-size: 12px;
      .searchTool {
        padding: 15px 0;
        .moduleNameIpt{width: 200px;display: inline-block;}
        .moduleBtn{display: inline-block;}
      }
      .moduleView{
        .moduleWrapper{
          .moduleViewBtn{width: 150px;line-height: 40px;background: #3366ff;border-radius: 20px;margin: 0 auto;text-align: center;color: white;}
          .questionWrapper{
            position: relative;
            .questionItem{border: 1px solid black;padding: 15px;margin: 0 auto;border-radius: 15px;margin: 50px 0 100px 0;position: relative;
              h4{margin: 5px 0;}
              .moduleStep {position: absolute;left: 50%;width: 200px;height: 72px;bottom: -73px;border-bottom: 5px solid #3366ff;border-right: 5px solid #3366ff;
                .typeStep {width: 80px;text-align: center;background: #d6d2d2;line-height: 30px;position: absolute;z-index: 2;left: -38px;top: 20px;}
                .stepYes {position: absolute;left: -9px;top: 76px;z-index: 2;padding: 3px;background: #3366ff;color: white;}
                .stepNo {position: absolute;left: 50px;top: 60px;z-index: 2;background: #3366ff;color: white;padding: 3px;}
              }
            }
            .questionItem:after{content: '';display: block;position: absolute;left: 50%;width: 5px;bottom: -100px;height: 100px;transform: translateX(-50%);background: #3366ff;}
          }
          .questionWrapper:before{content: '';display: block;position: absolute;left: 50%;width: 5px;top: -50px;height: 50px;transform: translateX(-50%);background: #3366ff;}
        }
      }
    }
</style>
