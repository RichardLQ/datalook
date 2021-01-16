// import { channelList} from '@/request/api';
import axios from 'axios'
export default {
    //获取用户信息
    getAuthName:function() {
        const userInfo={};
		userInfo.id=305;
		return 'userInfo'+userInfo.id;
    },
    //获取localStroge
    getLocal:function(name) {
        return JSON.parse(localStorage.getItem(name));
    },
    //设置localStroge
    setLocal:function(name,data){
        return localStorage.setItem(name,JSON.stringify(data));
    },
    //导出excel时候数据和字段组合方法
    formatJson:function(filterVal, tableData) {
        return tableData.map(v => filterVal.map(j => v[j]))
    },
    /**
     * 获取当前月
     * 返回月初到当前日的数组
     */
    getNowdates:function(){
        const date = new Date();
        const year=date.getFullYear();
        let month=date.getMonth()+1;
        month=(month<9)?('0'+month):month;
        let day=date.getDate();
        day=(day<9)?('0'+day):day;
        return [year+'-'+month+'-01',year+'-'+month+'-'+day];
    },
}