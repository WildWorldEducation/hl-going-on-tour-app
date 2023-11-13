import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'

import UnlockModule from '../Custom_Classes/UnlockModule.js'

export default class Scene5_10 extends Phaser.Scene {
    constructor() {
        super('Scene5_10');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card1', 'assets/Images/General/text-card2.png');
        this.load.image('concert-lit', 'assets/Images/5_Level3/concert-lit.png');

    }

    create() {
        // Video.
        this.background = this.add.sprite(0, 0, 'concert-lit').setOrigin(0);
        this.background.width = this.sys.canvas.width;
        this.background.height = this.sys.canvas.height;


        // Text box
        var textBox = this.add.sprite(0, 0, 'text-card1').setOrigin(0);
        textBox.x = this.sys.canvas.width/2 - textBox.width/2;
        textBox.y = this.sys.canvas.height/2 - textBox.height/2;

        this.contentText = this.add.rexBBCodeText(textBox.x + textBox.width/2, textBox.y + textBox.height/2,
            `
            Tonight you have the option to see a few
            performers who are unique and aren't afraid
            to show it.

            [b]Who do you want to see?[/b]
            `,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.6, 0.6);
        // Dealing with text quality.
        this.contentText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 750, 150, 32);
        this.instructionText = this.add.text(55, 75, "Welcome to Chicago's United Center!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_11", { });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_9", { });
        }, this);
        backBtn.y = backBtn.y - 40;

        // Unlock module.
        const unlock = new UnlockModule(5)
    }
}