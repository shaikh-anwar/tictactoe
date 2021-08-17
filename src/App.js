import { useState } from 'react'
import Board from './components/Board'
import { calculateWinner } from './utils/calculateWinner'

const App = () => {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(false)

  const winner = calculateWinner(board)

  const message = winner ? `Winner is ${winner}` : `Next player is ${isXNext ? 'X' : 'O'}`

  const handleSquareClick = (position) => {

    if (board[position] || winner) {
      return
    }

    setBoard(board.map((value, pos) => {
      if (pos === position) {
        return isXNext ? 'X' : 'O'
      }
      return value
    }))
    setIsXNext(!isXNext)
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>{message}</h2>
      <Board board={board} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
