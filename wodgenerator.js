/* classes */

function Workout(difficulty, legalExercises) {
    this.workoutType = (Math.random() > 0.5) ? "AMRAP": "Rounds";
    this.numberOfRounds = Math.floor((Math.random() * 10) + 1);
    if (this.workoutType == "AMRAP") {
        this.time = Math.floor((Math.random() * 10) + 10);
        this.numberOfRounds++;
    }
    this.superset = generateSuperset(difficulty / this.numberOfRounds, legalExercises);
    this.scaleToDifficulty(difficulty);
}

function Exercise(name, category, scales, difficultyFunction, renderFunction, options) {
    this.name = name;
    this.category = category;
    this.scales = scales;
    this.difficultyFunction = difficultyFunction;
    this.render = renderFunction;
    this.options = options ? options: {};
    this.options.maxReps = this.options.maxReps ? this.options.maxReps : 9999;
    this.options.minReps = this.options.minReps ? this.options.minReps : 1;
}
Exercise.prototype.renderForLevel = function(level) {
  var scale = this.scales[level];
  return this.render(scale);
}
Exercise.prototype.difficultyAtLevel = function(level) {
  var scale = this.scales[level];
  return this.difficultyFunction(this.scales[level]);
}

function Set(exercise, difficultyLevel, reps, order) {
    this.exercise = exercise;
    this.difficultyLevel = difficultyLevel;
    this.reps = reps;
    this.order = order;
}

function Superset(sets) {
    this.sets = sets;
}

Array.prototype.randomIndex = function() {
    return Math.floor(Math.random() * this.length);
}

Array.prototype.weightedIndex = function() {
  var x = (Math.random() * 2) - 1; // -1 to 1
  var y = (Math.random() * 2) - 1; // -1 to 1
  var z = (Math.random() * 2) - 1; // -1 to 1
  var g = x + y + z; // -3 to 3
  var r = (g / 6) + 0.5; // 0 to 1
  return Math.floor(r * this.length);
}

/* Minor Helper Functions */

Set.prototype.difficulty = function() {
    return this.exercise.difficultyAtLevel(this.difficultyLevel) * this.reps;
}

Superset.prototype.difficulty = function() {
    var totalDifficulty = 0;
    for (var i = 0; i < this.sets.length; i++) {
        totalDifficulty += this.sets[i].difficulty();
    }
    return totalDifficulty;
}

Workout.prototype.difficulty = function() {
    return this.numberOfRounds * this.superset.difficulty();
}

/* Rendering functions */

Superset.prototype.render = function() {
    var renderedOutput = "";
    for (var i = 0; i < this.sets.length; i++) {
        renderedOutput += ("<dd>" + this.sets[i].render() + "</dd>");
    }
    return renderedOutput;
}

Set.prototype.render = function() {
    return this.reps + " " + this.exercise.renderForLevel(this.difficultyLevel) + " difficulty: " + this.difficulty();
}

Workout.prototype.render = function() {
    var renderedWorkout = "<dl><dt>";
    if (this.workoutType == "AMRAP") {
        renderedWorkout += "As many rounds as possible in " + this.time + " minutes of: (target goal: "+ this.numberOfRounds + " rounds)"
    }
    else {
        renderedWorkout += this.numberOfRounds + " rounds of:"
    }
    renderedWorkout += "</dt>";
    renderedWorkout += this.superset.render();
    renderedWorkout += "</dl>";
    renderedWorkout += "Total Difficulty: " + this.difficulty();
    return renderedWorkout;
};

/* Workout generation logic. */

function generateSet(exercise, targetDifficulty, order) {
    var difficultyLevel = exercise.scales.weightedIndex();
    var repDifficulty = exercise.difficultyAtLevel(difficultyLevel);
    var reps = Math.max(Math.floor(targetDifficulty / repDifficulty), 1);
    reps = Math.max(Math.min(exercise.options.maxReps, reps), exercise.options.minReps);
    return new Set(exercise, difficultyLevel, reps, order);
}

Set.prototype.scaleInDifficulty = function(direction) {
  //This method should scale the set as little as possible.
  var ex = this.exercise;
  var level = this.difficultyLevel;
  var canScaleReps = (this.reps + direction >= ex.options.minReps && this.reps + direction <= ex.options.maxReps);
  var canScaleDifficulty = !(level == -1 || level == 0 && direction == -1 || level == ex.scales.length-1 && direction == 1);
  if (!canScaleDifficulty && !canScaleReps) {
    return false;
  }
  if (canScaleDifficulty && !canScaleReps) {
    this.difficultyLevel += direction;
    return true;
  }
  if (canScaleDifficulty && canScaleReps) {
    var currentDifficulty = this.difficulty();
    var increasedRepDifficulty = (this.reps + 1) * ex.difficultyAtLevel(level);
    var newDifficulty = ex.difficultyAtLevel(level + direction);
    var mostPossibleReps = Math.ceil(this.reps * (currentDifficulty/newDifficulty));
    for (var reps = 0; reps <= mostPossibleReps; reps++) {
      var increasedScaleDifficulty = reps * newDifficulty;
      if (Math.abs(increasedScaleDifficulty - currentDifficulty) < Math.abs(increasedRepDifficulty - currentDifficulty)) {
        if (reps >= ex.options.minReps && reps <= ex.options.maxReps) {
          this.reps = reps;
          this.difficultyLevel += direction;
          return true;
        }
      }
    }
  }
  if (canScaleReps) {
    this.reps += direction;
    return true;
  }
  return false;
}

Superset.prototype.scaleToDifficulty = function(targetDifficulty) {
  this.sets.sort(function(a,b) {
    return a.difficulty() > b.difficulty();
  });
  var success = true;
  if (this.difficulty() > targetDifficulty) {
    while (this.difficulty() > targetDifficulty && success) {
      for (var i = this.sets.length-1; i >= 0; i--) {
        success = this.sets[i].scaleInDifficulty(-1);
        if (success) {
          break;
        }
      }
    }
  }
  else {
    while (this.difficulty() < targetDifficulty && success) {
      for (var i = 0; i < this.sets.length; i++) {
        success = this.sets[i].scaleInDifficulty(1);
        if (success) {
          break;
        }
      }
    }
  }
  return this;
}

function generateSuperset(difficulty, legalExercises) {
    var totalDifficulty = 0;
    var sets = [];
    var order = 0;
    while (totalDifficulty < difficulty || sets.length < 3) {
      var exercise = legalExercises.splice(legalExercises.randomIndex(), 1)[0];
      var set;
      while (true) {
        var maxDifficulty = Math.min(difficulty * 0.8, difficulty - totalDifficulty);
        var targetDifficulty = Math.min(Math.floor(Math.random() * (difficulty)), maxDifficulty);
        set = generateSet(exercise, targetDifficulty, order);
        if (set.reps) {
            break;
        }
      }
      sets.push(set);
      totalDifficulty += set.difficulty();
      order++;
    }
    return new Superset(sets);
}


Workout.prototype.scaleToDifficulty = function(difficulty) {
  this.superset.scaleToDifficulty(difficulty/this.numberOfRounds);
  this.superset.sets.sort(function(a,b) {
    return a.order > b.order;
  });
}
