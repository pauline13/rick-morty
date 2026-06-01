import type { ParseKeys } from 'i18next';

import { i18n } from '@/shared/i18n';

import type { RequestErrorType } from './requestError';

export const createErrorMessages = (entityKey: 'character' | 'characters') => {
  const entity = i18n.t(`common.errors.entityNames.${entityKey}` as ParseKeys);

  return {
    unknown: i18n.t('common.errors.entity.unknown', { entity }),
    network: i18n.t('common.errors.entity.network', { entity }),
    server: i18n.t('common.errors.entity.server', { entity }),
    rateLimited: i18n.t('common.errors.entity.rateLimited', { entity })
  } satisfies Partial<Record<RequestErrorType, string>>;
};
