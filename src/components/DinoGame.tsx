
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
    jumpHeight: 15,
    jumpCount: 0,
  });

  const obstaclesRef = useRef<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
  }>>([]);

  const gameSpeedRef = useRef(4);
  const groundYRef = useRef(240);
  const gravityRef = useRef(0.8);

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
      jumpHeight: 15,
      jumpCount: 0,
    };
    
    obstaclesRef.current = [];
    gameSpeedRef.current = 4;
    
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
        playerRef.current.y -= playerRef.current.jumpHeight - playerRef.current.jumpCount / 2;
        playerRef.current.jumpCount++;
      } else {
        playerRef.current.jumping = false;
        playerRef.current.jumpCount = 0;
      }
    } else if (playerRef.current.y < groundYRef.current - playerRef.current.height) {
      playerRef.current.y += gravityRef.current * 5;
    }

    // Ensure player doesn't fall through the ground
    if (playerRef.current.y > groundYRef.current - playerRef.current.height) {
      playerRef.current.y = groundYRef.current - playerRef.current.height;
    }

    // Generate obstacles
    if (Math.random() < 0.01 + score / 10000) {
      const height = Math.random() * 30 + 20;
      obstaclesRef.current.push({
        x: 800,
        y: groundYRef.current - height,
        width: 20,
        height,
        speed: gameSpeedRef.current,
      });
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

    // Draw ground
    ctx.beginPath();
    ctx.moveTo(0, groundYRef.current);
    ctx.lineTo(canvas.width, groundYRef.current);
    ctx.strokeStyle = '#888';
    ctx.stroke();

    // Draw player
    ctx.fillStyle = '#9333EA';
    ctx.fillRect(
      playerRef.current.x,
      playerRef.current.y,
      playerRef.current.width,
      playerRef.current.height
    );

    // Draw obstacles
    ctx.fillStyle = '#EF4444';
    obstaclesRef.current.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw score
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
      if ((e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') && 
          !playerRef.current.jumping && 
          playerRef.current.y >= groundYRef.current - playerRef.current.height) {
        playerRef.current.jumping = true;
        playerRef.current.jumpCount = 0;
      }
    };

    const handleTouchStart = () => {
      if (!playerRef.current.jumping && 
          playerRef.current.y >= groundYRef.current - playerRef.current.height) {
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
