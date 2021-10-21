import * as React from 'react';
import {FC, useContext, useState} from 'react';
import {DocumentIcon, DownloadIcon} from '@gemeente-denhaag/icons';
import {Link, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {FormattedMessage, useIntl} from 'react-intl';
import prettyBytes from 'pretty-bytes';
import {LocaleContext} from '@nl-portal/localization';
import {PortalDocument} from '../../interfaces';
import styles from './document.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {DocumentDownload} from '../document-download';

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({url, extension, name, size}) => {
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const {hrefLang} = useContext(LocaleContext);
  const intl = useIntl();
  const [downloadId, setDownloadId] = useState('');
  const [downloadToggled, setDownloadToggle] = useState(false);

  const documentClick = (event: MouseEvent) => {
    const splitUrl = url?.split('/') || [''];
    const downloadIdFromUrl = splitUrl[splitUrl.length - 1];

    event.preventDefault();
    event.stopPropagation();

    setDownloadId(downloadIdFromUrl);
    setDownloadToggle(!downloadToggled);
  };

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
          {name ? (
            `${name} (${extension}, ${prettyBytes(size || 0, {locale: hrefLang})})`
          ) : (
            <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
              <Skeleton width={250} />
            </span>
          )}
        </Paragraph>
        {url !== undefined ? (
          <button
            className={styles['document__download-button']}
            type="button"
            onClick={event => documentClick(event as any as MouseEvent)}
          >
            <Link iconAlign="start" icon={<DownloadIcon />} href={url}>
              <FormattedMessage id="element.download" />
            </Link>
          </button>
        ) : (
          <Link iconAlign="start" disabled icon={<DownloadIcon />} href="/">
            <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
              <Skeleton width={65} />
            </span>
          </Link>
        )}
      </div>
      {downloadId && (
        <DocumentDownload
          downloadId={downloadId}
          name={`${name}`}
          extension={`${extension}`}
          toggle={downloadToggled}
        />
      )}
    </div>
  );
};

export {Document};
