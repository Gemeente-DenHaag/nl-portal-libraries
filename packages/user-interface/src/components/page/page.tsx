import {FC, ReactElement, useContext, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {PortalPage} from '../../interfaces';
import {LayoutContext} from '../../contexts';

interface PageProps {
  children: ReactElement;
  page: PortalPage;
}

const Page: FC<PageProps> = ({children, page}) => {
  const {setCurrentPage} = useContext(LayoutContext);
  const intl = useIntl();
  const pageTitle = intl.formatMessage({id: `pageTitles.${page?.titleTranslationKey}`});
  const appName = intl.formatMessage({id: 'app.appName'});
  const documentTitle = page?.titleTranslationKey ? `${pageTitle} - ${appName}` : appName;

  useEffect(() => {
    document.title = documentTitle;
    setCurrentPage(page);
  }, [documentTitle]);

  return children;
};

export {Page};
