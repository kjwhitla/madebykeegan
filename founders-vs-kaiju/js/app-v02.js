window.FVK=window.FVK||{};
FVK.App=(()=>{
  function newGame(seed){FVK.Engine.start(seed)}
  async function init(){
    try{
      await Promise.all([FVK.engineReady,FVK.uiReady]);
      FVK.UI.init();
      FVK.Engine.subscribe(FVK.UI.render);
      document.querySelector('#newGameBtn').addEventListener('click',()=>newGame());
      document.querySelector('#devToggleBtn').addEventListener('click',()=>document.querySelector('#devPanel').classList.toggle('hidden'));
      document.querySelector('#copyLogBtn').addEventListener('click',FVK.UI.copyLog);
      newGame();
    }catch(error){
      console.error(error);
      document.body.innerHTML='<main style="max-width:900px;margin:40px auto;font-family:system-ui"><h1>Prototype failed to load</h1><p>'+String(error.message||error)+'</p><p>Serve this folder over HTTP rather than opening index.html directly.</p></main>';
    }
  }
  return{init,newGame};
})();
document.addEventListener('DOMContentLoaded',()=>FVK.App.init());
