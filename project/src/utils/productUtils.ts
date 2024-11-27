import type { ProductCondition, SimpleProduct, ConfigurableProduct } from '../types';

export const getProductReference = (ean: string, condition?: ProductCondition): string => {
  if (!condition) return ean;
  const conditionSuffix = {
    new: 'neuf',
    perfect: 'parfait',
    good: 'bon',
    fair: 'correct'
  }[condition];
  return `${ean}-${conditionSuffix}`;
};

export const getProductConditionLabel = (condition: ProductCondition): string => {
  const labels = {
    new: 'Neuf',
    perfect: 'Occasion parfait état',
    good: 'Occasion bon état',
    fair: 'Occasion état correct'
  };
  return labels[condition];
};

export const getVatRate = (condition: ProductCondition): number => {
  return condition === 'new' ? 20 : 0;
};

export const createConfigurableProduct = (
  ean: string,
  name: string
): ConfigurableProduct => {
  return {
    id: ean,
    ean,
    name,
    type: 'configurable',
    variants: []
  };
};

export const createSimpleProduct = (
  configurable: ConfigurableProduct,
  condition: ProductCondition,
  price: number
): SimpleProduct => {
  return {
    id: getProductReference(configurable.ean, condition),
    ean: configurable.ean,
    name: configurable.name,
    type: 'simple',
    condition,
    price,
    vat: getVatRate(condition),
    stock: 0,
    parentId: configurable.id
  };
};