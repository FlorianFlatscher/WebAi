let video;
let yolo;
let results = [];




function setup() {
    const can = createCanvas(1920, 1080);
    const container = document.querySelector('#canvasContainer')

    video = createCapture(VIDEO);
    video.hide();
    video.size(width, height)
    can.parent('#canvasContainer');

    const resize = (e) => {
        const divW = container.clientWidth;
        const newH = (divW / width) * height;
        can.resize(divW, newH);
        video.size(divW, newH);
    }
    window.addEventListener("resize", resize);
    resize()

    yolo = ml5.YOLO(video, modelReady());
}

function modelReady() {
    console.log("model loaded");
}

let last = true;

function draw() {
    // if (last) {
        image(video, 0, 0, width, height);
        if (yolo.modelReady && !yolo.isPredicting) {
            yolo.detect((err, r) => {
                results = r;
            });
        }
        last = false;
    drawBounds();

    // }
}

function mousePressed() {
    last = true;
}

function drawBounds () {
    for (let i = 0; i < results.length; i++) {
        r = results[i];
        stroke(0, 255, 0);
        textSize(30);
        text(r.label,width * r.x + 5,  height * r.y + 25);
        noFill();
        rect(width * r.x, height * r.y, width * r.w, height * r.h);
    }
}

