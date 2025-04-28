
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsTabProps {
  language: "en" | "ar";
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Projects" : "المشاريع"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Manage your portfolio projects" 
              : "إدارة مشاريع المحفظة الخاصة بك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Projects content */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsTab;
