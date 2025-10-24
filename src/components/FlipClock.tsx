'use client'

import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

// Exact FlipClock.js animations
const turn = keyframes`
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`

const turn2 = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
`

const asd = keyframes`
  0% {
    z-index: 2;
  }
  20% {
    z-index: 4;
  }
  100% {
    z-index: 4;
  }
`

const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const hide = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

// Centered and smaller FlipClock styled components
const FlipClockWrapper = styled.div`
  font: normal 11px "Helvetica Neue", Helvetica, sans-serif;
  -webkit-user-select: none;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  margin: 1em auto;
  max-width: 280px;
  padding: 15px 0;
  overflow: visible;
dark mode
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  ul {
    list-style: none;
    position: relative;
    margin: 2px;
    width: 40px;
    height: 60px;
    font-size: 50px;
    font-weight: bold;
    line-height: 58px;
    border-radius: 4px;
    background: #f1f1f1;
    box-shadow: ${({ theme }) => theme.shadows.md};

    [data-theme='dark'] & {
      background: #000;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    }
  }

  ul li {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 58px;
    text-decoration: none !important;
  }

  ul li:first-child {
    z-index: 2;
  }

  ul li a {
    display: block;
    height: 100%;
    -webkit-perspective: 200px;
    -moz-perspective: 200px;
    perspective: 200px;
    margin: 0 !important;
    overflow: visible !important;
    cursor: default !important;
  }

  ul li a div {
    z-index: 1;
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
    font-size: 50px;
    overflow: hidden;
    outline: 1px solid transparent;
  }

  ul li a div .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  ul li a div.up {
    -webkit-transform-origin: 50% 100%;
    -moz-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    -o-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    top: 0;
  }

  ul li a div.up:after {
    content: "";
    position: absolute;
    top: 29px;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.light.border};

    [data-theme='dark'] & {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  ul li a div.down {
    -webkit-transform-origin: 50% 0;
    -moz-transform-origin: 50% 0;
    -ms-transform-origin: 50% 0;
    -o-transform-origin: 50% 0;
    transform-origin: 50% 0;
    bottom: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  ul li a div div.inn {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 200%;
    color: ${({ theme }) => theme.colors.light.text};
    text-shadow: none;
    text-align: center;
    background-color: #f1f1f1;
    border-radius: 4px;
    font-size: 46px;

    [data-theme='dark'] & {
      color: #ccc;
      text-shadow: 0 1px 2px #000;
      background-color: #333;
    }
  }

  ul li a div.up div.inn {
    top: 0;
  }

  ul li a div.down div.inn {
    bottom: 0;
  }

  /* Play state animations */
  ul.play li.flip-clock-before {
    z-index: 3;
  }

  .flip {
    box-shadow: ${({ theme }) => theme.shadows.lg};

    [data-theme='dark'] & {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    }
  }

  ul.play li.flip-clock-active {
    animation: ${asd} 0.5s 0.5s linear both;
    z-index: 5;
  }

  ul.play li.flip-clock-active .down {
    z-index: 2;
    animation: ${turn} 0.5s 0.5s linear both;
  }

  ul.play li.flip-clock-before .up {
    z-index: 2;
    animation: ${turn2} 0.5s linear both;
  }

  ul li.flip-clock-active {
    z-index: 3;
  }

  /* Shadow animations */
  ul.play li.flip-clock-before .up .shadow {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, black 100%);
    animation: ${show} 0.5s linear both;
  }

  ul.play li.flip-clock-active .up .shadow {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, black 100%);
    animation: ${hide} 0.5s 0.3s linear both;
  }

  ul.play li.flip-clock-before .down .shadow {
    background: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%);
    animation: ${show} 0.5s linear both;
  }

  ul.play li.flip-clock-active .down .shadow {
    background: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%);
    animation: ${hide} 0.5s 0.2s linear both;
  }
`

const FlipClockDivider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 12px;
  height: 60px;
  margin: 0 6px;
  margin-top: 40px; /* Align with center of number cards */
`

const FlipClockDot = styled.div<{ $position: 'top' | 'bottom' }>`
  display: block;
  background: ${({ theme }) => theme.colors.light.text};
  width: 4px;
  height: 4px;
  border-radius: 50%;
  box-shadow: 0 0 2px ${({ theme }) => `${theme.colors.light.text}30`};
  margin: ${({ $position }) => $position === 'top' ? '0 0 6px 0' : '6px 0 0 0'};

  [data-theme='dark'] & {
    background: ${({ theme }) => theme.colors.dark.text};
    box-shadow: 0 0 2px ${({ theme }) => `${theme.colors.dark.text}30`};
  }
`

const FlipClockSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 90px;
  padding-top: 4px;
`

const FlipClockSectionLabel = styled.div`
  font-family: 'Helvetica Neue', Arial, sans-serif !important;
  font-size: 14px !important;
  color: ${({ theme }) => theme.colors.light.text} !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  font-weight: 400 !important;
  margin-bottom: 8px !important;
  text-align: center !important;
  z-index: 100 !important;
  position: relative !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text} !important;
  }
`

const FlipClockDigits = styled.div`
  display: flex;
  gap: 2px;
`


interface FlipDigitComponentProps {
  target: number;
  delay?: number;
  shouldAnimate?: boolean;
}

const FlipDigitComponent: React.FC<FlipDigitComponentProps> = ({ target, delay = 0, shouldAnimate = false }) => {
  const [digit, setDigit] = useState(0);
  const [prevDigit, setPrevDigit] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Reset to 0 when not animating
    if (!shouldAnimate) {
      setDigit(0);
      setPrevDigit(0);
      setIsPlaying(false);
      return;
    }

    if (target === 0) {
      setDigit(0);
      return;
    }

    const timer = setTimeout(() => {
      let current = 0;
      
      const flipNext = () => {
        if (current < target && shouldAnimate) {
          const next = current + 1;
          setPrevDigit(current);
          setIsPlaying(true);
          
          setTimeout(() => {
            setDigit(next);
            current = next;
            
            setTimeout(() => {
              setIsPlaying(false);
              if (current < target && shouldAnimate) {
                setTimeout(flipNext, 100);
              }
            }, 1000);
          }, 100);
        }
      };
      
      flipNext();
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay, shouldAnimate]);

  return (
    <ul className={`flip ${isPlaying ? 'play' : ''}`}>
      <li className="flip-clock-before">
        <a href="#">
          <div className="up">
            <div className="shadow"></div>
            <div className="inn">{prevDigit}</div>
          </div>
          <div className="down">
            <div className="shadow"></div>
            <div className="inn">{prevDigit}</div>
          </div>
        </a>
      </li>
      <li className="flip-clock-active">
        <a href="#">
          <div className="up">
            <div className="shadow"></div>
            <div className="inn">{digit}</div>
          </div>
          <div className="down">
            <div className="shadow"></div>
            <div className="inn">{digit}</div>
          </div>
        </a>
      </li>
    </ul>
  );
};

interface FlipClockProps {
  years: number;
  months: number;
  shouldAnimate?: boolean;
}

const FlipClock: React.FC<FlipClockProps> = ({ years, months, shouldAnimate = false }) => {
  const yearsStr = years.toString().padStart(2, '0');
  const monthsStr = months.toString().padStart(2, '0');

  return (
    <FlipClockWrapper className="flip-clock-wrapper">
      <FlipClockSection>
        <FlipClockSectionLabel>Years</FlipClockSectionLabel>
        <FlipClockDigits>
          <FlipDigitComponent target={parseInt(yearsStr[0])} delay={500} shouldAnimate={shouldAnimate} />
          <FlipDigitComponent target={parseInt(yearsStr[1])} delay={500} shouldAnimate={shouldAnimate} />
        </FlipClockDigits>
      </FlipClockSection>
      
      <FlipClockDivider>
        <FlipClockDot $position="top" />
        <FlipClockDot $position="bottom" />
      </FlipClockDivider>
      
      <FlipClockSection>
        <FlipClockSectionLabel>Months</FlipClockSectionLabel>
        <FlipClockDigits>
          <FlipDigitComponent target={parseInt(monthsStr[0])} delay={500} shouldAnimate={shouldAnimate} />
          <FlipDigitComponent target={parseInt(monthsStr[1])} delay={500} shouldAnimate={shouldAnimate} />
        </FlipClockDigits>
      </FlipClockSection>
    </FlipClockWrapper>
  );
};

export default FlipClock;
