import type { Params } from 'types/params';

export function buildIGDBQuery(config: Params): string {
  const {
    search = '',
    genreId,
    platformId,
    year,
    limit = 12,
    page = 1,
  } = config.params;

  const offset = page * limit;

  const filters: string[] = ['rating > 0', 'cover != null'];

  if (genreId) {
    filters.push(`genres = [${genreId}]`);
  }

  if (platformId) {
    filters.push(`platforms = [${platformId}]`);
  }

  if (year) {
    const start = Math.floor(
      new Date(`${year}-01-01`).getTime() / 1000
    );
    const end = Math.floor(
      new Date(`${year}-12-31`).getTime() / 1000
    );

    filters.push(
      `first_release_date >= ${start} & first_release_date <= ${end}`
    );
  }

  const queryParts = [
    search ? `search "${search}"` : '',
    `fields
      id,
      name,
      cover.url,
      rating,
      first_release_date,
      genres.id,
      genres.name,
      platforms.id,
      platforms.name`,
    filters.length ? `where ${filters.join(' & ')}` : '',
    !search ? 'sort first_release_date desc' : '',
    `limit ${limit}`,
    `offset ${offset}`,
  ]

  return queryParts.filter(Boolean).join(';\n') + ';';
}