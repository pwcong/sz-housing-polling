export function getCacheList(routes: Array<any>, cacheList?: Set<string>) {
  cacheList = cacheList || new Set();

  routes.forEach((r) => {
    if ((r.meta || {}).cache) {
      cacheList.add(r.name);
    }

    if (Array.isArray(r.children)) {
      getCacheList(r.children, cacheList);
    }
  });

  return Array.from(cacheList.values());
}
