window.FVK = window.FVK || {};

FVK.App = (() => {
  function newGame(seed){
    FVK.Engine.start(seed);
  }
  function init(){
    FVK.UI.init();
    FVK.Engine.subscribe(FVK.UI.render);
    document.querySelector('#newGameBtn').addEventListener('click',()=>newGame());
    document.querySelector('#devToggleBtn').addEventListener('click',()=>document.querySelector('#devPanel').classList.toggle('hidden'));
    document.querySelector('#copyLogBtn').addEventListener('click',FVK.UI.copyLog);
    newGame();
  }
  return {init,newGame};
})();

document.addEventListener('DOMContentLoaded',FVK.App.init);
