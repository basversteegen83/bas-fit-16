'use client';
import { useMemo, useState } from 'react';
import { circuits } from './data';
import { useSequence, useWakeLock } from './useTimer';

export function Art({ file, name }) {
  return <img className="exerciseCard" src={`/exercises/cards/${file}.png`} alt={`${name} uitvoering`} />;
}

function circuitSteps(g) {
  const list = circuits[g], rounds = 2, work = 60, rest = 30, steps = [];
  for (let r = 1; r <= rounds; r++) list.forEach((ex, i) => {
    const label = `CIRCUIT ${g} · RONDE ${r}/${rounds}`;
    steps.push({ t: 'work', label, ex, g, i, r, secs: work });
    steps.push({ t: 'score', label, ex, g, i, r });
    if (r < rounds || i < list.length - 1) steps.push({ t: 'rest', label, secs: rest, next: list[(i + 1) % list.length][0] });
  });
  steps.push({ t: 'done', label: `CIRCUIT ${g}` });
  return steps;
}

export default function Guided({ plan, best, onLog, onExit }) {
  const steps = useMemo(() => circuitSteps(plan.g), [plan]);
  const seq = useSequence(steps), { step, left } = seq;
  const [score, setScore] = useState('');
  useWakeLock(step.t !== 'done');

  function saveScore() {
    if (score !== '') onLog(`c${step.g}${step.i}r${step.r}`, score);
    setScore('');
    seq.next();
  }
  const pauseButton = <button className="wide" onClick={seq.running ? seq.pause : seq.resume}>{seq.running ? 'Pauze' : 'Doorgaan'}</button>;
  const title = { work: step.ex && step.ex[0], score: step.ex && step.ex[0], rest: 'Rust', done: 'Training klaar' }[step.t];

  return <main className="guided">
    <header><small>{step.label}</small><h1>{title}</h1></header>
    <section>
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
      {step.t === 'rest' && <>
        <div className="restLabel">Rust</div>
        <div className="bigTimer">{left}</div>
        <p>Hierna: <b>{step.next}</b></p>
        {pauseButton}
      </>}
      {step.t === 'done' && <div className="scoreScreen">
        <h2>Goed gedaan!</h2>
        <button className="wide" onClick={onExit}>Terug naar overzicht</button>
      </div>}
      {step.t !== 'done' && <button className="stop" onClick={onExit}>Training stoppen</button>}
    </section>
  </main>;
}
