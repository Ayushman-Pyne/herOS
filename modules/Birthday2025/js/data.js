/**
 * Celebration Data & Configuration
 */

const storyData = {
  recipientName: 'Debannita',
  senderName: 'Ayushman',
  birthdayDate: '3rd November',
  passcode: '3101',
  validUserId: 'they_boooo',
  heroQuote: 'Today is all about you and all the happiness you bring into my life every single day.',
  memories: [
    {
      id: 'mem-1',
      title: 'Our Smile',
      subtitle: 'Pure Happiness',
      imageSrc: './assets/polaroid-1.svg',
      fallbackSvg: './assets/polaroid-1.svg',
      date: 'First Date',
      story: 'The day we laughed until our stomachs hurt. I knew right then and there that your smile would forever be my favorite sight.',
      rotation: -3,
    },
    {
      id: 'mem-2',
      title: 'Our Favorite Moment',
      subtitle: 'Golden Hour Glow',
      imageSrc: './assets/polaroid-2.svg',
      fallbackSvg: './assets/polaroid-2.svg',
      date: 'Sunset Beach Walk',
      story: 'Watching the sky turn into shades of gold and pink while listening to the waves. The world disappeared, and it was just us.',
      rotation: 2,
    },
    {
      id: 'mem-3',
      title: 'Together Forever',
      subtitle: 'Mountain Adventure',
      imageSrc: './assets/polaroid-3.svg',
      fallbackSvg: './assets/polaroid-3.svg',
      date: 'Scenic Getaway',
      story: 'Standing at the peak overlooking the misty valleys, holding your hand. Every journey with you feels like an adventure.',
      rotation: -2,
    },
    {
      id: 'mem-4',
      title: 'My Happy Place',
      subtitle: 'Cozy Moments',
      imageSrc: './assets/polaroid-4.svg',
      fallbackSvg: './assets/polaroid-4.svg',
      date: 'Quiet Evening Coffee',
      story: 'No matter where we are or what we do, anywhere with you is where I feel most at home and completely at peace.',
      rotation: 3,
    },
  ],
  videoTitle: 'Our Special Video',
  videoSrc: './assets/special-video.mp4',
  videoPoster: './assets/video-cover.svg',
  videoDuration: '02:45',
  letterTitle: 'A Letter From Ayushman',
  letterSubtitle: 'Written with all my heart',
  letterSalutation: 'To the most amazing person in my life, Debannita,',
  letterBody: [
    'You make every day brighter just by being you.',
    'Thank you for your love, your kindness and for being my constant happiness.',
    'I am so lucky to have you in my life.',
    'I hope this birthday brings you as much joy as you bring into mine.',
  ],
  letterClosing: 'Forever yours, Ayushman',
  cakeMessage: 'Thank you for being my happiness, my love and my everything. Forever yours, Ayushman 💖',
  milestones: [
    {
      id: 'our-story',
      title: 'Our Story',
      content: 'From the very first day we crossed paths, my life took on vibrant new colors. Every moment spent with you is a cherished chapter.',
    },
    {
      id: 'our-love',
      title: 'Our Love',
      content: 'Gentle, fierce, steadfast, and deeply patient. A love that feels like warm sunlight on the coldest days.',
    },
    {
      id: 'forever-us',
      title: 'Forever Us',
      content: 'Through every twist, turn, milestone, and quiet morning, we face the future together as one unbreakable team.',
    },
    {
      id: 'always',
      title: 'Always',
      content: 'Today, tomorrow, and forever—I will choose you, celebrate you, and love you endlessly.',
    },
  ],
};

if (typeof window !== 'undefined') {
  window.storyData = storyData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { storyData };
}
