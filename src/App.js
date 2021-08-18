import { useState } from 'react'
import Board from './components/Board'
import { calculateWinner } from './utils/calculateWinner'

const App = () => {

  const [history, setHistory] = useState([{ board: Array(9).fill(null), isXNext: true }])
  const [currentMove, setCurrentMove] = useState(0)

  const current = history[currentMove]

  const winner = calculateWinner(current.board)

  const message = winner ? `Winner is ${winner}` : `Next player is ${current.isXNext ? 'X' : 'O'}`

  const handleSquareClick = (position) => {

    if (current.board[position] || winner) {
      return
    }

    const newBoard = current.board.map((value, pos) => {
      if (pos === position) {
        return current.isXNext ? 'X' : 'O'
      }
      return value
    })

    const newIsXNext = !current.isXNext

    setHistory(history.concat({ board: newBoard, isXNext: newIsXNext }))

    setCurrentMove(currentMove + 1)
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
