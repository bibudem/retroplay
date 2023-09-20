// 0 = French, 1 = English
var currentLanguage = 0;
const buttonFrench = document.getElementById("button-fr");
const buttonEnglish = document.getElementById("button-en");

const buttonStart = document.getElementById("button-start");

const titleFrench = document.getElementById("title-fr");
const titleEnglish = document.getElementById("title-en");

toggleActive(titleFrench, true);

// Show UI
setTimeout(() => {
    buttonFrench.classList.add("show");
    buttonEnglish.classList.add("show");
    buttonStart.classList.add("show");
    toggleActive(buttonFrench, true);
}, 2000);




let clickLock = false;

function toEnglish(){
    if(!clickLock){
        clickLock=true;

        currentLanguage = 1;
        toggleActive(buttonEnglish, true);
        toggleActive(buttonFrench, false);
    
        toggleActive(titleEnglish, true);
    
        removeTitle(titleFrench);

        buttonStart.innerHTML = "START";

        setTimeout(() => {
            clickLock = false;
          }, 2000);
    }
}

function toFrench(){
    if(!clickLock){
        clickLock = true;
        
        currentLanguage = 0;
        toggleActive(buttonFrench, true);
        toggleActive(buttonEnglish, false);
    
        toggleActive(titleFrench, true);
    
        removeTitle(titleEnglish);
        buttonStart.innerHTML = "ENTRER";

        setTimeout(() => {
            clickLock = false;
          }, 2000);
    }


}

function toggleActive(element, value){
    if(value){
        element.classList.add("active");
    } else {
        element.classList.remove("active");
    }
}

function removeTitle(title){
    title.classList.add("remove");

    setTimeout(() => {
        toggleActive(title, false);
        title.classList.remove("remove");
      }, 2000);
}

function enter(){
    if(currentLanguage == 0){
        window.location.href='home_menu.html'
    } else {
        window.location.href='en_home_menu.html'
    }
}