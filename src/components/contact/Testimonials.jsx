import "./Testimonials.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "",
    role: "Khandelwal Firms",
    feedback:
      "I had a great experience working with her on my website. She was patient, attentive to my requirements, and ensured she fully understood my vision. Her dedication and commitment stood out, and I’m very happy with the final result.",
  },
  {
    id: 2,
    name: "",
    role: "Neoteric UI",
    feedback:
      "Pragati did an excellent job designing our website’s UI. She understood our requirements well and delivered exactly what we envisioned. Her creativity and attention to detail made the collaboration seamless.",
  },
  {
    id: 3,
    name: "",
    role: "DIGI-K Labs",
    feedback:
      "Pragati delivered modular JavaScript components and mobile-ready UI with great efficiency. She was sincere, detail-oriented, and solved complex problems with ease. Her communication and coordination skills made the collaboration seamless.",
  },
  {
    id: 4,
    name: "",
    role: "VeriSpring Engineering Solutions",
    feedback:
      "Pragati did an excellent job creating our newsletter and graphic designs. She quickly understood our requirements and delivered creative, high-quality work on time. Her attention to detail and design sense added real value to our brand.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  // Auto-play every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="testimonials">
      <h1 className="tTitle">What My Clients Say!!</h1>

      <div className="carousel">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={testimonials[index].id}
            className="testimonialCard"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.6 }}
          >
            <p className="tFeedback">“{testimonials[index].feedback}”</p>
            <h3 className="tName">{testimonials[index].name}</h3>
            <span className="tRole">{testimonials[index].role}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="controls">
        <button onClick={handlePrev}>◀</button>
        <button onClick={handleNext}>▶</button>
      </div>

      <div className="dots">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
