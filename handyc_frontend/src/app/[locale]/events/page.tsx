import EventsClient from '../../../../components/EventsClient';
import SetLanguage from '../../../../components/SetLanguage';

export const dynamic = 'force-dynamic';

type EventItem = {
    id: number;
    documentId: string;
    NameOfTheEvent?: string;
    Description?: string;
    EventPicture?: {
        url: string;
    }[];
};

async function getEvents(locale: string): Promise<EventItem[]> {
    const res = await fetch(
        `http://localhost:1337/api/events?populate=EventPicture&locale=${locale}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        console.error(' Failed to fetch events:', res.statusText);
        return [];
    }

    const json = await res.json();

    return json.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        NameOfTheEvent: item.NameOfTheEvent,
        Description: item.Description,
        EventPicture: item.EventPicture?.map((pic: any) => ({
            url: pic.url,
        })),
    }));
}

export default async function EventsPage({ params }: { params: { locale: string } }) {
    const locale = params.locale;
    const events = await getEvents(locale);

    return (
        <>
            <SetLanguage />
            <EventsClient events={events} locale={locale} />
        </>
    );
}
