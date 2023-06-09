import './assets/scss/style.scss'

const game = document.querySelector('#game')
const setings = {
  range: 3,
  fields: [],
  currentPlayer: 'x',
  won: false
}

function resize() {
  const body = document.querySelector('body')
  const html = document.querySelector('html')
  const width = window.innerWidth
  const height = window.innerHeight
  if (width > height) {
    body.style.fontSize = '2.5vh'
    html.style.fontSize = '2.5vh'
  } else {
    body.style.fontSize = '2.5vw'
    html.style.fontSize = '2.5vw'
  }
}
resize()
window.addEventListener('resize', () => resize())

initGame()

function initGame() {
  game.insertAdjacentHTML(
    'beforeend',
    `
    <section id="main-page" class="screen">
      <h1 class="title">Крестики-нолики</h1>
      <button class="button-start">Начать игру</button>
    </section>
    `
  )
  const button = document.querySelector('.button-start')
  startButton(button)
}

function startButton(button) {
  button.addEventListener('click', () => {
    setings.fields = []
    setings.won = false
    const field = document.querySelector('.field')
    if (field) field.remove()
    const modal = document.querySelector('.modal-background')
    if (modal) modal.remove()
    createGame()
    startGame()
  })
}

function createGame() {
  const mainPage = document.querySelector('#main-page')
  const ggamePage = document.querySelector('#game-page')
  mainPage ? mainPage.remove() : ''
  ggamePage ? ggamePage.remove() : ''

  game.insertAdjacentHTML(
    'beforeend',
    `
    <section id="game-page" class="screen">
      <h1 class="title">Крестики-нолики</h1>
    </section>`
  )

  const gamePage = document.querySelector('#game-page')
  let field = document.createElement('div')
  field.classList.add('field')
  gamePage.append(field)
  for (let i = 0; i < setings.range; i++) {
    const row = document.createElement('div')
    row.classList.add('row')
    field.append(row)
    for (let k = 0; k < setings.range; k++) {
      const col = document.createElement('div')
      col.classList.add('col')
      row.append(col)
      setings.fields.push({ x: i, y: k })
    }
  }
}

function startGame() {
  const cols = document.querySelectorAll('.col')
  cols.forEach((col, i) => {
    col.addEventListener('click', () => {
      const item = document.createElement('div')
      if (col.textContent !== '' || setings.won === true) return
      item.textContent = setings.currentPlayer === 'x' ? 'x' : 'o'
      item.classList.add('item')
      const player = setings.currentPlayer === 'x' ? 'player-x' : 'player-o'
      col.classList.add(player)
      col.append(item)
      setings.fields[i] = { ...setings.fields[i], mark: setings.currentPlayer }
      setings.currentPlayer = setings.currentPlayer === 'x' ? 'o' : 'x'
      checkGame(setings.fields[i])
    })
  })
}

function AI() {
  const cols = document.querySelectorAll('.col')
  if (setings.won === false) return
  const emtys = cols.filter(col => col.textContent === '')
  console.log(emtys)
}

function checkGame(item) {
  const lengthX = setings.fields.filter(
    field => field.mark === item.mark && field.x === item.x
  )
  const lengthY = setings.fields.filter(
    field => field.mark === item.mark && field.y === item.y
  )
  const lengthZ1 = setings.fields.filter(
    field => field.mark === item.mark && field.y === field.x
  )
  const lengthZ2 = setings.fields.filter(
    field =>
      field.mark === item.mark &&
      ((field.x === 0 && field.y === 2) ||
        (field.x === 1 && field.y === 1) ||
        (field.x === 2 && field.y === 0))
  )

  if (
    lengthX.length === 3 ||
    lengthY.length === 3 ||
    lengthZ1.length === 3 ||
    lengthZ2.length === 3
  ) {
    combo(lengthX)
    combo(lengthY)
    combo(lengthZ1)
    combo(lengthZ2)
    setTimeout(() => {
      openModal(
        `Победил "${item.mark.toUpperCase()}"`,
        '<button class="button-start">Сыграть еще</button>'
      )
      const button = document.querySelector('.button-start')
      startButton(button)
    }, 1500)

    return
  }

  const lengthXYZ = setings.fields.filter(
    field => field.mark === 'x' || field.mark === 'o'
  )
  if (lengthXYZ.length === 9) {
    openModal(
      `Нет победителя`,
      '<button class="button-start">Сыграть еще</button>'
    )
    const button = document.querySelector('.button-start')
    startButton(button)
  }
}

function openModal(header, body) {
  const bodyTag = document.querySelector('body')
  bodyTag.insertAdjacentHTML(
    'beforeend',
    `
    <div class="modal-background">
      <div class="modal">
        <div class="modal-header">${header}</div>
        <div class="modal-body">${body}</div>
      </div>
    </div>
    `
  )
}
function combo(line) {
  if (line.length !== 3) return
  const cols = document.querySelectorAll('.col')
  line.forEach(item => {
    const index = setings.fields.indexOf(item)
    cols[index].firstElementChild.classList.add('strike')
  })
  setings.won = true
}
