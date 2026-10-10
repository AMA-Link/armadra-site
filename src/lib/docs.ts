import { getCollection, type CollectionEntry } from 'astro:content';
import type { Bi } from './types';
import { S } from '../i18n';

export type DocEntry = CollectionEntry<'docs'>;
export type Group = DocEntry['data']['group'];
export interface DocPair { slug: string; group: Group; order: number; zh: DocEntry; en: DocEntry }

export const GROUPS: readonly Group[] = ['start', 'concepts', 'guides', 'reference'];

export function groupLabel(g: Group): Bi {
  return S.docs.groups[g];
}

/** 按 slug 配对中英文档；缺一种语言或分组、顺序不一致时构建失败 */
export async function getDocPairs(): Promise<DocPair[]> {
  const all = await getCollection('docs');
  const by = new Map<string, Partial<Record<'zh' | 'en', DocEntry>>>();
  for (const e of all) {
    const [lang, slug] = e.id.split('/') as ['zh' | 'en', string];
    const slot = by.get(slug) ?? {};
    slot[lang] = e;
    by.set(slug, slot);
  }
  const pairs: DocPair[] = [];
  for (const [slug, { zh, en }] of by) {
    if (!zh || !en) throw new Error(`文档 ${slug} 缺少${zh ? '英文' : '中文'}版本（src/content/docs/${zh ? 'en' : 'zh'}/${slug}.md）`);
    if (zh.data.group !== en.data.group || zh.data.order !== en.data.order) {
      throw new Error(`文档 ${slug} 的中英 group / order 不一致`);
    }
    pairs.push({ slug, group: zh.data.group, order: zh.data.order, zh, en });
  }
  return pairs.sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || a.order - b.order);
}
