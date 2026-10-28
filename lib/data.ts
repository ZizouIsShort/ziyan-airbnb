import tourJson from "./tourData.json";
import amenityGroupsJson from "./amenityGroups.json";

export type TourGroup = { cols: number; imgs: { src: string; alt: string }[] };
export type TourRoom = { name: string; amenities: string; groups: TourGroup[] };
export type TourCategory = { label: string; thumb: string };

export type IconKey =
  | "kitchen"
  | "wifi"
  | "workspace"
  | "parking"
  | "pool"
  | "hotTub"
  | "pets"
  | "camera"
  | "coAlarm"
  | "smokeAlarm";

export const tour = tourJson as { cats: TourCategory[]; rooms: TourRoom[] };

export const allPhotos = tour.rooms.flatMap((room) =>
  room.groups.flatMap((group) =>
    group.imgs.map((img) => ({ ...img, room: room.name })),
  ),
);

export const listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  details: "3 guests · 1 bedroom · 1 bed · 1 bathroom",
  location: "Candolim, Goa, India",
  price: "₹28,499",
  nights: 5,
  checkIn: "18 Oct 2026",
  checkOut: "23 Oct 2026",
  checkInShort: "10/18/2026",
  checkOutShort: "10/23/2026",
  guests: 2,
  rating: "4.95",
  reviewCount: 19,
  hostName: "Mirashya Homes",
  hostSince: "2 years hosting",
};

export const heroImages = [
  "/assets/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg",
  "/assets/images/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg",
  "/assets/images/9be71047-fc52-438a-9270-75cb470f6752.jpeg",
  "/assets/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg",
  "/assets/images/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg",
];

export const highlights = [
  {
    icon: "outdoor" as const,
    title: "Outdoor entertainment",
    text: "The pool and alfresco dining are great for summer trips.",
  },
  {
    icon: "cool" as const,
    title: "Designed for staying cool",
    text: "Beat the heat with the A/C and ceiling fan.",
  },
  {
    icon: "checkin" as const,
    title: "Self check-in",
    text: "You can check in with the building staff.",
  },
];

export const description =
  "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴";

export const sleepRooms = [
  {
    image: "/assets/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg",
    title: "Bedroom",
    detail: "1 double bed",
  },
  {
    image: "/assets/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg",
    title: "Living room",
    detail: "1 sofa",
  },
];

export const previewAmenities = [
  { icon: "kitchen" as IconKey, label: "Kitchen" },
  { icon: "wifi" as IconKey, label: "Wifi" },
  { icon: "workspace" as IconKey, label: "Dedicated workspace" },
  { icon: "parking" as IconKey, label: "Free parking on premises" },
  { icon: "pool" as IconKey, label: "Pool" },
  { icon: "hotTub" as IconKey, label: "Hot tub" },
  { icon: "pets" as IconKey, label: "Pets allowed" },
  { icon: "camera" as IconKey, label: "Exterior security cameras on property" },
  { icon: "coAlarm" as IconKey, label: "Carbon monoxide alarm", unavailable: true },
  { icon: "smokeAlarm" as IconKey, label: "Smoke alarm", unavailable: true },
];

export const amenityGroups = amenityGroupsJson as {
  title: string;
  items: string[];
}[];

export const ratingBars = [
  { label: "5", value: 95 },
  { label: "4", value: 5 },
  { label: "3", value: 0 },
  { label: "2", value: 0 },
  { label: "1", value: 0 },
];

export const ratingCategories = [
  { label: "Cleanliness", score: "5.0", icon: "cleanliness" as const },
  { label: "Accuracy", score: "5.0", icon: "accuracy" as const },
  { label: "Check-in", score: "5.0", icon: "checkinRating" as const },
  { label: "Communication", score: "5.0", icon: "communication" as const },
  { label: "Location", score: "4.8", icon: "location" as const },
  { label: "Value", score: "4.8", icon: "value" as const },
];

export const reviewChips = [
  { label: "Comfort", count: 6, image: "/assets/images/chips/comfort.png" },
  { label: "Accuracy", count: 5, image: "/assets/images/chips/accuracy.png" },
  { label: "Hot tub", count: 5, image: "/assets/images/chips/hot-tub.png" },
  { label: "Condition", count: 4, image: "/assets/images/chips/condition.png" },
  { label: "Hospitality", count: 8, image: "/assets/images/chips/hospitality.png" },
  { label: "Cleanliness", count: 4, image: "/assets/images/chips/cleanliness.png" },
  { label: "Amenities", count: 2, image: "/assets/images/chips/amenities.png" },
  { label: "Decor", count: 2, image: "/assets/images/chips/decor.png" },
  { label: "Indoor spaces", count: 2, image: "/assets/images/chips/indoor-spaces.png" },
  { label: "Location", count: 2, image: "/assets/images/chips/location.png" },
];

export type Review = {
  name: string;
  meta: string;
  date: string;
  text: string;
  avatar?: string;
  initial?: string;
  initialBg?: string;
  initialColor?: string;
  clamp?: boolean;
};

export const reviews: Review[] = [
  {
    name: "Amit",
    meta: "2 months on Airbnb",
    date: "1 week ago",
    text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    initial: "A",
    initialBg: "rgb(247, 237, 226)",
    initialColor: "rgb(193, 133, 42)",
  },
  {
    name: "Aheesh",
    meta: "3 years on Airbnb",
    date: "2 weeks ago",
    text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    avatar: "/assets/images/avatars/rev1.jpeg",
    clamp: true,
  },
  {
    name: "Samiksha",
    meta: "8 months on Airbnb",
    date: "May 2026",
    text: "the host nitish was really great help",
    avatar: "/assets/images/avatars/rev2.jpeg",
  },
  {
    name: "Vedant",
    meta: "4 years on Airbnb",
    date: "May 2026",
    text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.\nThe highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.\nThe property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!",
    initial: "V",
    initialBg: "rgb(239, 234, 247)",
    initialColor: "rgb(139, 111, 196)",
    clamp: true,
  },
  {
    name: "Vaibhav S",
    meta: "3 years on Airbnb",
    date: "May 2026",
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    avatar: "/assets/images/avatars/rev3.jpeg",
  },
  {
    name: "Mohd",
    meta: "5 years on Airbnb",
    date: "May 2026",
    text: "Great place. Exactly as described in the listing.",
    avatar: "/assets/images/avatars/rev4.jpeg",
  },
];

export const cohosts = [
  { name: "Sharath", avatar: "/assets/images/avatars/co1.jpg" },
  { name: "Aman Dev Pahwa", avatar: "/assets/images/avatars/co2.jpg" },
  { name: "Maria Karen Priyanka", avatar: "/assets/images/avatars/co3.jpg" },
  { name: "Simran", avatar: "/assets/images/avatars/rev5.jpeg" },
  { name: "Pallavi", avatar: "/assets/images/avatars/rev1.jpeg" },
  { name: "Sanyukta", avatar: "/assets/images/avatars/rev2.jpeg" },
  { name: "Shruti", initial: "S", bg: "rgb(253, 231, 239)", color: "rgb(212, 53, 110)" },
  { name: "Amisha", initial: "A", bg: "rgb(231, 240, 253)", color: "rgb(58, 110, 204)" },
];

export const hostFacts = [
  { icon: "birthday" as const, text: "Born in the 80s" },
  { icon: "school" as const, text: "Where I went to school: NICMAR GOA" },
];

export const similarStays = [
  { image: "/assets/images/similar/s1.jpeg", title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: "4.91" },
  { image: "/assets/images/similar/s2.jpeg", title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: "4.95" },
  { image: "/assets/images/similar/s3.jpeg", title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: "4.94" },
  { image: "/assets/images/similar/s4.jpeg", title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: "4.96" },
  { image: "/assets/images/similar/s5.jpeg", title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: "4.95" },
  { image: "/assets/images/similar/s6.jpeg", title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool", price: "₹45,648", rating: "5.0" },
  { image: "/assets/images/similar/s2.jpeg", title: "Luxury Apt | Private Pool | 6 Mins from Beach", price: "₹48,786", rating: "4.93" },
  { image: "/assets/images/similar/s4.jpeg", title: "Serendipity Cottage - Calm Stay in Calangute-Baga.", price: "₹22,824", rating: "4.92" },
];

export const thingsToKnow = [
  {
    icon: "cancel" as const,
    title: "Cancellation policy",
    lines: [
      "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
      "Review this host’s full policy for details.",
    ],
  },
  {
    icon: "checkinRating" as const,
    title: "House rules",
    lines: ["Check-in after 2:00\u2009pm", "Checkout before 11:00\u2009am", "3 guests maximum"],
  },
  {
    icon: "shield" as const,
    title: "Safety & property",
    lines: [
      "Carbon monoxide alarm not reported",
      "Smoke alarm not reported",
      "Exterior security cameras on property",
    ],
  },
];
