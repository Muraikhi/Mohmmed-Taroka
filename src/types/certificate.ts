
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_url: string | null;
}

export interface CertificateFormData {
  title: string;
  issuer: string;
  date: string;
  image_url?: string;
}
