import { useEffect, useRef, useState } from "react";
import Key from "./components/Key";
import { possiblePositions } from "./components/keysPositions";

function App() {
  const [keysPos, setKeyPost] = useState(possiblePositions);
  const [shuffelSpeed, setShuffelSpeed] = useState(300);
  const [shuffelTimes, setShuffelTimes] = useState(31);
  const [status, setStatus] = useState("-");
  const [isCorrectVisible, setIsCorrectVisible] = useState(true);
  const [isAudio, setIsAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    audioRef.current!.volume = 0.1;
  }, []);
  const shuffle = () => {
    setKeyPost((prev) => {
      const shuffledArray = [...prev];
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
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setStatus("-");
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
      <div
        className="fixed flex justify-center px-2 py-1 items-center rounded-l-xl font-semibold top-0 right-0 cursor-pointer bg-yellow-400 z-30"
        onClick={() => {
          setIsAudio((prev) => !prev);
        }}
      >
        Audio {isAudio ? "ON" : "OFF"}
      </div>
      <audio ref={audioRef} src={isAudio ? "limbo.mp3" : ""} />

      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="h-[600px] w-[400px] bg-slate-300">
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
          Start
        </button>
        <p className="text-3xl font-semibold text-yellow-300">{status}</p>
      </div>
    </>
  );
}

export default App;
