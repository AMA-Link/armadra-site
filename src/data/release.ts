import data from './release.json';

export type Os = 'darwin' | 'windows' | 'linux';
export interface Asset {
  name: string;
  url: string;
  size: number;
  os: Os;
  arch: 'aarch64' | 'x86_64';
  kind: 'dmg' | 'zip' | 'setup' | 'portable' | 'AppImage' | 'deb' | 'rpm';
}

/** 最新发布的快照，由 pnpm sync:release 更新 */
export const RELEASE = data as { version: string; tag: string; published: string; url: string; assets: Asset[] };
