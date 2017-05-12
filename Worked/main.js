


// //draw the canvas 
// const canvas = document.getElementById('tetris');
// const context = canvas.getContext('2d');


// //make it 20 times larger
// context.scale(20, 20);



// //check any row if it is fully populated
// function arenaSweep() {
//     let rowCount = 1;
//     outer: for (let y = arena.length -1; y > 0; --y) {
//         for (let x = 0; x < arena[y].length; ++x) {
//             if (arena[y][x] === 0) {
//                 //contiue to check
//                 continue outer;
//             }
//         }
// //if so, remove that row
//         const row = arena.splice(y, 1)[0].fill(0);
//         //save the row and put the row on top of the arena
//         arena.unshift(row);
//         ++y;

//         player.score += rowCount * 10;

//         //double the score by row
//         rowCount *= 2;
//     }
// }

// function collide(arena, player) {
//     const m = player.matrix;
//     const o = player.pos;
//     for (let y = 0; y < m.length; ++y) {
//         for (let x = 0; x < m[y].length; ++x) {
//             //if the matrix of the players Y row and X column is not 0, and the arena is not o
//             if (m[y][x] !== 0 &&
//                 //offet.y
//                (arena.matrix[y + o.y] &&
//                 arena.matrix[y + o.y][x + o.x]) !== 0) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// function createMatrix(w, h) {
//     const matrix = [];
//     //while height is not 0
//     while (h--) {
//         matrix.push(new Array(w).fill(0));
//     }
//     return matrix;
// }



// //create different matrix shape!
// function createPiece(type)
// {
//     if (type === 'I') {
//         return [
//             [0, 1, 0, 0],
//             [0, 1, 0, 0],
//             [0, 1, 0, 0],
//             [0, 1, 0, 0],
//         ];
//     } else if (type === 'L') {
//         return [
//             [0, 2, 0],
//             [0, 2, 0],
//             [0, 2, 2],
//         ];
//     } else if (type === 'J') {
//         return [
//             [0, 3, 0],
//             [0, 3, 0],
//             [3, 3, 0],
//         ];
//     } else if (type === 'O') {
//         return [
//             [4, 4],
//             [4, 4],
//         ];
//     } else if (type === 'Z') {
//         return [
//             [5, 5, 0],
//             [0, 5, 5],
//             [0, 0, 0],
//         ];
//     } else if (type === 'S') {
//         return [
//             [0, 6, 6],
//             [6, 6, 0],
//             [0, 0, 0],
//         ];
//     } else if (type === 'T') {
//         return [
//             [0, 7, 0],
//             [7, 7, 7],
//             [0, 0, 0],
//         ];
//     }
// }


// // draw each matrix
// function drawMatrix(matrix, offset) {
//     matrix.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value !== 0) {
//                 context.fillStyle = colors[value];
//                 context.fillRect(x + offset.x,
//                                  y + offset.y,
//                                  1, 1);
//             }
//         });
//     });
// }

// function draw() {
//     context.fillStyle = '#000';
//     context.fillRect(0, 0, canvas.width, canvas.height);


// //make the matrix stay at the bottom when it hits the ground
//     drawMatrix(arena.matrix, {x: 0, y: 0});

//     drawMatrix(player.matrix, player.pos);
// }


// //copy all the value from player into arena at correct position
// function merge(matrix, player) {
//     player.matrix.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value !== 0) {
//                 matrix[y + player.pos.y][x + player.pos.x] = value;
//             }
//         });
//     });
// }



// //rotate the matrix = flip the x&y =[a,b]=[b,a]
// //dir = driection
// function rotate(matrix, dir) {
//     for (let y = 0; y < matrix.length; ++y) {
//         for (let x = 0; x < y; ++x) {
//             [
//                 matrix[x][y],
//                 matrix[y][x],
//             ] = [
//                 matrix[y][x],
//                 matrix[x][y],
//             ];
//         }
//     }

//     if (dir > 0) {
//         matrix.forEach(row => row.reverse());
//     } else {
//         matrix.reverse();
//     }
// }

// function player.drop() {
//     player.pos.y++;

//     // if touching the ground or other piece
//     if (collide(arena, player)) {
//         player.pos.y--;
//         merge(arena, player);

//         //set it start from the beginning/top
//         playerReset();
//         arenaSweep();
//         //update score when sweep
//         updateScore();
//     }
//     dropCounter = 0;
// }


// //the function when player move the matrix
// //to make sure the matrix do not go over the left and right border
// function playerMove(offset) {
//     player.pos.x += offset;
//     if (collide(arena, player)) {
//         player.pos.x -= offset;
//     }
// }



// //randomly let matrix shape appear
// function playerReset() {
//     const pieces = 'TJLOSZI';
//     player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
//     player.pos.y = 0;
//     player.pos.x = (arena[0].length / 2 | 0) -
//                    (player.matrix[0].length / 2 | 0);
    

// //when matrix pile up to the top, clear all matrix
//     if (collide(arena, player)) {
//         arena.forEach(row => row.fill(0));
//         player.score = 0;
//         updateScore();
//     }
// }



// //check collision constantly for matrix when it rotate
// function plater.rotate(dir) {
//     const pos = player.pos.x;
//     let offset = 1;
//     rotate(player.matrix, dir);
//     while (collide(arena, player)) {
//         player.pos.x += offset;
//         offset = -(offset + (offset > 0 ? 1 : -1));
//         if (offset > player.matrix[0].length) {
//             rotate(player.matrix, -dir);
//             player.pos.x = pos;
//             return;
//         }
//     }
// }

// let dropCounter = 0;

// //drop every 1s
// let dropInterval = 1000;

// let lastTime = 0;


// //update canvas by time, let the matrix drops by second!!!
//     function update(time = 0) {
//         //change time in milliseconds/the total time loaded to calculate time-dependent things/ difference in time
//         const deltaTime = time - lastTime;

//         // let dropCounter = 0;

//         // //drop every 1s
//         // let dropInterval = 1000;


//         // dropCounter += deltaTime;
//         // if (dropCounter > dropInterval) {
//         //     player.drop();
//         // }

//         lastTime = time;
//         player.update(deltaTime);

// //draw by frame
//     tetris.draw();
//     requestAnimationFrame(update);
// }


// //show player score
// function updateScore() {
//     // document.getElementById('score').innerText = tetris.player.score;
// }







// //different colors for matrix
// const colors = [
// //0 is nothing
//     null,
//     '#FF0D72',
//     '#0DC2FF',
//     '#0DFF72',
//     '#F538FF',
//     '#FF8E0D',
//     '#FFE138',
//     '#3877FF',
// ];

// const arena = new Arena(12, 20);

// const player = new Player;

// const tetri = [];

// const playerElements = document.querySelectorAll('.player');
// [...playerElements].forEach(element =>{

//         //draw the canvas 
//     // const canvas = element.querySelector('canvas');

//     const tetris = new Tetris(element);
//     tetri.push(tetris);

//     // console.log(element);

// });

const tetrisManager = new TetrisManager(document);


const keyListener = (event) => {

    [   //A, D,Q, E,S
        [65,68,87,69,83],
        //H ,K, Y ,I, J
        [72,75,85,73,74],
    ].forEach((key, index) => {
             const player = tetrisManager.instances[index].player;
        
        if(event.type === 'keydown'){
                //keycode37=left arrow
            if (event.keyCode === key[0]) {
                //direction
                player.move(-1);
            } 
             //keycode39=right arrow
             else if (event.keyCode === key[1]) {
                player.move(1);
            } 
             
            //key UP
              else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } 
            //key W
            else if (event.keyCode === key[3]) {
                player.rotate(1);
            }
        }

        
        //keycode40=down key
         if (event.keyCode === key[4]) {
            if(event.type === 'keydown'){
                if(player.dropInterval !== player.DROP_FAST){
                    player.drop();
                player.dropInterval = player.DROP_FAST;
                }

                
            }else {
                player.dropInterval = player.DROP_SLOW;

            }
            
        } 
    });
   
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);



// const player = {
//     pos: {x: 0, y: 0},
//     matrix: null,
//     score: 0,
// };

// player.reset();
// updateScore();
// update();



//Credit to [Rewriting Tetris to 2-player](https://www.youtube.com/watch?v=JJo5JpbuTTs) on [Meth Meth Method](https://www.youtube.com/channel/UC8A0M0eDttdB11MHxX58vXQ).
