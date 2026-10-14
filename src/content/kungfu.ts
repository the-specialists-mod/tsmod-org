// TS 3.0 close combat, from the Rust port's decode of CTSGun::CCombatAttack, CCombatBlock,
// KatanaFire and CTSStunt::CloseAttack (the-specialistsmod-rs crates/shared/src/weapons/gun.rs,
// docs/implementation/weapons.md). Damage is before the melee-bar multiplier and power-ups.

export type Move = {
  name: string
  /** What to press. */
  input: string
  /** When it happens. */
  when: string
  damage: string
  /** Seconds before your next attack. */
  recovery: string
  /** Reach in units; "behind" for moves that hit backwards. */
  reach: string
  note?: string
}

export const punches: Move[] = [
  { name: 'Jab', input: 'Hold Fire', when: 'On the ground', damage: '10', recovery: '0.25', reach: '35', note: 'Fast repeats. The fourth hit in a row is a heavy punch.' },
  { name: 'Straight punch', input: 'Tap Fire', when: 'On the ground', damage: '20', recovery: '0.35', reach: '35' },
  { name: 'Heavy punch', input: 'Fire after 3 jabs, or while starting to duck', when: 'On the ground', damage: '30', recovery: '0.65', reach: '35' },
  { name: 'Air punch', input: 'Fire', when: 'In the air', damage: '25', recovery: '0.5', reach: '35' },
  { name: 'Stunt strike', input: 'Fire or Mouse2', when: 'Mid-stunt (dive, roll, flip)', damage: '15', recovery: '0.55', reach: '35' },
]

export const kicks: Move[] = [
  { name: 'Quick kick', input: 'Hold Mouse2', when: 'On the ground, or slower than 200', damage: '15', recovery: '0.3', reach: '45', note: 'Repeats; the fourth in a row is a combo kick.' },
  { name: 'Combo kick', input: 'Tap Mouse2, or after 3 quick kicks', when: 'On the ground, or slower than 200', damage: '25', recovery: '0.5', reach: '45' },
  { name: 'Uppercut kick', input: 'Duck + Mouse2', when: 'On the ground', damage: '35', recovery: '1.0', reach: '45', note: 'Leaves you crouched.' },
  {
    name: 'Back kick',
    input: 'Mouse2 while moving backwards',
    when: 'Anywhere',
    damage: '15–80, faster hits harder',
    recovery: '1.0 ground / 1.35 air',
    reach: '55 behind',
    note: 'The strongest kick: run backwards into someone.',
  },
  {
    name: 'Flying kick',
    input: 'Duck + Mouse2',
    when: 'In the air, moving forward faster than 270',
    damage: '15–45, faster hits harder',
    recovery: '1.0',
    reach: '45',
    note: 'Leaves you crouched.',
  },
  { name: 'Speed kick', input: 'Mouse2', when: 'In the air, faster than 200', damage: '15–30, faster hits harder', recovery: '0.75', reach: '45' },
  {
    name: 'Jump kick',
    input: 'Hold Jump next to them',
    when: 'With a gun or blade out (not kung fu), not ducking',
    damage: '10–20, faster hits harder',
    recovery: '0.7',
    reach: '48',
    note: 'Your kick with a weapon in hand. Doubled by the Kung Fu power-up.',
  },
]

export const blades: Move[] = [
  { name: 'Knife slash', input: 'Fire', when: 'Combat Knife / Seal Knife', damage: '30 / 20', recovery: '0.4 / 0.25', reach: '35', note: '⅔ damage and slower mid-stunt.' },
  { name: 'Knife throw', input: 'Mouse2', when: 'Combat Knife / Seal Knife', damage: '100 / 50', recovery: '0.4 / 0.25', reach: 'Thrown', note: 'Flies at 1,900 units/s.' },
  { name: 'Katana swing', input: 'Fire', when: 'On the ground', damage: '45', recovery: '0.7', reach: '50', note: 'Alternates left and right swings.' },
  { name: 'Katana low swing', input: 'Duck + Fire', when: 'On the ground', damage: '65', recovery: '0.9', reach: '50', note: 'Leaves you crouched.' },
  { name: 'Katana back swing', input: 'Fire while moving backwards', when: 'Anywhere', damage: '75', recovery: '1.0', reach: '55 behind' },
  { name: 'Katana air swing', input: 'Fire', when: 'In the air', damage: '35–55, faster hits harder', recovery: '1.1', reach: '50' },
  { name: 'Katana stunt swing', input: 'Fire', when: 'Mid-stunt', damage: '35', recovery: '1.0', reach: '35' },
  { name: 'Katana throw', input: 'Mouse2', when: 'Katana in hand', damage: '150', recovery: '—', reach: 'Thrown', note: 'Flies at 1,000 units/s. Go pick it up.' },
  { name: 'Gun-butt strike', input: 'V', when: 'Guns with a stock', damage: '25–70 by gun', recovery: '0.725', reach: '35', note: 'Rifles, shotguns, the Desert Eagle and more; ⅔ damage mid-stunt.' },
]

export const blockRules = [
  { label: 'Block', value: 'R', note: 'With kung fu or a blade out. Opens a 0.5 s block window.' },
  { label: 'Cost', value: '33', note: 'Melee bar spent per block. You can’t block mid-stunt or with an empty bar.' },
  { label: 'Blocked attacker', value: '0.5 s', note: 'Stunned and loses 33 bar. An emptied bar locks them for 1.5 s.' },
  { label: 'Blocker', value: '0.25 s', note: 'Recovers quickly to counter.' },
]

export const meleeRules = [
  { label: 'Melee bar', value: '×0.5–1', note: 'Melee damage scales with the bar: full is 1×, empty ½. Refills at 15 per second.' },
  { label: 'Kung Fu power-up', value: '×2', note: 'Doubles kung fu and jump-kick damage.' },
  { label: 'Disarm', value: 'On hit', note: 'Kung fu hits knock the gun out of their hands (not while they have spawn protection).' },
  { label: 'Knockback', value: '> 30 dmg', note: 'Hard hits throw the target back and up.' },
  { label: 'Ground kicks', value: 'Slowed', note: 'After a ground kick you move at half speed for ¾ of its recovery.' },
  { label: 'Late hits', value: 'Window', note: 'A miss stays live for a moment (0.1–0.35 s) and can still land, at half damage for each extra target.' },
]

// ---- TS 2.1 -------------------------------------------------------------------------------
// TS 2.1's close combat, from the Rust port's 2.1 mode: CCombatAttack, CCombatBlock, KatanaFire,
// KnifeFire and the stock hit (the-specialistsmod-rs crates/ts21/src/shared/melee.rs,
// crates/ts21/server/src/melee.rs, docs/implementation/ts21.md "Damage"). Damage is the move's
// base: a hit deals base × 0.9 × the melee bar (0–100%), before the Kung Fu power-up.
// Recovery is at normal speed; slow motion stretches it.

export const punches21: Move[] = [
  { name: 'Jab', input: 'Fire', when: 'On the ground', damage: '10', recovery: '0.15', reach: '38', note: 'After five in a row, the sixth is a heavy punch.' },
  { name: 'Heavy punch', input: 'Fire after 5 jabs', when: 'On the ground', damage: '10–20, faster hits harder', recovery: '0.2', reach: '38' },
  { name: 'Air punch', input: 'Fire', when: 'In the air', damage: '10–30, faster hits harder', recovery: '0.3', reach: '38' },
  { name: 'Stunt strike', input: 'Fire', when: 'Mid-dive', damage: '10–30, faster hits harder', recovery: '0.3', reach: '38' },
]

export const kicks21: Move[] = [
  { name: 'Ground kick', input: 'Mouse2', when: 'On the ground, or slower than 200', damage: '10–20, faster hits harder', recovery: '0.5', reach: '48', note: 'Cycles through four kicks.' },
  { name: 'Sweep', input: 'Duck + Mouse2', when: 'On the ground', damage: '30', recovery: '1.0', reach: '48', note: 'Leaves you crouched.' },
  {
    name: 'Back kick',
    input: 'Mouse2 while moving backwards',
    when: 'Anywhere, faster than 100',
    damage: '10–90, faster hits harder',
    recovery: '0.9',
    reach: '56 behind',
    note: 'The strongest kick: run backwards into someone.',
  },
  {
    name: 'Flying kick',
    input: 'Duck + Mouse2',
    when: 'In the air, moving forward faster than 270',
    damage: '10–45, faster hits harder',
    recovery: '0.9',
    reach: '48',
    note: 'Leaves you crouched.',
  },
  { name: 'Air kick', input: 'Mouse2', when: 'In the air, faster than 200', damage: '10–30, faster hits harder', recovery: '0.7', reach: '48', note: 'Cycles through three kicks.' },
  { name: 'Flip kick', input: 'Mouse2', when: 'Mid-flip', damage: '10–30, faster hits harder', recovery: '1.0', reach: '48' },
  {
    name: 'Jump kick',
    input: 'Hold Jump next to them',
    when: 'With a gun or blade out (not kung fu), not ducking',
    damage: '10–20, faster hits harder',
    recovery: '0.7',
    reach: '48',
    note: 'Your kick with a weapon in hand. Uses no bar; doubled by the Kung Fu power-up.',
  },
  {
    name: 'Backflip kick',
    input: 'Double-tap Jump',
    when: 'Standing or moving backwards, light enough for a high flip',
    damage: '15',
    recovery: '—',
    reach: 'Touch',
    note: 'Lands on anyone you touch in the next 0.3 s. Uses no bar; 30 with the Kung Fu power-up.',
  },
]

export const blades21: Move[] = [
  { name: 'Knife slash', input: 'Fire', when: 'Combat Knife / Seal Knife, not mid-stunt', damage: '35 / 15', recovery: '0.28 / 0.21', reach: '38' },
  {
    name: 'Knife throw',
    input: 'Mouse2',
    when: 'Combat Knife / Seal Knife',
    damage: '80 / 50',
    recovery: '0.28 / 0.21',
    reach: 'Thrown',
    note: 'Flies at 1,300 units/s. The combat knife’s 80 falls off past 512 units, to 50 at 1,088.',
  },
  { name: 'Katana swing', input: 'Fire', when: 'Standing or slower than 100 / faster, also in the air', damage: '59 / 29', recovery: '0.35', reach: '48', note: 'Alternates left and right swings.' },
  { name: 'Katana low swing', input: 'Duck + Fire', when: 'On the ground', damage: '76', recovery: '0.7', reach: '48', note: 'Leaves you crouched.' },
  { name: 'Katana back swing', input: 'Fire while moving backwards', when: 'Anywhere, faster than 100', damage: '85', recovery: '0.7', reach: '54 behind' },
  { name: 'Gun-butt strike', input: 'V', when: 'M4A1 and Sawed-off only', damage: '20', recovery: '0.725', reach: '38', note: 'No disarm or knockback.' },
]

export const blockRules21 = [
  { label: 'Block', value: 'R', note: 'With kung fu only: R does nothing with a blade. Opens a 0.3 s block window.' },
  { label: 'Cost', value: 'None', note: 'Blocking spends no bar and works on an empty one.' },
  { label: 'Blocked hit', value: 'Bar %', note: 'The part your bar is missing still gets through (at 60 bar, 40% of the hit), and drains your bar by that much.' },
  { label: 'Blade parry', value: 'Swing', note: 'A knife swing briefly blocks knives; a katana swing blocks knives and katanas.' },
]

export const meleeRules21 = [
  { label: 'Melee bar', value: '×0–0.9', note: 'A hit deals 0.9 × its base × your bar: an empty bar deals nothing. Each attack costs 0.9 × its base. Refills at 15 per second.' },
  { label: 'Kung Fu power-up', value: '×2', note: 'Doubles kung fu and jump-kick damage.' },
  { label: 'Disarm', value: '> 15 dmg', note: 'A kung fu hit over 15 knocks the gun out of their hands at once. The One can’t be disarmed.' },
  { label: 'Knockback', value: '> 30 dmg', note: 'Hard hits throw the target back and up.' },
  { label: 'Recovery', value: 'Held', note: 'After an attack on the ground you’re held for 0.9 × its recovery, moving at a tenth of your input.' },
  { label: 'Late hits', value: '0.3 s', note: 'A miss stays live for 0.3 s and can still land.' },
]
