'use client';
import { useEffect, useState } from 'react';
import './style.css';
import { circuits, strength, abs, week, meals, circuitFor } from './data';
import { loadDb, saveDb, localDate, programmeWeek, weekLabel } from './db';
import Guided, { Art } from './Guided';

function App() {
  const [tab, setTab] = useState('today'),
    [kind, setKind] = useState('circuit'),
    [choice, setChoice] = useState('A'),
    [db, setDb] = useState(null),
    [guided, setGuided] = useState(null);

  // Alles wat van localStorage of de datum afhangt pas na mount, zodat de
  // statisch gerenderde HTML niet afwijkt van de client.
  useEffect(() => { setDb(loadDb()) }, []);

  const header = sub => <header><small>16 WEKEN · PERSOONLIJKE TRACKER</small><h1>Bas Fit 16</h1><p>{sub}</p></header>;
  if (!db) return <main>{header('Start 91,5 kg · buik 102 cm')}</main>;

  const date = localDate(),
    day = (new Date().getDay() + 6) % 7,
    today = db.logs[date] || {},
    weekNr = programmeWeek(db.settings.startDate, date),
    weekText = weekLabel(weekNr, db.settings.startDate),
    circuitCfg = circuitFor(weekNr);

  function update(fn) { setDb(prev => { const n = fn(prev); saveDb(n); return n }) }
  function persist(n) { update(() => n) }
  function log(k, v) { update(d => ({ ...d, logs: { ...d.logs, [date]: { ...(d.logs[date] || {}), [k]: v } } })) }
  // Scores: c{A|B}{oefening}r{ronde}; scan alle rondes.
  function best(g, i) {
    const re = new RegExp(`^c${g}${i}r\\d+$`);
    return Math.max(0, ...Object.values(db.logs).flatMap(l => Object.keys(l).filter(k => re.test(k)).map(k => Number(l[k]) || 0)));
  }
  function startGuided(g) { setGuided({ kind: 'circuit', g, cfg: circuitCfg }) }
  function addMeasure() {
    if (!today.mw && !today.mz) return;
    persist({ ...db, measure: [...db.measure, { date, w: today.mw || '', z: today.mz || '' }] });
  }
  function previous(key) {
    let dates = Object.keys(db.logs).filter(d => d < date && db.logs[d][key]).sort().reverse();
    return dates.length ? db.logs[dates[0]][key] : '';
  }

  if (guided) return <Guided plan={guided} best={best} onLog={log} onExit={() => setGuided(null)} />;

  let mtb = !!today.mtb;
  const switchKind = k => { setKind(k); setChoice('A') };
  return <main>
    {header(<>{weekText}<br />Start 91,5 kg · buik 102 cm</>)}
    <nav>{[['today', 'Vandaag'], ['exercises', 'Oefeningen'], ['food', 'Eten'], ['history', 'Historie']].map(([k, n]) =>
      <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{n}</button>)}</nav>

    {tab === 'today' && <section>
      <h2>Vandaag</h2>
      <p className="weekLine">{weekText}</p>
      <div className="hero"><b>{week[day]}</b><span>{mtb ? 'MTB geregistreerd — vandaag geen stappendoel nodig.' : 'Gemiddeld 7.000–9.000 stappen · ±2.500 kcal · 160–170 g eiwit'}</span></div>
      <label>Stappen<input type="number" disabled={mtb} value={today.steps || ''} onChange={e => log('steps', e.target.value)} /></label>
      <div className="mtb">
        <label className="toggle"><input type="checkbox" checked={mtb} onChange={e => log('mtb', e.target.checked)} /><span>Vandaag mountainbiken</span></label>
        {mtb && <div className="mtbFields">
          <label>Duur (minuten)<input type="number" value={today.mtbMinutes || ''} onChange={e => log('mtbMinutes', e.target.value)} /></label>
          <label>Afstand (km, optioneel)<input type="number" step=".1" value={today.mtbKm || ''} onChange={e => log('mtbKm', e.target.value)} /></label>
        </div>}
      </div>
    </section>}

    {tab === 'exercises' && <section>
      <h2>Oefeningen</h2>
      <div className="seg">
        <button className={kind === 'circuit' ? 'on' : ''} onClick={() => switchKind('circuit')}>Circuit</button>
        <button className={kind === 'strength' ? 'on' : ''} onClick={() => switchKind('strength')}>Kracht</button>
      </div>
      {kind === 'circuit' && <>
        <div className="picker">
          <button className={choice === 'A' ? 'on' : ''} onClick={() => setChoice('A')}>Circuit A</button>
          <button className={choice === 'B' ? 'on' : ''} onClick={() => setChoice('B')}>Circuit B</button>
        </div>
        <div className="hero"><b>Circuit {choice}</b>
          <span>{circuitCfg.rounds} rondes · {circuitCfg.work} sec werken → score → {circuitCfg.rest} sec rust → volgende oefening.</span>
          {choice === 'B' && <span>Op zondag mag een stevige MTB-rit van 45–90 min dit circuit vervangen.</span>}</div>
        <button className="startWorkout" onClick={() => startGuided(choice)}>Start Circuit {choice}</button>
        {circuits[choice].map((x, i) => <article key={i}>
          <Art file={x[1]} name={x[0]} /><b>{x[0]}</b><p>{x[2]}</p>
          <p className="tip"><b>Let op:</b> {x[3]}</p>
          <small>Beste score: {best(choice, i) || '–'}</small>
        </article>)}
      </>}
      {kind === 'strength' && <>
        <div className="picker three">{['A', 'B', 'C'].map(g =>
          <button key={g} className={choice === g ? 'on' : ''} onClick={() => setChoice(g)}>Kracht {g}</button>)}</div>
        <div className="hero"><b>Kracht {choice} + buik</b><span>De startgewichten zijn bewust conservatief. De eerste trainingen gebruiken we om jouw niveau te kalibreren.</span></div>
        {strength[choice].map((x, i) => {
          let key = `s${choice}${i}`, prev = previous(key);
          return <article key={key}>
            <Art file={x[1]} name={x[0]} /><b>{x[0]}</b><em>{x[2]}</em>
            <div className="weightAdvice"><b>Aanbevolen start</b><span>{x[4]}</span>{prev && <small>Vorige training: {prev}</small>}</div>
            <p>{x[3]}</p>
            <input placeholder="bv. 8 kg: 12 / 11 / 9" value={today[key] || ''} onChange={e => log(key, e.target.value)} />
            <small>Regel: haal je alle 3 sets aan de bovengrens met nette techniek, verhoog de volgende keer één gewichtsstap.</small>
          </article>;
        })}
        <h3>Buikblok</h3>
        {abs.map((x, i) => {
          let key = `ab${choice}${i}`, prev = previous(key);
          return <article key={key}>
            <Art file={x[1]} name={x[0]} /><b>{x[0]}</b><em>{x[2]}</em>
            <div className="weightAdvice"><b>Aanbevolen start</b><span>{x[4]}</span>{prev && <small>Vorige training: {prev}</small>}</div>
            <p>{x[3]}</p>
            <input placeholder="gewicht / herhalingen" value={today[key] || ''} onChange={e => log(key, e.target.value)} />
          </article>;
        })}
      </>}
    </section>}

    {tab === 'food' && <section>
      <h2>Eten</h2>
      <div className="hero"><b>±2.500 kcal · 160–170 g eiwit</b><span>Startpunt; na twee weken beoordelen we de trend.</span></div>
      {meals.map(x => <article key={x[0]}><b>{x[0]}</b><p>{x[1]}</p></article>)}
    </section>}

    {tab === 'history' && <section>
      <h2>Voortgang</h2>
      <label>Gewicht (kg)<input type="number" step=".1" value={today.mw || ''} onChange={e => log('mw', e.target.value)} /></label>
      <label>Buik (cm)<input type="number" step=".1" value={today.mz || ''} onChange={e => log('mz', e.target.value)} /></label>
      <button className="save" onClick={addMeasure}>Meting bewaren</button>
      {db.measure.slice().reverse().map((m, i) => <div key={i} className="history"><b>{m.date}</b><span>{m.w || '–'} kg · {m.z || '–'} cm</span></div>)}
    </section>}
  </main>;
}

export default App;
