'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '../src/i18n';

export default function SetLanguage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];

    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale]);

    return null;
}
