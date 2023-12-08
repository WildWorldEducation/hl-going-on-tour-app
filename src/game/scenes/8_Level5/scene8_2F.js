import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene8_2F extends Phaser.Scene {
    constructor() {
        super('Scene8_2F');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprite sheets.
        this.load.spritesheet('sparkles3-3', 'assets/Images/3_Level1/genre-cards/sparkles1-spritesheet.png', { frameWidth: 530, frameHeight: 562 });
        // Sprites.        
        this.load.image('wood-bg', 'assets/Images/8_Level5/Backgrounds/wood-background-blur.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('wave', 'assets/Images/7_Level4/sprite/envelope/wave.png');
        this.load.image('gold-ores', 'assets/Images/8_Level5/Sprites/sub-envelope/gold-ores.png');
        this.load.image('tile-border', 'assets/Images/7_Level4/sprite/envelope/tile-border.png');
        this.load.image('blank-envelope', 'assets/Images/4_Level2/stamps/envelope2.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#000000");
        const bg = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        /** Having bg alpha on top of a color to make the darken effect */
        bg.alpha = 0.4;

        // Envelope
        const blankEnvelope = this.add.sprite(960, 540, 'blank-envelope').setOrigin(0.5);
        blankEnvelope.setScale(1.35);

        // Tile Border
        const tileBorder = this.add.sprite(960, 250, 'tile-border').setOrigin(0.5);
        tileBorder.setScale(0.91, 0.88);


        // Tile text.
        this.heading = this.add.rexBBCodeText(tileBorder.x, tileBorder.y,
            `[b]FACT 6[/b]`,
            { fontFamily: "Arial", fontSize: "78px", color: '#783a0d', align: 'center' }).setOrigin(0.5, -0.1);
        // Dealing with text quality.
        this.heading.setScale(0.5);

        // Wave texture
        const wave = this.add.sprite(1520, 265, 'wave').setOrigin(0.5);

        // Gold ores
        const goldOres = this.add.sprite(660, 610, 'gold-ores').setScale(0.95);

        // Instruction Text
        this.text = this.add.text(1315, 610,
            `During the California Gold \nRush, San Francisco \ngrew from a population of \n200 to 36,000.`,
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 13 }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;

        // -- Sparkles Animation. -- //
        // Spritesheet animation.
        this.anims.create({
            key: "sparkles",
            frameRate: 24,
            // Sprite sheet use number to indicate each frame
            // tell the animation manager to animate from frame 0 to frame 55 because it seem like this animation is shorter than in scene3_3
            frames: this.anims.generateFrameNumbers("sparkles3-3", { start: 0, end: 48 }),
            repeat: 0,
            hideOnComplete: true
        });

        // First sparkle animation.
        /** Wait for 1.5 second before animate the first sparkles */
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                const sparkles1 = this.add.sprite(520, 620, "sparkles3-3");
                sparkles1.play("sparkles");
                sparkles1.setScale(0.3, 0.5);
                sparkles1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
                    sparkles1.destroy();
                });
            },
            loop: false
        });

        // Second sparkle animation.

        /** Wait for 6 second before animate the second sparkles because we have to add extra time for the first one to complete */
        this.time.addEvent({
            delay: 6000,
            callback: () => {
                const sparkles2 = this.add.sprite(870, 620, "sparkles3-3");
                sparkles2.play("sparkles");
                sparkles2.setScale(0.3, 0.5);
                sparkles2.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
                    sparkles2.destroy();
                });
            },
            loop: false
        });


        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70 + 10, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            localStorage.setItem("stamp1", "true");
            this.scene.start('Scene8_2');
        }, this);
    }
}