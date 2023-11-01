import WideButton from '../Custom_Classes/WideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene1_4 extends Phaser.Scene {
    constructor() {
        super('Scene1_4');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module1', [
            'assets/Audio/Music/1_Welcome/theme-module1.mp3',
        ]);
        // Audio.
        this.load.audio("start", ["assets/Audio/SFX/1_Welcome/start.mp3"]);
        // Sprites.
        this.load.image('tablet', 'assets/Images/1_Welcome/Backgrounds/tablet.jpg');
        this.load.image('tablet-blurry', 'assets/Images/1_Welcome/Backgrounds/tablet-blurry.jpg');
        this.load.image('exclamation', 'assets/Images/General/exclamation.svg');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module1');
            this.music.play();
            this.music.setVolume(0.1);
        }

        // Audio.
        this.btnAudio = this.sound.add("start");

        // Background.
        var blurryBackground = this.add.sprite(0, 0, 'tablet-blurry').setOrigin(0);
        blurryBackground.displayWidth = this.sys.canvas.width;
        blurryBackground.displayHeight = this.sys.canvas.height;

        var background = this.add.sprite(0, 0, 'tablet').setOrigin(0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        // Text. --
        // Error message.
        this.errorTextBg = this.add.circle(0, 0, 200, 0xffffff);
        this.errorText = this.add.text(0, 0, "It seems like\nyou didn't write\nyour name.\n\nPlease try\nagain!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.errorText.scale = 0.5
        this.exclamation = this.add.image(-180, -80, 'exclamation').setOrigin(0.5);
        this.exclamation.scale = 1.2
        this.exclamation.rotation = -0.2
        this.errorTextCtnr = this.add.container(300, 250, [this.errorTextBg, this.errorText, this.exclamation]);
        this.errorTextCtnr.alpha = 0

        // Instructions.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-20, 0, 950, 150, 32);
        this.instructionText = this.add.text(55, 75, "Write your name on the tablet and then click submit",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Text input.
        this.formUtil = new FormUtil({
            scene: this
        });

        this.formUtil.showElement("student-name");
        this.formUtil.scaleToGameW("student-name", .4);

        // Try again button.
        this.tryAgainBtn = new WideButton(this, 0, 0, 'Try again', this.btnAudio);
        this.tryAgainBtn.on('pointerdown', function () {
            this.btnAudio.play();
            this.textBg.alpha = 1;
            this.instructionText.alpha = 1;
            this.submitBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 240, 60), Phaser.Geom.Rectangle.Contains);
            this.submitBtn.alpha = 1;
            this.tryAgainBtn.disableInteractive();
            this.tryAgainBtn.alpha = 0
            this.errorTextCtnr.alpha = 0
            this.formUtil.showElement("student-name");
            this.tweens.add({
                targets: background,
                alpha: 1,
                duration: 1000,
                repeat: 0,
            });
        }, this);
        Phaser.Display.Align.In.Center(this.tryAgainBtn, this.add.zone(860, 1000, 1920, 1080));
        this.tryAgainBtn.y = this.tryAgainBtn.y - 200
        this.tryAgainBtn.alpha = 0;

        // Submit button.
        this.submitBtn = new WideButton(this, 0, 0, 'Submit', this.btnAudio);
        this.submitBtn.on('pointerdown', function () {
            // Check if user gave name.
            var input = document.getElementById("student-name").value;
            if (input != "") {
                this.btnAudio.play();
                this.scene.start("Scene1_5", { music: this.music });
            }
            else {
                this.btnAudio.play();
                this.textBg.alpha = 0;
                this.instructionText.alpha = 0;
                this.submitBtn.disableInteractive();
                this.submitBtn.alpha = 0;
                this.tryAgainBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 240, 60), Phaser.Geom.Rectangle.Contains);
                this.tryAgainBtn.alpha = 1
                this.errorTextCtnr.alpha = 1
                this.formUtil.hideElement("student-name");
                this.tweens.add({
                    targets: background,
                    alpha: 0,
                    duration: 1000,
                    repeat: 0,
                });
            }
        }, this);
        Phaser.Display.Align.In.Center(this.submitBtn, this.add.zone(860, 1000, 1920, 1080));
        this.submitBtn.y = this.submitBtn.y - 200

        // Save user progress.
        const save = new SaveProgress(this)
    }
}