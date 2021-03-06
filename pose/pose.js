let video;
let poseNet;
let poses = [];
let eye;

let showEye;

function preload () {
    eye = loadImage("images/eye.png");
}

function setup() {
    const can = createCanvas(1920, 1080);
    const container = document.querySelector('#canvasContainer')

    video = createCapture(VIDEO);
    video.hide();
    video.size(width, height)
    can.parent('#canvasContainer');

    const resize = (e) =>  {
        const divW = container.clientWidth;
        const newH = (divW/width) * height;
        can.resize(divW, newH);
        video.size(divW, newH);
    }
    window.addEventListener("resize",resize );
    resize()

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results) {
       poses = results;
    });
}

function modelReady() {

}

function draw() {
    push();
    //background(0);
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    if (!showEye)
    drawSkeleton();
    pop();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        if (!showEye) {
            for (let j = 0; j < pose.keypoints.length; j++) {
                // A keypoint is an object describing a body part (like rightArm or leftShoulder)
                let keypoint = pose.keypoints[j];
                // Only draw an ellipse is the pose probability is bigger than 0.2
                if (keypoint.score > 0.2) {
                    fill(255, 0, 0);
                    noStroke();
                    ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
                }
            }
        } else {
            imageMode(CENTER);
            image(eye, pose.leftEye.x, pose.leftEye.y, 40, 40);
            image(eye, pose.rightEye.x, pose.rightEye.y, 40, 40);
        }
    }
    imageMode(CORNER)

}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 0, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}

function mousePressed () {
    showEye = !showEye;
}


