import { MetadataRoute } from 'next'
import data from '@/data/pseo.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://assignmentuk.vercel.app' // Replace with your actual domain

    // Get all pSEO slugs
    const pseoUrls = data.subjects.flatMap((subject) =>
        data.cities.map((city) => ({
            url: `${baseUrl}/${subject.id}-assignment-help-${city.toLowerCase().replace(/\s+/g, '-')}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    )

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...pseoUrls,
    ]
}
