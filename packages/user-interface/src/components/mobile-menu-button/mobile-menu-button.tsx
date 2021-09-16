import * as React from 'react';
import {Button, ButtonProps} from '@gemeente-denhaag/denhaag-component-library';
import {FC} from 'react';
import styles from './mobile-menu-button.module.scss';

const MobileMenuButton: FC<ButtonProps> = props => (
  <Button {...props} className={styles['denhaag-button--mobile-menu']} />
);

export {MobileMenuButton};
