<template>
    <div >
      <u-table ref="table1" style="width: 100%" use-virtual border stripe :row-height="40" :height="heights" :cell-style="{padding : '5px'}" :data="data" v-loading="loading">
				<template v-if="field.length > 0">
					<u-table-column prop="name" label="对象" width="150">
						<template slot-scope="scope">
							<div class="head" :title="scope.row.id">
								<span class="nickname">
									{{ scope.row.name }}
									<span v-if="!!scope.row.type" style="color:red">
										{{ fieldText[scope.row.type] }}
									</span>
								</span>
							</div>
						</template>
					</u-table-column>
				</template>
                
				<template v-for="f in field">
					<u-table-column :prop="f.field" :label="f.label" :key="f.field" width="120"></u-table-column>
				</template>
            </u-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { resultsGeneral} from '@/request/api';
@Component({
  components: {}
})
export default class ResultsGeneralTable extends Vue {
    data=[];
    field=[];
    heights=400;
    loading=false;
    map={};
    export_url={};
    fieldText={'durations':'(通话时长)','total':'(通话次数)','5min_num':'(通话超过 5min次数)'}
    public getData(): void {
        this.loading=true;
		Object.assign(this.map,this.$store.state.nowFilters.resultsGeneral)
        resultsGeneral(this.map).then(res => {
            this.data = res.data.list
            this.field = res.data.field
            this.loading=false;
            this.$nextTick(()=>{
                this.utils.getLocal(this.utils.getAuthName()).map(n=>{
                    if(n.childrenValue.id==this.$store.state.nowFilters.resultsGeneral.parentid)
                    this.heights=n.childrenValue.pageH-80;
                    return n;
                })
            })
        })
    }
    /**
     * exportFile
     */
    public exportFile() {
        const userInfoList=this.utils.getLocal(this.utils.getAuthName());
        const userInfo = userInfoList.filter(n=>{return (n.childrenValue.id==this.map.parentid)?true:false;})
        this.export_url=this.$store.state.export_url[userInfo[0].childrenValue.name];
        const jsonData = this.utils.formatJson(this.export_url['en'], this.formatdata(this.data,this.field));
        import("../vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
                header:this.export_url['zh'],
                data:jsonData, 
                filename:this.export_url['filename']
            })
        })
    }

    /**
     * 格式化下载数据格式
     */
    public formatdata(datas,field) {
        let returns=[];
        this.export_url['zh']=['对象'];
        this.export_url['en']=['name'];
        field.forEach((item,index)=>{
            this.export_url['en'].push(item.field);
            this.export_url['zh'].push(item.label);
        })
        if(datas[0]['type']!=undefined){
            datas.forEach((item,index)=>{
                item.name=item.name+'('+this.export_url['bigFields'][item.type]+')';
            })
        }
        returns=datas;
        return returns;
    }

    /**
     * changeSize
     */
    public changeSize(val) {
        this.utils.getLocal(this.utils.getAuthName()).map(n=>{
            if(n.childrenValue.id==val)
            this.heights=n.childrenValue.pageH-80;
            return n;
        })
    }
}

</script>
<style >
.el-table__body-wrapper{
    height:350px;
}
</style>
