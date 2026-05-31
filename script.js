const popup = document.getElementById("popup");
const closeButton = document.querySelector(".close-button");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
const foodTitle = document.getElementById("food-title");
const foodImage = document.getElementById("food-image");
const foodDescription = document.getElementById("food-description");
const pageNum = document.getElementById("page-num");

let currentCountry = null;
let currentPageIndex = 0;
let totalPages = 0;
let autoCloseTimer = null;

const emojiPins = document.querySelectorAll(".emoji-point");

for (let i = 0; i < emojiPins.length; i++) {
    const onePin = emojiPins[i];

    onePin.addEventListener("click", function() {
        const countryName = onePin.getAttribute("data-country");
        openPopup(countryName);
    });
}

closeButton.addEventListener("click", function() {
    closePopup();
});

backButton.addEventListener("click", function() {
    if (currentPageIndex > 0) {
        currentPageIndex = currentPageIndex - 1;
        updatePopupContent();
        
        if (autoCloseTimer !== null) {
            clearTimeout(autoCloseTimer);
            autoCloseTimer = null;
        }
    }
});

nextButton.addEventListener("click", function() {
    if (currentPageIndex < totalPages - 1) {
        currentPageIndex = currentPageIndex + 1;
        updatePopupContent();
        
        if (currentPageIndex === totalPages - 1) {
            startAutoCloseTimer();
        }
    }
});

function openPopup(country) {
    currentCountry = country;
    currentPageIndex = 0;
    
    if (autoCloseTimer !== null) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
    }
    
    let countryData = getCountryData(country);
    
    if (countryData != null) {
        totalPages = 1 + countryData.foods.length;
        updatePopupContent();
        popup.classList.add("show");
    }
}

function closePopup() {
    popup.classList.remove("show");
    currentPageIndex = 0;
    
    if (autoCloseTimer !== null) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
    }
}

function startAutoCloseTimer() {
    autoCloseTimer = setTimeout(function() {
        closePopup();
    }, 10000);
}

function getCountryData(country) {
    if (country === "afghanistan") return afghanistanData;
    if (country === "bangladesh") return bangladeshData;
    if (country === "cambodia") return cambodiaData;
    if (country === "china") return chinaData;
    if (country === "india") return indiaData;
    if (country === "indonesia") return indonesiaData;
    if (country === "iran") return iranData;
    if (country === "iraq") return iraqData;
    if (country === "japan") return japanData;
    if (country === "jordan") return jordanData;
    if (country === "kazakhstan") return kazakhstanData;
    if (country === "korea") return koreaData;
    if (country === "kyrgyzstan") return kyrgyzstanData;
    if (country === "macao") return macaoData;
    if (country === "malaysia") return malaysiaData;
    if (country === "mongolia") return mongoliaData;
    if (country === "myanmar") return myanmarData;
    if (country === "nepal") return nepalData;
    if (country === "oman") return omanData;
    if (country === "pakistan") return pakistanData;
    if (country === "philippines") return philippinesData;
    if (country === "russia") return russiaData;
    if (country === "saudiarabia") return saudiarabiaData;
    if (country === "srilanka") return srilankaData;
    if (country === "taiwan") return taiwanData;
    if (country === "tajikistan") return tajikistanData;
    if (country === "thailand") return thailandData;
    if (country === "turkey") return turkeyData;
    if (country === "turkmenistan") return turkmenistanData;
    if (country === "uae") return uaeData;
    if (country === "uzbekistan") return uzbekistanData;
    if (country === "vietnam") return vietnamData;
    if (country === "yemen") return yemenData;
    return null;
}

function updatePopupContent() {
    let countryData = getCountryData(currentCountry);
    if (!countryData) return;

    foodImage.style.transition = "opacity 0.3s ease";
    foodImage.style.opacity = "0";
    
    setTimeout(function() {
        if (currentPageIndex === 0) {
            foodTitle.textContent = "Welcome to " + countryData.name + "!";
            foodImage.style.display = "block";
            foodImage.src = countryData.introImage; 
            foodDescription.textContent = countryData.intro;
            pageNum.textContent = "1 / " + totalPages;
        } else {
                const foodIndex = currentPageIndex - 1;
                const currentFood = countryData.foods[foodIndex];            
                foodTitle.textContent = currentFood.name;
                foodImage.style.display = "block";
                foodImage.src = currentFood.image;
                foodDescription.textContent = currentFood.description;
                pageNum.textContent = (currentPageIndex + 1) + " / " + totalPages;
        }
            foodImage.style.opacity = "1";
}, 150);
}
