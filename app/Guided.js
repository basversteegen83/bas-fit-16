'use client';
import { useMemo, useState } from 'react';
import { circuits, strength, abs, warmup, cooldown, SET_REST } from './data';
import { useSequence, useWakeLock } from './useTimer';

export function Art({ file, name }) {
  return <img className="exerciseCard" src={`/exercises/cards/${file}.png`} alt={`${name} uitvoering`} />;
}

function stretchSteps(phase, list) {
  return list.map(([title, text, secs], i) =>
    ({ t: 'timed', phase, label: `${phase.toUpperCase()} ${i + 1}/${list.length}`, n: `${i + 1}/${list.length}`, title, text, secs }));
}

function circuitSteps(g, { rounds, work, rest }) {
  const list = circuits[g], steps = stretchSteps('Warming-up', warmup(list[0][0]));
  for (let r = 1; r <= rounds; r++) list.forEach((ex, i) => {
    const label = `CIRCUIT ${g} · RONDE ${r}/${rounds}`;
    steps.push({ t: 'work', label, ex, g, i, r, secs: work });
    steps.push({ t: 'score', label, ex, g, i, r });
    if (r < rounds || i < list.length - 1) steps.push({ t: 'rest', label, secs: rest, next: list[(i + 1) % list.length][0] });
  });
  steps.push(...stretchSteps('Cooling-down', cooldown), { t: 'done', label: `CIRCUIT ${g}` });
  return steps;
}

function strengthSteps(g) {
  const blocks = [
    ...strength[g].map((ex, i) => ({ ex, key: `s${g}${i}`, label: `KRACHT ${g} · OEFENING ${i + 1}/${strength[g].length}`, hint: 'bv. 8 kg: 12 / 11 / 9' })),
    ...abs.map((ex, i) => ({ ex, key: `ab${g}${i}`, label: `BUIKBLOK · OEFENING ${i + 1}/${abs.length}`, hint: 'gewicht / herhalingen' })),
  ];
  const steps = stretchSteps('Warming-up', warmup(strength[g][0][0]));
  blocks.forEach((b, bi) => {
    const sets = parseInt(b.ex[2], 10) || 3;
    for (let set = 1; set <= sets; set++) {
      steps.push({ t: 'set', ...b, set, sets });
      const next = set < sets ? `${b.ex[0]} – set ${set + 1}` : blocks[bi + 1] && blocks[bi + 1].ex[0];
      if (next) steps.push({ t: 'rest', label: b.label, secs: SET_REST, next });
    }
  });
  steps.push(...stretchSteps('Cooling-down', cooldown), { t: 'done', label: `KRACHT ${g} + BUIK` });
  return steps;
}

export default function Guided({ plan, today, best, previous, onLog, onExit }) {
  const steps = useMemo(() => plan.kind === 'strength' ? strengthSteps(plan.g) : circuitSteps(plan.g, plan.cfg), [plan]);
  const seq = useSequence(steps), { step, left } = seq;
  const [score, setScore] = useState('');
  useWakeLock(step.t !== 'done');

  function saveScore() {
    if (score !== '') onLog(`c${step.g}${step.i}r${step.r}`, score);
    setScore('');
    seq.next();
  }
  // Sla de resterende sets van deze oefening over.
  function nextExercise() {
    const i = steps.findIndex((s, j) => j > seq.idx && s.t === 'set' && s.key !== step.key);
    seq.goto(i < 0 ? steps.findIndex(s => s.phase === 'Cooling-down') : i);
  }
  const pauseButton = <button className="wide" onClick={seq.running ? seq.pause : seq.resume}>{seq.running ? 'Pauze' : 'Doorgaan'}</button>;
  const skipButton = <button className="skip" onClick={seq.next}>Overslaan</button>;
  const title = { work: step.ex && step.ex[0], score: step.ex && step.ex[0], set: step.ex && step.ex[0], timed: step.title, rest: 'Rust', done: 'Training klaar' }[step.t];

  return <main className="guided">
    <header><small>{step.label}</small><h1>{title}</h1></header>
    <section>
      {step.t === 'timed' && <>
        <div className="placeholderCard"><span>{step.phase}</span><b>{step.n}</b></div>
        <div className="bigTimer">{left}</div>
        <p>{step.text}</p>
        {pauseButton}{skipButton}
      </>}
      {step.t === 'work' && <>
        <Art file={step.ex[1]} name={step.ex[0]} />
        <div className="bigTimer">{left}</div>
        <p>{step.ex[2]}</p>
        <p className="tip"><b>Let op:</b> {step.ex[3]}</p>
        {pauseButton}
      </>}
      {step.t === 'score' && <div className="scoreScreen">
        <h2>Hoeveel nette herhalingen?</h2>
        <p>Beste eerdere score: <b>{best(step.g, step.i) || '–'}</b></p>
        <input autoFocus type="number" value={score} onChange={e => setScore(e.target.value)} placeholder="score" />
        <button className="wide" onClick={saveScore}>{steps[seq.idx + 1].t === 'rest' ? 'Opslaan & rust' : 'Opslaan'}</button>
      </div>}
      {step.t === 'set' && <>
        <Art file={step.ex[1]} name={step.ex[0]} />
        <div className="setCount">Set {step.set} van {step.sets} · {step.ex[2]}</div>
        <article>
          <div className="weightAdvice"><b>Aanbevolen start</b><span>{step.ex[4]}</span>{previous(step.key) && <small>Vorige training: {previous(step.key)}</small>}</div>
          <p>{step.ex[3]}</p>
          <input placeholder={step.hint} value={today[step.key] || ''} onChange={e => onLog(step.key, e.target.value)} />
        </article>
        <button className="wide" onClick={seq.next}>Set klaar</button>
        {step.set < step.sets && <button className="skip" onClick={nextExercise}>Volgende oefening</button>}
      </>}
      {step.t === 'rest' && <>
        <div className="restLabel">Rust</div>
        <div className="bigTimer">{left}</div>
        <p>Hierna: <b>{step.next}</b></p>
        {pauseButton}{skipButton}
      </>}
      {step.t === 'done' && <div className="scoreScreen">
        <h2>Goed gedaan!</h2>
        <button className="wide" onClick={onExit}>Terug naar overzicht</button>
      </div>}
      {step.t !== 'done' && <button className="stop" onClick={onExit}>Training stoppen</button>}
    </section>
  </main>;
}
