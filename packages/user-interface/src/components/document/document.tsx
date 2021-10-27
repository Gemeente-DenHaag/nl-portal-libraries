import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {DocumentIcon, DownloadIcon} from '@gemeente-denhaag/icons';
import {Link, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {FormattedMessage, useIntl} from 'react-intl';
import prettyBytes from 'pretty-bytes';
import {LocaleContext} from '@nl-portal/localization';
import useId from 'react-use-uuid';
import mimeTypes from 'mime-types';
import {PortalDocument} from '../../interfaces';
import styles from './document.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {DocumentDownload} from '../document-download';

type DocumentProps = Partial<PortalDocument>;

const Document: FC<DocumentProps> = ({url, extension, name, size}) => {
  const id = useId();
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const {hrefLang} = useContext(LocaleContext);
  const intl = useIntl();
  const [downloadId, setDownloadId] = useState('');

  const documentClick = (event: MouseEvent) => {
    const splitUrl = url?.split('/') || [''];
    const downloadIdFromUrl = splitUrl[splitUrl.length - 1];

    event.preventDefault();
    event.stopPropagation();

    setDownloadId(downloadIdFromUrl);
  };

  useEffect(() => {
    if (url && id) {
      const linkElement = document.getElementById(id);

      if (linkElement) {
        linkElement.onclick = documentClick;
      }
    }
  }, [id, url]);

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
            `${name} (${mimeTypes.extension(extension || '')}, ${prettyBytes(size || 0, {
              locale: hrefLang,
            })})`
          ) : (
            <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
              <Skeleton width={250} />
            </span>
          )}
        </Paragraph>
        {!downloadId &&
          (url !== undefined ? (
            <Link iconAlign="start" icon={<DownloadIcon />} href={url} id={id}>
              <FormattedMessage id="element.download" />
            </Link>
          ) : (
            <Link iconAlign="start" disabled icon={<DownloadIcon />} href="/">
              <span
                aria-busy
                aria-disabled
                aria-label={intl.formatMessage({id: 'element.loading'})}
              >
                <Skeleton width={65} />
              </span>
            </Link>
          ))}
        {downloadId && (
          <DocumentDownload downloadId={downloadId} name={`${name}`} extension={`${extension}`} />
        )}
      </div>
    </div>
  );
};

export {Document};
