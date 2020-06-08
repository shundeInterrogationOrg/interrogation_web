// 在线测试
<template>
  <div class="onlineTest">
    <!-- 按钮行 -->
    <el-row :gutter="20" class="table-toolbar">
      <el-col style="text-align:right;" :span="18">
        审讯模版：<el-input v-model="templateName" style="width:30%;" placeholder="请输入内容" size="small" />
      </el-col>
      <el-col :span="6">
        <el-button v-if="askArr[0]" type="primary" size="small" @click="queryQuestion">开始测试</el-button>
        <el-button v-else type="primary" size="small">开始测试</el-button>
        <el-button type="primary" size="small" @click="toPreview">预览</el-button>
      </el-col>
    </el-row>
    <!-- 问答模块 -->
    <template v-if="active >= 0">
      <div v-for="(item, idx) in askArr" :key="idx + 1" class="ask-answer">
        <div class="ask bg">
          <div>问题{{ idx + 1 }}</div>
          <div class="question">{{ item.ask }}</div>
        </div>
        <div class="answer bg">
          <div>回答{{ idx + 1 }}</div>
          <div class="ipt-answer">
            <el-input
              v-model="item.answer"
              type="textarea"
              autosize
              :disabled="item.isshow"
              placeholder="请输入内容"
              @keyup.enter.native="getAnswer"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { queryFirstQuestion, queryAnswer } from '@/api/onlineChat'
export default {
  data() {
    return {
      active: 0,
      // 选中模版名称
      templateName: '',
      trialTemplateId: null,
      // 模版类型数组
      templateOptions: [],
      // 问题序号
      index: 1,
      // 问题数组
      askArr: [
        {
          ask: null,
          answer: null,
          isshow: false
        }
      ],
      askAnswer: '',
      // 第二次拿回来的回复数据
      questionRsp: null,
      questionSequence: null
    }
  },
  mounted() {
  },
  methods: {
    // 跳转到在线预览页面
    toPreview() {
      this.$router.push({ path: '/onlineChat/onlineChat' })
    },
    // 获取第一个问题内容
    queryQuestion() {
      if (this.templateName) {
        const params = { trialTemplateName: this.templateName }
        queryFirstQuestion(params).then(res => {
          this.trialTemplateId = res.data.rows.trialTemplateId
          this.askArr[0].ask = res.data.rows.content
          this.questionSequence = res.data.rows.sequence
          // 每次问题带回来的数据
          this.questionRsp = res.data.rows
        })
      } else {
        this.$message.warning('审讯模版不能为空！')
      }
    },
    // 回答第一个问题，拿第二个问题
    getAnswer() {
      this.askAnswer = '\n问：' + this.askArr[this.active].ask.trim() + '\n答：' + this.askArr[this.active].answer.trim()
      const param = {
        cookieUuid: '192.168.1.1',
        question: this.askAnswer,
        firstQuestionSequence: 'question01',
        questionRsp: this.questionRsp,
        policeDept: '公安机关',
        policePhone: '15665417412',
        suspectName: '李明',
        suspectUsedName: 'suspectUsedName',
        suspectGender: '男',
        suspectBirthday: '1967-10-13',
        suspectAge: '77',
        suspectIdCard: '340123198409290395',
        suspectNation: '汉族',
        suspectEducation: '初中',
        suspectMarriage: '离婚',
        suspectHouseholRegister: '广东省佛山市顺德区延年路11号',
        suspectResidence: '广东省深圳市福田区侨城东路34号',
        suspectWorkunit: '合肥市体育局',
        suspectContact: '15010608983',
        resumeInfo:
          '2015年毕业于南京大学建筑系,2016年就职于郑州市体育局,2018年就职于济南市卫生局。',
        familyInfo:
          '你的父亲叫李振,54岁,你的母亲叫王雅君,40岁;你的妻子叫李师师。',
        familyTelephone: '15665417488',
        TimeOfCrime: '2019-11-13 20:35:40',
        happeningPlace: '大良镇清晖路150号',
        vehicleNumber: '粤E6888',
        vehicleType: '小型载客汽车',
        illegalActivitiy: '酒驾',
        manualntervention: ''
      }
      queryAnswer(param).then(res => {
        // console.log(res.data)
        this.askArr[this.active].isshow = true
        this.questionRsp = res.data.questionRsp
        this.active++
        this.askArr.splice(this.active, 1, { ask: res.data.questionRsp.content, answer: '', isshow: false })
        // this.active++
        this.getRecordList()
      })
    }
    // getRecordList() {
    //   const params = {
    //     trialTemplateId: this.trialTemplateId,
    //     cookieUuid: '192.168.1.1'
    //   }
    //   getRecord(params).then(res => {
    //     console.log(res.data)
    //   })
    // }
  }
}
</script>
<style lang="scss">
.onlineTest {
  width: 100%;
  .table-toolbar {
    margin: 30px;
  }
  .ask-answer {
    width: 100%;
    min-height: 250px;
    box-sizing: border-box;
    padding: 0 30px;
    position: relative;
    .ask {
      min-width: 25%;
      max-width: 48%;
      position: absolute;
      top: 9;
      left: 30px;
      .question {
        margin-top: 10px;
        text-indent: 2em;
      }
    }
    .answer {
      width: 30%;
      // max-height: 300px;
      position: absolute;
      bottom: 0;
      right: 30px;
      .ipt-answer {
        margin-top: 10px;
      }
    }
    .bg {
      border: 3px solid #cde6ff;
      border-radius: 40px;
      box-sizing: border-box;
      padding: 20px 40px;
    }
  }
}
</style>
