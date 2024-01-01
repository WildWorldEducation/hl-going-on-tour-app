import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import FormUtil from '../util/formUtil.js'

export default class Scene4_22 extends Phaser.Scene {
    constructor() {
        super('Scene4_22');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Video.   
        this.load.video('vid4-7', 'assets/Videos/4_Level2/vid4-7.mp4');
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprite sheets.
        this.load.spritesheet('sparkles4-22', 'assets/Images/3_Level1/genre-cards/sparkles1-spritesheet.png', { frameWidth: 530, frameHeight: 562 });
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-22', 'assets/Images/General/text-card4.png');
        this.load.image('beard-man', 'assets/Images/4_Level2/popcorn-lung/beard-man.png');
        this.load.image('normal-lung', 'assets/Images/4_Level2/popcorn-lung/normal-lung.png');
        this.load.image('popcorn-lung', 'assets/Images/4_Level2/popcorn-lung/popcorn-lung.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.setVolume(0.5);
            this.music.loop = true
        }

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 700, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Diacetyl chemical = Popcorn Lung`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        var textCard = this.add.sprite(600, 640, 'textBG4-22').setOrigin(0.5).setAlpha(1).setScale(1.7)
        //Text.
        this.text = this.add.rexBBCodeText(600, 640,
            `A Harvard study found that most
nicotine in e-cigarettes contains a
[b]chemical called dactyl[/b], which [b]can
cause scarring of the air sacs[/b] in the
lungs. This causes airways to thicken
and become narrow, [b]making it harder
to breathe[/b]. This can lead to a disease
called "popcorn lung".

Remember [b]Breathing is the Most
Important Thig We Do As Humans[/b].

[b]Move the slider[/b] to learn more
about normal and a popcorn lung.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text

        // // -- Circle Sprites -- // //
        // generic variables
        const circleSpriteX = 1395;
        const circleSpriteY = 460;
        const circleSpriteScale = 0.4;
        // adding sprites 
        this.beardMan = this.add.sprite(circleSpriteX, circleSpriteY, 'beard-man').setScale(circleSpriteScale);
        this.normalLung = this.add.sprite(circleSpriteX, circleSpriteY, 'normal-lung').setScale(circleSpriteScale).setAlpha(0);
        this.popcornLung = this.add.sprite(circleSpriteX, circleSpriteY, 'popcorn-lung').setScale(circleSpriteScale).setAlpha(0);

        // // -+ The input range section +- // //
        this.formUtil = new FormUtil({
            scene: this,
        });
        this.formUtil.showElement("scene4_22-range-input");
        this.formUtil.scaleToGameW("scene4_22-range-input", .8);
        // get the initial value of the range input ( We have to get the <input> Id not the div contains it)
        this.inputValue = this.formUtil.getRangeValue('lung-popcorn-stage');

        // The text for normal and popcorn lung
        this.explainText = this.add.rexBBCodeText(1110, 810,
            "",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center', lineSpacing: 5 }).setOrigin(0);
        this.explainText.setScale(0.5);


        // Flag to save current show circle sprite
        this.currentShow = this.beardMan;
        switch (this.inputValue) {
            case '0':
                this.explainText.setText("");
                this.currentShow.setAlpha(0);
                this.currentShow = this.beardMan;
                this.currentShow.setAlpha(1);
                break;
            case '20':
                this.explainText.setText("[b]Normal lung: the air sac is open[/b]");
                this.currentShow.setAlpha(0);
                this.currentShow = this.normalLung;
                this.currentShow.setAlpha(1);
                break
            default:
                this.explainText.setText("[b]Popcorn lung: the air sac is close[/b]");
                this.currentShow.setAlpha(0);
                this.currentShow = this.popcornLung;
                this.currentShow.setAlpha(1);
                break;
        }

        // // -+ End of input range section +- // //

        // -- Sparkles Animation. -- //
        // Spritesheet animation.
        this.anims.create({
            key: "sparkles",
            frameRate: 24,
            // Sprite sheet use number to indicate each frame
            // tell the animation manager to animate from frame 0 to frame 55 because it seem like this animation is shorter than in scene3_3
            frames: this.anims.generateFrameNumbers("sparkles4-22", { start: 0, end: 30 }),
            repeat: 0,
            hideOnComplete: true
        });

        // First sparkle animation.
        /** Wait for 0.5 second before animate the first sparkles */
        this.time.addEvent({
            delay: 500,
            callback: () => {
                const sparkles1 = this.add.sprite(1110, 935, "sparkles4-22");
                sparkles1.play("sparkles");
                sparkles1.setScale(0.3, 0.5);
                sparkles1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
                    sparkles1.destroy();
                });
            },
            loop: false
        });

        /** Wait for 2 second before animate the first sparkles */
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const sparkles2 = this.add.sprite(1780, 935, "sparkles4-22");
                sparkles2.play("sparkles");
                sparkles2.setScale(0.3, 0.5);
                sparkles2.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
                    sparkles2.destroy();
                });
            },
            loop: false
        });
        // -- End of Sparkles Animation -- //

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.formUtil.hideElement("scene4_22-range-input");
            this.scene.start("Scene4_23", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.formUtil.hideElement("scene4_22-range-input");
            this.scene.start("Scene4_21", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40
        // Save user progress.
        const save = new SaveProgress(this)
    }
    update() {
        // if range input has changed we will update  text and  sprite of the scene
        if (this.formUtil.getRangeValue('lung-popcorn-stage') !== this.inputValue) {
            this.inputValue = this.formUtil.getRangeValue('lung-popcorn-stage');
            // using switch case to determine what to show on screen based on input value
            switch (this.inputValue) {
                case '0':
                    this.explainText.setText("");
                    this.currentShow.setAlpha(0);
                    this.currentShow = this.beardMan;
                    this.currentShow.setAlpha(1);
                    break;
                case '20':
                    this.explainText.setText("[b]Normal lung: the air sac is open[/b]");
                    this.currentShow.setAlpha(0);
                    this.currentShow = this.normalLung;
                    this.currentShow.setAlpha(1);
                    break
                default:
                    this.explainText.setText("[b]Popcorn lung: the air sac is closed[/b]");
                    this.currentShow.setAlpha(0);
                    this.currentShow = this.popcornLung;
                    this.currentShow.setAlpha(1);
                    break;
            }

        }
    }
}