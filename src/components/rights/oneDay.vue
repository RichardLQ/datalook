<template>
    <div>
      <el-form :model="form"  ref="form" label-width="80px" @submit.native.prevent>
                        <el-form-item label="空间" class="label" >
                            <el-checkbox-group v-model="form.data_type">
                                <el-checkbox-button :label="1">上午</el-checkbox-button>
                                <el-checkbox-button :label="2">下午</el-checkbox-button>
                                <el-checkbox-button :label="3">晚上</el-checkbox-button>
                                <el-checkbox-button :label="4">全部</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="字段" class="label" >
                            <el-radio-group v-model="form.show_type" >
                                <el-radio-button :label="1">近7天</el-radio-button>
                                <el-radio-button :label="2">近15天</el-radio-button>
                                <el-radio-button :label="3">近30天</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="对象" class="label">
                            <!-- <el-select filterable placeholder="请选择,可搜索" v-model="form.proid" clearable>
                                <el-option-group v-for="team in professorList"  :label="team.title" :key="team.id" >
                                    <el-option 
                                    v-for="pro in team.children" 
                                    :key="pro.id"
                                    :label="pro.proname"
                                    :value="pro.id"></el-option>
                                </el-option-group>
                            </el-select> -->
                            <el-input id="proid" v-model="form.proid" @focus="onclissd" clearable></el-input>
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
// import $ from 'jquery';
import plugin from '@/request/select_plugin';

@Component({
  components: {}
})
export default class OneDay extends Vue {
    
    visible=false;
    form={
        data_type:[1],//空间
         show_type:1,//字段
         proid:'',//对象
    };
    parent='';
    professorList=[];
    /**
     * onclissd
     */
    public onclissd() {
        console.log(plugin);
        plugin.render($("#proid"), {}, {}, false);
    }

    

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
        this.form.proid=$('#proid').val();
        const values={
            'data_type':this.form.data_type,
            'show_type':this.form.show_type,
            'proid':this.form.proid,
            'parentid':this.$route.query.id,
            'drawer':true
            };
        this.$store.state.nowFilters.oneDay=values;
        this.filterParameters(values);
        
    }
    /**
     * 关闭抽屉
     */
    public close(): void {
        this.filterParameters({'drawer':false});
    }

    created(){
      if(this.$store.state.nowFilters.oneDay!=undefined){
          this.form=this.$store.state.nowFilters.oneDay;
      }
    }

    
}
</script>

