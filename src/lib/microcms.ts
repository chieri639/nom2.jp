process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { createClient } from 'microcms-js-sdk';

if (!process.env.X_MICROCMS_SERVICE_ID) {
  throw new Error('X_MICROCMS_SERVICE_ID is required');
}

if (!process.env.X_MICROCMS_API_KEY) {
  throw new Error('X_MICROCMS_API_KEY is required');
}

// Client initialization
export const client = createClient({
  serviceDomain: process.env.X_MICROCMS_SERVICE_ID,
  apiKey: process.env.X_MICROCMS_API_KEY,
});

// Type definitions for our microCMS Content
export type SAKE = {
  id: string;
  name: string;
  brewery: string;
  price: number;
  description: string;
  imageUrl: string;
  oldId: string;
};

export type ARTICLE = {
  id: string;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  oldId: string;
};

export type BREWERY = {
  id: string;
  name: string;
  content: string;
  imageUrl: string;
  oldId: string;
};

// Brand and Shop use the same field structure as Brewery currently, but distinct API endpoints
export type BRAND = BREWERY;
export type SHOP = BREWERY;

/**
 * Fetch functions
 */

export const getSakes = async (queries?: any) => {
  return await client.getList<SAKE>({ endpoint: 'sake', queries });
};
export const getSakeDetail = async (contentId: string, queries?: any) => {
  return await client.getListDetail<SAKE>({ endpoint: 'sake', contentId, queries });
};

export const getArticles = async (queries?: any) => {
  return await client.getList<ARTICLE>({ endpoint: 'article', queries });
};
export const getArticleDetail = async (contentId: string, queries?: any) => {
  return await client.getListDetail<ARTICLE>({ endpoint: 'article', contentId, queries });
};

export const getBreweries = async (queries?: any) => {
  return await client.getList<BREWERY>({ endpoint: 'brewery', queries });
};
export const getBreweryDetail = async (contentId: string, queries?: any) => {
  return await client.getListDetail<BREWERY>({ endpoint: 'brewery', contentId, queries });
};

export const getBrands = async (queries?: any) => {
  return await client.getList<BRAND>({ endpoint: 'brand', queries });
};
export const getBrandDetail = async (contentId: string, queries?: any) => {
  return await client.getListDetail<BRAND>({ endpoint: 'brand', contentId, queries });
};

export const getShops = async (queries?: any) => {
  return await client.getList<SHOP>({ endpoint: 'shop', queries });
};
export const getShopDetail = async (contentId: string, queries?: any) => {
  return await client.getListDetail<SHOP>({ endpoint: 'shop', contentId, queries });
};
