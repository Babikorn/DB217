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

}

function calCombination() {
  const c = combSize.value;
  // Calculate the number of combinations (amount)

  combSizeLabel.innerHTML = c;
  amountComb.innerHTML = amount.toLocaleString("th-TH");
  combId.setAttribute("max", amount);
  combId.value = amount;
  combIdLabel.innerHTML = amount;
  calPermutation();
  selectCombination();
}

function selectCombination() {
  combination = [];
  const id = combId.value;
  const c = +combSize.value;
  combIdLabel.innerHTML = id;
  let limit = 52 - c + 1;
  let remain = id - 1;
  const cards = deck.deal();
  let choices = cards.slice(0, limit - 1);
  for (let i = 0; i < c; i++) {
    choices = choices.reduce((prev, curr) => {
      if (!combination.includes(curr)) prev.push(curr);
      return prev;
    }, []);
    choices.push(cards[limit - 1 + i]);
    if (i == c - 1) {
      combination[i] = choices[remain];
    } else {
      const part = limit ** (c - 1 - i);
      combination[i] = choices[Math.floor(remain / part)];
      remain = remain % part;
    }
  }
  selectPermutation();
}

function calPermutation() {
  const n = combSize.value;
  // Calculate the permutation value (maxPermId)

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
    // Remove the "is-invalid" class from the permutation ID input

    // Clear the permutation area

    // Create an array of cards from the combination

    let remain = id - 1n;
    for (let i = 1; i < n; i++) {
      // Calculate (n-i)! (nfact)

      // Calculate the index of the card to display (index)

      // Get the card to display (card)

      // Display the card

      // Remove the displayed card from the array

      // Calculate the remaining ID
      remain = remain % nfact;
    }
    // Get the last card to display
    const card = cards[remain];
    // Display the last card
    permutationArea.innerHTML += `<div class="deck-card m${card.mark} ${card.suite}"></div>`;
  } else {
    // Add the "is-invalid" class to the permutation ID input

  }
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
