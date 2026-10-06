# FVCK! — First Human Playtest Protocol

## Purpose

Run the first **5–10 comparable human games** of the HTML v0.2 prototype without changing the tabletop rules between every result.

This block is testing:

> **Does every step closer make both players care more?**

It is also testing whether the prototype communicates the game's geometry clearly enough to support useful balance evidence.

---

## Rules Freeze

During this 5–10 game block, do **not** change gameplay because of:

- one dramatic win;
- one bad opening hand;
- one player disliking a specific card;
- one game with unusually high or low Overrun;
- a single lopsided finish.

Interrupt the freeze only for:

1. a state-locking software bug;
2. an illegal game state;
3. a rule that cannot be executed;
4. a clear contradiction with the working tabletop rules.

Everything else is evidence.

---

## Before Each Game

Record:

- player names or simple Player A / Player B labels;
- who is playing Kaiju;
- who is playing Washington;
- seed;
- game number in the block.

Use a new random seed unless reproducing a bug.

Do not tune config values between normal games.

---

## During Play

Use the built-in moment markers whenever the feeling happens:

### TENSE

Use when a decision creates real uncertainty, regret, or pressure.

Examples:

- whether to Advance now or wait;
- whether to spend a valuable symbol card;
- whether to Overrun;
- whether Washington Strikes or prepares;
- whether a Wave is worth stopping.

### OBVIOUS

Use when one choice feels clearly correct and the alternatives do not feel credible.

This is not automatically bad. Repeated markers around the same decision are the signal.

### CONFUSING

Use when the player understands the goal but cannot easily understand:

- what is legal;
- why an effect happened;
- what order triggers resolve;
- what a card is asking them to choose.

Do not use Confusing merely because a decision is difficult.

---

## Do Not Coach the Strategy

Explain rules and interface behavior.

Do not tell a player:

- which route is stronger;
- whether they should Awaken;
- when they should Strike;
- which Evolution path they are “supposed” to pursue.

We are testing whether the strategy emerges from the game.

---

## Automatic Data to Save

At the end of every game, export the JSON.

The build records:

- winner;
- total exchanges;
- first exchange Awakening was possible;
- actual Awakening exchange;
- Dormant Acts;
- Health entering Breach / District II / District I / City Core;
- Force vs Adapt;
- Overrun Health;
- Strikes and Strike damage;
- Waves created / destroyed / Breaches;
- Fortifications installed / replaced;
- Evolutions installed / replaced;
- Body / Tide / Instinct behavior;
- deck depletion;
- Tense / Obvious / Confusing markers;
- full action log.

Keep the seed with every report.

---

## Ask Immediately After Every Game

### 1. What was the hardest decision?

We are looking for strategic regret and competing futures.

### 2. When did the game feel most inevitable or obvious?

We are looking for decisions that stop being decisions.

### 3. When did you most strongly feel that the Colossal Kaiju was getting closer?

We are testing whether the **FVCK! cadence + battlefield geometry + mechanics** tell the same story.

Write short answers. Do not lead the player toward a desired response.

---

## What We Are Watching For

### Healthy signs

- Kaiju reaches later areas damaged but still viable;
- Washington sometimes wants to Strike and sometimes wants to prepare;
- Force and Adapt both remain credible;
- Overrun is tempting rather than routine;
- Body / Tide / Instinct behavior changes in response to Washington;
- players can explain the decision that most affected the result;
- the strongest tension occurs before the winner is certain;
- the cadence feels like mounting pressure without becoming a separate rule.

### Warning signs

- one route dominates regardless of District;
- repeated 2+ Health Overruns are necessary;
- Kaiju regularly dies before District II;
- Kaiju regularly reaches District I at full Health;
- Washington always Strikes whenever legal;
- Instinct is either never worth the tempo or obviously mandatory;
- Dormancy becomes repetitive setup rather than tension;
- one strategy path is correct regardless of Washington;
- many Obvious markers cluster around one action;
- many Confusing markers cluster around one trigger;
- players notice the FVCK presentation more than the actual decision pressure.

---

## After Game 5

Do not tune immediately.

First compare all five games together.

Look for repeated patterns in:

- Health vs distance remaining;
- Awakening timing;
- Force / Adapt selection;
- Overrun;
- Strike frequency;
- Wave impact;
- strategy pivots;
- Tense / Obvious / Confusing markers.

If the evidence is still noisy, continue to Games 6–10 before changing numbers.

---

## v0.3 Change Order

When the block is complete, tune in this order:

1. card opportunity cost;
2. individual card numbers;
3. Gate values;
4. Health;
5. hand sizes / draw cadence;
6. Exposure;
7. replace a problematic card;
8. only then consider a system change.

Do not add mechanics to explain one bad game.

---

## Working Story Check

FVCK! remains:

> **A cadence, not a rage fantasy.**

Washington stays composed.

The world becomes less composed.

The Colossal Kaiju keeps getting closer.
