/* global _ */
/* exported ElectricChargeSimulator */
// force between charges
// Coloumb's law
// some constant / r^2

var force_constant = 100;
var mass_constant = 1;
var time_constant = 1;

var ElectricChargeSimulator = function() {
  "use strict";

  var particles = []; // each particle has an x, y, xv (x velocity),
  // and yv (y velocity), nx, ny, nxv, and nyv
  //
  //
  var lines = [];

  function add_line(x1, y1, x2, y2) {
    var line = {};
    line.x1 = x1;
    line.y1 = y1;
    line.x2 = x2;
    line.y2 = y2;
    lines.push(line);
  }

  function add_particle(x, y) {
    var particle = {};
    particle.x = x;
    particle.y = y;
    particle.xv = 0;
    particle.yv = 0;
    particle.nx = 0;
    particle.ny = 0;
    particle.nxv = 0;
    particle.nyv = 0;
    particles.push(particle);
  }

  function forceBetweenTwo(particleA, particleB) {
    // we can't to return the force acting on particleA
    // as an x force and a y force

    // first, find distance
    var distance_squared = Math.pow(particleA.x - particleB.x, 2) +
      Math.pow(particleA.y - particleB.y, 2);

    var force = force_constant / distance_squared;
    var angle = Math.atan2(particleA.y - particleB.y, particleA.x - particleB.x);

    return [force * Math.cos(angle), force * Math.sin(angle)];
  }

  // return -1 if it's not going to collide
  // returns the distance from the particle if they are going to collide
  // this works with x,y,nxv, and nyv
  function collisionDistance(particle, line) {
    var lengthOfLine = Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2));

    var slopeOfLine = (line.y2 - line.y1) / (line.x2 - line.x1);
    var slopeOfParticle = particle.nyv / particle.nxv;

    var xCollision, yCollision;

    if (slopeOfLine == slopeOfParticle) {
      // check if they're the same line
      return -1;
    }

    if (slopeOfLine == "Infinity") {
      yCollision = slopeOfParticle * (line.x1 - particle.x) + particle.y;
      xCollision = line.x1;
      // xCollision = (yCollision - particle.y + slopeOfParticle * particle.x) / slopeOfParticle;
    } else if (slopeOfParticle == "Infinity") {
      yCollision = slopeOfLine * (particle.x - line.x1) + line.y1;
      xCollision = particle.x1;
      // xCollision = (yCollision - line.y1 + slopeOfLine * line.x1) / slopeOfLine;
    } else {
      xCollision = (particle.y - line.y1 + slopeOfLine * line.x2 - slopeOfParticle * particle.x) / (slopeOfLine - slopeOfParticle);
      yCollision = slopeOfLine * (xCollision - line.x2) + line.y1;
    }

    var distanceFromLinePointToCollision = Math.sqrt(Math.pow(xCollision - line.x2, 2) + Math.pow(yCollision - line.y2), 2);

    if (distanceFromLinePointToCollision > lengthOfLine) {
      return -1;
    }

    // calculate distance from particle to collision
    var distanceFromParticleToCollision = Math.sqrt(Math.pow(xCollision - particle.x, 2) + Math.pow(yCollision - particle.y, 2));
    return distanceFromParticleToCollision;
  }

  // going to have to do wall detection!
  function applyForce(particle, force) {
    // F = m * a, so a = F / m
    // for now, let's just say Force = acceleration
    // let's also say that we're working over one second, so velocity will change by force

    // first, let's do next velocity
    particle.nxv = particle.xv + force[0];
    particle.nyv = particle.yv + force[1];

    // is it going to run into any lines?

    // 


    // now, let's do next position
    particle.nx = particle.x + particle.nxv;
    particle.ny = particle.y + particle.nyv;
  }

  // terrible name for a function!
  function update() {
    // go through each particle, calculating the next positions and velocities
    _.each(particles,
      function(particleA, keyA) {
        // determine force on particle
        var netForce = [0, 0];
        // go through all other particles, add forces up
        _.each(particles,
          function(particleB, keyB) {
            if (keyA !== keyB) {
              var force = forceBetweenTwo(particleA, particleB);
              netForce[0] += force[0];
              netForce[1] += force[1];
            }
          });
        // apply net force to the particle, to change it's next velocity and position
        applyForce(particleA, netForce);
      });
    // go through each particle, moving next velocities to current velocities
    _.each(particles,
      function(particle) {
        particle.x = particle.nx;
        particle.y = particle.ny;
        particle.xv = particle.nxv;
        particle.yv = particle.nyv;
      });
  };

  function get_positions() {
    var positions = [];
    _.each(particles,
      function(particle) {
        positions.push([particle.x, particle.y]);
      });
    return positions;
  }

  function get_lines() {
    var l = [];
    _.each(lines,
      function(line) {
        l.push([line.x1, line.y1, line.x2, line.y2]);
      });
    return l;
  }

  return function(method) {
    switch (method) {
      case "get_positions":
        return get_positions;
      case "get_lines":
        return get_lines;
      case "add_particle":
        return add_particle;
      case "add_line":
        return add_line;
      case "update":
        return update;
    }
  };
}

// function testCollisionDistance() {
//   var particle = {
//     x: 0,
//     y: 0,
//     nxv: 3,
//     nyv: 0
//   };
//   var line = {
//     x1: 5,
//     y1: -3,
//     x2: 5,
//     y2: 7
//   };
//
//   if (collisionDistance(particle, line) !== 5) {
//     console.log("problem with testCollisionDistance");
//   }
// }
// testCollisionDistance();
