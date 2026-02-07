import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/services/', '/uni/'],
            disallow: ['/api/', '/_next/', '/admin/'],
        },
        sitemap: 'https://assignment-uk-five.vercel.app/sitemap.xml',
    }
}
