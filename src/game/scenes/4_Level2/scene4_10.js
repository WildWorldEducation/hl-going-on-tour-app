import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import WideButton2 from '../Custom_Classes/WideButton2.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_10 extends Phaser.Scene {
    constructor() {
        super('Scene4_10');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-10', 'assets/Images/General/text-card3.png');
        this.load.image('dj', 'assets/Images/4_Level2/dj.jpg');
        this.load.image('tick', 'assets/Images/General/tick.png');
    }

    create() {
        // BG.        
        var bg = this.add.sprite(0, 0, 'dj').setOrigin(0);

        // Text.
        var textBG = this.add.sprite(600, 300, 'textBG4-10').setOrigin(0.5).setScale(1.7);
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

        // Buttons.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const btn1 = new WideButton2(this, 200, 600, 'Harry Styles', this.nextBtnAudio);
        btn1.on('pointerdown', function () {
            circle1.setAlpha(1)
            tick1.setAlpha(1)
            this.textCardBg.alpha = 1
            this.text.setText(`Harry Edwards Styles is an English singer,
songwriter and actor. He grew to fame as a part of the
band One Direction. He then went solo and continued
his success winning multiple awards.`);
        }, this);

        const btn2 = new WideButton2(this, 200, 720, 'Jennifer Lopez', this.nextBtnAudio);
        btn2.on('pointerdown', function () {
            circle2.setAlpha(1)
            tick2.setAlpha(1)
            this.textCardBg.alpha = 1
            this.text.setText(`Jennifer Lopex is considered a pop culture icon,
and is often described as a triple threat entertainer -
singer, actress, and dancer. She is considered the most
influential Hispanic entertainer in North America.`)
        }, this);

        const btn3 = new WideButton2(this, 200, 840, 'Jay-Z', this.nextBtnAudio);
        btn3.on('pointerdown', function () {
            circle3.setAlpha(1)
            tick3.setAlpha(1)
            this.textCardBg.alpha = 1
            this.text.setText(`Born and raised in NYC Shawn Corey Carter,
aka Jay-Z, is a triple threat - American rapper, record
executive, and media proprietor. He is one of the most
influential hip-hop artists in history. He has been central
to the creative and commercial success of artists
including Kanye West, Rihanna, and J. Cole.`)
        }, this);

        //Text card.
        this.textCardBg = this.add.graphics();
        this.textCardBg.fillStyle(0xFFFFFF, 1);
        this.textCardBg.fillRoundedRect(600, 600, 1000, 320, 16);
        this.textCardBg.alpha = 0
        this.text = this.add.text(1100, 760,
            ``,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

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
            this.scene.start("Scene4_11");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_9");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}