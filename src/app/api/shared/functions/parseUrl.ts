/**
 * Parse a url from config, and make sure there is exactly one trailing forward slash.
 * @param url A URL which may or may not already have at least one trailing forward slash.
 */
export function parseUrl(url: string): string {
    if (!url) {
        throw new Error('Could not parse url. Provided argument is empty.');
    }

    return url.replace(/\/+$/, '').concat('/');
}
