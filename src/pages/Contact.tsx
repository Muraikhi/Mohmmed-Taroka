
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const language = localStorage.getItem("language") as "en" | "ar" || "en";
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    // Get contact info from localStorage (admin dashboard)
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.contact) {
          setContact(settings.contact);
        }
      } catch (error) {
        console.error("Error parsing contact settings:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: language === "en" ? "Message Sent" : "تم إرسال الرسالة",
      description: language === "en" 
        ? "Thank you! We'll get back to you soon." 
        : "شكراً لك! سنرد عليك قريباً.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div 
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>
          {language === "en" ? "Contact Me" : "اتصل بي"}
        </SectionTitle>
        
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-6">
                {language === "en" ? "Get In Touch" : "تواصل معي"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder={language === "en" ? "Your Name" : "اسمك"}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={language === "en" ? "Your Email" : "بريدك الإلكتروني"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    name="subject"
                    placeholder={language === "en" ? "Subject" : "الموضوع"}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder={language === "en" ? "Your Message" : "رسالتك"}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {language === "en" ? "Send Message" : "إرسال الرسالة"}
                </Button>
              </form>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-6">
                {language === "en" ? "Contact Information" : "معلومات الاتصال"}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {language === "en" ? "Email" : "البريد الإلكتروني"}
                    </h3>
                    <p className="text-muted-foreground">
                      {contact.email || "contact@example.com"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {language === "en" ? "Phone" : "الهاتف"}
                    </h3>
                    <p className="text-muted-foreground">
                      {contact.phone || "+1 (555) 123-4567"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {language === "en" ? "Address" : "العنوان"}
                    </h3>
                    <p className="text-muted-foreground">
                      {contact.address || "123 Tech Street, Web City"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="h-64 rounded-md overflow-hidden bg-muted">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1619898762028!5m2!1sen!2sca"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false}
                    loading="lazy"
                    title="map"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
