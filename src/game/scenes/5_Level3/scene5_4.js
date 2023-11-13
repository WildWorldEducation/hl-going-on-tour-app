import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js';
import SaveProgress from '../Custom_Classes/SaveProgress.js'



export default class Scene5_4 extends Phaser.Scene {
    constructor() {
        super('Scene5_4');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('wood-bg', 'assets/Images/5_Level3/letter-scene/wood-bg.png');
        this.load.image('envelope', 'assets/Images/5_Level3/letter-scene/envelope.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
        this.load.image('stamp1', 'assets/Images/5_Level3/letter-scene/stamp1.png');
        this.load.image('stamp2', 'assets/Images/5_Level3/letter-scene/stamp2.png');
        this.load.image('stamp3', 'assets/Images/5_Level3/letter-scene/stamp3.png');
        this.load.image('stamp4', 'assets/Images/5_Level3/letter-scene/stamp4.png');
        this.load.image('stamp5', 'assets/Images/5_Level3/letter-scene/stamp5.png');
        this.load.image('stamp6', 'assets/Images/5_Level3/letter-scene/stamp6.png');
        this.load.image('stamp7', 'assets/Images/5_Level3/letter-scene/stamp7.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card1', 'assets/Images/General/text-card2.png');

    }

    create() {
        // City bg.
        const background = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        background.width = this.sys.canvas.width;
        background.height = this.sys.canvas.height;

        // Title box.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 500, 150, 32);

        this.instructionText = this.add.text(55, 75, "Facts about Chicago",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Text box
        var textBox = this.add.sprite(900, 40, 'text-card1').setOrigin(0);
        textBox.scale = 0.9;
        textBox.scaleY = 0.45;
        textBox.alpha = 0.9;

        this.contentText = this.add.rexBBCodeText(textBox.x, textBox.y,
            `
            Chicago is famous for many
            things. [b]Click on the 7 stamps[/b] to
            learn more.
            `,
            { fontFamily: "Arial", fontSize: "65px", color: '#000000', align: 'center' }).setOrigin(0, -0.1);
        // Dealing with text quality.
        this.contentText.scale = 0.5;

        // Envelope.
        var envelope = this.add.sprite(0, 0, 'envelope').setOrigin(0.5);
        envelope.x = this.cameras.main.width / 2
        envelope.y = this.cameras.main.height / 2 + 100
        envelope.setScale(0.9);

        this.addressText = this.add.rexBBCodeText(950, 650,
            `
            Ms. Haley Whites
            Summer Palm
            Main Street 97
            `,
            { fontFamily: "Comic Sans MS", fontSize: "65px", color: '#000000', align: 'center' }).setOrigin(0, -0.1);
        // Dealing with text quality.
        this.addressText.scale = 0.5;

        const stamp1 = this.add.sprite(375, 350, 'stamp1').setOrigin(0)
        stamp1.setScale(0.65);
        stamp1.angle = 5
        stamp1.setInteractive({
            useHandCursor: true
        });
        stamp1.on('pointerdown', () => {
            localStorage.setItem("stamp1", "true");
            this.scene.start("Scene5_4A");
        });

        const stamp2 = this.add.sprite(600, 350, 'stamp2').setOrigin(0)
        stamp2.setScale(0.65);
        stamp2.angle = 1
        stamp2.setInteractive({
            useHandCursor: true
        });
        stamp2.on('pointerdown', () => {
            localStorage.setItem("stamp2", "true");
            this.scene.start("Scene5_4B");
        });

        const stamp3 = this.add.sprite(775, 365, 'stamp3').setOrigin(0)
        stamp3.setScale(0.65);
        stamp3.angle = -3
        stamp3.setInteractive({
            useHandCursor: true
        });
        stamp3.on('pointerdown', () => {
            localStorage.setItem("stamp3", "true");
            this.scene.start("Scene5_4C");
        });

        const stamp4 = this.add.sprite(940, 350, 'stamp4').setOrigin(0)
        stamp4.setScale(0.65);
        stamp4.angle = 1
        stamp4.setInteractive({
            useHandCursor: true
        });
        stamp4.on('pointerdown', () => {
            localStorage.setItem("stamp4", "true");
            this.scene.start("Scene5_4D");
        });

        const stamp5 = this.add.sprite(1150, 330, 'stamp5').setOrigin(0)
        stamp5.setScale(0.65);
        stamp5.angle = 1
        stamp5.setInteractive({
            useHandCursor: true
        });
        stamp5.on('pointerdown', () => {
            localStorage.setItem("stamp5", "true");
            this.scene.start("Scene5_4E");
        });

        const stamp6 = this.add.sprite(1100, 500, 'stamp6').setOrigin(0)
        stamp6.setScale(0.65);
        stamp6.angle = 1
        stamp6.setInteractive({
            useHandCursor: true
        });
        stamp6.on('pointerdown', () => {
            localStorage.setItem("stamp6", "true");
            this.scene.start("Scene5_4F");
        });

        const stamp7 = this.add.sprite(1325, 350, 'stamp7').setOrigin(0)
        stamp7.setScale(0.65);
        stamp7.angle = -4
        stamp7.setInteractive({
            useHandCursor: true
        });
        stamp7.on('pointerdown', () => {
            localStorage.setItem("stamp7", "true");
            this.scene.start("Scene5_4G");
        });

        // circle is around +30, +20 (x, y)
        const circle1 = this.add.circle(535, 530, 20, 0x01ac42);
        var tick1 = this.add.sprite(535, 530, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp1") != "true") {
            circle1.setAlpha(0)
            tick1.setAlpha(0)
        }

        const circle2 = this.add.circle(610, 360, 20, 0x01ac42);
        var tick2 = this.add.sprite(610, 360, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp2") != "true") {
            circle2.setAlpha(0)
            tick2.setAlpha(0)
        }

        const circle3 = this.add.circle(790, 515, 20, 0x01ac42)
        var tick3 = this.add.sprite(790, 515, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp3") != "true") {
            circle3.setAlpha(0)
            tick3.setAlpha(0)
        }

        const circle4 = this.add.circle(1060, 365, 20, 0x01ac42)
        var tick4 = this.add.sprite(1060, 365, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp4") != "true") {
            circle4.setAlpha(0)
            tick4.setAlpha(0)
        }

        const circle5 = this.add.circle(1150, 425, 20, 0x01ac42)
        var tick5 = this.add.sprite(1150, 425, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp5") != "true") {
            circle5.setAlpha(0)
            tick5.setAlpha(0)
        }

        const circle6 = this.add.circle(1240, 620, 20, 0x01ac42)
        var tick6 = this.add.sprite(1240, 620, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp6") != "true") {
            circle6.setAlpha(0)
            tick6.setAlpha(0)
        }

        const circle7 = this.add.circle(1490, 365, 20, 0x01ac42)
        var tick7 = this.add.sprite(1490, 365, 'tick').setOrigin(0.5).setScale(0.6);

        if (localStorage.getItem("stamp7") != "true") {
            circle7.setAlpha(0)
            tick7.setAlpha(0)
        }

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_5", { });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_3", { });
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this)
    }
}