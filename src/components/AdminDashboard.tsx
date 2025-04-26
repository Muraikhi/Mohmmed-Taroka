
import React, { useState, useEffect } from 'react';
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
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

const defaultSiteSettings: SiteSettings = {
  theme: {
    primary: "#9333ea",
    secondary: "#a855f7",
    accent: "#c084fc",
  },
  logo: {
    text: "Mohamed",
    image: "",
  }
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const { toast } = useToast();
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

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

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

  const addNewProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    
    setProjects(prev => [...prev, newProject]);
    toast({
      title: language === "en" ? "Project Added" : "تمت إضافة المشروع",
      description: language === "en" ? "The project has been added successfully" : "تمت إضافة المشروع بنجاح",
    });
  };

  const deleteProject = (id: string) => {
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

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(certificate => certificate.id !== id));
    toast({
      title: language === "en" ? "Certificate Deleted" : "تم حذف الشهادة",
      description: language === "en" ? "The certificate has been deleted successfully" : "تم حذف الشهادة بنجاح",
    });
  };

  return (
    <Tabs defaultValue="appearance" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="appearance">{language === "en" ? "Appearance" : "المظهر"}</TabsTrigger>
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
                    value={settings.theme.primary} 
                    onChange={(e) => handleThemeChange('primary', e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">{settings.theme.primary}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">{language === "en" ? "Secondary Color" : "اللون الثانوي"}</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="secondaryColor"
                    type="color" 
                    value={settings.theme.secondary} 
                    onChange={(e) => handleThemeChange('secondary', e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">{settings.theme.secondary}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor">{language === "en" ? "Accent Color" : "لون التمييز"}</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="accentColor"
                    type="color" 
                    value={settings.theme.accent} 
                    onChange={(e) => handleThemeChange('accent', e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">{settings.theme.accent}</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => {
                toast({
                  title: language === "en" ? "Theme Updated" : "تم تحديث الثيم",
                  description: language === "en" ? "Your theme settings have been saved" : "تم حفظ إعدادات الثيم الخاصة بك",
                });
              }}
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
            <div className="space-y-2">
              <Label htmlFor="logoText">{language === "en" ? "Logo Text" : "نص الشعار"}</Label>
              <Input 
                id="logoText"
                value={settings.logo.text} 
                onChange={(e) => handleLogoChange('text', e.target.value)}
                placeholder={language === "en" ? "Enter logo text" : "أدخل نص الشعار"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logoImage">{language === "en" ? "Logo Image URL" : "رابط صورة الشعار"}</Label>
              <Input 
                id="logoImage"
                value={settings.logo.image} 
                onChange={(e) => handleLogoChange('image', e.target.value)}
                placeholder={language === "en" ? "Enter logo image URL" : "أدخل رابط صورة الشعار"}
              />
            </div>
            
            <div className="p-4 border rounded-md">
              <p className="text-sm text-muted-foreground mb-2">
                {language === "en" ? "Logo Preview" : "معاينة الشعار"}
              </p>
              <div className="flex items-center gap-2">
                {settings.logo.image && (
                  <img 
                    src={settings.logo.image} 
                    alt="Logo" 
                    className="h-8 w-auto"
                  />
                )}
                <span className="text-lg font-bold">{settings.logo.text}</span>
              </div>
            </div>
            
            <Button
              onClick={() => {
                toast({
                  title: language === "en" ? "Logo Updated" : "تم تحديث الشعار",
                  description: language === "en" ? "Your logo settings have been saved" : "تم حفظ إعدادات الشعار الخاصة بك",
                });
              }}
            >
              {language === "en" ? "Save Logo Settings" : "حفظ إعدادات الشعار"}
            </Button>
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
              <Button>
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
                  <Label htmlFor="projectImage">{language === "en" ? "Image URL" : "رابط الصورة"}</Label>
                  <Input id="projectImage" placeholder={language === "en" ? "Image URL" : "رابط الصورة"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectTech">{language === "en" ? "Technologies (comma separated)" : "التقنيات (مفصولة بفواصل)"}</Label>
                  <Input id="projectTech" placeholder={language === "en" ? "React, Node.js, etc." : "React، Node.js، إلخ."} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLink">{language === "en" ? "Project Link (optional)" : "رابط المشروع (اختياري)"}</Label>
                  <Input id="projectLink" placeholder={language === "en" ? "https://..." : "https://..."} />
                </div>
              </div>
              
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      const title = (document.getElementById('projectTitle') as HTMLInputElement)?.value;
                      const description = (document.getElementById('projectDescription') as HTMLTextAreaElement)?.value;
                      const image = (document.getElementById('projectImage') as HTMLInputElement)?.value;
                      const tech = (document.getElementById('projectTech') as HTMLInputElement)?.value;
                      const link = (document.getElementById('projectLink') as HTMLInputElement)?.value;
                      
                      if (title && description && image) {
                        addNewProject({
                          title,
                          description,
                          image,
                          technologies: tech.split(',').map(t => t.trim()),
                          link: link || undefined
                        });
                      }
                    }}
                  >
                    {language === "en" ? "Save Project" : "حفظ المشروع"}
                  </Button>
                </DialogTrigger>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "en" ? "Title" : "العنوان"}</TableHead>
                <TableHead className="hidden md:table-cell">{language === "en" ? "Description" : "الوصف"}</TableHead>
                <TableHead className="hidden md:table-cell">{language === "en" ? "Technologies" : "التقنيات"}</TableHead>
                <TableHead>{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.description.length > 50 
                      ? `${project.description.slice(0, 50)}...` 
                      : project.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.technologies.join(", ")}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      {language === "en" ? "Delete" : "حذف"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TabsContent>
      
      <TabsContent value="certificates" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {language === "en" ? "Manage Certificates" : "إدارة الشهادات"}
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
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
                  <Label htmlFor="certImage">{language === "en" ? "Image URL" : "رابط الصورة"}</Label>
                  <Input id="certImage" placeholder={language === "en" ? "Certificate image URL" : "رابط صورة الشهادة"} />
                </div>
              </div>
              
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      const title = (document.getElementById('certTitle') as HTMLInputElement)?.value;
                      const issuer = (document.getElementById('certIssuer') as HTMLInputElement)?.value;
                      const date = (document.getElementById('certDate') as HTMLInputElement)?.value;
                      const image = (document.getElementById('certImage') as HTMLInputElement)?.value;
                      
                      if (title && issuer && date && image) {
                        addNewCertificate({
                          title,
                          issuer,
                          date,
                          image
                        });
                      }
                    }}
                  >
                    {language === "en" ? "Save Certificate" : "حفظ الشهادة"}
                  </Button>
                </DialogTrigger>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "en" ? "Title" : "العنوان"}</TableHead>
                <TableHead>{language === "en" ? "Issuer" : "المصدر"}</TableHead>
                <TableHead className="hidden md:table-cell">{language === "en" ? "Date" : "التاريخ"}</TableHead>
                <TableHead>{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.title}</TableCell>
                  <TableCell>{cert.issuer}</TableCell>
                  <TableCell className="hidden md:table-cell">{cert.date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteCertificate(cert.id)}
                    >
                      {language === "en" ? "Delete" : "حذف"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboard;
