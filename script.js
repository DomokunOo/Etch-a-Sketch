//Create the Etch-a-Sketch of 16x16
let num = 16

const createGrid = function (num) {
    //selects body element
    const body = document.querySelector('body')

    //create div in body element
    const div = document.createElement('div')

    //set id attribute of div to container 
    div.setAttribute('id', 'container')

    //create 16 columns that are spaced evenly and take up the entire #container)
    div.style.gridTemplateColumns = `repeat(${num}, 1fr)`
    div.style.gridTemplateRows = `repeat(${num}, 1fr)`

    //append the child element, #container to the body (this actually creates the #container)
    body.appendChild(div);

    //select #container
    const container = document.querySelector('#container')

    //for every grid, create a div element, set attribute of class to grid-item
    for (i = 0; i < num * num; i++) {
        const div = document.createElement('div')
        div.setAttribute('class', 'grid-item');

        //Added CSS styling for debugging
        div.style.border = "1px solid";
        // div.textContent = "HI"

        //append child (div) to the parent (container)
        container.appendChild(div)
    }

    //select all grid-item elements
    const gridItems = document.querySelectorAll('.grid-item')

    //forEach is for querySelectorAll (grid-items)
    //for each grid-item, add ann event listener
    //When mouse enters grid, it creates a random background color
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mouseenter', () => {
            //resets any transitions running when mouse enters the grid-item
            gridItem.style.transition = "none"
            //for every grid-item element add random bg color
            randomBgColor(gridItem);
        })
    });

    //Style mouse leave to fade out after 1s
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mouseleave', () => {
            gridItem.style.backgroundColor = "white"
            gridItem.style.transition = "1s ease-out"
        })
    });
}

//declare global variable for blackness of color
let black = 1

//fucntion for randomBgColor
function randomBgColor(element) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    element.style.backgroundColor = convertHex(`#${randomColor}`, black);

    //Add 10% blackness for each time this function runs and resets when the color is black
    black -= .1;
    if (black < 0) {
        black = 1;
        return black
    }
}

//changes hex color to rgb and allows it to add a % of blackness to color
function convertHex(hex, black) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    result = 'rgba(' + r * black + ',' + g * black + ',' + b * black + ')';
    return result;
}

//listener button to reset #container and grid-items
const button = document.querySelector('button')

button.addEventListener('click', listener)

function listener() {
    //store current value of num into prevNum
    prevNum = num


    let newNum = prompt("Enter the number of columns/rows (1 to 100): ")

    //checks to see if newNum is valid or not and stored in value of num
    num = checkInput(newNum)

    //removes #container and contents within
    const div = document.querySelector('div');
    div.remove('div');

    //create Etch-a-Sketch with
    createGrid(num);
}


//if input is valid, newNum is used
//if input is invalid, prevNum is used and grid stays the same
function checkInput(newNum) {
    if (+newNum > 0 && +newNum <= 100) {
        return Math.round(+newNum);
    } else if (newNum === null) {
        return +prevNum;
    } else {
        alert("Please Enter a number between 1 and 100.");
        return +prevNum;
    }
}

//runs the first Etch-a-Sketch, where num=16 set as global value
createGrid(num);