# Known Prototype Limitations — HTML v0.2

The P0 rules-fidelity pass now uses an explicit queued resolver for Advance entry effects, Wave movement/impact, District deterioration, Fortification capacity, and nested player choices.

The previously blocking P0 cases are covered by deterministic regression scenarios:

- W10 + W18 simultaneous Wave prevention;
- K14 Deep Current + D03 River Crossing + two Fortifications;
- W12 Orderly Retreat on Ruin;
- W12 companion movement into a full destination;
- W16 Lafayette free Fortify at capacity / Gate-shaper replacement;
- False Works return + draw hand-limit cleanup;
- Market Ward nested draw / hand-limit cleanup;
- Abigail Adams Wave-Breach draw / hand-limit cleanup;
- K10 post-Advance draw / hand-limit cleanup;
- Signal Beacon interrupting a Signature play;
- K15 draw after an actual queued Wave Breach.

## Remaining limitations

1. **Two tabletop wording conventions still need confirmation.** See `RULES_QUESTIONS.md` for River Crossing's extra-discard chooser and W10/W18 simultaneous prevention ordering.
2. **The trigger queue is explicit for the current v0.2 card set, not a generic future-card rules language.** New cards with new timing windows will still need an intentional trigger descriptor.
3. **No automated CI/browser runner yet.** The deterministic browser smoke page is checked into the repository, but it is still run manually by serving the static prototype.
4. **Runtime engine/UI fragments remain technical debt.** The connector-friendly `part-XX.txt` bundles should eventually be consolidated into normal JavaScript modules after the playtest branch stabilizes.

These are not reasons to redesign the tabletop game.

For first human playtesting, use the current rules conventions consistently and record any moment where the timing feels unintuitive.
