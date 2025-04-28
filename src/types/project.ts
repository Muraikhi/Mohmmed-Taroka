
export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  technologies: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  image_url?: string;
}
