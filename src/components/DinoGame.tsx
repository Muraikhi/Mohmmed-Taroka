
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface DinoGameProps {
  language: "en" | "ar";
}

const DinoGame: React.FC<DinoGameProps> = ({ language }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dinoHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reqIdRef = useRef<number>(0);

  // Game elements
  const playerRef = useRef({
    x: 50,
    y: 200,
    width: 30,
    height: 40,
    jumping: false,
    jumpHeight: 12,
    jumpCount: 0,
    sprite: new Image(),
  });

  const obstaclesRef = useRef<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    sprite: HTMLImageElement;
  }>>([]);

  const gameSpeedRef = useRef(4);
  const groundYRef = useRef(240);
  const gravityRef = useRef(0.7);
  const backgroundRef = useRef({
    x: 0,
    width: 800,
    speed: 1,
    sprite: new Image(),
  });
  
  // Load game assets
  useEffect(() => {
    // Load player sprite
    playerRef.current.sprite.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333EA'%3E%3Cpath d='M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z'/%3E%3C/svg%3E";
    
    // Load background
    backgroundRef.current.sprite.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='50' viewBox='0 0 800 50'%3E%3Cpath d='M0 25h800' stroke='%23888' stroke-width='2' stroke-dasharray='5,5'/%3E%3C/svg%3E";
  }, []);

  // Initialize the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    
    playerRef.current = {
      x: 50,
      y: groundYRef.current - 40,
      width: 30,
      height: 40,
      jumping: false,
      jumpHeight: 12,
      jumpCount: 0,
      sprite: playerRef.current.sprite,
    };
    
    obstaclesRef.current = [];
    gameSpeedRef.current = 4;
    backgroundRef.current.x = 0;
    
    // Start the game loop
    gameLoop();
  };

  // Game loop
  const gameLoop = () => {
    update();
    draw();
    reqIdRef.current = requestAnimationFrame(gameLoop);
  };

  // Update game state
  const update = () => {
    if (gameOver) return;

    // Update player
    if (playerRef.current.jumping) {
      if (playerRef.current.jumpCount < 15) {
        playerRef.current.y -= playerRef.current.jumpHeight - playerRef.current.jumpCount / 3;
        playerRef.current.jumpCount++;
      } else {
        playerRef.current.jumping = false;
        playerRef.current.jumpCount = 0;
      }
    } else if (playerRef.current.y < groundYRef.current - playerRef.current.height) {
      playerRef.current.y += gravityRef.current * 4;
    }

    // Ensure player doesn't fall through the ground
    if (playerRef.current.y > groundYRef.current - playerRef.current.height) {
      playerRef.current.y = groundYRef.current - playerRef.current.height;
    }

    // Update background
    backgroundRef.current.x -= backgroundRef.current.speed;
    if (backgroundRef.current.x <= -backgroundRef.current.width) {
      backgroundRef.current.x = 0;
    }

    // Generate obstacles
    if (Math.random() < 0.01 + Math.min(score / 10000, 0.03)) {
      const height = Math.random() * 30 + 20;
      const obstacle = {
        x: 800,
        y: groundYRef.current - height,
        width: 20,
        height: height,
        speed: gameSpeedRef.current,
        sprite: new Image(),
      };
      
      // Create obstacle sprite
      obstacle.sprite.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='30' viewBox='0 0 20 30' fill='%23EF4444'%3E%3Crect x='0' y='0' width='20' height='30' rx='2'/%3E%3C/svg%3E";
      
      obstaclesRef.current.push(obstacle);
    }

    // Update obstacles
    obstaclesRef.current.forEach((obstacle, i) => {
      obstacle.x -= obstacle.speed;

      // Remove obstacles that are off-screen
      if (obstacle.x < -obstacle.width) {
        obstaclesRef.current.splice(i, 1);
      }

      // Check for collision
      if (
        playerRef.current.x < obstacle.x + obstacle.width &&
        playerRef.current.x + playerRef.current.width > obstacle.x &&
        playerRef.current.y < obstacle.y + obstacle.height &&
        playerRef.current.y + playerRef.current.height > obstacle.y
      ) {
        endGame();
      }
    });

    // Increase score and game speed
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore % 500 === 0) {
        gameSpeedRef.current += 0.5;
        backgroundRef.current.speed += 0.1;
      }
      return newScore;
    });
  };

  // Draw the game
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (parallax effect)
    ctx.drawImage(backgroundRef.current.sprite, backgroundRef.current.x, groundYRef.current - 5);
    ctx.drawImage(backgroundRef.current.sprite, backgroundRef.current.x + backgroundRef.current.width, groundYRef.current - 5);

    // Draw ground
    ctx.beginPath();
    ctx.moveTo(0, groundYRef.current);
    ctx.lineTo(canvas.width, groundYRef.current);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw player as sprite instead of rectangle
    ctx.drawImage(
      playerRef.current.sprite,
      playerRef.current.x,
      playerRef.current.y,
      playerRef.current.width,
      playerRef.current.height
    );

    // Draw obstacles with sprites
    obstaclesRef.current.forEach(obstacle => {
      ctx.drawImage(
        obstacle.sprite,
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
      );
    });

    // Draw score with improved style
    ctx.fillStyle = '#888';
    ctx.font = '16px Arial';
    ctx.fillText(`${language === "en" ? "Score" : "النتيجة"}: ${score}`, 700, 30);
    ctx.fillText(`${language === "en" ? "High Score" : "أعلى نتيجة"}: ${Math.max(score, highScore)}`, 650, 60);
  };

  // End the game
  const endGame = () => {
    setGameOver(true);
    cancelAnimationFrame(reqIdRef.current);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dinoHighScore', score.toString());
    }
  };

  // Handle key and touch events
  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default space bar behavior to avoid page scrolling
      if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') {
        e.preventDefault();
        
        if (!playerRef.current.jumping && 
            playerRef.current.y >= groundYRef.current - playerRef.current.height - 1) {
          playerRef.current.jumping = true;
          playerRef.current.jumpCount = 0;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (!playerRef.current.jumping && 
          playerRef.current.y >= groundYRef.current - playerRef.current.height - 1) {
        playerRef.current.jumping = true;
        playerRef.current.jumpCount = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvasRef.current?.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvasRef.current?.removeEventListener('touchstart', handleTouchStart);
    };
  }, [gameStarted]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(reqIdRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-purple-600 text-white">
        <h2 className="text-xl font-bold">
          {language === "en" ? "Mohamed's Dino Game" : "لعبة محمد للديناصور"}
        </h2>
        <p className="text-sm text-white/80">
          {language === "en" 
            ? "Press Space or tap the screen to jump and avoid obstacles!" 
            : "اضغط على المسافة أو انقر على الشاشة للقفز وتجنب العوائق!"}
        </p>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={300} 
          className="border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer"
          onClick={() => {
            if (!gameStarted) {
              startGame();
            } else if (gameOver) {
              startGame();
            }
          }}
        />
        
        {!gameStarted && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === "en" ? "Mohamed's Dino Game" : "لعبة محمد للديناصور"}
            </h3>
            <Button 
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {language === "en" ? "Start Game" : "ابدأ اللعبة"}
            </Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-black/70 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2 text-white">
              {language === "en" ? "Game Over!" : "انتهت اللعبة!"}
            </h3>
            <p className="text-white mb-4">
              {language === "en" ? "Your score:" : "نتيجتك:"} {score}
            </p>
            <Button 
              onClick={startGame}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {language === "en" ? "Play Again" : "العب مرة أخرى"}
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Current Score:" : "النتيجة الحالية:"} {score}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "High Score:" : "أعلى نتيجة:"} {Math.max(score, highScore)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoGame;
