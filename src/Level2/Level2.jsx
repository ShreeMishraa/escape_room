import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import "../Level1/Level1.css";
import { useNavigate } from 'react-router-dom';
import Toggled from 'react-toggled';
import { motion } from 'framer-motion'; 

function Level2() {
    const [confettiActive, setConfettiActive] = useState(false);
    const navigate = useNavigate();

    const showDiv2 = (toggle) => {
        const input = document.getElementById('input1');
        if (input.value === 'knife') {
            document.getElementById('2').style.display = 'block';
        } else {
            toggle();  
            document.getElementById('2').style.display = 'none';
        }
    };

    const showDiv3 = (toggle) => {
        const input = document.getElementById('input2');
        if (input.value === 'hat') {
            document.getElementById('3').style.display = 'block';
        } else {
            toggle(); 
            document.getElementById('3').style.display = 'none';
        }
    };

    const endGame = (toggle) => {
        const input = document.getElementById('input3');
        if (input.value === 'book' || input.value === 'books') {
            setConfettiActive(true);

            let total = 100;
            let w = window.innerWidth;
            let h = window.innerHeight;

            for (let i = 0; i < total; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                document.body.appendChild(confetti);

                gsap.set(confetti, {
                    x: maxRandom(w),
                    y: random(h * -2, 0),
                    z: random(-200, 200),
                    scale: random(0.5, 1.5),
                    opacity: 1,
                    background: "hsla(" + random(0, 360) + ", 100%, 50%, 1)"
                });
                confettiAnimation(confetti);
            }

            setTimeout(() => {
                navigate('/GameOver');
            }, 4000);
        } else {
            toggle();  
        }
    };

    const confettiAnimation = (elem) => {
        gsap.to(elem, {
            duration: maxRandom(10) + 10,
            y: window.innerHeight + 50,
            ease: "none",
            repeat: -1,
            delay: -maxRandom(10),
        });

        gsap.to(elem, {
            duration: maxRandom(1) + 1,
            x: "+=" + random(-200, 200),
            rotationZ: random(0, 180),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(elem, {
            duration: maxRandom(1) + 1,
            rotationX: random(0, 360),
            rotationY: random(0, 360),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    };

    const random = (min, max) => Math.random() * (max - min) + min;
    const maxRandom = (max) => Math.random() * max;

    const stopConfetti = () => {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach((elem) => {
            gsap.killTweensOf(elem);
            elem.remove();
        });
    };

    useEffect(() => {
        if (confettiActive) {
            return () => stopConfetti();
        }
    }, [confettiActive]);

    return (
        <div className='w-full h-screen'>
            <div className='bg-black'>
                <h1 className='text-center font-serif font-bold text-white text-3xl py-3'>
                    ~Unlock the door to escape~
                </h1>
            </div>
            <div className='flex h-full bg-black'>
                <div className='w-2/3 bg-black grid grid-cols-2 grid-rows-3'>
                    <div id='1' className='bg-gray-500 border shadow-lg rounded-lg opacity-70 p-4'>
                        <h1 className='font-bold text-xl'>
                            Of all the six objects you found in the previous level, which one has the same first letter as something that can unlock the door?
                        </h1>
                        <input
                            id="input1"
                            type="text"
                            className='mt-5 px-0 py-2.5 bg-grey-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-grey-600 focus:ring-opacity-50 text-center'
                        />
                        <Toggled>
                            {({ on, toggle }) => (
                                <>
                                    <button
                                        type="button"
                                        className='m-5 px-5 py-2.5 bg-red-900 hover:bg-red-600 text-white rounded-md font-semibold transition duration-300'
                                        onClick={() => showDiv2(toggle)}
                                    >
                                        submit
                                    </button>
                                    {on && (
                                        <div className='popup-backdrop'>
                                            <div className='popup-backdrop'>
                                                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                                                    <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center'>
                                                        <h2 className='text-2xl font-bold mb-4'>Wrong Answer</h2>
                                                        <p className='mb-6 text-lg'>Oops! That's not the correct answer. Please try again.</p>
                                                        <button
                                                            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg'
                                                            onClick={toggle}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </Toggled>
                    </div>
                    <div className='bg-black p-4'></div>
                    <div className='bg-black p-4'></div>
                    <div
                        id='2'
                        className='bg-gray-500 border shadow-lg rounded-lg opacity-70 p-4'
                        style={{ display: 'none' }}
                    >
                        <h1 className='font-bold text-xl'>
                            Which object has the same number of letters as something that can unlock the door? (Hint: the answer is a perfect solution to unruly hair.)
                        </h1>
                        <input
                            id="input2"
                            type="text"
                            className='mt-5 px-0 py-2.5 bg-grey-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-grey-600 focus:ring-opacity-50 text-center'
                        />
                        <Toggled>
                            {({ on, toggle }) => (
                                <>
                                    <button
                                        type="button"
                                        className='m-5 px-5 py-2.5 bg-red-900 hover:bg-red-600 text-white rounded-md font-semibold transition duration-300'
                                        onClick={() => showDiv3(toggle)}
                                    >
                                        submit
                                    </button>
                                    {on && (
                                        <div className='popup-backdrop'>
                                            <div className='popup-backdrop'>
                                                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                                                    <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center'>
                                                        <h2 className='text-2xl font-bold mb-4'>Wrong Answer</h2>
                                                        <p className='mb-6 text-lg'>Oops! That's not the correct answer. Please try again.</p>
                                                        <button
                                                            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg'
                                                            onClick={toggle}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </Toggled>
                    </div>
                    <div
                        id='3'
                        className='bg-gray-500 border shadow-lg rounded-lg opacity-70 p-4'
                        style={{ display: 'none' }}
                    >
                        <h1 className='font-bold text-xl'>
                            My spine's stiff, my body pale but I'm always ready to tell a tale. Who am I? (Hint: One of the objects you found in level 1)
                        </h1>
                        <input
                            id="input3"
                            type="text"
                            className='mt-5 px-0 py-2.5 bg-grey-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-grey-600 focus:ring-opacity-50 text-center'
                        />
                        <Toggled>
                            {({ on, toggle }) => (
                                <>
                                    <button
                                        type="button"
                                        className='m-5 px-5 py-2.5 bg-red-900 hover:bg-red-600 text-white rounded-md font-semibold transition duration-300'
                                        onClick={() => endGame(toggle)}
                                    >
                                        submit
                                    </button>
                                    {on && (
                                        <div className='popup-backdrop'>
                                            <div className='popup-backdrop'>
                                                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                                                    <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center'>
                                                        <h2 className='text-2xl font-bold mb-4'>Wrong Answer</h2>
                                                        <p className='mb-6 text-lg'>Oops! That's not the correct answer. Please try again.</p>
                                                        <button
                                                            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg'
                                                            onClick={toggle}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </Toggled>
                    </div>
                    <div className='bg-black p-4'></div>
                </div>
                <div className='w-1/3 h-full bg-black'>
                    <img src="../src/assets/escape.jpg" alt="door" />
                </div>
            </div>
            {confettiActive && (
                <div className='h-screen w-full bg-slate-900 flex items-center justify-center fixed top-0 left-0'>
                    <motion.div
                     initial={{ x: "100%",opacity: 0 }}
                    animate={{ x: "0",opacity: 1 }}
                    exit={{ x: "-100%",opacity: 0 }}
                    transition={{ duration: 1 }}
                    className='bg-yellow-400 flex flex-col items-center justify-center p-10 rounded-lg shadow-lg'>
                        <h1 className='text-white text-4xl font-bold'>Congratulations!!! </h1>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default Level2;
