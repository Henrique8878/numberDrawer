const divInput = document.querySelector("#div_input")
const button = document.querySelector("#btn_draw")
const inpQuantity = document.querySelector(".inpQuantity")
const inpIntervalFirst = document.querySelector("#inpIntervalFirst")
const inpIntervalSecond = document.querySelector("#inpIntervalSecond")
const labelCheck = document.getElementById("labelCheck")
const inpCheck = document.getElementById("inpCheck")
const imgCheck = document.getElementById("imgCheck")
const inpText = document.querySelectorAll(".inpText")
const h4 = document.querySelectorAll("h4")
const articleFirst = document.getElementById("articleFirst")
const articleSecond = document.getElementById("articleSecond")
const drawAgain = document.getElementById("drawAgain")
const result = document.getElementById("result")
const small = document.querySelector("small")

let arrayNumbers = []
let focus = false
let numberResult = 1
let verifyChecked = false


function removeValues(){
    inpQuantity.value = ""
    inpIntervalFirst.value = ""
    inpIntervalSecond.value = ""
    arrayNumbers = []
}

function checkDifference(){
    let difference = inpIntervalSecond.value-inpIntervalFirst.value
    if(difference<2){
        throw new Error(`A diferença de valores deve ser de no mínimo 2`)
    }
}

function checkOrderNumber(v1,v2){
    if(v1>v2){
        throw new Error("O valor da primeira caixa deve ser maior que o valor da segunda!");
    }
}

function createSpanNumber(number){
    let span = document.createElement("span")
    span.classList.add("spanResult")
    span.textContent = number
    result.append(span)
    console.log(number)
}

function incrementResult(){
    small.textContent = `${numberResult}º RESULTADO`
    ++numberResult
}

function changeNumber(array){
    return [...new Set(array)]
}

for(let i = 0;i<inpText.length;i++){
    inpText[i].addEventListener("focus",(e)=>{
        inpText[i].classList.add("inputFocus")
        console.log("adicionou")
    })

    inpText[i].addEventListener("blur",()=>{

    })
}

divInput.addEventListener("input",(e)=>{
   if(e.target.type=="text"){
        if(e.target.classList.contains("inpQuantity")){
            try{
                let number = Number(e.target.value)
                if(number>10){
                    throw new Error("São permitidos no máximo 10 números para sorteio")
                }
            }catch(error){
                e.target.value = 10
            }
        }
        
        if(e.target.classList.contains("inpValues")){
            try{
                let number = Number(e.target.value)
                if(number>1000){
                    throw new Error("O valor limite máximo permitido é 1000");
                }
            }catch(error){
                e.target.value = 1000
            }
        }
        let regex = /\D+/g
        e.target.value = e.target.value.replace(regex,"")
   }
})

button.addEventListener("click",()=>{
    try{
        let quantity = inpQuantity.value
        let valueFirst = inpIntervalFirst.value
        let valueSecond = inpIntervalSecond.value
    
        let numberDraw = 0
        try{
            checkDifference(valueFirst,valueSecond)
        }catch(error){
            alert(`${error}`)
        }

        checkDifference()
        for(let i = 0;i<quantity;i++){
            numberDraw = Math.floor(Math.random()*valueSecond)
    
            while(numberDraw<=valueFirst){
                numberDraw = Math.floor(Math.random()*valueSecond)
            }
            arrayNumbers.push(numberDraw)
        }

        if(verifyChecked == true){
            let uniqueArray = changeNumber(arrayNumbers)
            arrayNumbers = []
            arrayNumbers = [...uniqueArray]
        }
    
        articleSecond.classList.remove("none")
        articleSecond.classList.add("initial")
        articleFirst.classList.add("none")
        for(let i = 0;i<arrayNumbers.length;i++){
            createSpanNumber(arrayNumbers[i])
        }
        
        incrementResult()
    }catch(error){
        arrayNumbers.push(inpIntervalFirst.value)
    }
    removeValues()
})

drawAgain.addEventListener("click",()=>{
    const span = document.querySelectorAll("spanResult")
    articleSecond.classList.remove("initial")
    articleSecond.classList.add("none")
    articleFirst.classList.remove("none")
    result.innerHTML = ""
})

labelCheck.addEventListener("click",(e)=>{
    if(inpCheck.checked){
        inpCheck.checked = !inpCheck.checked
        imgCheck.src = "state=default.png"
        verifyChecked = false
    }else{
        inpCheck.checked = !inpCheck.checked
        imgCheck.src = "state=active.png"
        verifyChecked = true
    }
})