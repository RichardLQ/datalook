<template>
<div>
    <u-table ref="table1" :summary-method="summaryMethod"  v-if="testdata.length > 0" border :data="testdata"  v-loading="loading" :show-summary='true' use-virtual :height="heights" :row-height="40" :cell-style="{padding: '0'}" 
			
			class="elTable"
			stripe>
				<u-table-column
					prop="name"
					:label="$store.state.nowFilters.channelPerformance.data_type==2?'规划师': ($store.state.nowFilters.channelPerformance.data_type==3)?'团队名字':'客户名字'"
					>
					<template slot-scope="scope">
							{{scope.row|formatName}}
					</template>
				</u-table-column>
				<u-table-column v-if="$store.state.nowFilters.channelPerformance.data_type==2"
					prop="tname"
					label="团队名字"
					>
				</u-table-column>
				<u-table-column v-if="$store.state.nowFilters.channelPerformance.data_type==2||$store.state.nowFilters.channelPerformance.data_type==3"
					prop="count"
					label="客户数"
					>
				</u-table-column>
				<u-table-column v-if="testdata[0]['buytime']!=undefined"
					prop="buytime"
					label="购买时间"
					>
				</u-table-column>
				<u-table-column
					prop="moneys"
					label="出单金额"
					>
				</u-table-column>
				<u-table-column
					prop="onum"
					label="出单数量"
					>
				</u-table-column>
				<u-table-column
					prop="time"
					label="最近出单时间"
					>
				</u-table-column>
				<u-table-column v-if="testdata[0]['proname']!=undefined&&$store.state.nowFilters.channelPerformance.data_type!=2"
					prop="proname"
					label="专家名称"
				>
				</u-table-column>
           </u-table>
</div>
</template>
<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';
import { getChannelData} from '@/request/api';
@Component({
  components: {},
  filters: {
        formatName:function(val){
				if(typeof val['name']=='object'){
					return val['nickname'];
				}else{
					if(typeof val['nickname']=='undefined'){
						return "("+val['name']+")";
					}else{
						return val['nickname']+"("+val['name']+")";
					}
				}
			},
  }
})
export default class ChannelPerformanceTable extends Vue {
    testdata=[];
    testfield=[];
    heights=400;
	loading=false;
	map={};
    export_url={};
    public getData(): void {
        // const map = {};
        this.loading=true;
		Object.assign(this.map,this.$store.state.nowFilters.channelPerformance)
        getChannelData(this.map).then(res => {
            this.testdata=res.data;
			this.loading=false;
			this.$nextTick(()=>{
                this.utils.getLocal(this.utils.getAuthName()).map(n=>{
                    if(n.childrenValue.id==this.$store.state.nowFilters.channelPerformance.parentid)
                    this.heights=n.childrenValue.pageH-80;
                    return n;
                })
            })
        })
	}

	public summaryMethod({ columns, data }) {
           
           const means = [] // 合计
           columns.forEach((column, columnIndex) => {
               if (columnIndex === 0) {
                   means.push('合计')
               } else {
                   const values = data.map(item => Number(item[column.property]));
                   // 合计
                   if (!values.every(value => isNaN(value))) {
                       means[columnIndex] = values.reduce((prev, curr) => {
                           const value = Number(curr);
                           if (!isNaN(value)) {
                               return prev + curr;
                           } else {
                               return prev;
                           }
                        }, 0);
                        if(columnIndex==2){
							means[columnIndex] =  means[columnIndex].toFixed(2) +' ';
                        }else{
                            means[columnIndex] =  means[columnIndex].toFixed(2) + ' ';
                        }
                       
                   } else {
                       means[columnIndex] = 'N/A';
                   }
                   
               }
           })
           // 返回一个二维数组的表尾合计(不要平均值，你就不要在数组中添加)
           return [means]
       }

	/**
     * exportFile
     */
    public exportFile() {
        const userInfoList=this.utils.getLocal(this.utils.getAuthName());
        const userInfo = userInfoList.filter(n=>{return (n.childrenValue.id==this.map.parentid)?true:false;})
		this.export_url=this.$store.state.export_url[userInfo[0].childrenValue.name];
		const old_data1=this.testdata.map(function(n){ n['moneys']=parseFloat(n['moneys']);return n;});
        const jsonData = this.utils.formatJson(this.export_url['en'], old_data1);
        import("../vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
                header:this.export_url['zh'],
                data:jsonData, 
                filename:this.export_url['filename']
            })
        })
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
    /**
     * 合并行和列
     */
    public objectSpanMethod({ row, column, rowIndex, columnIndex }){
		if(columnIndex == 0){
			return {rowspan: row.nums,colspan: row.nums>0?1:0};
		}
    }
}

</script>