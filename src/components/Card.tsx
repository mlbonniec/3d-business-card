import React, { useEffect, useRef } from 'react';
import style from '../styles/card.module.scss';
import editor from '../images/faux-code.svg';

export default function Card() {
  const container: any = useRef(null);
  const content: any = useRef(null);

  useEffect(() => {
    const containerCRT: HTMLDivElement = container.current;
    const cardCRT: HTMLDivElement = content.current;

    let x: number | null = null;
    let y: number | null = null;

    function transform(scale: Number = 1, _x: Number | null = x, _y: Number | null = y): void {
      cardCRT.style.transform = `rotateY(${_x}deg) rotateX(${_y}deg) scale(${scale})`;
    }
    
    function setPosition(pageX: Number, pageY: Number): void {
      const { top: topIndent, left: leftIndent, width, height } = containerCRT.getBoundingClientRect();  
      
      x = -((+pageX - leftIndent) - width / 2) / 20;
      y = ((+pageY - topIndent) - height / 2) / 15;
      
      transform(1.05)
    }
    
    function resetPosition(): void {
      cardCRT.style.transition = 'all 0.35s ease';
      
      transform(1, 0, 0);
    }
    
    function stopTransition(): void {
      cardCRT.style.transition = ''
    }
    
    if ('MouseEvent' in window) {
      containerCRT.addEventListener('mousemove', (e: MouseEvent) => setPosition(e.pageX, e.pageY));
      containerCRT.addEventListener('mouseenter', stopTransition);
      containerCRT.addEventListener('mousedown', () => transform(1));
      containerCRT.addEventListener('mouseup', () => transform(1.05));
      containerCRT.addEventListener('mouseleave', resetPosition);
    }
    containerCRT.addEventListener('mouseup', () => {
      cardCRT.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
    });
  });

  return (
    <div id={style.card} ref={container}>
      <div className={style['card__content']} ref={content}>
        <h1 className={style.name}>
          Mathis
          <span className={style.name__lastname}>Le Bonniec</span>
        </h1>
        <p className={style.title}>Developer</p>
        <footer id={style.footer}>
          <p>
            <a href="https://mathislebonniec.fr" target="_blank" rel="noreferrer">mathislebonniec.fr</a>
          </p>
          <p>
            <a href="mailto:mathislbonniec@gmail.com">mathislbonniec@gmail.com</a>
          </p>
        </footer>
        <img src={editor} alt="Editeur de texte abstrait" className={style.editor} />
      </div>
    </div>
  );
}
