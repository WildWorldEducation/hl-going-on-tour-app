import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_3 extends Phaser.Scene {
    constructor() {
        super('Scene3_3');
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
        this.load.audio("sparklesSFX", ["assets/Audio/SFX/3_Level1/sparkles.mp3"]);

        // Sprite sheets.
        this.load.spritesheet('sparkles3-3', 'assets/Images/3_Level1/genre-cards/sparkles1-spritesheet.png', { frameWidth: 530, frameHeight: 562 });

        // Sprites.
        this.load.image('wall', 'assets/Images/3_Level1/wall.jpg');
        this.load.image('char', 'assets/Images/3_Level1/char.png');
        this.load.image('placeholder', 'assets/Images/3_Level1/placeholder.png');
        this.load.image('text-card3', 'assets/Images/3_Level1/genre-cards/text-card3.png');

        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('genre-card1', 'assets/Images/3_Level1/genre-cards/genre-card1.png');
        this.load.image('genre-card2', 'assets/Images/3_Level1/genre-cards/genre-card2.png');
        this.load.image('genre-card3', 'assets/Images/3_Level1/genre-cards/genre-card3.png');
        this.load.image('genre-card4', 'assets/Images/3_Level1/genre-cards/genre-card4.png');
        this.load.image('genre-card5', 'assets/Images/3_Level1/genre-cards/genre-card5.png');
        this.load.image('genre-card6', 'assets/Images/3_Level1/genre-cards/genre-card6.png');
        this.load.image('genre-card7', 'assets/Images/3_Level1/genre-cards/genre-card7.png');
        this.load.image('genre-card8', 'assets/Images/3_Level1/genre-cards/genre-card8.png');
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
        const sparklesSFX = this.sound.add("sparklesSFX");
        sparklesSFX.play();

        // Wall bg.
        var wall = this.add.sprite(0, 0, 'wall').setOrigin(0);

        // Char.
        var char = this.add.sprite(0, 0, 'char').setOrigin(0.5);
        char.x = 350
        char.y = 690
        char.setScale(0.6)
        //  Drop zone.
        const charDropZone = this.add.zone(350, 800, 400, 400).
            setRectangleDropZone(400, 400);

        // Drop zones.
        // 1.
        var placeholder1 = this.add.sprite(0, 0, 'placeholder').setOrigin(0.5);
        placeholder1.x = 700
        placeholder1.y = this.cameras.main.height / 2
        placeholder1.setScale(0.65)
        this.placeholder1Text = this.add.rexBBCodeText(700, placeholder1.y - 190, "[b]LOVE IT[/b]",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000' }).setOrigin(0.5);
        this.placeholder1Text.scale = 0.5
        //  Drop zone.
        const zone1A = this.add.zone(placeholder1.x, placeholder1.y - 50, placeholder1.width / 2, placeholder1.height / 4)
            .setRectangleDropZone(placeholder1.width / 2, placeholder1.height / 4);
        const zone1B = this.add.zone(placeholder1.x, placeholder1.y + placeholder1.height / 4 - 80, placeholder1.width / 2, placeholder1.height / 4)
            .setRectangleDropZone(placeholder1.width / 2, placeholder1.height / 4);

        // 2.
        var placeholder2 = this.add.sprite(0, 0, 'placeholder').setOrigin(0.5);
        placeholder2.x = 1050
        placeholder2.y = this.cameras.main.height / 2 + 100
        placeholder2.setScale(0.65)
        this.placeholder2Text = this.add.rexBBCodeText(1050, placeholder2.y - 190, "[b]LIKE IT[/b]",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000' }).setOrigin(0.5);
        this.placeholder2Text.scale = 0.5
        //  Drop zone.
        const zone2A = this.add.zone(placeholder2.x, placeholder2.y - 50, placeholder2.width / 2, placeholder2.height / 4)
            .setRectangleDropZone(placeholder2.width / 2, placeholder2.height / 4);
        const zone2B = this.add.zone(placeholder2.x, placeholder2.y + placeholder2.height / 4 - 80, placeholder2.width / 2, placeholder2.height / 4)
            .setRectangleDropZone(placeholder2.width / 2, placeholder2.height / 4);

        // 3.
        var placeholder3 = this.add.sprite(0, 0, 'placeholder').setOrigin(0.5);
        placeholder3.x = 1400
        placeholder3.y = this.cameras.main.height / 2 - 80
        placeholder3.setScale(0.65)
        this.placeholder3Text = this.add.rexBBCodeText(1400, placeholder3.y - 190, "[b]IT'S OKAY[/b]",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000' }).setOrigin(0.5);
        this.placeholder3Text.scale = 0.5
        //  Drop zone.
        const zone3A = this.add.zone(placeholder3.x, placeholder3.y - 50, placeholder3.width / 2, placeholder3.height / 4)
            .setRectangleDropZone(placeholder3.width / 2, placeholder3.height / 4);
        const zone3B = this.add.zone(placeholder3.x, placeholder3.y + placeholder3.height / 4 - 80, placeholder3.width / 2, placeholder3.height / 4)
            .setRectangleDropZone(placeholder3.width / 2, placeholder3.height / 4);

        // 4.
        var placeholder4 = this.add.sprite(0, 0, 'placeholder').setOrigin(0.5);
        placeholder4.x = 1750
        placeholder4.y = this.cameras.main.height / 2 + 50
        placeholder4.setScale(0.65)
        this.placeholder4Text = this.add.rexBBCodeText(1750, placeholder4.y - 190, "[b]UGH![/b]",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000' }).setOrigin(0.5);
        this.placeholder4Text.scale = 0.5
        //  Drop zone.        
        const zone4A = this.add.zone(placeholder4.x, placeholder4.y - 50, placeholder4.width / 2, placeholder4.height / 4)
            .setRectangleDropZone(placeholder4.width / 2, placeholder4.height / 4);
        const zone4B = this.add.zone(placeholder4.x, placeholder4.y + placeholder4.height / 4 - 80, placeholder4.width / 2, placeholder4.height / 4)
            .setRectangleDropZone(placeholder4.width / 2, placeholder4.height / 4);

        // Cards.
        // Card 1.
        this.genreCard1Bg = this.add.graphics();
        this.genreCard1Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard1Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard1 = this.add.sprite(0, 0, 'genre-card1').setOrigin(0.5);
        genreCard1.scale = 0.35
        this.genreCard1Ctnr = this.add.container(350, 790);
        this.genreCard1Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard1Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard1Ctnr.add([this.genreCard1Bg, genreCard1]);
        this.input.on('dragstart', function (pointer, genreCard1Ctnr) {
            this.children.bringToTop(genreCard1Ctnr);
        }, this);
        this.genreCard1Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard1Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard1Ctnr, dropped) => {
            if (!dropped) {
                genreCard1Ctnr.x = genreCard1Ctnr.input.dragStartX;
                genreCard1Ctnr.y = genreCard1Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard1Ctnr, zone) => {
            genreCard1Ctnr.x = zone.x;
            genreCard1Ctnr.y = zone.y;
        });

        // Card 2.
        this.genreCard2Bg = this.add.graphics();
        this.genreCard2Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard2Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard2 = this.add.sprite(0, 0, 'genre-card2').setOrigin(0.5);
        genreCard2.scale = 0.35
        this.genreCard2Ctnr = this.add.container(350, 790);
        this.genreCard2Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard2Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard2Ctnr.add([this.genreCard2Bg, genreCard2]);
        this.input.on('dragstart', function (pointer, genreCard2Ctnr) {
            this.children.bringToTop(genreCard2Ctnr);
        }, this);
        this.genreCard2Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard2Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard2Ctnr, dropped) => {
            if (!dropped) {
                genreCard2Ctnr.x = genreCard2Ctnr.input.dragStartX;
                genreCard2Ctnr.y = genreCard2Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard2Ctnr, zone) => {
            genreCard2Ctnr.x = zone.x;
            genreCard2Ctnr.y = zone.y;
        });

        // Card 3.
        this.genreCard3Bg = this.add.graphics();
        this.genreCard3Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard3Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard3 = this.add.sprite(0, 0, 'genre-card3').setOrigin(0.5);
        genreCard3.scale = 0.35
        this.genreCard3Ctnr = this.add.container(350, 790);
        this.genreCard3Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard3Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard3Ctnr.add([this.genreCard3Bg, genreCard3]);
        this.input.on('dragstart', function (pointer, genreCard3Ctnr) {
            this.children.bringToTop(genreCard3Ctnr);
        }, this);
        this.genreCard3Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard3Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard3Ctnr, dropped) => {
            if (!dropped) {
                genreCard3Ctnr.x = genreCard3Ctnr.input.dragStartX;
                genreCard3Ctnr.y = genreCard3Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard3Ctnr, zone) => {
            genreCard3Ctnr.x = zone.x;
            genreCard3Ctnr.y = zone.y;
        });

        // Card 4.
        this.genreCard4Bg = this.add.graphics();
        this.genreCard4Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard4Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard4 = this.add.sprite(0, 0, 'genre-card4').setOrigin(0.5);
        genreCard4.scale = 0.35
        this.genreCard4Ctnr = this.add.container(350, 790);
        this.genreCard4Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard4Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard4Ctnr.add([this.genreCard4Bg, genreCard4]);
        this.input.on('dragstart', function (pointer, genreCard4Ctnr) {
            this.children.bringToTop(genreCard4Ctnr);
        }, this);
        this.genreCard4Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard4Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard4Ctnr, dropped) => {
            if (!dropped) {
                genreCard4Ctnr.x = genreCard4Ctnr.input.dragStartX;
                genreCard4Ctnr.y = genreCard4Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard4Ctnr, zone) => {
            genreCard4Ctnr.x = zone.x;
            genreCard4Ctnr.y = zone.y;
        });

        // Card 5.
        this.genreCard5Bg = this.add.graphics();
        this.genreCard5Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard5Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard5 = this.add.sprite(0, 0, 'genre-card5').setOrigin(0.5);
        genreCard5.scale = 0.35
        this.genreCard5Ctnr = this.add.container(350, 790);
        this.genreCard5Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard5Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard5Ctnr.add([this.genreCard5Bg, genreCard5]);
        this.input.on('dragstart', function (pointer, genreCard5Ctnr) {
            this.children.bringToTop(genreCard5Ctnr);
        }, this);
        this.genreCard5Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard5Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard5Ctnr, dropped) => {
            if (!dropped) {
                genreCard5Ctnr.x = genreCard5Ctnr.input.dragStartX;
                genreCard5Ctnr.y = genreCard5Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard5Ctnr, zone) => {
            genreCard5Ctnr.x = zone.x;
            genreCard5Ctnr.y = zone.y;
        });

        // Card 6.
        this.genreCard6Bg = this.add.graphics();
        this.genreCard6Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard6Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard6 = this.add.sprite(0, 0, 'genre-card6').setOrigin(0.5);
        genreCard6.scale = 0.35
        this.genreCard6Ctnr = this.add.container(350, 790);
        this.genreCard6Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard6Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard6Ctnr.add([this.genreCard6Bg, genreCard6]);
        this.input.on('dragstart', function (pointer, genreCard6Ctnr) {
            this.children.bringToTop(genreCard6Ctnr);
        }, this);
        this.genreCard6Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard6Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard6Ctnr, dropped) => {
            if (!dropped) {
                genreCard6Ctnr.x = genreCard6Ctnr.input.dragStartX;
                genreCard6Ctnr.y = genreCard6Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard6Ctnr, zone) => {
            genreCard6Ctnr.x = zone.x;
            genreCard6Ctnr.y = zone.y;
        });


        // Card 7.
        this.genreCard7Bg = this.add.graphics();
        this.genreCard7Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard7Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard7 = this.add.sprite(0, 0, 'genre-card7').setOrigin(0.5);
        genreCard7.scale = 0.35
        this.genreCard7Ctnr = this.add.container(350, 790);
        this.genreCard7Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard7Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard7Ctnr.add([this.genreCard7Bg, genreCard7]);
        this.input.on('dragstart', function (pointer, genreCard7Ctnr) {
            this.children.bringToTop(genreCard7Ctnr);
        }, this);
        this.genreCard7Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard7Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard7Ctnr, dropped) => {
            if (!dropped) {
                genreCard7Ctnr.x = genreCard7Ctnr.input.dragStartX;
                genreCard7Ctnr.y = genreCard7Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard7Ctnr, zone) => {
            genreCard7Ctnr.x = zone.x;
            genreCard7Ctnr.y = zone.y;
        });

        // Card 8.
        this.genreCard8Bg = this.add.graphics();
        this.genreCard8Bg.fillStyle(0xFFFFFF, 1);
        this.genreCard8Bg.fillRoundedRect(-125, -80, 250, 160, 16);
        var genreCard8 = this.add.sprite(0, 0, 'genre-card8').setOrigin(0.5);
        genreCard8.scale = 0.35
        this.genreCard8Ctnr = this.add.container(350, 790);
        this.genreCard8Ctnr.setSize(250, 160);
        // Make draggable.
        this.genreCard8Ctnr.setInteractive({ draggable: true, cursor: 'pointer' });
        this.genreCard8Ctnr.add([this.genreCard8Bg, genreCard8]);
        this.input.on('dragstart', function (pointer, genreCard8Ctnr) {
            this.children.bringToTop(genreCard8Ctnr);
        }, this);
        this.genreCard8Ctnr.on('drag', (pointer, dragX, dragY) => this.genreCard8Ctnr.setPosition(dragX, dragY));
        this.input.on('dragend', (pointer, genreCard8Ctnr, dropped) => {
            if (!dropped) {
                genreCard8Ctnr.x = genreCard8Ctnr.input.dragStartX;
                genreCard8Ctnr.y = genreCard8Ctnr.input.dragStartY;
            }
        });
        this.input.on('drop', (pointer, genreCard8Ctnr, zone) => {
            genreCard8Ctnr.x = zone.x;
            genreCard8Ctnr.y = zone.y;
        });

        // Continue button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const contBtn = new WideButton(this, 1920 - 260 - 80, 1080 - 60 - 60, 'Continue', this.nextBtnAudio);
        contBtn.on('pointerdown', function () {
            this.scene.start("Scene3_4", { music: this.music });
        }, this);

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_2");
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        this.textBg = this.add.sprite(650, 50, 'text-card3').setOrigin(0);
        this.textBg.scale = 1.4
        this.instructionText = this.add.rexBBCodeText(750, 100, "[b]Drag[/b] the images and place them in order of preference.",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0);
        this.instructionText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-50, 0, 500, 150, 32);
        this.titleText = this.add.text(55, 75, "List of music genres",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Sparkles. --
        // Spritesheet animation.
        this.anims.create({
            key: "sparkles",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("sparkles3-3", { start: 0, end: 119 }),
            repeat: 0,
            hideOnComplete: true
        });

        // First sparkle animation.
        var sparkles1 = this.add.sprite(200, 700, "sparkles3-3");
        sparkles1.play("sparkles");
        sparkles1.scale = 0.5
        sparkles1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles1.destroy();
        });

        // Second sparkle animation.
        var sparkles2 = this.add.sprite(470, 870, "sparkles3-3");
        sparkles2.play("sparkles");
        sparkles2.scale = 0.5
        sparkles2.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles2.destroy();
        });

        // Save user progress.
        const save = new SaveProgress(this)
    }
}