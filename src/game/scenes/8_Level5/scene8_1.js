import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene8_1 extends Phaser.Scene {
    constructor() {
        super('Scene8_1');
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("wave-sound", ["assets/Audio/SFX/8_Level5/wave-sound.mp3"]);

        // // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-8-1', 'assets/Images/8_Level5/Backgrounds/background-1.jpg');
        // cars sprites
        this.load.image('red-car', 'assets/Images/8_Level5/Sprites/cars/red-car.png');
        this.load.image('black-car', 'assets/Images/8_Level5/Sprites/cars/black-car.png');
        this.load.image('white-van', 'assets/Images/8_Level5/Sprites/cars/white-van.png');
        this.load.image('blue-car', 'assets/Images/8_Level5/Sprites/cars/blue-car.png');
    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-8-1').setOrigin(0);

        // Music
        this.waveSound = this.sound.add("wave-sound", { loop: true });
        this.waveSound.play();

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // +- Cars Sprites -+ //
        const whiteVan = this.add.sprite(1156.24, 1184.5, 'white-van').setScale(0.7).setAlpha(0);
        const redCar = this.add.sprite(1358.92, 1405.68, 'red-car').setScale(0.7).setAlpha(0); // set alpha to 0 to savings some memory usage
        const blackCar = this.add.sprite(25.937, -310.740, 'black-car').setScale(0.7).setAlpha(0);
        const blueCar = this.add.sprite(25.937, -310.740, 'blue-car').setScale(0.7).setAlpha(1);

        // +- End of Cars sprite -+ //

        // // Animation for cars // //
        /**
         * Using some geometry formula to calculate the star and end point of the cars (It a straight line with 47degree angle)
         * x2 = x1 + (L * cos(degree))
         * y2 = y1 + (L * sin(degree))
         * 
         * With L is the distant you want to add or subtract
         */
        const calculateEndPoint = (x1, y1, angle, length) => {
            const x2 = x1 + (length * Math.cos(angle));
            const y2 = y1 + (length * Math.sin(angle));
            return {
                x2: x2,
                y2: y2
            }
        }
        // - + Animation for white van + - 
        const WhiteVanChain = this.tweens.chain({
            tweens: [
                {
                    // Turn on the alpha first
                    targets: [whiteVan],
                    alpha: 1,
                    repeat: 0,
                    duration: 0
                },
                {
                    targets: [whiteVan],
                    x: calculateEndPoint(1156.24, 1184.5, 0.80285, -2300).x2,
                    y: calculateEndPoint(1156.24, 1184.5, 0.80285, -2300).y2,
                    ease: "power2",
                    repeat: 0,
                    duration: 7500
                },
                {
                    // Turn off the alpha after the car fully travel the road
                    targets: [whiteVan],
                    alpha: 0,
                    repeat: 0,
                    duration: 0
                },

            ],

        });
        // - + End of Animation for white van + -

        // - - Animation for red car - - 
        const redCarChain = this.tweens.chain({
            tweens: [
                {
                    // Turn on the alpha first
                    targets: [redCar],
                    alpha: 1,
                    repeat: 0,
                    duration: 0
                },
                {
                    targets: [redCar],
                    x: calculateEndPoint(1358.92, 1405.68, 0.80285, -2300).x2,
                    y: calculateEndPoint(1358.92, 1405.68, 0.80285, -2300).y2,
                    ease: "power2",
                    repeat: 0,
                    duration: 7500,
                    delay: 2000
                },
                {
                    // Turn off the alpha after the car fully travel the road
                    targets: [redCar],
                    alpha: 0,
                    repeat: 0,
                    duration: 0
                },
            ]
        });
        // - - End of Animation for red car - -

        // >- Animation for black car -<
        const blackCarChain = this.tweens.chain({
            tweens: [
                {
                    // Turn on the alpha first
                    targets: [blackCar],
                    alpha: 1,
                    repeat: 0,
                    duration: 0
                },
                {
                    targets: [blackCar],
                    x: calculateEndPoint(25.937, -310.740, 0.80285, 2300).x2,
                    y: calculateEndPoint(25.937, -310.740, 0.80285, 2300).y2,
                    ease: "power2",
                    repeat: 0,
                    duration: 7800,
                    delay: 1000
                },
                {
                    // Turn off the alpha after the car fully travel the road
                    targets: [blackCar],
                    alpha: 0,
                    repeat: 0,
                    duration: 0
                },
            ]
        });
        // >- End of Animation for black car -<

        // =- Animation for blue car -=
        const blueCarChain = this.tweens.chain({
            tweens: [
                {
                    // Turn on the alpha first
                    targets: [blueCar],
                    alpha: 1,
                    repeat: 0,
                    duration: 0
                },
                {
                    targets: [blueCar],
                    x: calculateEndPoint(25.937, -310.740, 0.80285, 2300).x2,
                    y: calculateEndPoint(25.937, -310.740, 0.80285, 2300).y2,
                    ease: "power2",
                    repeat: 0,
                    duration: 7800,
                    delay: 4000
                },
                {
                    // Turn off the alpha after the car fully travel the road
                    targets: [blueCar],
                    alpha: 0,
                    repeat: 0,
                    duration: 0
                },
            ]
        });
        // - - End of Animation for blue car - -

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 330, 150, 32);
        this.tileText = this.add.text(75, 75, "California",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(1030, 300, 'text-bg').setOrigin(0.2, -0.2).setScale(1.15, 1.05);
        this.instructionText = this.add.rexBBCodeText(this.instructionTextBg.x, this.instructionTextBg.y,
            "California is a large state, and a place that has \nbeaches, mountains, enormous redwood\n trees, forest and even deserts. \n\nCalifornia is also home to an expansive coast \non the Pacific Ocean, home to the most sports \nteams in the country, and a huge music and \nentertainment scene. ",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(0.15, -0.65);
        // Dealing with text quality.
        this.instructionText.scale = 0.5




        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.waveSound.stop();
            this.scene.start("Scene8_2", { music: this.music });
        }, this);


        // Save user progress.
        const save = new SaveProgress(this);

        // Unlock module.
        const unlock = new UnlockModule(8);
    }
}