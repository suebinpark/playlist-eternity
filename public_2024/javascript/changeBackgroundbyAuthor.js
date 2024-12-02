const section = document.querySelector("section");
const graphicIconScreen = document.querySelector(".messageSent");
const graphicIcon = document.querySelector(".messageSent img");
const authorInfo = {
  default: ["#f6f6f6"],
  dp: ["#fff992", "../images/dp.png"],
  nhy: ["#9af2d1", "../images/namhayeon.png"],
  jb: ["#e8cffa", "../images/jabi.png"],
  cj: ["#3e1297", "../images/chunjin.png"],
  sf: ["#ff3d38", "../images/smilingface.png"],
};

const select = document.querySelector("#author");
const textObjects = document.querySelectorAll(".text_colorChange");
select.onchange = () => {
  let selectedOptID = select.selectedOptions[0].id;
  if (selectedOptID in authorInfo) {
    section.style.backgroundColor = authorInfo[selectedOptID][0];
    if (selectedOptID == "cj" || selectedOptID == "sf") {
      for (let obj of textObjects) {
        obj.style.color = "#f6f6f6";
        graphicIconScreen.style.color = "#f6f6f6";
      }
    } else {
      for (let obj of textObjects) {
        obj.style.color = "#252525";
        graphicIconScreen.style.color = "#252525";
      }
    }
  } else {
    section.style.backgroundColor = authorInfo["default"];
    for (let obj of textObjects) {
      obj.style.color = "#252525";
      graphicIconScreen.style.color = "#252525";
    }
  }
};
