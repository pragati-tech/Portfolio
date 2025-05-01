import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.png",
    title: "Astrovoice - Full Stack Application",
    desc: "An application offering personalized astrological insights and kundli generation. Users can explore horoscopes, gemstone guidance, and astrology blogs. It blends Vedic astrology with a modern, interactive UI for a seamless user experience.",
    link: "https://github.com/pragati-tech/Astrovoice",
  },
  {
    id: 2,
    img: "/p2.png",
    title: "SpendSmart - Finance Tracker",
    desc: "An application currently under development, designed to help users manage income, expenses, and savings. It will feature automated data entry, AI-powered financial advice, and smart saving strategies. The app is being built for a smooth and intelligent budgeting experience.",
    link: "",
  },
  {
    id: 3,
    video: "/p3.mp4",
    title: "Academia Veneria - Product Design",
    desc: "I design modern, user-centric interfaces focused on clarity, usability, and visual appeal. My work includes responsive web and mobile designs, wireframes, and interactive prototypes. Each design balances aesthetics with functionality to enhance user experience across platforms.",
    link: "https://pragati-tech.github.io/Academia-veneria/",
  }
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
   <motion.div
  variants={imgVariants}
  animate={isInView ? "animate" : "initial"}
  className="pImg"
>
  {item.video ? (
    <video width="100%" height="auto" autoPlay muted loop>
      <source src={item.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img src={item.img} alt={item.title} />
  )}
</motion.div>

      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>

      {/* Adjusted number of <section /> for 3 projects */}
      <section />
      <section />
      <section />

      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
