import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_6 extends Phaser.Scene {
    constructor() {
        super('Scene3_6');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("background-audio-3-6", ["assets/Audio/SFX/3_Level1/signs-audio.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');

        this.load.image('sign1', 'assets/Images/3_Level1/signs/sign1.png');
        this.load.image('sign2', 'assets/Images/3_Level1/signs/sign2.png');
        this.load.image('sign3', 'assets/Images/3_Level1/signs/sign3.png');
        this.load.image('sign4', 'assets/Images/3_Level1/signs/sign4.png');
        this.load.image('sign5', 'assets/Images/3_Level1/signs/sign5.png');
        this.load.image('sign6', 'assets/Images/3_Level1/signs/sign6.png');
        this.load.image('sign7', 'assets/Images/3_Level1/signs/sign7.png');

        // Sprite sheets.
        this.load.spritesheet('sparkles3-6', 'assets/Images/3_Level1/genre-cards/sparkles1-spritesheet.png', { frameWidth: 530, frameHeight: 562 });

        // Video.
        this.load.video('vid3-2', 'assets/Videos/3_Level1/scene3-vid2.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        }

        // Audio.
        const audio = this.sound.add("background-audio-3-6");
        audio.play();

        // Video.
        const vid = this.add.video(0, 0, 'vid3-2');
        vid.setOrigin(0)
        vid.play();

        // Signs.
        // Sign 7.
        this.sign7 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign7').setOrigin(0.5);
        this.sign7.scale = 0.41
        // Make draggable.
        this.sign7.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign7) {
            this.children.bringToTop(sign7);
        }, this);
        this.sign7.on('drag', (pointer, dragX, dragY) => this.sign7.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign7, dropped) => {
            if (!dropped) {
                sign7.x = this.cameras.main.width / 2;
                sign7.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign7, zone1) => {
            sign7.x = zone1.x;
            sign7.y = zone1.y;
        });
        this.input.on('drop', (pointer, sign7, zone2) => {
            sign7.x = zone2.x;
            sign7.y = zone2.y;
        });

        // Sign 6.
        this.sign6 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign6').setOrigin(0.5);
        this.sign6.scale = 0.41
        // Make draggable.
        this.sign6.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign6) {
            this.children.bringToTop(sign6);
        }, this);
        this.sign6.on('drag', (pointer, dragX, dragY) => this.sign6.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign6, dropped) => {
            if (!dropped) {
                sign6.x = this.cameras.main.width / 2;
                sign6.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign6, zone1) => {
            sign6.x = zone1.x;
            sign6.y = zone1.y;
        });
        this.input.on('drop', (pointer, sign6, zone2) => {
            sign6.x = zone2.x;
            sign6.y = zone2.y;
        });

        // Sign 5.
        this.sign5 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign5').setOrigin(0.5);
        this.sign5.scale = 0.41
        // Make draggable.
        this.sign5.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign5) {
            this.children.bringToTop(sign5);
        }, this);
        this.sign5.on('drag', (pointer, dragX, dragY) => this.sign5.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign5, dropped) => {
            if (!dropped) {
                sign5.x = this.cameras.main.width / 2;
                sign5.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign5, zone1) => {
            sign5.x = zone1.x;
            sign5.y = zone1.y;
        });
        this.input.on('drop', (pointer, sign5, zone2) => {
            sign5.x = zone2.x;
            sign5.y = zone2.y;
        });

        // Sign 4.
        this.sign4 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign4').setOrigin(0.5);
        this.sign4.scale = 0.41
        // Make draggable.
        this.sign4.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign4) {
            this.children.bringToTop(sign4);
        }, this);
        this.sign4.on('drag', (pointer, dragX, dragY) => this.sign4.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign4, dropped) => {
            if (!dropped) {
                sign4.x = this.cameras.main.width / 2;
                sign4.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign4, zone1) => {
            sign4.x = zone1.x;
            sign4.y = zone1.y;
        });
        this.input.on('drop', (pointer, sign4, zone2) => {
            sign4.x = zone2.x;
            sign4.y = zone2.y;
        });

        // Sign 3.
        this.sign3 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign3').setOrigin(0.5);
        this.sign3.scale = 0.41
        // Make draggable.
        this.sign3.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign3) {
            this.children.bringToTop(sign3);
        }, this);
        this.sign3.on('drag', (pointer, dragX, dragY) => this.sign3.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign3, dropped) => {
            if (!dropped) {
                sign3.x = this.cameras.main.width / 2;
                sign3.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign3, zone1) => {
            sign3.x = zone1.x;
            sign3.y = zone1.y;
        });
        this.input.on('drop', (pointer, sign3, zone2) => {
            sign3.x = zone2.x;
            sign3.y = zone2.y;
        });

        // Sign 2.
        this.sign2 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign2').setOrigin(0.5);
        this.sign2.scale = 0.41
        // Make draggable.
        this.sign2.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign2) {
            this.children.bringToTop(sign2);
        }, this);
        this.sign2.on('drag', (pointer, dragX, dragY) => this.sign2.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign2, dropped) => {
            if (!dropped) {
                sign2.x = this.cameras.main.width / 2;
                sign2.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign2, zone1) => {
            sign2.x = zone2.x;
            sign2.y = zone2.y;
        });
        this.input.on('drop', (pointer, sign2, zone2) => {
            sign2.x = zone2.x;
            sign2.y = zone2.y;
        });

        // Sign 1.
        this.sign1 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 + 190, 'sign1').setOrigin(0.5);
        this.sign1.scale = 0.41
        // Make draggable.
        this.sign1.setInteractive({ draggable: true, cursor: 'pointer' });
        this.input.on('dragstart', function (pointer, sign1) {
            this.children.bringToTop(sign1);
        }, this);
        this.sign1.on('drag', (pointer, dragX, dragY) => this.sign1.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, sign1, dropped) => {
            if (!dropped) {
                sign1.x = this.cameras.main.width / 2;
                sign1.y = this.cameras.main.height / 2 + 190;
            }
        });
        this.input.on('drop', (pointer, sign1, zone1) => {
            sign1.x = zone1.x;
            sign1.y = zone1.y;
        });
        this.input.on('drop', (pointer, sign1, zone2) => {
            sign1.x = zone2.x;
            sign1.y = zone2.y;
        });


        // Drop zones.
        const zone1 = this.add.zone(343, 758, 350, 150)
            .setRectangleDropZone(350, 150);
        const zone2 = this.add.zone(1457, 726, 350, 150)
            .setRectangleDropZone(350, 150);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            audio.stop();
            this.scene.start("Scene3_7", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_5");
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 900, 150, 32);
        this.instructionText = this.add.rexBBCodeText(55, 75, "[b]Drag each item to the group it fits in your life.[/b]",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Sparkles. --
        // Spritesheet animation.
        this.anims.create({
            key: "sparkles",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("sparkles3-6", { start: 0, end: 119 }),
            repeat: 0,
            hideOnComplete: true
        });

        // First pair of sparkle animations.
        var sparkles1 = this.add.sprite(150, 750, "sparkles3-6");
        sparkles1.play("sparkles");
        sparkles1.scale = 0.4
        sparkles1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles1.destroy();
        });

        var sparkles2 = this.add.sprite(520, 750, "sparkles3-6");
        sparkles2.play("sparkles");
        sparkles2.scale = 0.4
        sparkles2.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles2.destroy();
        });

        // Second pair of sparkle animations.
        var sparkles3 = this.add.sprite(1280, 750, "sparkles3-6");
        sparkles3.play("sparkles");
        sparkles3.scale = 0.4
        sparkles3.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles3.destroy();
        });

        var sparkles4 = this.add.sprite(1650, 750, "sparkles3-6");
        sparkles4.play("sparkles");
        sparkles4.scale = 0.4
        sparkles4.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles4.destroy();
        });

        // Save user progress.
        const save = new SaveProgress(this)
    }
}