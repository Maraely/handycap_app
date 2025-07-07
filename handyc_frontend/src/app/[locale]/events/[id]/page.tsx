import SetLanguage from '../../../../../components/SetLanguage';
import { notFound } from 'next/navigation';
import EventDetailClient from '../../../../../components/EventDetailClient';

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

async function getEventById(locale: string, id: string): Promise<Event | null> {
    const res = await fetch(
        `http://localhost:1337/api/events?filters[documentId][$eq]=${id}&locale=${locale}&populate=EventPicture`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        console.error(' Failed to fetch event:', res.statusText);
        return null;
    }

    const json = await res.json();

    if (!json.data || json.data.length === 0) return null;

    const raw = json.data[0];

    return {
        id: raw.id,
        documentId: raw.documentId,
        NameOfTheEvent: raw.NameOfTheEvent,
        Description: raw.Description,
        StartTime: raw.StartTime,
        EndTime: raw.EndTime,
        Website: raw.Website,
        EventType: raw.EventType,
        Languages: raw.Languages,
        MaxCapacity: raw.MaxCapacity,
        EventPicture: raw.EventPicture?.map((pic: any) => ({
            url: pic.url,
            name: pic.name,
        })),
    };
}

export default async function EventDetailPage({
                                                  params,
                                              }: {
    params: { locale: string; id: string };
}) {
    const event = await getEventById(params.locale, params.id);

    if (!event) return notFound();

    return (
        <>
            <SetLanguage />
            <EventDetailClient event={event} />
        </>
    );
}
