MathUtils = {
  range : function(start, end, scale) {
  scale = scale || 1;
  var generatedRange = []
  for (var i = start; i <= end; i+=scale) {
    generatedRange.push(i);
  }
  return generatedRange;
}
};

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
  'Handstand Pushup',
  'Bodyweight', 
  [1], 
  function() { return 3 }, 
  function() { return 'handstand pushups' }, 
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
  'Pistol Squat',
  'Bodyweight',
  [1],
  function() { return 2 },
  function() { return 'pistol squats (each leg)' },
  {minReps: 3}
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
  [16, 20, 24, 28],
  function(weight) { return 1 + weight / 20 },
  function(scale) { return scale +'kg kettlebell swings' },
  {minReps: 5}
),

new Exercise(
  'KB Snatch', 
  'Kettlebells',
  [16, 20, 24, 28],
  function(weight) { return 1 + weight / 20 },
  function(scale) { return scale +'kg kettlebell snatches' },
  {minReps: 5}
),

//Pullup Bar
new Exercise(
  'Pullup',
  'Bar',
  [1],
  function() { return 3 },
  function() { return 'pullups' },
  {minReps: 3}
),

new Exercise(
  'Toes to bar',
  'Bar',
  [1],
  function() { return 1 },
  function() { return 'toe-to-bars' },
  {minReps: 5}
),

//Jump Rope
new Exercise(
  'Single Under',
  'Rope',
  [1],
  function() { return 0.2 },
  function() { return 'single unders' },
  {minReps: 25}
),

new Exercise(
  'Double Under',
  'Rope',
  [1],
  function() { return 0.8 },
  function() { return 'double unders' },
  {minReps: 10}
),

//Barbell

new Exercise(
  'Deadlift',
  'Barbell',
  MathUtils.range(65, 245, 20),
  function(weight) { return (weight * .055) - 1.475 },
  function(weight) { return weight + 'lb deadlifts' }
),
  
new Exercise(
  'Power Clean',
  'Barbell',
  MathUtils.range(45, 205, 20),
  function(weight) { return (weight * .055) - 1.475 },
  function(weight) { return weight + 'lb power cleans' }
),

new Exercise(
  'Front Squat',
  'Barbell',
  MathUtils.range(65, 205, 10),
  function(weight) { return (weight * .055) - 1.475 },
  function(weight) { return weight + 'lb front squats' }
),
  
new Exercise(
  'Back Squat',
  'Barbell',
  MathUtils.range(85, 285, 20),
  function(weight) { return (weight * .055) - 1.475 },
  function(weight) { return weight + 'lb back squats' }
),
      
//Other

new Exercise(
  'Row', 
  'Other', 
  [200, 400, 800, 1200, 1600, 2000],
  function(distance) { return (distance * (1/45)) -30 },
  function(scale) { return scale + 'm row' },
  {maxReps : 1}
),

new Exercise(
  'Box Jumps', 
  'Other', 
  [8, 12, 16, 20, 24, 28, 32],
  function(height) { return height / 16 },
  function(height) { return height + '" box jumps' },
  {minReps : 3}
),

],
other : [
new Exercise(
  'Rest', 
  'Other',
  function() { return 0 },
  function(time) { return time + 'mminute rest' }
),
]

};

