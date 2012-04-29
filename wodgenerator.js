Array.prototype.randomIndex = function() {
    return Math.floor(Math.random() * this.length);
}

function Exercise(name, legalScales, difficultyFunction, renderFunction, options) {
    this.name = name;
    this.legalScales = legalScales;
    this.difficultyForScale = difficultyFunction;
    this.getLegalScale = function() {
      return this.legalScales[this.legalScales.randomIndex()]
    };
    this.render = renderFunction;
    this.options = options ? options : {};
}

function Set(exercise, scale, reps) {
    this.exercise = exercise;
    this.scale = scale;
    this.reps = reps;
}
Set.prototype.difficulty = function() {
    return this.exercise.difficultyForScale(this.scale) * this.reps;
}
Set.prototype.render = function() {
  return this.reps + " " + this.exercise.render(this.scale);
}
function generateSet(exercise, difficulty) {
  var scale = exercise.getLegalScale();
  var repDifficulty = exercise.difficultyForScale(scale);
  var reps = exercise.options.oneRepOnly ? 1 : Math.floor(difficulty / repDifficulty);
  return new Set(exercise, scale, reps);
}

function Superset(sets) {
    this.sets = sets;
}
Superset.prototype.difficulty = function() {
    var totalDifficulty = 0;
    for (var set in this.sets) {
        totalDifficulty += set.difficulty();
    }
    return totalDifficulty;
}
Superset.prototype.render = function() {
  var renderedOutput = "";
  for (var i = 0; i < this.sets.length; i++) {
    renderedOutput += ("-"+this.sets[i].render()+"\n");
  }
  return renderedOutput;
}
function generateSuperset(difficulty, legalExercises) {
    var totalDifficulty = 0;
    var sets = [];
    while (totalDifficulty < difficulty || sets.length < 2) {
        var exercise = legalExercises.splice(legalExercises.randomIndex(), 1)[0];
        if (!exercise) {
          break;
        }
        var set;
        while (true) {
          set = generateSet(exercise, Math.floor(Math.random() * (difficulty)));
          if (set.reps) {
            break;
          }
        }
        sets.push(set);
        totalDifficulty += set.difficulty();
    }
    var randomOrder = (Math.random() > 0.5) ? 1 : -1;
    sets.sort(function(a, b) {
      return (a.reps > b.reps ? 1 : -1) * randomOrder;
    });
    return new Superset(sets);
}

function Workout(difficulty, legalExercises) {
    this.numberOfRounds = Math.floor((Math.random()*10)+1);
    this.superset = generateSuperset(difficulty / this.numberOfRounds, legalExercises);
}
Workout.prototype.render = function() {
  var renderedWorkout = "";
  if (Math.random() > 0.5) {
    renderedWorkout += this.numberOfRounds + " rounds of:\n"
  }
  else {
    var minutes = this.numberOfRounds = Math.floor((Math.random()*10)+10);
    renderedWorkout += "As many rounds as possible in " + minutes + " minutes of:\n"
  }
  renderedWorkout += this.superset.render();
  return renderedWorkout;
};


legalExercises = [
new Exercise('Pushup', [1],
function() {
    return 1
},
function() {
    return 'pushups'
}),

new Exercise('Pullup', [1],
function() {
    return 5
},
function() {
    return 'pullups'
}),

new Exercise('Run', [200, 400, 800, 1200, 1600],
function(distance) {
    return distance * (50 / 1200)
},
function(scale) {
    return scale + 'm run'
},
{oneRepOnly : true}),

new Exercise('Row', [200, 400, 800, 1200, 1600],
function(distance) {
    return distance * (50 / 800)
},
function(scale) {
    return scale + 'm row'
},
{oneRepOnly : true}),

new Exercise('Burpee', [1],
function() {
    return 1
},
function() {
    return 'burpees'
}),

new Exercise('Situp', [1],
function() {
    return 0.3
},
function() {
    return 'situps'
}),

new Exercise('KB Swing', [15, 30, 45],
function(weight) {
    return weight / 45
},
function(scale) {
    return scale +'kg kettlebell swings'
}),

new Exercise('Air Squat', [1],
function() {
    return 0.5
},
function() {
    return 'air squats'
}),
];