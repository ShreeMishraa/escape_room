import React, { useState, useEffect, navigate } from 'react';
import { gsap } from 'gsap';
import "../Level1/Level1.css";
import { useNavigate } from 'react-router-dom';
import Toggle from 'react-toggled';

function Level1() {
    const [visibleCards, setVisibleCards] = useState({
        books: false,
        nun1: false,
        hat: false,
        clown1: false,
        knife: false,
        axe: false,
        gun: false,
        nun2: false,
        clown2: false,
        cross: false,
        nun3: false,
        clown3: false,
    });

    const [showButton, setShowButton] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false); 
    const navigate = useNavigate();

    const cardItems = [
        { id: 'books', img: "../src/assets/books.jpg", alt: "Books" },
        { id: 'nun1', img: "../src/assets/nun.webp", alt: "Nun 1" },
        { id: 'hat', img: "../src/assets/hat.jpg", alt: "Hat" },
        { id: 'clown1', img: "../src/assets/clown.jpg", alt: "Clown 1" },
        { id: 'knife', img: "../src/assets/knife.jpg", alt: "Knife" },
        { id: 'axe', img: "../src/assets/axe.jpg", alt: "Axe" },
        { id: 'gun', img: "../src/assets/gun.png", alt: "Gun" },
        { id: 'nun2', img: "../src/assets/nun.webp", alt: "Nun 2" },
        { id: 'clown2', img: "../src/assets/clown.jpg", alt: "Clown 2" },
        { id: 'cross', img: "../src/assets/cross.avif", alt: "Cross" },
        { id: 'nun3', img: "../src/assets/nun.webp", alt: "Nun 3" },
        { id: 'clown3', img: "../src/assets/clown.jpg", alt: "Clown 3" },
    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swapping with any random element
        }
    };

    const [shuffledCards, setShuffledCards] = useState([]);

    useEffect(() => {
        const cardsCopy = [...cardItems]; // Create a copy of the card items
        shuffleArray(cardsCopy); // Shuffle the copy
        setShuffledCards(cardsCopy); // Set the shuffled cards
    }, []);

    const handleClick = (card) => {
        if (card === 'nun1' || card === 'nun2' || card === 'nun3' || card === 'clown1' || card === 'clown2' || card === 'clown3') {
            setVisibleCards(prev => ({
                ...prev,
                [card]: true
            }));
            setTimeout(() => {
                setVisibleCards(prev => ({
                    ...prev,
                    [card]: false
                }));
            }, 1000);
        } else {
            setVisibleCards(prev => ({
                ...prev,
                [card]: true
            }));
        }

        if (checkInputBoxes()) {
            setInputVisible(true);
        }
    };

    const checkInputBoxes = () => {
        return (
            visibleCards.books &&
            visibleCards.hat &&
            visibleCards.knife &&
            visibleCards.axe &&
            visibleCards.gun &&
            visibleCards.cross
        );
    };

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const maxRandom = (max) => Math.floor(Math.random() * max);

    const handleNextLevel = () => {
        const inputValue = document.getElementById('placeholder').value;
        if (inputValue === '6') {
            setConfettiActive(true); 
            setShowButton(true);
    
            let total = 100;
            let w = window.innerWidth;
            let h = window.innerHeight;
    
            for (let i = 0; i < total; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti'; // Add your confetti class here
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
        } else {
            setConfettiActive(false);
            setShowButton(false);
        }
    };

    const confettiAnimation = (elem) => {
        gsap.to(elem, {
            duration: maxRandom(10) + 10,
            y: window.innerHeight + 50,
            ease: "none",
            repeat: -1,
            delay: -maxRandom(10),
            onComplete: () => {
                elem.style.opacity = 0;
                elem.parentNode.removeChild(elem);
            }
        });

        gsap.to(elem, {
            duration: maxRandom(1) + 1,
            x: "+=" + random(-200, 200),
            rotationZ: random(0, 180),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            onComplete: () => {
                elem.style.opacity = 0;
                elem.parentNode.removeChild(elem);
            }
        });

        gsap.to(elem, {
            duration: maxRandom(1) + 1,
            rotationX: random(0, 360),
            rotationY: random(0, 360),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            onComplete: () => {
                elem.style.opacity = 0;
                elem.parentNode.removeChild(elem);
            }
        });
    };

    const stopConfetti = () => {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach((elem) => {
            gsap.killTweensOf(elem); 
            elem.remove(); 
        });
    };

    const handleButtonClick = () => {
        stopConfetti();
        navigate('/Level2');
      };

    return (
        <div className='w-full h-full bg-black'>
            <div className='bg-red-900'>
                <h1 className='font-serif font-bold text-white text-4xl py-3 text-center'>Can you find all the objects?</h1>
            </div>
            <div className='grid grid-cols-4 gap-4 p-4 h-4/5'>
                
                {shuffledCards.map(card => (
                    <div className='bg-gray-500 rounded-lg flex justify-center items-center h-60' onClick={() => handleClick(card.id)} key={card.id}>
                        <img
                            className={`h-full w-full object-cover ${visibleCards[card.id] ? 'block' : 'hidden'}`}
                            src={card.img}
                            alt={card.alt}
                        />
                    </div>
                ))}
            </div>

            <div className={`bg-black h-screen w-full flex flex-col justify-center items-center ${inputVisible ? 'flex' : 'hidden'}`}>
                <h1 className=' text-white text-4xl font-bold mb-4' style={{ display: showButton ? 'block' : 'none' }}>Congratulations!!!</h1>
                <div className='px-10 flex flex-col items-center space-y-4'>
                    {inputVisible && (
                        <input
                            type='text'
                            className='py-2 px-8 bg-gray-500 text-white rounded-md mb-4'
                            id='placeholder'
                            placeholder='How many objects found?'
                            onChange={handleNextLevel}
                        />
                    )}
                    <button className='bg-red-900 text-white font-bold py-2 px-4 rounded-lg' style={{ display: showButton ? 'block' : 'none' }} onClick={handleButtonClick}>
                        Next Level
                    </button>
                </div>
            </div>
            {confettiActive && inputVisible && <div className='fixed top-0 left-0 w-full h-full pointer-events-none'></div>}
        </div>
    );
}

export default Level1;
