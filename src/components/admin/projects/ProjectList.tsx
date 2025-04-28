
import React from 'react';
import { Project } from "@/types/project";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  language: "en" | "ar";
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, language }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{language === "en" ? "Title" : "العنوان"}</TableHead>
          <TableHead>{language === "en" ? "Description" : "الوصف"}</TableHead>
          <TableHead>{language === "en" ? "Technologies" : "التقنيات"}</TableHead>
          <TableHead>{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.technologies?.join(", ")}</TableCell>
            <TableCell className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(project)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(project)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectList;
