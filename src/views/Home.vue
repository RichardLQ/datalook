<template>
  <div class="home">
    <div class="product">
        <div ref="lefts" class="left">
          <toobar @getToobars="getToobars" :key="key"></toobar>
          <div class="fixeds">
                        <el-switch 
                        v-model="fixeds" @change='changeFiexd'
                        active-text="最上层"
                        inactive-text="最底层">
                        </el-switch>
            </div>
        </div>
    </div>
      <template>
        <div>
            
            <draggable ref="draggable" @onActivated="onActivated"  @closeDraggable="closeDraggable" @openDraggable="openDraggable" @onResize="onResize" @onDragStop="onDragStop" :parentValue="item.childrenValue" v-for="(item,index) in elements" :key="index"></draggable>     
        
        </div>
      </template>
      <div style="width:30% !important">
        <el-drawer ref="drawers"
        title="我是标题"
        :visible.sync="drawer"
        size="25%"
        :with-header="false"
        :close-on-press-escape="false"
        :append-to-body="false"
        :modal="false"
        :modal-append-to-body="false"
        :show-close="false"
        :wrapperClosable="false"
        >
        <div style="margin-top:100px">
          <router-view @filterParameters="filterParameters"></router-view> 
        </div>
      </el-drawer>
      </div>
  </div>
  
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue  } from 'vue-property-decorator';
import toobar from "../components/toobars/leftsides"; 
import draggable from "../components/toobars/draggable.vue";
import { channelList} from '@/request/api';
@Component({
  components: {toobar,draggable}
})
export default class Home extends Vue {
  drawer=false;//抽屉状态
  fixeds=true;//是否浮到最上层
  elements=[];//弹窗数组
  utils: any;
  $refs!: {draggable: draggable};
  /**
   * 获取子页面toobar的数据,同时新增弹窗页面并打开
   */
  protected getToobars( val: any ) {
    channelList().then(res=>{
        if(typeof res==='string'){
            if(res.indexOf('请登录')!=-1){
              this.$notify.error({title: '错误',message: '请重新登录页面'});
            }
        } 
      })
      this.drawer=true;
      this.$router.push({ path: '/'+this.$store.state.chineseToEnglish[val.name].name,query:{id: val.id}});
      const childrenValue = JSON.parse(JSON.stringify(val));
      this.elements.push({childrenValue});
      this.utils.setLocal(this.utils.getAuthName(),this.elements);
  }

  /**
   * changeFiexd
   */
  public changeFiexd() {
    if(!this.fixeds){
      this.$refs.lefts.style.zIndex=9;
    }else{
      this.$refs.lefts.style.zIndex=30;
    }
  }
  /**
   * 获取router-view传过来的筛选条件值
   * 查看drawer是false则关闭抽屉，否则打开抽屉
   * 调用弹窗的getData方法获取数据渲染
   */
  private filterParameters(val: any) {
    if(!val.drawer){
      this.drawer=false;
      return;
    }
    this.elements.forEach((item: any,index: number)=>{
      if(item.childrenValue.id==val.parentid){
        this.$refs.draggable[index].getData();
        item.filte=val;
      }
    })
    this.utils.setLocal(this.utils.getAuthName(),this.elements);
  }
  //计算key
  private get key(){
      return this.$route.name !== undefined? (this as any).$route.name + +new Date(): this.$route + +new Date()
    }

  /**
   * 关闭弹窗，删除elements里面的值即可
   */
  public closeDraggable(val: string){
    this.drawer=false;
    this.elements=this.elements.filter(n=>{ return n.childrenValue.id!=val})
    this.utils.setLocal(this.utils.getAuthName(),this.elements);
  }
  /**
   * 点击修改弹窗按钮
   * 打开抽屉
   * 页面路由跳转到当前需要打开的侧边栏
   */
  public openDraggable(val: string){
    const values=this.elements.filter(n=>{ return n.childrenValue.id==val})
    
    this.$router.push({ path: '/'+this.$store.state.chineseToEnglish[values[0].childrenValue.name].name,query:{id: val}});
    this.drawer=true;
  }

  /**
   * 选中弹窗的时候执行的函数
   * 让当前选中的弹窗z-index变大
   */
  public onActivated(val: string) {
    this.elements.map((item: any)=>{return (item.childrenValue.id==val)?item.childrenValue.zindex=20:item.childrenValue.zindex=10;})
    const values=this.elements.filter(n=>{ return n.childrenValue.id==val})
    this.$router.push({ path: '/'+this.$store.state.chineseToEnglish[values[0].childrenValue.name].name,query:{id: val}});
  }

   /**
   * 停止放大缩小更新位置(x轴,y轴，w宽度，h高度)
   */
  public onResize(val: any) {
    this.elements=this.elements.map((n: any)=>{
      if(n.childrenValue.id==val.id)
        n.childrenValue=val
      return n;
    })
    this.utils.setLocal(this.utils.getAuthName(),this.elements);
  }
  
  /**
   * 停止拖拽时更新位置(x轴,y轴)
   */
  private onDragStop(val: any) {
    this.elements=this.elements.map((n: any)=>{
      if(n.childrenValue.id==val.id)
        n.childrenValue=val
      return n;
    })
    this.utils.setLocal(this.utils.getAuthName(),this.elements);
  }
  
  /**
     * 进入主页的时候执行的函数
     */
    created(){
      channelList().then(res=>{
        if(typeof res==='string'){
            if(res.indexOf('请登录')!=-1){
              this.$notify.error({title: '错误',message: '请重新登录页面'});
            }
        } 
      })
      if(this.utils.getLocal(this.utils.getAuthName())!=null){
        this.elements=this.utils.getLocal(this.utils.getAuthName());
        this.elements.forEach((item: any,index) => {
          if(item.filte!=null){
            item.childrenValue.name;
            const setFilts=this.$store.state.chineseToEnglish[item.childrenValue.name].name;
            this.$store.state.nowFilters[setFilts]=item.filte;
            this.$nextTick(()=>{
              this.$refs.draggable[index].getData();
            })
          }
        });
      }
    }
    /**
     * 数据和dom都加载完成之后执行的钩子函数
     */
    mounted() {
      this.fixeds=false;
      this.changeFiexd();   
		}
}
</script>
<style lang="less" scoped>
@import "../assets/css/home";
</style>
