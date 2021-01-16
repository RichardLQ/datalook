<template>
    <div>
        <el-form :model="form" ref="form" label-width="80px" @submit.native.prevent>
            <el-form-item label="空间" class="label" >
                <el-checkbox-group v-model="form.data_type" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="1">A:服务量</el-checkbox>
                    <el-checkbox :label="2">B:⽅案量</el-checkbox>
                    <el-checkbox :label="3">C1:超过5分钟通过次数</el-checkbox>
                    <el-checkbox :label="4">D1:有效沟通次数</el-checkbox>
                    <el-checkbox :label="5">E1:业绩</el-checkbox>
                    <el-checkbox :label="6">E2:投保⼈数</el-checkbox>
                </el-checkbox-group>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </el-form-item>
            <el-form-item label="对象" class="label">
                <el-select filterable placeholder="请选择,可搜索" clearable v-model="form.proid">
                    <el-option-group v-for="team in professorList" :label="team.title" :key="team.id" >
                        <el-option 
                        v-for="pro in team.children" 
                        :key="pro.id"
                        :label="pro.proname"
                        :value="pro.id"></el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="时间" class="label" >
                <el-date-picker type="month" value-format="yyyy-MM" placeholder="选择日期" v-model="form.date_val" style="width: 80%;"></el-date-picker>
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
@Component({
  components: {}
})
export default class TrackGradient extends Vue {
    checkAll=false;
    isIndeterminate=true;
    form={
        data_type:[1],//空间
        date_val:'',//时间
        proid:'',
    };
    professorList=[];
    /**
     * 传form里面的参数到home组件内
     */
    @Emit('filterParameters')
    filterParameters(val){
        return val;
    }

    /**
     * 全选中方法
     */
    public handleCheckAllChange(val) {
        this.form.data_type = val ? [1,2,3,4,5,6] : [];
        this.isIndeterminate = false;
      }

    public handleCheckedCitiesChange(value) {
        const checkedCount = value.length;
        console.log(checkedCount);
        this.checkAll = checkedCount === 6;
        this.isIndeterminate = checkedCount > 0 && checkedCount < 6;
      }
    /**
     * 确认按钮提交信息
     */
    public confirmOptions(): void {
        const values={
            'data_type':this.form.data_type,
            'date_val':this.form.date_val,
            'proid':this.form.proid,
            'parentid':this.$route.query.id,
            'drawer':true
            };
        this.$store.state.nowFilters.trackGradient=values;
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
      if(this.$store.state.nowFilters.trackGradient!=undefined){
          this.form=this.$store.state.nowFilters.trackGradient;
      }
    }

    
}
</script>
