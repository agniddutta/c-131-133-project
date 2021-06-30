img = "";
status = "";
objects = []

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("fruits_status").innerHTML = "status: detecting objects";
}

function preload() {
    img = loadImage("fruits.jpg");
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("fruits_status").innerHTML = "status: object detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelloaded() {
    console.log("modelloaded");
    status = true;
    object_detector.detect(img, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results);
        objects = results
    }
}