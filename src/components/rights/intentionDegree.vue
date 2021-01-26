<template>
    <div>
        <el-form  :model="form" ref="form" label-width="80px">                    
            <el-form-item label="专家" class="label" >
                <template>
                    <!-- <el-select filterable multiple  placeholder="请选择,可搜索,可多选" v-model="form.proid">
                        <el-option-group v-for="team in professorList"  :label="team.title" :key="team.id" >
                            <el-option 
                            v-for="pro in team.children" 
                            :key="pro.id"
                            :label="pro.proname"
                            :value="pro.id"></el-option>
                        </el-option-group>
                    </el-select> -->
                    <el-input id="proid" v-model="form.proid" @focus="onclissd" clearable></el-input>
                </template>
            </el-form-item>
            <el-form-item label="购买时间" class="label" >
                     <!-- <el-date-picker
                        v-model="form.dates"
                        clearable
                        type="month"
                        placeholder="选择购买时间"
                        value-format="yyyy-MM">
                        </el-date-picker> -->
                        <el-date-picker
                        v-model="form.dates"
                        type="daterange"
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
import { professorList} from '@/request/api';
import plugin from '@/request/select_plugin';
@Component({
  components: {}
})
export default class IntentionDegree extends Vue {
    
    form={
        dates:[],//时间
        proid:[],
    };
    param={
        datas:''
    };
    professorList=[];
    /**
     * 传form里面的参数到home组件内
     */
    @Emit('filterParameters')
    filterParameters(val: any){
        return val;
    }
    /**
     * onclissd
     */
    public onclissd() {
        this.param.datas=this.form.proid;
        plugin.render($("#proid"), {}, {}, true,this.param);
    }
    /**
     * 确认按钮提交信息
     */
    public confirmOptions(): void {
        this.form.proid=$('#proid').val();
        const values={
            'dates':this.form.dates,
            'proid':this.form.proid,
            'parentid':this.$route.query.id,
            'drawer':true
            };
        // this.$store.state.nowFilters=values;getNowdates   this.utils.getAuthName()
        this.$store.state.nowFilters.intentionDegree=values;
        this.filterParameters(values);
    }
    /**
     * 关闭抽屉
     */
    public close(): void {
        this.filterParameters({'drawer':false});
    }
    created(){
    //   professorList().then(res => {this.professorList = res.data})
      if(this.$store.state.nowFilters.intentionDegree!=undefined){
          this.form=this.$store.state.nowFilters.intentionDegree;
      }
      
    }
    mounted(){
        if(!this.form.dates.length){
            this.form.dates=this.utils.getNowdates();
        }
    }

    
}
</script>
<style lang="less" scoped>
.el-date-editor--daterange.el-input__inner{
    width: 220px !important;
}
/deep/ .el-input__inner{
    width: auto;
}
/deep/ .el-input{
    width: auto;
}
</style>
