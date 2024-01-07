import BackButton from '../Custom_Classes/BackButton.js';
import SideButton from '../Custom_Classes/SideButton.js';
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_4 extends Phaser.Scene {
    constructor() {
        super('Scene7_4');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('person', '/assets/Images/7_Level4/sprite/senses/person-eat-apple.png');
        this.load.image('sight', '/assets/Images/7_Level4/sprite/senses/sightSprite/sight.png');
        this.load.image('sight-connect-line', '/assets/Images/7_Level4/sprite/senses/sightSprite/sightLine.png');
        this.load.image('hearing', '/assets/Images/7_Level4/sprite/senses/hearingSprite/hearing.png');
        this.load.image('hearing-connect-line', '/assets/Images/7_Level4/sprite/senses/hearingSprite/hearingLine.png');
        this.load.image('taste', '/assets/Images/7_Level4/sprite/senses/tasteSprite/taste.png');
        this.load.image('taste-connect-line', '/assets/Images/7_Level4/sprite/senses/tasteSprite/taste-connect-line.png');
        this.load.image('smell', '/assets/Images/7_Level4/sprite/senses/smellSprite/smell.png');
        this.load.image('smell-connect-line', '/assets/Images/7_Level4/sprite/senses/smellSprite/smell-connect-line.png');
        this.load.image('touch', '/assets/Images/7_Level4/sprite/senses/touchSprite/touch.png');
        this.load.image('touch-connect-line', '/assets/Images/7_Level4/sprite/senses/touchSprite/touch-connect-line.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('las-vegas-song');
            this.music.play();
            this.music.setVolume(0.4);
            this.music.loop = true
        }

        // BG.
        this.cameras.main.setBackgroundColor("#f9f2e8"); // use a single color for background
        // Sight sense container
        /*
        *  Copy the position of sight for easy position manual change  around
        *  Add all sprite above to a container for easy move those component around
        *
        */

        // the connect line
        this.sightConnectLine = this.add.sprite(0, 0, 'sight-connect-line').setOrigin(-0.25, -1.088).setScale(0.5);
        // sight sprite
        this.sight = this.add.sprite(420, 180, 'sight').setOrigin(0).setScale(0.5);

        this.sightConnectLine.copyPosition(this.sight);
        // tile text
        this.sightText = this.add.text(55, 75, "Sight",
            { fontFamily: "Arial", fontSize: "42px", color: '#000000' }).setOrigin(-1.18, -5.45);
        this.sightText.copyPosition(this.sight);

        // container
        this.SightCtnr = this.add.container(0, 100, [this.sight, this.sightConnectLine, this.sightText]);



        // Hearing sense container
        /*
        *  Copy the position of sight for easy position manual change  around
        *  Add all sprite above to a container for easy move those component around
        *
        */

        // the hearing line
        this.hearingConnectLine = this.add.sprite(0, 0, 'hearing-connect-line').setOrigin(-0.18, -1.48).setScale(0.5);

        // the hearing sprite
        this.hearing = this.add.sprite(175, 380, 'hearing').setOrigin(0).setScale(0.5);
        this.hearingConnectLine.copyPosition(this.hearing);
        // tile text
        this.hearingText = this.add.text(55, 75, "Hearing",
            { fontFamily: "Arial", fontSize: "42px", color: '#000000' }).setOrigin(-1.18, -5);
        this.hearingText.copyPosition(this.hearing);

        // container
        this.hearingCtnr = this.add.container(0, 100, [this.hearing, this.hearingConnectLine, this.hearingText]);


        // Taste sense container
        /*
        *  Copy the position of sight for easy position manual change  around
        *  Add all sprite above to a container for easy move those component around
        *
        */

        // the taste connect line
        this.tasteConnectLine = this.add.sprite(0, 0, 'taste-connect-line').setOrigin(-0.51, 0.37).setScale(0.5);

        // the taste sprite
        this.taste = this.add.sprite(375, 699, 'taste').setOrigin(0).setScale(0.5);
        this.tasteConnectLine.copyPosition(this.taste);
        // tile text
        this.tasteText = this.add.text(55, 75, "Taste",
            { fontFamily: "Arial", fontSize: "42px", color: '#000000' }).setOrigin(-2.35, -1.45);
        this.tasteText.copyPosition(this.taste);

        // container
        this.tasteCtnr = this.add.container(-13, 100, [this.taste, this.tasteConnectLine, this.tasteText]);

        // Smell sense container
        /*
        *  Copy the position of sight for easy position manual change  around
        *  Add all sprite above to a container for easy move those component around
        *
        */

        // the smell connect line
        this.smellConnectLine = this.add.sprite(0, 0, 'smell-connect-line').setOrigin(1, -0.85).setScale(0.5);

        // the smell sprite
        this.smell = this.add.sprite(1375, 250, 'smell').setOrigin(0).setScale(0.5);
        this.smellConnectLine.copyPosition(this.smell);
        // tile text
        this.smellText = this.add.text(55, 75, "Smell",
            { fontFamily: "Arial", fontSize: "42px", color: '#000000' }).setOrigin(1.3, -1.45);
        this.smellText.copyPosition(this.smell);
        // container
        this.smellCtnr = this.add.container(93, 238, [this.smell, this.smellConnectLine, this.smellText]);


        // touch sense container
        /*
        *  Copy the position of sight for easy position manual change  around
        *  Add all sprite above to a container for easy move those component around
        *
        */

        // the touch connect line
        this.touchConnectLine = this.add.sprite(0, 0, 'touch-connect-line').setOrigin(1, 0.25).setScale(0.5);

        // the smell sprite
        this.touch = this.add.sprite(1375, 550, 'touch').setOrigin(0).setScale(0.5);
        this.touchConnectLine.copyPosition(this.touch);
        // tile text
        this.touchText = this.add.text(55, 75, "Touch",
            { fontFamily: "Arial", fontSize: "42px", color: '#000000' }).setOrigin(1.3, -1);
        this.touchText.copyPosition(this.touch);
        // container
        this.touchCtnr = this.add.container(3, 258, [this.touch, this.touchConnectLine, this.touchText]);

        // // End of Senses Containers // //

        /** Put the scenes container above other sprites to make it render first and get hide by the veiled bg */
        /**
         * So I have a VERY HACKY solution for how to animate the senses container. We will put a single color bg in front of
         * The senses container and we will animate the bg ScaleX value to make the rolling effect
         */
        const veiledBg = this.add.sprite(960, 540, 'veiled-bg');
        veiledBg.setOrigin(0.5);
        this.tweens.chain({
            tweens: [
                {
                    targets: veiledBg,
                    scaleX: 0,
                    duration: 1300,
                    delay: 400,
                },
                {
                    targets: veiledBg,
                    alpha: 0,
                }
            ]
        })

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 290, 150, 32);
        this.tileText = this.add.text(75, 75, "Senses",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);


        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(1000, -500, 'text-bg').setOrigin(0.2, -0.2).setScale(1.8, 1.38);
        this.instructionText = this.add.rexBBCodeText(878, 53,
            "You are most likely familiar with the [b]main 5 senses -[/b] \nHearing, Seeing, Taste, Touch and Smell. \nThey are extremly beneficial for our daily lives and \nalso just like the brain or the body, \n they too can get [b]can get tired or overloaded.[/b]",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0).setScale(1.3, 1);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;


        // Person Sprite
        this.person = this.add.sprite(770, 500, 'person').setOrigin(0).setScale(0.8);


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_5", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_3", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}