import React, { useEffect, useRef } from 'react';

const AnimatedEmojiBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    const mouse = {
      x: null,
      y: null,
      radius: 100,
      isDown: false,
      justReleased: false,
      hasMoved: false
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.hasMoved = true;
    };

    const handleMouseDown = (event) => {
      if (event.button === 0) {
        mouse.isDown = true;
        mouse.justReleased = false;
      }
    };

    const handleMouseUp = (event) => {
      if (event.button === 0) {
        mouse.isDown = false;
        mouse.justReleased = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.targetVx = this.vx;
        this.targetVy = this.vy;
        this.pushTimer = 0;
        this.attractionFactor = 0.01 + Math.random() * 0.02;
        this.emoji = ['🚀', '⭐', '☄️', '🔥'][Math.floor(Math.random() * 4)];
        this.size = 20;
      }

      draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.emoji, this.x, this.y);
      }

      update(particles) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          this.targetVx = (Math.random() - 0.5) * 3;
          this.targetVy = (Math.random() - 0.5) * 3;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          this.targetVx = (Math.random() - 0.5) * 3;
          this.targetVy = (Math.random() - 0.5) * 3;
        }
        for (let other of particles) {
          if (other !== this) {
            let dx = this.x - other.x;
            let dy = this.y - other.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 60 && distance > 0) {
              let force = (60 - distance) / 60 * 1.5;
              this.targetVx += (dx / distance) * force;
              this.targetVy += (dy / distance) * force;
            }
          }
        }
        if (mouse.x !== null && mouse.y !== null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (mouse.isDown) {
            this.targetVx = -dx * this.attractionFactor;
            this.targetVy = -dy * this.attractionFactor;
            this.pushTimer = 0;
          } else {
            if (mouse.justReleased) {
              let speed = 30 + Math.random() * 70;
              this.targetVx = (Math.random() - 0.5) * speed;
              this.targetVy = (Math.random() - 0.5) * speed;
              this.pushTimer = 60;
              mouse.justReleased = false;
            } else if (distance < mouse.radius && this.pushTimer === 0) {
              this.targetVx = (dx / distance) * 10;
              this.targetVy = (dy / distance) * 10;
              this.pushTimer = 90;
            } else {
              if (this.pushTimer > 0) {
                this.pushTimer--;
              } else {
                this.targetVx = (Math.random() - 0.5) * (mouse.hasMoved ? 5 : 1);
                this.targetVy = (Math.random() - 0.5) * (mouse.hasMoved ? 5 : 1);
              }
            }
          }
        }
        this.vx += (this.targetVx - this.vx) * 0.05;
        this.vy += (this.targetVy - this.vy) * 0.05;
        this.vx *= 0.98;
        this.vy *= 0.98;
      }
    }

    const particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update(particles);
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
  );
};

export default AnimatedEmojiBackground;