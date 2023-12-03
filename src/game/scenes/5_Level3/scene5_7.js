import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_7 extends GenericScene {
    constructor() {
        super('Scene5_7', 'assets/Images/5_Level3/zoom-buildings.jpg');
        this.titleString = "OR... go to some other Chicago sights?";
        this.shouldTextBox = false;
        this.previousScene = 'Scene5_6';
        this.nextScene = 'Scene5_8';
        this.titleBoxWidth = 800;
        this.textBoxType = '3';
    }
    preload() {
        super.preload();
        this.load.image(this.sceneName + 'stage', 'assets/Images/5_Level3/circled-images/stage.png');
        this.load.image(this.sceneName + 'comedy', 'assets/Images/5_Level3/circled-images/comedy.png');
        this.load.image(this.sceneName + 'cactus', 'assets/Images/5_Level3/circled-images/cactus.png');
        this.load.image(this.sceneName + 'market', 'assets/Images/5_Level3/circled-images/market.png');
    }

    create() {
        super.create();
        this.textBox = this.add.sprite(1400, 175, this.sceneName + 'text-box');
        this.textBox.alpha = 0.9;

        this.contentText = this.add.rexBBCodeText(this.textBox.x - this.textBox.width/2 - 35, this.textBox.y - this.textBox.height/3 - 15, 
        `
            [b]Click on the images below[/b]
            to explore some other sights
            in Chicago!
        `,
                { fontFamily: "Arial", fontSize: "65px", color: '#000000', align: 'center' });
        this.contentText.scale = 0.5;

        const img1 = this.add.sprite(0, 0, this.sceneName + 'stage').setScale(0.4);
        const img2 = this.add.sprite(0, 0, this.sceneName + 'comedy').setScale(0.4);
        const img3 = this.add.sprite(0, 0, this.sceneName + 'cactus').setScale(0.4);
        const img4 = this.add.sprite(0, 0, this.sceneName + 'market').setScale(0.4);
        
        img1.setInteractive({ cursor: 'pointer' });
        img2.setInteractive({ cursor: 'pointer' });
        img3.setInteractive({ cursor: 'pointer' });
        img4.setInteractive({ cursor: 'pointer' });

        const createCircleBorder = () => {
            let circleBorder = this.add.graphics();
            circleBorder.lineStyle(4, 0xffffff, 1);
            circleBorder.strokeCircle(0, 0, 155);
            return circleBorder;
        }

        const circleBorder1 = createCircleBorder();
        const circleBorder2 = createCircleBorder();
        const circleBorder3 = createCircleBorder();
        const circleBorder4 = createCircleBorder();
        
        const circle1Ctnr = this.add.container(400, 600, [img1, circleBorder1]);
        const circle2Ctnr = this.add.container(800, 600, [img2, circleBorder2]);
        const circle3Ctnr = this.add.container(1200, 600, [img3, circleBorder3]);
        const circle4Ctnr = this.add.container(1600, 600, [img4, circleBorder4]);
        //circle1Ctnr.scale = 0.45
    }
}