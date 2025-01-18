export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
};

export const deleteCookies = (names: string[]) => {
    names.forEach((name) => {
        document.cookie = `${name}=; path=/; max-age=0`;
    });
};

export const setCookie = (name: string, value: string, maxAge: number, options: { path?: string; secure?: boolean; sameSite?: "strict" | "lax" | "none" } = {}) => {
    let cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}`;

    if (options.path) {
        cookie += `; path=${options.path}`;
    }
    if (options.secure) {
        cookie += "; secure";
    }
    if (options.sameSite) {
        cookie += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookie;
};