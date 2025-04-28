import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpCircle, FileImage, Plus, Trash2, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AdminDashboardProps {
  language: "en" | "ar";
}

interface SiteSettings {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo: {
    text: string;
    image: string;
  };
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  about: {
    content: string;
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  tags?: string[];
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface HomeImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

const defaultSiteSettings: SiteSettings = {
  theme: {
    primary: "#9333ea",
    secondary: "#a855f7",
    accent: "#c084fc",
  },
  logo: {
    text: "Mohamed Taroqa",
    image: "",
  },
  hero: {
    title: "Creative Developer",
    subtitle: "Frontend Developer, Graphic Designer, and Video Editor creating stunning digital experiences with attention to detail.",
    image: ""
  },
  about: {
    content: "As a Frontend Developer, Graphic Designer, and Video Editor, I bring a unique blend of technical and creative skills to every project.",
    image: ""
  },
  contact: {
    email: "contact@example.com",
    phone: "+1234567890",
    address: "123 Tech Street, Web City"
  }
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dbSiteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateSiteSettings = useMutation({
    mutationFn: async (newSettings: any) => {
      const { error } = await supabase
        .from('site_settings')
        .update(newSettings)
        .eq('id', dbSiteSettings.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast({
        title: "Settings Updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes. Please try again.",
      });
    },
  });

  const { data: dbProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addProject = useMutation({
    mutationFn: async (project: any) => {
      const { error } = await supabase
        .from('projects')
        .insert([project]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Added",
        description: "The project has been added successfully.",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Deleted",
        description: "The project has been deleted successfully.",
      });
    },
  });

  const { data: dbCertificates } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addCertificate = useMutation({
    mutationFn: async (certificate: any) => {
      const { error } = await supabase
        .from('certificates')
        .insert([certificate]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      toast({
        title: "Certificate Added",
        description: "The certificate has been added successfully.",
      });
    },
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      toast({
        title: "Certificate Deleted",
        description: "The certificate has been deleted successfully.",
      });
    },
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSiteSettings;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const savedCertificates = localStorage.getItem('certificates');
    return savedCertificates ? JSON.parse(savedCertificates) : [];
  });

  const [homeImages, setHomeImages] = useState<HomeImage[]>(() => {
    const savedImages = localStorage.getItem('homeImages');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const heroImageFileInputRef = useRef<HTMLInputElement>(null);
  const aboutImageFileInputRef = useRef<HTMLInputElement>(null);
  const projectImageFileInputRef = useRef<HTMLInputElement>(null);
  const certificateImageFileInputRef = useRef<HTMLInputElement>(null);
  
  const [newProjectImage, setNewProjectImage] = useState<string>("");
  const [newCertificateImage, setNewCertificateImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState("appearance");

  useEffect(() => {
    if (dbSiteSettings) {
      const newSettings = { ...settings };
      
      if (dbSiteSettings.about_content) {
        newSettings.about = {
          ...newSettings.about,
          content: dbSiteSettings.about_content
        };
      }
      
      if (dbSiteSettings.about_image) {
        newSettings.about = {
          ...newSettings.about,
          image: dbSiteSettings.about_image
        };
      }
      
      if (dbSiteSettings.hero_title) {
        newSettings.hero = {
          ...newSettings.hero,
          title: dbSiteSettings.hero_title
        };
      }
      
      if (dbSiteSettings.hero_subtitle) {
        newSettings.hero = {
          ...newSettings.hero,
          subtitle: dbSiteSettings.hero_subtitle
        };
      }
      
      setSettings(newSettings);
    }
  }, [dbSiteSettings]);

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('siteSettingsUpdated'));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('siteSettingsUpdated'));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('siteSettingsUpdated'));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('homeImages', JSON.stringify(homeImages));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('siteSettingsUpdated'));
  }, [homeImages]);

  const handleThemeChange = (key: keyof SiteSettings['theme'], value: string) => {
    setSettings(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [key]: value
      }
    }));
  };

  const handleLogoChange = (key: keyof SiteSettings['logo'], value: string) => {
    setSettings(prev => ({
      ...prev,
      logo: {
        ...prev.logo,
        [key]: value
      }
    }));
  };

  const handleHeroChange = (key: keyof SiteSettings['hero'], value: string) => {
    setSettings(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [key]: value
      }
    }));
  };

  const handleAboutChange = (key: keyof SiteSettings['about'], value: string) => {
    setSettings(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [key]: value
      }
    }));
  };

  const handleContactChange = (key: keyof SiteSettings['contact'], value: string) => {
    setSettings(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addNewProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      tags: project.tags || [] // Ensure tags is always defined
    };
    
    setProjects(prev => [...prev, newProject]);
    toast({
      title: language === "en" ? "Project Added" : "تمت إضافة المشروع",
      description: language === "en" ? "The project has been added successfully" : "تمت إضافة المشروع بنجاح",
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast({
      title: language === "en" ? "Project Deleted" : "تم حذف المشروع",
      description: language === "en" ? "The project has been deleted successfully" : "تم حذف المشروع بنجاح",
    });
  };

  const addNewCertificate = (certificate: Omit<Certificate, 'id'>) => {
    const newCertificate = {
      ...certificate,
      id: Date.now().toString()
    };
    
    setCertificates(prev => [...prev, newCertificate]);
    toast({
      title: language === "en" ? "Certificate Added" : "تمت إضافة الشهادة",
      description: language === "en" ? "The certificate has been added successfully" : "تمت إضافة الشهادة بنجاح",
    });
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(certificate => certificate.id !== id));
    toast({
      title: language === "en" ? "Certificate Deleted" : "تم حذف الشهادة",
      description: language === "en" ? "The certificate has been deleted successfully" : "تم حذف الشهادة بنجاح",
    });
  };

  const addHomeImage = (image: Omit<HomeImage, 'id'>) => {
    const newImage = {
      ...image,
      id: Date.now().toString()
    };
    
    setHomeImages(prev => [...prev, newImage]);
    toast({
      title: language === "en" ? "Image Added" : "تمت إضافة الصورة",
      description: language === "en" ? "The image has been added successfully" : "تمت إضافة الصورة بنجاح",
    });
  };

  const deleteHomeImage = (id: string) => {
    setHomeImages(prev => prev.filter(image => image.id !== id));
    toast({
      title: language === "en" ? "Image Deleted" : "تم حذف الصورة",
      description: language === "en" ? "The image has been deleted successfully" : "تم حذف الصورة بنجاح",
    });
  };

  const safelyAccess = (obj: any, path: string, defaultValue: any = '') => {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === undefined || result === null) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result === undefined || result === null ? defaultValue : result;
  };

  const handleSaveAboutContent = () => {
    if (!dbSiteSettings?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save to database. Please try again later.",
      });
      return;
    }
    
    updateSiteSettings.mutate({
      about_content: settings.about.content,
      about_image: settings.about.image,
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="appearance">{language === "en" ? "Appearance" : "المظهر"}</TabsTrigger>
        <TabsTrigger value="content">{language === "en" ? "Content" : "المحتوى"}</TabsTrigger>
        <TabsTrigger value="images">{language === "en" ? "Images" : "الصور"}</TabsTrigger>
        <TabsTrigger value="projects">{language === "en" ? "Projects" : "المشاريع"}</TabsTrigger>
        <TabsTrigger value="certificates">{language === "en" ? "Certificates" : "الشهادات"}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="appearance" className="space-y-6">
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
            
            <div className="p-4 mt-4 rounded-md bg-muted">
              <h3 className="font-medium mb-2">{language === "en" ? "Theme Preview" : "معاينة الثيم"}</h3>
              <div className="flex gap-2">
                <div 
                  className="w-16 h-16 rounded-md flex items-center justify-center text-white"
                  style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
                >
                  Primary
                </div>
                <div 
                  className="w-16 h-16 rounded-md flex items-center justify-center text-white"
                  style={{ backgroundColor: safelyAccess(settings, 'theme.secondary', "#a855f7") }}
                >
                  Secondary
                </div>
                <div 
                  className="w-16 h-16 rounded-md flex items-center justify-center text-white"
                  style={{ backgroundColor: safelyAccess(settings, 'theme.accent', "#c084fc") }}
                >
                  Accent
                </div>
              </div>
            </div>
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
            
            <div className="p-4 border rounded-md">
              <p className="text-sm text-muted-foreground mb-2">
                {language === "en" ? "Logo Preview" : "معاينة الشعار"}
              </p>
              <div className="flex items-center gap-2">
                {safelyAccess(settings, 'logo.image', "") && (
                  <img 
                    src={safelyAccess(settings, 'logo.image', "")} 
                    alt="Logo" 
                    className="h-8 w-auto"
                  />
                )}
                <span className="text-lg font-bold">{safelyAccess(settings, 'logo.text', "Mohamed Taroqa")}</span>
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
      </TabsContent>
      
      <TabsContent value="content" className="space-y-6">
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
                value={safelyAccess(settings, 'hero.subtitle', "Frontend Developer, Graphic Designer, and Video Editor creating stunning digital experiences with attention to detail.")} 
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
                    <span className="sr-only">Upload</span>
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
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              onClick={() => {
                toast({
                  title: language === "en" ? "Hero Content Updated" : "تم تحديث محتوى البطل",
                  description: language === "en" ? "Your hero content has been saved" : "تم حفظ محتوى البطل الخاص بك",
                });
              }}
              style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
            >
              {language === "en" ? "Save Hero Content" : "حفظ محتوى البطل"}
            </Button>
          </CardContent>
        </Card>
        
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
                value={safelyAccess(settings, 'about.content', "As a Frontend Developer, Graphic Designer, and Video Editor, I bring a unique blend of technical and creative skills to every project.")} 
                onChange={(e) => handleAboutChange('content', e.target.value)}
                placeholder={language === "en" ? "Enter about content" : "أدخل محتوى حول"}
                rows={5}
              />
            </div>
            
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
                    <span className="sr-only">Upload</span>
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
                      <span className="sr-only">Remove</span>
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
            <div className="space-y-2">
              <Label htmlFor="contactEmail">{language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}</Label>
              <Input 
                id="contactEmail"
                type="email"
                value={saf
