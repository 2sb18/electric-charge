/* global Raphael, _  */
/* exported Canvas */

var Canvas = function(element_to_attach_to) {
  "use strict";

  var particles; // array of objects. each object has
  // a raphael, an x location, and y location

  var width = 500;
  var height = 500;
  var crosshair_length = 5;

  var paper = new Raphael(element_to_attach_to, width, height);
  paper.canvas.style.backgroundColor = 'black';

  function add_particle(x, y) {
    var path_array = [];

    path_array.push(['M', x - crosshair_length / 2, y]);
    path_array.push(['l', crosshair_length, 0]);
    path_array.push(['M', x, y - crosshair_length / 2]);
    path_array.push(['l', 0, crosshair_length]);
    var path = paper.path(path_array);
    path.attr('stroke', "white");
    return path;
  }

  function clear() {
    _.each(particles,
      function(particle) {
        particle.raphael.remove();
      });
    particles = [];
  }

  return function(method) {
    switch (method) {
      case "clear":
        return clear;
      case "add_particle":
        return add_particle;
    }
  };
};
