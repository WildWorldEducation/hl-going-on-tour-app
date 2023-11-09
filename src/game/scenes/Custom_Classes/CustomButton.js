/**
 * A customizable width and height button. Have style match with the project
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
 * @param {audio} audio - sound when the button is clicked.
 */


export default class CustomButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, text, textSize, textOffsetX, textOffsetY, audio) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillRoundedRect(0, 0, width, height, 8)
            .lineStyle(7, 0xffffff, 1)
            .strokeRoundedRect(0, 0, width, height, 8)
        // Text.
        const btnText = this.scene.add.text(0, 0, text, { fontFamily: "Arial", fontSize: `${textSize}px`, fontStyle: "bold" })
            .setOrigin(textOffsetX, textOffsetY);
        btnText.scale = 0.5;
        // Add to container.
        this.add(btnGraphic);
        this.add(btnText);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillRoundedRect(0, 0, width, height, 8)
                .lineStyle(7, 0xffffff, 2)
                .strokeRoundedRect(0, 0, width, height, 8);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillRoundedRect(0, 0, width, height, 8)
                .lineStyle(7, 0xffffff, 2)
                .strokeRoundedRect(0, 0, width, height, 8);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        this.on('pointerdown', () => {
            audio.play()
        });

        this.scene.add.existing(this);
    }


}
