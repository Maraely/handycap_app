import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'de', 'it'];
const defaultLocale = 'en';


function getLocale(request: NextRequest): string {
    return request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }


    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
