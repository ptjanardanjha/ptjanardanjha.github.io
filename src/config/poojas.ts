export interface Pooja {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  duration: string;
  price: number;
  category: "prosperity" | "wellness" | "peace" | "relationship" | "career";
  featured?: boolean;
  image?: "";
  deity?: "";
  benefits?: [
      "Attracts wealth, fortune, and prosperity.",
      "Removes obstacles from personal and professional life.",
      "Brings success to new ventures and businesses.",
      "Creates a harmonious and positive home environment.",
    ],
  procedure?: [
      "Sankalpa (Vow to perform the pooja)",
      "Ganesha Avahan (Invocation of Lord Ganesha)",
      "Kalash Sthapana",
      "Lakshmi Avahan (Invocation of Goddess Lakshmi)",
      "Chanting of Mantras and Shlokas",
      "Pushpanjali (Flower offering)",
      "Aarti and Prasad distribution",
    ],
    samagri?: [
      "Idols of Lakshmi and Ganesha",
      "Flowers (Lotus, Marigold)",
      "Fruits and Sweets (Modak, Ladoo)",
      "Diya, Incense Sticks, Camphor",
      "Turmeric, Kumkum, Sandalwood Paste",
      "Kalash and Coconut",
    ],
    whenToPerform?: "Most auspicious on Fridays, Diwali, Dhanteras, and before starting a new business.",

  // image?: "";
  // deity
}

export const poojas: Pooja[] = [
  {
    id: "satyanarayan",
    name: "Satyanarayan Pooja",
    sanskritName: "श्री सत्यनारायण पूजा",
    description: "Sacred ritual dedicated to Lord Vishnu for prosperity and well-being",
    duration: "3-4 hours",
    price: 5100,
    category: "prosperity"
  },
  {
    id: "ganesh",
    name: "Ganesh Pooja",
    sanskritName: "श्री गणेश पूजा",
    description: "Worship of Lord Ganesha for removing obstacles",
    duration: "1-2 hours",
    price: 2100,
    category: "peace"
  },
  {
    id: "grih-pravesh",
    name: "Grih Pravesh",
    sanskritName: "गृह प्रवेश पूजा",
    description: "House warming ceremony for new homes",
    duration: "2-3 hours",
    price: 5100,
    category: "peace"
  },
  {
    id: "navagraha",
    name: "Navagraha Pooja",
    sanskritName: "नवग्रह पूजा",
    description: "Worship of the nine planets for celestial blessings",
    duration: "2-3 hours",
    price: 4100,
    category: "wellness"
  },
  {
    id: "rudrabhishek",
    name: "Rudrabhishek",
    sanskritName: "रुद्राभिषेक",
    description: "Powerful ritual dedicated to Lord Shiva",
    duration: "2-3 hours",
    price: 3100,
    category: "peace"
  },
  {
    id: "lakshmi",
    name: "Lakshmi Pooja",
    sanskritName: "लक्ष्मी पूजा",
    description: "Worship of Goddess Lakshmi for wealth and prosperity",
    duration: "1-2 hours",
    price: 2100,
    category: "prosperity"
  },
  {
    id: "pitru-paksha",
    name: "Pitru Paksha Shradh Puja",
    sanskritName: "पितृ पक्ष श्राद्ध पूजा",
    description: "Sacred ritual to honor and pay homage to your ancestors during Pitru Paksha",
    duration: "2-3 hours",
    price: 5100,
    category: "peace",
    featured: true
  }
];