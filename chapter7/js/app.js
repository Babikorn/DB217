class Deck {
  #cards = [];

  constructor() {
    const suites = "spade,heart,club,diamond".split(",");
    const marks = "A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
    for (let s of suites) {
      for (let m of marks) {
        this.#cards.push({ mark: m, suite: s });
      }
    }
  }

  deal() {
    return Array.from(this.#cards);
  }

  shuffle() {
    this.#cards.sort((a, b) => Math.random() - 0.5);
  }
}

function doDeal() {
  deck_area.innerHTML = "";
  for (let card of deck.deal()) {
    deck_area.innerHTML += `<div class="deck-card m${card.mark} ${card.suite}"></div>`;
  }
}

function doShuffle() {
  deck.shuffle();
  doDeal();
}

function doReset() {
  deck = new Deck();
  doDeal();
}

function factorial(n) {
  // base case คือปัญหาที่เล็กที่สุดเช่น factorial n!= 0
  // if คือถ้า (n == 0) คือถ้า n=0 ให้ {return 1;} ให้ส่ง1ออกมา
if (n == 0) {
  //ที่ return 1n ต้องเติมnเพราะjs. มีbigINT สามารถมี0ได้มากมาย
  return 1n;
}
  // ถ้าทำreturnเสร็จคือจบฟังชั่น ต่อให้มีคำสั่งต่อในวงเล็บก็ไม่ทำงานเพราะจบ
  // recursive step
  // ถ้าแก้ปัญหาขนาดใหญ่ให้ใช้BigInt ***อย่าลืมใส่ข้างหลัง(n)  *factorialคือเอาไปคูณและ (n-1); คือเอาไป-1ต่อ 
return BigInt(n) * factorial(n - 1);
}

function calCombination() {
  const r = combSize.value;
  // Calculate the number of combinations (amount)
  //ตัวอย่างหา1ใบจะได้51วิธี ถ้าหา2ใบจะได้ 51*52 เพราะหยิบไพ่1ใบเหลือ51ใบเลยนำ 51*52
  //const amout คือค่าคงที่ = factorial(52)คือจำนวนไพ่ / หาร (factorrial(r) * factorial(52-r)); คือเอา52ไปลบกับ2ต่อและค่อยคูณ 
const amount = factorial(52) / (factorial(r) * factorial(52 - r));
  combSizeLabel.innerHTML = r;
  amountComb.innerHTML = amount.toLocaleString("th-TH");
  combId.setAttribute("max", amount); 
  combId.value = amount;
  combIdLabel.innerHTML = amount;
  calPermutation();
  selectCombination();
}
//คำสั่งไปเรื่อยๆไม่มีการย้อนกลับ
function selectCombination() {
  combination = [];
  const id = combId.value;
  const c = +combSize.value;
  combIdLabel.innerHTML = id;
  const cards = deck.deal();
  pickCombinationCard(cards, c, BigInt(id - 1));
  selectPermutation();
}

function pickCombinationCard(cards, c, id) {
  // base case คือปัญหาที่แก้ง่ายที่สุด if(c == 1) คือเลือกมา1ใบ
  //combination คืออาเร ต้องใช้.pushเพื่อส่งidเข้าไป
if(c == 1){
combination.push(cards[id]);
return;
}
  // recursive step
  
  const restC = c - 1;
  let restN = cards.length - 1;
  let restFact = factorial(restN) /
  (factorial(restC) * factorial (restN - restC));
  let index = 0;
  while(restFact <= id) {
index++;
restN--;
id -=restFact;
restFact = factorial(restN) /
(factorial(restC) * factorial(restN - restC));
  }
  combination.push(cards[index]);
  pickCombinationCard(cards.slice(index+1),
  c - 1,
  id
  );
}

function calPermutation() {
  const n = combSize.value;
  // Calculate the permutation value (maxPermId)
  //อันนี้คือคำสั่งfactorial เช่น 5! 5*4*3*2*1
  maxPermId = factorial(n);
  permSizeLabel.innerHTML = n;
  amountPerm.innerHTML = maxPermId.toLocaleString("th-TH");
  permId.value = maxPermId;
  maxPermIdLabel.innerHTML = maxPermId;
}

function selectPermutation() {
  const n = combSize.value;
  let id = permId.value;
  permIdLabel.innerHTML = id;
  if (Number.isInteger(+id) && (id = BigInt(id)) >= 1n && id <= maxPermId) {
    permId.classList.remove("is-invalid");
    permutationArea.innerHTML = "";
    const cards = Array.from(combination);
    pickPermutationCard(cards, id - 1n);
  } else {
    permId.classList.add("is-invalid");
  }
}

function pickPermutationCard(cards, id) {
  // base case
  // cards.length == 1 คือกรณีที่ไพ่เหลือใบสุดท้ายหรือเหลือใบเดียว
if (cards.length == 1) {
  const card = cards[0];
  permutationArea.innerHTML += 
  `<div class="deck-card ${card.suite} `+`
  m${card.mark}"></div>`;
  return;
}

  // recursive case
const setSize = factorial(cards.length - 1);
const index = id / setSize;
const card = cards [index];
permutationArea.innerHTML +=
`<div class="deck-card ${card.suite}`
+` m${card.mark}"></div>`
cards.splice(Number(index), 1 );
pickPermutationCard(cards , id % setSize);

}

let deck = new Deck();
let combination = [];
let maxPermId;
const deck_area = document.getElementById("deck-area");
const combSizeLabel = document.getElementById("comb_size_label");
const combSize = document.getElementById("comb_size");
const amountComb = document.getElementById("amount_comb");
const combId = document.getElementById("comb_id");
const combIdLabel = document.getElementById("comb_id_label");
const permSizeLabel = document.getElementById("perm_size_label");
const amountPerm = document.getElementById("amount_perm");
const permId = document.getElementById("perm_id");
const permIdLabel = document.getElementById("perm_id_label");
const maxPermIdLabel = document.getElementById("max_perm_id_label");
const permutationArea = document.getElementById("permutation_area");
doDeal();
calCombination();
