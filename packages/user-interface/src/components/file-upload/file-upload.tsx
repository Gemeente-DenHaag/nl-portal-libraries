import * as React from 'react';
import {Fragment, FC, useState, useEffect} from 'react';

interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

interface FileUploadProps {
  disabled: boolean;
  multiple: boolean;
  onChange: (fileList: Array<UploadedFile>) => void;
}

const FileUpload: FC<FileUploadProps> = ({disabled, multiple, onChange}) => {
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<Array<UploadedFile>>([]);

  const uploadFile = (file: File) => {
    const restUri = sessionStorage.getItem('REST_URI');
    const keycloakToken = sessionStorage.getItem('KEYCLOAK_TOKEN');
    const uploadLink = `${restUri}/document/content`;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch(uploadLink, {
      method: 'POST',
      headers: {Authorization: `Bearer ${keycloakToken}`},
      body: formData,
    })
      .then(response => response.json())
      .then(document => {
        const portalFile = {url: document.url, name: file.name, size: file.size};
        if (!multiple) {
          setFileList([portalFile]);
        } else {
          setFileList([portalFile, ...fileList]);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    onChange(fileList);
  }, [fileList]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file => uploadFile(file));
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChangeHandler} disabled={disabled || isLoading} />
      <Fragment>
        {fileList.map(file => (
          <div key={file.url}>
            <p>Filename: {file.name}</p>
            <p>Filesize: {file.size}</p>
          </div>
        ))}
      </Fragment>
      {!isLoading || <p>Loading</p>}
    </div>
  );
};

export {FileUpload, UploadedFile};
