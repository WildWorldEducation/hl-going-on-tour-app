import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_3 extends Phaser.Scene {
    constructor() {
        super('Scene7_3');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-3', 'assets/Images/7_Level4/Backgrounds/background-4.jpg');
        this.load.image('envelope', '/assets/Images/7_Level4/sprite/envelope/envelope.png');
        this.load.image('stamp-1', '/assets/Images/7_Level4/sprite/envelope/stamp1.png');
        this.load.image('stamp-2', '/assets/Images/7_Level4/sprite/envelope/stamp2.png');
        this.load.image('stamp-3', '/assets/Images/7_Level4/sprite/envelope/stamp3.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
        this.load.image('letter-address', 'assets/Images/7_Level4/sprite/envelope/letter-info.png');

    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-3').setOrigin(0);

        // InstructionText Background. 
        this.instructionTextBg = this.add.sprite(910, 40, 'text-bg').setOrigin(0).setScale(0.97, 0.5);
        // Change instructionText opacity
        this.instructionTextBg.alpha = 1;

        // InstructionText
        this.instructionText = this.add.rexBBCodeText(989, 110,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "Las Vegas is famous for many \n things. Click on the 3 stamps to \nlearn more.",
            { fontFamily: "Arial", fontSize: "78px", color: '#000000', align: 'center' }).setOrigin(0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5


        // Envelop sprite
        this.envelop = this.add.sprite(370, 350, 'envelope').setOrigin(0).setScale(0.7);

        // Letter Info
        this.letterAddress = this.add.sprite(997, 703, 'letter-address').setOrigin(0).setScale(1);

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 500, 150, 32);
        this.tileText = this.add.text(75, 75, "Other Vegas Facts",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);




        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            localStorage.removeItem("stamp1");
            localStorage.removeItem("stamp2");
            localStorage.removeItem("stamp3");
            this.scene.start("Scene7_4", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            localStorage.removeItem("stamp1");
            localStorage.removeItem("stamp2");
            localStorage.removeItem("stamp3");
            this.scene.start("Scene7_2");
        }, this);


        //Initial state of stamp check


        // // Stamps.
        // Stamp 1.
        var stamp1 = this.add.sprite(730, 395, 'stamp-1').setOrigin(0);
        stamp1.angle = 0;
        stamp1.setScale(0.48, 0.45);
        stamp1.setInteractive({
            useHandCursor: true,
        });
        stamp1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp1", "true");

            this.scene.start("Scene7_3A");
        });


        // Stamp 2
        var stamp2 = this.add.sprite(997, 460, 'stamp-2').setOrigin(0);
        stamp2.setScale(0.5);
        stamp2.angle = 0;
        stamp2.setInteractive({
            useHandCursor: true
        });
        stamp2.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp2", "true");
            this.scene.start("Scene7_3B");
        });

        // Stamp 3
        var stamp3 = this.add.sprite(1220, 440, 'stamp-3').setOrigin(0);
        stamp3.setScale(0.58, 0.52);
        stamp3.angle = 5;
        stamp3.setInteractive({
            useHandCursor: true

        });
        stamp3.on('pointerdown', () => {
            this.nextBtnAudio.play();
            localStorage.setItem("stamp3", "true");
            this.scene.start("Scene7_3C");
        });


        // // The tick circle feature

        // circle 1
        const circle1 = this.add.circle(930 + 40, 380 + 40, 30, 0x01ac42);
        var tick1 = this.add.sprite(930 + 40, 380 + 40, 'tick').setOrigin(0.5)

        if (localStorage.getItem("stamp1") !== "true") {
            circle1.setAlpha(0)
            tick1.setAlpha(0)
        }

        const circle2 = this.add.circle(1300 - 285, 510 + 180, 30, 0x01ac42)
        var tick2 = this.add.sprite(1300 - 285, 510 + 180, 'tick').setOrigin(0.5)

        if (localStorage.getItem("stamp2") !== "true") {
            circle2.setAlpha(0)
            tick2.setAlpha(0)
        }

        const circle3 = this.add.circle(1480 - 240, 400 + 44, 30, 0x01ac42)
        var tick3 = this.add.sprite(1480 - 240, 400 + 44, 'tick').setOrigin(0.5)

        if (localStorage.getItem("stamp3") !== "true") {
            circle3.setAlpha(0)
            tick3.setAlpha(0)
        }


        // Save user progress.
        const save = new SaveProgress(this);
    }
}