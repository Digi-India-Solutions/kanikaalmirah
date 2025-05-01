"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import "./StatsCounter.css"

const StatsCounter = () => {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  // Stats counter animation
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    stores: 0,
    years: 0,
  })

  const finalStats = {
    customers: 1000,
    products: 1200,
    stores: 5,
    years: 15,
  }

  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000 // 2 seconds
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)

      let frame = 0
      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames

        setStats({
          customers: Math.floor(progress * finalStats.customers),
          products: Math.floor(progress * finalStats.products),
          stores: Math.floor(progress * finalStats.stores),
          years: Math.floor(progress * finalStats.years),
        })

        if (frame === totalFrames) {
          clearInterval(counter)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [isStatsInView])

  return (
    <section ref={statsRef} className="py-3">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <i className="bi bi-people stat-icon"></i>
            <div className="stat-value">{stats.customers.toLocaleString()}+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-card">
            <i className="bi bi-box-seam stat-icon"></i>
            <div className="stat-value">{stats.products.toLocaleString()}+</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat-card">
            <i className="bi bi-geo-alt stat-icon"></i>
            <div className="stat-value">{stats.stores}+</div>
            <div className="stat-label">Stores Nationwide</div>
          </div>
          <div className="stat-card">
            <i className="bi bi-award stat-icon"></i>
            <div className="stat-value">{stats.years}+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsCounter;
