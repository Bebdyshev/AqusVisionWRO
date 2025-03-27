import React from "react";
import './Home.css';

function Home() {
  return (
    <div className="allfather">
      <div className="homepage">
        <div className="hero-section">
          <h1 className="main-title">
            Welcome to the <span className="highlight">AI-Powered Environmental Monitoring System</span>
          </h1>
          <p className="subtitle">Advanced AI technology for river monitoring, flood prediction, and fire spread forecasting</p>
        </div>

        <div className="features-grid">
          <div className="feature-card water-buoy">
            <div className="feature-icon water-icon">
              <svg className="buoy-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10" 
                      fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 20 C65 20, 80 35, 80 50 C80 65, 65 80, 50 80 C35 80, 20 65, 20 50 C20 35, 35 20, 50 20" 
                      fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 30 C60 30, 70 40, 70 50 C70 60, 60 70, 50 70 C40 70, 30 60, 30 50 C30 40, 40 30, 50 30" 
                      fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="50" cy="50" r="10" fill="currentColor"/>
                <path d="M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="feature-content">
              <h2 className="feature-title">River Monitoring System</h2>
              <p className="feature-text">
                Real-time monitoring system equipped with advanced sensors for temperature, pH, pressure, and water levels. 
                Provides continuous data collection and analysis for comprehensive river health assessment.
              </p>
            </div>
          </div>

          <div className="feature-card flood-buoy">
            <div className="feature-icon flood-icon">
              <svg className="flood-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 90 L90 90 L80 70 L20 70 Z" fill="currentColor"/>
                <path d="M20 70 L80 70 L70 50 L30 50 Z" fill="currentColor"/>
                <path d="M30 50 L70 50 L60 30 L40 30 Z" fill="currentColor"/>
                <path d="M40 30 L60 30 L50 10 L50 10 Z" fill="currentColor"/>
                <circle cx="50" cy="50" r="5" fill="currentColor"/>
              </svg>
            </div>
            <div className="feature-content">
              <h2 className="feature-title">AI Flood Prediction</h2>
              <p className="feature-text">
                Advanced AI system combining GAN for realistic satellite imagery of flooded areas and GRU neural networks 
                for precise 10-day water level predictions. Enables accurate flood forecasting and early warning systems.
              </p>
            </div>
          </div>

          <div className="feature-card fire-buoy">
            <div className="feature-icon fire-icon">
              <svg className="fire-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 90 L30 60 L50 40 L70 60 Z" fill="currentColor"/>
                <path d="M50 40 L30 20 L50 0 L70 20 Z" fill="currentColor"/>
                <path d="M50 0 L30 20 L50 40 L70 20 Z" fill="currentColor"/>
                <circle cx="50" cy="50" r="5" fill="currentColor"/>
              </svg>
            </div>
            <div className="feature-content">
              <h2 className="feature-title">AI Fire Spread Forecasting</h2>
              <p className="feature-text">
                CNN AutoEncoder-based system for accurate fire spread prediction. Analyzes environmental conditions, 
                terrain data, and historical patterns to forecast wildfire behavior and help emergency services 
                prepare effective response strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
