const game = document.querySelector("#game");
const setings = {
  range: 3,
  fields: [],
  currentPlayer: "x",
};
initGame();

function initGame() {
  const title = document.createElement("h1");
  title.textContent = "Крестики-нолики";
  title.classList.add("title");
  game.append(title);
  startButton();
}

function startButton() {
  let button = document.createElement("button");
  button.textContent = "Начать игру";
  button.classList.add("button-start");
  game.append(button);
  button.addEventListener("click", () => {
    let range = document.createElement("div");
    range.classList.add("range");
    game.append(range);
    for (let i = 0; i < setings.range; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      range.append(row);
      for (let k = 0; k < setings.range; k++) {
        const col = document.createElement("div");
        col.classList.add("col");
        row.append(col);
        setings.fields.push({ x: i, y: k });
      }
    }
    console.log(setings.fields);
    button.remove();
    startGame();
  });
}

function startGame() {
  const cols = document.querySelectorAll(".col");
  console.log(cols);
  cols.forEach((col, i, array) => {
    col.addEventListener("click", (event) => {
      console.log(col, i);
      const item = document.createElement("div");
      if (col.textContent !== "") return;
      item.textContent = setings.currentPlayer === "x" ? "x" : "o";
      item.classList.add("item");
      col.append(item);
      setings.fields[i] = { ...setings.fields[i], mark: setings.currentPlayer };
      setings.currentPlayer = setings.currentPlayer === "x" ? "o" : "x";
      checkGame();
    });
  });
}

function checkGame() {
  const first = setings.fields[0];
  const two = setings.fields[1];
  const tried = setings.fields[2];
  console.log(first, setings.fields);
  const set = setings.fields.filter(
    (field) => field.mark === "x" || field.mark === "o"
  );
  console.log(set);
}
