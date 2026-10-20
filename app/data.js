// Oefening- en programmadefinities.
// Circuit: [naam, afbeelding, uitvoering, aandachtspunt]
// Kracht/buik: [naam, afbeelding, sets × herhalingen, uitvoering, aanbevolen startgewicht]

export const circuits = {
  A: [
    ['Jumping Jacks', 'jumping-jacks', 'Spring voeten naar buiten terwijl armen boven je hoofd gaan. Spring terug en herhaal.', 'Land zacht en houd knieën licht gebogen.'],
    ['Bodyweight Squats', 'bodyweight-squats', 'Voeten schouderbreed. Duw heupen naar achteren, zak gecontroleerd en kom rechtop.', 'Knieën volgen tenen; borst omhoog.'],
    ['Push-ups', 'push-ups', 'Laat borst richting vloer zakken en duw terug.', 'Houd hoofd, romp en benen in één lijn.'],
    ['Mountain Climbers', 'mountain-climbers', 'Start in hoge plank. Breng afwisselend een knie richting borst.', 'Houd heupen zo stil mogelijk.'],
    ['Dumbbell Bent-over Rows', 'dumbbell-bent-over-rows', 'Buig vanuit heupen voorover en trek dumbbells richting onderribben.', 'Rug neutraal; schouderbladen naar elkaar.'],
    ['Dead Bug', 'dead-bug', 'Lig op rug. Strek tegenovergestelde arm en been en wissel.', 'Houd onderrug tegen de mat.'],
  ],
  B: [
    ['Boxing Straight Punches', 'boxing-straight-punches', 'Stoot links en rechts recht vooruit en trek direct terug.', 'Draai licht vanuit romp en heup.'],
    ['Reverse Lunges', 'reverse-lunges', 'Stap één been naar achteren, zak en duw terug.', 'Voorste knie stabiel.'],
    ['Shoulder Taps', 'shoulder-taps', 'Hoge plank. Tik afwisselend de tegenovergestelde schouder.', 'Span buik en billen; heupen stil.'],
    ['Dumbbell Romanian Deadlift', 'dumbbell-romanian-deadlift', 'Duw heupen naar achteren, gewichten langs benen, kom rechtop.', 'Rug neutraal; beweging uit heupen.'],
    ['High Knees', 'high-knees', 'Loop of ren op de plaats en breng knieën hoog.', 'Land zacht en stabiel.'],
    ['Forearm Plank', 'forearm-plank', 'Steun op onderarmen en tenen en houd lichaam recht.', 'Span buik en billen.'],
  ],
};

export const strength = {
  A: [
    ['Floor Press', 'floor-press', '3 × 8–12', 'Lig op rug met dumbbells naast borst. Duw recht omhoog.', '2 × 8 kg'],
    ['One-arm Row', 'one-arm-row', '3 × 8–12 per arm', 'Steun op stoel of bank. Trek dumbbell naar je heup.', '10 kg'],
    ['Shoulder Press', 'shoulder-press', '3 × 8–12', 'Duw dumbbells vanaf schouders boven je hoofd.', '2 × 6,5 kg'],
    ['Lateral Raise', 'lateral-raise', '3 × 12–15', 'Hef lichte dumbbells zijwaarts tot schouderhoogte.', '2 × 3,5 kg'],
    ['Goblet Squat', 'goblet-squat', '3 × 10–12', 'Houd één dumbbell voor borst en zak gecontroleerd.', '10 kg'],
  ],
  B: [
    ['Goblet Squat', 'goblet-squat', '3 × 10–12', 'Gewicht voor borst; zak rustig en kom omhoog.', '10 kg'],
    ['Romanian Deadlift', 'dumbbell-romanian-deadlift', '3 × 8–12', 'Heupen naar achteren, dumbbells langs benen, rug neutraal.', '2 × 10 kg'],
    ['Floor Press', 'floor-press', '3 × 8–12', 'Duw dumbbells vanuit ruglig omhoog.', '2 × 8 kg'],
    ['One-arm Row', 'one-arm-row', '3 × 8–12 per arm', 'Trek dumbbell gecontroleerd naar heup.', '10 kg'],
  ],
  C: [
    ['Floor Press', 'floor-press', '3 × 8–12', 'Duw dumbbells vanuit ruglig omhoog.', '2 × 8 kg'],
    ['One-arm Row', 'one-arm-row', '3 × 8–12 per arm', 'Trek dumbbell naar heup.', '10 kg'],
    ['Shoulder Press', 'shoulder-press', '3 × 8–12', 'Duw dumbbells vanaf schouders omhoog.', '2 × 6,5 kg'],
    ['Lateral Raise', 'lateral-raise', '3 × 12–15', 'Hef lichte dumbbells gecontroleerd zijwaarts.', '2 × 3,5 kg'],
    ['Split Squat', 'split-squat', '3 × 8–10 per been', 'Eén voet voor en één achter; zak recht omlaag.', 'Lichaamsgewicht'],
    ['Romanian Deadlift', 'dumbbell-romanian-deadlift', '3 × 8–12', 'Duw heupen naar achteren en kom gecontroleerd rechtop.', '2 × 10 kg'],
  ],
};

export const abs = [
  ['Dead Bug', 'dead-bug', '3 × 8–10 per kant', 'Lig op je rug, armen naar het plafond, knieën boven de heupen. Strek tegenovergestelde arm en been net boven de vloer, terug, wissel.', 'Lichaamsgewicht'],
  ['Reverse Crunch', 'reverse-crunches', '3 × 8–15', 'Breng knieën richting borst en kantel bekken rustig omhoog.', 'Lichaamsgewicht'],
  ['Forearm Plank', 'forearm-plank', '3 × 30–60 sec', 'Span buik en billen en houd lichaam recht.', 'Lichaamsgewicht'],
];

// Reismodus "Zonder gewichten": lichaamsgewicht-varianten, gesleuteld op de afbeelding
// (tweede veld van een oefening), zodat het voor circuit én kracht werkt.
// [naam, afbeelding, uitvoering, aandachtspunt, sets × herhalingen (alleen als die afwijkt)]
const towelRow = ['Handdoek-row aan de deur', 'towel-row', 'Handdoek om de deurklink, voeten bij de deur, hang achterover met gestrekte armen en trek jezelf naar de deur.', 'Lichaam blijft één rechte lijn. Zwaarder: voeten dichter bij de deur.'];
const maxReps = '3 × zo veel nette herhalingen als lukt';
export const bodyweightSubs = {
  'dumbbell-bent-over-rows': towelRow,
  'one-arm-row': towelRow,
  'dumbbell-romanian-deadlift': ['Single-leg RDL', 'single-leg-rdl', 'Op één been, knie licht gebogen. Buig vanuit de heup voorover en strek het andere been naar achteren.', 'Heupen recht naar de vloer, rug neutraal. Hand tegen de muur mag.'],
  'floor-press': ['Push-ups', 'push-ups', 'Handen iets breder dan schouders. Zak gecontroleerd en duw terug.', 'Hoofd, romp en benen in één lijn. Lichter: handen op een verhoging.', maxReps],
  'shoulder-press': ['Pike Push-up', 'pike-push-up', 'Heupen hoog in een omgekeerde V, hoofd richting vloer zakken en terugduwen.', 'Ellebogen naar achteren, niet wijd. Voeten op een stoel maakt het zwaarder.', maxReps],
  'lateral-raise': ['Superman Hold', 'superman-hold', 'Op de buik, armen vooruit. Til armen, borst en benen een paar centimeter op, 3 tellen vast.', 'Kijk naar de vloer, nek in lijn.', '3 × 30 sec'],
  'goblet-squat': ['Tempo Squat', 'bodyweight-squats', 'Zak in drie tellen, één tel pauze onderin, kom omhoog.', 'Knieën volgen tenen, hielen blijven staan.'],
};

// Oefening met lichaamsgewicht-variant als noWeights aan staat, anders ongewijzigd.
// Circuit (4 velden) blijft circuitvorm; kracht krijgt het aandachtspunt als zesde veld.
export function withSubs(ex, noWeights) {
  const sub = noWeights && bodyweightSubs[ex[1]];
  if (!sub) return ex;
  const [name, file, how, tip, sets] = sub;
  return ex.length === 4 ? [name, file, how, tip] : [name, file, sets || ex[2], how, 'Lichaamsgewicht', tip];
}

// Krachtlogs van een vervangen oefening krijgen prefix 'bw', zodat "Vorige training"
// van de dumbbell-oefening niet vermengd raakt met een push-up-score.
export function strengthKey(ex, g, i, noWeights) {
  return `${noWeights && bodyweightSubs[ex[1]] ? 'bw' : ''}s${g}${i}`;
}

// Afbeeldingen die alleen als .svg bestaan; de rest is .png.
export const svgCards = ['towel-row', 'single-leg-rdl', 'pike-push-up', 'superman-hold', 'side-plank', 'bird-dog', 'glute-bridge'];

// Mogelijke sessies in het weekschema en welke begeleide training erbij hoort.
export const sessionTypes = {
  'Rust + wandelen': { kind: 'rest' },
  'Kracht A + buik': { kind: 'strength', g: 'A' },
  'Kracht B + buik': { kind: 'strength', g: 'B' },
  'Kracht C + buik': { kind: 'strength', g: 'C' },
  'Fit Circuit A': { kind: 'circuit', g: 'A' },
  'Fit Circuit B / MTB': { kind: 'circuit', g: 'B' },
};

export const dayNames = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];

export const meals = [
  ['Ontbijt', '300 g magere kwark/skyr + 50 g havermout + fruit; of 3 eieren + 2 volkoren boterhammen + fruit.'],
  ['Lunch', '3–4 volkoren boterhammen met royale portie kip, rosbief, tonijn of eieren + groente.'],
  ['Diner', '±200 g kip/vis/mager vlees + veel groente + normale portie aardappel, rijst of pasta.'],
  ['Tussendoor', 'Kwark/skyr, fruit, cottage cheese of eiwitshake.'],
];

// Programma: 16 weken vanaf de startdatum.
export const PROGRAMME_WEEKS = 16;
export const DEFAULT_SETTINGS = {
  startDate: '2026-10-06',
  noWeights: false,
  // Maandag eerst.
  schedule: ['Rust + wandelen', 'Kracht A + buik', 'Fit Circuit A', 'Kracht B + buik', 'Rust + wandelen', 'Fit Circuit B / MTB', 'Kracht C + buik'],
};

// Circuitopbouw per week. Pas hier rondes en werk/rust-tijden (seconden) aan.
export const circuitProgression = [
  { from: 1, to: 4, rounds: 2, work: 60, rest: 30 },
  { from: 5, to: 8, rounds: 3, work: 60, rest: 30 },
  { from: 9, to: 12, rounds: 3, work: 45, rest: 15 },
  { from: 13, to: 16, rounds: 4, work: 45, rest: 15 },
];

export function circuitFor(weekNr) {
  return circuitProgression.find(p => weekNr >= p.from && weekNr <= p.to)
    || (weekNr < 1 ? circuitProgression[0] : circuitProgression[circuitProgression.length - 1]);
}

// Warming-up en cooling-down voor begeleide trainingen: [naam, instructie, seconden].
// De laatste warming-upoefening is een lichte versie van de eerste oefening van de training.
export function warmup(firstExercise) {
  return [
    ['Marcheren met armcirkels', 'Marcheer stevig op de plaats en maak grote armcirkels; halverwege andersom.', 60],
    ['Langzame squats', 'Zak in drie tellen, kom in één tel omhoog. Alleen lichaamsgewicht.', 45],
    ['Heupscharnier (hip hinge)', 'Handen op de heupen, duw je heupen naar achteren met rechte rug en kom weer rechtop.', 45],
    ['Inchworms', 'Loop met je handen naar een plank en weer terug; knieën mogen buigen.', 45],
    [`Lichte uitvoering: ${firstExercise}`, 'Rustig tempo, zonder of met licht gewicht, op ongeveer de helft van je inzet.', 45],
  ];
}

export const cooldown = [
  ['Heupbuigers – links', 'Kniel op je linkerknie, rechtervoet voor. Schuif je heup naar voren en span je bil aan.', 40],
  ['Heupbuigers – rechts', 'Kniel op je rechterknie, linkervoet voor. Schuif je heup naar voren en span je bil aan.', 40],
  ['Hamstrings – links', 'Linkerbeen gestrekt op de hak, buig met rechte rug vanuit je heup naar voren.', 40],
  ['Hamstrings – rechts', 'Rechterbeen gestrekt op de hak, buig met rechte rug vanuit je heup naar voren.', 40],
  ['Borst (deurpost)', 'Onderarmen tegen de deurpost op schouderhoogte en stap rustig door tot je de borst voelt.', 40],
  ['Latissimus', 'Pak een deurpost of tafelrand en zak met je heupen naar achteren tot je de zijkant van je rug voelt.', 40],
  ['Kindhouding', 'Zit op je hielen, armen ver naar voren, borst richting de vloer en adem rustig door.', 40],
];

// Begeleide krachttraining als supersets. Elk blok is een lijst indexen in strength[g],
// zodat de log-sleutels (s{g}{index}) gelijk blijven aan het Oefeningen-tabblad.
// Per ronde: alle oefeningen van het blok achter elkaar, daarna rust.
export const strengthSupersets = {
  A: [[0, 1], [2, 3], [4]], // Floor Press + One-arm Row, Shoulder Press + Lateral Raise, Goblet Squat
  B: [[0, 1], [2, 3]], // Goblet Squat + Romanian Deadlift, Floor Press + One-arm Row
  C: [[0, 1], [2, 3], [4, 5]], // Floor Press + One-arm Row, Shoulder Press + Lateral Raise, Split Squat + Romanian Deadlift
};
export const STRENGTH_ROUNDS = 3;
export const SUPERSET_REST = 75; // rust tussen rondes van een superset (seconden)
export const SINGLE_REST = 90; // rust tussen sets van een losse oefening
// Buikblok als één circuit: Dead Bug → Reverse Crunch → Forearm Plank.
export const ABS_ROUNDS = 3;
export const ABS_REST = 30;
