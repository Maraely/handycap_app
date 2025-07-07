'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../src/i18n';

type Event = {
    id: number;
    documentId: string;
    NameOfTheEvent?: string;
    Description?: string;
    StartTime?: string;
    EndTime?: string;
    Website?: string;
    EventType?: string;
    Languages?: string;
    MaxCapacity?: string;
    EventPicture?: {
        url: string;
        name?: string;
    }[];
};

export default function EventDetailClient({
                                              event,
                                              locale,
                                          }: {
    event: Event;
    locale: string;
}) {
    const { t } = useTranslation('common');
    const imageUrl = event.EventPicture?.[0]?.url;


    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f0f4f8',
                minHeight: '100vh',
                padding: '2rem',
            }}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '2.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                    maxWidth: '900px',
                    width: '100%',
                }}
            >
                {imageUrl && (
                    <img
                        src={`http://localhost:1337${imageUrl}`}
                        alt={event.EventPicture?.[0]?.name || 'Event'}
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            marginBottom: '2rem',
                        }}
                    />
                )}

                <h1
                    style={{
                        color: '#004aad',
                        fontSize: '2.2rem',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    {event.NameOfTheEvent || t('untitledEvent')}
                </h1>

                <p
                    style={{
                        fontSize: '1.1rem',
                        color: '#444',
                        lineHeight: '1.6',
                        marginBottom: '2.5rem',
                        textAlign: 'center',
                    }}
                >
                    {event.Description || t('noDescription')}
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    <InfoCard label={t('type')} value={event.EventType} />
                    <InfoCard label={t('languages')} value={event.Languages} />
                    <InfoCard label={t('maxCapacity')} value={event.MaxCapacity} />
                    <InfoCard
                        label={t('start')}
                        value={
                            event.StartTime ? new Date(event.StartTime).toLocaleString() : '-'
                        }
                    />
                    <InfoCard
                        label={t('end')}
                        value={
                            event.EndTime ? new Date(event.EndTime).toLocaleString() : '-'
                        }
                    />
                    <InfoCard
                        label={t('website')}
                        value={
                            event.Website ? (
                                <a
                                    href={event.Website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#0077cc',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                    }}
                                >
                                    🌐 {t('visitSite')}
                                </a>
                            ) : (
                                '-'
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
}

function InfoCard({ label, value }: { label: string; value: any }) {
    return (
        <div
            style={{
                backgroundColor: '#eef6ff',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
        >
            <div
                style={{
                    fontSize: '0.9rem',
                    color: '#004aad',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: '1.05rem', color: '#333' }}>{value || '-'}</div>
        </div>
    );
}
