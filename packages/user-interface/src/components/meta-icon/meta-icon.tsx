import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';
import styles from './meta-icon.module.scss';

interface MetaIconProps {
  title: string;
  subtitle?: string;
  icon: ReactElement;
}

const MetaIcon: FC<MetaIconProps> = ({title, subtitle, icon}) => (
  <div className={styles['meta-icon']}>
    {React.cloneElement(icon, {className: styles['meta-icon__icon']})}
    <Paragraph className={styles['meta-icon__paragraph']}>{title}</Paragraph>
    <Paragraph
      className={classNames(styles['meta-icon__paragraph'], styles['meta-icon__paragraph--bold'])}
    >
      {subtitle || <Skeleton width={100} />}
    </Paragraph>
  </div>
);
export {MetaIcon};
