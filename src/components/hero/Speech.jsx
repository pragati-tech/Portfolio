import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";

const Speech = () => {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            1000,
            "Let’s team up and glow up your brand with a fresh, modern website that stands out.",
            1000,
            "Ready to level up your brand? Let’s build a website that vibes and converts.",
            1000,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          // omitDeletionAnimation
          repeat={Infinity}
        />
      </div>
      <img src="/smallcircle.jpg" alt="" />
    </motion.div>
  );
};

export default Speech;
