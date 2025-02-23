'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

const slides = [
  { number: '01', name: 'Fechzo', image: '/fechzo.png', categories: ['E-COMMERCE'], description: 'A robust e-commerce platform' },
  { number: '02', name: 'Mr.Monitor', image: '/mr-monitor.png', categories: ['B2B', 'ERP'], description: 'An advanced ERP solution tailored for B2B businesses' },
  { number: '03', name: 'Akashkrish Toyota', image: '/toyota.png', categories: ['AUTOMATIVE'], description: 'A comprehensive web platform for Akashkrish Toyota' },
  { number: '04', name: 'Mr.Solver', image: '/mr_solver.png', categories: ['CUSTOMER SUPPORT'], description: 'An efficient platform for customers to report and track issues in real-time.' },
];

export default function Home() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isWorkExpanded, setIsWorkExpanded] = useState(false);
  const [isSliderIn, setIsSliderIn] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(1178); // Adjusted to new initial position
  const [isDragging, setIsDragging] = useState(false);
  const [initX, setInitX] = useState(0);
  const [endPosition, setEndPosition] = useState(1178); // Adjusted to new initial end position
  const [currentIndex, setCurrentIndex] = useState(0); // Start at index 0
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [cursorIcon, setCursorIcon] = useState('');
  const sliderRef = useRef(null);
  const contentRef = useRef(null);

  // Intro completion
  useEffect(() => {
    setTimeout(() => setIntroComplete(true), 2500);
  }, []);

  // Wheel scroll handling
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setScrollPosition((prev) => {
          const newPos = prev + 10;
          if (contentRef.current) contentRef.current.style.top = `${-newPos}px`;
          return newPos;
        });
        if (introComplete) {
          setIsPortfolioOpen(true);
          setIsSliderIn(true);
          setTimeout(() => sliderRef.current?.click(), 2000);
        }
      } else {
        setScrollPosition((prev) => Math.max(prev - 10, 0));
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [introComplete]);

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
    const cursor = document.querySelector(`.${styles.dynamicCursor}`);
    if (cursor) cursor.style.transition = 'transform 0s 0s';
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

    const cursor = document.querySelector(`.${styles.dynamicCursor}`);
    if (cursor) cursor.style.transition = 'transform 1.4s cubic-bezier(0.075, 0.820, 0.165, 1.000), width 0.4s .2s, height 0.4s .2s, opacity 1s .2s';

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
    setTimeout(() => sliderRef.current?.click(), 2500);
  };

  // Button click to expand work
  const handleButtonClick = () => {
    setIsWorkExpanded(true);
  };

  // Back button to collapse work and return to slider
  const handleBackClick = () => {
    setIsWorkExpanded(false);
    setIsPortfolioOpen(true); // Ensure we stay in portfolio view with slider visible
  };

  // Dynamic cursor handling
  useEffect(() => {
    let idle;
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.pageX, y: e.pageY });
      setCursorExpanded(true);
      clearTimeout(idle);
      idle = setTimeout(() => {
        setCursorExpanded(false);
        setCursorIcon('');
      }, 4000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    const triggers = document.querySelectorAll(`.${styles.trigger}`);
    triggers.forEach((trigger) => {
      trigger.style.cursor = 'default';
      trigger.addEventListener('mouseover', () => {
        setCursorExpanded(true);
        setCursorIcon('+');
      });
      trigger.addEventListener('mouseout', () => {
        setCursorExpanded(false);
        setCursorIcon('');
      });
    });

    const slider = document.querySelector(`.${styles.slider_inner}`);
    if (slider) {
      slider.style.cursor = 'default';
      slider.addEventListener('mouseover', () => {
        setCursorExpanded(true);
        setCursorIcon('↔');
      });
      slider.addEventListener('mouseout', () => {
        setCursorExpanded(false);
        setCursorIcon('');
      });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      triggers.forEach((trigger) => {
        trigger.removeEventListener('mouseover', () => { });
        trigger.removeEventListener('mouseout', () => { });
      });
      if (slider) {
        slider.removeEventListener('mouseover', () => { });
        slider.removeEventListener('mouseout', () => { });
      }
    };
  }, []);

  // Initial slider centering
  useEffect(() => {
    // const centerSlider = () => {
    //   const docWidth = document.documentElement.clientWidth;
    //   const slideWidth = 700;
    //   const initialLeft = (docWidth / 2) - (slideWidth / 2); // Matches original jQuery
    //   setSliderPosition(initialLeft); // Set initial position
    //   setEndPosition(initialLeft);
    // };
    // centerSlider();
    // window.addEventListener('resize', centerSlider);
    // return () => window.removeEventListener('resize', centerSlider);
    setSliderPosition(1180); // Set on mount
    setEndPosition(1180);
  }, []);

  return (
    <>
      {/* <div className={styles.cursor}>
        <div className={styles.cursor_point}></div>
        <div className={styles.cursor_outer}></div>
      </div> */}
      <div className={styles.portfolio}>
        <div className={styles.portfolio_home}>
          {/* <div style={{ position: 'fixed', zIndex: -99, width: '2320px', height: '180%', left: 0, top: '-38%' }}>
            <iframe
              frameBorder="0"
              height="100%"
              width="100%"
              src="https://youtube.com/embed/tz8Puc4W5BM?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1"
            ></iframe>
          </div> */}
          {/* <div className={styles.portfolio_home__header}>
            <div className={`${styles.hamburger} ${styles.trigger}`}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.hamburger_part}></div>
              ))}
            </div>
          </div> */}
          <div className={styles.portfolio_home__title}>
            <div className={styles.logo}>
              {/* <img
                className={`${styles.first} ${isPortfolioOpen ? styles.out : ''}`}
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp.png"
                alt="Logo First"
              />
              <img
                className={`${styles.second} ${isPortfolioOpen ? styles.out : ''}`}
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp2.png"
                alt="Logo Second"
              /> */}
              
              <div className={`${styles.page_portfolio} ${isPortfolioOpen ? styles.open : ''}`}>
                {/* <div className={styles.portfolio_home__header}>
                  <div className={styles.logoMain}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cagencylogo.png" alt="Agency Logo" />
                  </div>
                  <div className={styles.nav}>
                    <ul>
                      <li className={`${styles.active} ${styles.trigger}`}>Our work</li>
                      <li className={styles.trigger}>Our services</li>
                      <li className={styles.trigger}>About us</li>
                      <li className={styles.trigger}>Contact us</li>
                    </ul>
                  </div>
                  <div className={`${styles.number} ${styles.black}`}>0161 345 3464</div>
                  <div className={`${styles.hamburger} ${styles.black} ${styles.trigger}`}>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={styles.hamburger_part}></div>
                    ))}
                  </div>
                </div> */}
                <div className={styles.slider_note}>Drag through our work</div>
                <div className={`${styles.portfolio_home__work} ${isWorkExpanded ? styles.expand : ''}`}>
                  {/* <div className={`${styles.portfolio_home__header} ${styles.work}`}>
                    <div className={styles.back} onClick={handleBackClick}>
                      <img
                        className={styles.trigger}
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
                        alt="Back"
                      />
                    </div>
                    <div className={styles.logoMain}>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/slogowhite.png" alt="Logo White" />
                    </div>
                    <div className={styles.nav}>
                      <ul>
                        <li className={`${styles.active} ${styles.trigger}`}>Our work</li>
                        <li className={styles.trigger}>Our services</li>
                        <li className={styles.trigger}>About us</li>
                        <li className={styles.trigger}>Contact us</li>
                      </ul>
                    </div>
                    <div className={`${styles.number} ${styles.white}`}>0161 345 3464</div>
                    <div className={`${styles.hamburger} ${styles.white} ${styles.trigger}`}>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={styles.hamburger_part}></div>
                      ))}
                    </div>
                  </div> */}
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
                      </div>
                    </div>
                  ))}
                  {/* <img
                    className={styles.scroll}
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png"
                    alt="Scroll"
                  /> */}
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
                          <div className={styles.button} onClick={handleButtonClick}>
                            View case study
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png" alt="Arrow" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <hr className={isPortfolioOpen ? styles.out : ''} /> */}
            <h1 className={isPortfolioOpen ? styles.out : ''}>
              Our <span>Projects</span>
            </h1>
            <div
              className={`${styles.trigger} ${isPortfolioOpen ? styles.out : ''}`}
              alt="Trigger"
              onClick={handleTriggerClick}
            >
              &darr;
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.content} ref={contentRef} style={{ top: `${-scrollPosition}px` }}></div> */}
      <div
        className={`${styles.dynamicCursor} ${cursorExpanded ? styles.expanded : ''}`}
        style={{ transform: `translateX(calc(${cursorPosition.x}px - 50%)) translateY(calc(${cursorPosition.y}px - 50%))` }}
      >
        <div className={styles.cursorIcon}>{cursorIcon}</div>
      </div>
    </>
  );
}