
const canvas = document.getElementById("canvas");
const image = document.getElementById("image");
const ctx = canvas.getContext("2d");

const size = 40;
const squareCountX = canvas.width / size;
const squareCountY = canvas.height / size;
let whiteLineThickness = 4;
const imageSquareSize = 24;

let gameMap;
let initialTwoDArr;
let fieldSize = squareCountX * squareCountY;
let field = new Array(fieldSize).fill(0);
let index = 0;

let shapes = [
  {
    imageX: 0,
    imageY: 120
  },
  {
    imageX: 0,
    imageY: 96
  },
  {
    imageX: 0,
    imageY: 72
  },
  {
    imageX: 0,
    imageY: 48
  },
  {
    imageX: 0,
    imageY: 24
  },
  {
    imageX: 0,
    imageY: 0
  }
]

let fillNext = (brick) => {
  var hor = (index % squareCountX) + brick <= squareCountX;
  var vert = Math.floor(index / squareCountX) + brick <= squareCountY;

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
      field[index + j * squareCountX] = brick;
    }
  }

  for (var j = index; j < fieldSize; j++) { 
    if (field[j] == 0) {
      break;
    }
    index = index + 1;
  }

  return index != field.length;
}

let drawRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let drawBackground = () => {
  drawRect(0, 0, canvas.width, canvas.height, "#bca0dc");

  for (let i = 0; i < squareCountX + 1; i++) {
    drawRect(
      size * i - whiteLineThickness,
      0,
      whiteLineThickness,
      canvas.height,
      "white"
    );
  }

  for (let i = 0; i < squareCountY + 1; i++) {
    drawRect(
      0,
      size * i - whiteLineThickness,
      canvas.width,
      whiteLineThickness,
      "white"
    );
  }
}

let updateGameMap = () => {
  let y = 0;
  for (let i = 0; i < gameMap.length; i++) {
    let t = gameMap[i];
    for (let j = 0; j < t.length; j++) {
      if (field[y] != 0) {
        gameMap[i][j] = shapes[field[y]];
      }
      y++;
    }
  }
}

let drawSquares = () => {
  for (let i = 0; i < gameMap.length; i++) {
    let t = gameMap[i];
    for (let j = 0; j < t.length; j++) {
      if (t[j].imageX == -1) continue;
      ctx.drawImage(
        image,
        t[j].imageX,
        t[j].imageY,
        imageSquareSize,
        imageSquareSize,
        j * size,
        i * size,
        size,
        size
      );
    }
  }
}

let draw = () => { 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawSquares();
}

let reset = () => {
  initialTwoDArr = [];
  for (let i = 0; i < squareCountY; i++) {
    let temp = [];
    for (let j = 0; j < squareCountX; j++) {
      temp.push({ imageX: -1, imageY: -1 });
    }
    initialTwoDArr.push(temp);
  }

  gameMap = initialTwoDArr;
  field = new Array(squareCountX * squareCountY).fill(0);
  index = 0;

  draw();
}

let id;
let next = () => {
  if (id) {
    clearInterval(id);
  }
  id = setInterval(() => {
    let q = Math.floor(Math.random() * 5) + 1;
    let refreshed = fillNext(q);
    if (refreshed) {
      updateGameMap();
      draw();
    } else {
      clearInterval(id);
    }
  }, 12);
}

reset();
draw();