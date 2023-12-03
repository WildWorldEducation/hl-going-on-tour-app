import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_4 extends GenericScene {
    constructor() {
        super('Scene5_4', 'assets/Images/5_Level3/letter-scene/wood-bg.jpg');

        this.contentString = `
        Chicago is famous for many
        things. [b]Click on the 7 stamps[/b] to
        learn more.`;
        this.titleString = "Facts about Chicago";
        this.shouldTextBox = false;
        this.previousScene = 'Scene5_3';
        this.nextScene = 'Scene5_5';
    }
    preload() {
        super.preload();

        // Sprites.
        this.load.image('envelope', 'assets/Images/5_Level3/letter-scene/envelope.png');
        this.load.image('tick', 'assets/Images/5_Level3/letter-scene/tick.png');
        this.load.image('stamp1', 'assets/Images/5_Level3/letter-scene/stamp1.png');
        this.load.image('stamp2', 'assets/Images/5_Level3/letter-scene/stamp2.png');
        this.load.image('stamp3', 'assets/Images/5_Level3/letter-scene/stamp3.png');
        this.load.image('stamp4', 'assets/Images/5_Level3/letter-scene/stamp4.png');
        this.load.image('stamp5', 'assets/Images/5_Level3/letter-scene/stamp5.png');
        this.load.image('stamp6', 'assets/Images/5_Level3/letter-scene/stamp6.png');
        this.load.image('stamp7', 'assets/Images/5_Level3/letter-scene/stamp7.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card1', 'assets/Images/General/text-card.png');

    }

    create() {
        super.create();

        // Text box
        this.textBox = this.add.sprite(1400, 135, 'text-card1');
        this.textBox.alpha = 0.9;
        this.textBox.setScale(0.9);

        this.contentText = this.add.rexBBCodeText(this.textBox.x, this.textBox.y + 20, 
            `
            Chicago is famous for many
            things. [b]Click on the 7 stamps[/b] to
            learn more.
            `,
                { fontFamily: "Arial", fontSize: "38px", color: '#000000', align: 'center' });
        this.contentText.setOrigin(0.6);

        // Envelope.
        this.envelope = this.add.sprite(0, 0, 'envelope').setOrigin(0.5);
        this.envelope.x = this.cameras.main.width / 2;
        this.envelope.y = this.cameras.main.height / 2 + 100;
        this.envelope.setScale(0.9);

        this.addressText = this.add.rexBBCodeText(1000, 655,
            `
            Ms. Haley Whites
            Summer Palm
            Main Street 97
            `,
            { fontFamily: "'Just Another Hand', cursive", fontSize: "112px", color: '#5A5A5A', align: 'center', lineSpacing: -45 }).setOrigin(0);
        // Dealing with text quality.
        this.addressText.scale = 0.5;

        // STAMPS
        const createStamp = (x, y, stampName, angle, sceneName) => {
            const stamp = this.add.sprite(x, y, stampName).setOrigin(0);
            stamp.angle = angle;
            stamp.setInteractive({
                useHandCursor: true
            });
            stamp.on('pointerdown', () => {
                this.nextBtnAudio.play();
                localStorage.setItem(stampName, "true");
                this.scene.start(sceneName);
            });
        }

        const stamp1 = createStamp(375, 350, 'stamp1', 5, 'Scene5_4A');
        const stamp2 = createStamp(600, 350, 'stamp2', 1, 'Scene5_4B');
        const stamp3 = createStamp(775, 365, 'stamp3', -3, 'Scene5_4C');
        const stamp4 = createStamp(940, 350, 'stamp4', 1, 'Scene5_4D');
        const stamp5 = createStamp(1150, 330, 'stamp5', 1, 'Scene5_4E');
        const stamp6 = createStamp(1100, 500, 'stamp6', 1, 'Scene5_4F');
        const stamp7 = createStamp(1325, 350, 'stamp7', -4, 'Scene5_4G');

        const createCheckmark = (x, y, stampName) => {
            const circle = this.add.circle(x, y, 20, 0x01ac42);
            var tick = this.add.sprite(x, y, 'tick').setOrigin(0.5);
    
            if (localStorage.getItem(stampName) != "true") {
                circle.setAlpha(0);
                tick.setAlpha(0);
            }
        }

        // CIRCLES
        const check1 = createCheckmark(535, 530, 'stamp1');
        const check2 = createCheckmark(610, 360, 'stamp2');
        const check3 = createCheckmark(790, 515, 'stamp3');
        const check4 = createCheckmark(1060, 365, 'stamp4');
        const check5 = createCheckmark(1150, 425, 'stamp5');
        const check6 = createCheckmark(1240, 620, 'stamp6');
        const check7 = createCheckmark(1490, 365, 'stamp7');
    }
}