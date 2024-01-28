import { motion } from "framer-motion";
type KeyProps = {
  initialIndex: number;
  x: number;
  y: number;
  keyClick: (keyIdx: number) => void;
  isCorrectVisible: boolean;
};
export default function Key({
  x,
  y,
  keyClick,
  initialIndex,
  isCorrectVisible,
}: KeyProps) {
  return (
    <motion.div
      animate={{ x, y }}
      className="w-[0px] h-[0px] bg-yellow-200 cursor-pointer group"
      transition={{ bounce: 1 }}
      onClick={() => {
        keyClick(initialIndex);
      }}
    >
      <div
        className={`w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          initialIndex === 0 && isCorrectVisible ? "keyShadow" : ""
        }`}
      >
        <img
          src="/KeyImage.png"
          alt="key"
          className="group-hover:scale-125 transition-all"
        />
      </div>
    </motion.div>
  );
}
