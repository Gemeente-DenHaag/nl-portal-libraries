import * as React from 'react';
import {FC} from 'react';
import {PortalDocument} from '../../interfaces';
import styles from './document.module.scss';

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({url, extension, name, size}) => (
  <div className={styles.document}>
    {url}
    {extension}
    {name}
    {size}
  </div>
);

export {Document};
