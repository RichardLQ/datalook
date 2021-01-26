// @ts-nocheck
var list=[];
var global_dom;
var is_first=true;
var tab_index=0;
var isjob=1;
var global_selected='';
var on_the_job_list=[];//在职专家
var not_on_the_job_list=[];//不在职专家
var global_where={};
var global_is_multiple=true;

var plugin={
    render:function(dom,where={},css,is_multiple=true,param=null){
        // console.log(param);
        global_is_multiple=is_multiple;
        global_dom=dom;
        global_where=where;
        var self=this;
        var html="";
        html+="<div class='plugin-main'>";
        html+="    <div class='content'>";
        if(param==null || (param.auth!=3 || param.isleader==1)){
            html+="  <div class='search'>";
            html+="      <input type='text' id='keywords' style='width:60%' name='keyword' placeholder='请输入'/>";
            html+=`      <button class='level-btn'  data-val='A'>A</button>
                        <button class='level-btn'  data-val='B'>B</button>
                        <button class='level-btn'  data-val='C'>C</button>
                        <button class='level-btn' data-val='D'>D</button>
                        <button class='level-btn' data-val='1'>深圳区</button>
                        <button class='level-btn' data-val='9'>山东区</button>
                        <button class='level-btn' data-val='0'>其他区</button>`  
            html+=" </div>";
            html+=" <div class='tab'>";
            html+="    <div class='lab lab-left jobs active' >";
            html+="         <span>在职</span>";
            html+="    </div>";
            html+="    <div class='lab lab-right jobs' >";
            html+="         <span>离职</span>";
            html+="    </div>";
            html+=" </div>";
        }
        if(param==null){
            param.datas='';
        }else{
            global_selected=param.datas;
        }
        html+="        <div class='list'>";
        html+="           数据加载中...";
        html+="        </div>";
        html+="        <div class='btn-group'>";
        html+="            <button class='close' >关闭</button>";
        html+="            <button class='confirm'>确定选择(0)</button>";
        html+="            <button class='clear' >清空选项</button>";
        html+="        </div>";
        html+="    </div>";
        html+="</div>";
        if($(".plugin-main").length==0){
            $("body").append(html);
            $('.lab-left').click(function(){
                tabChange(this,1);
            })
            $('.lab-right').click(function(){
                tabChange(this,0);
            })
            $('.close').click(function(){
                close();
            })
            $('.confirm').click(function(){
                confirm();
            })
            $('.clear').click(function(){
                clear();
            })
            $('#keywords').keypress(function(){
                search();
            })
            $('.level-btn').click(function(){
                $("input[name=keyword]").val('');
                if($(this).hasClass('level-active')==false){
                    $(this).addClass("level-active")
                }else{
                    $(this).removeClass("level-active")
                }
                var select_val_string=[];
                var selected_val_number=[];
                $('.level-btn').each(function(index,dom){
                    if($(dom).hasClass('level-active')==true){
                        if(typeof($(dom).data('val'))=='string'){
                            select_val_string.push($(dom).data('val'))
                        }else{
                            selected_val_number.push($(dom).data('val'))
                        }
                    }
                })
                localStorage.setItem('selected_val_number',selected_val_number);
                localStorage.setItem('select_val_string',select_val_string);
                showStateRender(selected_val_number,select_val_string);
            })
        }
        // console.log(global_selected);
        requestAjax(function(data){
            list=data;
            console.log(list);
            // console.log(param.team);
            
            renderDoom(list);
        },isjob)
        var offset=global_dom.offset();
        if(!css){
            $(".plugin-main").css({
                top:offset.top+40,
                left:offset.left-10
            })
        }else{
            $(".plugin-main").css(css)
        }
        dom.click(function(event){
            // $("body").append("<div class='mask' onclick='plugin.close()'></div>");
            $("body").append("<div class='mask'></div>");
            $('.mask').click(function(){
                close()
            })
            $(".bg").click(function() {
                $(".plugin-main").fadeIn();
            });
            $(".mask").fadeIn();
            $(".plugin-main").fadeIn();  
        })
        if(param!=null && (param.auth==3 && param.isleader!=1)){
            $(".plugin-main").css('min-width','100px')
        }
    },
     
}

 //全选
 function selectAll(){
    console.log('selectAll');
    $(".plugin-main .list").find('input[name=proid]').each(function () {
        $(this).prop('checked',true)
    })
}
//反选
function backAll(){
    console.log('backAll');
    $(".plugin-main .list").find('input[name=proid]').each(function () {
        if($(this).prop('checked')){
            $(this).prop('checked',false)
        }else{
            $(this).prop('checked',true)
        }
    })
}
function search(){
    $(".level-btn").removeClass("level-active")
    /**
     * 使用test方法实现模糊查询
     * @param  {Array}  data     原数组
     * @param  {String} keyWord  查询的关键词
     * @return {Array}           查询的结果
     */
    function fuzzyQuery(json, keyWord) {
        var reg =  new RegExp(keyWord);
        $('.plugin-main .list').find('input[name=proid]').each(function () {
            if(!keyWord){
                $(this).parent().css("cssText","display:none !important");
                $(this).parent().css("cssText","display:block");
            }else{
                $(this).parent().css("cssText","display:block");
                $(this).parent().css("cssText","display:none !important");
                var name = $(this).data('name');
                if (reg.test(name)) {
                    $(this).parent().css("cssText","display:none !important");
                    $(this).parent().css("cssText","display:block");
                }
            }
        })
        return true;
    }
    var keyword=$('input[name=keyword]').val();
    var json=JSON.stringify(list)
    fuzzyQuery(json,keyword);
}
function clear(){
    console.log('clear');
    $(".plugin-main .list").find('input[type=checkbox]').each(function () {
        $(this).prop('checked',false)
    })
    global_dom.val('');
    global_dom.attr('data-id','');
    monitorSelect();
}
function confirm(){
    console.log('confirm');
    var proVal=[];
    var proName=[];
    $('input[name=proid]').each(function () {
        if ($(this).is(':checked')) {
            proVal.push($(this).val())
            proName.push($(this).data('name'))
        }
    })
    global_dom.val(proName.join(','));
    global_dom.attr('data-id',JSON.stringify(proVal));
    $(".plugin-main").fadeOut();
    $(".mask").remove();
    //判断是否为函数
    try {
        if(typeof selectCallback === "function") { //是函数    其中 FunName 为函数名称
            selectCallback(proVal,proName);
        } else { //不是函数
            console.log('未定义插件回调函数selectCallback(arr1,arr2),定义此函数可以实现【确定选择】按钮回调');
        }
    } catch(e) {}

   
}
function level_click(that){
    $("input[name=keyword]").val('');
    if($(that).hasClass('level-active')==false){
        $(that).addClass("level-active")
    }else{
        $(that).removeClass("level-active")
    }
    var select_val_string=[];
    var selected_val_number=[];
    $('.level-btn').each(function(index,dom){
        if($(dom).hasClass('level-active')==true){
            if(typeof($(dom).data('val'))=='string'){
                select_val_string.push($(dom).data('val'))
            }else{
                selected_val_number.push($(dom).data('val'))
            }
        }
    })
    localStorage.setItem('selected_val_number',selected_val_number);
    localStorage.setItem('select_val_string',select_val_string);
    showStateRender(selected_val_number,select_val_string);
    
}
function showStateRender(selected_val_number=[],select_val_string=[]){
    $(".team").css("cssText","display:block");
    $(".team label").each(function(index,dom){
        $(dom).css("cssText","display:block;cursor:pointer;");
    })
    if(select_val_string.length!=0){
        var temp_select_val_string=select_val_string;
        select_val_string=[];
        temp_select_val_string.forEach(item => {
            $(".level-btn[data-val="+item+"]").addClass('level-active')
            select_val_string.push(item)
            
        });
        $(".team .show").each(function(index,dom){
            if(($.inArray($(dom).data('level'),select_val_string)==-1)){
                $(dom).css("cssText","display:none !important;cursor:pointer;");
            }
        })
    }
    if(selected_val_number.length!=0){
        var temp_selected_val_number=selected_val_number;
        selected_val_number=[];
        temp_selected_val_number.forEach(item => {
            $(".level-btn[data-val="+item+"]").addClass('level-active')
            selected_val_number.push(parseInt(item))
        });
        $(".team label").each(function(index,dom){
            if($.inArray($(dom).data('parentid'),selected_val_number)==-1){
                $(dom).parents('.team').css("cssText","display:none !important");
            }
        })
    }
}
function close(){
    $(".plugin-main").fadeOut();
    $(".mask").remove();
    console.log('close');
}
function tabChange(that,isjob){
    var self=this;
    tab_index=$(that).index()
    $(".tab .lab").removeClass('active');
    $(that).addClass('active');
    $(".plugin-main .list").find('input[type=checkbox]').each(function () {
        if($(this).prop('checked')){
            $(this).prop('checked',false)
        }
    })
    requestAjax(function(data){
        list=data;
        console.log(list);
        renderDoom(list);
    },isjob)
    monitorSelect();
   each_isjob(tab_index);
}

function requestAjax(callback,isjob){
    if(isjob===0 && not_on_the_job_list.length>0){
        callback(not_on_the_job_list);
        return true;
    }else if(isjob==1 && on_the_job_list.length>0){
        callback(on_the_job_list);
        return true;
    }
    // var url=window.location.protocol+"//"+window.location.host+"/public/admem/communal/get_professor";
    var url ='https://wx1.dahe2016.com/public/admem/communal/get_professor';
    $(".plugin-main .list").html('数据加载中...');
    global_where.isjob=isjob;
    $.ajax({
        url:url,
        data:global_where,
        type:"post",
        success:function(res){
            if(isjob==0){
                not_on_the_job_list=res.data;
                callback(not_on_the_job_list);
            }else if(isjob==1){
                on_the_job_list=res.data;
                callback(on_the_job_list);
            }
        }
    })
}
function renderDoom(list){
    var self=this;
    var str="";
   for (const key in list) {
       if (list.hasOwnProperty(key)) {
           const item = list[key];
           str+="<div class='team'>";
           if(global_is_multiple){
                str+="<label style='color:#000;cursor:pointer' data-parentid="+item.parentid+" for='team_"+item.id+"' class='frist'><input type='checkbox'  data-tid='"+item.id+"' name='team' id='team_"+item.id+"'>"+item.title+"</label>";
           }else{
            str+="<label style='color:#000;cursor:pointer' data-parentid="+item.parentid+" for='team_"+item.id+"' class='frist'>"+item.title+"</label>";
           }
            for (const index in item.children ) {
                if (item.children.hasOwnProperty(index)) {
                    const row = item.children[index];
                    var level=row.level;
                    if(""!=level){
                        level="["+level+"]";
                    }
                    var online_class=row.online_state==1 ? "layui-bg-green" : "layui-bg-gray"
                    str+="<label style='cursor:pointer;' data-parentid="+item.parentid+" class='show' data-isjob='"+row.isjob+"' data-level="+row.level+"><input type='checkbox' data-isjob='"+row.isjob+"' name='proid' data-tid='"+row.tid+"' data-name='"+row.proname+"' value='"+row.id+"' id='"+row.id+"'><span style='color:#1586c8;font-weight:700;'>"+level+"</span>"+row.proname+"<span data-id="+row.id+"  class='layui-badge-dot "+online_class+"'></span></label>";
                }
            }
           str+="</div>";
       }
   }
    $(".plugin-main .list").html(str);
    each_isjob(tab_index);

    var selected_val_number=localStorage.getItem('selected_val_number');
    selected_val_number=selected_val_number=='' || selected_val_number==null ? [] : selected_val_number.split(',');

    var select_val_string=localStorage.getItem('select_val_string');
    select_val_string=select_val_string=='' || select_val_string==null ? [] : select_val_string.split(',');
    showStateRender(selected_val_number,select_val_string);

    //团队全选
    $(".plugin-main .list").find('input[name=team]').on('click',function(){
        var checked=false;
        var checked= $(this).prop('checked') ? true : false;
        var tid=$(this).data('tid')
        $("input[data-tid="+tid+"]").each(function(){
            if(checked==true && $(this).parent().css('display')=='none'){
                return true;
            }
            $(this).prop('checked',checked)
            
        });
        monitorSelect(this);
    })
    // console.log(global_selected);
    // console.log(global_is_multiple);
    if(global_is_multiple){
        console.log(global_selected);
        if(global_selected!=''){
            var temps=global_selected.split(',');
            temps.forEach(items=>{
                var temDom=$('input[data-name="'+items+'"]')[0];
                $(temDom).prop('checked',true)
                monitorSelect($('input[data-name="'+items+'"]')[0]);
            })
        }
    }else{
        var temDom=$('input[data-name="'+global_selected+'"]')[0];
        $(temDom).prop('checked',true)
        monitorSelect($('input[data-name="'+global_selected+'"]')[0]);
    }
    //监听选中
    $(".plugin-main .list").find('input[name=proid]').on('click',function(){
        console.log(this);
        
       monitorSelect(this);
    })

    //状态点击
    $(".plugin-main").on('click','.layui-bg-green',function(event){
        var that=this;
        event.preventDefault();
        save_online_state({proid:$(that).data('id'),online_state:2},function(res){
            layer.msg(res.msg)
            $(that).removeClass('layui-bg-green');
            $(that).addClass('layui-bg-gray');
        })
    })
    $(".plugin-main").on('click','.layui-bg-gray',function(event){
        var that=this;
        event.preventDefault();
        save_online_state({proid:$(that).data('id'),online_state:1},function(res){
            layer.msg(res.msg)
            $(that).removeClass('layui-bg-gray');
            $(that).addClass('layui-bg-green');
        })
    })
    function save_online_state(data,callback){
        var url=window.location.protocol+"//"+window.location.host+"/public/admem/communal/edit_online_state";
        $.ajax({
            url:url,
            data:data,
            methods:"POST",
            success:callback
        })
    }
}
function monitorSelect(that){
    var num=0;
    console.log(that);
    $("input[name=proid]").each(function(){
        if($(this).prop('checked') && $(this).css('display')!='none'){
            num++;
        }
        if(global_is_multiple==false){
            $(".plugin-main .list").find('input[name=proid]').each(function () {
                $(this).prop('checked',false)
            })
            if($(that).css('display')!='none'){
                $(that).prop('checked',true)
            }
        }
        
    });
   
    $(".confirm").text("确定选择("+num+")");
}
function each_isjob(index){
    $(".list label").each(function(){
        var self=this;
        var isjob=$(this).data('isjob');
        if(typeof(isjob)!='undefined'){
            $(self).removeClass('show')
            $(self).addClass('hidden')
            if(index==0 && isjob==1){
                $(self).removeClass('hidden')
                $(self).addClass('show');
            }else if(index==1 && isjob==0){
                $(self).removeClass('hidden')
                $(self).addClass('show');
            }
        }
    })
}
export default plugin;