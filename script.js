const formEl = document.querySelector("form");
const itemNameEl = document.getElementById("item-name");
const addEl = document.querySelector("#add");
const notificationEl = document.querySelector(".works");
const clearEl = document.querySelector(".btn");

let list = JSON.parse(localStorage.getItem("list"));

list.forEach((task) => {
  createItems(task);
});
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  notificationEl.innerHTML = `<span>${itemNameEl.value}</span> Added`;
  notificationEl.classList.add("show");
  setTimeout(() => {
    notificationEl.classList.remove("show");
  }, 1000);
  createItems();
});

function createItems(task) {
  const totalItemsEl = document.querySelector(".total-items");
  const itemEl = document.createElement("li");
  // itemEl.innerHTML = itemNameEl.value;
  itemEl.classList.add("items");
  totalItemsEl.appendChild(itemEl);

  const text = document.createElement("p");
  text.innerText = itemNameEl.value;
  if (task) {
    text.innerText = task.name;
  }

  itemNameEl.value = "";
  const renameBtnEl = document.createElement("div");
  renameBtnEl.innerHTML = `<i class="fa-regular fa-pen-to-square rename"></i>`;

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fa-regular fa-square checked"></i>`;

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fa-solid fa-trash trashBtn"></i>`;

  itemEl.appendChild(text);
  itemEl.appendChild(renameBtnEl);
  itemEl.appendChild(checkBtnEl);
  itemEl.appendChild(trashBtnEl);

  const trashEl = trashBtnEl.firstChild;
  trashEl.addEventListener("click", () => {
    itemEl.remove();
    notificationEl.innerHTML = `<span>${text.innerText}</span> Removed`;
    notificationEl.classList.add("show");
    setTimeout(() => {
      notificationEl.classList.remove("show");
    }, 1000);
    updateLocalStorage();
  });

  const checkEl = checkBtnEl.firstChild;
  if (task && task.checked) {
    itemEl.classList.add("check");
    checkEl.classList.toggle("fa-square-check");
    checkEl.classList.toggle("fa-square");
  }
  checkEl.addEventListener("click", () => {
    checkEl.classList.toggle("fa-square");
    checkEl.classList.toggle("fa-square-check");
    if (checkEl.classList.contains("fa-square-check")) {
      itemEl.classList.add("check");
      checkEl.style.color = "#ffffff6c";
      notificationEl.innerHTML = `<span>${text.innerText}</span> Purchased`;
      notificationEl.classList.add("show");
      setTimeout(() => {
        notificationEl.classList.remove("show");
      }, 2000);
    } else {
      itemEl.classList.toggle("check");
      checkEl.style.color = "rgb(130, 255, 130)";
      notificationEl.innerHTML = `<span>${text.innerText}</span> Not Purchased`;
      notificationEl.classList.add("show");
      setTimeout(() => {
        notificationEl.classList.remove("show");
      }, 2000);
    }
    updateLocalStorage();
  });

  // Rename Button is Not Working at this time....

  // const renameEl = renameBtnEl.firstChild;

  // renameEl.addEventListener("click", () => {
  //   console.log(renameEl.value);
  //   addEl.value = "Rename";
  //   itemNameEl.value = text.innerText;
  //   text.innerText = itemNameEl.value;
  // });
  clearEl.addEventListener("click", () => {
    itemEl.remove();
    notificationEl.innerHTML = `Cleared All Items`;
    notificationEl.classList.add("show");
    setTimeout(() => {
      notificationEl.classList.remove("show");
    }, 1000);
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("check"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
