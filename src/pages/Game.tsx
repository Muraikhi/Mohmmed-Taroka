
import React from 'react';
import DinoGame from '@/components/DinoGame';
import SectionTitle from '@/components/SectionTitle';
import ScrollReveal from '@/components/ScrollReveal';

const Game = () => {
  const language = localStorage.getItem("language") as "en" | "ar" || "en";

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="pt-20">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={language === "en" ? "Let's Play a Game!" : "لنلعب لعبة!"} 
            subtitle={language === "en" 
              ? "Take a break and enjoy my custom version of the Chrome Dinosaur Game."
              : "خذ استراحة واستمتع بنسختي المخصصة من لعبة ديناصور كروم."
            }
            center
          />
          
          <ScrollReveal delay={300}>
            <div className="mt-8">
              <DinoGame language={language} />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={500}>
            <div className="mt-16 max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">
                {language === "en" ? "Game Instructions" : "تعليمات اللعبة"}
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {language === "en"
                    ? "Jump over obstacles to survive as long as possible and achieve the highest score."
                    : "اقفز فوق العقبات للبقاء على قيد الحياة لأطول فترة ممكنة وتحقيق أعلى نتيجة."
                  }
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    {language === "en"
                      ? "Press the Space key or up arrow to jump (on desktop)"
                      : "اضغط على مفتاح المسافة أو السهم لأعلى للقفز (على سطح المكتب)"
                    }
                  </li>
                  <li>
                    {language === "en"
                      ? "Tap the screen to jump (on mobile devices)"
                      : "اضغط على الشاشة للقفز (على الأجهزة المحمولة)"
                    }
                  </li>
                  <li>
                    {language === "en"
                      ? "The game gets faster as your score increases"
                      : "تزداد سرعة اللعبة مع زيادة نتيجتك"
                    }
                  </li>
                  <li>
                    {language === "en"
                      ? "Your high score is saved locally"
                      : "يتم حفظ أعلى نتيجة لك محليًا"
                    }
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={700}>
            <div className="mt-12 p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
              <h4 className="font-semibold text-xl mb-4">
                {language === "en" ? "Fun Fact" : "حقيقة ممتعة"}
              </h4>
              <p>
                {language === "en"
                  ? "This game is inspired by the Chrome Dinosaur Game that appears when you're offline. I added my own twist with custom colors and physics to make it more fun!"
                  : "هذه اللعبة مستوحاة من لعبة ديناصور كروم التي تظهر عندما تكون غير متصل بالإنترنت. لقد أضفت لمستي الخاصة بألوان مخصصة وفيزياء لجعلها أكثر متعة!"
                }
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Game;
