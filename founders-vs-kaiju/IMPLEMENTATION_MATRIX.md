# HTML v0.2 Rules Fidelity Matrix

This matrix distinguishes **visible card text** from **implemented game behavior**.

Status:
- ✅ Implemented in the v0.2 rules-fidelity branch
- 🟡 Implemented with a documented timing/choice limitation
- 🔴 Not safe for balance testing yet

## Kaiju

| Card | Instinct | Manifest | Evolution / Gate |
|---|---|---|---|
| K01 Distant Tremor | ✅ reorder top 3 | ✅ move oldest Wave | ✅ |
| K02 Scent Weakness | ✅ find ADAPT | ✅ return next Fortification | ✅ |
| K03 Gathering Mass | ✅ draw 2 / keep 1 | ✅ immediate Advance + FORCE | ✅ |
| K04 Patient Predator | ✅ reorder top 4 | ✅ push Washington inward | ✅ |
| K05 Relentless Drive | ✅ top 2 / keep 1 | ✅ immediate Advance / ignore 1 / suffer 1 | ✅ |
| K06 Feint in the Deep | ✅ bottom 1 / reorder | ✅ remove Fortification from Breached next District | ✅ |
| K07 Violent Surge | ✅ reorder top 3 | ✅ move all Waves | ✅ |
| K08 Crush the Weak Point | ✅ route-card setup | ✅ Breached Gate reduction + Advance | ✅ |
| K09 Ancient Memory | ✅ discard retrieval + bottom | ✅ Signature retrieval | ✅ flexible Gate |
| K10 Unstoppable Momentum | ✅ draw/cycle | ✅ immediate Advance + FORCE / suffer / draw | ✅ |
| K11 Read the Terrain | ✅ find ADAPT | ✅ remove Fortification from 2-card defense | ✅ |
| K12 Hardened Hide | ✅ find Evolution | — | ✅ BODY |
| K13 Broken Chains | ✅ find FORCE/TIDE | ✅ immediate Advance + 2 FORCE | ✅ HEAD |
| K14 Deep Current | ✅ TIDE setup | ✅ queued Wave movement | ✅ TAIL capacity choice + D03 ordering covered |
| K15 Rising Water | ✅ draw 2 / keep 1 | ✅ move chosen Wave + Breach draw | ✅ |
| K16 Imperial Roar | ✅ find Core card | ✅ push Washington | ✅ HEAD +1 look |
| K17 Tidal Carapace | ✅ find Evolution | ✅ sacrifice Evolution / heal | ✅ BODY Overrun substitution |
| K18 Undertow Engine | ✅ find TIDE | ✅ Wave-assisted Advance | ✅ TAIL new-Wave acceleration |

## Washington

| Card | Command | Fortify |
|---|---|---|
| W01 Harbor Chain | ✅ destroy local Wave | ✅ FORCE tax / discard on entry |
| W02 Earthwork Redoubt | ✅ repair Breach | ✅ Force/Adapt divert + Force damage |
| W03 Coastal Battery | ✅ ranged damage | ✅ Force-entry damage |
| W04 Powder Magazine | ✅ destroy Wave + Breach | ✅ Overrun trap |
| W05 Field Barricades | ✅ move Fortification inward | ✅ discard-or-damage tax |
| W06 False Works | ✅ return Fortification + draw | ✅ Gate divert |
| W07 Chevaux-de-Frise | ✅ Breach Wave defense | ✅ Adapt trap |
| W08 Signal Beacon | ✅ peek top 2 Kaiju | ✅ Signature trigger |
| W09 Forced March | ✅ move up to 2 | ✅ fallback |
| W10 Emergency Repairs | ✅ repair Breach | ✅ prevent Wave impact |
| W11 Continental Volley | ✅ ranged damage | ✅ entry crossfire |
| W12 Orderly Retreat | ✅ retreat + recover Fortification | ✅ Ruin fallback + companion move + destination legality |
| W13 Scorched Ground | ✅ shared-District Command | ✅ Breached entry scorch |
| W14 Benjamin Franklin | ✅ top 3 / keep 1 | ✅ Rally looks 3 |
| W15 Henry Knox | ✅ draw 2 / discard 1 | ✅ optional boosted Strike |
| W16 Marquis de Lafayette | ✅ move + optional free Fortify | ✅ capacity / Gate-shaper replacement covered |
| W17 Abigail Adams | ✅ draw 2 / keep 1 / top-bottom other | ✅ Wave-Breach draw choice |
| W18 John Paul Jones | ✅ destroy Wave at Breach/DII | ✅ pre-impact Wave destruction |

## Districts

| District | Status |
|---|---|
| D01 Harbor Batteries | ✅ Force entry damage |
| D02 Fortified Heights | ✅ Adapt extra discard |
| D03 River Crossing | ✅ extra Fortification loss on Wave Breach |
| D04 Arsenal Quarter | ✅ adjacent Strike permission |
| D05 Market Ward | ✅ first-Breach draw 2 / keep 1 |
| D06 Woodland Road | ✅ optional Washington move on Adapt entry |

## System Rules

✅ seeded setup and District draft  
✅ Dormant / Awakening flow  
✅ finite hands and decks  
✅ Force / Adapt / flexible K09 payment  
✅ Overrun  
✅ Gate modifiers and Broken Chains  
✅ Fortification capacity + 1 Gate-shaper limit  
✅ Fortification replacement choice  
✅ Wave lifecycle and Core impacts  
✅ geographic Exposure / Strike  
✅ final double-Strike Response  
✅ Evolution replacement  
✅ deck depletion behavior  
✅ structured log + JSON export  
✅ explicit queued trigger resolution  
✅ nested hand-limit continuation  
✅ simultaneous W10 / W18 prevention ordering UI  
✅ W12 Ruin companion movement  
✅ W16 legal replacement at capacity  
✅ playtest markers: Tense / Obvious / Confusing

## P0 fidelity status

The previously blocking trigger-ordering cases now have explicit queued resolution and deterministic regression coverage.

Covered:

1. W10 / W18 simultaneous Wave prevention;
2. K14 Deep Current + D03 River Crossing + two Fortifications;
3. W12 Orderly Retreat during Ruin, including companion Fortification movement;
4. moved Fortification capacity / Gate-shaper legality;
5. W16 Lafayette free Fortify at a full destination;
6. nested hand-limit continuation for Washington and Kaiju card-gain paths;
7. Signal Beacon pausing and resuming a Signature play;
8. K15 Rising Water drawing from the actual queued Breach event.

Two **non-structural tabletop wording conventions** remain documented in `RULES_QUESTIONS.md`.

Do not redesign tabletop rules to solve software implementation issues.
