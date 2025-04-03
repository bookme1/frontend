import { saveEpubToIndexedDB } from "./indexed-db-util";




export const handleDownload = async (id: string | undefined, href: string | undefined, partOfLink: string | undefined) => {
    if (!id || !href) return;
    try {

        const response = await fetch(
            partOfLink +
            encodeURIComponent(href)
        );

        const blob = await response.blob();

        await saveEpubToIndexedDB(id, blob);


    } catch (err) {
        console.error(err);

    }
};


//'півник-щось-там.epub'
// 'https://download.elibri.com.ua/d/52c977dcc79a9b99912a77c3/409a42315871a82442077dd31bc55323310d52561ed9c0c253e2dc63265e1f65/%D0%BF%D1%96%D0%B2%D0%BD%D0%B8%D0%BA-%D1%82%D0%B0-%D0%B4%D0%B2%D0%BE%D1%94-%D0%BC%D0%B8%D1%88%D0%B5%D0%BD%D1%8F%D1%82.epub'