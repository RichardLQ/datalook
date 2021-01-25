<template>
    <div>
        <el-form :model="form" ref="form" label-width="80px" @submit.native.prevent>
                        <el-form-item label="群名称" class="label" >
                            <template>
                                <el-input v-model="form.title" clearable></el-input>
                            </template>
                        </el-form-item>

                        <el-form-item label="负责人" class="label" >
                            <template>
                                <el-input v-model="form.name" clearable></el-input>
                            </template>
                        </el-form-item>
                        
                        <el-form-item label="建群时间" class="label" >
                            <el-date-picker
                            v-model="form.date"
                            type="daterange"
                            range-separator="~"
                            start-placeholder="开始日期"
                             value-format="yyyy-MM-dd"
                            end-placeholder="结束日期">
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
@Component({
  components: {}
})
export default class GrouPremium extends Vue {
    
    form={
        title:'',//群名称
        name:'',//负责人
        date:'',//建群时间
        proid:[],
    };
    professorList=[];
    channelList=[];
    utils: any;
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
        const values={
            'title':this.form.title, 
            'name':this.form.name, 
            'date':this.form.date, 
            'proid':this.form.proid,
            'parentid':this.$route.query.id,
            'drawer':true
            };
        this.$store.state.nowFilters.grouPremium=values;
        this.filterParameters(values);
    }
    /**
     * 关闭抽屉
     */
    public close(): void {
        this.filterParameters({'drawer':false});
    }
    created(){
      professorList().then(res => {this.professorList = res.data})
      channelList().then(res => {this.channelList = res.data})
      if(this.$store.state.nowFilters.grouPremium!=undefined){
          this.form=this.$store.state.nowFilters.grouPremium;
      }
    }
    mounted(){
        if(!this.form.date.length){
            this.form.date=this.utils.getNowdates();
        }
    }
    
}
</script>
<style lang="less" scoped>
/deep/ .el-input__inner{
    width:220px;
}
/deep/ .el-date-editor--daterange.el-input__inner{
    width:220px;
}
.el-date-editor--daterange.el-input__inner{
    width: 220px !important;
}
/deep/ .el-input__icon{
    width: 15px !important;
}
</style>


