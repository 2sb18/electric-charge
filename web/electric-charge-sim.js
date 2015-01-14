/* global _ */
/* exported ElectricChargeSimulator */
// force between charges
// Coloumb's law
// some constant / r^2

var force_constant = 1000;
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
    var distance = Math.sqrt(Math.pow(particleA.x - particleB.x, 2) +
        Math.pow(particleA.y - particleB.y, 2));

    var force = force_constant / Math.pow(distance, 2);

    // b pushing on a
    // var angle = Math.atan ( ( particleA.y - particleB.y ) / ( particleA.x - particleB.x ) );
    var angle = Math.atan2 ( particleA.y - particleB.y, particleA.x - particleB.x );

    return [force * Math.cos ( angle ), force * Math.sin ( angle ) ];
  }

  function collisionDistance ( particle, line ) {


  // going to have to do wall detection!
  function applyForce ( particle, force ) {
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
    _.each ( particles,
        function ( particleA, keyA ) {
          // determine force on particle
          var netForce = [0,0];
          // go through all other particles, add forces up
          _.each ( particles,
            function ( particleB, keyB ) {
              if ( keyA !== keyB ) {
                var force = forceBetweenTwo( particleA, particleB );
                netForce[0] += force[0];
                netForce[1] += force[1];
              }
            });
          // apply net force to the particle, to change it's next velocity and position
          applyForce ( particleA, netForce );
        });
    // go through each particle, moving next velocities to current velocities
    _.each ( particles,
        function ( particle ) {
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
