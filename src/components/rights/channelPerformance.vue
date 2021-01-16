<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>

                        <el-form-item label="渠道" >
                            <el-select v-model="form.channel" filterable clearable  placeholder="请选择">
                                <el-option
                                v-for="team in channelList"  :label="team.remark" :key="team.id" :value="team.remark">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="来源" class="label">
                            <el-select v-model="form.lyid" filterable clearable  placeholder="请选择">
                                <el-option label="全部来源" value=" "></el-option>
                                <el-option label="手动添加" value="1"></el-option>
                                <el-option label="专家链接购买" value="2"></el-option>
                                <el-option label="抖音链接购买" value="3"></el-option>
                                <el-option label="希财表单转化" value="4"></el-option>
                                <el-option label="代投放百度表单" value="5"></el-option>
                                <el-option label="希财公众号0元" value="6"></el-option>
                                <el-option label="希财课程" value="7"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="价格" class="label">
                            <el-input
                            placeholder="请输入内容"
                            v-model="form.fee"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="类型" class="label" >
                            <el-radio-group v-model="form.order_type">
                                <el-radio-button :label="1">投保</el-radio-button>
                                <el-radio-button :label="2">退保</el-radio-button>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="业绩单位" class="label" >
                            <el-radio-group v-model="form.data_type" @change="changeunit">
                                <el-radio-button :label="2">规划师</el-radio-button>
                                <el-radio-button :label="1">客户</el-radio-button>
                                <el-radio-button :label="3">团队</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                                                
                        <el-form-item v-if="form.data_type!=1?true:false" label="规划师" class="label" >
                            <template v-if="form.data_type == 2">
                                <el-select filterable multiple  placeholder="请选择,可搜索,可多选" v-model="form.proid">
                                    <el-option-group v-for="team in professorList"  :label="team.title" :key="team.id" >
                                        <el-option 
                                        v-for="pro in team.children" 
                                        :key="pro.id"
                                        :label="pro.proname"
                                        :value="pro.id"></el-option>
                                    </el-option-group>
                                </el-select>
                            </template>
                            <template v-if="form.data_type == 3">
                                <el-select  multiple  placeholder="请选择,可搜索,可多选" v-model="form.proid">
                                    <template v-for="team in professorList">
                                        <el-option v-if="team.id != 0" :label="team.title" :key="team.id" :value="team.id"></el-option>
                                    </template>
                                </el-select>
                            </template>

                        </el-form-item>
                        <el-form-item label="购买时间" class="label" >
                                <el-date-picker
                                v-model="form.buyDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="~"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                 value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                         </el-form-item>
                        <el-form-item label="出单时间" class="label" >
                            <el-date-picker
                                v-model="form.singleDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="~"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                 value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                            </el-form-item>
                            
                        <el-form-item>
                            <el-button type="primary" size="small" @click="confirmOptions">确认</el-button>
                            <el-button type="danger" size="small" @click="close">关闭</el-button>
                        </el-form-item>
                    </el-form>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue,Emit  } from 'vue-property-decorator';
import { professorList,channelList} from '@/request/api';
// import { component } from 'vue/types/umd';
@Component({
  components: {}
})
export default class ChannelPerformance extends Vue {
    form={
        channel:'', //渠道
        lyid:'',//来源
        fee:'',//价格
        order_type:1,//类型
        data_type:2,//业绩单位
        buyDate:'',//购买时间
        singleDate:'',//出单时间\
        proid:[],
    };
    professorList=[];
    channelList=[];
    /**
     * 传form里面的参数到home组件内
     */
    @Emit('filterParameters')
    filterParameters(val: any){
        return val;
    }

    /**
     * 业绩单位发生改变时执行函数
     */
    public changeunit() {
        this.form.proid=[];

    }
    /**
     * 确认按钮提交信息
     */
    public confirmOptions(): void {
        let names=this.form.channel;
        if(this.form.channel!=''){
            const tem=this.channelList.filter(n=>{
                return n.remark==this.form.channel;
                });
            console.log(tem);
            names=tem[0].id;
        }
        const values={
            'channel':names,
            // 'channel':(this.form.channel!='')?this.form.channel.substr(1):this.form.channel,
            'lyid':this.form.lyid,
            'fee':this.form.fee,
            'order_type':this.form.order_type,
            'data_type':this.form.data_type,
            'buyDate':this.form.buyDate,
            'singleDate':this.form.singleDate, 
            'proid':this.form.proid,
            'parentid':this.$route.query.id,
            'drawer':true
            };
        this.$store.state.nowFilters.channelPerformance=values;
        this.filterParameters(values);
    }
    /**
     * 关闭抽屉
     */
    public close(): void {
        this.filterParameters({'drawer':false});
    }
    created(){
      if(this.$store.state.nowFilters.channelPerformance!=undefined){
          this.form=this.$store.state.nowFilters.channelPerformance;
          if(this.$store.state.nowFilters.channelPerformance.channel!=''){
              this.channelList.filter(n=>{
                  if(n.id==this.$store.state.nowFilters.channelPerformance.channel){
                      console.log(n);
                      this.form.channel=n.remark;
                  }
                return n;
                });
          }
      }
      channelList().then(res => {
          this.channelList=res.data;
          if(this.$store.state.nowFilters.channelPerformance!=null){
            this.channelList.filter(n=>{
              if(n.id==this.$store.state.nowFilters.channelPerformance.channel){
                  this.form.channel=n.remark;
              }
            return n;
            });
          }
          })
      professorList().then(res => {this.professorList = res.data})
      
          
    }

    
}
</script>
<style lang="less" scoped>
/deep/ .el-input__inner{
    width:auto;
}
/deep/ .el-date-editor--daterange.el-input__inner{
    width:auto;
}
</style>

