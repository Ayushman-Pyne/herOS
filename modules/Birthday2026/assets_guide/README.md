# 📁 Assets Replacement Guide & File Naming Instructions

Welcome to your romantic birthday celebration website! This guide explains all the media files used in the website and how you can replace them with your own real photos, videos, and music.

---

## 📂 Folder Location
All media files are stored in the `/public/assets/` folder:

```text
/public/assets/
├── polaroid-1.jpg       (Photo 1: "Our Smile")
├── polaroid-2.jpg       (Photo 2: "Our Favorite Moment")
├── polaroid-3.jpg       (Photo 3: "Together Forever")
├── polaroid-4.jpg       (Photo 4: "My Happy Place")
├── video-cover.jpg      (Poster thumbnail for the Special Video)
├── special-video.mp4    (Optional real MP4 video file)
├── birthday-cake.png    (Optional custom 3D cake image)
└── background-music.mp3 (Optional romantic audio track)
```

> 💡 **Quick In-App Customizer**: You don't even have to replace files manually! You can click the **✨ Customize & Replace Assets** button in the app to upload your photos, change names ("Debannita" & "Ayushman"), change dates, and write your own love letter directly in the browser!

---

## 📸 1. Polaroid Memory Photos (Screen 3)

The website displays 4 realistic Polaroid photo cards with handwritten captions.

| File Name | Display Caption | Recommended Aspect Ratio | Recommended Resolution | Description |
| :--- | :--- | :--- | :--- | :--- |
| `polaroid-1.jpg` | **"Our Smile"** | 1:1 (Square) or 4:3 | 800 × 800 px (or 800 × 1000 px) | Your favorite laughing/smiling photo together |
| `polaroid-2.jpg` | **"Our Favorite Moment"** | 1:1 or 4:3 | 800 × 800 px (or 800 × 1000 px) | Golden hour, date night, or anniversary memory |
| `polaroid-3.jpg` | **"Together Forever"** | 1:1 or 4:3 | 800 × 800 px (or 800 × 1000 px) | Travel trip, vacation, scenic mountains or beach |
| `polaroid-4.jpg` | **"My Happy Place"** | 1:1 or 4:3 | 800 × 800 px (or 800 × 1000 px) | Sweet candid moment, cafe date, or warm hug |

### File Format Tips:
- Supported formats: `.jpg`, `.jpeg`, `.png`, or `.webp`.
- Keep file sizes under 2 MB for instant, smooth transitions.
- If using `.png`, simply rename it to `.jpg` or place both!

---

## 🎬 2. Special Romantic Video (Screen 4)

Screen 4 features a luxury cinematic video player with ruby glowing accents and custom playback controls.

| File Name | Purpose | Recommended Specs | Description |
| :--- | :--- | :--- | :--- |
| `video-cover.jpg` | Video thumbnail poster | 16:9 widescreen (1280 × 720 px) | A romantic sunset silhouette or clip frame |
| `special-video.mp4` | Main video playback | 1080p / 720p H.264 MP4 | A montage clip, video message, or slideshow |

### If you don't have an MP4 file ready:
- The website automatically includes a high-definition romantic twilight video simulation and animated canvas mode!
- You can also paste an MP4 URL or YouTube embed in the in-app customizer.

---

## 🎵 3. Background Music (Screen 2 & Audio Toggle)

Screen 2 and all subsequent screens feature ambient romantic audio.

| File Name | Purpose | Recommended Format |
| :--- | :--- | :--- |
| `background-music.mp3` | Soft background melody | MP3 format (stereo, 128-192 kbps) |

### Built-in Audio Fallback:
- Even if no `.mp3` is uploaded, the site includes an **interactive romantic Web Audio synthesizer** that plays soothing soft ambient lullaby chords in real-time with zero lag!

---

## 🎂 4. Grand Celebration Cake (Screen 6)

| File Name | Purpose | Format | Description |
| :--- | :--- | :--- | :--- |
| `birthday-cake.png` | 3D layered birthday cake | PNG with transparent background | Multi-tier chocolate berry cake with candle |

- The website includes a built-in interactive SVG & Canvas cake with a realistic glowing candle flame that can be clicked to blow out, triggering high-end confetti and fireworks!

---

## 🚀 How to Replace the Files

1. Prepare your photos and name them exactly as shown above (`polaroid-1.jpg`, `polaroid-2.jpg`, etc.).
2. Copy them into the `/public/assets/` folder in your project directory.
3. Refresh the website preview!
4. Alternatively, open the website, click **"✨ Customize & Replace Assets"** in the top navigation or drawer, and choose your files directly to test them live!
