(function(){
  "use strict";
  var KEY="opparc-loader-seen-v1";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen=false; try{seen=sessionStorage.getItem(KEY)==="1";}catch(e){}
  if(seen){return;}
  try{sessionStorage.setItem(KEY,"1");}catch(e){}
  var loader=document.createElement("div");
  loader.id="opparc-site-loader";
  loader.setAttribute("aria-label","OPPARC by Alkaa Srivastav");
  loader.innerHTML='<div class="opparc-loader-inner"><div class="opparc-loader-line"></div><div class="opparc-loader-wordmark" aria-hidden="true"></div><div class="opparc-loader-sub" aria-hidden="true">Career Architecture &amp; Leadership</div></div>';
  document.documentElement.style.overflow="hidden";
  document.body.insertBefore(loader,document.body.firstChild);
  var wordmark=loader.querySelector(".opparc-loader-wordmark");
  var full="OPPARC BY ALKAA SRIVASTAV";
  var i=0;
  function type(){
    if(i<=full.length){
      var value=full.slice(0,i);
      var parts=value.split(" ");
      var first=parts.shift()||"";
      var rest=parts.join(" ");
      wordmark.innerHTML=first+(rest?' <span class="gold">'+rest+'</span>':'')+'<span class="opparc-loader-cursor"></span>';
      i++; setTimeout(type, reduce?18:(i<7?90:55));
    }else{
      setTimeout(function(){loader.classList.add("is-hidden");document.documentElement.style.overflow="";setTimeout(function(){loader.remove();},700);},reduce?250:650);
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",type,{once:true}); else type();
})();
