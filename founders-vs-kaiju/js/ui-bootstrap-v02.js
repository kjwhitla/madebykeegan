window.FVK=window.FVK||{};
FVK.uiReady=(async()=>{
  const parts=[];
  for(let i=0;i<3;i++){
    const r=await fetch(`js/ui-v02/part-${String(i).padStart(2,'0')}.txt`);
    if(!r.ok) throw new Error('Could not load v0.2 UI part '+i);
    parts.push(await r.text());
  }
  (0,eval)(parts.join(''));
  return FVK.UI;
})();
