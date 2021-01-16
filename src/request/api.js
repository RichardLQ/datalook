import { get } from './http'
let  baseUrl='https://wx1.dahe2016.com/public/admin/data_view2/';
if(process.env.NODE_ENV=='development'){
    baseUrl='https://wx1.dahe2016.com/public/admin/data_view2/';
}else{
    baseUrl='https://wx1.dahe2016.com/public/admin/data_view/';
}
// const baseUrl='https://wx1.dahe2016.com/public/admin/data_view/';
const baseUrl2='https://wx1.dahe2016.com/public/admem/communal/';

export const resultsGeneral = params => get(baseUrl+'getTypev1', params)//业绩通识数据

export const professorList = params => get(baseUrl2+'get_professor', params)//专家数据

export const getProfessorData = params => get(baseUrl+'getProfessorData', params)//组员一日数据

export const getProRecordData = params => get(baseUrl+'getProRecordData', params)//组员跟踪梯度

export const getProfessorDetail = params => get(baseUrl+'getProfessorDetail', params)//组员跟踪梯度

export const   channelList = params => get(baseUrl+'channelList', params)//渠道列表

export const getChannelData = params => get(baseUrl+'getChannelData', params)//渠道业绩查看面板

export const wxgroup = params => get(baseUrl+'wxgroup', params)//群保费数据面板