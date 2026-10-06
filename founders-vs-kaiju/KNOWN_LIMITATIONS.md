# Known Prototype Limitations — HTML v0.2

The rules-fidelity branch closes most of the original “text exists but behavior is simplified” gap.

Remaining limitations are primarily **nested trigger ordering**:

1. **Multiple simultaneous Wave reactions.** W10, W17, W18, K14 and District Breach effects need regression tests when several could fire during the same Wave movement.
2. **Orderly Retreat on Ruin.** Washington's fallback movement is implemented. Moving a companion Fortification inward while the same Ruin event is removing defenses still needs exact nested-choice handling.
3. **Lafayette at full capacity.** Free Fortify and entry movement are implemented; replacement-at-capacity needs a dedicated regression case.
4. **Nested hand-limit decisions.** The engine supports finite hand limits, but draw/return effects that immediately create another choice need focused tests.
5. **Trigger ordering UI.** The engine currently resolves the deterministic order encoded in the prototype. It does not yet ask the player to order two optional simultaneous triggers.

These are **software fidelity issues**, not open board-game design questions.

See `IMPLEMENTATION_MATRIX.md` before using a specific interaction as balance evidence.
