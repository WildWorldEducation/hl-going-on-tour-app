import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene1_3 extends Phaser.Scene {
    constructor() {
        super('Scene1_3');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module1', [
            'assets/Audio/Music/1_Welcome/theme-module1.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('turntable', 'assets/Images/1_Welcome/Sprites/turntable.png');
        this.load.image('instruction-text-bg2', 'assets/Images/1_Welcome/Sprites/textBg2.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('right-arm', 'assets/Images/1_Welcome/Sprites/right-arm.png');
        this.load.image('turntable-dial', 'assets/Images/1_Welcome/Sprites/turntable-dial.png');
        this.load.image('left-arm', 'assets/Images/1_Welcome/Sprites/left-arm.png');
        this.load.spritesheet('fullscreen', 'assets/UI/General/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module1');
            this.music.play();
            this.music.setVolume(0.1);
        }

        // Background.
        var turntable = this.add.sprite(0, 0, 'turntable').setOrigin(0);
        turntable.displayWidth = this.sys.canvas.width;
        turntable.displayHeight = this.sys.canvas.height;

        // Left arm.        
        var leftArm = this.add.sprite(500, 500, 'left-arm').setOrigin(0);
        leftArm.scale = 1.2

        // Right arm.
        var turntableDial = this.add.sprite(20, 130, 'turntable-dial').setOrigin(0);
        turntableDial.scale = 0.7
        var rightArm = this.add.sprite(0, 0, 'right-arm').setOrigin(0);
        rightArm.scale = 1.2
        var rightArmCtnr = this.add.container(1370, 780, [turntableDial, rightArm]);

        // Instruction text and bg.
        this.instructionTextBg = this.add.sprite(600, 430, 'instruction-text-bg2').setOrigin(0.5)
        this.instructionTextBg.scale = 1.3
        this.instructionText = this.add.rexBBCodeText(600, 430, `[b]Some Quick Tips[/b]\n
1. The [b]blue arrow[/b] to the right will help you [b]move\nto the next slide[/b].\n
2. If you see [b]continue[/b] or [b]submit[/b], that will [b]move you\nto the next slide[/b].\n
3. If you don't see either, [b]click the 'next' button\n on the top.[/b]\n
4. Complete [b]the activities after each level.[/b]\n
5. To make the game fullscreen, [b]click the button\n at the top right.[/b]\n
6. Let's JAM!`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        // Hide.
        this.instructionTextBg.alpha = 0
        this.instructionText.alpha = 0

        // Animation.
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: leftArm,
                    x: 400,
                    y: 300,
                    ease: 'power3',
                    duration: 750
                },
                {
                    targets: leftArm,
                    x: 500,
                    y: 500,
                    ease: 'power3',
                    duration: 750
                },
                {
                    targets: leftArm,
                    x: 400,
                    y: 300,
                    ease: 'power3',
                    duration: 750
                },
                {
                    targets: leftArm,
                    x: 500,
                    y: 500,
                    ease: 'power3',
                    duration: 750
                },
                {
                    targets: rightArmCtnr,
                    y: 440,
                    duration: 1000,
                    repeat: 0,
                },
                {
                    targets: [this.instructionTextBg],
                    alpha: 0.9,
                    duration: 1000,
                    repeat: 0,
                },
                {
                    targets: [this.instructionText],
                    alpha: 1,
                    duration: 1000,
                    repeat: 0,
                },
            ]
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene1_4", { music: this.music });
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
    }
}