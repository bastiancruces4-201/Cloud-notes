export interface LibraryResourceModel {

  id: string;

  title: string;

  subject: string;

  description: string;

  author: string;

  resourceType: 'book' | 'guide' | 'manual';

  sourceUrl: string;

  license: string;

  language: string;

  sourceType: 'cloudnotes';

  coverUrl?: string;
}