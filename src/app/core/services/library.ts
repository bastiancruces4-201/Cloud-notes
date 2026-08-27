import { Injectable } from '@angular/core';

import {
  LibraryResourceModel
} from '../models/library-resource.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private resources: LibraryResourceModel[] = [

    // ==========================================
    // PROGRAMACIÓN
    // ==========================================

    {
      id: 'cloudnotes-python-para-todos',

      title: 'Python para todos',

      subject: 'Programación',

      description:
        'Libro introductorio en español sobre programación con Python, variables, estructuras de control, funciones, archivos, bases de datos y análisis de información.',

      author: 'Charles R. Severance',

      resourceType: 'book',

      sourceUrl:
        'https://do1.dr-chuck.com/pythonlearn/ES_es/pythonlearn.pdf',

      license:
        'CC BY-NC-SA 3.0',

      language: 'Español',

      sourceType: 'cloudnotes'
    },


    // ==========================================
    // MATEMÁTICAS
    // ==========================================

    {
      id: 'cloudnotes-calculo-volumen-1',

      title: 'Cálculo volumen 1',

      subject: 'Matemáticas',

      description:
        'Libro universitario en español sobre funciones, límites, derivadas, integrales y aplicaciones del cálculo.',

      author: 'OpenStax',

      resourceType: 'book',

      sourceUrl:
        'https://assets.openstax.org/oscms-prodcms/media/documents/Calculo_volumen_1_-_WEB_vGHB4xK.pdf?aAF9A=2VSUyD',

      license:
        'CC BY-NC-SA 4.0',

      language: 'Español',

      sourceType: 'cloudnotes'
    },


    // ==========================================
    // ESTADÍSTICA
    // ==========================================

    {
      id: 'cloudnotes-introduccion-estadistica',

      title: 'Introducción a la Estadística',

      subject: 'Estadística',

      description:
        'Texto universitario en español sobre estadística descriptiva, probabilidad, distribuciones, estimación e inferencia estadística.',

      author:
        'Barbara Illowsky y Susan Dean',

      resourceType: 'book',

      sourceUrl:
        'https://assets.openstax.org/oscms-prodcms/media/documents/Introduccion_al_la_estadistica_-_WEB.pdf',

      license:
        'CC BY 4.0',

      language: 'Español',

      sourceType: 'cloudnotes'
    },


    // ==========================================
    // FÍSICA
    // ==========================================

    {
      id: 'cloudnotes-fisica-universitaria-1',

      title: 'Física universitaria volumen 1',

      subject: 'Física',

      description:
        'Libro universitario en español sobre movimiento, fuerzas, energía, momento, rotación, oscilaciones, ondas y sonido.',

      author:
        'William Moebs, Samuel J. Ling y Jeff Sanny',

      resourceType: 'book',

      sourceUrl:
        'https://assets.openstax.org/oscms-prodcms/media/documents/FisicaUniversitariaVolumen1-WEB_JDl3rTk.pdf',

      license:
        'CC BY 4.0',

      language: 'Español',

      sourceType: 'cloudnotes'
    },


    // ==========================================
    // CIBERSEGURIDAD
    // ==========================================

    {
      id: 'cloudnotes-ciberseguridad-convergencia',

      title:
        'Ciberseguridad en la Era de la Convergencia Tecnológica',

      subject: 'Ciberseguridad',

      description:
        'Material de estudio relacionado con ciberseguridad, transformación tecnológica, amenazas digitales y protección de sistemas.',

      author:
        'Biblioteca Cloud Notes',

      resourceType: 'book',

      sourceUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2Fciberseguridad-en-la-era-de-la-convergencia-tecnologica.pdf?alt=media&token=26ef58d6-42e6-4f18-b66c-a9f026724a4e',

      coverUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2FCovers%2FPortada%20ciberseguridad.jpg?alt=media&token=f9f24fb6-50dc-4309-9a81-9e5c30394088',

      license:
        'Material de consulta académica',

      language: 'Español',

      sourceType: 'cloudnotes'
    },

    {
      id: 'cloudnotes-criptografia-aplicada',

      title:
        'Curso de Criptografía Aplicada',

      subject: 'Ciberseguridad',

      description:
        'Material académico para el estudio de conceptos y aplicaciones de la criptografía dentro de la seguridad informática.',

      author:
        'Biblioteca Cloud Notes',

      resourceType: 'book',

      sourceUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2Fcurso-de-criptografia-aplicada.pdf?alt=media&token=b0fa9b7f-4916-4619-bedf-baecfc066333',

      coverUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2FCovers%2FPortada%20ciberseguridad.jpg?alt=media&token=f9f24fb6-50dc-4309-9a81-9e5c30394088',

      license:
        'Material de consulta académica',

      language: 'Español',

      sourceType: 'cloudnotes'
    },

    {
      id: 'cloudnotes-hacking-etico',

      title:
        'Hacking Ético: Teoría y Prácticas',

      subject: 'Ciberseguridad',

      description:
        'Material de estudio sobre conceptos, metodologías y prácticas relacionadas con hacking ético, vulnerabilidades y seguridad informática.',

      author:
        'Biblioteca Cloud Notes',

      resourceType: 'book',

      sourceUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2Fhacking-etico-teoria-practicas.pdf?alt=media&token=baa31ccb-012a-4cd3-82a6-0bcefa00eaaa',

      coverUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2FCovers%2FPortada%20ciberseguridad.jpg?alt=media&token=f9f24fb6-50dc-4309-9a81-9e5c30394088',

      license:
        'Material de consulta académica',

      language: 'Español',

      sourceType: 'cloudnotes'
    },

    {
      id: 'cloudnotes-guia-seguridad-hacker',

      title:
        'Guía de Seguridad de un Hacker',

      subject: 'Ciberseguridad',

      description:
        'Recurso complementario para estudiar seguridad informática, vulnerabilidades, protección de sistemas y técnicas utilizadas en el área.',

      author:
        'Biblioteca Cloud Notes',

      resourceType: 'book',

      sourceUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2Fguia-de-seguridad-de-un-hacker.pdf?alt=media&token=58f336b6-cc09-4655-847b-2450dd906529',

      coverUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2FCovers%2FPortada%20ciberseguridad.jpg?alt=media&token=f9f24fb6-50dc-4309-9a81-9e5c30394088',

      license:
        'Material de consulta académica',

      language: 'Español',

      sourceType: 'cloudnotes'
    },

    {
      id: 'cloudnotes-python-hackers-pentester',

      title:
        'Python Básico para Hackers y Pentester',

      subject: 'Ciberseguridad',

      description:
        'Material introductorio sobre el uso de Python aplicado a seguridad informática, automatización y pentesting.',

      author:
        'Biblioteca Cloud Notes',

      resourceType: 'book',

      sourceUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2Fpython-basico-para-hackers-y-pentester.pdf?alt=media&token=26712d92-7c51-442a-8599-1d4aa8a1ffcf',

      coverUrl:
        'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fciberseguridad%2FCovers%2FPortada%20ciberseguridad.jpg?alt=media&token=f9f24fb6-50dc-4309-9a81-9e5c30394088',

      license:
        'Material de consulta académica',

      language: 'Español',

      sourceType: 'cloudnotes'
    },


    // ==========================================
// BASE DE DATOS
// ==========================================

{
  id: 'cloudnotes-introduccion-diseno-bases',

  title:
    'Introducción al Diseño de Bases de Datos',

  subject: 'Base de Datos',

  description:
    'Material introductorio para comprender los principios fundamentales del diseño, organización y modelamiento de bases de datos.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fm1cdn112_s1_introduccion_al_diseno_de_bases.pdf?alt=media&token=1d2ffa9e-899b-4e02-b415-fd02ee7a671f',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
},

{
  id: 'cloudnotes-introduccion-bases-datos',

  title:
    'Introducción a las Bases de Datos',

  subject: 'Base de Datos',

  description:
    'Libro base para conocer los principales conceptos, estructuras y fundamentos relacionados con los sistemas de bases de datos.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fintroduccionalasbasesdedatos.pdf?alt=media&token=63ce3e30-b1b5-4125-8023-e1ac79108b6f',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
},

{
  id: 'cloudnotes-diseno-bases-datos',

  title:
    'Diseño de Bases de Datos',

  subject: 'Base de Datos',

  description:
    'Material académico enfocado en el diseño, estructuración y modelamiento de bases de datos para sistemas de información.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fdiseno_de_bases_de_datos.pdf?alt=media&token=d24786e5-92e8-4113-9bd7-052a65aca0dd',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
},

{
  id: 'cloudnotes-bases-datos-general',

  title:
    'Bases de Datos',

  subject: 'Base de Datos',

  description:
    'Texto de apoyo para estudiar conceptos esenciales relacionados con bases de datos y su utilización en sistemas informáticos.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2FBases-de-Datos.pdf?alt=media&token=9a38a9d2-8abb-41e1-89d7-83e8448960de',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
},

{
  id: 'cloudnotes-bases-datos-relacionales',

  title:
    'Bases de Datos Relacionales',

  subject: 'Base de Datos',

  description:
    'Material dedicado al modelo relacional, tablas, relaciones y principales conceptos utilizados para organizar información estructurada.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fbases-de-datos-relacionales.pdf?alt=media&token=b928800b-f1b5-4fed-a823-0d71b26bedda',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
},

{
  id: 'cloudnotes-topicos-avanzados-bd',

  title:
    'Tópicos Avanzados de Bases de Datos',

  subject: 'Base de Datos',

  description:
    'Recurso orientado a profundizar en conceptos y temáticas avanzadas relacionadas con sistemas y tecnologías de bases de datos.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Ftopicos-avanzados-de-bases-de-datos.pdf?alt=media&token=eec1c3fc-2e14-4a5d-9ca9-e8b3f56605b0',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
},

{
  id: 'cloudnotes-bd-compilando-conocimiento',

  title:
    'Bases de Datos: Compilando Conocimiento',

  subject: 'Base de Datos',

  description:
    'Material complementario que reúne contenidos y conocimientos relacionados con el estudio y aplicación de bases de datos.',

  author:
    'Biblioteca Cloud Notes',

  resourceType: 'book',

  sourceUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fbases-de-datos-compilando-conocimiento.pdf?alt=media&token=b6012307-927c-4624-a7d0-f156be52c4b3',

  coverUrl:
    'https://firebasestorage.googleapis.com/v0/b/cloud-notes-55cf8.firebasestorage.app/o/library%2Fbase-de-datos%2Fcovers%2FBases-de-datos-como-Servicio-1.jpeg?alt=media&token=45871f59-f3e4-4ce4-970c-44bc40e0cc40',

  license:
    'Material de consulta académica',

  language: 'Español',

  sourceType: 'cloudnotes'
}

  ];

  constructor() {}


  // ==========================================
  // OBTENER TODOS LOS RECURSOS
  // ==========================================

  getAllResources():
    LibraryResourceModel[] {

    return [
      ...this.resources
    ];
  }


  // ==========================================
  // OBTENER RECURSOS POR ASIGNATURA
  // ==========================================

  getResourcesBySubject(
    subject: string
  ): LibraryResourceModel[] {

    const normalizedSubject =
      this.normalizeText(
        subject
      );

    return this.resources.filter(
      resource =>
        this.normalizeText(
          resource.subject
        ) === normalizedSubject
    );
  }


  // ==========================================
  // NORMALIZAR TEXTO
  // ==========================================

  private normalizeText(
    value: string
  ): string {

    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(
        /[\u0300-\u036f]/g,
        ''
      );
  }


  // ==========================================
  // OBTENER RECURSOS DESTACADOS
  // ==========================================

  getFeaturedResources(
    limit: number = 6
  ): LibraryResourceModel[] {

    return this.resources.slice(
      0,
      limit
    );
  }


  // ==========================================
  // OBTENER RECURSO POR ID
  // ==========================================

  getResourceById(
    id: string
  ): LibraryResourceModel | null {

    return (
      this.resources.find(
        resource =>
          resource.id === id
      ) ?? null
    );
  }
}