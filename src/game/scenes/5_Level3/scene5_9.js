import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_9 extends GenericScene {
    constructor() {
        super('Scene5_9', 'assets/Images/5_Level3/concert-unlit.jpg');
        this.contentString = `
        This famous arena can host Chicago Bulls
        basketball and Chicago Blackhawks hockey. But
        nothing beats the concerts, with star power like
        Rihanna, Lady Gaga, and the Weeknd drawing
        thousands of fans!`;
        this.titleString = "Welcome to Chicago's United Center!";
        this.titleBoxWidth = 800;
        this.textBoxType = '';
        this.previousScene = 'Scene5_8';
        this.nextScene = 'Scene5_10';
    }
    preload() {
        super.preload();
        this.load.image('concert-lit', 'assets/Images/5_Level3/concert-lit.jpg');
    }

    create() {
        super.create();

        this.textBox.setScale(1.05, 1.35);
        this.contentText.x += 20;

        this.background2 = this.add.sprite(0, 0, 'concert-lit');
        this.background2.setOrigin(0);
        this.background2.displayWidth = this.sys.canvas.width;
        this.background2.displayHeight = this.sys.canvas.height;
        this.background2.alpha = 0;

        let allSprites = this.children.list;
        for(const child of this.children.list) {
            child.setDepth(2);
        }
        this.background.setDepth(0);
        this.background2.setDepth(1);

        this.tweens.add({
            targets: this.background2,
            ease: 'Sine.easeI',
            duration: 1000,
            alpha: 1
        });

    }
}