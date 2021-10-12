import {PortalDocument} from '../interfaces';

export const getMockDocuments = (limit?: number): Array<PortalDocument> => {
  const mockDocuments = [
    {
      name: 'Kentekenregistratie',
      extension: 'docx',
      size: 658,
      url: '',
    },
    {
      name: 'Verklaring geen eigen parkeergelegenheid',
      extension: 'png',
      size: 349,
      url: '',
    },
    {
      name: 'Bewijs',
      extension: 'docx',
      size: 200,
      url: '',
    },
    {
      name: 'Voorbeelddocument',
      extension: 'docx',
      size: 921,
      url: '',
    },
    {
      name: 'Parkeergelegenheid',
      extension: 'pdf',
      size: 1000,
      url: '',
    },
    {
      name: 'Voorbeeld',
      extension: 'docx',
      size: 100,
      url: '',
    },
  ];

  return limit ? mockDocuments.slice(0, limit) : mockDocuments;
};
