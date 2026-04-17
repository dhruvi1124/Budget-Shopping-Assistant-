// STATE
let items = [];
let budget = 0;
let nextId = 1;
let dp = [];

let isRunning = false;
let shouldStop = false;


// DOM
const budgetInput = document.getElementById('budget-input');
const addItemForm = document.getElementById('add-item-form');
const cartList = document.getElementById('cart-list');

const btnRun = document.getElementById('btn-run');
const btnStop = document.getElementById('btn-stop');
const btnClear = document.getElementById('btn-clear');
const btnAdd = document.getElementById('btn-add');

const speedSlider = document.getElementById('speed-slider');

const dpTableContainer = document.getElementById('dp-table-container');
const resultContent = document.getElementById('result-content');


// INIT
function init(){

budgetInput.value="";

renderCart();

budgetInput.addEventListener('change',e=>{
budget=parseInt(e.target.value)||0;
resetVisualization();
});


addItemForm.addEventListener('submit',e=>{

e.preventDefault();

const name=document.getElementById('item-name').value;
const price=parseInt(document.getElementById('item-price').value);
const value=parseInt(document.getElementById('item-value').value);

if(price < 0 || value < 0){
alert("Price and Value cannot be negative");
return;
}

items.push({
id:nextId++,
name,
price,
value
});

addItemForm.reset();

renderCart();
resetVisualization();

});


btnClear.addEventListener('click',()=>{

items=[];
nextId=1;

renderCart();
resetVisualization();

});


// RUN
btnRun.addEventListener('click',()=>{

budget = parseInt(budgetInput.value);

if(isNaN(budget) || budget < 0){
alert("Budget cannot be negative");
return;
}

if(budget === 0){
alert("Budget must be greater than 0");
return;
}
startAlgorithm();

});


btnStop.addEventListener('click',stopAlgorithm);

}



// CART
function renderCart(){

cartList.innerHTML='';

if(items.length===0){

cartList.innerHTML=`
<tr>
<td colspan="4" style="text-align:center;color:#64748b;">
No items in cart
</td>
</tr>
`;

return;

}

items.forEach((item,index)=>{

const tr=document.createElement('tr');

tr.innerHTML=`
<td><strong>Item ${index+1}</strong>: ${item.name}</td>
<td>${item.price}</td>
<td>${item.value}</td>

<td class="action-buttons">

<button class="btn btn-icon btn-outline edit-btn" data-id="${item.id}">
✏️
</button>

<button class="btn btn-icon btn-outline delete-btn" data-id="${item.id}">
🗑️
</button>

</td>
`;

cartList.appendChild(tr);

});



// DELETE
document.querySelectorAll('.delete-btn').forEach(btn=>{
btn.addEventListener('click',e=>{

const id=parseInt(e.currentTarget.dataset.id);

items=items.filter(i=>i.id!==id);

renderCart();
resetVisualization();

});
});


// EDIT
document.querySelectorAll('.edit-btn').forEach(btn=>{
btn.addEventListener('click',e=>{

const id=parseInt(e.currentTarget.dataset.id);

const item=items.find(i=>i.id===id);

let newName=prompt("Edit Item Name",item.name);
let newPrice=prompt("Edit Item Price",item.price);
let newValue=prompt("Edit Item Value",item.value);

if(newName!==null && newPrice!==null && newValue!==null){

if(newPrice < 0 || newValue < 0){
alert("Price and Value cannot be negative");
return;
}

item.name=newName;
item.price=parseInt(newPrice);
item.value=parseInt(newValue);

renderCart();
resetVisualization();

}

});
});

}



// RESET
function resetVisualization(){

stopAlgorithm();

dpTableContainer.innerHTML=
'<div class="empty-state"><p>Add items and run algorithm to visualize.</p></div>';

resultContent.innerHTML=
'<p>Results will appear here.</p>';

}



// DP TABLE
function createDPTableGrid(){

const table=document.createElement('table');
table.className='dp-table';

const thead=document.createElement('thead');
const headerRow=document.createElement('tr');

const tl=document.createElement('th');
tl.textContent='Items \\ Price';
headerRow.appendChild(tl);

for(let j=0;j<=budget;j++){
const th=document.createElement('th');
th.textContent=j;
headerRow.appendChild(th);
}

thead.appendChild(headerRow);
table.appendChild(thead);

const tbody=document.createElement('tbody');

for(let i=0;i<=items.length;i++){

const row=document.createElement('tr');

const th=document.createElement('th');
th.textContent=i===0?'0':items[i-1].name;

row.appendChild(th);

for(let j=0;j<=budget;j++){

const td=document.createElement('td');

td.id=`cell-${i}-${j}`;

td.textContent=i===0?'0':'';

row.appendChild(td);

}

tbody.appendChild(row);

}

table.appendChild(tbody);

dpTableContainer.innerHTML='';
dpTableContainer.appendChild(table);

}



// SPEED
function getDelay(){

const val=parseInt(speedSlider.value)||50;

return Math.max(50,1500-(val*30));

}

function sleep(ms){
return new Promise(resolve=>setTimeout(resolve,ms));
}



// CONTROLS
function stopAlgorithm(){

shouldStop=true;

isRunning=false;

btnStop.disabled=true;
btnRun.disabled=false;

budgetInput.disabled=false;
btnAdd.disabled=false;

}



function setUIRunningState(running){

isRunning=running;

shouldStop=false;

btnRun.disabled=running;
btnStop.disabled=!running;

budgetInput.disabled=running;
btnAdd.disabled=running;

}



// ALGORITHM
async function startAlgorithm(){

if(items.length===0){

alert("Please add items");

return;

}

createDPTableGrid();

setUIRunningState(true);

const n=items.length;
const W=budget;

dp = Array.from({length:n+1},()=>Array(W+1).fill(0));


for(let i=1;i<=n;i++){

for(let j=0;j<=W;j++){

if(shouldStop){
setUIRunningState(false);
return;
}

const curCell=document.getElementById(`cell-${i}-${j}`);

curCell.classList.add("cell-evaluating");

if(items[i-1].price<=j){

const include=dp[i-1][j-items[i-1].price]+items[i-1].value;
const exclude=dp[i-1][j];

dp[i][j]=Math.max(include,exclude);

}

else{

dp[i][j]=dp[i-1][j];

}

curCell.textContent=dp[i][j];

await sleep(getDelay());

curCell.classList.remove("cell-evaluating");

}

}

await backtrack(n,W);

setUIRunningState(false);

}



// BACKTRACK WITH TWO HIGHLIGHTS
async function backtrack(n,W){

let res = dp[n][W];
let w = W;

let picked = [];

for(let i=n;i>0 && res>0;i--){

if(shouldStop) return;

// highlight path cell
const pathCell = document.getElementById(`cell-${i}-${w}`);
pathCell.classList.add("cell-path");

await sleep(300);

if(res !== dp[i-1][w]){

// highlight selected item cell
pathCell.classList.add("cell-selected");

picked.push(items[i-1]);

res -= items[i-1].value;
w -= items[i-1].price;

const nextCell = document.getElementById(`cell-${i-1}-${w}`);

if(nextCell){
nextCell.classList.add("cell-path");
}

}

await sleep(300);

}

displayResults(picked);

}


// RESULT
function displayResults(pickedItems){

let totalCost=0;
let totalValue=0;

const chips=pickedItems.map(item=>{

totalCost+=item.price;
totalValue+=item.value;

return `<div class="picked-item-chip">${item.name}</div>`;

}).join('');

resultContent.innerHTML=`

<div class="result-cards">

<div class="stat-card">
<span class="stat-card-label">Items Picked</span>
<span class="stat-card-value">${pickedItems.length}</span>
</div>

<div class="stat-card">
<span class="stat-card-label">Total Cost</span>
<span class="stat-card-value">${totalCost}/${budget}</span>
</div>

<div class="stat-card optimal">
<span class="stat-card-label">Optimal Value</span>
<span class="stat-card-value">${totalValue}</span>
</div>

</div>

<div class="picked-items-list">
${pickedItems.length?chips:'<em>No items picked</em>'}
</div>

`;

}



// START
init();