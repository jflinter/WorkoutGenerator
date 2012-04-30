WOD Generator
=============
This is a script to generate quick, easily-scalable workouts with just the equipment you have access to.
It's written in pure javascript to make it easily embeddable in a static page. It is very much still in development.

Contents
--------
* wodgenerator.js : Core logic. Defines all the models (workout, exercise, etc).
* exercises.js : Contains a bunch of sample exercises that the generator uses to create workouts.
* testpage.html : a sample application to test and display workouts using the generator.

Coming soon
-----------
* Scaling actually changing the exercise type (e.g. muscle-ups become pullups)
* More workout types (multiple supersets, Tabatas)
* More exercises