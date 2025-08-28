const baseFactor = [
  1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
];
const materials = {
  BBH: { baseValue: 24 },
  BDE: { baseValue: 24 },
  BSE: { baseValue: 12 },
  MCG: { baseValue: 300 },
  TRU: { baseValue: 20 },
};
let factor = 1;
getPrices();

async function getPrices() {
  try {
    const response = await fetch("https://rest.fnar.net/rain/prices");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    json.forEach((element) => {
      if (Object.keys(materials).includes(element.Ticker)) {
        materials[element.Ticker].priceData = element;
      }
    });
    updateTable();
  } catch (error) {
    console.log(error);
  }
}

function updateTable() {
  document
    .querySelector("#calculator")
    .removeChild(document.querySelector("table"));
  const headers = ["Material", "Quantity", "Price"];
  let priceTotal = 0;
  const newTable = document.createElement("table");
  const newRow = document.createElement("tr");
  headers.forEach((element) => {
    const newHeader = document.createElement("th");
    newHeader.innerText = element;
    newRow.appendChild(newHeader);
  });
  newTable.appendChild(newRow);
  Object.keys(materials).forEach((element) => {
    // currently locked to AI.1 ask
    let qty = materials[element].baseValue * factor;
    let price = Math.floor(materials[element].priceData["AI1-AskPrice"]) * qty;
    priceTotal += price;
    createNode(newTable, [
      element,
      qty.toLocaleString(),
      price.toLocaleString(),
    ]);
  });
  createNode(newTable, ["", "Total", priceTotal.toLocaleString()]);
  // newTable.style = {}
  document
    .querySelector("#calculator")
    .insertBefore(newTable, document.querySelector("#fio"));
}

function createNode(parent, content) {
  const newRow = document.createElement("tr");
  content.forEach((element) => {
    const newData = document.createElement("td");
    newData.innerText = element;
    newRow.appendChild(newData);
  });
  parent.appendChild(newRow);
}

function numCheck(field) {
  const input = document.getElementsByName(field)[0];
  const start = document.getElementsByName("Start")[0];
  const end = document.getElementsByName("End")[0];
  if (+input.value < 0) {
    input.value = 0;
  }
  if (+input.value > 20) {
    input.value = 20;
  }
  if (+start.value >= +end.value) {
    end.value = +start.value + 1;
  }
  document.querySelector(".startCap").innerText =
    Math.ceil(+start.value / 2) * 500;
  document.querySelector(".endCap").innerText = Math.ceil(+end.value / 2) * 500;
  factor = 0;
  for (let i = +start.value; i < baseFactor.length; i++) {
    console.log("i", i);
    if (i < end.value) {
      factor += baseFactor[i];
    } else {
      i += 100;
    }
  }
  updateTable();
}

function saveLogin() {
  let user = document.querySelector("#user");
  let apiKey = document.querySelector("#apiKey");
  createCookie("user", user);
  createCookie("apiKey", apiKey);
}
