
import React from 'react';
import { Certificate } from "@/types/certificate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface CertificateListProps {
  certificates: Certificate[];
  onEdit: (certificate: Certificate) => void;
  onDelete: (certificate: Certificate) => void;
  language: "en" | "ar";
}

const CertificateList: React.FC<CertificateListProps> = ({ 
  certificates, 
  onEdit, 
  onDelete, 
  language 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{language === "en" ? "Title" : "العنوان"}</TableHead>
          <TableHead>{language === "en" ? "Issuer" : "المصدر"}</TableHead>
          <TableHead>{language === "en" ? "Date" : "التاريخ"}</TableHead>
          <TableHead>{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates.map((certificate) => (
          <TableRow key={certificate.id}>
            <TableCell>{certificate.title}</TableCell>
            <TableCell>{certificate.issuer}</TableCell>
            <TableCell>{certificate.date}</TableCell>
            <TableCell className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(certificate)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(certificate)}
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

export default CertificateList;
