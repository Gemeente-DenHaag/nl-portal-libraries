import * as React from 'react';
import {FC, Fragment} from 'react';
import {PortalDocument} from '../../interfaces';
import {Document} from '../document';

interface DocumentListProps {
  documents: Array<Partial<PortalDocument>>;
}

const DocumentList: FC<DocumentListProps> = ({documents}) => (
  <Fragment>
    {documents.map(document => (
      <Document
        extension={document.extension}
        name={document.name}
        size={document.size}
        url={document.url}
        key={`${document.name}${document.size}`}
      />
    ))}
  </Fragment>
);

export {DocumentList};
