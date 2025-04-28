
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Certificate, CertificateFormData } from "@/types/certificate";
import CertificateList from "./certificates/CertificateList";
import CertificateForm from "./certificates/CertificateForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface CertificatesTabProps {
  language: "en" | "ar";
}

const CertificatesTab: React.FC<CertificatesTabProps> = ({ language }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const { data: certificates, isLoading } = useQuery({
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
    mutationFn: async (certificate: CertificateFormData) => {
      const { error } = await supabase
        .from('certificates')
        .insert([certificate]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      toast({
        title: language === "en" ? "Certificate Added" : "تمت إضافة الشهادة",
        description: language === "en" ? "Certificate has been added successfully." : "تم إضافة الشهادة بنجاح.",
      });
    },
  });

  const updateCertificate = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CertificateFormData }) => {
      const { error } = await supabase
        .from('certificates')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      toast({
        title: language === "en" ? "Certificate Updated" : "تم تحديث الشهادة",
        description: language === "en" ? "Certificate has been updated successfully." : "تم تحديث الشهادة بنجاح.",
      });
    },
  });

  const deleteCertificate = useMutation({
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
        title: language === "en" ? "Certificate Deleted" : "تم حذف الشهادة",
        description: language === "en" ? "Certificate has been deleted successfully." : "تم حذف الشهادة بنجاح.",
      });
    },
  });

  const handleAdd = (data: CertificateFormData) => {
    addCertificate.mutate(data);
  };

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsFormOpen(true);
  };

  const handleUpdate = (data: CertificateFormData) => {
    if (selectedCertificate) {
      updateCertificate.mutate({ id: selectedCertificate.id, data });
    }
  };

  const handleDelete = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCertificate) {
      deleteCertificate.mutate(selectedCertificate.id);
      setIsDeleteDialogOpen(false);
      setSelectedCertificate(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{language === "en" ? "Certificates" : "الشهادات"}</CardTitle>
              <CardDescription>
                {language === "en" 
                  ? "Manage your certificates and qualifications" 
                  : "إدارة شهاداتك ومؤهلاتك"}
              </CardDescription>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {language === "en" ? "Add Certificate" : "إضافة شهادة"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : certificates && certificates.length > 0 ? (
            <CertificateList
              certificates={certificates}
              onEdit={handleEdit}
              onDelete={handleDelete}
              language={language}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {language === "en" 
                  ? "No certificates available. Add your first certificate!" 
                  : "لا توجد شهادات متاحة. أضف شهادتك الأولى!"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <CertificateForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCertificate(null);
        }}
        onSubmit={selectedCertificate ? handleUpdate : handleAdd}
        defaultValues={selectedCertificate ?? undefined}
        language={language}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "en" ? "Delete Certificate" : "حذف الشهادة"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "en" 
                ? "Are you sure you want to delete this certificate? This action cannot be undone."
                : "هل أنت متأكد من حذف هذه الشهادة؟ لا يمكن التراجع عن هذا الإجراء."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === "en" ? "Cancel" : "إلغاء"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              {language === "en" ? "Delete" : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CertificatesTab;
