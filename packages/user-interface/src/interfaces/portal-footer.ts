export interface PortalFooter {
  footerColumns: Array<{
    titleTranslationKey: string;
    links: Array<{linkTranslationKey: string; url: string; hrefLang: string}>;
  }>;
}
