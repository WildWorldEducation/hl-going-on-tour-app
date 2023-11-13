import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js';


export default class Scene5_3 extends Phaser.Scene {
    constructor() {
        super('Scene5_3');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Video.
        this.load.video('vid5-2', 'assets/Videos/5_Level3/scene5-vid2.mp4');

        // Sprites.
        this.load.image('text-card1', 'assets/Images/General/text-card2.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Video.
        const background = this.add.video(0, 0, 'vid5-2').setOrigin(0);
        background.width = this.sys.canvas.width;
        background.height = this.sys.canvas.height;
        background.play();

        // Text box
        var textBox = this.add.sprite(0, 0, 'text-card1').setOrigin(0);
        textBox.x = this.sys.canvas.width/2 - textBox.width/2;
        textBox.y = this.sys.canvas.height/2 - textBox.height/2;
        textBox.scale = 0.9;
        textBox.alpha = 0.9;

        this.contentText = this.add.rexBBCodeText(textBox.x + textBox.width/2, textBox.y + textBox.height/2,
            `
            Some other names for Chicago include:

            \u2022 Chi-Town
            \u2022 The Windy City
            \u2022 The City by the Lake (Lake Michigan)
            \u2022 The Jewel of the Midwest
            \u2022 The City Beautiful
            `,
            { fontFamily: "Arial", fontSize: "65px", color: '#000000', align: 'center' }).setOrigin(0.65, 0.6);
        // Dealing with text quality.
        this.contentText.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_4", { });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_2", { });
        }, this);
        backBtn.y = backBtn.y - 40;
    }
}