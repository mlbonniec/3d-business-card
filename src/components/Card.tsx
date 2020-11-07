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

    // Moving Animation Event
    containerCRT.addEventListener('mousemove', (e: MouseEvent) => {
      const { top: topIndent, left: leftIndent, width, height } = containerCRT.getBoundingClientRect();
      x = -((e.pageX - leftIndent) - width / 2) / 20;
      y = ((e.pageY - topIndent) - height / 2) / 15;
      
      cardCRT.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
    });

    // Animate In
    containerCRT.addEventListener('mouseenter', () => {
      cardCRT.style.transition = '';
    });

    // Animate Out
    containerCRT.addEventListener('mouseleave', () => {
      cardCRT.style.transition = 'all 0.35s ease';
      cardCRT.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    });

    containerCRT.addEventListener('mousedown', () => {
      cardCRT.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1)`;
    });

    containerCRT.addEventListener("mouseup", () => {
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
