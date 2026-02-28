import { MetadataRoute } from 'next'
import pseoData from '@/data/pseo.json'
import servicesData from '@/data/pseo-services.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://assignment-writing.com'

    // 1. University Pages
    const uniUrls = pseoData.universities.map((uni) => ({
        url: `${baseUrl}/uni/${uni.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // 2. Subject Hub Pages (Medium-High Priority)
    const subjectUrls = pseoData.subjects.map((subject) => ({
        url: `${baseUrl}/subject/${subject.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // 3. City Hub Pages (Medium Priority)
    const cityUrls = pseoData.cities.map((city) => ({
        url: `${baseUrl}/city/${city.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 4. New pSEO Service Pages
    const serviceUrls = (servicesData as any[]).map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 5. Subject + City combinations (PSEO)
    // Individual pSEO help pages (Lower Priority to prevent crawl budget waste)
    // Now handles Subjects * Cities * ServiceTypes variations
    const pseoUrls = pseoData.subjects.flatMap(sub =>
        pseoData.cities.flatMap(city =>
            (pseoData.serviceTypes || ["Assignment Help"]).map(st => ({
                url: `${baseUrl}/${sub.id}-${st.toLowerCase().replace(/ /g, '-')}-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.5,
            }))
        )
    )

    // 6. Authors
    const authorUrls = [
        'awab-ali-shah',
        'sarah-j-nursing',
        'james-l-law',
        'david-m-economics',
        'elena-r-marketing',
        'robert-t-psychology',
        'emma-w-engineering',
        'mark-s-finance',
        'linda-g-sociology'
    ].map(id => ({
        url: `${baseUrl}/authors/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/locations`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...uniUrls,
        ...subjectUrls,
        ...cityUrls,
        ...serviceUrls,
        ...pseoUrls,
        ...authorUrls,
    ]
}
