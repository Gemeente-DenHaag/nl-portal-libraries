import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import mimeTypes from 'mime-types';
import {useGetDocumentContentQuery} from '@nl-portal/api';

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
  const mimeType = mimeTypes.lookup(extension);
  const downloadContent = data?.getDocumentContent.content;
  const downloadName = `${name}.${extension}`;
  const linkRef = useRef(null);

  useEffect(() => {
    if (downloadContent) {
      setHref(`data:${mimeType};base64,${downloadContent}`);
    }
  }, [downloadContent]);

  useEffect(() => {
    if (href) {
      (linkRef?.current as any).click();
    }
  }, [href]);

  // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label
  return <a download={downloadName} ref={linkRef} href={href} />;
};

export {DocumentDownload};
