import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene8_2 extends Phaser.Scene {
    constructor() {
        super('Scene8_2');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-8-2', 'assets/Images/7_Level4/Backgrounds/background-4.jpg');
        this.load.image('envelope', 'assets/Images/8_Level5/Sprites/envelope/envelope.png');
        // Stamp sprites 
        this.load.image('stamp-1', 'assets/Images/8_Level5/Sprites/envelope/stamp-1.png');
        this.load.image('stamp-2', 'assets/Images/8_Level5/Sprites/envelope/stamp-2.png');
        this.load.image('stamp-3', 'assets/Images/8_Level5/Sprites/envelope/stamp-3.png');
        this.load.image('stamp-4', 'assets/Images/8_Level5/Sprites/envelope/stamp-4.png');
        this.load.image('stamp-5', 'assets/Images/8_Level5/Sprites/envelope/stamp-5.png');
        this.load.image('stamp-6', 'assets/Images/8_Level5/Sprites/envelope/stamp-6.png');
        // Stamp shadow
        this.load.image('stamp-1-shadow', 'assets/Images/8_Level5/Sprites/envelope/stamp-1-shadow.png');
        this.load.image('stamp-2-shadow', 'assets/Images/8_Level5/Sprites/envelope/stamp-2-shadow.png');
        this.load.image('stamp-3-shadow', 'assets/Images/8_Level5/Sprites/envelope/stamp-3-shadow.png');
        this.load.image('stamp-4-shadow', 'assets/Images/8_Level5/Sprites/envelope/stamp-4-shadow.png');
        this.load.image('stamp-5-shadow', 'assets/Images/8_Level5/Sprites/envelope/stamp-5-shadow.png');
        this.load.image('stamp-6-shadow', 'assets/Images/8_Level5/Sprites/envelope/stamp-6-shadow.png');


        this.load.image('tick', 'assets/Images/General/tick.png');
        this.load.image('letter-address', 'assets/Images/7_Level4/sprite/envelope/letter-info.png');
    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-8-2').setOrigin(0);

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 450, 150, 32);
        this.tileText = this.add.text(75, 75, "California Facts",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);


        // InstructionText Background. 
        this.instructionTextBg = this.add.sprite(910, 30, 'text-bg').setOrigin(0).setScale(0.97, 0.5);
        // Change instructionText opacity
        this.instructionTextBg.alpha = 1;

        // InstructionText
        this.instructionText = this.add.rexBBCodeText(this.instructionTextBg.x, this.instructionTextBg.y,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "With a population around 39 million \npeople, California is the most populous \nUS state. \n[b]Click on the 6 stamps to learn more.[/b]",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(-0.13, -0.3);
        // Dealing with text quality.
        this.instructionText.scale = 0.5


        // Envelop sprite
        this.envelop = this.add.sprite(340, 320, 'envelope').setOrigin(0).setScale(0.88, 0.85);
        this.envelop.setAngle(-0.8);

        // Letter Info
        this.letterAddress = this.add.sprite(997, 723, 'letter-address').setOrigin(0).setScale(1.1);




        //Initial state of stamp check


        // // *- Stamps. -* // // 
        // Stamp 1. //
        const stamp1 = this.add.sprite(945, 447, 'stamp-1');
        stamp1.setScale(0.40, 0.38);
        stamp1.setAngle(-4.65);
        stamp1.setInteractive({
            useHandCursor: true,
        });
        /** Archive shadow effect by have another stamp sprite with shadow and set alpha to 0
         *  When hover we will turn on the stamp with shadow sprite
         */
        const stamp1Shadow = this.add.sprite(945, 447, 'stamp-1-shadow');
        stamp1Shadow.setScale(0.40, 0.38);
        stamp1Shadow.setAngle(-4.65);
        stamp1Shadow.setAlpha(0);
        stamp1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp1", "true");
            this.scene.start("Scene8_2A");
        });
        stamp1.on('pointerover', () => {
            stamp1Shadow.setAlpha(1);
        });
        stamp1.on('pointerout', () => {
            stamp1Shadow.setAlpha(0);
        });
        // circle 1
        const circle1 = this.add.circle(stamp1.x - 85, stamp1.y + 66, 30, 0x01ac42);
        circle1.setScale(0.7);
        const tick1 = this.add.sprite(stamp1.x - 85, stamp1.y + 66, 'tick').setOrigin(0.5);
        tick1.setScale(0.7);

        if (localStorage.getItem("stamp1") !== "true") {
            circle1.setAlpha(0);
            tick1.setAlpha(0);
        }
        // . //

        // Stamp 2 //
        const stamp2 = this.add.sprite(1097, 354, 'stamp-2').setOrigin(0);
        stamp2.setScale(0.5, 0.47);
        stamp2.setAngle(1.1);
        stamp2.setInteractive({
            useHandCursor: true
        });
        /** Archive shadow effect by have another stamp sprite with shadow and set alpha to 0
         *  When hover we will turn on the stamp with shadow sprite
         */
        const stamp2Shadow = this.add.sprite(1097, 354, 'stamp-2-shadow').setOrigin(0);
        stamp2Shadow.setScale(0.5, 0.47);
        stamp2Shadow.setAngle(1.1);
        stamp2Shadow.setAlpha(0);
        stamp2.on('pointerover', () => {
            stamp2Shadow.setAlpha(1);
        });
        stamp2.on('pointerout', () => {
            stamp2Shadow.setAlpha(0);
        });
        stamp2.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp2", "true");
            this.scene.start("Scene8_2B");
        });
        // circle 2
        const circle2 = this.add.circle(stamp2.x + 10, stamp2.y + 15, 30, 0x01ac42);
        const tick2 = this.add.sprite(stamp2.x + 10, stamp2.y + 15, 'tick').setOrigin(0.5);
        circle2.setScale(0.7);
        tick2.setScale(0.7);

        if (localStorage.getItem("stamp2") !== "true") {
            circle2.setAlpha(0);
            tick2.setAlpha(0);
        }
        // . //

        // Stamp 3
        const stamp3 = this.add.sprite(1390, 350, 'stamp-3').setOrigin(0);
        stamp3.setScale(0.355);
        stamp3.setAngle(5);
        stamp3.setInteractive({
            useHandCursor: true
        });
        /** Archive shadow effect by have another stamp sprite with shadow and set alpha to 0
         *  When hover we will turn on the stamp with shadow sprite
         */
        const stamp3Shadow = this.add.sprite(1390, 350, 'stamp-3-shadow').setOrigin(0);
        stamp3Shadow.setScale(0.355);
        stamp3Shadow.setAngle(5);
        stamp3Shadow.setAlpha(0);
        stamp3.on('pointerover', () => {
            stamp3Shadow.setAlpha(1);
        });
        stamp3.on('pointerout', () => {
            stamp3Shadow.setAlpha(0);
        });
        stamp3.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp3", "true");
            this.scene.start("Scene8_2C");
        });
        // circle 3
        const circle3 = this.add.circle(stamp3.x + 10, stamp3.y + 7, 30, 0x01ac42);
        const tick3 = this.add.sprite(stamp3.x + 10, stamp3.y + 7, 'tick').setOrigin(0.5);
        circle3.setScale(0.7);
        tick3.setScale(0.7);

        if (localStorage.getItem("stamp3") !== "true") {
            circle3.setAlpha(0);
            tick3.setAlpha(0);
        }

        // . //

        // Stamp 4
        const stamp4 = this.add.sprite(880, 540, 'stamp-4').setOrigin(0);
        stamp4.setScale(0.475);
        stamp4.setInteractive({
            useHandCursor: true
        });
        /** Archive shadow effect by have another stamp sprite with shadow and set alpha to 0
         *  When hover we will turn on the stamp with shadow sprite
         */
        const stamp4Shadow = this.add.sprite(880, 540, 'stamp-4-shadow').setOrigin(0);
        stamp4Shadow.setScale(0.475);
        stamp4Shadow.setAlpha(0);
        stamp4.on('pointerover', () => {
            stamp4Shadow.setAlpha(1);
        });
        stamp4.on('pointerout', () => {
            stamp4Shadow.setAlpha(0);
        });
        stamp4.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp4", "true");
            this.scene.start("Scene8_2D");
        });
        // circle 4
        const circle4 = this.add.circle(stamp4.x + 176, stamp4.y + 184, 30, 0x01ac42);
        var tick4 = this.add.sprite(stamp4.x + 176, stamp4.y + 184, 'tick').setOrigin(0.5);
        circle4.setScale(0.7);
        tick4.setScale(0.7);
        if (localStorage.getItem("stamp4") !== "true") {
            circle4.setAlpha(0);
            tick4.setAlpha(0);
        };
        // . //

        // Stamp 5
        const stamp5 = this.add.sprite(1086, 525, 'stamp-5').setOrigin(0);
        stamp5.setScale(0.445);
        stamp5.setInteractive({
            useHandCursor: true
        });
        /** Archive shadow effect by have another stamp sprite with shadow and set alpha to 0
         *  When hover we will turn on the stamp with shadow sprite
         */
        const stamp5Shadow = this.add.sprite(1086, 525, 'stamp-5-shadow').setOrigin(0);
        stamp5Shadow.setScale(0.445);
        stamp5Shadow.setAlpha(0);
        stamp5.on('pointerover', () => {
            stamp5Shadow.setAlpha(1);
        });
        stamp5.on('pointerout', () => {
            stamp5Shadow.setAlpha(0);
        });
        stamp5.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp5", "true");
            this.scene.start("Scene8_2E");
        });
        // circle 5
        const circle5 = this.add.circle(stamp5.x + 170, stamp5.y + 9, 30, 0x01ac42);
        var tick5 = this.add.sprite(stamp5.x + 170, stamp5.y + 9, 'tick').setOrigin(0.5);
        circle5.setScale(0.7);
        tick5.setScale(0.7);

        if (localStorage.getItem("stamp5") !== "true") {
            circle5.setAlpha(0);
            tick5.setAlpha(0);
        };

        // . //

        // Stamp 6
        const stamp6 = this.add.sprite(1306, 565, 'stamp-6').setOrigin(0);
        stamp6.setScale(0.385);
        stamp6.setAngle(-10);
        stamp6.setInteractive({
            useHandCursor: true
        });
        /** Archive shadow effect by have another stamp sprite with shadow and set alpha to 0
         *  When hover we will turn on the stamp with shadow sprite
         */
        const stamp6Shadow = this.add.sprite(1306, 565, 'stamp-6-shadow').setOrigin(0);
        stamp6Shadow.setScale(0.385);
        stamp6Shadow.setAngle(-10);
        stamp6Shadow.setAlpha(0);
        stamp6.on('pointerover', () => {
            stamp6Shadow.setAlpha(1);
        });
        stamp6.on('pointerout', () => {
            stamp6Shadow.setAlpha(0);
        });
        stamp6.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp6", "true");
            this.scene.start("Scene8_2F");
        });
        // circle 6
        const circle6 = this.add.circle(stamp6.x + 32, stamp6.y + 122, 30, 0x01ac42);
        var tick6 = this.add.sprite(stamp6.x + 32, stamp6.y + 122, 'tick').setOrigin(0.5);
        circle6.setScale(0.7);
        tick6.setScale(0.7);

        if (localStorage.getItem("stamp6") !== "true") {
            circle6.setAlpha(0);
            tick6.setAlpha(0);
        };

        // . //

        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            localStorage.removeItem("stamp1");
            localStorage.removeItem("stamp2");
            localStorage.removeItem("stamp3");
            localStorage.removeItem("stamp4");
            localStorage.removeItem("stamp5");
            localStorage.removeItem("stamp6");
            this.scene.start("Scene8_3", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            localStorage.removeItem("stamp1");
            localStorage.removeItem("stamp2");
            localStorage.removeItem("stamp3");
            localStorage.removeItem("stamp4");
            localStorage.removeItem("stamp5");
            localStorage.removeItem("stamp6");
            this.scene.start("Scene8_1");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}