import { useState } from 'react'
import Board from './components/Board'
import History from './components/History'
import StatusMessage from './components/StatusMessage'
import { calculateWinner } from './utils/calculateWinner'

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }]

const App = () => {

  const [history, setHistory] = useState(NEW_GAME)
  const [currentMove, setCurrentMove] = useState(0)

  const current = history[currentMove]

  const { winner, winningSqaures } = calculateWinner(current.board)

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

  const moveTo = (move) => {
    setCurrentMove(move)
  }

  const onNewGame = () => {
    setHistory(NEW_GAME)
    setCurrentMove(0)
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <StatusMessage winner={winner} current={current} />
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSqaures={winningSqaures} />
      <button type="button" onClick={onNewGame}>Start New Game</button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
