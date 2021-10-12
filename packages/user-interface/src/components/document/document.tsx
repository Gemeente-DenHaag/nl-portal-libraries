import * as React from 'react';
import {FC} from 'react';
import {DocumentIcon, ExternalLinkIcon} from '@gemeente-denhaag/icons';
import {Link, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {PortalDocument} from '../../interfaces';
import styles from './document.module.scss';

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({url, extension, name, size}) => (
  <div className={styles.document}>
    <div className={styles['document__icon-container']}>
      <DocumentIcon className={styles.document__icon} />
    </div>
    <div className={styles.document__content}>
      <Paragraph>{`${name} (${extension}, ${size}kb)`}</Paragraph>
      <Link iconAlign="start" icon={<ExternalLinkIcon />} href={url}>
        Download
      </Link>
    </div>
  </div>
);

export {Document};
