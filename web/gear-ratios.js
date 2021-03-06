/* exported gear_sizes, common_gear_sizes, up_unit_in_mm, across_unit_in_mm */
/* exported gear_combinations */

// 40   3649     $1.53
// 36   32498   $1.39
// 24   3648    $0.42
// 20   32269   $0.55
// 16   94925   $0.25
// 12   32270   $0.12
// 8     3647    $0.11

var gear_sizes = [40, 36, 24, 20, 16, 12, 8];
var common_gear_sizes = [24, 20, 16, 12, 8];

// divide by three cause our up_unit is a plate instead of a brick now
var up_unit_in_mm = 9.6 / 3;
// divide by two cause our across_unit is half the distance between holes
var across_unit_in_mm = 8.0 / 2;

// now the base units for up with be plates (1/3 of a brick) and the base units for across will be 1/2s
var gear_combinations = [
  [40, 36, [
    [3, 9],
    [4, 9],
    [6, 8],
    [7, 8],
    [8, 7],
    [9, 6],
    [10, 5],
    [11, 4],
    [12, 0]
  ]],

  [40, 24, [
    [0, 8],
    [1, 8],
    [2, 8],
    [5, 7],
    [7, 6],
    [8, 5],
    [9, 3],
    [10, 1],
    [10, 0]
  ]],

  [40, 20, [
    [3, 7],
    [4, 7],
    [6, 6],
    [7, 5],
    [8, 4],
    [9, 2]
  ]],

  [40, 16, [
    [0, 7],
    [1, 7],
    [2, 7],
    [5, 6],
    [6, 5],
    [7, 4],
    [8, 3]
  ]],

  [40, 12, [
    [3, 6],
    [5, 5],
    [7, 3],
    [8, 2],
    [8, 1],
    [8, 0]
  ]],

  [40, 8, [
    [0, 6],
    [1, 6],
    [4, 5],
    [7, 2]
  ]],

  [36, 36, [
    [0, 9],
    [1, 9],
    [2, 9],
    [5, 8],
    [7, 7],
    [10, 4],
    [11, 2],
    [11, 1]
  ]],

  [36, 24, [
    [3, 7],
    [4, 7],
    [6, 6],
    [7, 5],
    [8, 4],
    [9, 2],
    [9, 1],
    [9, 0]
  ]],

  [36, 20, [
    [0, 7],
    [1, 7],
    [2, 7],
    [5, 6],
    [6, 5],
    [7, 4],
    [8, 3],
    [9, 0]
  ]],

  [36, 16, [
    [3, 6],
    [5, 5],
    [7, 3],
    [8, 0]
  ]],

  [36, 12, [
    [0, 6],
    [1, 6],
    [4, 5],
    [7, 2]
  ]],

  [36, 8, [
    [3, 5],
    [6, 3]
  ]],

  [24, 24, [
    [0, 6],
    [1, 6],
    [2, 6],
    [4, 5],
    [7, 2]
  ]],

  [24, 20, [
    [3, 5],
    [5, 4],
    [6, 3],
    [7, 1],
    [7, 0]
  ]],

  [24, 16, [
    [0, 5],
    [1, 5],
    [2, 5],
    [4, 4],
    [5, 3],
    [6, 1]
  ]],

  [24, 12, [
    [3, 4],
    [4, 3],
    [5, 2]
  ]],

  [24, 8, [
    [0, 4],
    [1, 4],
    [5, 0]
  ]],

  [20, 20, [
    [0, 5],
    [1, 5],
    [4, 4],
    [5, 3],
    [6, 1]
  ]],

  [20, 16, [
    [3, 4],
    [4, 3],
    [5, 2]
  ]],

  [20, 12, [
    [0, 4],
    [1, 4],
    [3, 3],
    [5, 0]
  ]],

  [20, 8, [
    [2, 3],
    [4, 1]
  ]],

  [16, 16, [
    [0, 4],
    [1, 4],
    [5, 1],
    [5, 0]
  ]],

  [16, 12, [
    [2, 3]
  ]],

  [16, 8, [
    [0, 3],
    [1, 3],
    [3, 2]
  ]],

  [12, 12, [
    [0, 3],
    [1, 3],
    [3, 2]
  ]],

  [12, 8, [
    [2, 2],
    [3, 1]
  ]],

  [8, 8, [
    [0, 2],
    [1, 2]
  ]]
];

// var gear_combinations_test = [
//   [8, 8, [
//     [0, 1]
//   ]]
// ];
