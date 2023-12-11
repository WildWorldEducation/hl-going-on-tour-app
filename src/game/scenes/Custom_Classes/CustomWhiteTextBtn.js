/**
 * A customizable width and height button. Have style match with the project scene 4_26
 * @constructor
 * @param {scene} scene - The scene contain this button.
 * @param {float} x - X position of the button.
 * @param {float} y - y position of the button.
 * @param {float} width - width of the button.
 * @param {float} height - height of the button.
 * @param {string} text - text label in this button.
 * @param {integer} textSize - font size of the text label.
 * @param {float} textOffsetX - text x offset from origin can be negative number.
 * @param {float} textOffsetY - text y offset from origin can be negative number.
 * @param {number} radius = the round radius of button border
 * 
 */

export default class CustomWhiteTextButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, text, textSize, textOffsetX, textOffsetY, radius) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        if (!radius) {
            this.radius = 8
        } else {
            this.radius = radius
        }


        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0xffffff, 1)
            .fillRoundedRect(0, 0, width, height, this.radius)
            .lineStyle(4, 0x004aad, 1)
            .strokeRoundedRect(0, 0, width, height, this.radius)
        // Text.
        const btnText = this.scene.add.rexBBCodeText(0, 0, text, { fontFamily: "Arial", fontSize: `${textSize}px`, fontStyle: "bold", align: 'center', color: '#000000' })
            .setOrigin(textOffsetX, textOffsetY);
        btnText.scale = 0.5;
        // Add to container.
        this.add(btnGraphic);
        this.add(btnText);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });

        this.scene.add.existing(this);
    }
}
