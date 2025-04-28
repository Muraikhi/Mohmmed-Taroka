
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ImageTabProps {
  language: "en" | "ar";
}

const ImageTab: React.FC<ImageTabProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Home Images" : "صور الصفحة الرئيسية"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Add images to display on your home page" 
              : "أضف صورًا لعرضها على صفحتك الرئيسية"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {/* Home images content */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageTab;
