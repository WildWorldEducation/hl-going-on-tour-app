/**
 * A customizable width and height bubble text. Have style match with the project
 * @constructor
 * @param {scene} scene - The scene contain this button.
 * @param {float} x - X position of the bubble.
 * @param {float} y - y position of the bubble.
 * @param {float} width - width of the bubble.
 * @param {float} height - height of the bubble.
 * @param {string} text - text inside the bubble.
 * @param {integer} textSize - font size of the text label.
 * @param {float} textOffsetX - text x offset from origin can be negative number.
 * @param {float} textOffsetY - text y offset from origin can be negative number.
 * @param {string} trianglePos - Three Position that the triangle pointer can have are ['top-left', 'middle-left', 'bottom-left'] .
 *
 * 
 */

export default class CustomBubbleText extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, radius, text, textSize, textOffsetX, textOffsetY, trianglePos) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;


        // Graphic.
        const bubble = this.scene.add.graphics();
        bubble.fillStyle(0xffffff, 1);
        bubble.fillRoundedRect(0, 0, width, height, radius);

        // Text inside the Bubble
        const bubbleText = this.scene.add.text(0, 0, text, { fontFamily: "Arial", fontSize: `${textSize}px`, fontStyle: "", align: "center", color: '#000000' })
            .setOrigin(textOffsetX, textOffsetY);
        bubbleText.scale = 0.5;

        // Triangle Pointer
        /**
         * Using switch case for custom triangle position
         * 
             * Using the bubble height we can calculate three point of the triangle
             * pointer by some basic geometry math. (we need a Right Triangle)
        
        */
        switch (trianglePos) {
            case "top-left":
                var triangle = Phaser.Geom.Triangle.BuildRight(-25, 63, 60, 60);
                triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
                bubble.fillTriangleShape(triangle);
                break;
            case "middle-left":
                var triangle = Phaser.Geom.Triangle.BuildRight(-25, height / 2, 60, 60);
                triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
                bubble.fillTriangleShape(triangle);
                break;
            case "bottom-left":
                var triangle = Phaser.Geom.Triangle.BuildRight(-25, height - 36, 60, 60);
                triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
                bubble.fillTriangleShape(triangle);
                break;
            default:
                bubble.fillTriangle(3, 10, 3, 88, - 38, 39);
                break;
        }




        // Add to container.
        this.add(bubble);
        this.add(bubbleText);


        this.scene.add.existing(this);
    }
}