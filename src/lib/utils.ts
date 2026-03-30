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
