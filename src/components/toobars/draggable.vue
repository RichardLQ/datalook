<template>
    <div>
        <!-- <vue-draggable-resizable @activated="onActivated"  class-name-active="my-active-class" @resizing="onResize" @dragstop="onDragStop" style="border: 1px solid black;" :drag-handle="'.drag-handle'" :z="parentValue.zindex" :x="parentValue.pageX" :y="parentValue.pageY" :w="parentValue.pageW" :h="parentValue.pageH">
            <div class="drag-handle  btns">
                <div class="btnTitle" style="display:inline-block">{{parentValue.name}}</div>
                    <div class="btnSet">
                        <el-button type="primary" v-if="download" icon="el-icon-download" circle title="导出文件" @click.stop="exportFile()"></el-button>
                        <el-button type="primary" icon="el-icon-edit" @click.stop="openDraggable(parentValue.id)" circle title="设置参数"></el-button>
                        <el-button type="info" icon="el-icon-close" circle title="关闭" @click.stop="closeDraggable(parentValue.id)"></el-button>    
                    </div>  
            </div>
            <keep-alive>
                <component ref="results" :is="getComponents"></component>
            </keep-alive>
        </vue-draggable-resizable> -->

       <vue-draggable-resizable class="draggables" @activated="onActivated"  class-name-active="my-active-class" :drag-handle="'.drag-handle'" @resizing="onResize" @dragstop="onDragStop" :z="parentValue.zindex" :x="parentValue.pageX" :y="parentValue.pageY" :w="parentValue.pageW" :h="parentValue.pageH">
            <div class="drag-handle btns">
                    <div class="btnTitle" style="display:inline-block">{{parentValue.name}}</div>
                    <div class="btnSet">
                        <el-button type="primary" v-if="download" icon="el-icon-download" circle title="导出文件" @click.stop="exportFile()"></el-button>
                        <el-button type="primary" icon="el-icon-edit" @click.stop="openDraggable(parentValue.id)" circle title="设置参数"></el-button>
                        <el-button type="info" icon="el-icon-close" circle title="关闭" @click.stop="closeDraggable(parentValue.id)"></el-button>    
                    </div>    
            </div>
            <keep-alive>
                <div>
                    <component ref="results" :is="getComponents"></component>
                </div>
                
            </keep-alive>
        </vue-draggable-resizable>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Prop, Vue, Emit  } from 'vue-property-decorator';
import resultsGeneralTable from '../conents/resultsGeneralTable.vue'//业绩通识数据面板
import oneDayTable from '../conents/oneDayTable.vue'//组员一日数据表格
import trackGradientTable from '../conents/trackGradientTable.vue'//组员跟踪梯度
import intentionDegreeTable from '../conents/intentionDegreeTable.vue'//方案发送面板
import channelPerformanceTable from '../conents/channelPerformanceTable.vue'//方案发送面板
import grouPremiumTable from '../conents/grouPremiumTable.vue'//方案发送面板
@Component({
  components: {
      resultsGeneralTable,oneDayTable,trackGradientTable,intentionDegreeTable,channelPerformanceTable,grouPremiumTable
  }
})
export default class Draggable extends Vue {
    download=false;
    @Prop({
        default: {}
    }) parentValue: object|undefined;
    items=["resultsGeneralTable","oneDayTable"];
       /**
        * 动态获取组件
         * getComponents
         */
      private get getComponents() {
           return this.$store.state.chineseToEnglish[this.parentValue.name].data;
        }
    /**
     * 关闭弹窗执行函数
     */
    @Emit('closeDraggable')
    closeDraggable(val: string){
        return val;
    }
    /**
     * 编辑弹窗执行函数
     */
    @Emit('openDraggable')
    openDraggable(val: string){
        return val;
    }
    /**
     * exportFile
     */
    public exportFile() {
        this.$refs.results.exportFile();
        // console.log(this.$store.state.export_url[this.parentValue.name]);
    }

    /**
     * 拖动状态停止时发生函数
     */
    @Emit('onDragStop')
    public onDragStop(x: number,y: number) {
        this.parentValue.pageX=x;
        this.parentValue.pageY=y;
        return this.parentValue;
    }

    /**
     * 拖动大小状态停止时发生函数
     */
    @Emit('onResize')
    public onResize(x: number,y: number,w: number,h: number) {
        this.parentValue.pageX=x;
        this.parentValue.pageY=y;
        this.parentValue.pageW=w;
        this.parentValue.pageH=h;
        this.$refs.results.changeSize(this.parentValue.id);
        return this.parentValue;
        
    }
    /**
     * getData
     */
    public getData(): void {
        this.download=true;
        this.$refs.results.getData();
        
    }
    //计算key
    private get key(){
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
    /**
     * 弹窗点中的时候执行的函数
     * 同时传递值给home组件
     */
    @Emit('onActivated')
    onActivated(){
        return this.parentValue.id;
    }
    

}
</script>
<style lang="less"  scoped>
 button{
     right: -360px;
 }
 .draggable{
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
 }
 .btnTitle{
    display: inline-block;
    line-height: 40px;
  }
 .btnSet{
     display: inline-block;
     float: right;
 }
 .handle{
     background-color: transparent;
 }
 .btns{
     padding: 10px;
     height: 40px;
     background-color: #ffffff;
 }
 .drag-handle{
  border-bottom: 1px solid #dcdfe6;
  background-color: #ffffff;
}
.my-active-class{
    z-index: 20;
    border: 0 !important;
}
.my-resizing-class{
   border: 0 !important; 
}
.draggables{
    border: 0 !important; 
    background-color: white;
}
</style>
