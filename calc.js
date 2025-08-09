let baseFactor = [1,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10]
let materials = {BBH:{baseValue:24},BDE:{baseValue:24},BSE:{baseValue:12},MCG:{baseValue:300},TRU:{baseValue:20}}
getPrices()

async function getPrices() {
    try {
        let response = await fetch('https://rest.fnar.net/rain/prices')
        if(!response.ok){throw new Error(`Response status: ${response.status}`)}
        let json = await response.json()
        json.forEach((element)=>{
            if(Object.keys(materials).includes(element.Ticker)) {
                materials[element.Ticker].priceData = element
            }
        })
        console.log(materials)

    } catch (error) {
        console.log(error)
    }
}

function numCheck(field) {
    let input = document.getElementsByName(field)[0]
    let start = document.getElementsByName('Start')[0]
    let end = document.getElementsByName('End')[0]
    if(+input.value < 0) {
        input.value = 0
    }
    if(+input.value > 20) {
        input.value = 20
    }
    if(+start.value >= +end.value) {
        end.value = +start.value + 1
    }
    document.querySelector('.startCap').innerText = Math.ceil(+start.value / 2)*500
    document.querySelector('.endCap').innerText = Math.ceil(+end.value / 2)*500
    let factor = 0
    console.log('start',start.value)
    console.log(factor)
    for(let i = +start.value; i < baseFactor.length; i++){
        console.log('i',i)
        if(i < end.value){
            factor += baseFactor[i]
        } else {i += 100}
        console.log('plus',baseFactor[i])
        console.log(factor)
    }
    document.querySelectorAll('td').forEach((element)=>{
        if(element.id){
            element.innerText = factor * materials[element.id].baseValue
        }
    })
}