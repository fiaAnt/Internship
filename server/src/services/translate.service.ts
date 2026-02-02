import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const translationCache = new Map<string, string>();

export async function translateText(text: string, targetLang: string) {
    if (!text) return '';
    const cacheKey = `${targetLang}:${text}`;
    if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `You are a translator. Translate the text below to ${targetLang}. Keep proper names intact.`,
            },
            { role: 'user', content: text },
        ],
        temperature: 0,
    });

    const translated = response.choices[0].message?.content!.trim() || text;
    translationCache.set(cacheKey, translated);
    return translated;
}

export async function translateFields(obj: any, fields: string[], targetLang: string) {
    const translated: any = { ...obj };

    for (const field of fields) {
        if (Array.isArray(obj[field])) {
            translated[field] = await Promise.all(
                obj[field].map(async (item: any) => ({
                    ...item,
                    name: item.name ? await translateText(item.name, targetLang) : item.name,
                }))
            );
        } else if (typeof obj[field] === 'string') {
            translated[field] = await translateText(obj[field], targetLang);
        }
    }

    return translated;
}
