window.FVK=window.FVK||{};
(async()=>{
  const summary=document.querySelector('#summary'),root=document.querySelector('#results');
  try{
    await FVK.engineReady;
    const E=FVK.Engine,checks=[];
    const check=(name,ok,detail='')=>checks.push({name,ok:!!ok,detail});
    const setup=seed=>{
      E.start(seed);
      const s=E.getState(),r=[...s.setup.revealed];
      E.chooseDistrict(r[0]);E.chooseDistrict(r[1]);
      return E.getState();
    };

    // Core geometry: setup -> Awaken -> Advance -> Wave Breach -> Strike.
    let s=setup('FVSK-SMOKE-CORE');
    check('Setup reaches Kaiju Act',s.phase==='kaiju_act',s.phase);
    check('Starting hands are 4 / 5',s.kaiju.hand.length===4&&s.washington.hand.length===5,`${s.kaiju.hand.length}/${s.washington.hand.length}`);
    s.kaiju.hand=['K13','K14','K01','K02'];
    E.awaken(['K13','K14']);s=E.getState();
    check('Awakening sets 4 Health',s.kaiju.health===4,s.kaiju.health);
    check('Awakening remains at Approach',s.kaiju.location==='approach',s.kaiju.location);
    check('Awakening creates Wave I at Breach',s.waves.active.some(w=>w.location==='breach'),JSON.stringify(s.waves.active));
    E.debug('phase',{value:'kaiju_act'});s.kaiju.hand=['K13','K01','K02'];
    E.startAdvance();E.chooseRoute('force');E.togglePay('K13');
    check('Wave at Breach reduces Gate requirement',E.summary().required===1,JSON.stringify(E.summary()));
    E.confirmAdvance();s=E.getState();
    check('Advance enters Breach',s.kaiju.location==='breach',s.kaiju.location);
    check('Leading Wave reaches District II',s.waves.active.some(w=>w.location==='district2'),JSON.stringify(s.waves.active));
    check('Wave Breaches District II',s.battlefield.district2.state==='breached',s.battlefield.district2.state);
    check('Advance creates next Wave at Breach',s.waves.active.some(w=>w.location==='breach'),JSON.stringify(s.waves.active));
    s.washington.location='breach';s.phase='washington_response';s.washington.actions=2;
    const hp=s.kaiju.health;E.strike();s=E.getState();
    check('Legal Breach Strike deals base damage',s.kaiju.health===hp-FVK.CONFIG.strikeDamage,`${hp}->${s.kaiju.health}`);

    // Turn-flow continuations.
    s=setup('FVSK-SMOKE-TURNFLOW');
    s.kaiju.hand=['K13','K14','K01','K02'];E.awaken(['K13','K14']);s=E.getState();
    s.washington.hand=['W01','W02','W03','W04','W05'];s.washington.deck=['W06','W07','W08'];
    s.washington.location='district1';s.phase='washington_response';s.washington.actions=2;
    E.moveWashington('outward');E.moveWashington('inward');s=E.getState();
    check('End-of-Response draw can open hand-limit choice',s.choice?.purpose==='hand_limit'&&s.washington.actions===0,s.choice?.purpose);
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();
    check('Hand-limit cleanup advances to Kaiju Adapt',s.phase==='kaiju_adapt',s.phase);
    s.kaiju.dormant=false;s.kaiju.hand=['K01','K02','K03','K04','K05','K06'];s.kaiju.deck=['K07','K08'];s.phase='kaiju_adapt';s.choice=null;
    E.adaptDraw();s=E.getState();
    check('Adapt draw can open hand-limit choice',s.choice?.purpose==='hand_limit',s.choice?.purpose);
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();
    check('Adapt cleanup starts next exchange',s.phase==='kaiju_act'&&s.exchange===2,`${s.phase}/E${s.exchange}`);

    // Card-ordering / Evolution search.
    s=setup('FVSK-SMOKE-INSTINCT');s.kaiju.hand=['K01'];s.kaiju.deck=['K02','K03','K04','K05'];s.phase='kaiju_act';
    E.playKaiju('K01','instinct');s=E.getState();
    check('K01 exposes top 3 for ordering',s.choice?.kind==='order'&&s.choice.ids.length===3,JSON.stringify(s.choice?.ids));
    E.resolveChoice(['K04','K03','K02']);s=E.getState();
    check('K01 selected order returns to deck',s.kaiju.deck.slice(0,4).join(',')==='K04,K03,K02,K05',s.kaiju.deck.join(','));
    s.phase='kaiju_act';s.choice=null;s.kaiju.hand=['K01'];s.kaiju.deck=['K02','K03','K04','K05','K06'];s.kaiju.evolutions.head='K16';
    E.playKaiju('K01','instinct');s=E.getState();
    check('K16 HEAD increases a look effect by 1',s.choice?.ids.length===4,s.choice?.ids.length);

    // Fortification rules.
    s=setup('FVSK-SMOKE-FORTS');s.phase='washington_response';s.washington.actions=2;s.washington.location='district1';s.washington.hand=['W01','W03','W04','W02'];
    E.playWashington('W01','fortify');s=E.getState();
    check('First Gate-shaper installs',s.battlefield.district1.forts.includes('W01'),JSON.stringify(s.battlefield.district1.forts));
    s.phase='washington_response';s.washington.actions=2;
    check('Second Gate-shaper is illegal',E.validFortify('W02').ok===false,E.validFortify('W02').reason);
    E.playWashington('W03','fortify');s=E.getState();
    s.phase='washington_response';s.washington.actions=2;E.playWashington('W04','fortify');s=E.getState();
    check('Third Fortification requires replacement',s.choice?.purpose==='replace_fort',s.choice?.purpose);
    E.resolveChoice(s.choice.ids[0]);s=E.getState();
    check('Replacement keeps District at capacity 2',s.battlefield.district1.forts.length===2,JSON.stringify(s.battlefield.district1.forts));

    // K17 and final Core.
    s=setup('FVSK-SMOKE-K17');s.kaiju.dormant=false;s.kaiju.health=4;s.kaiju.location='breach';s.phase='kaiju_act';s.kaiju.evolutions.body='K17';s.kaiju.hand=['K01'];
    const need=E.gate('district2').adapt;E.startAdvance();E.chooseRoute('adapt');E.setCarapace('K01');
    check('K17 replaces 1 Overrun Health with a card',E.summary().healthCost===Math.max(0,need-1),JSON.stringify(E.summary()));
    E.confirmAdvance();s=E.getState();
    check('K17 substitution discards chosen card',s.kaiju.discard.includes('K01'),JSON.stringify(s.kaiju.discard));

    s=setup('FVSK-SMOKE-CORE');s.kaiju.dormant=false;s.kaiju.health=2;s.kaiju.location='district1';s.kaiju.hand=['K13','K10'];s.kaiju.deck=[];s.waves.active=[];s.waves.supply=[];s.phase='kaiju_act';s.washington.location='cityCore';
    E.startAdvance();E.chooseRoute('force');E.togglePay('K13');E.togglePay('K10');E.confirmAdvance();s=E.getState();
    check('Core entry begins final 2-action Response',s.finalResponse&&s.phase==='washington_response'&&s.washington.actions===2,`${s.phase}/${s.washington.actions}`);
    E.strike();s=E.getState();
    check('First final Strike leaves a second action',s.kaiju.health===1&&s.washington.actions===1,`${s.kaiju.health}/${s.washington.actions}`);
    E.strike();s=E.getState();
    check('Second final Strike may win',s.winner==='washington'&&s.kaiju.health===0,s.winner);

    const passed=checks.filter(x=>x.ok).length;
    summary.textContent=`${passed}/${checks.length} checks passed`;
    summary.className='summary '+(passed===checks.length?'pass':'fail');
    root.innerHTML=checks.map(x=>`<div class="row ${x.ok?'pass':'fail'}">${x.ok?'PASS':'FAIL'} — ${x.name}${x.detail?` <code>${String(x.detail).replace(/</g,'&lt;')}</code>`:''}</div>`).join('');
  }catch(error){
    summary.textContent='Smoke test failed to load: '+String(error.message||error);
    summary.className='summary fail';
    console.error(error);
  }
})();
