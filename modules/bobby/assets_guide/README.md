# 📁 Bobby Gallery Media Replacement Guide & Naming Instructions

Welcome to the **Bobby Interactive Infinite Gallery** module (`modules/bobby/`)!
This guide details how to add, replace, and organize your photos, audio, and captions so everything loads with 100% reliability on any static host or GitHub Pages.

---

## 📂 Folder Structure

All assets for this gallery are located inside `modules/bobby/assets/`:

```text
modules/bobby/
├── index.html               # Main gallery page (clean URL)
├── bobbyindex.html          # Secondary alias for backwards-compatibility
├── css/
│   └── bobbystyles.css      # Editorial styling, typography & layout
├── js/
│   └── bobbyscript.js       # GSAP drag canvas, zoom inspector & sound engine
├── assets/
│   ├── images/              # 📸 All photo portraits displayed on the canvas
│   └── sounds/              # 🎵 Optional custom UI sound effect files
└── assets_guide/
    └── README.md            # 📖 This media guide
```

---

## 📸 1. Image Files & Naming Conventions

All canvas photos are stored in `modules/bobby/assets/images/`.

### Default Naming Convention:
Name your photos matching the index number:

| File Name | Fallback Alias | Description |
| :--- | :--- | :--- |
| `Bobby (1).jpg` | `Bobby (01).jpg` | Slide 01 ("Begin Before You’re Ready") |
| `Bobby (2).jpg` | `Bobby (02).jpg` | Slide 02 ("Negative Space, Positive Signal") |
| `Bobby (3).jpg` | `Bobby (03).jpg` | Slide 03 ("Friction Is a Teacher") |
| `Bobby (4).jpg` | `Bobby (04).jpg` | Slide 04 ("Golden Minute") |
| `Bobby (5).jpg` | `Bobby (05).jpg` | Slide 05 ("Shadow Carries Form") |
| `Bobby (6).jpg` | `Bobby (06).jpg` | Slide 06 ("City Breath") |
| `Bobby (7).jpg` | `Bobby (07).jpg` | Slide 07 ("Soft Focus, Sharp Intent") |
| `Bobby (8).jpg` | `Bobby (08).jpg` | Slide 08 ("Time-Tested, Future-Ready") |
| `Bobby (9).jpg` | `Bobby (09).jpg` | Slide 09 ("Grace Under Revision") |
| `Bobby (10).jpg` | `Bobby (10).jpg` | Slide 10 ("Style That Outlasts Seasons") |
| `Bobby (11).jpg` | `Bobby (11).jpg` | Slide 11 ("Edges and Experiments") |
| `Bobby (12).jpg` | `Bobby (12).jpg` | Slide 12 ("Portrait of Attention") |
| `Bobby (13).jpg` | `Bobby (13).jpg` | Slide 13 ("Light Speaks First") |
| `Bobby (14).jpg` | `Bobby (14).jpg` | Slide 14 ("Contemporary Is a Moving Target") |

> 💡 **Notice**: Both single-digit `Bobby (1).jpg` and padded `Bobby (01).jpg` are automatically supported!

### Recommended Image Specifications:
- **Aspect Ratio**: Vertical 3:4 or 4:5 portrait ratio (e.g., 900 × 1200 px, 1200 × 1600 px).
- **Format**: `.jpg`, `.jpeg`, `.png`, or `.webp`.
- **File Size**: 100 KB – 800 KB per photo is ideal. Optimized images guarantee buttery-smooth 60 FPS inertia dragging.

---

## ✍️ 2. Customizing Titles & Editorial Captions

When clicking on any photo to zoom in, a split-screen inspection view slides open with a title and paragraph.
You can change the text in `modules/bobby/js/bobbyscript.js` inside `this.imageData`:

```javascript
this.imageData = [
  {
    number: "01",
    title: "Your Custom Title",
    description: "Write your special note, memory, or story here."
  },
  {
    number: "02",
    title: "Golden Hour Glow",
    description: "Another memory description."
  }
  // Add more entries as needed
];
```

---

## 🔊 3. Sound Effects (Built-in Procedural Audio + Optional MP3s)

The gallery features an interactive sound wave visualizer in the bottom right corner (click it to toggle audio on/off).

### Built-in Web Audio Synthesizer:
You don't need to upload any audio files! The gallery includes a procedural Web Audio API synthesizer that plays:
- `click`: Crisp tactile click when choosing photos or menu options.
- `open` / `zoom-in`: Smooth rising frequency whoosh when entering split-screen mode.
- `close` / `zoom-out`: Soft falling frequency whoosh when returning to the grid.
- `drag-start` / `drag-end`: Gentle organic friction feedback when panning the canvas.

### Optional Custom Sound Files:
If you want to use real recorded sound effects, place them in `modules/bobby/assets/sounds/`:
- `click.mp3`
- `open.mp3`
- `close.mp3`
- `whoosh.mp3`
- `drag.mp3`

---

## 🛠️ 4. Adding More Photos to the Grid

To add more photos beyond the initial 14:
1. Place `Bobby (15).jpg`, `Bobby (16).jpg`, etc. in `modules/bobby/assets/images/`.
2. Open `modules/bobby/js/bobbyscript.js`.
3. In `initImageData()`, adjust the loop count:
   ```javascript
   for (let i = 1; i <= 20; i++) { // Change 14 to your total photo count
     this.fashionImages.push(`./assets/images/Bobby (${i}).jpg`);
   }
   ```
4. Add corresponding titles in `this.imageData` array.
5. Save the file and refresh!

---

## 🚀 5. How to Deploy to GitHub Pages

1. Push your repository to GitHub.
2. Go to **Repository Settings -> Pages**.
3. Choose the `main` branch and `/ (root)` folder.
4. Save! Your site will be live at `https://<username>.github.io/<repo>/modules/bobby/index.html`.
5. All animations (GSAP, Draggable, Flip, CustomEase) will run with zero external build requirements!
