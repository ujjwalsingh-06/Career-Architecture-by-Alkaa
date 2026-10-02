(function(){
  "use strict";

  /* Show the entrance once per browser tab/session, not on every page. */
  var KEY="opparc-loader-seen-v2";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var seen=false;
  try{ seen=sessionStorage.getItem(KEY)==="1"; }catch(e){}

  if(seen) return;
  try{ sessionStorage.setItem(KEY,"1"); }catch(e){}

  function start(){
    if(document.getElementById("opparc-site-loader")) return;

    var loader=document.createElement("div");
    loader.id="opparc-site-loader";
    loader.setAttribute("role","status");
    loader.setAttribute("aria-label","OPPARC by Alkaa Srivastav");
    loader.innerHTML=
      '<div class="opparc-loader-inner">'+
        '<div class="opparc-loader-line"></div>'+
        '<div class="opparc-loader-wordmark" aria-hidden="true"></div>'+
        '<div class="opparc-loader-sub" aria-hidden="true">Architecting Opportunities. Transforming Leadership.</div>'+
      '</div>';

    document.body.insertBefore(loader,document.body.firstChild);
    document.documentElement.style.overflow="hidden";
    document.body.style.overflow="hidden";

    var wordmark=loader.querySelector(".opparc-loader-wordmark");
    var full="OPPARC BY ALKAA SRIVASTAV";
    var i=0;

    function render(){
      var value=full.slice(0,i);
      var split=value.indexOf(" ");
      var first=split===-1?value:value.slice(0,split);
      var rest=split===-1?"":value.slice(split+1);
      wordmark.innerHTML=
        first+
        (rest?' <span class="gold">'+rest+"</span>":"")+
        '<span class="opparc-loader-cursor" aria-hidden="true"></span>';
    }

    function type(){
      render();
      if(i<full.length){
        i++;
        var delay=reduce?12:(i<=6?78:42);
        window.setTimeout(type,delay);
        return;
      }

      window.setTimeout(function(){
        loader.classList.add("is-hidden");
        document.documentElement.style.overflow="";
        document.body.style.overflow="";
        window.setTimeout(function(){ if(loader.parentNode) loader.remove(); },720);
      },reduce?180:520);
    }

    type();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }
})();