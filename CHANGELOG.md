# Changelog

## strength-supersets (2026-10-06)

Guided strength took about 60–65 minutes because there was a 90 s rest after each of the 24–27 sets. The goal is 35–40 minutes including warm-up and cooldown.

- **Supersets in guided strength.** `strengthSupersets` in `data.js` groups each day's exercises, using their index in `strength[g]`:
  - A: Floor Press + One-arm Row, Shoulder Press + Lateral Raise, Goblet Squat alone.
  - B: Goblet Squat + Romanian Deadlift, Floor Press + One-arm Row.
  - C: Floor Press + One-arm Row, Shoulder Press + Lateral Raise, Split Squat + Romanian Deadlift.
- **One round per pair.** Each round is set 1 of exercise 1 → "Set klaar" → straight to exercise 2 → "Set klaar" → rest. There are 3 rounds (`STRENGTH_ROUNDS`).
- **Abs block is a circuit.** Weighted Crunch → Reverse Crunch → Forearm Plank, 3 rounds (`ABS_ROUNDS`).
- **Rest between rounds:** `SUPERSET_REST` 75 s, `SINGLE_REST` 90 s, `ABS_REST` 30 s. There is no timed rest after a block's last round. The next block's set screen waits for "Set klaar", so you switch equipment at your own pace.
- **Set screen** shows "Superset 1/3 · Floor Press → One-arm Row" with the current exercise in bold, plus "Ronde N van 3 · reps". A single exercise shows "Oefening 3/3 · Goblet Squat".
- "Volgende oefening" is now "Superset overslaan" / "Oefening overslaan" / "Buikcircuit overslaan" and skips the rest of the block.
- **Log keys are unchanged** (`s{g}{i}`, `ab{g}{i}`), and so is the Oefeningen tab. Only the guided sequence is different.
- `SET_REST` has been removed.

Rough duration: warm-up 4 min and cooldown 4.7 min are fixed. Rest totals 9 min for A, 6 min for B and 8.5 min for C. Assuming about 45 s per set including setup, sessions come to about **36 min (A), 30 min (B) and 37 min (C)**. B comes in under the target.

## improvements-1 (2026-10-06)

### Prep
- `app/page.js` was un-minified and split: exercise/programme data in `app/data.js`, storage and date helpers in `app/db.js`, the guided workout in `app/Guided.js`, and timer/wake-lock hooks in `app/useTimer.js`. Added a `.gitignore`.

### 1. Screen on and a timer that survives locking
- The screen stays on (Screen Wake Lock) while a guided workout is open. The lock is requested again when the page becomes visible and released on stop/finish. Browsers without the API just skip it.
- Timed steps store an end timestamp and read the remaining time from the clock. Pause keeps the remaining time; resume sets a new end time. If the page was hidden while one or more timed phases ended, the next tick jumps to the phase that should be running now. It stops at steps that need input (score, strength set).
- Added viewport, theme-color and `apple-mobile-web-app-*` metas for home-screen use on iOS.

### 2. Programme week and progression
- New `settings` in `basfitdb` with `startDate: '2026-10-06'`. A versioned migration (`version: 2`) in the load step adds it; `logs` and `measure` are untouched.
- "Week N van 16" appears in the header and on Vandaag. Before the start date it reads "Programma start op …"; after week 16 it reads "Programma afgerond".
- `circuitProgression` in `data.js` sets rounds and work/rest seconds per block of weeks. Guided mode and the circuit hero text use it.
- `best()` now checks every `c{A|B}{i}r{n}` key, so rounds 3 and 4 count.
- Day keys now use the local date. Before, they used UTC, so an entry made between 00:00 and 02:00 Dutch time was saved under the previous day.

### 3. Warm-up, cooldown and guided strength
- Guided circuits start with a warm-up of about 4 minutes. Its last step is a light version of the first exercise. They end with a cooldown of about 4.5 minutes (7 × 40 s; hip flexors and hamstrings are timed per side). These steps show a placeholder card, an instruction line and the timer, and can be paused or skipped.
- New "Start Kracht A/B/C": warm-up, then each strength exercise and the abs block set by set. Each set shows the recommended weight, the previous entry and the existing text log. "Set klaar" starts a 90 s rest (`SET_REST` in `data.js`), "Volgende oefening" skips the remaining sets, and the cooldown comes last.

### 4. Schedule
- `settings.schedule` (Monday first) defaults to rest on Monday and Friday. A missing or invalid schedule falls back to the default.
- Historie has a new "Weekschema" section with one select per day. Today's day is highlighted.
- Vandaag reads today's session from the schedule and shows a one-tap Start button for a circuit or strength session.

### 5. Export / import and measurements
- Historie has a new "Gegevens" section. "Exporteer gegevens" saves `basfit-YYYY-MM-DD.json`: when the app runs from the iOS home screen it opens the share sheet ("Bewaar in Bestanden"), elsewhere it downloads the file. "Importeer gegevens" checks that the file has `logs` and `measure`, shows the number of days and measurements, asks for confirmation, then replaces the data.
- "Meting bewaren" replaces an existing measurement with the same date. Each row has a × to delete it (with confirmation). Rows are listed newest first.

### Housekeeping
- `next` 16.3.8, `react` and `react-dom` 19.3.0 are pinned, and `package-lock.json` is committed.

### Deliberately left out
- **No resume after a reload.** Guided progress lives only in memory. If iOS kills the page in the background, the workout starts over (scores already entered are kept).
- **No sounds or vibration** at the end of a phase. iOS doesn't support vibration, and audio needs extra unlock handling.
- **No manifest or app icon.** The app works from the home screen, but iOS uses a screenshot as its icon.
- **No settings screen for `startDate` or the progression.** You change those in `data.js`, or for `startDate` in an exported JSON that you import again.
- **Old duplicate measurements are not merged automatically.** Remove them with the ×.
- **Programme weeks run Tuesday to Monday**, because 6 Oct 2026 is a Tuesday. The schedule itself stays Monday-first.
- **Strength logging is unchanged**: one free-text field per exercise, shared between the Oefeningen tab and guided mode.
