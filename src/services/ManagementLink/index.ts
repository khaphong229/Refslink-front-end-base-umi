import { LinkItem } from "./typing";

export const getLinks = (): Promise<LinkItem[]> =>{

    return Promise.resolve([
        {
		id: '1',
		originalUrl: 'https://modrinth.com/datapack/tool-trims/version/2.2.2',
		shortUrl: 'https://link4m.com/9KUeRj',
		createdAt: '10:29 18/01/2025',
		clicks: 52,
		visible: true,
	},
	{
		id: '2',
		originalUrl: 'https://anvaoday.blogspot.com/p/ealupae.html',
		shortUrl: 'https://link4m.com/jPzhIV',
		createdAt: '17:27 17/01/2025',
		clicks: 33,
		visible: true,
	},
	{
		id: '3',
		originalUrl: 'https://drive.google.com/drive/folders/abcxyz',
		shortUrl: 'https://link4m.com/6TzTi98',
		createdAt: '09:16 17/01/2025',
		clicks: 88,
		visible: false,
	},
    ])
}


export const createShortLink = async (originalUrl: string): Promise<LinkItem> =>{
    const newLink: LinkItem = {
        id: Date.now().toString(),
        originalUrl,
        shortUrl: `https://link4m.com/${Math.random().toString(36).substring(2, 8)}`,
        createdAt: new Date().toLocaleString('vi-VN'),
        clicks: 0,
        visible: true,
    }
    return Promise.resolve(newLink)
}