import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const generateBoard = (size: number) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

const checkForWin = (board: any[][]) => {
   //horizontal win
   for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size == 1 && !rowSet.has(undefined)) {
      return true;
    }
   }
   //vertical win
   for (let row = 0; row < board.length; row++) {
    const colSet = new Set();
    for (let col = 0; col < board.length; col++) {
      colSet.add(board[col][row]);
    }
    if (colSet.size == 1 && !colSet.has(undefined)) {
      return true;
    }
   }
   //diagonal win
   const diagSet = new Set();
   for (let row = 0; row < board.length; row++) {
    diagSet.add(board[row][row]);
   }
   if (diagSet.size == 1 &&!diagSet.has(undefined)) {
    return true;
   }
}

 const isBoardFull = (board: any[][]) => {
    return board.every((row) => row.every((cell) => cell !== undefined));
 }
 type Player = "X" | "O";

const Tictactoe = () => {
  const [board, setBoard] = useState(generateBoard(3));
  const [player, setPlayer] = useState<Player>("X");
  const [score, setScore] = useState({ X: 0, O: 0 });

  const resetBoard = () => {
    setBoard(generateBoard(3));
  }
  
  
  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== undefined) {
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = player;
    setBoard(newBoard);
    if(checkForWin(board)){
       toast.success("Player " + player + " Wins!");
       setScore({...score, [player]: score[player] + 1});
       resetBoard();
    } else  if (isBoardFull(board)) {
        toast.error("It's a draw!");
        resetBoard();
    } else {
        setPlayer(player === "X"? "O" : "X");
    }
  };

  return (
    <div>
        <div
        style={{display: "flex", flexDirection: "column"}}
        >
            <h2 style={{ marginBottom: "-2px" }}>Score</h2>
            <p style={{ fontWeight: "bold", marginBottom: "-2px"}}>Player X: {score.X}</p>
            <p style={{ fontWeight: "bold"}}>Player O: {score.O}</p>
        </div>
      {board.map((row, r) => {
        return (
          <div 
          key={r}
          style={{
            display: "flex",
            border: "solid black 1px",
          }}
          >
            {row.map((cell, c) => {
              return (
                <div
                  key={c}
                  onClick={() => handleClick(r, c)}
                  style={{
                    border: "solid black 1px",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
      <div
       style={{
        marginTop: "10px"
       }}
      >
        <Link to="/" className="link">
          Go to Homepage
        </Link>
      </div>
      <Toaster position='top-right' />
    </div>
  );
};

export default Tictactoe;
