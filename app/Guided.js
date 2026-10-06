'use client';
import { Fragment, useMemo, useState } from 'react';
import { circuits, strength, abs, warmup, cooldown, strengthSupersets, STRENGTH_ROUNDS, SUPERSET_REST, SINGLE_REST, ABS_ROUNDS, ABS_REST } from './data';
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
  const sets = strengthSupersets[g];
  const groups = [
    ...sets.map((idx, n) => {
      const pair = idx.length > 1, name = `${pair ? 'Superset' : 'Oefening'} ${n + 1}/${sets.length}`;
      return {
        items: idx.map(i => ({ ex: strength[g][i], key: `s${g}${i}`, hint: 'bv. 8 kg: 12 / 11 / 9' })),
        rounds: STRENGTH_ROUNDS, rest: pair ? SUPERSET_REST : SINGLE_REST,
        name, label: `KRACHT ${g} · ${name.toUpperCase()}`, skip: pair ? 'Superset overslaan' : 'Oefening overslaan',
      };
    }),
    {
      items: abs.map((ex, i) => ({ ex, key: `ab${g}${i}`, hint: 'gewicht / herhalingen' })),
      rounds: ABS_ROUNDS, rest: ABS_REST, name: 'Buikcircuit', label: 'BUIKCIRCUIT', skip: 'Buikcircuit overslaan',
    },
  ];
  const steps = stretchSteps('Warming-up', warmup(strength[g][0][0]));
  groups.forEach((grp, gi) => {
    for (let r = 1; r <= grp.rounds; r++) {
      grp.items.forEach((it, k) => steps.push({ t: 'set', ...it, grp, gi, k, r, label: grp.label }));
      if (r < grp.rounds) steps.push({ t: 'rest', label: grp.label, secs: grp.rest, next: `${grp.items[0].ex[0]} – ronde ${r + 1}` });
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
  // Sla de rest van deze superset (of het buikcircuit) over.
  function skipGroup() {
    const i = steps.findIndex((s, j) => j > seq.idx && s.t === 'set' && s.gi !== step.gi);
    seq.goto(i < 0 ? steps.findIndex(s => s.phase === 'Cooling-down') : i);
  }
  const lastOfGroup = step.t === 'set' && !steps.some((s, j) => j > seq.idx && s.t === 'set' && s.gi === step.gi);
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
        <p className="supersetLine">{step.grp.name} · {step.grp.items.map((it, k) =>
          <Fragment key={k}>{k > 0 && ' → '}{k === step.k ? <b>{it.ex[0]}</b> : it.ex[0]}</Fragment>)}</p>
        <div className="setCount">Ronde {step.r} van {step.grp.rounds} · {step.ex[2].replace(/^\d+\s*×\s*/, '')}</div>
        <article>
          <div className="weightAdvice"><b>Aanbevolen start</b><span>{step.ex[4]}</span>{previous(step.key) && <small>Vorige training: {previous(step.key)}</small>}</div>
          <p>{step.ex[3]}</p>
          <input placeholder={step.hint} value={today[step.key] || ''} onChange={e => onLog(step.key, e.target.value)} />
        </article>
        <button className="wide" onClick={seq.next}>Set klaar</button>
        {!lastOfGroup && <button className="skip" onClick={skipGroup}>{step.grp.skip}</button>}
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
