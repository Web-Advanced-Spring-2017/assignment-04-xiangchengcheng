class Arena

{
	constructor(w, h)
	{
		 const matrix = [];
    //while height is not 0
    while (h--) {
        matrix.push(new Array(w).fill(0));
    	}
    	this.matrix= matrix;
	}

	clear()
	{
		this.matrix.forEach(row => row.fill(0));
	}



	 collide(player) {
	    const m = player.matrix;
	    const o = player.pos;
	    for (let y = 0; y < m.length; ++y) {
	        for (let x = 0; x < m[y].length; ++x) {
	            //if the matrix of the players Y row and X column is not 0, and the arena is not o
	            if (m[y][x] !== 0 &&
	                //offet.y
	               (this.matrix[y + o.y] &&
	                this.matrix[y + o.y][x + o.x]) !== 0) {
	                return true;
	            }
	        }
	    }
	    return false;
	}


	//copy all the value from player into arena at correct position
	 merge(player) {
	    player.matrix.forEach((row, y) => {
	        row.forEach((value, x) => {
	            if (value !== 0) {
	                this.matrix[y + player.pos.y][x + player.pos.x] = value;
	            }
	        });
	    });
	}




		//check any row if it is fully populated
	 sweep() 
	 {
	    let rowCount = 1;
	    let score = 0;
	    outer: for (let y = this.matrix.length -1; y > 0; --y) {
	        for (let x = 0; x < this.matrix[y].length; ++x) {
	            if (this.matrix[y][x] === 0) {
	                //contiue to check
	                continue outer;
	            }
	        }
	//if so, remove that row
	        const row = this.matrix.splice(y, 1)[0].fill(0);
	        //save the row and put the row on top of the arena
	        this.matrix.unshift(row);
	        ++y;

	        score += rowCount * 10;

	        //double the score by row
	        rowCount *= 2;
	    }
	    return score;
	}

}


// function createMatrix(w, h) {
   
//     return matrix;
// }