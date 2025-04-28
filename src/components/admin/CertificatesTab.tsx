
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CertificatesTabProps {
  language: "en" | "ar";
}

const CertificatesTab: React.FC<CertificatesTabProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Certificates" : "الشهادات"}</CardTitle>
          <CardDescription>
            {language === "en" 
              ? "Manage your certificates and qualifications" 
              : "إدارة شهاداتك ومؤهلاتك"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            {/* Certificates content */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificatesTab;
