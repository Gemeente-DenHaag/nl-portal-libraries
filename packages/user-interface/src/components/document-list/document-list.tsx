import * as React from 'react';
import {FC, Fragment} from 'react';
import {PortalDocument} from '../../interfaces';
import {Document} from '../document';
import styles from './document-list.module.scss';

interface DocumentListProps {
  documents: Array<Partial<PortalDocument>>;
}

const DocumentList: FC<DocumentListProps> = ({documents}) => (
  <Fragment>
    {documents.map(document => (
      <div className={styles.document} key={`${document.name}${document.size}`}>
        <Document
          extension={document.extension}
          name={document.name}
          size={document.size}
          url={document.url}
        />
      </div>
    ))}
  </Fragment>
);

export {DocumentList};
