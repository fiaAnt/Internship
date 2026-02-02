import type { Params } from 'types/params';
import { z } from 'zod';

const igdbQuerySchema = z.object({
  params: z.object({
    search: z.string().optional(),
    genreId: z
      .preprocess(
        (val) => {
          if (val === null || val === '' || val === undefined) return undefined;
          const num = Number(val);
          return isNaN(num) ? undefined : num;
        },
        z.number().int().optional()
      ),
    platformId: z
      .preprocess(
        (val) => {
          if (val === null || val === '' || val === undefined) return undefined;
          const num = Number(val);
          return isNaN(num) ? undefined : num;
        },
        z.number().int().optional()
      ),
    year: z
      .preprocess(
        (val) => {
          if (val === '' || val === null || val === undefined) return undefined;
          if (typeof val === 'string' && /^\d{4}$/.test(val)) {
            return parseInt(val, 10);
          }
          return val;
        },
        z.number().int().optional()
      ),
    limit: z.number().int().min(1).optional(),
    page: z.number().int().min(0).optional(),
  }),
});

export function buildIGDBQuery(config: Params): string {
  const validatedConfig = igdbQuerySchema.parse(config);
  const {
    search = '',
    genreId,
    platformId,
    year,
    limit = 12,
    page = 1,
  } = validatedConfig.params;

  const offset = (page - 1) * limit;

  const filters: string[] = ['rating > 0', 'cover != null'];

  if (genreId) {
    filters.push(`genres = [${genreId}]`);
  }

  if (platformId) {
    filters.push(`platforms = [${platformId}]`);
  }

  if (year) {
    const start = Math.floor(new Date(`${year}-01-01`).getTime() / 1000);
    const end = Math.floor(new Date(`${year}-12-31`).getTime() / 1000);

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
  ];

  return queryParts.filter(Boolean).join(';\n') + ';';
}
