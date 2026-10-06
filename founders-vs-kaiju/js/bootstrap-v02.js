window.FVK=window.FVK||{};
FVK.engineReady=(async()=>{
  const parts=[];
  for(let i=0;i<6;i++){
    const r=await fetch(`js/engine-v02/part-${String(i).padStart(2,'0')}.txt`);
    if(!r.ok) throw new Error('Could not load v0.2 engine part '+i);
    parts.push(await r.text());
  }
  (0,eval)(parts.join(''));
  return FVK.Engine;
})();
