"""
Grade, crop and encode the site photography.

Sources (Unsplash License, free for commercial use, see docs/image-credits.md):
  hero.jpg  - Anthony Esau, "Stepped architectural levels"
              https://unsplash.com/photos/N2zk9yXjmLA
  about.jpg - Paul Menz, concrete building, Stuttgart
              https://unsplash.com/photos/DqV7R-iU4-I

Usage:
  python3 scripts/photos/process_photos.py <dir with hero.jpg and about.jpg>
Writes AVIF/WebP/JPEG renditions to public/images/. Requires Pillow, avifenc and cwebp.
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageEnhance

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parents[2] / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)


def grade(im: Image.Image, sat: float, cool: float) -> Image.Image:
    """Quiet the saturation and pull warm tones toward a cool neutral."""
    im = ImageEnhance.Color(im.convert("RGB")).enhance(sat)
    r, g, b = im.split()
    r = r.point(lambda v: v * (1 - 0.06 * cool))
    g = g.point(lambda v: v * (1 - 0.015 * cool))
    b = b.point(lambda v: min(255, v * (1 + 0.03 * cool) + 2 * cool))
    im = Image.merge("RGB", (r, g, b))
    return ImageEnhance.Contrast(im).enhance(1.04)


def encode(im: Image.Image, name: str, widths: list[int], jpeg: int) -> None:
    """AVIF + WebP at every width; a single JPEG fallback at the `jpeg` width."""
    for w in widths:
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        base = OUT / f"{name}-{w}"
        tmp = OUT / f".{name}-{w}.png"
        r.save(tmp)
        subprocess.run(["cwebp", "-quiet", "-q", "78", tmp, "-o", f"{base}.webp"], check=True)
        subprocess.run(["avifenc", "-q", "58", "-s", "4", tmp, f"{base}.avif"], check=True, capture_output=True)
        tmp.unlink()
        if w == jpeg:
            r.save(f"{base}.jpg", quality=80, optimize=True, progressive=True)
        print(f"{base.name}: {w}x{h}")


hero = grade(Image.open(SRC / "hero.jpg"), sat=0.78, cool=1.0)  # 3200x2403
# Desktop: 4:5 portrait framed on the converging floors.
encode(hero.crop((760, 0, 760 + 1920, 2400)), "hero-desktop", [720, 1080, 1440], jpeg=1080)
# Mobile/tablet: the full 4:3 frame reads better as a wide band.
encode(hero.crop((0, 3, 3200, 2403)), "hero-wide", [800, 1200, 1800], jpeg=1200)

about = grade(Image.open(SRC / "about.jpg"), sat=0.85, cool=0.6)  # 3200x4267
# Portrait crop that drops most of the empty sky.
encode(about.crop((0, 600, 3200, about.height)), "about-facade", [640, 960, 1400], jpeg=960)
