import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene4_5C extends Phaser.Scene {
    constructor() {
        super('Scene4_5C');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('bg-blurred-4-5', 'assets/Images/4_Level2/phone/bg-blurred.jpg');
        this.load.image('brooklyn-bridge', 'assets/Images/4_Level2/phone/brooklyn-bridge.jpg');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        // BG.
        this.cameras.main.setBackgroundColor("#000000");
        var bg = this.add.sprite(0, 0, 'bg-blurred-4-5').setOrigin(0);
        bg.setAlpha(0.3); // we set alpha for bg on top of a camera color to make the veil effect

        //Text.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(960 - 800, 540 - 450, 1600, 900, 64);

        this.heading = this.add.rexBBCodeText(1100, 265,
            `[b]Brooklyn Bridge[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.text = this.add.text(1200, 600,
            `The Brooklyn Bridge is a hybrid cable-stayed/
suspension bridge in New York City, spanning the
East River between the boroughs of Manhattan
and Brooklyn. Opened on May 24, 1883, the
Brooklyn Bridge was the first crossing of the East
River. It is a popular way to travel, by car and to
walk across.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;

        // image
        var image = this.add.sprite(220, 300, 'brooklyn-bridge').setOrigin(0);

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
            this.scene.start('Scene4_5', { isOpened: true, music: this.music });
        }, this);
    }
}