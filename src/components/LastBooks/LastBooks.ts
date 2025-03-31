export const saveRouteToLocalStorage = (url: string) => {
    const match = url.match(/book\/([a-f0-9-]+)/);
    if (!match) return;

    const bookId = match[1];
    const key = 'lastVisitedRoutes';

    try {
        const storedRoutes = JSON.parse(localStorage.getItem(key) || '[]') as string[];
        const updatedRoutes = [bookId, ...storedRoutes.filter(id => id !== bookId)];

        if (updatedRoutes.length > 10) {
            updatedRoutes.pop();
        }

        localStorage.setItem(key, JSON.stringify(updatedRoutes));
    } catch (error) {
        console.error('Error saving route to localStorage:', error);
    }
};
