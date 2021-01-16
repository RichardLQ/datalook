<template>
<div>
    <u-table ref="table1"  v-if="testdata.length > 0" border :data="testdata" v-loading="loading" use-virtual :height="heights" :row-height="40" :cell-style="{padding: '0'}" class="elTable" stripe>
				<u-table-column
					prop="name"
					:sortable="true"
					label="专家名称"
					>
				</u-table-column>
				<u-table-column
					prop="tname"
					:sortable="true"
					label="团队名称"
					>
				</u-table-column>
				<u-table-column
					prop="count" :sortable="true"
					width="60"
					label="分配人数"
					>
				</u-table-column>
				<u-table-column
					prop="onum"
					:sortable="true"
					width="60"
					label="投保单数"
					>
				</u-table-column>
				<u-table-column
				:sortable="true"
					prop="lognum"
					label="记录数"
					width="60"
					>
				</u-table-column>
				<u-table-column
				:sortable="true"
					prop="lognumrate"
					label="记录率"
					>
				</u-table-column>
				<u-table-column
				:sortable="true"
					prop="status_count"
					width="60"
					label="标注数"
					>
				</u-table-column>
				<u-table-column
				:sortable="true"
					prop="status_countrate"
					label="标注率"
					>
				</u-table-column>
				<u-table-column
					prop="code4"
					:sortable="true"
					label="方案数"
					width="60"
					>
				</u-table-column>
				<u-table-column
					prop="code5rate"
					label="方案率"
					>
				</u-table-column>
				<u-table-column
					prop="code5"
					label="讲解方案数"
					:sortable="true"
					width="60"
					>
				</u-table-column>
				<u-table-column 
					prop="code5rate"
					label="讲解方案率"
				>
				</u-table-column>
           </u-table>
</div>
</template>
<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';
import { getProfessorDetail} from '@/request/api';
@Component({
  components: {},
})
export default class IntentionDegreeTable extends Vue {
    testdata=[];
    heights=400;
	loading=false;
	map={};
    export_url={};
    bigFields=['last','last2','now'];
	fields=['5min_num','moneys','onum','service','wechat_valid'];
    created(){
        console.log(222);
    }
    public getData(): void {
        // const map = {};
        this.loading=true;
		Object.assign(this.map,this.$store.state.nowFilters.intentionDegree)
        getProfessorDetail(this.map).then(res => {
			this.testdata=res.data;
			this.testdata.map(n=>{
				n.status_countrate=n.count==null?0:((n.status_count/n.count)*100).toFixed(2)+'%';
				n.code5rate=n.count==null?0:((n.code5/n.count)*100).toFixed(2)+'%';
				n.lognumrate=n.count==null?0:((n.lognum/n.count)*100).toFixed(2)+'%';
				return n;
			})
			this.loading=false;
			this.$nextTick(()=>{
                this.utils.getLocal(this.utils.getAuthName()).map(n=>{
                    if(n.childrenValue.id==this.$store.state.nowFilters.intentionDegree.parentid)
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
				multiHeader:this.export_url['multiHeader'], 
				header:this.export_url['zh'],
				merges:this.export_url['merges'],
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