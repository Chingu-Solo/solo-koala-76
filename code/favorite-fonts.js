fontList = [
    {fontName:"Roboto", designer:"Christian Robertson", family:"Roboto", rank:1},
    {fontName:"Montserrat", designer:"Julieta Ulanovsky", family:"Montserrat", rank:2},
    {fontName:"Lato", designer:"Łukasz Dziedzic", family:"Lato", rank:3},
    {fontName:"Raleway", designer:"Multiple Designers", family:"Raleway", rank:4},
    {fontName:"Gayathri", designer:"SMC", family:"Gayathri", rank:3},
    {fontName:"Oswald", designer:"Vernon Adams, Kalapi Gajjar, Cyreal", family:"Oswald", rank:3},
    {fontName:"Poppins", designer:"Indian Type Foundry", family:"Poppins", rank:3},
    {fontName:"Baskervville", designer:"ANRT", family:"Baskervville", rank:3},
    {fontName:"Merriweather", designer:"Sorkin Type", family:"Merriweather", rank:3},
    {fontName:"Muli", designer:"Vernon Adams", family:"Muli", rank:3},
    {fontName:"Crimson Text", designer:"Sebastian Kosch", family:"Crimson Text", rank:3},
    {fontName:"Alata", designer:"Spyros Zevelakis, Eben Sorkin", family:"Alata", rank:3},
    {fontName:"Fjalla One", designer:"Sorkin Type", family:"Fjalla One", rank:3},
    {fontName:"Source Code Pro", designer:"Paul D. Hunt", family:"Source Code Pro", rank:3},
    {fontName:"Dancing Script", designer:"Impallari Type", family:"Dancing Script", rank:3},
    {fontName:"Pacifico", designer:"Vernon Adams, Jacques Le Bailly, Botjo Nikoltchev, Ani Petrova", family:"Pacifico", rank:3},
    {fontName:"Baloo Bhai", designer:"Ek Type", family:"Baloo Bhai", rank:3}
]

var themeToggleSwitch = null;
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;


function init() {
    var fontSelector = document.querySelector("#cmbFontSize");
    fontSelector.value = "20px";
    updateFontSize(fontSelector.value);
    loadFontCards();
    
    themeToggleSwitch = document.querySelector("#chkChangeTheme");

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    
        if (currentTheme === 'dark') {
            themeToggleSwitch.checked = true;
        }
    }
    
    themeToggleSwitch.addEventListener('change', switchTheme, false);
}

function updateFontSize(value) {
    var elements = document.getElementsByClassName("font-sample");
    for (let i = 0; i < elements.length; i++) {
        setFontSize(elements[i], value);
    }
}

function setFontSize(element, value) {
    element.style.fontSize = value;
}

function updateSearchResults(value) {
    clearResultsView();
    loadFontCards(value.trim());
}

function loadFontCards(filter = "") {
    var resultsDiv = document.getElementById("font-card-list");
    if (filter == "") {        
        for (let i = 0; i < fontList.length; i++) {
            var cardDiv = buildFontCard(fontList[i]);
            resultsDiv.appendChild(cardDiv);
        }    
    } else {
        var filteredList = fontList.filter(checkFilter, filter);
        for (let i = 0; i < filteredList.length; i++) {
            var cardDiv = buildFontCard(filteredList[i]);
            resultsDiv.appendChild(cardDiv);
        }
    }
}

function resetPageUtils() {
    document.getElementById("txtCustomText").value = "";
    document.getElementById("txtSearch").value = "";
    document.getElementById("cmbFontSize").value = "20px";
    // var layoutModeButton = document.getElementById("btnLayoutMode");
    // updateLayoutButtonText(layoutModeButton);
    clearResultsView();
    loadFontCards();
    updateFontCardsLayout();
}

function clearResultsView(element) {
    var resultsDiv = document.getElementById("font-card-list");
    resultsDiv.innerHTML = "";
}

function buildFontCard(font) {
    var cardDiv = document.createElement("div");
    cardDiv.className = "font-card";

    var cardHeader = document.createElement("header");
    cardHeader.className = "font-card-header";

    var cardInfoDiv = document.createElement("div");
    cardInfoDiv.className = "font-card-info";

    var cardTitle = document.createElement("h5");
    cardTitle.className = "font-card-title";
    cardTitle.textContent = font.fontName;
    
    var cardFontDesigner = document.createElement("p");
    cardFontDesigner.className = "font-card-designer";
    cardFontDesigner.textContent = font.designer;

    cardInfoDiv.appendChild(cardTitle);
    cardInfoDiv.appendChild(cardFontDesigner);

    var cardActionsDiv = document.createElement("div");
    cardActionsDiv.className = "font-card-actions";

    var cardAddAction = document.createElement("img");
    cardAddAction.className = "action-button";
    cardAddAction.src = "./images/add.png";
    cardAddAction.alt = "Add font to my library";
    cardAddAction.title = "Add font to my library";
    cardAddAction.onclick = function() { alert(`${font.fontName} added to your library.`); }
    cardActionsDiv.appendChild(cardAddAction);
    
    cardHeader.appendChild(cardInfoDiv);
    cardHeader.appendChild(cardActionsDiv);
    cardDiv.appendChild(cardHeader);

    var cardFontSampleDiv = document.createElement("div");
    
    var cardFontSample = document.createElement("p");
    cardFontSample.className = "font-sample";
    cardFontSample.textContent = getFontSampleText();
    cardFontSample.style = `font-family: ${font.fontName}`;
    
    cardFontSampleDiv.appendChild(cardFontSample)

    cardDiv.appendChild(cardFontSampleDiv);
    
    return cardDiv;          
}

function checkFilter(font) {
    return font.fontName.toLowerCase().includes(this.toLowerCase()); //'this' is the contextObject passed as second arg to the filter method
}

function updateCustomText(value) {
    var elements = document.getElementsByClassName("font-sample");
    for (let i = 0; i < elements.length; i++) {
        setCustomText(elements[i], getFontSampleText());
    }
}

function setCustomText(element, value) {
    element.textContent = value;
}

const defaultSampleText = "The bannana doesn't fall far from the tree. Except when fruit flies.";

function getFontSampleText() {
    var txtCustomText = document.getElementById("txtCustomText");
    var value = txtCustomText.value.trim();
    return value != "" && value != null ? value : defaultSampleText;
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

var currentLayout = "grid"; // or list

function changeLayoutMode(editor) {
    updateLayoutModeFlag();
    updateLayoutButtonText(editor);
    updateFontCardsLayout();
}

function updateFontCardsLayout() {
    var fontCardList = document.getElementsByClassName("font-card");
    for (var i=0; i < fontCardList.length; i++) {
        //fontCardList[i].style.width = (currentLayout == "grid") ? "20%" : "95%";
        if ((currentLayout == "grid")) {
            fontCardList[i].className = fontCardList[i].className.replace(" list-layout","");
        }
        else {
            fontCardList[i].className += " list-layout";
        }
    }
}

function updateLayoutModeFlag() {
    currentLayout = (currentLayout == "grid") ? "list" : "grid";
}

function updateLayoutButtonText(editor) {
    var editorText = ((currentLayout == "grid") ? "list" : "grid").toUpperCase();
    editor.value = editorText;
}
// font-family: 'Roboto', sans-serif;
// font-family: 'Montserrat', sans-serif;
// font-family: 'Lato', sans-serif;
// font-family: 'Raleway', sans-serif;
// font-family: 'Gayathri', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Poppins', sans-serif;
// font-family: 'Baskervville', serif;
// font-family: 'Merriweather', serif;
// font-family: 'Muli', sans-serif;
// font-family: 'Crimson Text', serif;
// font-family: 'Alata', sans-serif;
// font-family: 'Fjalla One', sans-serif;
// font-family: 'Source Code Pro', monospace;
// font-family: 'Dancing Script', cursive;
// font-family: 'Pacifico', cursive;
// font-family: 'Baloo Bhai', cursive;
// font-family: 'Arvo', serif;
// font-family: 'Teko', sans-serif;
// font-family: 'Righteous', cursive;
// font-family: 'Exo', sans-serif;
// font-family: 'Permanent Marker', cursive;
// font-family: 'Crete Round', serif;
// font-family: 'Amatic SC', cursive;