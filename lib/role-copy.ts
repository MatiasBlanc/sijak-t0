import type { Lang } from './copy';
import { dictionaries, getTranslator } from './i18n';
import { product } from './product';
import { getEnabledRoleUses, roles, type LocalizedRole, type MultiRoleCopy } from './roles';

/**
 * Prepara las traducciones y los montajes sin duplicar datos de producto en el idioma.
 * @param lang - Idioma de la página.
 * @returns Textos y montajes localizados con capacidades autorizadas.
 */
export function getMultiRoleContent(lang: Lang): { copy: MultiRoleCopy; roles: LocalizedRole[] } {
  const { landing, product: translations } = dictionaries[lang];
  const dictionary = landing.multiRole;
  const t = getTranslator(lang, 'landing');
  const tProduct = getTranslator(lang, 'product');
  const params = { productName: product.name, brand: product.brand };
  return {
    copy: {
      heading: dictionary.heading,
      lead: dictionary.lead,
      body: t('multiRole.body', params),
      hardware: dictionary.hardware,
      caption: dictionary.caption.map((_, index) => t(`multiRole.caption.${index}`, params)),
      tabsLabel: dictionary.tabsLabel,
      previewsLabel: dictionary.previewsLabel,
      illustration: dictionary.illustration,
      imageError: dictionary.imageError,
    },
    roles: roles.map((role) => {
      const translated = translations.roles[role.id];
      return {
        ...role,
        title: translated.title,
        subtitle: translated.subtitle,
        alt: tProduct(`roles.${role.id}.alt`, params),
        description: tProduct(`roles.${role.id}.description`, params),
        metrics: getEnabledRoleUses(role).map((use) => tProduct(`uses.${use}`)),
      };
    }),
  };
}
