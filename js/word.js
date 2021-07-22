let searchInput = document.querySelector("input");
let searchButton = document.querySelector("button");
let display = document.querySelector(".display ol");

let apiKey = "https://api.datamuse.com/words?rel_rhy=";

searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  let endpoint = apiKey + searchInput.value;

  // clear previous session
  while (display.firstChild) {
    display.removeChild(display.firstChild);
    searchInput.value = "";
  }

  // handle response
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse(xhr.response);
    }
  };

  xhr.open("GET", endpoint);
  xhr.send();
});

let renderResponse = (res) => {
  if (!res) {
    console.log(res.status);
  }

  if (!res.length) {
    display.innerHTML = "No matching words found!";
    display.style.overflowY = "";
    return;
  }

  if (res.length >= 5) {
    display.style.overflowY = "scroll";
    display.style.height = "200px";
  }
  for (let foundWords of res) {
    display.innerHTML += `<li>${foundWords.word}</li>`;
  }
};