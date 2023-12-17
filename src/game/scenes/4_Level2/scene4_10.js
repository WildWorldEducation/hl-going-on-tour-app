import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import WideButton2 from '../Custom_Classes/WideButton2.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_10 extends Phaser.Scene {
    constructor() {
        super('Scene4_10');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-10', 'assets/Images/General/text-card3.png');
        this.load.image('dj', 'assets/Images/4_Level2/dj.jpg');
        this.load.image('tick', 'assets/Images/General/tick.png');
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
        var bg = this.add.sprite(0, 0, 'dj').setOrigin(0);

        // Text.
        var textBG = this.add.sprite(600, 300, 'textBG4-10').setOrigin(0.5).setScale(1.7, 1.5);
        textBG.alpha = 0.9
        this.text = this.add.rexBBCodeText(600, 300,
            `Tonight you can choose to see a "triple threat"
performer. A triple threat performer has
strengths in multiple areas, such as singing,
dancing, and producing.
Who do you want to see?
[b]Click on the names below[/b] to learn more.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // // -- Buttons. -- // //
        /**
         * When a button was clicked we will change text and clear old button graphic with new one
         */
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const btn1 = new WideButton2(this, 200, 1100, 'Harry Styles', this.nextBtnAudio); //600
        btn1.on('pointerdown', function () {
            circle1.setAlpha(1)
            tick1.setAlpha(1)
            this.textCardBg.alpha = 1;
            this.text.setText(`Harry Edwards Styles is an English singer,
songwriter and actor. He grew to fame as a part of the
band One Direction. He then went solo and continued
his success winning multiple awards.`);
            // clear the old btn graphic to make new one with different triangle position based on button position
            this.textCardBg.clear();
            this.textCardBg.fillStyle(0xFFFFFF, 1);
            this.textCardBg.fillRoundedRect(600, 600, 1000, 320, 16);
            // The pointer triangle
            var triangle = Phaser.Geom.Triangle.BuildRight(600 - 18, 600 + 50, 45, 45);
            triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
            this.textCardBg.fillTriangleShape(triangle);

        }, this);

        const btn2 = new WideButton2(this, 200, 1120, 'Jennifer Lopez', this.nextBtnAudio); //720
        btn2.on('pointerdown', function () {
            circle2.setAlpha(1)
            tick2.setAlpha(1)
            this.textCardBg.alpha = 1
            this.text.setText(`Jennifer Lopez is considered a pop culture icon,
and is often described as a triple threat entertainer -
singer, actress, and dancer. She is considered the most
influential Hispanic entertainer in North America.`);
            // clear the old btn graphic to make new one with different triangle position based on button position
            this.textCardBg.clear();
            this.textCardBg.fillStyle(0xFFFFFF, 1);
            this.textCardBg.fillRoundedRect(600, 600, 1000, 320, 16);
            // The pointer triangle
            var triangle = Phaser.Geom.Triangle.BuildRight(600 - 18, 600 + 160, 45, 45);
            triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
            this.textCardBg.fillTriangleShape(triangle);
        }, this);

        const btn3 = new WideButton2(this, 200, 1140, 'Jay-Z', this.nextBtnAudio); // 840
        btn3.on('pointerdown', function () {
            circle3.setAlpha(1)
            tick3.setAlpha(1)
            this.textCardBg.alpha = 1
            this.text.setText(`Born and raised in NYC Shawn Corey Carter,
aka Jay-Z, is a triple threat - American rapper, record
executive, and media proprietor. He is one of the most
influential hip-hop artists in history. He has been central
to the creative and commercial success of artists
including Kanye West, Rihanna, and J. Cole.`);
            // clear the old btn graphic to make new one with different triangle position based on button position
            this.textCardBg.clear();
            this.textCardBg.fillStyle(0xFFFFFF, 1);
            this.textCardBg.fillRoundedRect(600, 600, 1000, 320, 16);
            // The pointer triangle
            var triangle = Phaser.Geom.Triangle.BuildRight(600 - 18, 600 + 290, 45, 45);
            triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
            this.textCardBg.fillTriangleShape(triangle);
        }, this);
        // // -- End Of Buttons -- // //

        // // THE ANIMATION FOR BUTTON // //
        const btn1Tween = this.add.tween({
            targets: btn1,
            y: 600,
            duration: 600,
            ease: 'power-3'
        });
        const btn2Tween = this.add.tween({
            targets: btn2,
            y: 720,
            duration: 600,
            delay: 300,
            ease: 'power-3'

        });
        const btn3Tween = this.add.tween({
            targets: btn3,
            y: 840,
            delay: 600,
            duration: 600,
            ease: 'power-3'

        });


        // // == Text Bubble graphic. == // //
        this.textCardBg = this.add.graphics();
        this.textCardBg.fillStyle(0xFFFFFF, 1);
        this.textCardBg.fillRoundedRect(600, 600, 1000, 320, 16);
        this.textCardBg.alpha = 0;
        this.text = this.add.text(1100, 760,
            ``,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;


        // // == End of Text Bubble graphic. == // // 

        // Ticks (checks)
        const circle1 = this.add.circle(530, 600, 30, 0x01ac42).setAlpha(0);
        var tick1 = this.add.sprite(530, 600, 'tick').setOrigin(0.5).setAlpha(0);

        const circle2 = this.add.circle(530, 720, 30, 0x01ac42).setAlpha(0);
        var tick2 = this.add.sprite(530, 720, 'tick').setOrigin(0.5).setAlpha(0);

        const circle3 = this.add.circle(530, 840, 30, 0x01ac42).setAlpha(0);
        var tick3 = this.add.sprite(530, 840, 'tick').setOrigin(0.5).setAlpha(0);


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_11A", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_9", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}