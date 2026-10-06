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


    // P0 trigger queue: simultaneous Wave prevention.
    s=setup('FVCK-SMOKE-P0-PREVENT');
    s.kaiju.dormant=false;s.kaiju.health=4;s.phase='kaiju_act';s.kaiju.location='approach';s.kaiju.hand=['K14'];
    s.waves.active=[{name:'Wave 1',location:'breach',created:1}];s.waves.supply=[];
    s.battlefield.district2.forts=['W10','W18'];
    E.playKaiju('K14','manifest');s=E.getState();
    check('W10 + W18 asks Washington for trigger order',s.choice?.purpose==='wave_prevention_order'&&s.choice.kind==='order',s.choice?.purpose);
    E.resolveChoice(['W18','W10']);s=E.getState();
    check('W18-first destroys Wave and preserves unused W10',s.waves.active.length===0&&s.battlefield.district2.forts.includes('W10')&&!s.battlefield.district2.forts.includes('W18'),JSON.stringify(s.battlefield.district2.forts));
    check('Wave prevention queue completes cleanly',s.phase==='washington_response'&&!s.choice&&!s.triggerQueue.length,`${s.phase}/q${s.triggerQueue.length}`);

    // P0: K14 + River Crossing + Breach capacity.
    s=setup('FVCK-SMOKE-P0-K14-D03');
    s.battlefield.district2.districtId='D03';s.battlefield.district2.state='fortified';s.battlefield.district2.forts=['W01','W03'];
    s.kaiju.dormant=false;s.kaiju.health=4;s.kaiju.evolutions.tail='K14';s.phase='kaiju_act';s.kaiju.location='approach';s.kaiju.hand=['K14'];
    s.waves.active=[{name:'Wave 1',location:'breach',created:1}];s.waves.supply=[];
    E.playKaiju('K14','manifest');s=E.getState();
    check('K14 chooses Breach capacity loss first',s.choice?.purpose==='breach_capacity_loss'&&s.choice.who==='kaiju',s.choice?.purpose);
    E.resolveChoice('W01');s=E.getState();
    check('River Crossing then resolves its extra loss',s.choice?.purpose==='d03_discard_fort'&&s.choice.who==='washington',s.choice?.purpose);
    E.resolveChoice('W03');s=E.getState();
    check('K14 + D03 leaves legal Breached District',s.battlefield.district2.state==='breached'&&s.battlefield.district2.forts.length===0,JSON.stringify(s.battlefield.district2));

    // P0: W12 Orderly Retreat moves a companion before Ruin cleanup.
    s=setup('FVCK-SMOKE-P0-W12');
    s.battlefield.district2.state='breached';s.battlefield.district2.forts=['W12','W14'];s.battlefield.district1.forts=['W04'];
    s.kaiju.dormant=false;s.kaiju.health=4;s.kaiju.location='breach';s.phase='kaiju_act';s.kaiju.hand=['K13'];s.waves.active=[];s.waves.supply=[];s.washington.location='district2';
    E.startAdvance();E.chooseRoute('force');E.togglePay('K13');E.confirmAdvance();s=E.getState();
    check('W12 moves Washington inward on Ruin',s.washington.location==='district1',s.washington.location);
    check('W12 moves companion Fortification out before cleanup',s.battlefield.district1.forts.includes('W14')&&!s.washington.discard.includes('W14'),JSON.stringify({d1:s.battlefield.district1.forts,discard:s.washington.discard}));
    check('W12 source District finishes Ruined and empty',s.battlefield.district2.state==='ruined'&&s.battlefield.district2.forts.length===0,JSON.stringify(s.battlefield.district2));

    // P0: W16 free Fortify can replace the existing Gate-shaper in a full destination.
    s=setup('FVCK-SMOKE-P0-W16');
    s.phase='washington_response';s.washington.actions=2;s.washington.location='district2';
    s.battlefield.district1.forts=['W01','W03'];s.washington.hand=['W16','W02','W04','W05','W06'];
    E.playWashington('W16','command');s=E.getState();
    E.resolveChoice('district1');s=E.getState();E.resolveYesNo(true);s=E.getState();E.resolveSpecialPick('W02');s=E.getState();
    check('Lafayette only offers legal Gate-shaper replacement',s.choice?.purpose==='w16_replace_free'&&s.choice.ids.length===1&&s.choice.ids[0]==='W01',JSON.stringify(s.choice?.ids));
    E.resolveSpecialPick('W01');s=E.getState();
    check('Lafayette replacement leaves legal full defense',s.battlefield.district1.forts.includes('W02')&&s.battlefield.district1.forts.includes('W03')&&s.washington.actions===1,JSON.stringify(s.battlefield.district1.forts));

    // P0: nested hand-limit continuation — False Works.
    s=setup('FVCK-SMOKE-P0-W06');
    s.phase='washington_response';s.washington.actions=2;s.washington.location='district1';
    s.battlefield.district1.forts=['W03'];s.washington.hand=['W06','W01','W02','W04','W05'];s.washington.deck=['W07','W08'];
    E.playWashington('W06','command');s=E.getState();E.resolveChoice('W03');s=E.getState();
    check('False Works return + draw can open hand limit',s.choice?.purpose==='hand_limit',s.choice?.purpose);
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();
    check('False Works hand-limit cleanup consumes only its action',s.phase==='washington_response'&&s.washington.actions===1&&!s.choice,`${s.phase}/${s.washington.actions}`);

    // P0: Market Ward and Abigail Adams nested draw choices.
    s=setup('FVCK-SMOKE-P0-MARKET');
    s.battlefield.district2.districtId='D05';s.battlefield.district2.state='fortified';s.battlefield.district2.forts=[];
    s.kaiju.dormant=false;s.kaiju.health=4;s.phase='kaiju_act';s.kaiju.location='approach';s.kaiju.hand=['K14'];s.waves.active=[{name:'Wave 1',location:'breach',created:1}];s.waves.supply=[];
    s.washington.hand=['W01','W02','W03','W04','W05'];s.washington.deck=['W06','W07','W08'];
    E.playKaiju('K14','manifest');s=E.getState();
    check('Market Ward opens keep choice after Wave Breach',s.choice?.purpose==='market_ward',s.choice?.purpose);
    E.resolveChoice(s.choice.ids[0]);s=E.getState();check('Market Ward keep can open hand limit',s.choice?.purpose==='hand_limit',s.choice?.purpose);
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();check('Market Ward nested limit resumes Kaiju action',s.phase==='washington_response'&&!s.choice&&!s.triggerQueue.length,s.phase);

    s=setup('FVCK-SMOKE-P0-W17');
    s.battlefield.district2.state='fortified';s.battlefield.district2.forts=['W17'];
    s.kaiju.dormant=false;s.kaiju.health=4;s.phase='kaiju_act';s.kaiju.location='approach';s.kaiju.hand=['K14'];s.waves.active=[{name:'Wave 1',location:'breach',created:1}];s.waves.supply=[];
    s.washington.hand=['W01','W02','W03','W04','W05'];s.washington.deck=['W06','W07','W08'];
    E.playKaiju('K14','manifest');s=E.getState();
    check('Abigail Adams opens keep choice after Wave Breach',s.choice?.purpose==='w17_wave_breach',s.choice?.purpose);
    E.resolveChoice(s.choice.ids[0]);s=E.getState();check('Abigail Adams keep can open hand limit',s.choice?.purpose==='hand_limit',s.choice?.purpose);
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();check('Abigail Adams nested limit resumes queue',s.phase==='washington_response'&&!s.choice&&!s.triggerQueue.length,s.phase);

    // P0: K10 post-Advance draw continuation.
    s=setup('FVCK-SMOKE-P0-K10');
    s.kaiju.dormant=false;s.kaiju.health=4;s.kaiju.location='approach';s.phase='kaiju_act';
    s.kaiju.hand=['K10','K01','K02','K04','K06','K08'];s.kaiju.deck=['K11','K12','K15'];s.waves.active=[{name:'Wave 1',location:'breach',created:1}];s.waves.supply=[];
    E.playKaiju('K10','manifest');s=E.getState();E.chooseRoute('force');E.confirmAdvance();s=E.getState();
    check('K10 post-Advance draw can open hand limit',s.choice?.purpose==='hand_limit',s.choice?.purpose);
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();
    check('K10 hand-limit cleanup reaches Washington Response',s.phase==='washington_response'&&!s.choice&&!s.triggerQueue.length,s.phase);

    // P0: Signal Beacon can interrupt a Signature for hand cleanup, then resume it.
    s=setup('FVCK-SMOKE-P0-SIGNAL');
    s.kaiju.dormant=false;s.kaiju.health=4;s.kaiju.location='breach';s.phase='kaiju_act';s.kaiju.hand=['K14','K01','K02'];
    s.washington.location='district2';s.battlefield.district2.forts=['W08'];s.washington.hand=['W01','W02','W03','W04','W05'];s.washington.deck=['W06','W07'];
    E.playKaiju('K14','instinct');s=E.getState();
    check('Signal Beacon hand limit pauses Signature resolution',s.choice?.purpose==='hand_limit'&&s.deferredKaijuPlay?.id==='K14',JSON.stringify(s.deferredKaijuPlay));
    E.resolveChoice([s.choice.ids[0]]);s=E.getState();
    check('Signal Beacon resumes the Signature after cleanup',s.choice?.purpose==='k14_tide_top'&&!s.kaiju.hand.includes('K14'),s.choice?.purpose);
    E.resolveChoice(s.choice.ids[0]);s=E.getState();
    check('Signal Beacon + Signature completes cleanly',s.phase==='washington_response'&&!s.choice&&!s.triggerQueue.length,s.phase);

    // P0: K15 draws only after its queued Wave actually Breaches.
    s=setup('FVCK-SMOKE-P0-K15');
    s.battlefield.district2.state='fortified';s.battlefield.district2.forts=[];s.kaiju.dormant=false;s.kaiju.health=4;s.kaiju.location='approach';s.phase='kaiju_act';
    s.kaiju.hand=['K15','K01','K02'];s.kaiju.deck=['K03','K04'];s.waves.active=[{name:'Wave 1',location:'breach',created:1}];s.waves.supply=[];
    const k15Before=s.kaiju.hand.length;E.playKaiju('K15','manifest');s=E.getState();E.resolveChoice('Wave 1');s=E.getState();
    check('K15 queued Breach draw resolves',s.battlefield.district2.state==='breached'&&s.kaiju.hand.length===k15Before,JSON.stringify(s.kaiju.hand));
    check('K15 queued sequence finishes cleanly',s.phase==='washington_response'&&!s.choice&&!s.triggerQueue.length,s.phase);

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
