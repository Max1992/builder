var bricks = [];
//bricks.push(1, 3, 2, 2, 1, 3, 2);
bricks.push(3);

var width = 20;
var height = 10;
var size = width * height;
var field = new Array(size).fill(0);

var index = 0;
var brick;
while ((brick = bricks.shift()) && index != size) {
  var hor = (index % width) + brick <= width;
  var vert = (index / width) + brick <= height;

  if (hor) {
    for (var j = 0; j < brick; j++) {
      if (field[index + j] != 0) {
        hor = false;
        break;
      }
    }
  }

  if (hor) {
    for (var j = 0; j < brick; j++) { 
      field[index + j] = brick;
    }
  } else if (vert) {
    for (var j = 0; j < brick; j++) { 
      field[index + j * width] = brick;
    }
  }

  for (var j = index; j < size; j++) { 
    if (field[j] == 0) {
      break;
    }
    index = index + 1;
  }
}

// field.reverse();

console.log(field);