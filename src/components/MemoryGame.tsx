
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CardItem {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame: React.FC = () => {
  const { toast } = useToast();
  const language = localStorage.getItem("language") as "en" | "ar" || "en";
  
  const cardEmojis = ['🚀', '🎮', '🎨', '💻', '🎵', '📱', '🔥', '🌟'];
  const initialCards: CardItem[] = [];
  
  const generateCards = () => {
    const newCards: CardItem[] = [];
    const allEmojis = [...cardEmojis, ...cardEmojis]; // Duplicate for pairs
    
    for (let i = 0; i < allEmojis.length; i++) {
      newCards.push({
        id: i,
        value: allEmojis[i],
        flipped: false,
        matched: false,
      });
    }
    
    // Shuffle cards
    return newCards.sort(() => Math.random() - 0.5);
  };
  
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);
  
  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      
      if (cards[firstIndex].value === cards[secondIndex].value) {
        // Match found
        setCards(prevCards => prevCards.map((card, index) => 
          index === firstIndex || index === secondIndex 
            ? { ...card, matched: true } 
            : card
        ));
        
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prevCards => prevCards.map((card, index) => 
            index === firstIndex || index === secondIndex 
              ? { ...card, flipped: false } 
              : card
          ));
          
          setFlippedCards([]);
        }, 1000);
      }
      
      // Increment moves
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [flippedCards]);
  
  // Check if game is complete
  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every(card => card.matched);
    if (allMatched && !gameComplete && cards.length > 0) {
      setGameComplete(true);
      toast({
        title: language === "en" ? "Game Complete!" : "اكتملت اللعبة!",
        description: language === "en" 
          ? `You finished in ${moves} moves!` 
          : `لقد أنهيت في ${moves} حركة!`,
      });
    }
  }, [cards, gameComplete, moves, toast, language]);
  
  const handleCardClick = (index: number) => {
    // Ignore click if already flipped or matched or if two cards are already flipped
    if (
      cards[index].flipped || 
      cards[index].matched || 
      flippedCards.length >= 2
    ) {
      return;
    }
    
    // Flip the card
    setCards(prevCards => prevCards.map((card, i) => 
      i === index ? { ...card, flipped: true } : card
    ));
    
    // Add to flipped cards
    setFlippedCards(prev => [...prev, index]);
  };
  
  const startNewGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">
            {language === "en" ? "Memory Game" : "لعبة الذاكرة"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? `Moves: ${moves}` : `الحركات: ${moves}`}
          </p>
        </div>
        <Button onClick={startNewGame}>
          {language === "en" ? "New Game" : "لعبة جديدة"}
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 transform ${
              card.flipped || card.matched 
                ? 'bg-primary/10 scale-95' 
                : 'bg-primary hover:bg-primary/90'
            } ${gameComplete ? 'pointer-events-none' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {(card.flipped || card.matched) ? card.value : ''}
          </Card>
        ))}
      </div>
      
      {gameComplete && (
        <div className="mt-6 text-center">
          <p className="font-bold text-xl">
            {language === "en" 
              ? `Complete! ${moves} moves` 
              : `مكتمل! ${moves} حركة`}
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
