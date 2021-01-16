<template>
    <div>
        <el-form :model="form" ref="form" label-width="80px" @submit.native.prevent>
        <div style="width:100%;height:10px"></div>
        <el-form-item label="空间" class="label">
            <el-radio-group v-model="form.data_type" >
                <el-radio-button :label="1" >业绩</el-radio-button>
                <el-radio-button :label="2">通时</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="字段" class="label" >
            <el-radio-group v-model="form.show_type" >
                <el-radio-button :label="1" >近7天</el-radio-button>
                <el-radio-button :label="2">近15天</el-radio-button>
                <el-radio-button :label="3">近30天</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="对象" class="label" >
            <el-radio-group v-model="form.obj_type">
                <el-radio-button :label="1">销售</el-radio-button>
                <el-radio-button :label="2">小组</el-radio-button>
            </el-radio-group>
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
@Component({
  components: {}
})
export default class ResultsGeneral extends Vue {
    
    form={
    data_type:1,//空间
    show_type:1,//字段
    obj_type:1,//对象
    };
    utils: any;
    // parent='';
    /**
     * 传form里面的参数到home组件内
     */
    @Emit('filterParameters')
    filterParameters(val: any){
        return val;
    }
    /**
     * 确认按钮提交信息
     */
    public confirmOptions(): void {
        const values={
            'data_type':this.form.data_type,
            'show_type':this.form.show_type,
            'obj_type':this.form.obj_type,
            'parentid':this.$route.query.id,
            'drawer':true
            };
        this.$store.state.nowFilters.resultsGeneral=values;
        // console.log(this.$store.state.nowFilters);
        this.filterParameters(values);
    }
    /**
     * 关闭抽屉
     */
    public close(): void {
        this.filterParameters({'drawer':false});
    }
    created(){
        console.log(this.$store.state.nowFilters.resultsGeneral);
        if(this.$store.state.nowFilters.resultsGeneral!=undefined){
          this.form=this.$store.state.nowFilters.resultsGeneral;
      }
    }
    
}
</script>
<style scoped>
.el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: 0 0 2px 2px white
}
</style>