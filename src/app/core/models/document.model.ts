export interface DocumentModel {
  id?: string;
  title: string;
  subject: string;
  description: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  userId: string;
  createdAt: Date;
}