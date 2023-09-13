'use client'

import React, { useEffect, useRef } from 'react';
import { TweenLite, Circ } from 'gsap';

function AnimatedBackground({ children }: React.PropsWithChildren<{}>) {
  const largeHeaderRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<{
    circle?: any;
    active?: number;
    x: number;
    originX: number;
    y: number;
    originY: number;
    closest?: any[];
  }[]>([]);
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animateHeaderRef = useRef<boolean>(true);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const initHeader = () => {
      targetRef.current = { x: width / 2, y: height / 2 };

      if (largeHeaderRef.current) {
        largeHeaderRef.current.style.height = height + 'px';
      }

      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        ctxRef.current = canvasRef.current.getContext('2d');
      }

      pointsRef.current = [];

      for (let x = 0; x < width; x = x + width / 20) {
        for (let y = 0; y < height; y = y + height / 20) {
          const px = x + Math.random() * (width / 20);
          const py = y + Math.random() * (height / 20);
          const p = { x: px, originX: px, y: py, originY: py, closest: [] };
          pointsRef.current.push(p);
        }
      }

      for (let i = 0; i < pointsRef.current.length; i++) {
        const closest: any[] = [];
        const p1 = pointsRef.current[i];
        for (let j = 0; j < pointsRef.current.length; j++) {
          const p2 = pointsRef.current[j];
          if (!(p1 === p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      for (let i in pointsRef.current) {
        const c = new Circle(pointsRef.current[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        pointsRef.current[i].circle = c;
      }
    };

    const addListeners = () => {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    };

    const mouseMove = (e: MouseEvent) => {
      let posx = 0;
      let posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      targetRef.current = { x: posx, y: posy };
    };

    const scrollCheck = () => {
      if (document.body.scrollTop > height) {
        animateHeaderRef.current = false;
      } else {
        animateHeaderRef.current = true;
      }
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (largeHeaderRef.current) {
        largeHeaderRef.current.style.height = height + 'px';
      }
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    const initAnimation = () => {
      animate();
      for (let i in pointsRef.current) {
        shiftPoint(pointsRef.current[i]);
      }
    };

    const animate = () => {
      if (animateHeaderRef.current && ctxRef.current) {
        ctxRef.current.clearRect(0, 0, width, height);
        for (let i in pointsRef.current) {
          if (ctxRef.current) {
            if (Math.abs(getDistance(targetRef.current, pointsRef.current[i])) < 4000) {
              pointsRef.current[i].active = 0.3;
              pointsRef.current[i].circle.active = 0.6;
            } else if (Math.abs(getDistance(targetRef.current, pointsRef.current[i])) < 20000) {
              pointsRef.current[i].active = 0.1;
              pointsRef.current[i].circle.active = 0.3;
            } else if (Math.abs(getDistance(targetRef.current, pointsRef.current[i])) < 40000) {
              pointsRef.current[i].active = 0.02;
              pointsRef.current[i].circle.active = 0.1;
            } else {
              pointsRef.current[i].active = 0;
              pointsRef.current[i].circle.active = 0;
            }

            drawLines(pointsRef.current[i]);
            pointsRef.current[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }
    };

    const shiftPoint = (p: any) => {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => {
          shiftPoint(p);
        },
      });
    };

    const drawLines = (p: any) => {
      if (!p.active || !ctxRef.current) return;
      for (let i in p.closest) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(p.x, p.y);
        ctxRef.current.lineTo(p.closest[i].x, p.closest[i].y);
        ctxRef.current.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
        ctxRef.current.stroke();
      }
    };

    class Circle {
      private pos: { x: number; y: number };
      private radius: number;
      private color: string;
      private active: boolean;
    
      constructor(pos: { x: number; y: number }, rad: number, color: string) {
        this.pos = pos || { x: 0, y: 0 };
        this.radius = rad || 0;
        this.color = color || '';
        this.active = true;
      }
    
      draw(ctxRef: CanvasRenderingContext2D | null) {
        if (!this.active || !ctxRef) return;
    
        ctxRef.beginPath();
        ctxRef.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctxRef.fillStyle = `rgba(156, 217, 249, ${this.active})`;
        ctxRef.fill();
      }
    }

    const getDistance = (p1: any, p2: any) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    initHeader();
    initAnimation();
    addListeners();
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div id="animated-background" style={{ position: 'relative' }}>
      <canvas id="demo-canvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
      <div id="large-header" ref={largeHeaderRef}>
        {children}
      </div>
    </div>
  );
}

export default AnimatedBackground;
