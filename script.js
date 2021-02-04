let MOVES = 0
let board = [1,2,3,4,5,6,7,8,9]
const btns = document.querySelectorAll('.btn')

const xwin = document.querySelector('.x-win')
const owin = document.querySelector('.o-win')
const tie = document.querySelector('.tie')

const vertical = document.querySelector('.vertical')
const diagonal = document.querySelector('.diagonal')
const horizontal = document.querySelector('.horizontal')

const resetbtn = document.querySelector('.resetbtn')
const theme = document.querySelector('.theme')
const html = document.querySelector('html')

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let move = MOVES%2==0 ? 'X' : 'O'
        btn.innerHTML = move
        btn.disabled = true

        MOVES += 1

        board[btn.parentElement.id - 1] = move

        winner = checkWinner()
        if (winner[0]) {
            btns.forEach(btn => btn.disabled = true)
            if (move == 'O') {
                owin.style.right = '20px'
            } else {
                xwin.style.left = '20px'
            }

            resetbtn.parentElement.style.top = 10 +'%'

            switch(winner[1]) {
                case 'v':
                    vertical.style.height = '300px'
                    vertical.style.left = 50 + 100*winner[2] + 2*winner[2] +  'px' //2*i to accomodate border also
                    break
                
                case 'h':
                    horizontal.style.width = '300px'
                    horizontal.style.top = 50 + 100*(winner[2]/3) + 2*(winner[2]/3) +  'px'
                    break

                case 'd':
                    diagonal.style.height = '423px'
                    diagonal.style.left = winner[2]*50 + '%'
                    diagonal.style.transform = winner[2] == 0 ? 'rotate(-45deg)' : 'rotate(45deg)'

                default:
                    break
            }
            
        } else if (MOVES == 9) {
            tie.style.bottom = 3 + '%'
            resetbtn.parentElement.style.top = 10 +'%'
        }
    })
})

resetbtn.addEventListener('click', resetGame)

theme.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        theme.innerHTML = '<i class="far fa-moon"></i>'
    } else {
        html.classList.add('dark')
        theme.innerHTML = '<i class="far fa-sun"></i>'
    }
})

function checkWinner() {
    //Vertical Check
    for (i = 0; i<=2; i++) {
        if (board[i] == board[i+3] && board[i+3] == board[i+6]) {
            return [true, 'v', i]
        }
    }

    //Horizontal Check
    for (i = 0; i<=6; i+=3) {
        if (board[i] == board[i+1] && board[i+1] == board[i+2]) {
            return [true, 'h', i]
        }
    }

    //Diagonal Check 
    if (board[0] == board[4] && board[4] == board[8]) {
        return [true, 'd', 0]
    }

    if (board[2] == board[4] && board[4] == board[6]) {
        return [true, 'd', 2]
    }
    
    return [false]
}

function resetGame() {
    btns.forEach(btn => {
        btn.disabled = false
        btn.innerHTML = ''
    })

    vertical.style.height = 0 + 'px'
    horizontal.style.width = 0 + 'px'
    diagonal.style.height = 0 + 'px'

    resetbtn.parentElement.style.top = -10 + '%'
    xwin.style.left = -100 + 'vw'
    owin.style.right = -100 + 'vw'
    tie.style.bottom = -100 + 'vh'

    board = [1,2,3,4,5,6,7,8,9]
    MOVES = 0
}