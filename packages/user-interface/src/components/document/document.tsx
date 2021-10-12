import * as React from 'react';
import {FC} from 'react';
import {DocumentIcon, ExternalLinkIcon} from '@gemeente-denhaag/icons';
import {Link, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {FormattedMessage} from 'react-intl';
import {PortalDocument} from '../../interfaces';
import styles from './document.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({url, extension, name, size}) => {
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);

  return (
    <div className={styles.document}>
      <div className={styles['document__icon-container']}>
        <DocumentIcon className={styles.document__icon} />
      </div>
      <div
        className={classNames(styles.document__content, {
          [styles['document__content--desktop']]: isDesktop,
        })}
      >
        <Paragraph className={styles['document__file-name']}>
          {name ? `${name} (${extension}, ${size}kb)` : <Skeleton width={250} />}
        </Paragraph>
        {url !== undefined ? (
          <Link iconAlign="start" icon={<ExternalLinkIcon />} href={url}>
            <FormattedMessage id="element.download" />
          </Link>
        ) : (
          <Link iconAlign="start" disabled icon={<ExternalLinkIcon />} href="/">
            <Skeleton width={65} />
          </Link>
        )}
      </div>
    </div>
  );
};

export {Document};
