/**
 * Resolves an image URL by checking if it's already an absolute path or a new upload.
 * If it's a legacy filename, it prepends '/images/'.
 */
export function getImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return '/images/logo.png'; // Fallback

    // If it already starts with / (like /uploads/ or /images/) or is a full URL
    if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
        return imagePath;
    }

    // Default legacy behavior: prepend /images/
    return `/images/${imagePath}`;
}
