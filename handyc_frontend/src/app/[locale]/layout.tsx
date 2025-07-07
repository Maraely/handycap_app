import '../globals.css';
import { dir } from 'i18next';
import { ReactNode } from 'react';
import SetLanguage from '../../../components/SetLanguage';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return ['en', 'de', 'it'].map((locale) => ({ locale }));
}

export default function LocaleLayout({
                                         children,
                                         params,
                                     }: {
    children: ReactNode;
    params: { locale: string };
}) {
    const locale = params.locale;


    const supportedLocales = ['en', 'de', 'it'];
    if (!supportedLocales.includes(locale)) {
        notFound();
    }

    const direction = dir(locale);

    return (
        <html lang={locale} dir={direction}>
        <body>
        <SetLanguage />
        {children}
        </body>
        </html>
    );
}
