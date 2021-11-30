import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {FC, ReactElement, useContext} from 'react';
import {Heading4, Link} from '@gemeente-denhaag/denhaag-component-library';
import {ExternalLinkIcon} from '@gemeente-denhaag/icons';
import classNames from 'classnames';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';
import {PortalFooter} from '../../interfaces';
import styles from './footer.module.scss';
import {ThemeSwitcher} from '../theme-switcher';

interface FooterProps {
  footer: PortalFooter;
  facet?: ReactElement;
  showThemeSwitcher?: boolean;
}

const Footer: FC<FooterProps> = ({footer, facet, showThemeSwitcher}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <footer className={styles.footer}>
      {facet && (
        <div className={styles['footer__facet-container']}>
          {React.cloneElement(facet, {
            className: styles['footer__facet-image'],
          })}
        </div>
      )}
      <div className={styles.footer__columns}>
        {[
          ...footer
            .filter(column => column.links.find(link => link.hrefLang === hrefLang))
            .map((column, index) => (
              <div
                className={classNames(styles.footer__column, {
                  [styles['footer__column--spaced']]: index > 0,
                })}
                key={column.titleTranslationKey}
              >
                <Heading4>
                  <FormattedMessage id={`footerColumns.${column.titleTranslationKey}`} />
                </Heading4>
                {column.links
                  .filter(link => link.hrefLang === hrefLang)
                  .map(link => (
                    <Link
                      iconAlign="end"
                      icon={<ExternalLinkIcon />}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      hrefLang={link.hrefLang}
                      className={styles.footer__link}
                      key={link.linkTranslationKey}
                    >
                      <FormattedMessage id={`footerLinks.${link.linkTranslationKey}`} />
                    </Link>
                  ))}
              </div>
            )),
          ...(showThemeSwitcher
            ? [
                <div
                  className={classNames(styles.footer__column, styles['footer__column--spaced'])}
                  key="theme"
                >
                  <Heading4>
                    <FormattedMessage id="footerColumns.theme" />
                  </Heading4>
                  <div className={styles.footer__link}>
                    <ThemeSwitcher />
                  </div>
                </div>,
              ]
            : []),
        ]}
      </div>
    </footer>
  );
};

export {Footer};
