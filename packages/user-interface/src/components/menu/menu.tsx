import * as React from 'react';
import {Heading4, IconButton} from '@gemeente-denhaag/denhaag-component-library';
import {CloseIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage} from 'react-intl';
import styles from './menu.module.scss';

const Menu = () => (
  <div className={styles.menu}>
    <div className={styles.menu__header}>
      <Heading4>
        <FormattedMessage id="app.appName" />
      </Heading4>
      <IconButton>
        <CloseIcon />
      </IconButton>
    </div>
  </div>
);

export {Menu};
