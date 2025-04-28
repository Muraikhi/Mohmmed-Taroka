
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Project, ProjectFormData } from "@/types/project";
import ProjectForm from './projects/ProjectForm';
import ProjectList from './projects/ProjectList';

interface ProjectsTabProps {
  language: "en" | "ar";
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ language }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
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

  const createProject = useMutation({
    mutationFn: async (projectData: ProjectFormData) => {
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsDialogOpen(false);
      toast({
        title: language === "en" ? "Project Created" : "تم إنشاء المشروع",
        description: language === "en" ? "Project has been created successfully" : "تم إنشاء المشروع بنجاح",
      });
    },
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProjectFormData }) => {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsDialogOpen(false);
      setEditingProject(null);
      toast({
        title: language === "en" ? "Project Updated" : "تم تحديث المشروع",
        description: language === "en" ? "Project has been updated successfully" : "تم تحديث المشروع بنجاح",
      });
    },
  });

  const deleteProject = useMutation({
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
        title: language === "en" ? "Project Deleted" : "تم حذف المشروع",
        description: language === "en" ? "Project has been deleted successfully" : "تم حذف المشروع بنجاح",
      });
    },
  });

  const handleSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      updateProject.mutate({ id: editingProject.id, data });
    } else {
      createProject.mutate(data);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (project: Project) => {
    if (window.confirm(language === "en" ? "Are you sure you want to delete this project?" : "هل أنت متأكد من حذف هذا المشروع؟")) {
      deleteProject.mutate(project.id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{language === "en" ? "Projects" : "المشاريع"}</CardTitle>
            <CardDescription>
              {language === "en" 
                ? "Manage your portfolio projects" 
                : "إدارة مشاريع المحفظة الخاصة بك"}
            </CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {language === "en" ? "Add Project" : "إضافة مشروع"}
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ProjectList
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
              language={language}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProject 
                ? (language === "en" ? "Edit Project" : "تعديل المشروع")
                : (language === "en" ? "Add Project" : "إضافة مشروع")}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            initialData={editingProject || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            language={language}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsTab;
