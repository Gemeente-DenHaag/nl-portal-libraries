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
    subtitle: 'Dierenselaan 88',
  },
  {
    createdOn: new Date(2021, 1, 5),
    id: '3',
    type: 'parking-permit',
  },
  {
    createdOn: new Date(2021, 1, 1),
    id: '1',
    type: 'parking-permit',
    completed: true,
  },
  {
    createdOn: new Date(2021, 1, 3),
    id: '2',
    type: 'holiday-rental',
    completed: true,
  },
  {
    createdOn: new Date(2021, 1, 5),
    id: '3',
    type: 'parking-permit',
    completed: true,
  },
  {
    createdOn: new Date(2021, 1, 6),
    id: '4',
    type: 'parking-permit',
    completed: true,
  },
  {
    createdOn: new Date(2021, 1, 9),
    id: '5',
    type: 'holiday-rental',
    completed: true,
  },
  {
    createdOn: new Date(2021, 1, 11),
    id: '6',
    type: 'parking-permit',
    completed: true,
  },
];
