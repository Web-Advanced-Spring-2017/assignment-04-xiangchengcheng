class TetrisManager
{
    constructor(document)
    {
        this.document = document;

        this.instances = [];

        // const tetri = [];

        const playerElements = document.querySelectorAll('.player');
        [...playerElements].forEach(element =>{

        //draw the canvas 
    // const canvas = element.querySelector('canvas');

            const tetris = new Tetris(element);
            this.instances.push(tetris);

    // console.log(element);

    });
    }
}

   