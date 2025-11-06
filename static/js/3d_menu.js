let items = document.querySelectorAll(".item");
let menu = document.querySelector(".menu");

let increment = 360 / items.length;
let angle = 0;
let iterator = angle;
let threshold = 80;
let accumulatedDeltaY = 0;

items.forEach((item) => {
  item.style.transform = `rotateX(${iterator}deg) translateZ(120px)`;

  let opacity = findOpacity(iterator % 360);
  item.style.opacity = opacity;

  if (opacity == 1) {
    item.className = "item active";
  } else {
    item.className = "item";
  }

  iterator = iterator + increment;
});

function findOpacity(angle) {
  let newAngle;
  if (angle >= 0 && angle <= 90) {
    newAngle = angle;
  } else if (angle > 90 && angle <= 180) {
    newAngle = 180 - angle;
  } else if (angle > 180 && angle <= 270) {
    newAngle = angle - 180;
  } else {
    newAngle = 360 - angle;
  }
  let opacity = 1 - (1 * (newAngle % 90)) / 90;
  return opacity;
}

menu.addEventListener("wheel", (e) => {
  accumulatedDeltaY += e.deltaY;

  if (Math.abs(accumulatedDeltaY) >= threshold) {
    let rotation;
    if (accumulatedDeltaY < 0) {
      rotation = Math.ceil(accumulatedDeltaY / threshold) * increment;
    } else {
      rotation = Math.floor(accumulatedDeltaY / threshold) * increment;
    }

    angle = angle + rotation;

    let iterator = angle;

    items.forEach((item) => {
      item.style.transform = `rotateX(${iterator}deg) translateZ(120px)`;

      let opacity = findOpacity(iterator % 360);
      item.style.opacity = opacity;

      if (opacity == 1) {
        item.className = "item active";
      } else {
        item.className = "item";
      }

      iterator = iterator + increment;
    });

    accumulatedDeltaY = 0;
  }
});