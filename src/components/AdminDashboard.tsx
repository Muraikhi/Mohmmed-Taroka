import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AppearanceTab from './admin/AppearanceTab';
import ContentTab from './admin/ContentTab';
import ImageTab from './admin/ImageTab';
import ProjectsTab from './admin/ProjectsTab';
import CertificatesTab from './admin/CertificatesTab';

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
        <TabsTrigger value="appearance">
          {language === "en" ? "Appearance" : "المظهر"}
        </TabsTrigger>
        <TabsTrigger value="content">
          {language === "en" ? "Content" : "المحتوى"}
        </TabsTrigger>
        <TabsTrigger value="images">
          {language === "en" ? "Images" : "الصور"}
        </TabsTrigger>
        <TabsTrigger value="projects">
          {language === "en" ? "Projects" : "المشاريع"}
        </TabsTrigger>
        <TabsTrigger value="certificates">
          {language === "en" ? "Certificates" : "الشهادات"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="appearance">
        <AppearanceTab 
          language={language}
          settings={settings}
          handleThemeChange={handleThemeChange}
          handleLogoChange={handleLogoChange}
          safelyAccess={safelyAccess}
          logoFileInputRef={logoFileInputRef}
          handleFileUpload={handleFileUpload}
        />
      </TabsContent>

      <TabsContent value="content">
        <ContentTab 
          language={language}
          settings={settings}
          handleHeroChange={handleHeroChange}
          handleAboutChange={handleAboutChange}
          handleContactChange={handleContactChange}
          safelyAccess={safelyAccess}
          heroImageFileInputRef={heroImageFileInputRef}
          aboutImageFileInputRef={aboutImageFileInputRef}
          handleFileUpload={handleFileUpload}
          handleSaveAboutContent={handleSaveAboutContent}
        />
      </TabsContent>

      <TabsContent value="images">
        <ImageTab language={language} />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsTab language={language} />
      </TabsContent>

      <TabsContent value="certificates">
        <CertificatesTab language={language} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboard;
