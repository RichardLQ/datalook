<template>
   <div>
       <ul>
           <li v-for="(item,index) in typeList" :key="index">
               <div v-drag="{set:set}"><el-tag :type="item.type==1?'default':'danger'" size="mini" effect="dark">{{item.type==1?'销售':'运营'}}</el-tag> &nbsp;{{index}}</div>
           </li>
       </ul>
   </div>
</template> 
<script>
export default {
    name: "leftsides",
    components: {},
    data(){
        return {
            typeList:[],
            sendHome:{
                pageX:0,
                pageY:0,
                pageW:600,
                pageH:480,
                name:'',
                id:'',
            },
        }
        },
    methods:{
        randoms(){
           return Math.floor(Math.random() * 100 + 1);
        },
        set(x,y,name,id){
            this.sendHome.pageX=x;
            this.sendHome.pageY=y;
            this.sendHome.pageX=400+this.randoms();
            this.sendHome.pageY=200+this.randoms();
            const names=name.split(' ')
            this.sendHome.name=names[1];
            this.sendHome.id=id;
            this.sendHome.zindex=10;
            
        },
        
    },
    watch:{
        sendHome:{
            deep:true,
			handler() {
                this.$emit('getToobars',this.sendHome);
			}
        }
    },
    mounted() {
        this.typeList=this.$store.state.chineseToEnglish;
    },
    directives:{
				drag(el, bindings){
					el.onmousedown = function(e){
						const disx = e.pageX - el.offsetLeft;
						const disy = e.pageY - el.offsetTop;
						document.onmousemove = function (e){
							el.style.left = e.pageX - disx + 'px';
							el.style.top = e.pageY - disy + 'px';
						}
						document.onmouseup = function(e){
                            bindings.value.set(e.pageX-e.srcElement.scrollWidth,e.pageY,e.srcElement.innerText,Number(Math.random().toString().substr(3,length) + Date.now()).toString(36));
                            el.style.left=0;
                            el.style.top=0;
							document.onmousemove = document.onmouseup = null;
						}
					}
				}
			},
}
</script>
<style lang="less" scoped>
ul{
    width :100%;
    padding: 0;
    li{
        width: 100%;
        height: 60px;
        list-style: none;
        text-align: center;
        line-height: 60px;
        margin-top: 10px;
        cursor: pointer;
        position: relative;
        text-align: left;
        padding-left: 10px;
        box-sizing: border-box;
        
    }
    li:first-child{
        margin-top: 20px;
    }
    div{
        background-color: #ecf5ff;
    }
    li>div{
            position: absolute;
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            top: 0;
            left: 0;
        }
}
.fixeds{
  position: absolute;
    bottom: 40px;
    text-align: center;
    width: 100%;
}
</style>
