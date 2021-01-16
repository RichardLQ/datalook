<template>
<div>
    <u-table ref="table1"   v-if="testdata.length > 0" border :data="testdata" v-loading="loading" use-virtual :height="heights" :row-height="40" :cell-style="{padding: '0'}" :summary-method="summaryMethod" show-summary class="elTable"
			stripe>
				<u-table-column
					prop="title"
					label="群名称"
					>
				</u-table-column>
				<u-table-column
					prop="response"
					label="负责人"
					>
				</u-table-column>
				<u-table-column
					prop="num" :sortable="true"
					label="群总数"
					>
				</u-table-column>
				
				<u-table-column
					prop="mem"
					:sortable="true"
					label="购买人数"
					>
				</u-table-column>
				<u-table-column
					prop="z_money" :sortable="true"
					label="总保费"
					>
					<template slot-scope="scope">
						{{scope.row.z_money|toZero}}
					</template>
				</u-table-column>
				<u-table-column
					prop="money"
					label="60天内总保费"
					>
				</u-table-column>
				<u-table-column
					prop="create_time"
					label="群建立时间"
					>
				</u-table-column>
            </u-table>
</div>
</template>
<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';
import { wxgroup} from '@/request/api';
@Component({
  components: {},
  filters: {
      toZero:function(val: string){
				return val==null?0:val;
      }
  }
})
export default class GrouPremiumTable extends Vue {
    testdata=[];
    testfield=[];
    heights=400;
    loading=false;
    map={};
    export_url={};
    public getData(): void {
        const map = {};
        this.loading=true;
		Object.assign(this.map,this.$store.state.nowFilters.grouPremium)
        wxgroup(this.map).then(res => {
            this.testdata=res.data;
			this.loading=false;
			this.$nextTick(()=>{
                this.utils.getLocal(this.utils.getAuthName()).map(n=>{
                    if(n.childrenValue.id==this.$store.state.nowFilters.grouPremium.parentid)
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
        const jsonData = this.utils.formatJson(this.export_url['en'], this.testdata);
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
	 * summaryMethod
	 */
	public summaryMethod({ columns, data }) {
           const means: string[] = [] // 合计
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
                       let footers='元';
                        if(columnIndex==2||columnIndex==3){
                            footers='个';
                        }
                       means[columnIndex] =means[columnIndex].toFixed(2) + footers
                   } else {
                       means[columnIndex] = '';
                   }
                   
               }
           })
           // 返回一个二维数组的表尾合计(不要平均值，你就不要在数组中添加)
           return [means];
	}
}

</script>