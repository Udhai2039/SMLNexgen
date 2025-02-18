'use client';
import { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

export default function Home() {
    const [logoSrc, setLogoSrc] = useState("/demo_logo.png"); // Placeholder image
    const fileInputRef = useRef(null);

    // Handle image selection
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setLogoSrc(e.target.result); // Update state with image URL
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input when image is clicked
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    // A helper for the Get Started button animation
    const highlightToolbar = () => {
        const toolbar = document.getElementById('toolbar');
        if (toolbar) {
            toolbar.classList.add('highlighted');
            setTimeout(() => {
                toolbar.classList.remove('highlighted');
            }, 1000);
        }
    };

    useEffect(() => {
        // Grab DOM elements once the component mounts (client-side only)
        const primaryColor = document.getElementById('prim');
        const secondaryColor = document.getElementById('sec');
        const primbuttnColor = document.getElementById('primbuttn');
        const secbuttnColor = document.getElementById('secbuttn');
        const accentColor = document.getElementById('accent');
        const randomizeButton = document.getElementById('randomize');
        const exportButton = document.getElementById('export');
        // const tipBar = document.getElementById('tip-bar');
        const closeBtn = document.getElementById('close-btn');
        const expandButton = document.querySelector('.rolloutbutton');

        // --- Color Sets (for randomization) ---
        const colorSets = [
            { colors: ['#e9c46a', '#264653', '#e76f51', '#2a9d8f', '#e9c46a'] },
            { colors: ['#223d49', '#ffe08a', '#ac5039', '#fff0c7', '#2a9d8f'] },
            { colors: ['#f6f7f9', '#212428', '#00ff00', '#313130', '#00bb00'] },
            { colors: ['#0e101a', '#ffffff', '#0d8065', '#f0f2fc', '#aff2ea'] },
            { colors: ['#1d3557', '#f1faee', '#e63946', '#a8dadc', '#457b9d'] },
            { colors: ['#f1faee', '#1d3557', '#a8dadc', '#06446a', '#ffc7cc'] },
            { colors: ['#fffbe5', '#000814', '#ffc300', '#001d3d', '#003566'] },
            { colors: ['#344e41', '#dad7cd', '#3a5a40', '#b5c49c', '#588157'] },
            { colors: ['#2b2d42', '#edf2f4', '#d90429', '#8d99ae', '#201f33'] },
            { colors: ['#212529', '#f8f9fa', '#343a40', '#e9ecef', '#adb5bd'] },
            { colors: ['#231942', '#ffebf5', '#5e548e', '#efd9f2', '#8d73b0'] },
            { colors: ['#ffffff', '#191919', '#405bff', '#212121', '#ebff38'] },
            { colors: ['#eeeeee', '#000000', '#44d62c', '#222222', '#ff9c07'] },
            { colors: ['#eeeeee', '#000000', '#44d62c', '#222222', '#44d62c'] },
            { colors: ['#ff8bff', '#193718', '#ff8bff', '#5eaa67', '#e9ffe8'] },
            { colors: ['#000000', '#ffffff', '#000000', '#f2f2f2', '#000000'] },
            { colors: ['#000000', '#ffffff', '#0049db', '#f2f2f2', '#ff6bc1'] },
            { colors: ['#0f1419', '#ffffff', '#1d9bf0', '#f7f7f7', '#8ecdf7'] },
            { colors: ['#0f1419', '#ffffff', '#ffd400', '#f2f2f2', '#ffe97f'] },
            { colors: ['#fbf5d4', '#0099ab', '#5a39d0', '#006374', '#2156c0'] },
            { colors: ['#000000', '#e7e7d7', '#006338', '#deded0', '#006338'] },
            { colors: ['#0f1419', '#ffffff', '#f91880', '#f2f2f2', '#fc8bbf'] },
            { colors: ['#0f1419', '#ffffff', '#8756FF', '#f2f2f2', '#bbaaff'] },
            { colors: ['#0f1419', '#ffffff', '#ff7a00', '#f2f2f2', '#ffbc7f'] },
            { colors: ['#0f1419', '#ffffff', '#00ba7c', '#f2f2f2', '#7fdcbd'] },
            { colors: ['#006374', '#fbf5d4', '#5a39d0', '#cbddca', '#5a39d0'] },
            { colors: ['#0e101a', '#ffffff', '#ff686b', '#fff6f5', '#84dcc6'] },
            { colors: ['#584b53', '#fef5ef', '#9d5c63', '#ffffff', '#e4bb97'] },
            { colors: ['#424b54', '#ffffff', '#9b6a6c', '#e6eaeb', '#e2b4bd'] },
            { colors: ['#ffffff', '#1f2041', '#ffc857', '#4b3f72', '#ffc857'] },
            { colors: ['#050505', '#ffffff', '#121212', '#f6f5f4', '#ffb600'] },
            { colors: ['#ffffff', '#000000', '#9d34da', '#1a1a1a', '#bd73e8'] },
            { colors: ['#2b1c50', '#ffffff', '#565add', '#d1d1f7', '#9f92ec'] },
            { colors: ['#00031f', '#ffffff', '#0b5cff', '#ffffff', '#00ede7'] },
            { colors: ['#000000', '#ffffff', '#611f69', '#f4ede4', '#ecb22e'] },
            { colors: ['#171a22', '#ffffff', '#ff622d', '#f7f7f7', '#421983'] },
            { colors: ['#000000', '#9de2d4', '#e27d5f', '#95d6d2', '#d3bbc2'] },
            { colors: ['#fffbff', '#252cbb', '#ca3f66', '#2e35c2', '#ffccda'] },
            { colors: ['#ffffff', '#4887b0', '#fbeec1', '#3f7897', '#fbeec1'] },
            { colors: ['#05396b', '#5cdb94', '#edf5e0', '#8de4af', '#05396b'] },
            { colors: ['#fcfcfc', '#151515', '#f54c28', '#1b1918', '#689775'] },
            { colors: ['#5d5c61', '#b4c6da', '#557a95', '#d0dce7', '#7a747b'] },
            { colors: ['#2e1115', '#ffffff', '#4f1b1d', '#eaeff2', '#83687b'] },
            { colors: ['#fcfcfc', '#000000', '#4201ff', '#171717', '#230090'] },
            { colors: ['#e5fffd', '#0b0c12', '#66fcf1', '#202833', '#c5c6c8'] },
            { colors: ['#2c221e', '#e3e2de', '#e10243', '#e5d1d6', '#9b1750'] },
            { colors: ['#6c6b66', '#f1f0eb', '#f13c1f', '#fff8e5', '#4056a1'] },
            { colors: ['#d6d6d6', '#272727', '#10f49c', '#424242', '#ffe401'] },
            { colors: ['#fdfffe', '#2f4455', '#da7b93', '#376f70', '#2e151b'] },
            { colors: ['#646561', '#eae8dc', '#e85a50', '#e6e2cc', '#977d59'] },
            { colors: ['#ededed', '#222546', '#29658a', '#474866', '#d1d2d6'] },
        ];

        let lastSelectedColorSet = null;

        // --- Helper Functions ---
        const removeColorSource = () => {
            const sourceDiv = document.querySelector('.color-source');
            if (sourceDiv) sourceDiv.remove();
        };

        const randomizeColors = () => {
            let randomColorSet;
            do {
                randomColorSet = colorSets[Math.floor(Math.random() * colorSets.length)];
            } while (randomColorSet === lastSelectedColorSet);
            lastSelectedColorSet = randomColorSet;

            if (primaryColor) primaryColor.value = randomColorSet.colors[0];
            if (secondaryColor) secondaryColor.value = randomColorSet.colors[1];
            if (primbuttnColor) primbuttnColor.value = randomColorSet.colors[2];
            if (secbuttnColor) secbuttnColor.value = randomColorSet.colors[3];
            if (accentColor) accentColor.value = randomColorSet.colors[4];

            document.documentElement.style.setProperty('--primary', randomColorSet.colors[0]);
            document.documentElement.style.setProperty('--secondary', randomColorSet.colors[1]);
            document.documentElement.style.setProperty('--primbuttn', randomColorSet.colors[2]);
            document.documentElement.style.setProperty('--secbuttn', randomColorSet.colors[3]);
            document.documentElement.style.setProperty('--accent', randomColorSet.colors[4]);

            if (randomColorSet.source) {
                const sourceDiv = document.createElement('div');
                sourceDiv.innerHTML = randomColorSet.source;
                sourceDiv.classList.add('color-source');
                document.body.appendChild(sourceDiv);
            }

            updateColors();
        };

        // Update CSS custom properties when an input changes
        if (primaryColor) {
            primaryColor.addEventListener('input', () => {
                document.documentElement.style.setProperty('--primary', primaryColor.value);
                updateColors();
            });
        }
        if (secondaryColor) {
            secondaryColor.addEventListener('input', () => {
                document.documentElement.style.setProperty('--secondary', secondaryColor.value);
                updateColors();
            });
        }
        if (primbuttnColor) {
            primbuttnColor.addEventListener('input', () => {
                document.documentElement.style.setProperty('--primbuttn', primbuttnColor.value);
                updateColors();
            });
        }
        if (secbuttnColor) {
            secbuttnColor.addEventListener('input', () => {
                document.documentElement.style.setProperty('--secbuttn', secbuttnColor.value);
                updateColors();
            });
        }
        if (accentColor) {
            accentColor.addEventListener('input', () => {
                document.documentElement.style.setProperty('--accent', accentColor.value);
                updateColors();
            });
        }

        // --- Export Functionality ---
        if (exportButton) {
            exportButton.addEventListener('click', async () => {
                const zip = new JSZip();

                // Capture selected colors
                const colorValues = [
                    primaryColor ? primaryColor.value : '',
                    secondaryColor ? secondaryColor.value : '',
                    primbuttnColor ? primbuttnColor.value : '',
                    secbuttnColor ? secbuttnColor.value : '',
                    accentColor ? accentColor.value : ''
                ];

                // Generate color palette image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = colorValues.length * 50;
                canvas.height = 50;
                for (let i = 0; i < colorValues.length; i++) {
                    ctx.fillStyle = colorValues[i];
                    ctx.fillRect(i * 50, 0, 50, 50);
                }
                const paletteImage = canvas.toDataURL('image/png');
                const paletteBlob = await (await fetch(paletteImage)).blob();
                zip.file('palette.png', paletteBlob);

                // Create colors.txt
                const colorText = `Your selected colors:
        Primary: ${colorValues[0]}
        Secondary: ${colorValues[1]}
        Primary Button: ${colorValues[2]}
        Secondary Button: ${colorValues[3]}
        Accent: ${colorValues[4]}
        Thanks for trying out SMLNEXGEN's Demo!`;

                zip.file('colors.txt', colorText);

                // Capture a screenshot of the page
                const screenshotCanvas = await html2canvas(document.body);
                const screenshotImage = screenshotCanvas.toDataURL('image/png');
                const screenshotBlob = await (await fetch(screenshotImage)).blob();
                zip.file('screenshot.png', screenshotBlob);

                // Generate ZIP file
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    saveAs(content, 'export.zip');
                });
            });
        }


        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }

        // --- Contrast Checker Helpers (optional) ---
        function getBrightness(color) {
            let hex = color;
            if (color.substring(0, 3) === "rgb") {
                const [r, g, b] = color.match(/\d+/g);
                hex = "#" + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1);
            }
            if (hex === "#000000") return 0;
            if (hex === "#FFFFFF") return 100;
            const r = parseInt(hex.substring(1, 3), 16);
            const g = parseInt(hex.substring(3, 5), 16);
            const b = parseInt(hex.substring(5, 7), 16);
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const l = (max + min) / 2;
            return l * 100 / 255;
        }

        function getContrastRatio(background, foreground) {
            const bg = parseColor(background);
            const fg = parseColor(foreground);
            const l1 = getLuminance(bg);
            const l2 = getLuminance(fg);
            return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
        }

        function parseColor(color) {
            const regexRgb = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
            const matchRgb = regexRgb.exec(color);
            if (matchRgb) {
                return { r: parseInt(matchRgb[1]), g: parseInt(matchRgb[2]), b: parseInt(matchRgb[3]) };
            }
            const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            const matchHex = regexHex.exec(color);
            if (matchHex) {
                const hex = matchHex[1];
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return { r, g, b };
            }
            throw new Error('Invalid color value: ' + color);
        }

        function getLuminance(color) {
            const r = color.r / 255;
            const g = color.g / 255;
            const b = color.b / 255;
            return 0.2126 * Math.pow(r, 2.2) + 0.7152 * Math.pow(g, 2.2) + 0.0722 * Math.pow(b, 2.2);
        }

        // --- Update URL Slug Based on Selected Colors ---
        const updateSlug = () => {
            const primaryVal = primaryColor ? primaryColor.value : '';
            const secondaryVal = secondaryColor ? secondaryColor.value : '';
            const primbuttnVal = primbuttnColor ? primbuttnColor.value : '';
            const secbuttnVal = secbuttnColor ? secbuttnColor.value : '';
            const accentVal = accentColor ? accentColor.value : '';
            const slug = `${primaryVal.replace('#', '')}-${secondaryVal.replace('#', '')}-${primbuttnVal.replace('#', '')}-${secbuttnVal.replace('#', '')}-${accentVal.replace('#', '')}`;
            window.history.replaceState({}, document.title, `?colors=${slug}`);
        };

        const updateColors = () => {
            updateSlug();
            if (primaryColor) document.documentElement.style.setProperty('--primary', primaryColor.value);
            if (secondaryColor) document.documentElement.style.setProperty('--secondary', secondaryColor.value);
            if (primbuttnColor) document.documentElement.style.setProperty('--primbuttn', primbuttnColor.value);
            if (secbuttnColor) document.documentElement.style.setProperty('--secbuttn', secbuttnColor.value);
            if (accentColor) document.documentElement.style.setProperty('--accent', accentColor.value);
        };

        // --- Mobile Expand Button ---
        if (expandButton) {
            expandButton.addEventListener('click', () => {
                const options = document.getElementsByClassName('option');
                for (let i = 0; i < options.length; i++) {
                    if (options[i] !== expandButton) {
                        options[i].classList.toggle('rollout');
                    }
                }
                expandButton.classList.toggle('rotate');
            });
        }

        // --- Tip Bar ---
        // const showTipBar = () => tipBar && tipBar.classList.add('show');
        // const hideTipBar = () => tipBar && tipBar.classList.remove('show');
        // if (closeBtn) {
        //     closeBtn.addEventListener('click', hideTipBar);
        // }
        // Randomize button event listener now calls the randomization functions
        if (randomizeButton) {
            randomizeButton.addEventListener('click', () => {
                removeColorSource();
                randomizeColors();
                updateSlug();
                // if (!localStorage.getItem('tipShown')) {
                //     setTimeout(showTipBar, 2000);
                //     localStorage.setItem('tipShown', true);
                // }
            });
        }

        // --- Apply Colors From URL Slug ---
        const applyColorsFromSlug = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const slug = searchParams.get('colors');
            if (slug && primaryColor && secondaryColor && primbuttnColor && secbuttnColor && accentColor) {
                const [p, s, pb, sb, a] = slug.split('-');
                primaryColor.value = `#${p}`;
                secondaryColor.value = `#${s}`;
                primbuttnColor.value = `#${pb}`;
                secbuttnColor.value = `#${sb}`;
                accentColor.value = `#${a}`;
                document.documentElement.style.setProperty('--primary', primaryColor.value);
                document.documentElement.style.setProperty('--secondary', secondaryColor.value);
                document.documentElement.style.setProperty('--primbuttn', primbuttnColor.value);
                document.documentElement.style.setProperty('--secbuttn', secbuttnColor.value);
                document.documentElement.style.setProperty('--accent', accentColor.value);
            } else {
                updateSlug();
            }
            updateColors();
        };

        applyColorsFromSlug();

        // Global keydown for "Ctrl" key randomization
        // document.addEventListener('keydown', (event) => {
        //     if (event.key === "Control") {
        //         console.log('"Ctrl" key pressed, randomizing colors...');
        //         removeColorSource();
        //         randomizeColors();
        //         updateSlug();
        //         event.preventDefault();
        //     }
        // });

        // Cleanup function (if needed)
        return () => {
            // Remove any global listeners here if necessary
        };
    }, []);

    return (
        <div id="home">
            {/* --- Navigation --- */}
            <nav>
                <div className="logo">
                    {/* Clickable image */}
                    <Image
                        src={logoSrc}
                        alt="logo"
                        title="try inserting your own logo"
                        className="logoface"
                        onClick={handleImageClick}
                        width={150} // Set width directly
                        height={150} // Set height directly
                        style={{ cursor: "pointer", objectFit: "contain" }}
                    />


                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                    <Link href="#">
                        <h2 contentEditable spellCheck={false} className="sitename">Your website</h2>
                    </Link>
                </div>
                <div className="menu">
                    <Link href="#why" className="menu-item">About</Link>
                    <Link href="#how" className="menu-item">Blog</Link>
                    <Link href="#end" className="menu-item">Contact</Link>
                    <Link href="#sub" className="primary-button">Subscribe</Link>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <div className="hero">
                <div className="hero-text">
                    <h1 contentEditable spellCheck={false}>
                        Try editing <span className="color-effect">text</span>
                    </h1>
                    <p contentEditable spellCheck={false} className="subtitle">Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>
                    <div className="hero-cta">
                        <Link href="#toolbar" className="primary-button" onClick={highlightToolbar}>Get Started</Link>
                        <Link href="#how" className="secondary-button">Know more</Link>
                    </div>
                    {/* <div className="hero-scroll">
                        <p className="sub">Scroll to see more sections</p>
                    </div> */}
                </div>
                <div className="hero-img">
                    {/* SVG content can be placed here */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="652" height="644" viewBox="0 0 652 644" fill="none" className="mondrian">
                        <rect x="4.69366" y="4" width="643.306" height="636" stroke="var(--secondary)" strokeWidth="8" />
                        {/* ... additional SVG elements ... */}
                    </svg>
                </div>
            </div>

            {/* --- Main Content --- */}
            <main>
                <div className="part1" id="why">
                    <h2>Why US?</h2>
                    <div className="part1-cards">
                        <div className="part1-card">
                            <p className="subtitle highlight">Lorem Ipsum</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="part1-card-bg"></div>
                        </div>
                        <div className="part1-card">
                            <p className="subtitle highlight">Lorem Ipsum</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>                            <div className="part1-card-bg"></div>
                        </div>
                        <div className="part1-card">
                            <p className="subtitle highlight">Lorem Ipsum</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>                            <div className="part1-card-bg"></div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="part2" id="how">
                    <div className="part2-left">
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="part2-right">
                        <p className="one step">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="two step">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="three step">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="four step">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>

                <br />

                <div className="part5" id="end">
                    <h1>Your <span className="color-effect">Journey</span> Shouldn&apos;t End Here.</h1>
                    <p className="subtitle">Follow us and stay tuned on more...</p>
                    <Link href="#" className="primary-button">Stay Tuned</Link>
                </div>



                <div className="footer" id="footer">
                    {/* <div className="logo">
                        <img src="#" alt="logo" className="logoface" />
                        <Link href="#" target="_blank" rel="noreferrer">
                            <h2 className="sitename reversed">Your website</h2>
                        </Link>
                    </div> */}
                    <div className="footer-cols">
                        <div className="footer-col">
                            <p style={{ margin: 0 }}>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="footer-col">
                            <Link href="#home" className="menu-item reversed">Home</Link>
                            <Link href="#why" className="menu-item reversed">About</Link>
                            <Link href="#how" className="menu-item reversed">Blog</Link>
                            <Link href="#end" className="menu-item reversed">Contact</Link>
                        </div>
                        <div className="footer-col">
                            <Link href="#x" className="menu-item reversed">X</Link>
                            <Link href="#facebook" className="menu-item reversed">Facebook</Link>
                            <Link href="#youtube" className="menu-item reversed">YouTube</Link>
                            <Link href="#insta" className="menu-item reversed">Instagram</Link>
                        </div>
                    </div>
                    <Link href="/Home/Services">
                        <p className="sub">Powered by SMLNEXGEN</p>
                    </Link>
                </div>

                {/* --- Toolbar Section (with Color Inputs and Buttons) --- */}
                <div className="toolbar" id="toolbar">
                    <div className="option prim rollout">
                        <input type="color" id="prim" name="prim" className="colorpicker" defaultValue="#000000" data-coloris />
                        <label htmlFor="prim">Text</label>
                    </div>
                    <div className="option sec rollout">
                        <input type="color" id="sec" name="sec" className="colorpicker" defaultValue="#ffffff" data-coloris />
                        <label htmlFor="sec">Background</label>
                    </div>
                    <div className="option primbuttn rollout">
                        <input type="color" id="primbuttn" name="primbuttn" className="colorpicker" defaultValue="#4685FF" data-coloris />
                        <label htmlFor="primbuttn">Primary Button</label>
                    </div>
                    <div className="option secbuttn rollout">
                        <input type="color" id="secbuttn" name="secbuttn" className="colorpicker" defaultValue="#F2F2F2" data-coloris />
                        <label htmlFor="secbuttn">Secondary Button</label>
                    </div>
                    <div className="option accent rollout">
                        <input type="color" id="accent" name="accent" className="colorpicker" defaultValue="#FFB084" data-coloris />
                        <label htmlFor="accent">Accent</label>
                    </div>
                    <div className="option export rollout" id="export">
                        <div>Export</div>
                    </div>
                    <div className="option randomize rollout" id="randomize">
                        <div>Randomize</div>
                    </div>
                    <div className="option rolloutbutton" id="rolloutbutton">
                        <div className="rolloutbutton">Expand</div>
                    </div>
                </div>

                {/* --- Tip Bar --- */}
                {/* <div id="tip-bar">
                    <button id="close-btn">&times;</button>
                    <p><b>Tip:</b> Press the "R" key to randomize faster!</p>
                </div> */}
            </main>
        </div>
    );
}
