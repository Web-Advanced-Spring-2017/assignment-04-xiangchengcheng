class TetrisManager
{
    constructor(document)
    {
        this.document = document;

        this.template = document.getElementById('player-template');

        this.instances = new Set;

        // const tetri = [];

    //     const playerElements = document.querySelectorAll('.player');
    //     [...playerElements].forEach(element =>{

    //     //draw the canvas 
    // // const canvas = element.querySelector('canvas');

    //         const tetris = new Tetris(element);
    //         this.instances.push(tetris);

    // // console.log(element);

    // });
    }


//excess to template
    createPlayer(){
        const element = this.document
            .importNode(this.template.content, true)
            .children[0];

                    // console.log(element);
        const tetris = new Tetris(element);
        this.instances.add(tetris);

//put one player into template
        this.document.body.appendChild(tetris.element);

        return tetris;
    }

    removePlayer(tetris)
    {
        this.instances.delete(tetris);
        this.document.body.removeChild(tetris.element);

    }
}

   