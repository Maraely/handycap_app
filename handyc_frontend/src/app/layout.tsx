import './globals.css';

export const metadata = {
    title: 'HandyCap Events',
    description: 'Accessible events for everyone',
};

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={params.locale}>
        <body>{children}</body>
        </html>
    );
}

