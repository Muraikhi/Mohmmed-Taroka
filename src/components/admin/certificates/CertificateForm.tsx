
import React from 'react';
import { useForm } from "react-hook-form";
import { CertificateFormData } from "@/types/certificate";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CertificateFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CertificateFormData) => void;
  defaultValues?: CertificateFormData;
  language: "en" | "ar";
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  language,
}) => {
  const form = useForm<CertificateFormData>({
    defaultValues: defaultValues || {
      title: '',
      issuer: '',
      date: '',
    },
  });

  const handleSubmit = (data: CertificateFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues 
              ? (language === "en" ? "Edit Certificate" : "تعديل الشهادة")
              : (language === "en" ? "Add Certificate" : "إضافة شهادة")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === "en" ? "Title" : "العنوان"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === "en" ? "Issuer" : "المصدر"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === "en" ? "Date" : "التاريخ"}</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === "en" ? "Image URL" : "رابط الصورة"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                {language === "en" ? "Cancel" : "إلغاء"}
              </Button>
              <Button type="submit">
                {defaultValues
                  ? (language === "en" ? "Update" : "تحديث")
                  : (language === "en" ? "Add" : "إضافة")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateForm;
