export const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    if (!baseUrl) throw new Error('REACT_APP_BASE_URL не определён');

    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Ошибка сети');
    }

    return response.json() as Promise<T>;
};
