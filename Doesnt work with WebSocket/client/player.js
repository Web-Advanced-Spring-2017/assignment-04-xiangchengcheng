class Player
{
	constructor(tetris)
	{
		this.DROP_SLOW = 1000;
		this.DROP_FAST = 50;

		this.tetris = tetris;
		this.arena = tetris.arena;

		  this.dropCounter = 0;

        //drop every 1s
          this.dropInterval = this.DROP_SLOW;
        

       


		this.pos= {x: 0, y: 0};
    	this.matrix= null;
    	this.score= 0;

    	this.reset();
	}



	//create different matrix shape!
	 createPiece(type)
	{
	if (type === 'I') {
	    return [
	        [0, 1, 0, 0],
	        [0, 1, 0, 0],
	        [0, 1, 0, 0],
	        [0, 1, 0, 0],
	    ];
	} else if (type === 'L') {
	    return [
	        [0, 2, 0],
	        [0, 2, 0],
	        [0, 2, 2],
	    ];
	} else if (type === 'J') {
	    return [
	        [0, 3, 0],
	        [0, 3, 0],
	        [3, 3, 0],
	    ];
	} else if (type === 'O') {
	    return [
	        [4, 4],
	        [4, 4],
	    ];
	} else if (type === 'Z') {
	    return [
	        [5, 5, 0],
	        [0, 5, 5],
	        [0, 0, 0],
	    ];
	} else if (type === 'S') {
	    return [
	        [0, 6, 6],
	        [6, 6, 0],
	        [0, 0, 0],
	    ];
	} else if (type === 'T') {
	    return [
	        [0, 7, 0],
	        [7, 7, 7],
	        [0, 0, 0],
	    ];
	}
	}

	 drop() 
	{
		    this.pos.y++;

		    // if touching the ground or other piece
		    if (this.arena.collide(this)) {
		        this.pos.y--;
		        this.arena.merge(this); 

		        //set it start from the beginning/top
		        this.reset();
		        this.score += this.arena.sweep();
		        //update score when sweep
		        this.tetris.updateScore(this.score);
		    }
		    this.dropCounter = 0;
	}


	//the function when player move the matrix
    //to make sure the matrix do not go over the left and right border
	 move(offset) {
	    this.pos.x += offset;
	    if (this.arena.collide(this)) {
	        this.pos.x -= offset;
	    }
	}

	//randomly let matrix shape appear
	reset() {
	    const pieces = 'TJLOSZI';
	    this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
	    this.pos.y = 0;
	    this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
	                   (this.matrix[0].length / 2 | 0);
	    

	//when matrix pile up to the top, clear all matrix
	    if (this.arena.collide(this)) {
	    	this.arena.clear();
	        this.score = 0;
	        this.tetris.updateScore(this.score);
	    }
	}





		//check collision constantly for matrix when it rotate
	rotate(dir) {
	    const pos = this.pos.x;
	    let offset = 1;
	    this._rotateMatrix(this.matrix, dir);
	    while (this.arena.collide(this)) {
	        this.pos.x += offset;
	        offset = -(offset + (offset > 0 ? 1 : -1));
	        if (offset > this.matrix[0].length) {
	            this._rotateMatrix(this.matrix, -dir);
	            this.pos.x = pos;
	            return;
	        }
	    }
	}



		//rotate the matrix = flip the x&y =[a,b]=[b,a]
	//dir = driection
	 _rotateMatrix(matrix, dir) {
	    for (let y = 0; y < matrix.length; ++y) {
	        for (let x = 0; x < y; ++x) {
	            [
	                matrix[x][y],
	                matrix[y][x],
	            ] = [
	                matrix[y][x],
	                matrix[x][y],
	            ];
	        }
	    }

	    if (dir > 0) {
	        matrix.forEach(row => row.reverse());
	    } else {
	        matrix.reverse();
	    }
	}

	update(deltaTime)
	{
		 this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }

        // lastTime = time;



	}


		
}


// const player = {
    
// };


