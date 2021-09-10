import * as React from 'react';
import {FC, useContext} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Heading5} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronDownIcon} from '@gemeente-denhaag/icons';
import classNames from 'classnames';
import {LayoutContext} from '../../contexts';
import styles from './current-page-indicator.module.scss';

interface CurrentPageIndicatorProps {
  hasFacet: boolean;
}

const CurrentPageIndicator: FC<CurrentPageIndicatorProps> = ({hasFacet}) => {
  const {currentPage, headerHidden, headerFixed, showMenu} = useContext(LayoutContext);
  const intl = useIntl();

  return (
    <button
      onClick={showMenu}
      type="button"
      className={classNames(styles['current-page-indicator'], {
        [styles['current-page-indicator--has-facet']]: hasFacet,
        [styles['current-page-indicator--header-hidden']]: headerHidden,
        [styles['current-page-indicator--header-fixed']]: headerFixed,
      })}
      title={intl.formatMessage({id: 'menu.open'})}
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
    </button>
  );
};
export {CurrentPageIndicator};
