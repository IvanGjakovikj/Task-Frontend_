const convertTime = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

var items = null;
var offset = 0;
async function getData() {
  const requestURL = "data.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  items = await response.json();
  initializeCards();
}

function initializeCards() {
  if (offset >= items.length) {
    return;
  }
  for (let i = offset; i < offset + 4; i++) {
    var card = document.createElement("div");
    card.classList.add("content");
    let temp = `
      <div class="card">
        <div class="profile-content profile_image">
        <img src="${items[i].profile_image}">
        </div>
        <div class="profile-content text">
            <h2>${items[i].name}<h2>
            <p>${convertTime(items[i].date)}</p>
          </div>
        <div class="profile-content instagram_logo">
            <img src="instagram-logo.svg" id="logo-top" >
        </div>
        <div class="post-image">
            <img src="${items[i].image}" id="img-post"
        </div>
        <div class="caption">
            <p>${items[i].caption}</p>
        </div>
        <div onclick="heartClicked(${i})" class="likes-heart">
        <object class="svgObject" id="${
          "heart" + i
        }" data="heart.svg" type="image/svg+xml"></object>
        </div>
        <div class="line-border"></div>
        <div class="likes">
        <p id="${"like" + i}">${items[i].likes}</p>
        </div>
        </div>
    </div>
    </div>
    </div>
      `;
    card.innerHTML = temp;
    document.getElementById("container").appendChild(card);
  }
  offset += 4;
  if (offset >= items.length) {
    document.getElementById("button").style.visibility = "hidden";
  }
}
function heartClicked(index) {
  let heart = document.getElementById("heart" + index);
  let likes = document.getElementById("like" + index);
  if (heart.contentDocument.documentElement.style.fill !== "red") {
    heart.contentDocument.documentElement.style.fill = "red";
    likes.innerHTML = parseInt(likes.innerHTML) + 1;
  } else {
    heart.contentDocument.documentElement.style.fill = "none";
    likes.innerHTML = parseInt(likes.innerHTML) + -1;
  }
}
getData();
