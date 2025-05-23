let video;
let facemesh;
let predictions = [];
// 指定要連線的點位
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.faceMesh(video, modelReady);
  facemesh.on('predict', results => {
    if (results && results.length > 0) {
      predictions = results;
    }
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    // 用 line 指令將所有點串接
    for (let i = 0; i < indices.length - 1; i++) {
      const idxA = indices[i];
      const idxB = indices[i + 1];
      const [x1, y1] = keypoints[idxA];
      const [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }
  }
  pop();
}
