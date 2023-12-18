import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene5_0 extends Phaser.Scene {
    constructor() {
        super('Scene5_0');

    }
    preload() {
        // Sprites.        
        this.load.image('chicago-bg', 'assets/Images/5_Level3/chicago-level.jpg');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.spritesheet('fullscreen', 'assets/UI/General/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'chicago-bg').setOrigin(0);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene5_1");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_24");
        }, this);
        backBtn.y = backBtn.y - 40

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

    }
}