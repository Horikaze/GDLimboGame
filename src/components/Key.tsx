import { motion } from "framer-motion";
type KeyProps = {
  initialIndex: number;
  x: number;
  y: number;
};
export default function Key({ x, y, initialIndex }: KeyProps) {
  return (
    <motion.div
      animate={{ x, y }}
      className="w-[0px] h-[0px] bg-yellow-200"
      transition={{ bounce: 1 }}
    >
      <div className="w-10 h-10 bg-sky-100 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <p className="">{initialIndex + 1}</p>
      </div>
    </motion.div>
  );
}
