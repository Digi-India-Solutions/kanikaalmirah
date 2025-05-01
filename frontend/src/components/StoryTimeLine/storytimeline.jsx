"use client";

import { motion } from "framer-motion";
import "./StoryTimeline.css";

const StoryTimeline = () => {
  // Company timeline data
  const timeline = [
    {
      year: "2009",
      title: "Our Beginning",
      description:
        "Founded with a vision to revolutionize home storage solutions with premium quality steel almirahs.",
    },
    {
      year: "2012",
      title: "Expansion Phase",
      description:
        "Opened our first flagship showroom and expanded product line to include customized wardrobes.",
    },
    {
      year: "2015",
      title: "Innovation Era",
      description:
        "Introduced smart storage solutions with integrated technology and security features.",
    },
    {
      year: "2018",
      title: "National Presence",
      description:
        "Expanded to 15 cities across the country with 20+ exclusive showrooms.",
    },
    {
      year: "2023",
      title: "Global Recognition",
      description:
        "Received international design awards and began exports to neighboring countries.",
    },
  ];

  return (
    <section className="story-section">
      <div className="container">
       
        <div className="story-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From humble beginnings to becoming India's premier steel almirah
            manufacturer
          </motion.p>
        </div>

        <div className="timeline">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-content">
                <div className="year">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line" />
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;
