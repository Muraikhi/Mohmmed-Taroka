import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AdminDashboard from "@/components/AdminDashboard";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const language = localStorage.getItem("language") as "en" | "ar" || "en";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.username === "MT" && values.password === "RUE") {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      toast({
        title: language === "en" ? "Login Successful" : "تم تسجيل الدخول بنجاح",
        description: language === "en" ? "Welcome to the admin dashboard" : "مرحبًا بك في لوحة التحكم",
      });
    } else {
      toast({
        variant: "destructive",
        title: language === "en" ? "Login Failed" : "فشل تسجيل الدخول",
        description: language === "en" ? "Invalid username or password" : "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    toast({
      title: language === "en" ? "Logged Out" : "تم تسجيل الخروج",
      description: language === "en" ? "You have been logged out" : "لقد تم تسجيل خروجك",
    });
  };

  useEffect(() => {
    const triggerStorageUpdate = () => {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('siteSettingsUpdated'));
    };
    
    const intervalId = setInterval(triggerStorageUpdate, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (!isAuthenticated) {
    return (
      <div dir={language === "ar" ? "rtl" : "ltr"} className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">
                {language === "en" ? "Admin Login" : "تسجيل دخول المسؤول"}
              </CardTitle>
              <CardDescription>
                {language === "en" 
                  ? "Enter your credentials to access the admin dashboard" 
                  : "أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة تحكم المسؤول"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === "en" ? "Username" : "اسم المستخدم"}</FormLabel>
                        <FormControl>
                          <Input placeholder={language === "en" ? "Enter username" : "أدخل اسم المستخدم"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === "en" ? "Password" : "كلمة المرور"}</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder={language === "en" ? "Enter password" : "أدخل كلمة المرور"}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    {language === "en" ? "Login" : "تسجيل الدخول"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {language === "en" ? "Admin Dashboard" : "لوحة تحكم المسؤول"}
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            {language === "en" ? "Logout" : "تسجيل الخروج"}
          </Button>
        </div>
        
        <AdminDashboard language={language} />
      </div>
    </div>
  );
};

export default Admin;
