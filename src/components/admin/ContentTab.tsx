
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentTabProps {
  language: "en" | "ar";
  settings: any;
  handleHeroChange: (key: string, value: string) => void;
  handleAboutChange: (key: string, value: string) => void;
  handleContactChange: (key: string, value: string) => void;
  safelyAccess: (obj: any, path: string, defaultValue: any) => any;
  heroImageFileInputRef: React.RefObject<HTMLInputElement>;
  aboutImageFileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => void;
  handleSaveAboutContent: () => void;
}

const ContentTab: React.FC<ContentTabProps> = ({
  language,
  settings,
  handleHeroChange,
  handleAboutChange,
  handleContactChange,
  safelyAccess,
  heroImageFileInputRef,
  aboutImageFileInputRef,
  handleFileUpload,
  handleSaveAboutContent
}) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      {/* Hero Section Card */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Hero Section" : "قسم البطل"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Customize your website's hero section content" 
              : "تخصيص محتوى قسم البطل في موقع الويب الخاص بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hero content form */}
          <div className="space-y-2">
            <Label htmlFor="heroTitle">{language === "en" ? "Hero Title" : "عنوان البطل"}</Label>
            <Input 
              id="heroTitle"
              value={safelyAccess(settings, 'hero.title', "Creative Developer")} 
              onChange={(e) => handleHeroChange('title', e.target.value)}
              placeholder={language === "en" ? "Enter hero title" : "أدخل عنوان البطل"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">{language === "en" ? "Hero Subtitle" : "العنوان الفرعي للبطل"}</Label>
            <Textarea 
              id="heroSubtitle"
              value={safelyAccess(settings, 'hero.subtitle', "")} 
              onChange={(e) => handleHeroChange('subtitle', e.target.value)}
              placeholder={language === "en" ? "Enter hero subtitle" : "أدخل العنوان الفرعي للبطل"}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="heroImage">{language === "en" ? "Hero Image" : "صورة البطل"}</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Input 
                  id="heroImage"
                  value={safelyAccess(settings, 'hero.image', "")} 
                  onChange={(e) => handleHeroChange('image', e.target.value)}
                  placeholder={language === "en" ? "Enter hero image URL or upload" : "أدخل رابط صورة البطل أو قم بتحميلها"}
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  type="button" 
                  onClick={() => heroImageFileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input 
                  ref={heroImageFileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, (url) => handleHeroChange('image', url))} 
                />
              </div>
              
              {safelyAccess(settings, 'hero.image', "") && (
                <div className="flex items-center gap-4 bg-muted p-3 rounded-md">
                  <img 
                    src={safelyAccess(settings, 'hero.image', "")} 
                    alt="Hero Preview" 
                    className="h-16 w-16 object-cover rounded border"
                  />
                  <span className="text-sm text-muted-foreground">Hero Image Preview</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={() => handleHeroChange('image', '')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section Card */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "About Section" : "قسم حول"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Customize your website's about section content" 
              : "تخصيص محتوى قسم حول في موقع الويب الخاص بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutContent">{language === "en" ? "About Content" : "محتوى حول"}</Label>
            <Textarea 
              id="aboutContent"
              value={safelyAccess(settings, 'about.content', "")} 
              onChange={(e) => handleAboutChange('content', e.target.value)}
              placeholder={language === "en" ? "Enter about content" : "أدخل محتوى حول"}
              rows={5}
            />
          </div>
          
          {/* About image upload */}
          <div className="space-y-2">
            <Label htmlFor="aboutImage">{language === "en" ? "About Image" : "صورة حول"}</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Input 
                  id="aboutImage"
                  value={safelyAccess(settings, 'about.image', "")} 
                  onChange={(e) => handleAboutChange('image', e.target.value)}
                  placeholder={language === "en" ? "Enter about image URL or upload" : "أدخل رابط صورة حول أو قم بتحميلها"}
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  type="button" 
                  onClick={() => aboutImageFileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input 
                  ref={aboutImageFileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, (url) => handleAboutChange('image', url))} 
                />
              </div>
              
              {safelyAccess(settings, 'about.image', "") && (
                <div className="flex items-center gap-4 bg-muted p-3 rounded-md">
                  <img 
                    src={safelyAccess(settings, 'about.image', "")} 
                    alt="About Preview" 
                    className="h-16 w-16 object-cover rounded border"
                  />
                  <span className="text-sm text-muted-foreground">About Image Preview</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={() => handleAboutChange('image', '')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <Button
            onClick={handleSaveAboutContent}
            style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
          >
            {language === "en" ? "Save About Content" : "حفظ محتوى حول"}
          </Button>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Contact Information" : "معلومات الاتصال"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Update your contact details" 
              : "تحديث تفاصيل الاتصال الخاصة بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contact form */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail">{language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}</Label>
            <Input 
              id="contactEmail"
              type="email"
              value={safelyAccess(settings, 'contact.email', "contact@example.com")} 
              onChange={(e) => handleContactChange('email', e.target.value)}
              placeholder={language === "en" ? "Enter email address" : "أدخل عنوان البريد الإلكتروني"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">{language === "en" ? "Phone Number" : "رقم الهاتف"}</Label>
            <Input 
              id="contactPhone"
              type="tel"
              value={safelyAccess(settings, 'contact.phone', "+1234567890")} 
              onChange={(e) => handleContactChange('phone', e.target.value)}
              placeholder={language === "en" ? "Enter phone number" : "أدخل رقم الهاتف"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactAddress">{language === "en" ? "Address" : "العنوان"}</Label>
            <Textarea 
              id="contactAddress"
              value={safelyAccess(settings, 'contact.address', "123 Tech Street, Web City")} 
              onChange={(e) => handleContactChange('address', e.target.value)}
              placeholder={language === "en" ? "Enter address" : "أدخل العنوان"}
              rows={2}
            />
          </div>
          
          <Button
            onClick={() => {
              toast({
                title: language === "en" ? "Contact Information Updated" : "تم تحديث معلومات الاتصال",
                description: language === "en" ? "Your contact information has been saved" : "تم حفظ معلومات الاتصال الخاصة بك",
              });
            }}
            style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
          >
            {language === "en" ? "Save Contact Information" : "حفظ معلومات الاتصال"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
