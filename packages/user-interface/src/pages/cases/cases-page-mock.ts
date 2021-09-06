import {PortalCase} from '../../interfaces';

export const mockCases: Array<PortalCase> = [
  {
    createdOn: new Date(2021, 1, 1),
    id: '1',
    type: 'parking-permit',
  },
  {
    createdOn: new Date(2021, 1, 3),
    id: '2',
    type: 'holiday-rental',
  },
  {
    createdOn: new Date(2021, 1, 5),
    id: '3',
    type: 'parking-permit',
  },
];
