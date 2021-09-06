import * as React from 'react';
import {FC, useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {Heading5} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronDownIcon} from '@gemeente-denhaag/icons';
import classNames from 'classnames';
import {LayoutContext} from '../../contexts';
import styles from './current-page-indicator.module.scss';

interface CurrentPageIndicatorProps {
  hasFacet: boolean;
}

const CurrentPageIndicator: FC<CurrentPageIndicatorProps> = ({hasFacet}) => {
  const {currentPage, headerHidden, headerFixed} = useContext(LayoutContext);

  return (
    <div
      className={classNames(styles['current-page-indicator'], {
        [styles['current-page-indicator--has-facet']]: hasFacet,
        [styles['current-page-indicator--header-hidden']]: headerHidden,
        [styles['current-page-indicator--header-fixed']]: headerFixed,
      })}
    >
      <header className={styles['current-page-indicator__header']}>
        {currentPage?.icon && (
          <div className={styles['current-page-indicator__icon']}>{currentPage.icon}</div>
        )}
        <Heading5>
          <FormattedMessage id={`pageTitles.${currentPage?.titleTranslationKey}`} />
        </Heading5>
      </header>
      <div className={styles['current-page-indicator__chevron-down']}>
        <ChevronDownIcon />
      </div>
    </div>
  );
};
export {CurrentPageIndicator};
