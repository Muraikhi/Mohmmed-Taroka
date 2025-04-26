
import React from 'react';
import MemoryGame from '@/components/MemoryGame';
import SectionTitle from '@/components/SectionTitle';

const Game = () => {
  const language = localStorage.getItem('language') as 'en' | 'ar' || 'en';
  
  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="pt-24 pb-16 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>
          {language === 'en' ? 'Memory Game' : 'لعبة الذاكرة'}
        </SectionTitle>
        
        <div className="mt-10 max-w-xl mx-auto">
          <div className="bg-card shadow-lg rounded-lg p-6">
            <p className="mb-8 text-center text-muted-foreground">
              {language === 'en' 
                ? 'Find all matching pairs with as few moves as possible!' 
                : 'اعثر على جميع الأزواج المتطابقة بأقل عدد ممكن من الحركات!'}
            </p>
            
            <MemoryGame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
