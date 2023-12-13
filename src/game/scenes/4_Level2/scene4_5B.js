import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene4_5A extends Phaser.Scene {
    constructor() {
        super('Scene4_5B');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('bg-blurred-4-5', 'assets/Images/4_Level2/phone/bg-blurred.jpg');
        this.load.image('statue-of-liberty', 'assets/Images/4_Level2/phone/statue-of-liberty.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#000000");
        var bg = this.add.sprite(0, 0, 'bg-blurred-4-5').setOrigin(0);
        bg.setAlpha(0.3); // we set alpha for bg on top of a camera color to make the veil effect

        //Text.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(960 - 800, 540 - 450, 1600, 900, 64);

        this.heading = this.add.rexBBCodeText(1100, 265,
            `[b]The Statue of Liberty[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.text = this.add.text(1100, 600,
            `The Statue of Liberty is a colossal sculpture on
Liberty Island in New York Harbor in New York
City. The copper statue, a gift from the people of
France to the people of the United States, was
dedicated on October 28, 1886, and its metal
framework was built by Gustave Eiffel (of Paris'
Eiffel Tower fame).`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // image
        var image = this.add.sprite(300, 160, 'statue-of-liberty').setOrigin(0)

        // popup window container
        this.windowCntr = this.add.container(0, 0, [this.textBg, this.heading, this.text, image]).setAlpha(0)

        // the animation for this scene
        this.tweens.add({
            targets: this.windowCntr,
            alpha: 1,
            duration: 500
        })
        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 240, 170, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene4_5', { isOpened: true });
        }, this);
    }
}