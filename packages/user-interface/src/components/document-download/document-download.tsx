import * as React from 'react';
import {FC, useContext} from 'react';
import mimeTypes from 'mime-types';
import {DownloadIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link} from '@gemeente-denhaag/components-react';
import Skeleton from 'react-loading-skeleton';
import {ApiContext} from '@gemeente-denhaag/nl-portal-api';
import {KeycloakContext} from '@gemeente-denhaag/nl-portal-authentication';

interface DocumentDownloadProps {
  uuid?: string;
  name?: string;
  extension?: string;
}

const DocumentDownload: FC<DocumentDownloadProps> = ({uuid, name, extension}) => {
  const {restUri} = useContext(ApiContext);
  const {keycloakToken} = useContext(KeycloakContext);
  const intl = useIntl();
  const downloadLink = `${restUri}/document/${uuid}/content`;
  const fileExtension = mimeTypes.extension(extension || '');
  const splitName = name?.split('.');
  const nameWithoutExtension = splitName && splitName[0];
  const downloadName = `${nameWithoutExtension}.${fileExtension}`;

  const handleLink = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const result = await fetch(downloadLink, {
      headers: {Authorization: `Bearer ${keycloakToken}`},
    });

    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = href;
    link.download = downloadName;
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    link.remove();
    window.URL.revokeObjectURL(link.href);
  };

  return uuid && name && extension ? (
    React.cloneElement(
      <Link iconAlign="start" icon={<DownloadIcon />} href={downloadLink} id={uuid}>
        <FormattedMessage id="element.download" />
      </Link>,
      {onClick: handleLink}
    )
  ) : (
    <Link iconAlign="start" disabled icon={<DownloadIcon />} href="/">
      <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
        <Skeleton width={65} />
      </span>
    </Link>
  );
};

export {DocumentDownload};
