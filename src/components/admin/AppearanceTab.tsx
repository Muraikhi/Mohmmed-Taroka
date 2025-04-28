
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppearanceTabProps {
  language: "en" | "ar";
  settings: any;
  handleThemeChange: (key: string, value: string) => void;
  handleLogoChange: (key: string, value: string) => void;
  safelyAccess: (obj: any, path: string, defaultValue: any) => any;
  logoFileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({
  language,
  settings,
  handleThemeChange,
  handleLogoChange,
  safelyAccess,
  logoFileInputRef,
  handleFileUpload
}) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Theme Settings" : "إعدادات الثيم"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Customize your website's color scheme" 
              : "تخصيص مخطط ألوان موقع الويب الخاص بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">{language === "en" ? "Primary Color" : "اللون الأساسي"}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="primaryColor"
                  type="color" 
                  value={safelyAccess(settings, 'theme.primary', "#9333ea")} 
                  onChange={(e) => handleThemeChange('primary', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">{safelyAccess(settings, 'theme.primary', "#9333ea")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">{language === "en" ? "Secondary Color" : "اللون الثانوي"}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="secondaryColor"
                  type="color" 
                  value={safelyAccess(settings, 'theme.secondary', "#a855f7")} 
                  onChange={(e) => handleThemeChange('secondary', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">{safelyAccess(settings, 'theme.secondary', "#a855f7")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">{language === "en" ? "Accent Color" : "لون التمييز"}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="accentColor"
                  type="color" 
                  value={safelyAccess(settings, 'theme.accent', "#c084fc")} 
                  onChange={(e) => handleThemeChange('accent', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">{safelyAccess(settings, 'theme.accent', "#c084fc")}</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => {
              toast({
                title: language === "en" ? "Theme Updated" : "تم تحديث الثيم",
                description: language === "en" ? "Your theme settings have been saved" : "تم حفظ إعدادات الثيم الخاصة بك",
              });
              
              document.documentElement.style.setProperty('--primary', safelyAccess(settings, 'theme.primary', "#9333ea"));
              document.documentElement.style.setProperty('--secondary', safelyAccess(settings, 'theme.secondary', "#a855f7"));
              document.documentElement.style.setProperty('--accent', safelyAccess(settings, 'theme.accent', "#c084fc"));
            }}
            style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
          >
            {language === "en" ? "Save Theme Settings" : "حفظ إعدادات الثيم"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Logo Settings" : "إعدادات الشعار"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Customize your website's logo" 
              : "تخصيص شعار موقع الويب الخاص بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Logo settings content */}
          <div className="space-y-2">
            <Label htmlFor="logoText">{language === "en" ? "Logo Text" : "نص الشعار"}</Label>
            <Input 
              id="logoText"
              value={safelyAccess(settings, 'logo.text', "Mohamed Taroqa")} 
              onChange={(e) => handleLogoChange('text', e.target.value)}
              placeholder={language === "en" ? "Enter logo text" : "أدخل نص الشعار"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logoImage">{language === "en" ? "Logo Image" : "صورة الشعار"}</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Input 
                  id="logoImage"
                  value={safelyAccess(settings, 'logo.image', "")} 
                  onChange={(e) => handleLogoChange('image', e.target.value)}
                  placeholder={language === "en" ? "Enter logo image URL or upload" : "أدخل رابط صورة الشعار أو قم بتحميلها"}
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  type="button" 
                  onClick={() => logoFileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Upload</span>
                </Button>
                <input 
                  ref={logoFileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, (url) => handleLogoChange('image', url))} 
                />
              </div>
              
              {safelyAccess(settings, 'logo.image', "") && (
                <div className="flex items-center gap-4 bg-muted p-3 rounded-md">
                  <img 
                    src={safelyAccess(settings, 'logo.image', "")} 
                    alt="Logo Preview" 
                    className="h-10 w-10 object-contain rounded border"
                  />
                  <span className="text-sm text-muted-foreground">Logo Preview</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={() => handleLogoChange('image', '')}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <Button
            onClick={() => {
              toast({
                title: language === "en" ? "Logo Updated" : "تم تحديث الشعار",
                description: language === "en" ? "Your logo settings have been saved" : "تم حفظ إعدادات الشعار الخاصة بك",
              });
            }}
            style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
          >
            {language === "en" ? "Save Logo Settings" : "حفظ إعدادات الشعار"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceTab;
