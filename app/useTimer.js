'use client';
import { useEffect, useState } from 'react';

// Houdt het scherm aan zolang `active` waar is. iOS/Safari geven het slot vrij
// zodra de pagina verborgen wordt, dus we vragen het opnieuw aan bij terugkeer.
export function useWakeLock(active) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !('wakeLock' in navigator)) return;
    let lock = null, cancelled = false;
    const request = async () => {
      if (document.visibilityState !== 'visible' || (lock && !lock.released)) return;
      try {
        const l = await navigator.wakeLock.request('screen');
        if (cancelled) l.release().catch(() => {});
        else lock = l;
      } catch {}
    };
    request();
    document.addEventListener('visibilitychange', request);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', request);
      if (lock) lock.release().catch(() => {});
    };
  }, [active]);
}

// Stappen met `secs` lopen automatisch af op basis van een eindtijdstip.
// Stappen zonder `secs` (score invullen, kracht-set, klaar) wachten op de gebruiker.
function enter(steps, idx, from) {
  const s = steps[idx];
  return { idx, endAt: s && s.secs ? from + s.secs * 1000 : null, pausedMs: null };
}

// Was de pagina verborgen, dan kunnen meerdere getimede stappen verstreken zijn:
// schuif door tot de stap die nu volgens de klok actief is.
function catchUp(steps, s, now) {
  if (s.endAt == null || s.endAt > now) return s;
  let { idx, endAt } = s;
  while (endAt != null && endAt <= now && idx < steps.length - 1) {
    idx++;
    endAt = steps[idx].secs ? endAt + steps[idx].secs * 1000 : null;
  }
  return { idx, endAt: endAt != null && endAt <= now ? null : endAt, pausedMs: null };
}

export function useSequence(steps) {
  const [state, setState] = useState(() => enter(steps, 0, Date.now()));
  const [now, setNow] = useState(() => Date.now());
  const running = state.endAt != null;

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const t = Date.now();
      setState(s => catchUp(steps, s, t));
      setNow(t);
    };
    tick();
    const id = setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', tick) };
  }, [running, steps]);

  const step = steps[state.idx];
  const left = state.endAt != null ? Math.min(step.secs, Math.max(0, Math.ceil((state.endAt - now) / 1000)))
    : state.pausedMs != null ? Math.ceil(state.pausedMs / 1000)
    : step.secs || 0;

  return {
    idx: state.idx,
    step,
    left,
    running,
    paused: state.pausedMs != null,
    pause: () => setState(s => s.endAt == null ? s : { ...s, endAt: null, pausedMs: Math.max(0, s.endAt - Date.now()) }),
    resume: () => setState(s => s.pausedMs == null ? s : { ...s, endAt: Date.now() + s.pausedMs, pausedMs: null }),
    goto: i => setState(enter(steps, Math.min(i, steps.length - 1), Date.now())),
    next: () => setState(s => enter(steps, Math.min(s.idx + 1, steps.length - 1), Date.now())),
  };
}
