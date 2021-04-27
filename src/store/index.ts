import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowFilters:{},
    chineseToEnglish:{
      '业绩通时数据面板':{name:'resultsGeneral',data:'resultsGeneralTable',type:1},
      '组员⼀日数据面板':{name:'oneDay',data:'oneDayTable',type:1},
      '组员跟踪梯度':{name:'trackGradient',data:'trackGradientTable',type:1},
      '方案发送面板':{name:'intentionDegree',data:'intentionDegreeTable',type:1},
      '渠道业绩查看面板':{name:'channelPerformance',data:'channelPerformanceTable',type:2},
      '群保费数据面板':{name:'grouPremium',data:'grouPremiumTable',type:2},
    },
    export_url:{
      '业绩通时数据面板':{
          url:'getTypev1',
          zh:['对象'],
          en:['name'],
          filename:'业绩通时数据面板',
          bigFields:{
              durations:'通话时长',
              total:'通话次数',
              '5min_num':'通话超过5min次数',
          }
      },
      '组员⼀日数据面板':{
          url:'getProfessorData',
          multiHeader:['类型',''],
          zh:['总纲','类别'],
          en:['title','type'],
          merges:{
              1:['A1:B1','C1:F1','G1:J1','K1:N1','O1:R1','S1:V1','W1:Z1','AA1:AD1'],
              2:['A1:B1','C1:F1','G1:J1','K1:N1','O1:R1','S1:V1','W1:Z1','AA1:AD1','AE1:AH1','AI1:AL1','AM1:AP1','AQ1:AT1','AU1:AX1','AY1:BB1','BC1:BF1','BG1:BJ1'],
              3:['A1:B1','C1:F1','G1:J1','K1:N1','O1:R1','S1:V1','W1:Z1','AA1:AD1','AE1:AH1','AI1:AL1','AM1:AP1','AQ1:AT1','AU1:AX1','AY1:BB1','BC1:BF1','BG1:BJ1','BK1:BN1','BO1:BR1','BS1:BV1','BW1:BZ1','CA1:CD1','CE1:CH1','CI1:CL1','CM1:CP1','CQ1:CT1','CU1:CX1','CY1:DB1','DC1:DF1','DG1:DJ1','DK1:DN1','DO1:DR1'],
          },
          filename:'组员⼀日数据面板',
          bigFields:{
              "service":['服务','服务量'],
              "code4":['方案','方案发送量'],
              "moneys":['投保','业绩'],
              "onum":['投保','订单量'],
              "durations":['电话','通话时长'],
              "total":['电话','通话次数'],
              "5min_num":['电话','通话超过5min次数'],
              "record":['记录','条数'],
              "midnum":['记录','人数'],
              "wechat_message":['微信','消息次数'],
              "wechat_msg_len":['微信','消息字数'],
              "wechat_chatnum":['微信','沟通人数'],
              "wechat_valid":['微信','有效人数'],
          },
      fields:[]
          },
          '组员跟踪梯度':{
              url:'getProRecordData',
              multiHeader:[['月份','当月数据','','','','','','跟踪上月数据','','','','','','跟踪上上月数据','','','','','']],
              zh:['','服务量','方案量','超过五分钟通话次数','有效沟通次数','业绩','投保人数','服务量','方案量','超过五分钟通话次数','有效沟通次数','业绩','投保人数','服务量','方案量','超过五分钟通话次数','有效沟通次数','业绩','投保人数'],
              en:['dates','nowservice','nowcode4','now5min_num','nowwechat_valid','nowmoneys','nowonum','lastservice','lastcode4','last5min_num','lastwechat_valid','lastmoneys','lastonum','last2service','last2code4','last25min_num','last2wechat_valid','last2moneys','last2onum'],
              merges:['A1:A2','B1:G1','H1:N1','O1:T1'],
              filename:'组员跟踪梯度',
              bigFields:['last','last2','now'],
      fields:['5min_num','moneys','onum','service','wechat_valid']
          },
          '渠道业绩查看面板':{
              url:'getChannelData',
              zh:['客户昵称', '客户名字', '购买时间', '出单金额', '出单数量', '最近出单时间', '专家名称','产品名称'],
              en:['nickname', 'name', 'buytime', 'moneys', 'onum','time','proname','products'],
              filename:'渠道业绩查看面板'
          },
          '方案发送面板':{
              url:'getProfessorDetail',
              zh:['老师名称', '投保单数','未标注数', '标注数', '方案数', '讲解数', '讲解方案率'],
              en:['name', 'onum', 'status0_count', 'status_count', 'code4','code5','code5rate'],
              filename:'方案发送面板'
          },
          '群保费数据面板':{
              url:'wxgroup',
              zh:['群名称', '负责人','群总数', '购买人数', '群建立时间', '60天内总保费','总保费'],
              en:['title', 'response', 'num', 'mem', 'create_time','money','z_money'],
              filename:'群保费数据面板'
          },
      },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
