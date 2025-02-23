'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

const slides = [
  {
    number: '01',
    name: 'Fechzo',
    image: '/fechzo.png',
    categories: ['E-COMMERCE'],
    description: 'A robust e-commerce platform',
    extraContent: (
      <>
        <p>Fechzo is built to handle thousands of transactions per minute.</p>
        <ul>
          <li>Feature-rich dashboard</li>
          <li>Secure payment integration</li>
          <li>User-friendly design</li>
        </ul>
      </>
    ),
  },
  {
    number: '02',
    name: 'Mr.Monitor',
    image: '/mr-monitor.png',
    categories: ['B2B', 'ERP'],
    description: 'An advanced ERP solution tailored for B2B businesses',
    extraContent: (
      <>
        <p>Mr.Monitor optimizes business operations and provides real-time analytics.</p>
        <ul>
          <li>Inventory tracking</li>
          <li>Data visualization tools</li>
          <li>Customizable reporting</li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    name: 'Akashkrish Toyota',
    image: '/toyota.png',
    categories: ['AUTOMATIVE'],
    description: 'A comprehensive web platform for Akashkrish Toyota',
    extraContent: (
      <>
        <p>This platform offers an interactive vehicle configurator and seamless scheduling system.</p>
        <ul>
          <li>360° vehicle views</li>
          <li>Service booking</li>
          <li>Dealer locator</li>
        </ul>
      </>
    ),
  },
  {
    number: '04',
    name: 'Mr.Solver',
    image: '/mr_solver.png',
    categories: ['CUSTOMER SUPPORT'],
    description: 'An efficient platform for customers to report and track issues in real-time.',
    extraContent: (
      <>
        <p>Mr.Solver helps streamline support operations with ticket tracking and AI assistance.</p>
        <ul>
          <li>Live chat support</li>
          <li>Automated ticket routing</li>
          <li>Detailed analytics</li>
        </ul>
      </>
    ),
  },
];


export default function Proj2() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isWorkExpanded, setIsWorkExpanded] = useState(false);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [isSliderIn, setIsSliderIn] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(1178); // Adjusted to new initial position
  const [isDragging, setIsDragging] = useState(false);
  const [initX, setInitX] = useState(0);
  const [endPosition, setEndPosition] = useState(1178); // Adjusted to new initial end position
  const [currentIndex, setCurrentIndex] = useState(0); // Start at index 0

  const sliderRef = useRef(null);

  // Mouse speed demo for slider rotation
  useEffect(() => {
    let lastMouseX = -1, lastMouseY = -1, lastMouseTime, mouseTravel = 0, direction = '+';
    const mRefreshInterval = 30;

    const handleMouseMove = (e) => {
      const mouseX = e.pageX, mouseY = e.pageY;
      if (lastMouseX > -1) {
        mouseTravel += Math.max(Math.abs(mouseX - lastMouseX), Math.abs(mouseY - lastMouseY));
      }
      direction = mouseX - lastMouseX > 0 ? '+' : '-';
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const mDraw = () => {
      const now = Date.now();
      if (lastMouseTime && lastMouseTime !== now) {
        const pps = Math.round(mouseTravel / (now - lastMouseTime) * 1000);
        mouseTravel = 0;
        if (isDragging) {
          const velocity = 0.5 - (pps / 40000);
          document.querySelectorAll(`.${styles.slider_inner__slide}`).forEach((el) => {
            el.style.transform = `rotateY(${direction}${pps / 110}deg) scale(1)`;
            el.style.transition = `all ${velocity}s`;
          });
        }
      }
      lastMouseTime = now;
      setTimeout(mDraw, mRefreshInterval);
    };

    document.addEventListener('mousemove', handleMouseMove);
    setTimeout(mDraw, mRefreshInterval);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

  // Slider dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitX(e.clientX);
    setEndPosition(sliderPosition);
    // Removed custom cursor logic
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const difference = e.clientX - initX;
      setSliderPosition(difference + endPosition);
      const opacity = 1 - Math.abs(difference / 200);
      document.querySelectorAll(
        `.${styles.slider_inner__slide}:nth-of-type(${currentIndex + 1}) .${styles.image} .${styles.overlay}, 
         .${styles.slider_inner__slide}:nth-of-type(${currentIndex + 1}) .${styles.image} .${styles.title}, 
         .${styles.slider_inner__slide}:nth-of-type(${currentIndex + 1}) .${styles.image} .${styles.cats}, 
         .${styles.slider_inner__slide}:nth-of-type(${currentIndex + 1}) .${styles.image} .${styles.button}`
      ).forEach((el) => {
        el.style.opacity = opacity;
        el.style.transition = 'all .2s';
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const difference = sliderPosition - endPosition;
    let newIndex = currentIndex;

    if (difference < -160 && newIndex < slides.length - 1) {
      newIndex++;
    } else if (difference > 160 && newIndex > 0) {
      newIndex--;
    }

    // Uniform snap positions with 760px intervals, 4th slide at -1150px
    const snapPositions = [1178, 418, -342, -1102]; // Moved 50px to the right
    const threshold = snapPositions[newIndex];
    setSliderPosition(threshold);
    setEndPosition(threshold);
    setCurrentIndex(newIndex);

    document.querySelectorAll(
      `.${styles.slider_inner__slide}:nth-of-type(${newIndex + 1}) .${styles.image} .${styles.overlay}, 
       .${styles.slider_inner__slide}:nth-of-type(${newIndex + 1}) .${styles.image} .${styles.title}, 
       .${styles.slider_inner__slide}:nth-of-type(${newIndex + 1}) .${styles.image} .${styles.cats}, 
       .${styles.slider_inner__slide}:nth-of-type(${newIndex + 1}) .${styles.image} .${styles.button}`
    ).forEach((el) => (el.style.opacity = 1));
    document.querySelectorAll(`.${styles.slider_inner__slide}`).forEach((el) => {
      el.style.transform = 'rotateY(0deg) scale(1)';
    });
    document.querySelectorAll(`.${styles.slideClone}`).forEach((el) => (el.style.display = 'none'));
    const activeClone = document.querySelector(`.${styles.slideClone}:nth-of-type(${newIndex + 1})`);
    if (activeClone) activeClone.style.display = 'block';
  };

  // Trigger click handler
  const handleTriggerClick = () => {
    setIsPortfolioOpen(true);
    setIsSliderIn(true);
    setTimeout(() => sliderRef.current?.click(), 500);
  };

  // Button click to expand work
  const handleButtonClick = () => {
    setIsWorkExpanded(true);

    // Start fade-in effect before showing extra content
    setTimeout(() => {
      setIsFadingIn(true);
      setShowExtraContent(true);
    }, 700); // Slight delay before appearing
  };


  // Back button to collapse work and return to slider
  const handleBackClick = () => {
    setIsFadingIn(false); // Start fade-out effect

    // Wait for fade-out to complete before hiding content
    setTimeout(() => {
      setShowExtraContent(false);
      setIsWorkExpanded(false);
    }, 300); // Match CSS animation duration
  };


  // Initial slider centering
  useEffect(() => {
    setSliderPosition(1180); // Set on mount
    setEndPosition(1180);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTriggerClick();
    }, 3000); // 3 seconds delay
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <>
      <div className={styles.portfolio}>
        <div className={styles.portfolio_home}>
          <div className={styles.portfolio_home__title}>
            <div className={styles.logo}>
              <div className={`${styles.page_portfolio} ${isPortfolioOpen ? styles.open : ''}`}>
                <div className={styles.slider_note}>Drag through our work</div>
                {/* Back button appears only when work is expanded */}
                {isWorkExpanded && (
                  <button className={styles.backButton} onClick={handleBackClick}>
                    Back
                  </button>
                )}
                <div className={`${styles.portfolio_home__work} ${isWorkExpanded ? styles.expand : ''}`}>
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={styles.slideClone}
                      style={{ display: currentIndex === index ? 'block' : 'none' }}
                    >
                      <div className={`${styles.title} ${styles.f}`}>
                        {`.${slide.number}`} <br /> {slide.name}
                      </div>
                      <div className={styles.image}>
                        <img src={slide.image} alt={slide.name} draggable="false" />
                        <div className={styles.overlay}></div>
                        <div className={styles.cats}>{slide.categories.join('   ')}</div>
                        <div className={styles.title}>{slide.description}</div>

                        {/* Render unique extra content when work is expanded */}
                        {showExtraContent && (
                          <div className={`${styles.additionalContent} ${isFadingIn ? styles.fadeIn : styles.fadeOut}`}>
                            {slide.extraContent}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  &darr;
                </div>
                <div className={styles.portfolio_home__slider}>
                  <div
                    ref={sliderRef}
                    className={`${styles.slider_inner} ${isSliderIn ? styles.in : ''}`}
                    style={{ transform: `translateX(${sliderPosition}px) translateY(120px)` }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onClick={() => {
                      document.querySelectorAll(`.${styles.slider_inner__slide}`).forEach((el) => {
                        el.style.animation = 'none';
                        el.style.transform = 'rotateY(0deg) scale(1)';
                      });
                    }}
                  >
                    {slides.map((slide, index) => (
                      <div key={index} className={styles.slider_inner__slide}>
                        <div className={styles.title}>
                          {`.${slide.number}`} <br /> {slide.name}
                        </div>
                        <div className={styles.image}>
                          <img src={slide.image} alt={slide.name} draggable="false" />
                          <div className={styles.overlay}></div>
                          <div className={styles.cats}>{slide.categories.join('   ')}</div>
                          <div className={styles.title}>{slide.description}</div>
                          <div className={`${styles.button} ${styles.customCaseStudy}`} onClick={handleButtonClick}>
                            View case study
                            &rarr;
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <h1 className={`${isPortfolioOpen ? styles.out : ''} ${styles.customOurProjects}`} onClick={handleTriggerClick}>
              Our <span>Projects</span> &rarr;
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
