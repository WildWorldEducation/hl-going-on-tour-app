import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene7_16 extends Phaser.Scene {
    constructor() {
        super('Scene7_16');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-16', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-16').setOrigin(0);


        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 625, 150, 32);
        this.tileText = this.add.text(75, 75, "Marketing and Advertising",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. //
        this.instructionTextBg = this.add.sprite(870, -240, 'text-bg').setOrigin(0).setScale(1.65, 1.18);
        this.instructionText = this.add.rexBBCodeText(1060, 88,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "There are some other methods you may, or \nmay not, be aware of. \n\n[b]Click on the buttons below to learn more.[/b]", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5


        // ** Buttons ** //

        // - button 1 -
        const button1 = new CustomButton(this, 270, 500, 330, 270, 'Hidden \nMarketing', 85, -0.31, -0.79, this.nextBtnAudio, 60);
        const circle1 = this.add.circle(button1.x + 320, button1.y + 15, 30, 0x01ac42); // position of circle 1 is on the top right of the button 1
        var tick1 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        // if the player have click the button before we turn on the tick
        if (localStorage.getItem('scene7_16Btn1')) {
            console.log('btn1 clicked ' + localStorage.getItem('scene7_16Btn1'))
            circle1.setAlpha(1);
            tick1.copyPosition(circle1).setAlpha(1);
        } else {
            circle1.setAlpha(0);
            tick1.copyPosition(circle1).setAlpha(0);
        }

        // - button 2 -
        const button2 = new CustomButton(this, 770, 500, 330, 270, 'Product \nPlacement', 85, -0.31, -0.79, this.nextBtnAudio, 60);
        const circle2 = this.add.circle(button2.x + 320, button2.y + 15, 30, 0x01ac42); // position of circle 2 is on the top right of the button 2
        var tick2 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        // if the player have click the button before we turn on the tick
        if (localStorage.getItem('scene7_16Btn2')) {
            console.log('btn2 clicked ' + localStorage.getItem('scene7_16Btn2'))
            circle2.setAlpha(1);
            tick2.copyPosition(circle2).setAlpha(1);
        } else {
            circle2.setAlpha(0);
            tick2.copyPosition(circle2).setAlpha(0);
        }

        // - button 3 -
        const button3 = new CustomButton(this, 1270, 500, 330, 270, 'Subliminal \nMarketing', 85, -0.26, -0.79, this.nextBtnAudio, 60);
        const circle3 = this.add.circle(button3.x + 320, button3.y + 15, 30, 0x01ac42); // position of circle 2 is on the top right of the button 2
        var tick3 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        // if the player have click the button before we turn on the tick
        if (localStorage.getItem('scene7_16Btn3')) {
            console.log('btn3 clicked ' + localStorage.getItem('scene7_16Btn3'))
            circle3.setAlpha(1);
            tick3.copyPosition(circle3).setAlpha(1);
        } else {
            circle3.setAlpha(0);
            tick3.copyPosition(circle3).setAlpha(0);
        }


        // -- Event Listener for buttons
        button1.on('pointerdown', () => {
            tick1.setAlpha(1);
            circle1.setAlpha(1);
            localStorage.setItem('scene7_16Btn1', true); // using local storage to save click progress
            // wait for the circle to appear first then move to scene 7_16_A1
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.scene.start("Scene7_16_A1", { music: this.music })
                },
                loop: false
            })
        })

        button2.on('pointerdown', () => {
            localStorage.setItem('scene7_16Btn2', true); // using local storage to save click progress
            tick2.setAlpha(1);
            circle2.setAlpha(1);
            // wait for the circle to appear first then move to scene 7_16_A1
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.scene.start("Scene7_16_B1", { music: this.music })
                },
                loop: false
            })
        })

        button3.on('pointerdown', () => {
            localStorage.setItem('scene7_16Btn3', true); // using local storage to save click progress
            tick3.setAlpha(1);
            circle3.setAlpha(1);
            // wait for the circle to appear first then move to scene 7_16_A1
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.scene.start("Scene7_16_C1", { music: this.music })
                },
                loop: false
            })
        })


        // + - End of Buttons Section + - //

        // Next button.
        /** Next button will be lock if ALL three button wasn`t clicked 
         *  Use local storage to track the click progress
        */
        if (
            localStorage.getItem('scene7_16Btn1')
            && localStorage.getItem('scene7_16Btn2')
            && localStorage.getItem('scene7_16Btn3')
        ) {
            const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio, false);
            nextBtn.on('pointerdown', function () {
                this.scene.start("Scene7_17", { music: this.music });
            }, this);
        } else {
            const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio, true);
            nextBtn.on('pointerdown', function () {
                this.scene.start("Scene7_17", { music: this.music });
            }, this);
        }


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_15");
        }, this);
        // Save user progress.
        const save = new SaveProgress(this);

    }
}