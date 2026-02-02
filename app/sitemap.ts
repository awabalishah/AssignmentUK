import { MetadataRoute } from 'next'
import pseoData from '@/data/pseo.json'
import servicesData from '@/data/pseo-services.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://assignment-uk-five.vercel.app'

    // 1. University Pages
    const uniUrls = pseoData.universities.map((uni) => ({
        url: `${baseUrl}/uni/${encodeURIComponent(uni.toLowerCase().replace(/\s+/g, '-'))}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 2. Subject Pages
    const subjectUrls = pseoData.subjects.map((subject) => ({
        url: `${baseUrl}/subject/${subject.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 3. New pSEO Service Pages
    const serviceUrls = (servicesData as any[]).map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...uniUrls,
        ...subjectUrls,
        ...serviceUrls,
    ]
}
