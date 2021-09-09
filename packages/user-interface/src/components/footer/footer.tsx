import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {FC} from 'react';
import {Heading4, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {ExternalLinkIcon} from '@gemeente-denhaag/icons';
import {PortalFooter} from '../../interfaces';
import styles from './footer.module.scss';

interface FooterProps {
  footer: PortalFooter;
}

const Footer: FC<FooterProps> = ({footer}) => (
  <footer className={styles.footer}>
    <div className={styles.footer__inner}>
      {footer.footerColumns.map(column => (
        <div className={styles.footer__column} key={column.titleTranslationKey}>
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
