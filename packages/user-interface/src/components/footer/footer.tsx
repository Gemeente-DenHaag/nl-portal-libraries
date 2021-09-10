import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {FC, ReactElement} from 'react';
import {Heading4, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {ExternalLinkIcon} from '@gemeente-denhaag/icons';
import classNames from 'classnames';
import {PortalFooter} from '../../interfaces';
import styles from './footer.module.scss';

interface FooterProps {
  footer: PortalFooter;
  facet?: ReactElement;
}

const Footer: FC<FooterProps> = ({footer, facet}) => (
  <footer className={styles.footer}>
    {facet && (
      <div className={styles['footer__facet-container']}>
        {React.cloneElement(facet, {
          className: styles['footer__facet-image'],
        })}
      </div>
    )}
    <div className={styles.footer__inner}>
      {footer.map((column, index) => (
        <div
          className={classNames(styles.footer__column, {
            [styles['footer__column--spaced']]: index > 0,
          })}
          key={column.titleTranslationKey}
        >
          <Heading4>
            <FormattedMessage id={`footerColumns.${column.titleTranslationKey}`} />
          </Heading4>
          {column.links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              hrefLang={link.hrefLang}
              className={styles.footer__link}
            >
              <Paragraph>
                <FormattedMessage id={`footerLinks.${link.linkTranslationKey}`} />
              </Paragraph>
              <ExternalLinkIcon />
            </a>
          ))}
        </div>
      ))}
    </div>
  </footer>
);

export {Footer};
