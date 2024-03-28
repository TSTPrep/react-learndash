export const setLocalStorage = (name: string, items: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, JSON.stringify(items));
};

export const getLocalStorage = <T = any>(name: string): T | undefined => {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(name);
    if (data) {
        return JSON.parse(data) as T;
    }
    return undefined;
};

export const removeLocalStorage = (name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
};
