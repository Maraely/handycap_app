'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import i18n from '../src/i18n';

type EventItem = {
    id: number;
    documentId: string;
    NameOfTheEvent?: string;
    Description?: string;
    EventPicture?: { url: string }[];
};

export default function EventsClient({
                                         events,
                                         locale,
                                     }: {
    events: EventItem[];
    locale: string;
}) {
    const { t } = useTranslation('common');

    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale]);

    return (
        <div className="event-page">
            <div className="event-container">
                <h1>{t('eventsTitle')}</h1>

                {events.length === 0 ? (
                    <p>{t('noEvents')}</p>
                ) : (
                    events.map((event) => (
                        <div className="event-box" key={event.documentId}>
                            {event.EventPicture?.[0]?.url && (
                                <img
                                    src={`http://localhost:1337${event.EventPicture[0].url}`}
                                    alt={event.NameOfTheEvent || 'Event image'}
                                    className="event-image"
                                />
                            )}

                            <h2>{event.NameOfTheEvent || t('untitledEvent')}</h2>
                            <p>
                                {event.Description
                                    ? event.Description.slice(0, 120) + '...'
                                    : t('noDescription')}
                            </p>

                            <Link
                                className="event-link"
                                href={`/${locale}/events/${event.documentId}`}
                            >
                                {t('viewDetails')} →
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
