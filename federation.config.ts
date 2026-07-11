export const REMOTE_FAVORITES_DEV = {
  host: 'localhost',
  port: 5001,
  entryPath: 'assets/remoteEntry.js'
} as const;

export const buildRemoteEntryUrl = ({
  host,
  port,
  entryPath
}: Pick<typeof REMOTE_FAVORITES_DEV, 'host' | 'port' | 'entryPath'>) =>
  `http://${host}:${port}/${entryPath}`;

export const DEFAULT_REMOTE_FAVORITES_URL =
  buildRemoteEntryUrl(REMOTE_FAVORITES_DEV);
