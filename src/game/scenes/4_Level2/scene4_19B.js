/** 
 * THIS SCENE IS EXISTS IN PLAYBOOK
 * BUT IT NOT EXISTS IN THE PROJECT
 * SO I WILL ADD THIS AS A SUB-SCENE
 * FOR SCENE4_19
*/

import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_19B extends Phaser.Scene {
    constructor() {
        super('Scene4_19B');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Video.   
        this.load.video('question-man-vid', 'assets/Videos/4_Level2/question-man-vid.mp4');
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('bg-4_19', 'assets/Images/4_Level2/Scene4_19-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('speech-bubble-left', 'assets/Images/4_Level2/speech-bubble-left.png');
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

        /**
         * To replicate the effect in story book I have to use some Hacky solution
         * Basically We use a background picture that have a transparent circle And we will put it on the video 
         * And that will create a window that just show some part of the video
        */
        // Video.
        const vid = this.add.video(480, 180, 'question-man-vid');
        vid.setOrigin(0);
        vid.play();
        // BG.
        const bg = this.add.sprite(0, 0, 'bg-4_19');
        bg.setOrigin(0, 0);


        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 300, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Nicotine`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        this.textBubble = this.add.sprite(700, 300, 'speech-bubble-left').setOrigin(0.5).setScale(0.7)
        //Text.
        this.text = this.add.rexBBCodeText(700, 260,
            `So what exactly \nis nicotine?`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_20", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_19");
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this)
    }
}