"use client"; // Required for client-side interactivity

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Openings.module.css";

const Openings = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const wrapperRef = useRef(null);

  // Job data array with sample jobs
  const jobs = [
    {
      id: 1,
      title: "UI / UX Designer",
      subtitle:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      logo: (
        <svg
          viewBox="0 -13 512 512"
          xmlns="http://www.w3.org/2000/svg"
          style={{ backgroundColor: "#2e2882" }}
        >
          <g fill="#feb0a5">
            <path d="M256 92.5l127.7 91.6L512 92 383.7 0 256 91.5 128.3 0 0 92l128.3 92zm0 0M256 275.9l-127.7-91.5L0 276.4l128.3 92L256 277l127.7 91.5 128.3-92-128.3-92zm0 0" />
            <path d="M127.7 394.1l128.4 92 128.3-92-128.3-92zm0 0" />
          </g>
          <path
            d="M512 92L383.7 0 256 91.5v1l127.7 91.6zm0 0M512 276.4l-128.3-92L256 275.9v1l127.7 91.5zm0 0M256 486.1l128.4-92-128.3-92zm0 0"
            fill="#feb0a5"
          />
        </svg>
      ),
      bgColor: "#2e2882",
      details: {
        location: "2972 Westheimer Rd. Santa Ana.",
        time: "Full Time",
        level: "Senior Level",
        experience: "Min. 1 Year",
        salary: "$2150.0 / Month",
        overview:
          "We believe that design (and you) will be critical to the company's success. You will work with our founders and our early customers to help define and build our product functionality, while maintaining the quality bar that customers have come to expect from modern SaaS applications. You have a strong background in product design with a quantitatively and qualitatively analytical mindset. You will also have the opportunity to craft our overall product and visual identity and should be comfortable to flex into working.",
        description: [
          "3+ years working as a product designer.",
          "A portfolio that highlights your approach to problem solving, as well as your skills in UI.",
          "Experience conducting research and building out smooth flows.",
          "Excellent communication skills with a well-defined design process.",
          "Familiarity with design tools like Sketch and Figma",
          "Up-level our overall design and bring consistency to end-user facing properties",
        ],
      },
    },
    {
      id: 2,
      title: "Sr. Product Designer",
      subtitle:
        "The User Experience Designer position exists to create compelling and digital user experience through excellent design...",
      logo: (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          style={{ backgroundColor: "#f46500" }}
        >
          <path
            fill="#fff"
            d="M512 256c0 68-39 126-39 126s-39-58-39-126 17-126 39-126 39 58 39 126zM136 256c0-68 39-126 39-126s39 58 39 126-17 126-39 126-39-58-39-126zM301 512c-68 0-126-39-126-39s58-39 126-39 126 17 126 39-58 39-126 39zM211 0c68 0 126 39 126 39S279 78 211 78s-126-17-126-39 58-39 126-39z"
          />
        </svg>
      ),
      bgColor: "#f46500",
      details: {
        location: "1234 Design Lane, Creative City",
        time: "Part Time",
        level: "Mid Level",
        experience: "2+ Years",
        salary: "$1800.0 / Month",
        overview:
          "Join our team to shape innovative products with a focus on user-centered design.",
        description: [
          "2+ years in product design.",
          "Strong portfolio showcasing UI/UX skills.",
          "Experience with prototyping tools.",
          "Collaborative team player.",
        ],
      },
    },
    {
      id: 3,
      title: "Web Developer",
      subtitle: "Build responsive web applications...",
      logo: (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          style={{ backgroundColor: "#00695c" }}
        >
          <path
            fill="#fff"
            d="M256 32C132 32 32 132 32 256s100 224 224 224 224-100 224-224S380 32 256 32zm0 0"
          />
        </svg>
      ),
      bgColor: "#00695c",
      details: {
        location: "5678 Tech Street, Innovation City",
        time: "Full Time",
        level: "Junior Level",
        experience: "1+ Year",
        salary: "$1900.0 / Month",
        overview:
          "Join our team to shape innovative products with a focus on user-centered design.",
        description: [
          "2+ years in product design.",
          "Strong portfolio showcasing UI/UX skills.",
          "Experience with prototyping tools.",
          "Collaborative team player.",
        ],
      },
    },
    {
      id: 4,
      title: "Frontend Engineer",
      subtitle: "Develop modern frontend solutions...",
      logo: (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          style={{ backgroundColor: "#8e24aa" }}
        >
          <path fill="#fff" d="M256 32l224 224-224 224L32 256z" />
        </svg>
      ),
      bgColor: "#8e24aa",
      details: {
        location: "9012 Code Avenue, Dev Town",
        time: "Contract",
        level: "Mid Level",
        experience: "3+ Years",
        salary: "$2500.0 / Month",
        overview:
          "Join our team to shape innovative products with a focus on user-centered design.",
        description: [
          "2+ years in product design.",
          "Strong portfolio showcasing UI/UX skills.",
          "Experience with prototyping tools.",
          "Collaborative team player.",
        ],
      },
    },
    {
      id: 5,
      title: "Graphic Designer",
      subtitle: "Create stunning visual designs...",
      logo: (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          style={{ backgroundColor: "#d81b60" }}
        >
          <path
            fill="#fff"
            d="M256 32c123 0 223 100 223 223S379 478 256 478 33 378 33 255 133 32 256 32zm0 0"
          />
        </svg>
      ),
      bgColor: "#d81b60",
      details: {
        location: "3456 Art Road, Creative Hub",
        time: "Part Time",
        level: "Senior Level",
        experience: "4+ Years",
        salary: "$2200.0 / Month",
        overview:
          "Join our team to shape innovative products with a focus on user-centered design.",
        description: [
          "2+ years in product design.",
          "Strong portfolio showcasing UI/UX skills.",
          "Experience with prototyping tools.",
          "Collaborative team player.",
        ],
      },
    },
  ];

  // Add shadow to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current.scrollTop > 30) {
        wrapperRef.current.classList.add(styles.headerShadow);
      } else {
        wrapperRef.current.classList.remove(styles.headerShadow);
      }
    };
    const wrapper = wrapperRef.current;
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking a job card
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailView(true);
    const number = Math.floor(Math.random() * 10);
    const url = `https://unsplash.it/640/425?image=${number}`;
    setBgImage(url);
    if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
  };

  // Handle returning to the job list view
  const handleBack = () => {
    setIsDetailView(false);
    setSelectedJob(null);
    if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
  };

  return (
    <div className={styles.page}>
      <div
        className={`${styles.wrapper} ${isDetailView ? styles.detailPage : ""}`}
        ref={wrapperRef}
      >
        <div className={styles.searchMenu}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchBox}
              autoFocus
            />
          </div>
          <button className={styles.searchButton}>Find Job</button>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.searchType}>
            <div className={styles.alert}>
              <div className={styles.alertTitle}>Create Job Alert</div>
              <div className={styles.alertSubtitle}>
                Create a job alert now and never miss a job
              </div>
              <input type="text" placeholder="Enter Email" />
              <button className={styles.searchButtons}>
                Create Job Alerts
              </button>
            </div>
            {/* Simplified job cards in detail view */}
            {isDetailView && (
              <div className={styles.simplifiedJobCards}>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className={`${styles.simplifiedJobCard} ${selectedJob && selectedJob.id === job.id
                      ? styles.selected
                      : ""
                      }`}
                    onClick={() => handleJobClick(job)}
                  >
                    <div className={styles.jobCardHeader}>
                      <div className={styles.simplifiedLogo}>{job.logo}</div>
                    </div>
                    <div className={styles.jobCardTitle}>{job.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.searchedJobs}>
            {!isDetailView ? (
              <>
                <div className={styles.searchedBar}>
                  <div className={styles.searchedShow}>
                    Showing {jobs.length} Jobs
                  </div>
                  <div className={styles.searchedSort}>
                    Sort by: <span className={styles.postTime}>Newest Post</span>{" "}
                    <span className={styles.menuIcon}>▼</span>
                  </div>
                </div>
                <div className={styles.jobCards}>
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className={styles.jobCard}
                      onClick={() => handleJobClick(job)}
                    >
                      <div className={styles.jobCardHeader}>
                        {job.logo}
                        <div className={styles.menuDot}></div>
                      </div>
                      <div className={styles.jobCardTitle}>{job.title}</div>
                      <div className={styles.jobCardSubtitle}>{job.subtitle}</div>
                      <div className={styles.jobDetailButtons}>
                        <button className={styles.detailButton}>
                          {job.details.time}
                        </button>
                        <button className={styles.detailButton}>
                          {job.details.experience}
                        </button>
                        <button className={styles.detailButton}>
                          {job.details.level}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.jobOverview}>
                <div className={styles.jobExplain}>
                  <div
                    className={styles.closeBtn}
                    onClick={handleBack}
                  >
                    &times;
                  </div>
                  <Image
                    className={styles.jobBg}
                    src={bgImage}
                    alt="Job Background"
                    style={{ backgroundColor: selectedJob ? selectedJob.bgColor : "" }}
                    width={640}
                    height={425}
                  />
                  <div className={styles.jobLogos}>
                    {selectedJob && selectedJob.logo}
                  </div>
                  <div className={styles.jobExplainContent}>
                    <div className={styles.jobTitleWrapper}>
                      <div className={styles.jobCardTitle}>
                        {selectedJob ? selectedJob.title : ""}
                      </div>
                      <div className={styles.jobAction}>
                        <svg
                          className={styles.heart}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.jobSubtitleWrapper}>
                      <div className={styles.companyName}>
                        Patreon{" "}
                        <span className={styles.compLocation}>
                          {selectedJob ? selectedJob.details.location : ""}
                        </span>
                      </div>
                      <div className={styles.posted}>
                        Posted 8 days ago{" "}
                        <span className={styles.appNumber}>98 Applications</span>
                      </div>
                    </div>
                    <div className={styles.explainBar}>
                      <div className={styles.explainContents}>
                        <div className={styles.explainTitle}>Experience</div>
                        <div className={styles.explainSubtitle}>
                          {selectedJob ? selectedJob.details.experience : ""}
                        </div>
                      </div>
                      <div className={styles.explainContents}>
                        <div className={styles.explainTitle}>Work Level</div>
                        <div className={styles.explainSubtitle}>
                          {selectedJob ? selectedJob.details.level : ""}
                        </div>
                      </div>
                      <div className={styles.explainContents}>
                        <div className={styles.explainTitle}>Employee Type</div>
                        <div className={styles.explainSubtitle}>
                          {selectedJob ? selectedJob.details.time : ""}
                        </div>
                      </div>
                      <div className={styles.explainContents}>
                        <div className={styles.explainTitle}>Offer Salary</div>
                        <div className={styles.explainSubtitle}>
                          {selectedJob ? selectedJob.details.salary : ""}
                        </div>
                      </div>
                    </div>
                    <div className={styles.overviewText}>
                      <div className={styles.overviewTextHeader}>Overview</div>
                      <div className={styles.overviewTextSubheader}>
                        {selectedJob ? selectedJob.details.overview : ""}
                      </div>
                    </div>
                    <div className={styles.overviewText}>
                      <div className={styles.overviewTextHeader}>
                        Job Description
                      </div>
                      {selectedJob &&
                        selectedJob.details.description.map((item, index) => (
                          <div key={index} className={styles.overviewTextItem}>
                            {item}
                          </div>
                        ))}
                    </div>
                    <button className={styles.cardButtons}>Apply Now</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Openings;