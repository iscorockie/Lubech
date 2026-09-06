# Textures

| File | Purpose |
| --- | --- |
| `earth-night-violet.webp` | 4096×2048 equirectangular colour map for `<Earth3D />` (Three.js globe behind the pinned Process timeline). |
| `earth-lights.webp` | Matching greyscale emissive map – city lights only – so the lights glow independently of the scene lighting. |

Source: NASA "Black Marble" night-lights composite as redistributed in the MIT-licensed
[`three-globe`](https://github.com/vasturiano/three-globe) examples (`example/img/earth-night.jpg`).
Both maps were derived offline with `sharp`: oceans → near-black violet, land → dark violet,
and the warm sodium-coloured city lights isolated into the emissive map, so the globe sits
inside the site's #7C3AED → #DB2777 palette instead of NASA's blue grading.

Textures are only requested on desktop (≥ 1024px, no reduced-motion) once the Process
section is within one viewport of the screen.
