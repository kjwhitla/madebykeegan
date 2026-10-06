# Known Prototype Limitations

This first HTML build is intended to get real games running quickly.

1. **Nested draw-selection triggers.** Market Ward and Abigail Adams Wave triggers currently prioritize state integrity over a bespoke multi-step selection UI. Verify their digital card-selection sequence against the tabletop wording before balance testing those specific cards.
2. **Orderly Retreat on Ruin.** The tabletop card can move another Fortification inward as the District falls. The first build preserves Washington's fallback movement but needs a dedicated nested-choice flow for moving the companion Fortification cleanly.
3. **Lafayette free Fortify at a full destination.** Normal free-Fortify works; replacement-at-capacity after the free move should receive a targeted regression test.
4. **Complex simultaneous Wave triggers.** Multiple Waves plus several reactive Fortifications can create nested choices. The engine resolves deterministic effects in sequence, but these combinations need focused regression tests.
5. **Tuning controls.** Major starting values are editable in the Developer panel; per-District Gate editing can be added once repeated tests show it is useful.

These are implementation limitations, not invitations to redesign the game.
