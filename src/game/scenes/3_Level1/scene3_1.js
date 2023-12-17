import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import UnlockModule from '../Custom_Classes/UnlockModule.js'

export default class Scene3_1 extends Phaser.Scene {
    constructor() {
        super('Scene3_1');
    }
    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('tyre', 'assets/Images/3_Level1/tyre.png');
        this.load.image('sitting', 'assets/Images/3_Level1/sitting.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.spritesheet('fullscreen', 'assets/UI/General/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // Module music.
        const music = this.sound.add('theme-module3');
        music.play();
        music.setVolume(0.1);
        music.loop = true
        this.sound.pauseOnBlur = true;

        // BG.
        this.cameras.main.setBackgroundColor("#f9f2e8");

        // Sprites.
        // Tyre.
        var tyre = this.add.sprite(0, 0, 'tyre').setOrigin(0.5);
        tyre.x = this.cameras.main.width / 2 + 20
        tyre.y = this.cameras.main.height / 2 + 400
        tyre.setScale(1.07)

        // Char sitting.
        var sitting = this.add.sprite(0, 0, 'sitting').setOrigin(0.5);
        sitting.scale = 1.3
        sitting.x = this.cameras.main.width / 2 + 100
        sitting.y = this.cameras.main.height / 2 - 250
        sitting.alpha = 0;

        // Animation.
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: tyre,
                    angle: '+=360',
                    duration: 2000,
                    repeat: 0
                },
                {
                    targets: sitting,
                    alpha: 1,
                    ease: 'power3',
                    duration: 750
                },
            ]
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_2", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Fullscreen mode.
        const button = this.add.image(1920 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        button.setFrame(1);
        this.scale.startFullscreen();
        button.on('pointerup', function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
        }, this);

        // Save user progress.
        const save = new SaveProgress(this)
        // Unlock module.
        const unlock = new UnlockModule(3)
    }
}