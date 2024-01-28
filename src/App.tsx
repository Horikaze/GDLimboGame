import { useState } from "react";
import Key from "./components/Key";
import { possiblePositions } from "./components/keysPositions";

function App() {
  const [keysPos, setKeyPost] = useState(possiblePositions);
  const [shuffelSpeed, setShuffelSpeed] = useState(220);
  const [shuffelTimes, setShuffelTimes] = useState(10);
  const [status, setStatus] = useState("-");
  const [isCorrectVisible, setIsCorrectVisible] = useState(true);
  const shuffle = () => {
    setKeyPost((prev) => {
      // Create a copy of the array
      const shuffledArray = [...prev];

      // Perform the shuffle using a Fisher-Yates algorithm
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    });
  };
  const shuffleNTimes = async () => {
    setIsCorrectVisible(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsCorrectVisible(false);

    for (let i = 0; i < shuffelTimes; i++) {
      shuffle();
      await new Promise((resolve) => setTimeout(resolve, shuffelSpeed));
    }
  };
  const handleKeyClick = (idx: number) => {
    if (idx === 0) {
      setStatus("WIN");
      setIsCorrectVisible(true);
      return;
    }
    setStatus("LOSE");
    setIsCorrectVisible(true);
  };
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="h-[600px] w-[400px] bg-slate-500 rounded-3xl">
          {keysPos.map((item, idx) => (
            <Key
              key={idx}
              initialIndex={idx}
              y={item.y}
              x={item.x}
              keyClick={handleKeyClick}
              isCorrectVisible={isCorrectVisible}
            />
          ))}
        </div>
        <button
          onClick={() => {
            shuffleNTimes();
          }}
          className="border font-semibold py-2 px-3 m-2 rounded-lg bg-yellow-300 border-green-700
          
          "
        >
          shuffle
        </button>
        <p className="text-3xl font-semibold text-yellow-300">{status}</p>
      </div>
    </>
  );
}

export default App;
