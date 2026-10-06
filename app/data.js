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
  ['Weighted Crunch', 'weighted-crunch', '3 × 10–15', 'Krul schouders van vloer; houd eventueel een licht gewicht bij borst.', '2,5–3,5 kg'],
  ['Reverse Crunch', 'reverse-crunches', '3 × 8–15', 'Breng knieën richting borst en kantel bekken rustig omhoog.', 'Lichaamsgewicht'],
  ['Forearm Plank', 'forearm-plank', '3 × 30–60 sec', 'Span buik en billen en houd lichaam recht.', 'Lichaamsgewicht'],
];

export const week = ['Kracht A + buik', 'Fit Circuit A', 'Rust + wandelen', 'Kracht B + buik', 'Rust + wandelen', 'Kracht C + buik', 'Fit Circuit B / MTB'];

export const meals = [
  ['Ontbijt', '300 g magere kwark/skyr + 50 g havermout + fruit; of 3 eieren + 2 volkoren boterhammen + fruit.'],
  ['Lunch', '3–4 volkoren boterhammen met royale portie kip, rosbief, tonijn of eieren + groente.'],
  ['Diner', '±200 g kip/vis/mager vlees + veel groente + normale portie aardappel, rijst of pasta.'],
  ['Tussendoor', 'Kwark/skyr, fruit, cottage cheese of eiwitshake.'],
];
