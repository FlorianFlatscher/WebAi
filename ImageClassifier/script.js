let img;
let classifier;

const svg = document.querySelector("#loading");
const drop = document.querySelector("#drop");
const icon = document.querySelector("#drop div");

function setup() {


    svg.style.animation = "svg-grow-ring 1000ms infinite linear";
}


function draw() {

}

function preload() {
     classifier = ml5.imageClassifier('MobileNet', () => {
        svg.style.display = "none";
        svg.style.animation = "none";


        drop.style.display = "flex";
        const dropzone = select('#drop');
        dropzone.dragOver(highlight);
        dropzone.dragLeave(unhighlight);
        dropzone.drop(gotFile, unhighlight);

        function gotFile(file) {

            if (img) {
                img.remove();
            }

            img = createImg(file.data, "Dropped Image", "", () => {
                classifier.classify(img, gotResult);
            });
        }
        function highlight() {
            dropzone.style('background-color', 'lightgrey');
        }

        function unhighlight() {
            dropzone.style('background-color', '#ffffff');
        }
    });
}

function gotResult(error, results) {
    //Image
    img.parent(drop);
    img.elt.classList.add("imageToC");
    icon.style.display = "none";

    // Display error in the console
    if (error) {
        console.error(error);
    }
    // The results are in an array ordered by confidence.
    console.log(results);

}