<template>
<div>
    <el-table ref="table1" 
			:height="heights" v-loading="loading" border :data="testdata" :row-height="40" :cell-style="{padding: '5px'}"
			stripe>
				<el-table-column v-if="testdata.length > 0"
				prop="dates" 
				label="月份"
				>
				<template slot-scope="scope">
						{{scope.row.dates}}月
					</template>
				</el-table-column>
				<el-table-column v-if="testdata.length > 0"
				prop="now"
				label="当月"
				>
					<el-table-column label="A" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(1)>-1" >
						<template slot-scope="scope">
							{{scope.row.now['service']}}
						</template>
					</el-table-column>
					<el-table-column label="B" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(2)>-1">
						<template slot-scope="scope">
							{{scope.row.now['code4']}}
						</template>
					</el-table-column>
					<el-table-column label="C1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(3)>-1" >
						<template slot-scope="scope">
							{{scope.row.now['5min_num']}}
						</template>
					</el-table-column>
					<el-table-column label="D1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(4)>-1" >
						<template slot-scope="scope">
							{{scope.row.now['wechat_valid']}}
						</template>
					</el-table-column>
					<el-table-column label="E1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(5)>-1" >
						<template slot-scope="scope">
							{{scope.row.now['moneys']}}
						</template>
					</el-table-column>
					<el-table-column label="E2" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(6)>-1" >
						<template slot-scope="scope">
							{{scope.row.now['onum']}}
						</template>
					</el-table-column>

				</el-table-column>
				<el-table-column v-if="testdata.length > 0"
				prop="name"
				label="跟踪上月数据"
				>
					<el-table-column label="A" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(1)>-1" >
						<template slot-scope="scope">
							{{scope.row.last['service']}}
						</template>
					</el-table-column>
					<el-table-column label="B" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(2)>-1" >
						<template slot-scope="scope">
							{{scope.row.last['code4']}}
						</template>
					</el-table-column>
					<el-table-column label="C1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(3)>-1" >
						<template slot-scope="scope">
							{{scope.row.last['5min_num']}}
						</template>
					</el-table-column>
					<el-table-column label="D1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(4)>-1" >
						<template slot-scope="scope">
							{{scope.row.last['wechat_valid']}}
						</template>
					</el-table-column>
					<el-table-column label="E1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(5)>-1" >
						<template slot-scope="scope">
							{{scope.row.last['moneys']}}
						</template>
					</el-table-column>
					<el-table-column label="E2" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(6)>-1" >
						<template slot-scope="scope">
							{{scope.row.last['onum']}}
						</template>
					</el-table-column>

				</el-table-column>
				<el-table-column v-if="testdata.length > 0"
				prop="name"
				label="跟踪上上月数据"
				>
					<el-table-column label="A" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(1)>-1" >
						<template slot-scope="scope">
							{{scope.row.last2['service']}}
						</template>
					</el-table-column>
					<el-table-column label="B" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(2)>-1" >
						<template slot-scope="scope">
							{{scope.row.last2['code4']}}
						</template>
					</el-table-column>
					<el-table-column label="C1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(3)>-1" >
						<template slot-scope="scope">
							{{scope.row.last2['5min_num']}}
						</template>
					</el-table-column>
					<el-table-column label="D1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(4)>-1" >
						<template slot-scope="scope">
							{{scope.row.last2['wechat_valid']}}
						</template>
					</el-table-column>
					<el-table-column label="E1" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(5)>-1" >
						<template slot-scope="scope">
							{{scope.row.last2['moneys']}}
						</template>
					</el-table-column>
					<el-table-column label="E2" v-if="$store.state.nowFilters.trackGradient.data_type==undefined?false:(JSON.stringify($store.state.nowFilters.trackGradient.data_type)).indexOf(6)>-1" >
						<template slot-scope="scope">
							{{scope.row.last2['onum']}}
						</template>
					</el-table-column>

				</el-table-column>
            </el-table>
</div>
</template>
<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';
import { getProRecordData} from '@/request/api';
@Component({
  components: {},
})
export default class TrackGradientTable extends Vue {
    testdata=[];
    bigFields=['last','last2','now'];
	fields=['5min_num','moneys','onum','service','wechat_valid'];
    heights=400;
	loading=false;
	map={};
	export_url={};
	exportData=[];
    public getData(): void {
        if(this.$store.state.nowFilters.trackGradient.proid==""||this.$store.state.nowFilters.trackGradient.proid==undefined){
            this.$message({message: '请选择老师对象',type: 'warning'});
            return ;
        }
        // const map = {};
        this.loading=true;
		Object.assign(this.map,this.$store.state.nowFilters.trackGradient)
        getProRecordData(this.map).then(res => {
			this.exportData=res.data;
            this.testdata=this.formatData(res.data);
			this.loading=false;
			this.$nextTick(()=>{
                this.utils.getLocal(this.utils.getAuthName()).map(n=>{
                    if(n.childrenValue.id==this.$store.state.nowFilters.trackGradient.parentid)
                    this.heights=n.childrenValue.pageH-80;
                    return n;
                })
            })
        })
    }
    /**
     * 格式化数据类型
     */
    public formatData(val){
        let returns=[];
		Object.keys(val).forEach((item,index)=>{
			val[item]['dates']=item;
			this.bigFields.forEach((item1)=>{
				this.fields.forEach((item2: string|number)=>{
					if(typeof val[item][item1][item2]=='undefined'){
						val[item][item1][item2]=0;
					}
				})
			})
			returns[index]=val[item];
		})
		returns=returns.reverse();
		return returns;
	}
	
	/**
     * exportFile
     */
    public exportFile() {
        const userInfoList=this.utils.getLocal(this.utils.getAuthName());
        const userInfo = userInfoList.filter(n=>{return (n.childrenValue.id==this.map.parentid)?true:false;})
		this.export_url=this.$store.state.export_url[userInfo[0].childrenValue.name];
		const ss=this.formatdatas(this.exportData);
		console.log(ss);
        const jsonData = this.utils.formatJson(this.export_url['en'], this.formatdatas(this.exportData));
        import("../vendor/Export2Excel").then(excel => {
            excel.export_json_to_excel({
				multiHeader:this.export_url['multiHeader'], 
				header:this.export_url['zh'],
				merges:this.export_url['merges'][this.map.show_type],
                data:jsonData, 
                filename:this.export_url['filename']
            })
        })
    }

    /**
     * 格式化下载数据格式
     */
    public formatdatas(datas) {
        const returns=[];
        // let _this=this;
        Object.keys(datas).forEach((item)=>{
            let temp={dates:item};
            this.export_url['bigFields'].forEach((item2)=>{
                this.export_url['fields'].forEach((item3,index3)=>{
                    if(typeof datas[item][item2][item3]=='undefined'){
                        temp[item2+item3]=0;
                    }else{
                        temp[item2+item3]=datas[item][item2][item3];
                    }
                })
            })
            returns.push(temp);
            temp={};
        })  
        // console.log(returns);
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