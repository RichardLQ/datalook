<template>
<div>
    <el-table ref="table1" :height="heights" v-loading="loading" border :data="testdata" :row-height="40" :cell-style="{padding: '5px'}"
			stripe :span-method="objectSpanMethod" >
				<el-table-column v-if="testdata.length > 0"
				prop="name"
				label="类型"
				>
					<el-table-column
					prop="title"
					label="总纲"
					width="60"
					>
					</el-table-column>
					<el-table-column
					prop="names"
					label="类别"
				>
					</el-table-column>
				</el-table-column> 
                <el-table-column v-for="(item,index) in testfield" :key="index"
					:prop="item.field"
					:label="item.label"
					
					>
						<el-table-column label="上午" v-if="(JSON.stringify($store.state.nowFilters.oneDay.data_type)).indexOf(1)>-1">
							<template slot-scope="scope">
								<div v-if="scope.row['name']=='durations'">
										{{scope.row[item.field]['monring']|formatDate}}	
								</div>
								<div v-else>
										{{scope.row[item.field]['monring']}}	
								</div>
								
							</template>
						</el-table-column>
						<el-table-column label="下午" v-if="(JSON.stringify($store.state.nowFilters.oneDay.data_type)).indexOf(2)>-1" >
							<template slot-scope="scope">
								<div v-if="scope.row['name']=='durations'">
										{{scope.row[item.field]['afternoon']|formatDate}}	
								</div>
								<div v-else>
										{{scope.row[item.field]['afternoon']}}	
								</div>
							</template>
						</el-table-column>
						<el-table-column label="晚上" v-if="(JSON.stringify($store.state.nowFilters.oneDay.data_type)).indexOf(3)>-1">
							<template slot-scope="scope">
								<div v-if="scope.row['name']=='durations'">
										{{scope.row[item.field]['night']|formatDate}}	
								</div>
								<div v-else>
										{{scope.row[item.field]['night']}}	
								</div>
							</template>
						</el-table-column>
						<el-table-column label="全部" v-if="(JSON.stringify($store.state.nowFilters.oneDay.data_type)).indexOf(4)>-1" >
							<template slot-scope="scope">
								<div v-if="scope.row['name']=='durations'">
										{{scope.row[item.field]['all']|formatDate}}	
								</div>
								<div v-else>
										{{scope.row[item.field]['all']}}	
								</div>
							</template>
						</el-table-column>
						
				</el-table-column>
</el-table>
</div>
</template>
<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';
import { getProfessorData} from '@/request/api';
@Component({
  components: {},
  filters: {
      formatDate(val: number){
				const day = parseInt(val / 60 / 60 / 24)
				const hr = parseInt(val / 60 / 60 % 24)
				const min = parseInt(val / 60 % 60)
				const sec = parseInt(val % 60)
				let toLiveBtn='';
				toLiveBtn+=day>0?day+'天':'';
				toLiveBtn+=hr>0?hr+'时':'';
				toLiveBtn+=min>0?min+'分':'';
				toLiveBtn+=sec>0?sec+'秒':'';
				if(toLiveBtn=='')
				toLiveBtn=0+'秒';
				return toLiveBtn;
			},
  }
})
export default class OneDayTable extends Vue {
    testdata=[];
	testfield=[];
	exportData=[];
	heights=400;
	map={};
    export_url={};
    smallTitle={
"service":'服务量',
"code4":'方案发送量',
"moneys":'业绩',
"onum":'订单量',
"durations":'通话时长',
"total":'通话次数',
"5min_num":'超过5min次数',
"record":'条数',
"midnum":'人数',
"wechat_message":'消息次数',
"wechat_msg_len":'消息字数',
"wechat_chatnum":'沟通人数',
"wechat_valid":'有效人数',
				};
    bigTitle={0:'服务',1:'方案',2:'投保',3:'电话',4:'记录',5:'微信',};
    loading=false;
    fieldText={'durations':'(通话时长)','total':'(通话次数)','5min_num':'(通话超过 5min次数)'}
    
    public getData(): void {
        if(this.$store.state.nowFilters.oneDay.proid==undefined||this.$store.state.nowFilters.oneDay.proid==""){
            this.$message({message: '请选择老师对象',type: 'warning'});
            return ;
		}
		this.loading=true;
		Object.assign(this.map,this.$store.state.nowFilters.oneDay)
		const professList=this.utils.getLocal(this.utils.getAuthName()+'professorList');
		JSON.parse(professList).forEach(item => {
			item.children.forEach(item2 => {
				if(item2.proname==this.$store.state.nowFilters.oneDay.proid){
					this.map.proid=item2.id;
				}
			});
		});
        getProfessorData(this.map).then(res => {
			this.exportData=res.data.list;
            this.testdata=this.formatting(res.data.list);
            this.testfield = res.data.field
			this.loading=false;
			this.$nextTick(()=>{
                this.utils.getLocal(this.utils.getAuthName()).map(n=>{
                    if(n.childrenValue.id==this.$store.state.nowFilters.oneDay.parentid)
                    this.heights=n.childrenValue.pageH-80;
                    return n;
                })
            })
        })
    }
    /**
     * 格式化数据类型
     */
    public formatting(val){
        const returns=[];
		Object.keys(val).forEach((item,index)=>{
			val[item]['title']=this.bigTitle[val[item]['parent']];
			val[item]['names']=this.smallTitle[val[item]['name']];
			returns[index]=val[item];
		})
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
		// console.log(column);
		// console.log(rowIndex);
		// console.log(row);
		if(columnIndex == 0){
			return {rowspan: row.nums,colspan: row.nums>0?1:0};
		}
	}
	/**
     * exportFile
     */
    public exportFile() {
        const userInfoList=this.utils.getLocal(this.utils.getAuthName());
        const userInfo = userInfoList.filter(n=>{return (n.childrenValue.id==this.map.parentid)?true:false;})
		this.export_url=this.$store.state.export_url[userInfo[0].childrenValue.name];
		const jsonData = this.utils.formatJson(this.export_url['en'], this.formatdata(this.exportData,this.testfield));
		console.log(this.map);
        import("../vendor/Export2Excel").then(excel => {
			excel.export_json_to_excel({
                multiHeader:this.export_url['multiHeader'], 
                header:this.export_url['zh'],
                data:jsonData, 
                merges:this.export_url['merges'],
                filename:this.export_url['filename']
            })
        })
	}
	
	/**
     * 格式化下载数据格式
     */
    public formatdata(datas,field) {
        const returns=[];
        this.export_url['multiHeader']=[['类型','']];
        this.export_url['zh']=['总纲','类别'];
		this.export_url['en']=['title','type'];
        field.forEach((item,index)=>{
            this.export_url['multiHeader'][0].push(item.label);
            for(let i=0;i<3;i++){
                this.export_url['multiHeader'][0].push('');
			}
            const tempZhfileds=['上午','中午','晚上','全部'];
			const tempEnfileds=['monring','afternoon','night','all'];
			this.export_url['zh']=this.export_url['zh'].concat(tempZhfileds);
            tempEnfileds.forEach((item2)=>{
                this.export_url['en'].push(item2+item.field);
			})
		})
        for(const i in this.export_url['bigFields']){
			let temps={title:this.export_url['bigFields'][i][0],type:this.export_url['bigFields'][i][1]};
            field.forEach((item,index)=>{
                temps['monring'+item.field]=datas[i][item.field]['monring'];
                temps['afternoon'+item.field]=datas[i][item.field]['afternoon'];
                temps['night'+item.field]=datas[i][item.field]['night'];
                temps['all'+item.field]=datas[i][item.field]['all'];
			})
            returns.push(temps);
            temps={};
        }
        return returns;
    }

}

</script>