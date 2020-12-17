import { ReactElement, useEffect, useRef } from 'react';
import { eventAdder, eventRemover } from '../utils/events-manager';
import requestAnimationFrame from '../utils/request-animation-frame';
import isTouchScreen from '../utils/is-touch-screen';
import style from '../styles/card.module.scss';
import editor from '../images/faux-code.svg';

interface IEvents {
  mouse: object;
  touch: object;
}

interface IProps {
  animated?: boolean;
  mobile?: boolean;
}

Card.defaultProps = {
  animated: true,
  mobile: true,
}

export default function Card({ mobile, animated }: IProps): ReactElement {
  const container: any = useRef(null);
  const content: any = useRef(null);

  useEffect(() => {
    const containerCRT: HTMLDivElement = container.current;
    const cardCRT: HTMLDivElement = content.current;

    let x: number | null = null;
    let y: number | null = null;

    function transform(scale: number = 1, _x: number | null = x, _y: number | null = y): void {
      cardCRT.style.transform = `rotateY(${_x}deg) rotateX(${_y}deg) scale(${scale})`;
    }

    function setPosition(pageX: number, pageY: number): void {
      const { top: topIndent, left: leftIndent, width, height } = containerCRT.getBoundingClientRect();  

      x = -((+pageX - leftIndent) - width / 2) / 20;
      y = ((+pageY - topIndent) - height / 2) / 15;

      transform(1.05)
    }

    function resetPosition(): void {
      cardCRT.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';

      transform(1, 0, 0);
    }

    function stopTransition(): void {
      cardCRT.style.transition = '';
    }
    
    function resetOverflow(): void {
      document.body.style.overflow = '';
    }
    
    function stopOverflow(): void {
      document.body.style.overflow = 'hidden';
    }

    const events: IEvents = {
      mouse: {
        mousemove: (e: MouseEvent) => requestAnimationFrame(() => setPosition(e.pageX, e.pageY)),
        mouseenter: stopTransition,
        mousedown: () => transform(1),
        mouseup: () => transform(1.05),
        mouseleave: resetPosition,
      },
      touch: {
        touchmove: (e: TouchEvent) => requestAnimationFrame(() => setPosition(e.touches[0].pageX, e.touches[0].pageY)),
        touchstart: () => {
          stopOverflow();
          stopTransition();
        },
        touchend: () => {
          resetOverflow();
          resetPosition();
        },
        touchcancel: () => {
          // Doesn't work on iOS Safari
          resetOverflow();
          resetPosition();
        },
      },
    }

    if (animated) {
      if ('TouchEvent' in window && mobile)
        eventAdder(containerCRT, events.touch);
      if ('MouseEvent' in window && !isTouchScreen())
        eventAdder(containerCRT, events.mouse);
        
      return function cleanup() {
        if ('TouchEvent' in window && mobile)
          eventRemover(containerCRT, events.touch);
        if ('MouseEvent' in window && !isTouchScreen())
          eventRemover(containerCRT, events.mouse);
      }
    }
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
