
import React from 'react';
import MemoryGame from '@/components/MemoryGame';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

const Game = () => {
  const language = localStorage.getItem('language') as 'en' | 'ar' || 'en';
  
  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>
            {language === 'en' ? 'Games Corner' : 'ركن الألعاب'}
          </SectionTitle>
          
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">
            {language === 'en' 
              ? 'Take a break and enjoy some fun games. Challenge yourself and see how well you can do!' 
              : 'خذ قسطًا من الراحة واستمتع ببعض الألعاب الممتعة. تحدى نفسك وانظر كيف يمكنك أن تفعل!'}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="text-center text-2xl">
                  {language === 'en' ? 'Memory Game' : 'لعبة الذاكرة'}
                </CardTitle>
                <CardDescription className="text-center">
                  {language === 'en' 
                    ? 'Find all matching pairs with as few moves as possible!' 
                    : 'اعثر على جميع الأزواج المتطابقة بأقل عدد ممكن من الحركات!'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <MemoryGame />
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Placeholder for future games */}
          <motion.div 
            className="col-span-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-72 flex items-center justify-center border-dashed border-2 border-muted-foreground/30">
              <CardContent className="text-center text-muted-foreground">
                <p className="mb-2 text-lg">Coming Soon</p>
                <p>More games will be added soon!</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="col-span-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="h-72 flex items-center justify-center border-dashed border-2 border-muted-foreground/30">
              <CardContent className="text-center text-muted-foreground">
                <p className="mb-2 text-lg">Coming Soon</p>
                <p>More games will be added soon!</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="col-span-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="h-72 flex items-center justify-center border-dashed border-2 border-muted-foreground/30">
              <CardContent className="text-center text-muted-foreground">
                <p className="mb-2 text-lg">Coming Soon</p>
                <p>More games will be added soon!</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Game;
