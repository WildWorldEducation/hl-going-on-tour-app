import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene1_1 extends Phaser.Scene {
    constructor() {
        super('Scene1_1');
    }
    preload() {
        // Module music.
        this.load.audio('theme-module1', [
            'assets/Audio/Music/1_Welcome/theme-module1.mp3',
        ]);

        // Audio.
        this.load.audio("applause", ["assets/Audio/SFX/1_Welcome/applause.mp3"]);
        this.load.audio("start", ["assets/Audio/SFX/1_Welcome/start.mp3"]);

        // Sprites.
        this.load.image('bg-1-1A', 'assets/Images/1_Welcome/Backgrounds/theatre-lights-off.jpg');
        this.load.image('bg-1-1B', 'assets/Images/1_Welcome/Backgrounds/theatre-lights-on.jpg');

        this.load.image('small-arrow', 'assets/Images/1_Welcome/Sprites/arrow-small.png');
        this.load.image('big-arrow', 'assets/Images/1_Welcome/Sprites/arrow-big.png');

        this.load.image('logo', 'images/ontour-logo.png');
    }

    create() {
        // Module music.
        const music = this.sound.add('theme-module1');
        music.play();
        music.setVolume(0.1);
        this.sound.pauseOnBlur = true;

        // Audio.
        this.applause = this.sound.add("applause");
        this.applause.play();
        this.start = this.sound.add("start");

        // Background.
        var bg2 = this.add.sprite(0, 0, 'bg-1-1B').setOrigin(0);
        bg2.displayWidth = this.sys.canvas.width;
        bg2.displayHeight = this.sys.canvas.height;

        var bg = this.add.sprite(0, 0, 'bg-1-1A').setOrigin(0);
        bg.setScale(2)
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;

        this.tweens.add({
            targets: bg,
            alpha: 0,
            duration: 1000,
            repeat: 0,
        });

        // Start button.
        const startBtn = new WideButton(this, 0, 0, 'Start', this.start);
        startBtn.on('pointerdown', function () {
            this.applause.stop();
            this.scene.start("Scene1_2", { music: music });
        }, this);
        Phaser.Display.Align.In.Center(startBtn, this.add.zone(860, 1000, 1920, 1080));
        startBtn.y = startBtn.y - 40

        // Logo.
        var logo = this.add.sprite(50, 240, 'logo').setOrigin(0).setScale(1.1);
    }
}