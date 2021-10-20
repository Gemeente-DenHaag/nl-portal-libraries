import * as React from 'react';
import {FC, Fragment} from 'react';
import {Document as PortalDocument} from '@nl-portal/api';
import styles from './document-list.module.scss';
import {Document} from '../document';

interface DocumentListProps {
  documents?: Array<PortalDocument>;
}

const DocumentList: FC<DocumentListProps> = ({documents}) =>
  documents ? (
    <Fragment>
      {documents.map(document => (
        <div className={styles.document} key={`${document.bestandsnaam}${document.bestandsomvang}`}>
          <Document
            extension={document.formaat || ''}
            name={document.bestandsnaam || ''}
            size={document.bestandsomvang || 0}
            url={document.url || ''}
          />
        </div>
      ))}
    </Fragment>
  ) : (
    <div className={styles.document}>
      <Document />
    </div>
  );

export {DocumentList};
