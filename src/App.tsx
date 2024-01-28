import { useState } from "react";
import Key from "./components/Key";
import { possiblePositions } from "./components/keysPositions";

function App() {
  const [keysPos, setKeyPost] = useState(possiblePositions);

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
  const shuffleNTimes = async (n: number) => {
    for (let i = 0; i < n; i++) {
      shuffle();
      console.log("xddd");
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  };
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="h-[600px] w-[400px] bg-slate-500">
          {keysPos.map((item, idx) => (
            <Key key={idx} initialIndex={idx} y={item.y} x={item.x} />
          ))}
        </div>
        <button
          onClick={() => {
            shuffleNTimes(5);
          }}
        >
          shuffle
        </button>
      </div>
    </>
  );
}

export default App;
