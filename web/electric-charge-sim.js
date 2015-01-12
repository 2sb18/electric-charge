/* global _ */
/* exported ElectricChargeSimulator */
// force between charges
// Coloumb's law
// some constant / r^2

var force_constant = 1;

var ElectricChargeSimulator = function() {
  "use strict";

  var particles = []; // each particle has an x, y, xv (x velocity),
  // and yv (y velocity), nx, ny, nxv, and nyv
  //

  function add_particle(x, y) {
    var particle = {};
    particle.x = x;
    particle.y = y;
    particle.xv = 0;
    particle.yv = 0;
    particles.push(particle);
  }

  function forceBetweenTwo(particleA, particleB) {
    // we can't to return the force acting on particleA
    // as an x force and a y force

    // first, find distance
    var distance = Math.sqrt(Math.pow(particleA.x - particleB.x, 2) +
      Math.pow(particleB.y - particleB.y, 2));

    var force = force_constant / Math.pow(distance, 2);

    return [force *



      // terrible name for a function!
      function proceed() {
        // 1. go through each particle, determine new forces on it from old forces
        //





      }

      function get_positions() {
        var positions = [];
        _.each(particles,
          function(particle) {
            positions.push([particle.x, particle.y]);
          });
        return positions;
      }

      return function(method) {
        switch (method) {
          case "get_positions":
            return get_positions;
          case "add_particle":
            return add_particle;
          case "proceed":
            return proceed;
        }
      };
    };
