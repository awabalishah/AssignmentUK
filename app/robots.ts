import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/services/', '/uni/', '/subject/', '/authors/'],
            disallow: ['/api/', '/_next/', '/admin/'],
        },
        sitemap: 'https://assignment-writing.com/sitemap.xml',
    }
}
