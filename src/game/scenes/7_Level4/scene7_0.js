import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene7_0 extends Phaser.Scene {
    constructor() {
        super('Scene7_0');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Sprites.        
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('las-vegas-bg', '/assets/Images/7_Level4/vegas-level.jpg');
        this.load.spritesheet('fullscreen', 'assets/UI/General/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('las-vegas-song');
            this.music.play();
            this.music.setVolume(0.4);
            this.music.loop = true
        }

        // Background Sprite
        var vegasLevel = this.add.sprite(0, 0, 'las-vegas-bg').setOrigin(0);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_1", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.music.stop()
            this.scene.start("Scene4_24");
        }, this);

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
        const save = new SaveProgress(this);

        // Unlock module.
        const unlock = new UnlockModule(7)
    }
}