# Image credits

All site photography is stored locally in `public/images/` and served from the site's own origin. Nothing is hotlinked.

The photographs are generic architectural stock images. **They do not depict BNX 24’s offices or any BNX 24 property**, and the site copy must never suggest that they do.

| Use | File stem | Photographer | Source | License |
| --- | --- | --- | --- | --- |
| Homepage hero | `hero-desktop-*`, `hero-wide-*` | Anthony Esau | https://unsplash.com/photos/N2zk9yXjmLA ("Stepped architectural levels") | [Unsplash License](https://unsplash.com/license) |
| About page | `about-facade-*` | Paul Menz | https://unsplash.com/photos/DqV7R-iU4-I (concrete building, Stuttgart) | [Unsplash License](https://unsplash.com/license) |

The Unsplash License allows free commercial use without attribution. It does not allow selling unaltered copies or compiling the photos into a competing image service. Both photos were checked on 2026-10-14 as free Unsplash License images, not Unsplash+.

## How the renditions were made

`scripts/photos/process_photos.py` makes every file from the original downloads:

1. A gentle color grade: lower saturation, a cool shift toward the brand palette, and a slight contrast lift.
2. Art-directed crops: a 4:5 portrait for the desktop hero, a 4:3 band for mobile and tablet, and a portrait crop for About.
3. AVIF and WebP at three widths each, plus a single JPEG fallback.

To regenerate, download the originals from the links above at full size, save them as `hero.jpg` and `about.jpg` in one folder, and run:

```sh
python3 scripts/photos/process_photos.py <folder>
```

This requires Pillow, `cwebp` and `avifenc`.

`src/components/Photo.tsx` renders them with `<picture>`, explicit dimensions and `sizes`. The hero loads eagerly with `fetchpriority="high"`. Static export has no Next.js image optimizer, so these renditions take its place.
