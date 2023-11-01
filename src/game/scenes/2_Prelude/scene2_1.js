import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene2_1 extends Phaser.Scene {
    constructor() {
        super('Scene2_1');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module2', [
            'assets/Audio/Music/2_Prelude/theme-module2.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('microphone', 'assets/Images/2_Prelude/microphone.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('star', 'assets/Images/2_Prelude/star.png');
    }

    create() {
        // Module music.
        const music = this.sound.add('theme-module2');
        music.play();
        music.setVolume(0.1);
        this.sound.pauseOnBlur = true;

        // Background.
        var microphone = this.add.sprite(0, 0, 'microphone').setOrigin(0);
        microphone.displayWidth = this.sys.canvas.width;
        microphone.displayHeight = this.sys.canvas.height;

        // Stars.
        var star1 = this.add.sprite(230, 310, 'star').setOrigin(0);
        star1.scale = 0.27
        star1.alpha = 0
        var star2 = this.add.sprite(600, 750, 'star').setOrigin(0);
        star2.scale = 0.27
        star2.alpha = 0
        var star3 = this.add.sprite(850, 540, 'star').setOrigin(0);
        star3.scale = 0.34
        star3.alpha = 0

        // Animation.
        this.tweens.add({
            targets: [star1, star2, star3],
            alpha: 1,
            yoyo: true,
            duration: 600,
            ease: 'Sine.easeInOut',
            repeat: 3,
            delay: this.tweens.stagger(300),
            hideOnComplete: true
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene2_2", { music: music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 300, 150, 32);
        this.instructionText = this.add.text(55, 75, "Prelude",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Content Text.
        this.instructionText = this.add.rexBBCodeText(1300, 540,
            'A [b]prelude[/b] is a\nperformance,\naction, or event\nbefore the main\nact or song.',
            { fontFamily: "Arial", fontSize: "120px", color: '#ffffff', align: 'center' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Save user progress.
        const save = new SaveProgress(this)
    };
}