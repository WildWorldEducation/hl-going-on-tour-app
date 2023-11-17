import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CloseButton from '../Custom_Classes/CloseButton.js';

export default class Scene7_13 extends Phaser.Scene {
    constructor() {
        super('Scene7_13');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // Module music.

        // Video.
        this.load.video('vid7_13-tip1', 'assets/Videos/7_Level4/Scene7_13-tip-1-vid.mp4');
        this.load.video('vid7_13-tip3', 'assets/Videos/7_Level4/Scene7_13-tip-3-vid.mp4');


        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("suction-cup-pull", ["assets/Audio/SFX/7_Level4/suction-cup-pull.mp3"]);


        // Sprites.
        this.load.image('bg-7-13', 'assets/Images/7_Level4/Backgrounds/background-7-blur.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        // - circle tip 1 sprites -
        this.load.image('tip1-light-off', 'assets/Images/7_Level4/sprite/tip-circles/tip1-light-off.png');
        this.load.image('tip1-light-on', 'assets/Images/7_Level4/sprite/tip-circles/tip1-light-on.png');
        // - circle tip 2 sprites -
        this.load.image('tip2-light-off', 'assets/Images/7_Level4/sprite/tip-circles/tip2-light-off.png');
        this.load.image('tip2-light-on', 'assets/Images/7_Level4/sprite/tip-circles/tip2-light-on.png');
        this.load.image('normal-person', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/normal-person.png');
        this.load.image('sad-emoji', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/sad.png');
        this.load.image('happy-emoji', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/happy.png');
        this.load.image('love-emoji', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/love.png');
        this.load.image('bored-emoji', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/bored.png');
        this.load.image('angry-emoji', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/angry.png');
        this.load.image('cry-emoji', 'assets/Images/7_Level4/sprite/tip-circles/tip2-popup/cry.png');
        // - circle tip 3 sprites -
        this.load.image('tip3-light-off', 'assets/Images/7_Level4/sprite/tip-circles/tip3-light-off.png');
        this.load.image('tip3-light-on', 'assets/Images/7_Level4/sprite/tip-circles/tip3-light-on.png');
    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-13').setOrigin(0);

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 720, 150, 32);
        this.tileText = this.add.text(75, 75, "So...What Else Affects Dopamine?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);


        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        this.circleClick = this.sound.add("suction-cup-pull", { loop: false });

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(1140, 50, 'text-bg').setOrigin(0, 0).setScale(0.87, 0.5);
        this.instructionText = this.add.rexBBCodeText(0, 0,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "Click on the images below to \nexplore more on how can we \nnaturally lower and regulate \nour dopamine levels.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(-0.2, -0.3);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;
        this.instructionText.copyPosition(this.instructionTextBg);


        // ** Circles Tip ** //


        // // Circle 1 tip // //
        const cir1 = this.add.circle(450, 625, 160, 0xffffffff);
        cir1.setStrokeStyle(2.3, 0x000000);
        cir1.setInteractive({
            useHandCursor: true,
        });
        // light off tip1 image
        const cir1LightOff = this.add.sprite(cir1.x, cir1.y, 'tip1-light-off').setOrigin(0.5).setScale(0.68);
        // light on tip1 image
        const cir1LightOn = this.add.sprite(cir1.x, cir1.y, 'tip1-light-on').setOrigin(0.5).setScale(0.68);
        cir1LightOn.setAlpha(0);

        // tip 1 popup window container //
        // popup rectangle background
        this.popup1Graphics = this.add.graphics();
        this.popup1Graphics.fillStyle(0xffffff, 1);
        this.popup1Graphics.fillRoundedRect(132, 340, 1650, 620, 42);
        this.popup1Graphics.lineStyle(4, 0x004aad, 1);
        this.popup1Graphics.strokeRoundedRect(132, 340, 1650, 620, 42);

        // popup 1 close button
        const popup1closeBtn = new CloseButton(this, 1700, 400, 'x-mark', this.nextBtnAudio);
        popup1closeBtn.setScale(0.7);

        // tip 1 Video
        this.tip1vid = this.add.video(650, 640, 'vid7_13-tip1');
        this.tip1vid.setScale(0.85);
        this.tip1vid.play();

        // Tip 1 text
        this.tip1Text = this.add.rexBBCodeText(0, 0,
            "First, understand that \naddictive qualities apply to \nalmost everyone, and thus \nwe should begin by gaining \na self-awareness of our \nown out-of-balance \ntendencies.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(1.15, -0.5);
        // Dealing with text quality.
        this.tip1Text.scale = 0.5;
        this.tip1Text.copyPosition(popup1closeBtn);



        // - + End of Circle 1 container + -

        // // Circle 2 tip // //
        const cir2 = this.add.circle(950, 625, 160, 0xffffffff);
        cir2.setStrokeStyle(2.3, 0x000000);
        cir2.setInteractive({
            useHandCursor: true,
        });
        // light off tip2 image
        const cir2LightOff = this.add.sprite(cir2.x, cir2.y, 'tip2-light-off').setOrigin(0.5).setScale(0.68);
        // light on tip2 image
        const cir2LightOn = this.add.sprite(cir2.x, cir2.y, 'tip2-light-on').setOrigin(0.5).setScale(0.68);
        cir2LightOn.setAlpha(0);

        // tip 2 popup window container //
        // popup rectangle background
        this.popup2Graphics = this.add.graphics();
        this.popup2Graphics.fillStyle(0xffffff, 1);
        this.popup2Graphics.fillRoundedRect(132, 340, 1650, 620, 42);
        this.popup2Graphics.lineStyle(4, 0x004aad, 1);
        this.popup2Graphics.strokeRoundedRect(132, 340, 1650, 620, 42);

        // popup 2 close button
        const popup2closeBtn = new CloseButton(this, 1700, 400, 'x-mark', this.nextBtnAudio);
        popup2closeBtn.setScale(0.7);

        // tip 2 sprites on the left
        this.tip2normalPerson = this.add.sprite(550, 710, 'normal-person');
        this.tip2normalPerson.setScale(0.6);
        // - emojis -
        this.sadEmo = this.add.sprite(0, 0, 'sad-emoji').setOrigin(3, -0.8).setScale(0.2);
        this.sadEmo.copyPosition(this.tip2normalPerson);

        this.happyEmo = this.add.sprite(0, 0, 'happy-emoji').setOrigin(3.2, 1).setScale(0.2);
        this.happyEmo.copyPosition(this.tip2normalPerson);

        this.loveEmo = this.add.sprite(0, 0, 'love-emoji').setOrigin(2.5, 2.5).setScale(0.24);
        this.loveEmo.copyPosition(this.tip2normalPerson);

        this.boredEmo = this.add.sprite(0, 0, 'bored-emoji').setOrigin(-1.6, 2.7).setScale(0.1);
        this.boredEmo.copyPosition(this.tip2normalPerson);

        this.angryEmo = this.add.sprite(0, 0, 'angry-emoji').setOrigin(-2.2, 1.1).setScale(0.22);
        this.angryEmo.copyPosition(this.tip2normalPerson);

        this.cryEmo = this.add.sprite(0, 0, 'cry-emoji').setOrigin(-2.1, -0.5).setScale(0.22);
        this.cryEmo.copyPosition(this.tip2normalPerson);

        // Tip 2 text
        this.tip2Text = this.add.rexBBCodeText(0, 0,
            "Practicing mindfulness can help \nus face our feelings of \ndiscomfort and pain rather than \nturning to distractions. \nWith more intentional and \nmindful living, we can then \nbegin to implement impulsivity \ncontrol in all areas of our life. ",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left' }).setOrigin(1.15, -0.3);
        // Dealing with text quality.
        this.tip2Text.scale = 0.5;
        this.tip2Text.copyPosition(popup2closeBtn);

        // - + End of circle tip 2 + - 

        // // Circle 3 tip // //
        const cir3 = this.add.circle(1450, 625, 160, 0xffffffff);
        cir3.setStrokeStyle(2.3, 0x000000);
        cir3.setInteractive({
            useHandCursor: true,
        });
        // light off tip3 image
        const cir3LightOff = this.add.sprite(cir3.x, cir3.y, 'tip3-light-off').setOrigin(0.5).setScale(0.68);
        // light on tip1 image
        const cir3LightOn = this.add.sprite(cir3.x, cir3.y, 'tip3-light-on').setOrigin(0.5).setScale(0.68);
        cir3LightOn.setAlpha(0);

        // tip 3 popup window container //
        // popup rectangle background
        this.popup3Graphics = this.add.graphics();
        this.popup3Graphics.fillStyle(0xffffff, 1);
        this.popup3Graphics.fillRoundedRect(132, 340, 1650, 620, 42);
        this.popup3Graphics.lineStyle(4, 0x004aad, 1);
        this.popup3Graphics.strokeRoundedRect(132, 340, 1650, 620, 42);

        // popup 3 close button
        const popup3closeBtn = new CloseButton(this, 1700, 400, 'x-mark', this.nextBtnAudio);
        popup1closeBtn.setScale(0.7);

        // tip 3 Video
        this.tip3vid = this.add.video(650, 640, 'vid7_13-tip3');
        this.tip3vid.setScale(0.85);
        this.tip3vid.play();

        // frame border for tip 3 video
        const video3Frame = this.add.rectangle(this.tip3vid.x, this.tip3vid.y, 823, 456);

        video3Frame.setStrokeStyle(6, 0x000000);

        // Tip 3 text
        this.tip3Text = this.add.rexBBCodeText(0, 0,
            "Regularly take time \naway from technology, \nor other addictive \nactivities, whether they \nare scheduled or \nunscheduled.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(1.15, -0.5);
        // Dealing with text quality.
        this.tip3Text.scale = 0.5;
        this.tip3Text.copyPosition(popup1closeBtn);

        // - + End of circle tip 3 + - 


        /* Create container at the bottom so the popup will always stack on top of circle 
        *  
        */

        // popup 1 container
        this.popup1Container = this.add.container(0, 0, [this.popup1Graphics, this.tip1vid, popup1closeBtn, this.tip1Text]);
        this.popup1Container.setAlpha(0);
        // // tip 1 circle event listener // //
        cir1.on('pointerdown', () => {
            cir1LightOff.setAlpha(0);
            cir1LightOn.setAlpha(1);
            this.circleClick.play();
            this.tip1vid.play();
            this.popup1Container.setAlpha(1);
            // disable all circle interaction to avoid miss click when a popup is open
            cir1.disableInteractive();
            cir2.disableInteractive();
        })

        popup1closeBtn.on('pointerdown', () => {
            // when close the popup all tip circles will become interactive again
            cir1.setInteractive();
            cir2.setInteractive();
            this.popup1Container.setAlpha(0);
        })

        // popup 2 container
        this.popup2Container = this.add.container(0, 0, [this.popup2Graphics, this.tip2normalPerson, this.sadEmo, this.happyEmo, this.loveEmo, this.boredEmo, this.angryEmo, this.cryEmo, popup2closeBtn, this.tip2Text]);
        this.popup2Container.setAlpha(0);
        // // tip 2 circle event listener // //
        cir2.on('pointerdown', () => {
            cir2LightOff.setAlpha(0);
            cir2LightOn.setAlpha(1);
            this.circleClick.play();
            this.popup2Container.setAlpha(1);
            // disable all circle interaction to avoid miss click when a popup is open
            cir1.disableInteractive();
            cir2.disableInteractive();

        })
        popup2closeBtn.on('pointerdown', () => {
            // when close the popup all tip circles will become interactive again
            cir1.setInteractive();
            cir2.setInteractive();
            this.popup2Container.setAlpha(0);
        })


        // popup 3 container
        this.popup3Container = this.add.container(0, 0, [this.popup3Graphics, this.tip3vid, video3Frame, popup3closeBtn, this.tip3Text]);
        this.popup3Container.setAlpha(0);
        // // tip 1 circle event listener // //
        cir3.on('pointerdown', () => {
            cir3LightOff.setAlpha(0);
            cir3LightOn.setAlpha(1);
            this.circleClick.play();
            this.tip3vid.play();
            this.popup3Container.setAlpha(1);
            // disable all circle interaction to avoid miss click when a popup is open
            cir1.disableInteractive();
            cir2.disableInteractive();
            cir3.disableInteractive();
        })

        popup3closeBtn.on('pointerdown', () => {
            // when close the popup all tip circles will become interactive again
            cir1.setInteractive();
            cir2.setInteractive();
            cir3.setInteractive();
            this.popup3Container.setAlpha(0);
        })

        // // End of circles tip section // //

        // Next button.

        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_14", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_12");
        }, this);



        // Save user progress.
        const save = new SaveProgress(this);
    }
}