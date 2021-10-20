import * as React from 'react';
import {FC, Fragment} from 'react';
import {Document as PortalDocument} from '@nl-portal/api';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import styles from './document-list.module.scss';
import {Document} from '../document';

interface DocumentListProps {
  documents?: Array<PortalDocument>;
}

const DocumentList: FC<DocumentListProps> = ({documents}) => (
  <Fragment>
    {!documents && (
      <div className={styles.document}>
        <Document />
      </div>
    )}
    {documents && documents.length > 0 && (
      <Fragment>
        {documents.map(document => (
          <div
            className={styles.document}
            key={`${document.bestandsnaam}${document.bestandsomvang}`}
          >
            <Document
              extension={document.formaat || ''}
              name={document.bestandsnaam || ''}
              size={document.bestandsomvang || 0}
              url={document.url || ''}
            />
          </div>
        ))}
      </Fragment>
    )}
    {documents && documents.length === 0 && (
      <Paragraph>
        <FormattedMessage id="documents.noDocuments" />
      </Paragraph>
    )}
  </Fragment>
);

export {DocumentList};
