import * as React from 'react';
import {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {Heading5} from '@gemeente-denhaag/denhaag-component-library';
import {LayoutContext} from '../../contexts';
import styles from './current-page.module.scss';

const CurrentPage = () => {
  const {currentPage} = useContext(LayoutContext);
  return (
    <div className={styles['current-page']}>
      <div className={styles['current-page__inner']}>
        {currentPage?.icon && (
          <div className={styles['current-page__icon']}>{currentPage.icon}</div>
        )}
        <Heading5>
          <FormattedMessage id={`pageTitles.${currentPage?.titleTranslationKey}`} />
        </Heading5>
      </div>
    </div>
  );
};
export {CurrentPage};
