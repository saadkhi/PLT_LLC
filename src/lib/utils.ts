/**
 * Returns the value if it is an absolute http(s) URL, otherwise null.
 * Use before rendering visitor-supplied links so `javascript:` and similar URLs never reach an href.
 */
export function safeHttpUrl(value: string | null | undefined): string | null {
    if (!value) return null;
    try {
        const url = new URL(value.trim());
        return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
    } catch {
        return null;
    }
}

/**
 * Resolves an image URL by checking if it's already an absolute path or a new upload.
 * If it's a legacy filename, it prepends '/images/'.
 */
export function getImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return '/images/logo.png'; // Fallback

    // If it's a full URL, Base64 (data:), or path (starts with /)
    if (imagePath.startsWith('/') || imagePath.startsWith('http') || imagePath.startsWith('data:')) {
        return imagePath;
    }

    // Default legacy behavior: prepend /images/
    return `/images/${imagePath}`;
}
