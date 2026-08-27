export interface DocumentModel {

  id?: string;

  title: string;

  subject: string;

  description: string;

  fileName: string;

  fileType: string;

  fileSize: number;

  fileUrl?: string;

  filePath?: string;

  userId: string;

  createdAt: any;

  status?: 'active' | 'deleted';

  deletedAt?: any;

  deletedBy?: string;

  // ==========================================
  // ORIGEN DEL MATERIAL
  // ==========================================

  sourceType?: 'student' | 'cloudnotes';

  isBaseDocument?: boolean;

  // ==========================================
  // INFORMACIÓN DEL MATERIAL BASE
  // ==========================================

  author?: string;

  license?: string;

  sourceUrl?: string;
}