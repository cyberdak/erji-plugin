var host = "www.erji.net";
var protocol = "http";
var hashMap = {  
    Set : function(key,value){this[key] = value},  
    Get : function(key){return this[key]},  
    Contains : function(key){return this.Get(key) == null?false:true},  
    Remove : function(key){delete this[key]}  
}

hashMap.Set(130,"行业信息");
hashMap.Set(138,"新手入门");
hashMap.Set(2,"耳机论坛");
hashMap.Set(133,"高端耳机系统讨论区")
hashMap.Set(23,"耳塞/随身听综合区");
hashMap.Set(142,"随身音频/视频播放器");
hashMap.Set(24,"耳机论坛精华区");
hashMap.Set(125,"电脑音频");


window.onload = function(){
    console.log("start ext...");
    init();
    visit();
}

function init(){
    
    if(localStorage["ERJI_INIT"] != true){
        
        localStorage["ERJI_INIT"] = true;
    }
}

function visit() {
    var url = document.location.href;
    console.log("url :"+url);
    var validF = url.indexOf("http://www.erji.net/thread.php");
    console.log("validF",validF);
    if(validF == 0){
        saveHistory(url);
        displayNav();
    }
    var validErji = url.indexOf("http://www.erji.net/");
    console.log("validErji",validErji);
    if(validErji == 0){
        displayNav();
    }
}

function getTitle(){
    var title = document.title;
    console.log("title:"+title);
    var index = title.indexOf(" ");
    console.log("title index : "+index);
    console.log("real title :"+ title.substring(0,index));
    return title.substring(0,index);
}

function saveHistory(url){
    var title = getTitle(url);
    console.log("title:"+title);
    var fid = getFid(url);
    console.log("fid ： "+fid);
    
    var h = localStorage['erji_history'] ==  "" ? [] : localStorage['erji_history'];
    var history;
    if(h != []){
      history = JSON.parse(h);
    }
    console.log(history);
   var has = false;
    for(var f in history){
        var data = history[f];
        if(data.fid == fid){
            has = true;
        }
    }
    if(!has){
        var entry = {
            fid : fid,
            name : title
        }
        console.log("entry:"+entry);
        history.push(entry);
        localStorage['erji_history'] = JSON.stringify(history);
    }
}

function getFid(url){
    return url.substr(url.indexOf("?fid=")+5,url.length-url.indexOf("?fid="));
}

function displayNav(){
    var as = document.getElementsByTagName("a");
    var value = "";
    for(var i=0; i<as.length; i++){
        value = as[i].href;
        if(value == 'http://www.erji.net/index.php'){
               var nav = "<div id='nav' class='nav'><ul>";
               var history = JSON.parse(localStorage['erji_history'] || []);
               for(var f in history){
                   nav += '<li><a href="http://www.erji.net/thread.php?fid='+history[f].fid+'">'+history[f].name+'</a></li>';
               }
               nav +=  "</ul></div>";
            //    var n = document.createTextNode(nav);
            //    var node = document.createElement("div");
            //    node.appendChild(n);
            //    as[i].appendChild(node);
               $(as[i]).after(nav);
               
               $(as[i]).hover(function(){
                   $("#nav").removeClass("nav");
                   $("#nav").addClass("nav-show");
               },function(){
                   
               });
               
               $("#nav").hover(function(){
                   
               },function(){
               
                   $("#nav").removeClass("nav-show");
                   $("#nav").addClass("nav");
               })
        }
    }
}