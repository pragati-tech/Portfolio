import { useEffect, useRef } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
    img: "/Project2.jpg",
    title: "Khandelwal's Firm - Freelance Project",
    desc: "Developed and delivered the website focusing on a clean UI, responsive design, and seamless user experience. This work reflects my ability to combine technical skills with client collaboration to create impactful digital solutions.",
    link: "https://www.kektpl.in",
  },
  {
    id: 3,
    video: "/p3.mp4",
    title: "Academia Veneria - Product Design",
    desc: "I design modern, user-centric interfaces focused on clarity, usability, and visual appeal. Includes responsive web and mobile designs, wireframes, and prototypes, balancing aesthetics with functionality.",
    link: "https://pragati-tech.github.io/Academia-veneria/",
  },
  {
    id: 4,
    img: "/Project4.png",
    title: "Neoteric UI - Product Design",
    desc: "Modern, user-centric UI design work, blending wireframes, prototypes, and responsive designs to enhance usability and aesthetics across devices.",
    link: "https://pragati-tech.github.io/Academia-veneria/",
  },
  {
    id: 5,
    img: "/Project5.jpg ",
    title: "LightVue Website - Product Design",
    desc: "LightVue is one of the most emerging UI Component Library that hands out everything you need to create modern, engaging and responsive web applications. LightVue is specifically designed for both Vue3.x and Vue2.x and offers unlimited customizations natively.",
    link: "https://lightvue.org/",
  },
];

const imgVariants = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

const textVariants = {
  initial: { x: 200, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
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
        <motion.h1>{item.title}</motion.h1>
        <motion.p>{item.desc}</motion.p>
        <motion.a target="_blank" href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const ref = useRef(null);

  // Track scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Divide circle into equal steps (for 5 projects)
  const stepProgress = useTransform(scrollYProgress, (latest) => {
    const steps = items.length;
    const step = 1 / steps;
    return Math.min(Math.ceil(latest / step) * step, 1);
  });

  return (
    <div className="portfolio" ref={ref}>
      {items.map((item) => (
        <section key={item.id} className="fullSection">
          <ListItem item={item} />
        </section>
      ))}

      {/* Circle Progress */}
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
            style={{ pathLength: stepProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
