export interface CommentModel {
  id?: string;

  documentId: string;
  userId: string;

  userName: string;

  content: string;

  createdAt: any;
}