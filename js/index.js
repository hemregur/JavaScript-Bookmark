
// Global değişkenler
var regEx = /[0-9a-z]/;
let user = localStorage.getItem("User") ? localStorage.getItem("User") : "";
let dataLength = localStorage.length ? localStorage.length - 2 : 0;
let counter = localStorage.getItem("Counter") ? localStorage.getItem("Counter") : 0;
let domItemDiv = document.querySelector(".itemCon");
let domDelete = document.querySelectorAll(".delete");
let domEmpty = `
            <div class="empty">
            <div class="emptyIcon">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <h2>Bookmark'ın boş!</h2>
            <p>İlham aldığın sayfaları, hemen eklemeye başla...</p>
            </div>
`;

// İsim girme Popup aç, isim kaydet, DOM'da göster
let popup2 = document.querySelector(".popUp2")
if (user == "") {
    popup2.classList.toggle("popUpFlex");
}
let myName = document.querySelector("#name");
let loginBtn = document.querySelector("#login");
let domUser = document.querySelector("#users");
loginBtn.addEventListener("click", () => {
    if (myName.value.match(regEx)) {
        localStorage.setItem("User", myName.value);
        popup2.classList.remove("popUpFlex");
        domUser.innerText = localStorage.getItem("User");
    } else {
        alert("Boş olamaz!");
    }
});
domUser.innerText = localStorage.getItem("User");


// Veri girme Popup aç, veri kaydet, DOM'da göster
let popup1 = document.querySelector(".popUp")
let addButton = document.querySelector(".addBtn");
addButton.addEventListener("click", () => {
    addButton.classList.toggle("addBtnActc");
    popup1.classList.toggle("popUpFlex");
});

let titlem = document.querySelector("#titl");
let urlm = document.querySelector("#link");
let dataAddBtn = document.querySelector("#add");
dataAddBtn.addEventListener("click", () => {
    let titlem = document.querySelector("#titl").value;
    let urlm = document.querySelector("#link").value;

    if (titlem.match(regEx) && urlm.match(regEx)) {
        let uploadData = {
            link: urlm
        }
        localStorage.setItem(titlem, JSON.stringify(uploadData));
        list();
    } else {
        alert("Boş olamaz!");
    }
});
function list() {
    domItemDiv.innerHTML = "";
    dataLength = localStorage.length ? localStorage.length - 1 : 0;

    if (localStorage.length < 2) {
        domItemDiv.innerHTML = domEmpty;
    } else {
        domItemDiv.innerHTML = "";
        for (let i = 0; i <= dataLength; i++) {
            const keys = localStorage.key(i) ? localStorage.key(i) : "0";
            if (keys != "User") {
                let getData = JSON.parse(localStorage.getItem(keys));
                domItemDiv.innerHTML += `
                            <div class="item">
                            <div class="itemIcon">
                            <i class="fa-solid fa-bookmark"></i>
                            </div>
                            <div class="itemContent">
                                <div class="itemTitle">${keys}</div>
                                <div class="itemUrl"><a href="${getData.link}" target="_blank">${getData.link}</a></div>
                            </div>
                            <div class="delete" ><i class="fa-solid fa-plus"></i></div>
                            </div>
                    `;
            }
        }
    }
    deletes();
}
list();

// Veri silme
function deletes() {
    domDelete = document.querySelectorAll(".delete");
    domDelete.forEach(et => {
        et.addEventListener("click", (x) => {
            if (x.target.classList.contains("delete")) {
                let nnn = x.target.parentElement.children;
                x.target.parentElement.remove();
                localStorage.removeItem(nnn[1].children[0].textContent);
                if (localStorage.length < 2) {
                    domItemDiv.innerHTML = domEmpty;
                }
            }
        });
    });

} deletes();


