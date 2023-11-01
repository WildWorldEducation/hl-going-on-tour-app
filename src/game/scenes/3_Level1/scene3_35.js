import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_35 extends Phaser.Scene {
    constructor() {
        super('Scene3_35');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        // Video.
        this.load.image('bg3-30', 'assets/Images/3_Level1/letter-quiz/letter-bg.png');
        this.load.image('answer-bg', 'assets/Images/3_Level1/letter-quiz/answer1-bg.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        }

        // BG.        
        var bg = this.add.sprite(0, 0, 'bg3-30').setOrigin(0);

        // Title.
        this.titleBg = this.add.graphics();
        this.titleBg.fillStyle(0xFFFFFF, 1);
        this.titleBg.fillRoundedRect(-30, 0, 970, 150, 32);
        this.titleText = this.add.text(55, 75, "Finish the sentence by matching the rest of the fact.",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.titleBg, this.titleText]);

        // Dropzones --------------
        // Answer drop zones
        this.dropZone1 = this.add.graphics();
        this.dropZone1.lineStyle(4, 0x000000, 1);
        this.dropZone1.strokeRoundedRect(960 - 700, 300, 1400, 100, 16);
        this.dz1Text = this.add.text(280, 350, "Teens are 3-4 times mores likely to ",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.dz1Text.scale = 0.43
        const zone1 = this.add.zone(1190, 350, 700, 100)
            .setRectangleDropZone(700, 100);
        zone1.name = "answerZone1"

        this.dropZone2 = this.add.graphics();
        this.dropZone2.lineStyle(4, 0x000000, 1);
        this.dropZone2.strokeRoundedRect(960 - 700, 430, 1400, 100, 16);
        this.dz2Text = this.add.text(280, 480, "A single Juul pod is equal ",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.dz2Text.scale = 0.43
        const zone2 = this.add.zone(1070, 480, 700, 100)
            .setRectangleDropZone(700, 100);
        zone2.name = "answerZone2"

        this.dropZone3 = this.add.graphics();
        this.dropZone3.lineStyle(4, 0x000000, 1);
        this.dropZone3.strokeRoundedRect(960 - 700, 560, 1400, 100, 16);
        this.dz3Text = this.add.text(280, 610, "Vapes and e-cigarettes are ",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.dz3Text.scale = 0.43
        const zone3 = this.add.zone(1090, 610, 700, 100)
            .setRectangleDropZone(700, 100);
        zone3.name = "answerZone3"

        // Starting drop zones.        
        const zone4 = this.add.zone(960, 730, 700, 100).setRectangleDropZone(700, 100);
        zone4.name = "startingZone1"

        const zone5 = this.add.zone(960, 820, 700, 100).setRectangleDropZone(700, 100);
        zone5.name = "startingZone2"

        const zone6 = this.add.zone(960, 910, 700, 100).setRectangleDropZone(700, 100);
        zone6.name = "startingZone3"

        // Answers.
        var answerBg1 = this.add.sprite(0, 0, 'answer-bg').setScale(0.5)
        this.answer1Text = this.add.text(-390, 0, "just as addictive as tradional ones.",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0, 0.5);
        // Dealing with text quality.
        this.answer1Text.scale = 0.43
        var answer1Ctnr = this.add.container(960, 730, [answerBg1, this.answer1Text])
        // Make draggable.
        answer1Ctnr.setSize(answerBg1.width / 2, answerBg1.height).setInteractive();
        this.input.setDraggable(answer1Ctnr);
        answer1Ctnr.name = "answer1"

        var answerBg2 = this.add.sprite(0, 0, 'answer-bg').setOrigin(0.5).setScale(0.5)
        this.answer2Text = this.add.text(-390, 0, "smoke cigarettes if they use vaping products first.",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0, 0.5);
        // Dealing with text quality.
        this.answer2Text.scale = 0.43
        var answer2Ctnr = this.add.container(960, 820, [answerBg2, this.answer2Text])
        // Make draggable.
        answer2Ctnr.setSize(answerBg2.width / 2, answerBg2.height).setInteractive();
        this.input.setDraggable(answer2Ctnr);
        answer2Ctnr.name = "answer2"

        var answerBg3 = this.add.sprite(0, 0, 'answer-bg').setOrigin(0.5).setScale(0.5)
        this.answer3Text = this.add.text(-390, 0, "to a pack of cigarettes, which contains 40mg of nicotine.",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0, 0.5);
        // Dealing with text quality.
        this.answer3Text.scale = 0.43
        var answer3Ctnr = this.add.container(960, 910, [answerBg3, this.answer3Text])
        // Make draggable.
        answer3Ctnr.setSize(answerBg3.width / 2, answerBg3.height).setInteractive();
        this.input.setDraggable(answer3Ctnr);
        answer3Ctnr.name = "answer3"

        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
        }, this);

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('drop', (pointer, gameObject, zone) => {
            if (gameObject.name == "answer1" && zone.name == "answerZone3" ||
                gameObject.name == "answer2" && zone.name == "answerZone1" ||
                gameObject.name == "answer3" && zone.name == "answerZone2") {
                gameObject.x = zone.x;
                gameObject.y = zone.y;
            }
            else if (gameObject.name == "answer1" && zone.name == "startingZone1" ||
                gameObject.name == "answer2" && zone.name == "startingZone2" ||
                gameObject.name == "answer3" && zone.name == "startingZone3") {
                gameObject.x = zone.x;
                gameObject.y = zone.y;
            }
            else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        // Next button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_36", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_34");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}