import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import mimeTypes from 'mime-types';
import {useGetDocumentContentQuery} from '@nl-portal/api';
import {DownloadIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage} from 'react-intl';
import {Link} from '@gemeente-denhaag/denhaag-component-library';
import useId from 'react-use-uuid';

interface DocumentDownloadProps {
  downloadId: string;
  name: string;
  extension: string;
}

const DocumentDownload: FC<DocumentDownloadProps> = ({downloadId, name, extension}) => {
  const [href, setHref] = useState('');
  const {data} = useGetDocumentContentQuery({
    variables: {id: downloadId},
  });
  const mimeType = extension;
  const fileExtension = mimeTypes.extension(extension || '');
  const downloadContent = data?.getDocumentContent.content;
  const splitName = name.split('.');
  const nameWithoutExtension = splitName[0];
  const downloadName = `${nameWithoutExtension}.${fileExtension}`;
  const id = useId();

  useEffect(() => {
    if (downloadContent) {
      setHref(`data:${mimeType};base64,${downloadContent}`);
    }
  }, [downloadContent]);

  useEffect(() => {
    const linkElement = document.getElementById(id);

    if (href && linkElement) {
      linkElement.focus();
      linkElement.click();
    }
  }, [href]);

  return downloadName && href ? (
    <Link iconAlign="start" icon={<DownloadIcon />} href={href} download={downloadName} id={id}>
      <FormattedMessage id="element.download" />
    </Link>
  ) : (
    <Link iconAlign="start" disabled icon={<DownloadIcon />} href="/">
      <FormattedMessage id="element.download" />
    </Link>
  );
};

export {DocumentDownload};
