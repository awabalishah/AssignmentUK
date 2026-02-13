import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/services/', '/uni/', '/subject/', '/authors/', '/city/', '/locations'],
            disallow: ['/api/', '/_next/', '/admin/', '/news/', '/wechat/', '/thtml/', '/*.shtml'],
        },
        sitemap: 'https://assignment-writing.com/sitemap.xml',
    }
}
