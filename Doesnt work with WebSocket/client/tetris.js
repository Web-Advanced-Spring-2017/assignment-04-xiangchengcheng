class Tetris
{
	constructor(element)
	{

		this.element = element;
		this.canvas = element.querySelector('canvas');


		// this.canvas = canvas;
		this.context = this.canvas.getContext('2d');


		//make it 20 times larger
		this.context.scale(20, 20);

		this.arena = new Arena(12, 20);

		this.player = new Player(this);


				//different colors for matrix
		this.colors = [
		//0 is nothing
		    null,
		    '#FF0D72',
		    '#0DC2FF',
		    '#0DFF72',
		    '#F538FF',
		    '#FF8E0D',
		    '#FFE138',
		    '#3877FF',
		];

		let lastTime = 0;


		//update canvas by time, let the matrix drops by second!!!
		    const update = (time = 0)=> {
		        //change time in milliseconds/the total time loaded to calculate time-dependent things/ difference in time
		        const deltaTime = time - lastTime;

		        // let dropCounter = 0;

		        // //drop every 1s
		        // let dropInterval = 1000;


		        // dropCounter += deltaTime;
		        // if (dropCounter > dropInterval) {
		        //     player.drop();
		        // }

		        lastTime = time;
		        this.player.update(deltaTime);

		//draw by frame
		    this.draw();
		    requestAnimationFrame(update);
		}

		update();

		 this.updateScore(0);

	}
		// draw each matrix
	 drawMatrix(matrix, offset) {
	    matrix.forEach((row, y) => {
	        row.forEach((value, x) => {
	            if (value !== 0) {
	                this.context.fillStyle = this.colors[value];
	                this.context.fillRect(x + offset.x,
	                                 y + offset.y,
	                                 1, 1);
	            }
	        });
	    });
	}

		//show player score
	updateScore(score) 
	{
	    this.element.querySelector('.score').innerText = this.player.score;
	}

	 draw() {
	    this.context.fillStyle = '#000';
	    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


	//make the matrix stay at the bottom when it hits the ground
	    this.drawMatrix(this.arena.matrix, {x: 0, y: 0});

	    this.drawMatrix(this.player.matrix, this.player.pos);
	}
}