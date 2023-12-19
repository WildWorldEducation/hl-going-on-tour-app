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
        this.music = this.sound.add('theme-module3');
        this.music.play();
        this.music.setVolume(0.1);
        this.music.loop = true
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

        /* Function to open fullscreen mode */
        const app = document.getElementsByTagName("body")[0]
        function openFullscreen() {
            if (app.requestFullscreen) {
                app.requestFullscreen();
            } else if (app.webkitRequestFullscreen) { /* Safari */
                app.webkitRequestFullscreen();
            } else if (app.msRequestFullscreen) { /* IE11 */
                app.msRequestFullscreen();
            }
        }
        /* Close fullscreen */
        function closeFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }

        button.on('pointerup', () => {
            if (document.fullscreenElement || document.webkitFullscreenElement ||
                document.mozFullScreenElement) {
                button.setFrame(0);
                closeFullscreen()
            }
            else {
                button.setFrame(1);
                openFullscreen()
            }
        }, this);

        // Save user progress.
        const save = new SaveProgress(this)
        // Unlock module.
        const unlock = new UnlockModule(3)
    }
}