import { Game, AUTO, Scale, Scene } from "phaser";

// Welcome
import Scene1_1 from './scenes/1_Welcome/scene1_1.js'

import Scene1_2 from './scenes/1_Welcome/scene1_2.js'
import Scene1_3 from './scenes/1_Welcome/scene1_3.js'
import Scene1_4 from './scenes/1_Welcome/scene1_4.js'
import Scene1_5 from './scenes/1_Welcome/scene1_5.js'
// Prelude
import Scene2_1 from './scenes/2_Prelude/scene2_1.js'
import Scene2_2 from './scenes/2_Prelude/scene2_2.js'
import Scene2_3 from './scenes/2_Prelude/scene2_3.js'
import Scene2_4 from './scenes/2_Prelude/scene2_4.js'
import Scene2_5 from './scenes/2_Prelude/scene2_5.js'
import Scene2_6 from './scenes/2_Prelude/scene2_6.js'
// Level 1: Going On Tour
import Scene3_1 from './scenes/3_Level1/scene3_1.js'
import Scene3_2 from './scenes/3_Level1/scene3_2.js'
import Scene3_3 from './scenes/3_Level1/scene3_3.js'
import Scene3_4 from './scenes/3_Level1/scene3_4.js'
import Scene3_5 from './scenes/3_Level1/scene3_5.js'
import Scene3_6 from './scenes/3_Level1/scene3_6.js'
import Scene3_7 from './scenes/3_Level1/scene3_7.js'
import Scene3_8 from './scenes/3_Level1/scene3_8.js'
import Scene3_9 from './scenes/3_Level1/scene3_9.js'
import Scene3_10 from './scenes/3_Level1/scene3_10.js'
import Scene3_11 from './scenes/3_Level1/scene3_11.js'
import Scene3_12 from './scenes/3_Level1/scene3_12.js'
import Scene3_12_incorrect from './scenes/3_Level1/scene3_12_incorrect.js'
import Scene3_12_correct from './scenes/3_Level1/scene3_12_correct.js'
import Scene3_13 from './scenes/3_Level1/scene3_13.js'
import Scene3_13_incorrect from './scenes/3_Level1/scene3_13_incorrect.js'
import Scene3_13_correct from './scenes/3_Level1/scene3_13_correct.js'
import Scene3_14 from './scenes/3_Level1/scene3_14.js'
import Scene3_14_incorrect from './scenes/3_Level1/scene3_14_incorrect.js'
import Scene3_14_correct from './scenes/3_Level1/scene3_14_correct.js'
import Scene3_15 from './scenes/3_Level1/scene3_15.js'
import Scene3_15_incorrect from './scenes/3_Level1/scene3_15_incorrect.js'
import Scene3_15_correct from './scenes/3_Level1/scene3_15_correct.js'
import Scene3_16 from './scenes/3_Level1/scene3_16.js'
import Scene3_16_incorrect from './scenes/3_Level1/scene3_16_incorrect.js'
import Scene3_16_correct from './scenes/3_Level1/scene3_16_correct.js'

import Scene3_17 from './scenes/3_Level1/scene3_17.js'
import Scene3_18 from './scenes/3_Level1/scene3_18.js'
import Scene3_19 from './scenes/3_Level1/scene3_19.js'
import Scene3_20 from './scenes/3_Level1/scene3_20.js'
import Scene3_21 from './scenes/3_Level1/scene3_21.js'
import Scene3_22 from './scenes/3_Level1/scene3_22.js'
import Scene3_22B from './scenes/3_Level1/scene3_22B.js'
import Scene3_23 from './scenes/3_Level1/scene3_23.js'
import Scene3_24 from './scenes/3_Level1/scene3_24.js'
import Scene3_24B from './scenes/3_Level1/scene3_24B.js'
import Scene3_25 from './scenes/3_Level1/scene3_25.js'
import Scene3_26 from './scenes/3_Level1/scene3_26.js'
import Scene3_27 from './scenes/3_Level1/scene3_27.js'
import Scene3_28 from './scenes/3_Level1/scene3_28.js'
import Scene3_29 from './scenes/3_Level1/scene3_29.js'
import Scene3_30 from './scenes/3_Level1/scene3_30.js'
import Scene3_31 from './scenes/3_Level1/scene3_31.js'
import Scene3_32 from './scenes/3_Level1/scene3_32.js'
import Scene3_33 from './scenes/3_Level1/scene3_33.js'
import Scene3_34 from './scenes/3_Level1/scene3_34.js'
import Scene3_35 from './scenes/3_Level1/scene3_35.js'
import Scene3_36 from './scenes/3_Level1/scene3_36.js'
import Scene3_36_correct from './scenes/3_Level1/scene3_36_correct.js'
import Scene3_36_incorrect from './scenes/3_Level1/scene3_36_incorrect.js'
import Scene3_37 from './scenes/3_Level1/scene3_37.js'
import Scene3_38 from './scenes/3_Level1/scene3_38.js'
import Scene3_39 from './scenes/3_Level1/scene3_39.js'
import Scene3_40 from './scenes/3_Level1/scene3_40.js'
import Scene3_41 from './scenes/3_Level1/scene3_41.js'
import Scene3_42 from './scenes/3_Level1/scene3_42.js'
import Scene3_43 from './scenes/3_Level1/scene3_43.js'
import Scene3_44 from './scenes/3_Level1/scene3_44.js'
import Scene3_45 from './scenes/3_Level1/scene3_45.js'
// Level 2: New York City
import Scene4_1 from './scenes/4_Level2/scene4_1.js'
import Scene4_2 from './scenes/4_Level2/scene4_2.js'
import Scene4_3 from './scenes/4_Level2/scene4_3.js'
import Scene4_4 from './scenes/4_Level2/scene4_4.js'
import Scene4_4A from './scenes/4_Level2/scene4_4A.js'
import Scene4_4B from './scenes/4_Level2/scene4_4B.js'
import Scene4_4C from './scenes/4_Level2/scene4_4C.js'
import Scene4_5 from './scenes/4_Level2/scene4_5.js'
import Scene4_5A from './scenes/4_Level2/scene4_5A.js'
import Scene4_5B from './scenes/4_Level2/scene4_5B.js'
import Scene4_5C from './scenes/4_Level2/scene4_5C.js'
import Scene4_5D from './scenes/4_Level2/scene4_5D.js'
import Scene4_5E from './scenes/4_Level2/scene4_5E.js'
import Scene4_5F from './scenes/4_Level2/scene4_5F.js'
import Scene4_6 from './scenes/4_Level2/scene4_6.js'
import Scene4_7 from './scenes/4_Level2/scene4_7.js'
import Scene4_8 from './scenes/4_Level2/scene4_8.js'
import Scene4_9 from './scenes/4_Level2/scene4_9.js'
import Scene4_9_correct from './scenes/4_Level2/scene4_9_correct.js'
import Scene4_9_incorrect from './scenes/4_Level2/scene4_9_incorrect.js'
import Scene4_10 from './scenes/4_Level2/scene4_10.js'
import Scene4_11 from './scenes/4_Level2/scene4_11.js'
import Scene4_12 from './scenes/4_Level2/scene4_12.js'
import Scene4_13 from './scenes/4_Level2/scene4_13.js'
import Scene4_14 from './scenes/4_Level2/scene4_14.js'
import Scene4_15 from './scenes/4_Level2/scene4_15.js'
import Scene4_15_correct from './scenes/4_Level2/scene4_15_correct.js'
import Scene4_15_incorrect from './scenes/4_Level2/scene4_15_incorrect.js'
import Scene4_16 from './scenes/4_Level2/scene4_16.js'
import Scene4_17 from './scenes/4_Level2/scene4_17.js'
import Scene4_18 from './scenes/4_Level2/scene4_18.js'
import Scene4_19 from './scenes/4_Level2/scene4_19.js'
import Scene4_20 from './scenes/4_Level2/scene4_20.js'

// Level 3: Chicago
import Scene5_1 from './scenes/5_Level3/scene5_1.js'
import Scene5_2 from './scenes/5_Level3/scene5_2.js'
import Scene5_3 from './scenes/5_Level3/scene5_3.js'
import Scene5_4 from './scenes/5_Level3/scene5_4.js'


// Declare array of scenes.
var sceneArray = [
    Scene1_1, Scene1_2, Scene1_3, Scene1_4, Scene1_5,
    Scene2_1, Scene2_2, Scene2_3, Scene2_4, Scene2_5, Scene2_6,
    Scene3_1, Scene3_2, Scene3_3, Scene3_4, Scene3_5, Scene3_6, Scene3_7,
    Scene3_8, Scene3_9,
    Scene3_10,
    Scene3_11,
    Scene3_12, Scene3_12_incorrect, Scene3_12_correct,
    Scene3_13, Scene3_13_incorrect, Scene3_13_correct,
    Scene3_14, Scene3_14_incorrect, Scene3_14_correct,
    Scene3_15, Scene3_15_incorrect, Scene3_15_correct,
    Scene3_16, Scene3_16_incorrect, Scene3_16_correct,
    Scene3_17, Scene3_18, Scene3_19,
    Scene3_20, Scene3_21, Scene3_22, Scene3_22B, Scene3_23, Scene3_24, Scene3_24B, Scene3_25, Scene3_26,
    Scene3_27, Scene3_28, Scene3_29, Scene3_30, Scene3_31, Scene3_32, Scene3_33, Scene3_34,
    Scene3_35, Scene3_36, Scene3_36_correct, Scene3_36_incorrect, Scene3_37,
    Scene3_38, Scene3_39,
    Scene3_40, Scene3_41, Scene3_42,
    Scene3_43, Scene3_44, Scene3_45,
    Scene4_1, Scene4_2, Scene4_3,
    Scene4_4, Scene4_4A, Scene4_4B, Scene4_4C,
    Scene4_5, Scene4_5A, Scene4_5B, Scene4_5C, Scene4_5D, Scene4_5E, Scene4_5F, Scene4_6,
    Scene4_7,
    Scene4_8,
    Scene4_9, Scene4_9_correct, Scene4_9_incorrect,
    Scene4_10,
    Scene4_11,
    Scene4_12,
    Scene4_13,
    Scene4_14,
    Scene4_15, Scene4_15_correct, Scene4_15_incorrect,
    Scene4_16,
    Scene4_17,
    Scene4_18,
    Scene4_19,
    Scene4_20,
    Scene5_1, Scene5_2, Scene5_3, Scene5_4
]

// Resume from last completed slide.---
//Get the last completed slide name, from the query string in the URL.
var urlString = window.location.href
var url = new URL(urlString);
var lastCompletedSlide = url.searchParams.get("resume");

if (lastCompletedSlide != "scene1_1") {
    // Find that scene within the array of scenes.
    for (let i = 0; i < sceneArray.length; i++) {
        // Instantiate the class to get the name.
        var sceneClass = new sceneArray[i]();
        // Move the scene to the front of the array.
        if (lastCompletedSlide == sceneClass.constructor.name.toLowerCase()) {
            sceneArray.unshift(sceneArray.splice(i, 1)[0]);
        }
    }
}

export function launch() {
    return new Game({
        type: Phaser.CANVAS,
        // Game size
        width: 1920,
        height: 1080,
        backgroundColor: '#000000',
        scale: {
            mode: Phaser.Scale.FIT,
        },
        audio: {
            disableWebAudio: true
        },
        parent: "game",
        scene: sceneArray,
    });
}