import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_21 extends Phaser.Scene {
    constructor() {
        super('Scene4_21');
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

        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-21', 'assets/Images/General/text-card.png');
        this.load.image('smoking-tools', 'assets/Images/4_Level2/smoking-ways.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        var clicks = 1

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 620, 150, 32);
        this.titleText = this.add.text(55, 75,
            `So What's In a Vape or E-cig?`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        const textCard = this.add.sprite(1320, 230, 'textBG4-21').setOrigin(0.5).setAlpha(0.9).setScale(1.2, 1.3)
        //Text.
        this.text = this.add.rexBBCodeText(textCard.x, textCard.y,
            `Vape pens and e-cigs [b]contain chemicals
and metals[/b]. These are just a few of
thousands of [b]harmful and deadly
chemicals[/b] found in vapes and e-cigs:`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text;
        // text instruction container
        const instructionCtnr = this.add.container(0, 0, [textCard, this.text])

        // smoking tools sprite
        const smokingTools = this.add.sprite(1400, 460, 'smoking-tools').setScale(0.7);

        // --  lines in this scene -- //
        /** Because in the story book the line seem a little thick so We will draw
         *  a thin rectangle to achieve the look
        */
        // shared width
        const lineWidth = 3.5;

        // line 1 
        const line1 = this.add.graphics();
        line1.fillStyle(0xffffff, 1);
        line1.fillRect(-190, 930, 190, lineWidth);
        line1.setAngle(-28);
        // line 2
        const line2 = this.add.graphics().fillStyle(0xffffff, 1);
        line2.fillRect(530, 30, 270, lineWidth);
        line2.setAngle(45);
        // line 3
        const line3 = this.add.graphics().fillStyle(0xffffff, 1);
        line3.fillRect(610, 980, 140, lineWidth);
        line3.setAngle(-24);
        // line 4
        const line4 = this.add.graphics().fillStyle(0xffffff, 1);
        line4.fillRect(1255, 0, 200, lineWidth);
        line4.setAngle(40);

        // -- End of lines in this scene -- //

        // += Text in this scene =+ //
        // text 1
        const text1 = this.add.rexBBCodeText(70, 930,
            "Heavy metals such as \n[b]nickel, tin, lead[/b]",
            { fontFamily: "Arial", fontSize: "64px", color: '#000000', align: 'center' }).setOrigin(0);
        // Dealing with text quality.
        text1.setScale(0.5);

        // text 2
        const text2 = this.add.rexBBCodeText(70, 300,
            "[b]Diethylene glycol [y=-28]_[/y][/b] a toxic chemical used \nin antifreeze that is linked to lung disease",
            { fontFamily: "Arial", fontSize: "64px", color: '#000000', align: 'center' }).setOrigin(0);
        // Dealing with text quality.
        text2.setScale(0.5);

        // text 3
        const text3 = this.add.rexBBCodeText(1085, 530,
            "[b]Cadmium [y=-28]_[/y][/b] a toxic metal found \nin traditional cigarettes that \ncauses breathing problems and \ndisease",
            { fontFamily: "Arial", fontSize: "64px", color: '#000000', align: 'center' }).setOrigin(0);
        // Dealing with text quality.
        text3.setScale(0.5);

        // text 3
        const text4 = this.add.rexBBCodeText(1140, 900,
            "[b]Formaldehyde - [/b] toxic chemicals which \ncan be used in cleaning products, glue, \nand mortuaries!",
            { fontFamily: "Arial", fontSize: "64px", color: '#000000', align: 'center' }).setOrigin(0);
        // Dealing with text quality.
        text4.setScale(0.5);

        /** For Each line and text we add a container for the animate purpose */
        const line1Text1 = this.add.container(0, 0, [text1, line1]).setAlpha(0);
        const line2Text2 = this.add.container(0, 0, [text2, line2]).setAlpha(0);
        const line3Text3 = this.add.container(0, 0, [text3, line3]).setAlpha(0);
        const line4Text4 = this.add.container(0, 0, [text4, line4]).setAlpha(0);

        // // _=_ Animation Section _=_ // //
        // first we have to turn all elements in this scene transparent
        instructionCtnr.setAlpha(0);
        this.tweens.chain({
            tweens: [
                {
                    targets: smokingTools,
                    x: 688,
                    y: 740,
                    duration: 1000,
                    delay: 100,
                },
                {
                    targets: instructionCtnr,
                    alpha: 1,
                    duration: 100,
                },
                {
                    targets: line3Text3,
                    alpha: 1,
                    duration: 700,
                    delay: 100
                },
                {
                    targets: line4Text4,
                    alpha: 1,
                    duration: 700,
                    delay: 100
                },
                {
                    targets: line1Text1,
                    alpha: 1,
                    duration: 700,
                    delay: 100
                },
                {
                    targets: line2Text2,
                    alpha: 1,
                    duration: 700,
                    delay: 100
                },
            ]
        })

        // // _=_ End Of Tween Animation _=_ // //

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_22", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_20");
        }, this);
        backBtn.y = backBtn.y - 40;



        // Save user progress.
        const save = new SaveProgress(this)
    }
}