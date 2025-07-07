'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import i18n from '../src/i18n';
import { i18nLanguages } from '../src/i18n-languages';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const currentLocale = pathname.split('/')[1];

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;


        i18n.changeLanguage(newLocale);

        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');

        startTransition(() => {
            router.push(newPath);
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <select
                value={currentLocale}
                onChange={handleLocaleChange}
                style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    background: 'white',
                    cursor: 'pointer',
                }}
            >
                {i18nLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.emoji} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
