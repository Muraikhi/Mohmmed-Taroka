
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

  // Query site settings
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

  // Update site settings mutation
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

  // Projects queries and mutations
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

  // Certificates queries and mutations
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

  // Modified function to save settings and trigger site-wide update
  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    // Force a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    // Also dispatch custom event to ensure changes are picked up
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

  // Helper function to safely access nested properties
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
                
                // Apply colors to :root CSS variables
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
              onClick={() => {
                toast({
                  title: language === "en" ? "About Content Updated" : "تم تحديث محتوى حول",
                  description: language === "en" ? "Your about content has been saved" : "تم حفظ محتوى حول الخاص بك",
                });
              }}
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
                value={safelyAccess(settings, 'contact.email', "contact@example.com")} 
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder={language === "en" ? "Enter email address" : "أدخل عنوان البريد الإلكتروني"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPhone">{language === "en" ? "Phone Number" : "رقم الهاتف"}</Label>
              <Input 
                id="contactPhone"
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
                rows={3}
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
      </TabsContent>
      
      <TabsContent value="images" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Home Images" : "صور الصفحة الرئيسية"}</CardTitle>
            <CardDescription>
              {language === "en" 
                ? "Upload and manage images for your website" 
                : "تحميل وإدارة الصور لموقع الويب الخاص بك"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg text-center">
              <div className="flex flex-col items-center p-4">
                <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "en" 
                    ? "Drag & drop images here, or click to select" 
                    : "اسحب وأفلت الصور هنا، أو انقر للتحديد"}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ borderColor: safelyAccess(settings, 'theme.primary', "#9333ea"), color: safelyAccess(settings, 'theme.primary', "#9333ea") }}
                >
                  {language === "en" ? "Upload Image" : "تحميل صورة"}
                </Button>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => {
                    handleFileUpload(e, (url) => {
                      addHomeImage({
                        url: url,
                        title: language === "en" ? "New Image" : "صورة جديدة",
                        description: ""
                      });
                    });
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{language === "en" ? "Uploaded Images" : "الصور المرفوعة"}</h3>
              
              {homeImages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {language === "en" 
                      ? "No images uploaded yet. Upload your first image to get started." 
                      : "لم يتم تحميل أي صور بعد. قم بتحميل أول صورة للبدء."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {homeImages.map((image) => (
                    <div key={image.id} className="border rounded-md overflow-hidden">
                      <div className="aspect-video w-full relative">
                        <img 
                          src={image.url} 
                          alt={image.title || "Image"} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <Input 
                          placeholder={language === "en" ? "Image title" : "عنوان الصورة"}
                          value={image.title || ""}
                          onChange={(e) => {
                            setHomeImages(prev => prev.map(img => 
                              img.id === image.id ? { ...img, title: e.target.value } : img
                            ));
                          }}
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="w-full" 
                            onClick={() => deleteHomeImage(image.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            {language === "en" ? "Delete" : "حذف"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="projects" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {language === "en" ? "Manage Projects" : "إدارة المشاريع"}
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}>
                <Plus className="h-4 w-4 mr-1" />
                {language === "en" ? "Add New Project" : "إضافة مشروع جديد"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{language === "en" ? "Add New Project" : "إضافة مشروع جديد"}</DialogTitle>
                <DialogDescription>
                  {language === "en" 
                    ? "Fill in the details for your new project" 
                    : "ملء تفاصيل مشروعك الجديد"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="projectTitle">{language === "en" ? "Title" : "العنوان"}</Label>
                  <Input id="projectTitle" placeholder={language === "en" ? "Project title" : "عنوان المشروع"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">{language === "en" ? "Description" : "الوصف"}</Label>
                  <Textarea id="projectDescription" placeholder={language === "en" ? "Project description" : "وصف المشروع"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectImage">{language === "en" ? "Image" : "الصورة"}</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="projectImage" 
                      placeholder={language === "en" ? "Image URL" : "رابط الصورة"} 
                      value={newProjectImage}
                      onChange={(e) => setNewProjectImage(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      type="button" 
                      onClick={() => projectImageFileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload</span>
                    </Button>
                    <input 
                      ref={projectImageFileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setNewProjectImage(url))} 
                    />
                  </div>
                  {newProjectImage && (
                    <div className="mt-2 border rounded p-2">
                      <img 
                        src={newProjectImage} 
                        alt="Project Preview" 
                        className="h-20 w-full object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectTech">{language === "en" ? "Technologies (comma separated)" : "التقنيات (مفصولة بفواصل)"}</Label>
                  <Input id="projectTech" placeholder={language === "en" ? "React, Node.js, etc." : "React، Node.js، إلخ."} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectTags">{language === "en" ? "Tags (comma separated)" : "العلامات (مفصولة بفواصل)"}</Label>
                  <Input id="projectTags" placeholder={language === "en" ? "Frontend, Backend, etc." : "واجهة أمامية، خلفية، إلخ."} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLink">{language === "en" ? "Project Link (optional)" : "رابط المشروع (اختياري)"}</Label>
                  <Input id="projectLink" placeholder={language === "en" ? "https://..." : "https://..."} />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
                  onClick={() => {
                    const title = (document.getElementById('projectTitle') as HTMLInputElement)?.value;
                    const description = (document.getElementById('projectDescription') as HTMLTextAreaElement)?.value;
                    const image = newProjectImage || (document.getElementById('projectImage') as HTMLInputElement)?.value;
                    const tech = (document.getElementById('projectTech') as HTMLInputElement)?.value;
                    const tags = (document.getElementById('projectTags') as HTMLInputElement)?.value;
                    const link = (document.getElementById('projectLink') as HTMLInputElement)?.value;
                    
                    if (title && description && image) {
                      addNewProject({
                        title,
                        description,
                        image,
                        technologies: tech.split(',').map(t => t.trim()),
                        tags: tags ? tags.split(',').map(t => t.trim()) : [],
                        link: link || undefined
                      });
                      setNewProjectImage("");
                    }
                  }}
                >
                  {language === "en" ? "Save Project" : "حفظ المشروع"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {language === "en" 
                ? "No projects found. Add your first project to get started." 
                : "لم يتم العثور على مشاريع. أضف مشروعك الأول للبدء."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies && project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-0.5 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {language === "en" ? "Delete" : "حذف"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="certificates" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {language === "en" ? "Manage Certificates" : "إدارة الشهادات"}
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}>
                <Plus className="h-4 w-4 mr-1" />
                {language === "en" ? "Add New Certificate" : "إضافة شهادة جديدة"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{language === "en" ? "Add New Certificate" : "إضافة شهادة جديدة"}</DialogTitle>
                <DialogDescription>
                  {language === "en" 
                    ? "Fill in the details for your new certificate" 
                    : "ملء تفاصيل شهادتك الجديدة"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="certTitle">{language === "en" ? "Title" : "العنوان"}</Label>
                  <Input id="certTitle" placeholder={language === "en" ? "Certificate title" : "عنوان الشهادة"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certIssuer">{language === "en" ? "Issuer" : "المصدر"}</Label>
                  <Input id="certIssuer" placeholder={language === "en" ? "Certificate issuer" : "مصدر الشهادة"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certDate">{language === "en" ? "Date" : "التاريخ"}</Label>
                  <Input id="certDate" placeholder={language === "en" ? "Issue date" : "تاريخ الإصدار"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certImage">{language === "en" ? "Image" : "الصورة"}</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="certImage" 
                      placeholder={language === "en" ? "Certificate image URL" : "رابط صورة الشهادة"}
                      value={newCertificateImage}
                      onChange={(e) => setNewCertificateImage(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      type="button" 
                      onClick={() => certificateImageFileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload</span>
                    </Button>
                    <input 
                      ref={certificateImageFileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setNewCertificateImage(url))} 
                    />
                  </div>
                  {newCertificateImage && (
                    <div className="mt-2 border rounded p-2">
                      <img 
                        src={newCertificateImage} 
                        alt="Certificate Preview" 
                        className="h-20 w-full object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  style={{ backgroundColor: safelyAccess(settings, 'theme.primary', "#9333ea") }}
                  onClick={() => {
                    const title = (document.getElementById('certTitle') as HTMLInputElement)?.value;
                    const issuer = (document.getElementById('certIssuer') as HTMLInputElement)?.value;
                    const date = (document.getElementById('certDate') as HTMLInputElement)?.value;
                    const image = newCertificateImage || (document.getElementById('certImage') as HTMLInputElement)?.value;
                    
                    if (title && issuer && date && image) {
                      addNewCertificate({
                        title,
                        issuer,
                        date,
                        image
                      });
                      setNewCertificateImage("");
                    }
                  }}
                >
                  {language === "en" ? "Save Certificate" : "حفظ الشهادة"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {certificates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {language === "en" 
                ? "No certificates found. Add your first certificate to get started." 
                : "لم يتم العثور على شهادات. أضف شهادتك الأولى للبدء."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id}>
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{cert.title}</CardTitle>
                  <CardDescription>
                    {cert.issuer} • {cert.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCertificate(cert.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {language === "en" ? "Delete" : "حذف"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboard;
