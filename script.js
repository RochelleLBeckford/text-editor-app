// & document.querySelectorAll -> a method that returns all the elements that match the group of selectors specified 
let optionsButtons = document.querySelectorAll(".option-button");

let advancedOptionButton = document.querySelectorAll(".adv-option-button");

//& document.getElementById -> get the 1st element by the id name
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");

// & document.querySelectorAll -> a method that returns all the elements that match the group of selectors specified
let alignButtons = document.querySelectorAll(".align")
let spacingButtons = document.querySelectorAll(".spacing")
let formatButtons = document.querySelectorAll(".format")
let scriptButtons = document.querySelectorAll(".script")


let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

// & Add functionality to initiate highlighting the text
const initializer = () => {
    // ~ highlight the text
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true); 
    highlighter(formatButtons, false); 
    highlighter(scriptButtons, true); 

    // ~ .map method -> to iterate through all elements of the array method -> results in a new array 
    // ~ created a nested DOM [document object model] structure -> adding a dom element using js
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        // ~ .appendChild() -> all contents are moved from its current position to new this new position
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

// & Method to change the text format
const modifyText = (command, defaultUi, value) => {
    // ~ execCommand -> affects the current editable element
    document.execCommand(command, defaultUi, value);
};

/*
    & Method to add functioanlity to the option Buttons 
    ~ .forEach() -> iterate over each button selected in the optionButton class
    ~ addEventListener to utilize user interaction (click or button press) and run code on the action happens
*/
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// & Method to give functionality to the linkButtons
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");

    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    };
});

// & Highlighting the text 
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;

                if (button.classList.contains("active")) {
                    alreadyActive = true;
                } 

                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            };
        });
    });
};

// & To remove highlighter from the already highlighted text
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = initializer();


