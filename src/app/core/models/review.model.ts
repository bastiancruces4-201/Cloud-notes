export interface ReviewModel {

  id?: string;

  documentId: string;

  userId: string;

  userName: string;

  rating: number;

  comment: string;

  createdAt?: any;

  updatedAt?: any;

}