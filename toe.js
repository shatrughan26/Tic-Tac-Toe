let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector("#reset")
let newGamebtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turn0 = true
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    enabledBoxes();
    msgContainer.classList.add("hide");

}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if (turn0) {
            box.innerText = "o";
            turn0 = false;
        }else{
            box.innerText = "x";
            turn0 = true;
        }
        box.disabled = true;
        const winnerFound = checkWinner();
        if (!winnerFound) {
            checkforDraw();
        }
    });
});

const disabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner",pos1val);
                showWinner(pos1val);
                return true;
            }
        }  
    }
    return false;
   
};

const checkforDraw = () =>{
    let allFilled = true;
    boxes.forEach((box)  => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });
    if (allFilled && !checkWinner()) {
        msg.innerText = `Its a Draw!`;
        msgContainer.classList.remove("hide")
        disabledBoxes();
    }
};


newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);



