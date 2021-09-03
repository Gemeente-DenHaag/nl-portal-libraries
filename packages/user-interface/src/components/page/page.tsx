import {FC, ReactElement, useEffect} from 'react';
import {useIntl} from 'react-intl';

interface PageProps {
  children: ReactElement;
  titleTranslationKey?: string;
}

const Page: FC<PageProps> = ({children, titleTranslationKey}) => {
  const intl = useIntl();
  const pageTitle = intl.formatMessage({id: `pageTitles.${titleTranslationKey}`});
  const appName = intl.formatMessage({id: 'app.appName'});
  const documentTitle = titleTranslationKey ? `${pageTitle} - ${appName}` : appName;

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return children;
};

export {Page};
