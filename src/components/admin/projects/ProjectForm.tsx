
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectFormData } from "@/types/project";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  image_url: z.string().optional(),
});

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  language: "en" | "ar";
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onCancel, language }) => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      technologies: [],
      image_url: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Title" : "العنوان"}</FormLabel>
              <FormControl>
                <Input placeholder={language === "en" ? "Enter project title" : "أدخل عنوان المشروع"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Description" : "الوصف"}</FormLabel>
              <FormControl>
                <Input placeholder={language === "en" ? "Enter project description" : "أدخل وصف المشروع"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Technologies" : "التقنيات"}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === "en" ? "Enter technologies (comma-separated)" : "أدخل التقنيات (مفصولة بفواصل)"}
                  value={field.value.join(", ")}
                  onChange={(e) => field.onChange(e.target.value.split(",").map(tech => tech.trim()))}
                />
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
                <Input placeholder={language === "en" ? "Enter image URL" : "أدخل رابط الصورة"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {language === "en" ? "Cancel" : "إلغاء"}
          </Button>
          <Button type="submit">
            {language === "en" ? "Save" : "حفظ"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
