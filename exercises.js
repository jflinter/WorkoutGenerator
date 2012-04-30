WodGenerator = {
  exercises : [

//Bodyweight/No equipment
new Exercise(
  'Pushup',
  'Bodyweight', 
  [1], 
  function() { return 1 }, 
  function() { return 'pushups' }, 
  {minReps: 5}
),

new Exercise(
  'Pullup',
  'Bar',
  [1],
  function() { return 3 },
  function() { return 'pullups' },
  {minReps: 3}
),

new Exercise(
  'Burpee',
  'Bodyweight',
  [1],
  function() { return 1 },
  function() { return 'burpees' },
  {minReps:3}
),

new Exercise(
  'Situp',
  'Bodyweight',
  [1],
  function() { return 0.3 },
  function() { return 'situps' }, 
  {minReps: 5, maxReps: 100}
),

new Exercise(
  'Air Squat',
  'Bodyweight',
  [1],
  function() { return 0.5 },
  function() { return 'air squats' },
  {minReps: 5}
),

new Exercise(
  'Run',
  'Bodyweight',
  [200, 400, 800, 1200, 1600],
  function(distance) { return distance * (50 / 1200) },
  function(scale) { return scale + 'm run' },
  {maxReps : 1}
),

//Kettlebells

new Exercise(
  'KB Swing', 
  'Kettlebells',
  [15, 30, 45],
  function(weight) { return 1 + weight / 45 },
  function(scale) { return scale +'kg kettlebell swings' },
  {minReps: 5}
),

//Other

new Exercise(
  'Row', 
  'Other', 
  [200, 400, 800, 1200, 1600],
  function(distance) { return distance * (50 / 800) },
  function(scale) { return scale + 'm row' },
  {maxReps : 1}
),

]};