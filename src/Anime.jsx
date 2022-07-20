import React from 'react'
import gsap from 'gsap'
import { useEffect } from 'react'

function Anime() {
    

    useEffect(() => {

        const names = document.querySelectorAll('.name h1')
        const title = document.querySelectorAll('.title h2')
        const subtitle = document.querySelectorAll('.second-title h1')
        const chapter = document.querySelectorAll('.chapter h3')

        const gsapNames = gsap.utils.toArray(names)
        const gsapTitle = gsap.utils.toArray(title)
        const gsapSubTitle = gsap.utils.toArray(subtitle)
        const gsapChapter = gsap.utils.toArray(chapter)


        function GsapTextFunctions(array) {
            array.forEach((elem,i) => {
                elem.innerHTML = elem.textContent.replace(/\S/g, 
                `
                <span class="l-hide">
                    <span class='letters'>$&</span>   
                </span> 
                `);
            })
        }

        GsapTextFunctions(gsapNames)
        GsapTextFunctions(gsapTitle)
        GsapTextFunctions(gsapSubTitle)
        GsapTextFunctions(gsapChapter)

        // gsapNames.forEach((elem,i) => {
        //     // console.log(elem)
        //     elem.innerHTML = elem.textContent.replace(/\S/g, 
        //     `
        //     <span class="l-hide">
        //         <span class='letters'>$&</span>   
        //     </span> 
        //     `);
        // })

        function firstTextFunctions(array) {
            const firstGsap = gsap.utils.toArray(array)
            firstGsap.forEach((elem,i) => {
                gsap.to(elem.children[0],{
                    x:0,
                    delay:2,
                    duration:(firstGsap.length/(firstGsap.length - i * (0.05 * firstGsap.length))),
                    ease:"power2.inOut"
                })
            })
        }

        const nameFirst = names[0].children
        const titleFirst = title[0].children
        const subtitleirst = subtitle[0].children
        const chapterFirst = chapter[0].children

        firstTextFunctions(nameFirst)
        firstTextFunctions(titleFirst)
        firstTextFunctions(subtitleirst)
        firstTextFunctions(chapterFirst)

        function firstTextFunctionsSlideIn(array,direction) {
            const firstGsap = gsap.utils.toArray(array)
            firstGsap.forEach((elem,i) => {
                gsap.fromTo(elem.children[0],{
                    x: direction > 0 ? 150 : -150,
                    scale:2,
                    rotate:'90deg',
                },{
                    x: 0,
                    scale:1,
                    rotate:'0deg',
                    duration:(firstGsap.length/(firstGsap.length - i * (0.05 * firstGsap.length))),
                    ease:"power2.inOut"
                })
            })
        }

        function firstTextFunctionsSlideOut(array,direction) {
            const firstGsap = gsap.utils.toArray(array)
            firstGsap.forEach((elem,i) => {
                gsap.fromTo(elem.children[0],{
                    x: 0,
                    scale:1,
                    rotate:'0deg',

                },
                {
                    scale:2,
                    rotate:'90deg',
                    x:direction > 0 ? 150 : -150,
                    duration:(firstGsap.length/(firstGsap.length - i * (0.05 * firstGsap.length))),
                    ease:"power2.inOut"
                })
            })
        }


        const next = document.querySelector('.next')
        const prev = document.querySelector('.prev')

        const slidesImages = document.querySelectorAll('.backgroundParent .background')
        const slidesImages2 = document.querySelectorAll('.backgroundSvg .cutBg')
        let totalSlides = slidesImages.length;
        const slidesWrap = gsap.utils.wrap(0, totalSlides);
        let currentSlide = 0

        const functionTransitionSlide = ({slide,direction,bool}) => {
            gsap.to(slidesImages[slide],{
                "--dropdown": bool == "in" ? (direction > 0 ? "100%" : "0%" ) : ( direction > 0 ? "0%" : "100%"),
                ease:'expo.inOut',
                overwrite:true,
                // zIndex:2,
                duration:2,
            })
            gsap.to(slidesImages[slide],{
                "--dropdown-2": bool == "out" ? (direction > 0 ? "100%" : "0%") : (direction > 0 ? "0%" : "100%"),
                ease:'expo.inOut',
                // overwrite:true,
                duration:0,
            })

            gsap.to(slidesImages2[slide],{
                "--dropdown": bool == "in" ? (direction > 0 ? "100%" : "0%" ) : ( direction > 0 ? "0%" : "100%"),
                ease:'expo.inOut',
                overwrite:true,
                // zIndex:2,
                duration:2,
            })

            gsap.to(slidesImages2[slide],{
                "--dropdown-2": bool == "out" ? (direction > 0 ? "0%" : "100%") : (direction > 0 ? "100%" : "0%"),
                duration:0,
            })

        }
    
        const transitionInSlide = ({slide, direction,duration = 1.5}) => {
            functionTransitionSlide({slide,direction,bool:"in"})
        }
    
        const transitionOutSlide = ({slide,direction,duration = 1.5}) => {
            functionTransitionSlide({slide,direction,bool:"out"})
        }

        const callTextFunctionsIn = (slide,direction) => {
            const nameFirst = names[slide].children
            const titleFirst = title[slide].children
            const subtitleirst = subtitle[slide].children
            const chapterFirst = chapter[slide].children
            firstTextFunctionsSlideIn(nameFirst,direction)
            firstTextFunctionsSlideIn(titleFirst,direction)
            firstTextFunctionsSlideIn(subtitleirst,direction)
            firstTextFunctionsSlideIn(chapterFirst,direction)

        }

        const callTextFunctionsOut = (slide,direction) => {
            const nameFirst = names[slide].children
            const titleFirst = title[slide].children
            const subtitleirst = subtitle[slide].children
            const chapterFirst = chapter[slide].children
            firstTextFunctionsSlideOut(nameFirst,direction)
            firstTextFunctionsSlideOut(titleFirst,direction)
            firstTextFunctionsSlideOut(subtitleirst,direction)
            firstTextFunctionsSlideOut(chapterFirst,direction)

        }

        transitionInSlide({ slide: 0,direction: 1});
    
        const handleNext = (e) => {

            const oldSlide = currentSlide;
            currentSlide = slidesWrap(currentSlide + 1);
            callTextFunctionsIn(currentSlide,1)
            callTextFunctionsOut(oldSlide,1)
            transitionInSlide({ slide: currentSlide,direction: 1});
            transitionOutSlide({ slide: oldSlide,direction:1});
        }
    
        const handlePrev = (e) => {

            const oldSlide = currentSlide;
            currentSlide = slidesWrap(currentSlide - 1);
            callTextFunctionsIn(currentSlide, -1);
            callTextFunctionsOut(oldSlide, -1);
            transitionOutSlide({ slide: currentSlide,direction: -1 });
            transitionInSlide({ slide: oldSlide,direction: -1 });
        }

        next.addEventListener("click",handleNext)
        prev.addEventListener("click",handlePrev)

        var circle = document.querySelector('.circle');
        var c1 = document.querySelector('#c1')

        c1.style.strokeDasharray = `0 100`;
        c1.style.strokeDashoffset = `0`;

        gsap.fromTo(circle,{scale:3},{
            scale:1,
            duration:2,delay:2,
            ease:"expo.inOut"
        })

        gsap.to(c1,{
            duration:2,
            delay:2,
            strokeDasharray:"101 100",
//           Here I want to make the circle dash offset bot sides of the circle side not only in the right side of dash offset
            strokeDashoffset:"0",
            ease:'expo.inOut'
        })

    },[])

    return (
        <div className='container'>
            <div className="backgroundParent">
                <img className='background' src="./img/gojo.jpg" alt="" />
                <img className='background' src="./img/rimuru.jpg" alt="" />
                <img className='background' src="./img/solo.jpg" alt="" />
                <img className='background' src="./img/demon.jpg" alt="" />
            </div>

            <div className="backgroundSvg">
                <img src="./img/gojo.jpg" alt="" className="cutBg" />
                <img src="./img/rimuru.jpg" alt="" className="cutBg" />
                <img src="./img/solo.jpg" alt="" className="cutBg" />
                <img src="./img/demon.jpg" alt="" className="cutBg" />
            </div>

            <div className="prev">
                <svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.413906 0.451928C0.544777 0.308673 0.700247 0.195016 0.87141 0.117467C1.04257 0.039918 1.22607 0 1.41138 0C1.59669 0 1.78019 0.039918 1.95135 0.117467C2.12251 0.195016 2.27798 0.308673 2.40886 0.451928L19.3152 18.9113C19.4464 19.0542 19.5505 19.2239 19.6215 19.4108C19.6925 19.5977 19.7291 19.7981 19.7291 20.0004C19.7291 20.2027 19.6925 20.4031 19.6215 20.59C19.5505 20.7769 19.4464 20.9466 19.3152 21.0895L2.40886 39.5489C2.14431 39.8377 1.78551 40 1.41138 40C1.03726 40 0.678453 39.8377 0.413906 39.5489C0.149359 39.26 0.000738978 38.8683 0.000738978 38.4598C0.000738978 38.0513 0.149359 37.6595 0.413906 37.3707L16.3256 20.0004L0.413906 2.63013C0.282704 2.48724 0.178609 2.31749 0.107584 2.1306C0.0365596 1.94372 0 1.74337 0 1.54103C0 1.33869 0.0365596 1.13834 0.107584 0.951458C0.178609 0.764572 0.282704 0.594821 0.413906 0.451928V0.451928Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.6848 0.451928C11.8157 0.308673 11.9711 0.195016 12.1423 0.117467C12.3134 0.039918 12.4969 0 12.6823 0C12.8676 0 13.0511 0.039918 13.2222 0.117467C13.3934 0.195016 13.5489 0.308673 13.6797 0.451928L30.5861 18.9113C30.7173 19.0542 30.8214 19.2239 30.8924 19.4108C30.9634 19.5977 31 19.7981 31 20.0004C31 20.2027 30.9634 20.4031 30.8924 20.59C30.8214 20.7769 30.7173 20.9466 30.5861 21.0895L13.6797 39.5489C13.4152 39.8377 13.0564 40 12.6823 40C12.3081 40 11.9493 39.8377 11.6848 39.5489C11.4202 39.26 11.2716 38.8683 11.2716 38.4598C11.2716 38.0513 11.4202 37.6595 11.6848 37.3707L27.5965 20.0004L11.6848 2.63013C11.5536 2.48724 11.4495 2.31749 11.3785 2.1306C11.3074 1.94372 11.2709 1.74337 11.2709 1.54103C11.2709 1.33869 11.3074 1.13834 11.3785 0.951458C11.4495 0.764572 11.5536 0.594821 11.6848 0.451928V0.451928Z" fill="white"/>
                </svg>
            </div>

            <div className="next">
                <svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.413906 0.451928C0.544777 0.308673 0.700247 0.195016 0.87141 0.117467C1.04257 0.039918 1.22607 0 1.41138 0C1.59669 0 1.78019 0.039918 1.95135 0.117467C2.12251 0.195016 2.27798 0.308673 2.40886 0.451928L19.3152 18.9113C19.4464 19.0542 19.5505 19.2239 19.6215 19.4108C19.6925 19.5977 19.7291 19.7981 19.7291 20.0004C19.7291 20.2027 19.6925 20.4031 19.6215 20.59C19.5505 20.7769 19.4464 20.9466 19.3152 21.0895L2.40886 39.5489C2.14431 39.8377 1.78551 40 1.41138 40C1.03726 40 0.678453 39.8377 0.413906 39.5489C0.149359 39.26 0.000738978 38.8683 0.000738978 38.4598C0.000738978 38.0513 0.149359 37.6595 0.413906 37.3707L16.3256 20.0004L0.413906 2.63013C0.282704 2.48724 0.178609 2.31749 0.107584 2.1306C0.0365596 1.94372 0 1.74337 0 1.54103C0 1.33869 0.0365596 1.13834 0.107584 0.951458C0.178609 0.764572 0.282704 0.594821 0.413906 0.451928V0.451928Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.6848 0.451928C11.8157 0.308673 11.9711 0.195016 12.1423 0.117467C12.3134 0.039918 12.4969 0 12.6823 0C12.8676 0 13.0511 0.039918 13.2222 0.117467C13.3934 0.195016 13.5489 0.308673 13.6797 0.451928L30.5861 18.9113C30.7173 19.0542 30.8214 19.2239 30.8924 19.4108C30.9634 19.5977 31 19.7981 31 20.0004C31 20.2027 30.9634 20.4031 30.8924 20.59C30.8214 20.7769 30.7173 20.9466 30.5861 21.0895L13.6797 39.5489C13.4152 39.8377 13.0564 40 12.6823 40C12.3081 40 11.9493 39.8377 11.6848 39.5489C11.4202 39.26 11.2716 38.8683 11.2716 38.4598C11.2716 38.0513 11.4202 37.6595 11.6848 37.3707L27.5965 20.0004L11.6848 2.63013C11.5536 2.48724 11.4495 2.31749 11.3785 2.1306C11.3074 1.94372 11.2709 1.74337 11.2709 1.54103C11.2709 1.33869 11.3074 1.13834 11.3785 0.951458C11.4495 0.764572 11.5536 0.594821 11.6848 0.451928V0.451928Z" fill="white"/>
                </svg>
            </div>

            <div className="main">
                <div className="left">
                    <div className="float">
                        
                        <svg className='circle' viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle id="c1" cx="25" cy="25" r="24" strokeWidth="0.3" stroke="white" fill="none" pathLength="100" />
                        </svg>

                        <div className="name">
                            {/* First */}
                            <h1>
                                Gojo Satoru
                            </h1>
                            <h1>
                                Rimuru Tempest
                            </h1>
                            <h1>
                                Sung Jinwoo
                            </h1>
                            <h1>
                                Zenitsu Aguma
                            </h1>
                        </div>


                    </div>
                </div>
                <div className="right">
                    <div className="gridItems">
                        <div className="title">
                            <div className="layer">
                                <h2>
                                    Jujutsu Kaisen
                                </h2>
                                <h2>
                                    Reincarnated Slime
                                </h2>
                                <h2>
                                    Solo Leveling
                                </h2>
                                <h2>
                                    Demon Slayer
                                </h2>
                            </div>
                        </div>
                        <div className="second-title">
                            <div className="layer">
                                <h1>
                                    呪術廻戦
                                </h1>
                                <h1>
                                    転生したらスライムだった件
                                </h1>
                                <h1>
                                    ソンジンウ
                                </h1>
                                <h1>
                                    鬼滅の刃
                                </h1>
                            </div>
                        </div>
                        <div className="chapter">
                            <div className="layer">
                                <h3>
                                    Ch. 188  주술회전
                                </h3>
                                <h3>
                                    Ch. 98  그때 나는 슬라임으로 환생했어
                                </h3>
                                <h3>
                                    Ch. 179  나 혼자만 레벨업
                                </h3>
                                <h3>
                                    Ch. 205  귀멸의 칼날
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Anime