import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene4_5A extends Phaser.Scene {
    constructor() {
        super('Scene4_5A');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('bg-blurred-4-5', 'assets/Images/4_Level2/phone/bg-blurred.jpg');
        this.load.image('times-square', 'assets/Images/4_Level2/phone/times-square.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#000000");
        var bg = this.add.sprite(0, 0, 'bg-blurred-4-5').setOrigin(0)
        bg.setAlpha(0.3); // we set alpha for bg on top of a camera color to make the veil effect
        //Text.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(960 - 800, 540 - 450, 1600, 900, 64);

        this.heading = this.add.rexBBCodeText(630, 340,
            `[b]Times Square[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.text1 = this.add.text(630, 500,
            `Times Square is in Midtown
Manhattan, New York City. It is
brightly lit by numerous billboards and
advertisements.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text1.scale = 0.5

        this.text2 = this.add.text(960, 780,
            `Times Square is one of the world's most visited tourist attractions, drawing
an estimated 50 million visitors anually. It is also the hub of the Broadway
Theater District and a major center of the world's entertainment industry.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text2.scale = 0.5

        // image
        var image = this.add.sprite(1080, 230, 'times-square').setOrigin(0).setScale(0.88)

        // popup window container
        this.windowCntr = this.add.container(0, 0, [this.textBg, this.heading, this.text1, this.text2, image]).setAlpha(0)

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