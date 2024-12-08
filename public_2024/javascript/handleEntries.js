document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  postEntry(); // 등록
});

document.getElementById("entries").addEventListener("click", function (e) {
  const entryId = e.target.getAttribute("data-id");
  console.log("entryId:", entryId);
  if (e.target.classList.contains("delete")) {
    deleteEntry(entryId); // 삭제
  }
});

function showGraphicScreen(author) {
  if (author) {
    graphicIconScreen.style.display = "flex";
    console.log(graphicIcon);
    if (author === "dp") {
      graphicIconScreen.style.backgroundColor = authorInfo["dp"][0];
      graphicIcon.src = authorInfo["dp"][1];
    } else if (author === "남하연") {
      graphicIconScreen.style.backgroundColor = authorInfo["nhy"][0];
      graphicIcon.src = authorInfo["nhy"][1];
    } else if (author === "자비") {
      graphicIconScreen.style.backgroundColor = authorInfo["jb"][0];
      graphicIcon.src = authorInfo["jb"][1];
    } else if (author === "춘진") {
      graphicIconScreen.style.backgroundColor = authorInfo["cj"][0];
      graphicIcon.src = authorInfo["cj"][1];
    } else if (author === "smilingface") {
      graphicIconScreen.style.backgroundColor = authorInfo["sf"][0];
      graphicIcon.src = authorInfo["sf"][1];
    }

    if (graphicIcon.src != "") {
      graphicIconScreen.style.animation = "none";
      void graphicIconScreen.offsetWidth;
      setTimeout(() => {
        graphicIconScreen.style.animation =
          "hideObject 1s ease-in-out forwards";
        graphicIconScreen.addEventListener(
          "animationend",
          () => {
            graphicIconScreen.style.display = "none";
          },
          { once: true }
        );
      }, 3200);
    }
  }
}

function resetForm() {
  const commentForm = document.getElementById("commentForm");
  commentForm.reset();

  section.style.backgroundColor = authorInfo["default"][0];
  for (let obj of textObjects) {
    obj.style.color = "#252525";
  }
}

const BASE_URL =
  "https://port-0-playlist-eternity-m47c1rlvf34a3653.sel4.cloudtype.app/";

function postEntry() {
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  const commenter = document.getElementById("commenter").value;
  // 등록
  console.log("author:", author);
  axios
    .post(`${BASE_URL}comments`, {
      author,
      content,
      commenter,
    })
    .then((res) => {
      console.log("Entry added:", res.data);
      showGraphicScreen(author);
      displayEntries(); // 방명록 갱신
      resetForm();
    })
    .catch((error) => console.error("Error:", error));
}

function deleteEntry(id) {
  //삭제
  axios
    .delete(`${BASE_URL}comments/${id}`)
    .then((res) => {
      console.log("Entry deleted:", res.data);
      displayEntries();
    })
    .catch((error) => console.error("Error:", error));
}

function displayEntries() {
  // Axios를 사용하여 항목 조회
  axios
    .get(`${BASE_URL}comments`)
    .then((res) => {
      const entriesDiv = document.getElementById("entries");
      entriesDiv.innerHTML = "";

      entries = res.data; // 전역 entries 배열에 데이터 저장

      entries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
                    <h3>To: ${entry.author}</h3>
                    <p>${entry.content}</p>
                    <h3>From: ${entry.commenter}</h3>
                    <button class="delete" data-id="${entry.id}")">삭제</button>
                `;
        entriesDiv.appendChild(entryDiv);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// 페이지 로드 시 방명록 항목을 조회합니다.
window.onload = displayEntries;
