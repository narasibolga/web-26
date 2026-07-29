import {
  BeachIcon,
  GiftIcon,
  Hotel01Icon,
  LandmarkIcon,
  MountainIcon,
  PaintBoardIcon,
  RestaurantIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { Dimension } from "@/lib/pathfinder/types";

export const BAY_CENTER = { lat: 1.7431, lng: 98.7833 };

function toDMS(value: number, isLat: boolean): string {
  const dir = isLat ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = Math.floor((abs - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}′${dir}`;
}

export function formatCoord(lat: number, lng: number): string {
  return `${toDMS(lat, true)} ${toDMS(lng, false)}`;
}

export type LocationCategory =
  | "bahari"
  | "tematik"
  | "alam-panorama"
  | "sejarah-rekreasi"
  | "akomodasi"
  | "kuliner"
  | "oleh-oleh";

export const categoryColor: Record<LocationCategory, string> = {
  bahari: "oklch(0.58 0.14 220)",
  tematik: "oklch(0.6 0.16 335)",
  "alam-panorama": "oklch(0.52 0.1 140)",
  "sejarah-rekreasi": "oklch(0.58 0.09 60)",
  akomodasi: "oklch(0.55 0.13 285)",
  kuliner: "oklch(0.62 0.16 35)",
  "oleh-oleh": "oklch(0.66 0.12 85)",
};

export const categoryIcon: Record<LocationCategory, IconSvgElement> = {
  bahari: BeachIcon,
  tematik: PaintBoardIcon,
  "alam-panorama": MountainIcon,
  "sejarah-rekreasi": LandmarkIcon,
  akomodasi: Hotel01Icon,
  kuliner: RestaurantIcon,
  "oleh-oleh": GiftIcon,
};

export const categoryOrder: LocationCategory[] = [
  "bahari",
  "tematik",
  "alam-panorama",
  "sejarah-rekreasi",
  "akomodasi",
  "kuliner",
  "oleh-oleh",
];

export type LocalizedText = { en: string; id: string };

export type VisitInformation = {
  admission?: LocalizedText;
  openingHours?: LocalizedText;
  bestTime?: LocalizedText;
  visitDuration?: LocalizedText;
  checkIn?: LocalizedText;
  checkOut?: LocalizedText;
  contact?: string;
  suitableFor?: LocalizedText;
  menu?: LocalizedText;
  flavor?: LocalizedText;
  featuredProduct?: LocalizedText;
  products?: LocalizedText;
  advantages?: LocalizedText;
};

export type Location = {
  id: string;
  name: LocalizedText;
  category: LocationCategory;
  lat: number;
  lng: number;
  images: string[];
  description: LocalizedText;
  address?: string;
  visitInfo?: VisitInformation;
  activities?: LocalizedText[];
  facilities?: LocalizedText[];
  notes?: LocalizedText[];
};

// Coordinates audited against named map features and published field coordinates.
export const locations: Location[] = [
  {
    id: "tangga-seratus",
    name: { en: "Tangga Seratus", id: "Tangga Seratus" },
    category: "sejarah-rekreasi",
    lat: 1.7445,
    lng: 98.7778,
    images: [
      "/images/map/tangga-seratus/1.webp",
      "/images/map/tangga-seratus/2.webp",
    ],
    description: {
      en: "Siap cardio tipis-tipis? Di sini kamu bakal nemuin 298 anak tangga yang penuh cerita sejarah. Sampai di atas, bonusnya view laut yang cakep plus ada gua peninggalan Jepang dan bangunan tua bekas perusahaan air minum Belanda. Capeknya worth it!",
      id: "Siap cardio tipis-tipis? Di sini kamu bakal nemuin 298 anak tangga yang penuh cerita sejarah. Sampai di atas, bonusnya view laut yang cakep plus ada gua peninggalan Jepang dan bangunan tua bekas perusahaan air minum Belanda. Capeknya worth it!",
    },
  },
  {
    id: "pantai-ujung-sibolga",
    name: {
      en: "Pantai Ujung Sibolga (Pajus)",
      id: "Pantai Ujung Sibolga (Pajus)",
    },
    category: "bahari",
    lat: 1.7431585,
    lng: 98.7734728,
    images: [
      "/images/map/pantai-ujung-sibolga/1.webp",
      "/images/map/pantai-ujung-sibolga/2.webp",
    ],
    description: {
      en: "Kalau lagi pengen healing tanpa ribet, Pantai Pajus jawabannya. Pasirnya lembut, ombaknya santai, cocok buat main air atau duduk-duduk sambil nunggu sunset yang cantiknya nggak pernah gagal.",
      id: "Kalau lagi pengen healing tanpa ribet, Pantai Pajus jawabannya. Pasirnya lembut, ombaknya santai, cocok buat main air atau duduk-duduk sambil nunggu sunset yang cantiknya nggak pernah gagal.",
    },
  },
  {
    id: "pantai-pelabuhan-lama",
    name: { en: "Pantai Pelabuhan Lama", id: "Pantai Pelabuhan Lama" },
    category: "sejarah-rekreasi",
    lat: 1.7407041,
    lng: 98.7741551,
    images: [
      "/images/map/pantai-pelabuhan-lama/1.webp",
      "/images/map/pantai-pelabuhan-lama/2.webp",
      "/images/map/pantai-pelabuhan-lama/3.webp",
    ],
    address:
      "Jl. Com. Yos Sudarso, Kota Beringin, Sibolga Kota, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Sibolga's former port has become a waterfront recreation area overlooking Tapian Nauli Bay. Its promenade, historic setting, sunset views, and nearby food stalls make it an easy stop in the city center.",
      id: "Bekas pelabuhan Kota Sibolga ini telah menjadi kawasan rekreasi tepi laut yang menghadap Teluk Tapian Nauli. Jalur pejalan kaki, suasana bersejarah, pemandangan matahari terbenam, dan kuliner di sekitarnya menjadikannya tempat singgah yang mudah dijangkau dari pusat kota.",
    },
    visitInfo: {
      admission: { en: "Free*", id: "Gratis*" },
      bestTime: { en: "Late afternoon, 5–7 PM", id: "Sore, 17.00–19.00 WIB" },
      visitDuration: { en: "About 1–2 hours", id: "Sekitar 1–2 jam" },
    },
    activities: [
      {
        en: "Enjoy the panorama of Tapian Nauli Bay",
        id: "Menikmati panorama Teluk Tapian Nauli",
      },
      { en: "Walk along the waterfront", id: "Berjalan di kawasan tepi laut" },
      { en: "Take photographs", id: "Berfoto" },
      { en: "Watch the sunset", id: "Menikmati matahari terbenam" },
      { en: "Explore nearby food stalls", id: "Menikmati kuliner sekitar" },
    ],
    facilities: [
      { en: "Parking", id: "Area parkir" },
      { en: "Seating", id: "Tempat duduk" },
      { en: "Pedestrian area", id: "Area pejalan kaki" },
      { en: "Food stalls", id: "Warung kuliner" },
      { en: "Public toilet", id: "Toilet umum" },
    ],
    notes: [
      {
        en: "Parking arrangements may vary by area.",
        id: "Pengaturan parkir dapat berbeda di setiap area.",
      },
    ],
  },
  {
    id: "pulau-poncan",
    name: { en: "Pulau Poncan", id: "Pulau Poncan" },
    category: "bahari",
    lat: 1.710590627,
    lng: 98.764286518,
    images: [
      "/images/map/pulau-poncan/1.webp",
      "/images/map/pulau-poncan/2.webp",
    ],
    description: {
      en: "Pulau Poncan is a small island destination off Sibolga with clear water, beaches, and a relaxed marine atmosphere. Visitors commonly arrive by boat for swimming, snorkeling, fishing, and a day away from the city.",
      id: "Pulau Poncan merupakan destinasi pulau kecil di lepas pantai Sibolga dengan air jernih, pantai, dan suasana bahari yang tenang. Pengunjung umumnya datang dengan perahu untuk berenang, snorkeling, memancing, dan menikmati waktu jauh dari keramaian kota.",
    },
    address: "Kota Sibolga, Sumatra Utara",
    visitInfo: {
      bestTime: {
        en: "Morning to midday",
        id: "Pagi hingga siang hari",
      },
      visitDuration: { en: "About 3–5 hours", id: "Sekitar 3–5 jam" },
    },
    activities: [
      { en: "Swim", id: "Berenang" },
      { en: "Snorkel or dive", id: "Snorkeling atau menyelam" },
      { en: "Fish", id: "Memancing" },
      { en: "Take photographs", id: "Berfoto" },
      {
        en: "Travel around the island by boat",
        id: "Berperahu di sekitar pulau",
      },
    ],
    facilities: [
      { en: "Accommodation", id: "Penginapan" },
      { en: "Ferry and boat access", id: "Akses feri dan perahu" },
      { en: "Beach area", id: "Area pantai" },
    ],
  },
  {
    id: "bukit-panomboman",
    name: { en: "Bukit Panomboman", id: "Bukit Panomboman" },
    category: "alam-panorama",
    lat: 1.7571859,
    lng: 98.7717777,
    images: [
      "/images/map/bukit-panomboman/1.webp",
      "/images/map/bukit-panomboman/2.webp",
      "/images/map/bukit-panomboman/3.webp",
      "/images/map/bukit-panomboman/4.webp",
    ],
    address: "Mela I, Tapian Nauli, Kabupaten Tapanuli Tengah, Sumatra Utara",
    description: {
      en: "Bukit Panomboman is a hillside viewpoint with broad views over Sibolga, Tapian Nauli Bay, and the surrounding coastline. The cafés and seating areas make it especially popular near sunset.",
      id: "Bukit Panomboman merupakan titik pandang di perbukitan dengan panorama luas Kota Sibolga, Teluk Tapian Nauli, dan garis pantai di sekitarnya. Kafe dan area duduk membuat tempat ini ramai dikunjungi menjelang matahari terbenam.",
    },
    visitInfo: {
      openingHours: {
        en: "Open to the public*",
        id: "Terbuka untuk umum*",
      },
      bestTime: { en: "Late afternoon, 5–7 PM", id: "Sore, 17.00–19.00 WIB" },
      visitDuration: { en: "About 1–2 hours", id: "Sekitar 1–2 jam" },
    },
    activities: [
      {
        en: "View the city and bay panorama",
        id: "Menikmati panorama kota dan teluk",
      },
      { en: "Watch the sunset", id: "Menikmati matahari terbenam" },
      { en: "Visit a café", id: "Bersantai di kafe" },
      { en: "Take photographs", id: "Berfoto" },
    ],
    facilities: [
      { en: "Parking", id: "Area parkir" },
      { en: "Cafés", id: "Kafe" },
      { en: "Seating", id: "Tempat duduk" },
      { en: "Relaxation area", id: "Area bersantai" },
    ],
    notes: [
      {
        en: "Access and operating times follow the management of the venue or café.",
        id: "Akses dan waktu operasional mengikuti pengelola tempat atau kafe.",
      },
    ],
  },
  {
    id: "pantai-pandaratan-pondok-batu",
    name: {
      en: "Pantai Pandaratan Pondok Batu",
      id: "Pantai Pandaratan Pondok Batu",
    },
    category: "bahari",
    lat: 1.7197222,
    lng: 98.7836111,
    images: [
      "/images/map/pantai-pandaratan-pondok-batu/1.webp",
      "/images/map/pantai-pandaratan-pondok-batu/2.webp",
    ],
    description: {
      en: "Hidden gem yang masih alami banget. Pasir putih, air laut super jernih, dan kalau lagi beruntung kamu bisa lihat banyak bintang laut di sekitar pantai. Rasanya kayak nemu private beach.",
      id: "Hidden gem yang masih alami banget. Pasir putih, air laut super jernih, dan kalau lagi beruntung kamu bisa lihat banyak bintang laut di sekitar pantai. Rasanya kayak nemu private beach.",
    },
  },
  {
    id: "benteng-jepang-bukit-ketapang",
    name: {
      en: "Benteng Jepang (Bukit Ketapang)",
      id: "Benteng Jepang (Bukit Ketapang)",
    },
    category: "sejarah-rekreasi",
    lat: 1.748,
    lng: 98.772,
    images: [
      "/images/map/benteng-jepang-bukit-ketapang/1.webp",
      "/images/map/benteng-jepang-bukit-ketapang/2.webp",
    ],
    description: {
      en: "Buat yang suka wisata sejarah, wajib mampir. Ada enam benteng peninggalan Jepang dengan bonus panorama Kota Sibolga dan Teluk Tapian Nauli dari ketinggian. Sunset-nya juga juara!",
      id: "Buat yang suka wisata sejarah, wajib mampir. Ada enam benteng peninggalan Jepang dengan bonus panorama Kota Sibolga dan Teluk Tapian Nauli dari ketinggian. Sunset-nya juga juara!",
    },
  },
  {
    id: "batu-lubang-sibolga",
    name: { en: "Batu Lubang Sibolga", id: "Batu Lubang Sibolga" },
    category: "sejarah-rekreasi",
    lat: 1.7655116,
    lng: 98.7971256,
    images: [
      "/images/map/batu-lubang-sibolga/1.webp",
      "/images/map/batu-lubang-sibolga/2.webp",
    ],
    description: {
      en: "Terowongan peninggalan zaman Belanda yang punya cerita panjang. Di sampingnya ada air terjun kecil yang bikin suasananya makin unik. Agak misterius, tapi justru itu yang bikin penasaran.",
      id: "Terowongan peninggalan zaman Belanda yang punya cerita panjang. Di sampingnya ada air terjun kecil yang bikin suasananya makin unik. Agak misterius, tapi justru itu yang bikin penasaran.",
    },
  },
  {
    id: "air-terjun-sihobuk",
    name: { en: "Air Terjun Sihobuk", id: "Air Terjun Sihobuk" },
    category: "alam-panorama",
    lat: 1.7301132,
    lng: 98.8262,
    images: [
      "/images/map/air-terjun-sihobuk/1.webp",
      "/images/map/air-terjun-sihobuk/2.webp",
    ],
    description: {
      en: "Air terjun setinggi sekitar 12–17 meter dengan kolam alami yang nyaman buat main air. Cocok buat quality time bareng keluarga karena anak-anak juga bisa berenang di sini.",
      id: "Air terjun setinggi sekitar 12–17 meter dengan kolam alami yang nyaman buat main air. Cocok buat quality time bareng keluarga karena anak-anak juga bisa berenang di sini.",
    },
  },
  {
    id: "bukit-tor-simarbarimbing",
    name: { en: "Bukit Tor Simarbarimbing", id: "Bukit Tor Simarbarimbing" },
    category: "alam-panorama",
    lat: 1.752,
    lng: 98.785,
    images: [
      "/images/map/bukit-tor-simarbarimbing/1.webp",
      "/images/map/bukit-tor-simarbarimbing/2.webp",
    ],
    description: {
      en: "Perjalanan ke bukit ini bakal lewat perkampungan suku Nias yang khas. Sampai di puncak, kamu disambut view Sibolga dari ketinggian yang bikin perjalanan terasa worth it.",
      id: "Perjalanan ke bukit ini bakal lewat perkampungan suku Nias yang khas. Sampai di puncak, kamu disambut view Sibolga dari ketinggian yang bikin perjalanan terasa worth it.",
    },
  },
  {
    id: "pantai-kalangan-indah",
    name: { en: "Pantai Kalangan Indah", id: "Pantai Kalangan Indah" },
    category: "bahari",
    lat: 1.6672222,
    lng: 98.8280556,
    images: [
      "/images/map/pantai-kalangan-indah/1.webp",
      "/images/map/pantai-kalangan-indah/2.webp",
    ],
    description: {
      en: "Pantai dengan pasir putih dan ombak yang tenang karena berada di kawasan teluk. Aman buat anak-anak main air, tapi tetap seru buat kamu yang cuma pengen rebahan sambil nikmatin angin pantai.",
      id: "Pantai dengan pasir putih dan ombak yang tenang karena berada di kawasan teluk. Aman buat anak-anak main air, tapi tetap seru buat kamu yang cuma pengen rebahan sambil nikmatin angin pantai.",
    },
  },
  {
    id: "pasir-putih-pandaratan",
    name: { en: "Pasir Putih Pandaratan", id: "Pasir Putih Pandaratan" },
    category: "bahari",
    lat: 1.7197222,
    lng: 98.7836111,
    images: [
      "/images/map/pasir-putih-pandaratan/1.webp",
      "/images/map/pasir-putih-pandaratan/2.webp",
    ],
    description: {
      en: "Masih satu kawasan dengan Pondok Batu, tapi punya hamparan pasir putih yang luas dan suasana yang lebih sepi. Cocok buat yang cari tempat healing tanpa keramaian.",
      id: "Masih satu kawasan dengan Pondok Batu, tapi punya hamparan pasir putih yang luas dan suasana yang lebih sepi. Cocok buat yang cari tempat healing tanpa keramaian.",
    },
  },
  {
    id: "pulo-bangke",
    name: { en: "Pulo Bangke", id: "Pulo Bangke" },
    category: "bahari",
    lat: 1.73,
    lng: 98.76,
    images: [
      "/images/map/pulo-bangke/1.webp",
      "/images/map/pulo-bangke/2.webp",
    ],
    description: {
      en: "Pulau kecil yang keindahannya masih alami banget. Tips : datang pas air laut surut supaya bisa lebih puas menjelajah. Timing is everything!",
      id: "Pulau kecil yang keindahannya masih alami banget. Tips : datang pas air laut surut supaya bisa lebih puas menjelajah. Timing is everything!",
    },
  },
  {
    id: "air-terjun-labuhan-sonang",
    name: { en: "Air Terjun Labuhan Sonang", id: "Air Terjun Labuhan Sonang" },
    category: "alam-panorama",
    lat: 1.7,
    lng: 98.76,
    images: [
      "/images/map/air-terjun-labuhan-sonang/1.webp",
      "/images/map/air-terjun-labuhan-sonang/2.webp",
    ],
    description: {
      en: "Meski sebagian aliran airnya dimanfaatkan sebagai sumber air bersih, kawasan ini tetap punya pesona alam yang bikin betah. Perpaduan air terjun, pantai, dan perbukitan dalam satu tempat.",
      id: "Meski sebagian aliran airnya dimanfaatkan sebagai sumber air bersih, kawasan ini tetap punya pesona alam yang bikin betah. Perpaduan air terjun, pantai, dan perbukitan dalam satu tempat.",
    },
  },
  {
    id: "puncak-gm-panggabean",
    name: { en: "Puncak GM Panggabean", id: "Puncak GM Panggabean" },
    category: "sejarah-rekreasi",
    lat: 1.745,
    lng: 98.79,
    images: [
      "/images/map/puncak-gm-panggabean/1.webp",
      "/images/map/puncak-gm-panggabean/2.webp",
    ],
    description: {
      en: "Nggak cuma menawarkan panorama Kota Sibolga dari atas, di sini juga ada monumen perjuangan dengan tujuh patung pejuang. Jalan-jalan sambil nambah insight sejarah? Why not.",
      id: "Nggak cuma menawarkan panorama Kota Sibolga dari atas, di sini juga ada monumen perjuangan dengan tujuh patung pejuang. Jalan-jalan sambil nambah insight sejarah? Why not.",
    },
  },
  {
    id: "pulau-kalimantung-na-menek",
    name: {
      en: "Pulau Kalimantung Na Menek",
      id: "Pulau Kalimantung Na Menek",
    },
    category: "bahari",
    lat: 1.5615309,
    lng: 98.5764404,
    images: [
      "/images/map/pulau-kalimantung-na-menek/1.webp",
      "/images/map/pulau-kalimantung-na-menek/2.webp",
      "/images/map/pulau-kalimantung-na-menek/3.webp",
      "/images/map/pulau-kalimantung-na-menek/4.webp",
    ],
    address: "Kecamatan Tapian Nauli, Kabupaten Tapanuli Tengah, Sumatra Utara",
    description: {
      en: "Pulau Kalimantung Na Menek is a small island with white sand, clear water, and a quiet tropical setting. It is commonly visited by boat as part of a marine trip around the Mursala island group.",
      id: "Pulau Kalimantung Na Menek merupakan pulau kecil dengan pasir putih, air jernih, dan suasana tropis yang tenang. Pulau ini umumnya dikunjungi dengan perahu sebagai bagian dari perjalanan bahari di gugusan Kepulauan Mursala.",
    },
    visitInfo: {
      bestTime: {
        en: "Morning to midday",
        id: "Pagi hingga siang hari",
      },
      visitDuration: { en: "About 3–5 hours", id: "Sekitar 3–5 jam" },
    },
    activities: [
      { en: "Enjoy the island panorama", id: "Menikmati panorama pulau" },
      { en: "Swim", id: "Berenang" },
      { en: "Snorkel", id: "Snorkeling" },
      { en: "Take photographs", id: "Berfoto" },
      { en: "Relax on the beach", id: "Bersantai di pantai" },
    ],
    facilities: [
      { en: "Tour boats", id: "Perahu wisata" },
      { en: "Boat landing area", id: "Area sandar perahu" },
      {
        en: "Life jackets, depending on the operator",
        id: "Pelampung, tergantung operator",
      },
    ],
  },
  {
    id: "air-terjun-mursala",
    name: { en: "Air Terjun Mursala", id: "Air Terjun Mursala" },
    category: "alam-panorama",
    lat: 1.6366,
    lng: 98.5107,
    images: [
      "/images/map/air-terjun-mursala/1.webp",
      "/images/map/air-terjun-mursala/2.webp",
    ],
    description: {
      en: "Ini salah satu ikon wisata Tapteng. Air terjunnya langsung jatuh ke laut dari tebing pulau—unik banget dan langka di Indonesia. Fun fact : pernah jadi lokasi syuting film King Kong (2005)!",
      id: "Ini salah satu ikon wisata Tapteng. Air terjunnya langsung jatuh ke laut dari tebing pulau—unik banget dan langka di Indonesia. Fun fact : pernah jadi lokasi syuting film King Kong (2005)!",
    },
  },
  {
    id: "pulau-badalu",
    name: { en: "Pulau Badalu", id: "Pulau Badalu" },
    category: "bahari",
    lat: 1.62,
    lng: 98.52,
    images: [
      "/images/map/pulau-badalu/1.webp",
      "/images/map/pulau-badalu/2.webp",
    ],
    description: {
      en: "Surga buat pecinta snorkeling dan diving. Terumbu karangnya masih cantik, ikan-ikannya warna-warni, Pemandangan bawahnya bikin susah move on.",
      id: "Surga buat pecinta snorkeling dan diving. Terumbu karangnya masih cantik, ikan-ikanya warna-warni, Pemandangan bawahnya bikin susah move on.",
    },
  },
  {
    id: "blue-spot-mursala",
    name: { en: "Blue Spot Mursala", id: "Blue Spot Mursala" },
    category: "bahari",
    lat: 1.638,
    lng: 98.506,
    images: [
      "/images/map/blue-spot-mursala/1.webp",
      "/images/map/blue-spot-mursala/2.webp",
    ],
    description: {
      en: "Air lautnya benar-benar biru dan super jernih. Lokasinya cuma sekitar lima menit naik boat dari Air Terjun Mursala. Cocok buat foto-foto, tapi tetap hati-hati karena arusnya lumayan kuat.",
      id: "Air lautnya benar-benar biru dan super jernih. Lokasinya cuma sekitar lima menit naik boat dari Air Terjun Mursala. Cocok buat foto-foto, tapi tetap hati-hati karena arusnya lumayan kuat.",
    },
  },
  {
    id: "pantai-pulau-putri",
    name: { en: "Pantai Pulau Putri", id: "Pantai Pulau Putri" },
    category: "bahari",
    lat: 1.645,
    lng: 98.5975,
    images: [
      "/images/map/pantai-pulau-putri/1.webp",
      "/images/map/pantai-pulau-putri/2.webp",
    ],
    description: {
      en: "Pantai eksotis dengan pasir putih, laut jernih, dan deretan pohon kelapa yang bikin vibes liburannya makin dapet. Mau snorkeling, camping, atau sekadar rebahan menikmati suasana, semuanya bisa.",
      id: "Pantai eksotis dengan pasir putih, laut jernih, dan deretan pohon kelapa yang bikin vibes liburannya makin dapet. Mau snorkeling, camping, atau sekadar rebahan menikmati suasana, semuanya bisa.",
    },
  },
  {
    id: "pantai-pandan",
    name: { en: "Pantai Pandan", id: "Pantai Pandan" },
    category: "bahari",
    lat: 1.6788889,
    lng: 98.8269444,
    images: [
      "/images/map/pantai-pandan/1.webp",
      "/images/map/pantai-pandan/2.webp",
      "/images/map/pantai-pandan/3.webp",
      "/images/map/pantai-pandan/4.webp",
      "/images/map/pantai-pandan/5.webp",
    ],
    address:
      "Jl. Sibolga - Padang Sidempuan No.92, Kec. Pandan, Kabupaten Tapanuli Tengah, Sumatra Utara",
    description: {
      en: "Pantai Pandan is an accessible beach in the Tapanuli Tengah capital area, known for its broad shoreline, gentle waves, and food stalls serving seafood. It is suited to a relaxed stop with family or friends.",
      id: "Pantai Pandan merupakan pantai yang mudah dijangkau di kawasan ibu kota Tapanuli Tengah, dikenal dengan garis pantai yang luas, ombak yang relatif tenang, serta warung yang menyajikan hidangan laut. Tempat ini cocok untuk bersantai bersama keluarga atau teman.",
    },
    visitInfo: {
      openingHours: { en: "Open 24 hours*", id: "Buka 24 jam*" },
      bestTime: {
        en: "Morning or late afternoon",
        id: "Pagi atau sore hari",
      },
      visitDuration: { en: "About 1–2 hours", id: "Sekitar 1–2 jam" },
    },
    activities: [
      { en: "Enjoy the coastal panorama", id: "Menikmati panorama pantai" },
      { en: "Relax by the shore", id: "Bersantai di tepi pantai" },
      { en: "Take photographs", id: "Berfoto" },
      { en: "Try local seafood", id: "Menikmati hidangan laut" },
      { en: "Watch the sunset", id: "Menikmati matahari terbenam" },
    ],
    facilities: [
      { en: "Parking", id: "Area parkir" },
      { en: "Toilet", id: "Toilet" },
      { en: "Gazebos", id: "Gazebo" },
      { en: "Food stalls", id: "Warung makan" },
      { en: "Nearby accommodation", id: "Penginapan sekitar" },
    ],
  },
  {
    id: "pantai-binasi",
    name: { en: "Pantai Binasi", id: "Pantai Binasi" },
    category: "bahari",
    lat: 1.898105422,
    lng: 98.549738043,
    images: [
      "/images/map/pantai-binasi/1.webp",
      "/images/map/pantai-binasi/2.webp",
    ],
    description: {
      en: "Pantai berpasir halus di Sorkam Barat dengan pemandangan sunset yang memukau. Deretan pohon pinus di tepinya bikin suasana makin teduh.",
      id: "Pantai berpasir halus di Sorkam Barat dengan pemandangan sunset yang memukau. Deretan pohon pinus di tepinya bikin suasana makin teduh.",
    },
  },
  {
    id: "kampung-pelangi",
    name: { en: "Kampung Pelangi", id: "Kampung Pelangi" },
    category: "tematik",
    lat: 1.7378488,
    lng: 98.77666,
    images: [
      "/images/map/kampung-pelangi/1.webp",
      "/images/map/kampung-pelangi/2.webp",
    ],
    address: "Pasar Belakang, Sibolga Kota, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Kampung Pelangi is a colorful coastal neighborhood in Sibolga. Painted homes and the Rainbow Bridge create a distinctive walking and photography stop while offering a glimpse of everyday life in a waterfront settlement.",
      id: "Kampung Pelangi merupakan permukiman pesisir berwarna-warni di Sibolga. Rumah-rumah yang dicat cerah dan Jembatan Pelangi menciptakan suasana khas untuk berjalan kaki dan berfoto sambil melihat kehidupan sehari-hari masyarakat pesisir.",
    },
    visitInfo: {
      admission: { en: "Free", id: "Gratis" },
      bestTime: {
        en: "Morning or late afternoon",
        id: "Pagi atau sore hari",
      },
      visitDuration: {
        en: "About 30–60 minutes",
        id: "Sekitar 30–60 menit",
      },
    },
    activities: [
      { en: "Walk through the neighborhood", id: "Berjalan menyusuri kampung" },
      { en: "See the colorful homes", id: "Melihat rumah warna-warni" },
      {
        en: "Take photographs at Rainbow Bridge",
        id: "Berfoto di Jembatan Pelangi",
      },
      {
        en: "Observe the coastal settlement",
        id: "Melihat suasana permukiman pesisir",
      },
      {
        en: "Experience local daily life",
        id: "Mengenal kehidupan masyarakat setempat",
      },
    ],
    facilities: [
      { en: "Pedestrian access", id: "Akses pejalan kaki" },
      { en: "Photo spots", id: "Spot foto" },
    ],
  },
  {
    id: "pulau-mursala",
    name: { en: "Pulau Mursala", id: "Pulau Mursala" },
    category: "bahari",
    lat: 1.6673976,
    lng: 98.4732718,
    images: [
      "/images/map/pulau-mursala/1.webp",
      "/images/map/pulau-mursala/2.webp",
    ],
    address: "Kecamatan Tapian Nauli, Kabupaten Tapanuli Tengah, Sumatra Utara",
    description: {
      en: "Pulau Mursala is a large island west of Tapanuli Tengah, recognized for its dramatic cliffs, clear sea, and the waterfall that drops toward the ocean. Reaching it requires a boat trip and suitable sea conditions.",
      id: "Pulau Mursala merupakan pulau besar di sebelah barat Tapanuli Tengah yang dikenal dengan tebing dramatis, laut jernih, dan air terjun yang mengalir menuju laut. Perjalanan ke pulau ini memerlukan perahu dan kondisi laut yang mendukung.",
    },
    visitInfo: {
      bestTime: {
        en: "Morning to midday",
        id: "Pagi hingga siang hari",
      },
      visitDuration: { en: "About 4–6 hours", id: "Sekitar 4–6 jam" },
    },
    activities: [
      { en: "See Mursala Waterfall", id: "Melihat Air Terjun Mursala" },
      { en: "Take photographs", id: "Berfoto" },
      { en: "Travel by boat", id: "Berperahu" },
      { en: "Relax in the island setting", id: "Bersantai di kawasan pulau" },
    ],
    facilities: [
      { en: "Tour boats", id: "Perahu wisata" },
      { en: "Boat landing area", id: "Area sandar perahu" },
      {
        en: "Life jackets, depending on the operator",
        id: "Pelampung, tergantung operator",
      },
    ],
  },
  {
    id: "pantai-batu-gajah",
    name: { en: "Pantai Batu Gajah", id: "Pantai Batu Gajah" },
    category: "bahari",
    lat: 1.6566578,
    lng: 98.831145,
    images: [],
    address:
      "Desa Hajoran Indah, Kecamatan Pandan, Kabupaten Tapanuli Tengah, Sumatra Utara",
    description: {
      en: "Pantai Batu Gajah is a coastal recreation area in Hajoran Indah whose signature rock formation resembles an elephant. The open shoreline and sea views make it a relaxed stop for families and photographers.",
      id: "Pantai Batu Gajah merupakan kawasan rekreasi pesisir di Hajoran Indah dengan formasi batu khas yang menyerupai gajah. Garis pantai terbuka dan pemandangan laut menjadikannya tempat santai bagi keluarga dan pencinta fotografi.",
    },
    visitInfo: {
      bestTime: {
        en: "Morning or late afternoon",
        id: "Pagi atau sore hari",
      },
      visitDuration: { en: "About 1–2 hours", id: "Sekitar 1–2 jam" },
    },
    activities: [
      { en: "Enjoy the coastal panorama", id: "Menikmati panorama pantai" },
      {
        en: "Photograph the elephant-shaped rock",
        id: "Berfoto dengan batu berbentuk gajah",
      },
      { en: "Relax by the shore", id: "Bersantai di tepi pantai" },
      { en: "Explore the coastline", id: "Menjelajahi kawasan pesisir" },
    ],
    facilities: [
      { en: "Parking", id: "Area parkir" },
      { en: "Gazebos", id: "Gazebo" },
      { en: "Toilet", id: "Toilet" },
      { en: "Food stalls", id: "Warung makan" },
    ],
  },
  {
    id: "hotel-wisata-indah-sibolga",
    name: {
      en: "Hotel Wisata Indah Sibolga",
      id: "Hotel Wisata Indah Sibolga",
    },
    category: "akomodasi",
    lat: 1.7400176,
    lng: 98.7750961,
    images: [],
    address:
      "Jl. Brigjen Katamso No.51, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara 22522",
    description: {
      en: "A centrally located hotel with straightforward access to Sibolga's commercial area and waterfront. It offers practical facilities for leisure and business stays.",
      id: "Hotel di pusat kota dengan akses mudah menuju kawasan perdagangan dan tepi laut Sibolga. Fasilitasnya mendukung kebutuhan menginap untuk perjalanan wisata maupun bisnis.",
    },
    visitInfo: {
      checkIn: { en: "From 2 PM", id: "Mulai pukul 14.00 WIB" },
      checkOut: { en: "By 12 PM", id: "Sebelum pukul 12.00 WIB" },
      contact: "0813 6001 7738",
    },
    facilities: [
      { en: "Wi-Fi", id: "Wi-Fi" },
      { en: "Restaurant", id: "Restoran" },
      { en: "24-hour reception", id: "Resepsionis 24 jam" },
      { en: "Parking", id: "Area parkir" },
    ],
  },
  {
    id: "prima-indah-hotel",
    name: { en: "Prima Indah Hotel", id: "Prima Indah Hotel" },
    category: "akomodasi",
    lat: 1.7407333,
    lng: 98.7767853,
    images: [],
    address:
      "Jl. Brigjen Katamso No.45-A-B, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara 22521",
    description: {
      en: "Prima Indah Hotel is a city-center accommodation close to shops, restaurants, and Sibolga's waterfront. Its essential amenities suit short visits and family travel.",
      id: "Prima Indah Hotel merupakan akomodasi di pusat kota yang dekat dengan pertokoan, rumah makan, dan kawasan tepi laut Sibolga. Fasilitas utamanya sesuai untuk kunjungan singkat maupun perjalanan keluarga.",
    },
    visitInfo: {
      checkIn: { en: "From 2 PM", id: "Mulai pukul 14.00 WIB" },
      checkOut: { en: "By 12 PM", id: "Sebelum pukul 12.00 WIB" },
      contact: "0822 7644 9784",
    },
    facilities: [
      { en: "Wi-Fi", id: "Wi-Fi" },
      { en: "Breakfast", id: "Sarapan" },
      { en: "24-hour reception", id: "Resepsionis 24 jam" },
      { en: "Parking", id: "Area parkir" },
      { en: "Air conditioning", id: "Pendingin ruangan" },
    ],
  },
  {
    id: "hotel-sopo-holong",
    name: { en: "Hotel Sopo Holong", id: "Hotel Sopo Holong" },
    category: "akomodasi",
    lat: 1.745528,
    lng: 98.780833,
    images: [],
    address:
      "Jl. DR. F. Lumban Tobing No.15, Huta Tonga-Tonga, Kec. Sibolga Utara, Kota Sibolga, Sumatra Utara 22513",
    description: {
      en: "Hotel Sopo Holong provides practical accommodation in northern Sibolga, within reach of the city center. Its room and parking facilities serve solo travelers, families, and small groups.",
      id: "Hotel Sopo Holong menyediakan akomodasi praktis di Sibolga Utara dengan akses menuju pusat kota. Fasilitas kamar dan parkirnya melayani pelancong individu, keluarga, maupun kelompok kecil.",
    },
    visitInfo: {
      checkIn: { en: "From 2 PM", id: "Mulai pukul 14.00 WIB" },
      checkOut: { en: "By 12 PM", id: "Sebelum pukul 12.00 WIB" },
      contact: "0813 2227 795",
    },
    facilities: [
      { en: "Wi-Fi", id: "Wi-Fi" },
      { en: "Parking", id: "Area parkir" },
      { en: "Air conditioning", id: "Pendingin ruangan" },
      { en: "Television", id: "Televisi" },
      { en: "Non-smoking area", id: "Area bebas rokok" },
      { en: "Reception", id: "Resepsionis" },
    ],
  },
  {
    id: "satia-hotel",
    name: { en: "Satia Hotel", id: "Satia Hotel" },
    category: "akomodasi",
    lat: 1.7454883,
    lng: 98.780216,
    images: [],
    address:
      "Jl. Dr. F. Lumbantobing No.11, Huta Tonga-Tonga, Kec. Sibolga Utara, Kota Sibolga, Sumatra Utara 22512",
    description: {
      en: "Satia Hotel is a city hotel with lodging, dining, meeting, and entertainment facilities. Its location in Sibolga Utara gives guests convenient access to the urban area.",
      id: "Satia Hotel merupakan hotel kota dengan fasilitas menginap, bersantap, pertemuan, dan hiburan. Lokasinya di Sibolga Utara memberikan akses yang mudah menuju kawasan perkotaan.",
    },
    visitInfo: {
      checkIn: { en: "From 12 PM", id: "Mulai pukul 12.00 WIB" },
      checkOut: { en: "By 12 PM", id: "Sebelum pukul 12.00 WIB" },
      contact: "0821 6120 9100",
    },
    facilities: [
      { en: "Wi-Fi", id: "Wi-Fi" },
      { en: "Restaurant", id: "Restoran" },
      { en: "24-hour reception", id: "Resepsionis 24 jam" },
      { en: "Parking", id: "Area parkir" },
      { en: "Meeting room", id: "Ruang pertemuan" },
      { en: "Karaoke", id: "Karaoke" },
      { en: "Air conditioning in every room", id: "AC di setiap kamar" },
    ],
  },
  {
    id: "hotel-syariah-cn-darussalam",
    name: {
      en: "Hotel Syariah CN Darussalam",
      id: "Hotel Syariah CN Darussalam",
    },
    category: "akomodasi",
    lat: 1.7402981,
    lng: 98.7800015,
    images: [],
    address:
      "Jl. Imam Bonjol No.47, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara 22522",
    description: {
      en: "A sharia-oriented hotel in central Sibolga with family rooms and facilities for longer or group stays. The property is close to the city's commercial area.",
      id: "Hotel berkonsep syariah di pusat Sibolga dengan kamar keluarga dan fasilitas untuk kunjungan lebih lama maupun kelompok. Properti ini berada dekat kawasan perdagangan kota.",
    },
    visitInfo: {
      checkIn: { en: "From 2 PM", id: "Mulai pukul 14.00 WIB" },
      checkOut: { en: "By 12 PM", id: "Sebelum pukul 12.00 WIB" },
      contact: "0812 6036 1924",
    },
    facilities: [
      { en: "Wi-Fi", id: "Wi-Fi" },
      { en: "Parking", id: "Area parkir" },
      { en: "Restaurant", id: "Restoran" },
      { en: "24-hour reception", id: "Resepsionis 24 jam" },
      { en: "Air conditioning", id: "Pendingin ruangan" },
      { en: "Family rooms", id: "Kamar keluarga" },
      { en: "Laundry", id: "Layanan penatu" },
      { en: "Meeting room", id: "Ruang pertemuan" },
    ],
  },
  {
    id: "seafood-malaya",
    name: { en: "Seafood Malaya", id: "Seafood Malaya" },
    category: "kuliner",
    lat: 1.7408681,
    lng: 98.7778936,
    images: [
      "/images/map/seafood-malaya/1.webp",
      "/images/map/seafood-malaya/2.webp",
    ],
    address:
      "Jl. S. Parman No.34, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Seafood Malaya serves a selection of fresh seafood dishes in central Sibolga. Its varied menu and group-friendly setting make it a practical choice for families and visitors.",
      id: "Seafood Malaya menyajikan beragam hidangan laut segar di pusat Kota Sibolga. Pilihan menunya yang beragam dan suasana yang sesuai untuk rombongan menjadikannya pilihan praktis bagi keluarga dan wisatawan.",
    },
    visitInfo: {
      openingHours: { en: "10 AM–10 PM*", id: "10.00–22.00 WIB*" },
      suitableFor: {
        en: "Families, groups, and visitors",
        id: "Keluarga, rombongan, dan wisatawan",
      },
      contact: "0813 7514 9833",
    },
  },
  {
    id: "ikan-bakar-sari-laut",
    name: { en: "Ikan Bakar Sari Laut", id: "Ikan Bakar Sari Laut" },
    category: "kuliner",
    lat: 1.7388599,
    lng: 98.7775481,
    images: [
      "/images/map/ikan-bakar-sari-laut/1.webp",
      "/images/map/ikan-bakar-sari-laut/2.webp",
    ],
    address:
      "Jl. KH. Ahmad Dahlan, Aek Manis, Sibolga Selatan, Kota Sibolga, Sumatra Utara",
    description: {
      en: "A local dinner spot specializing in grilled fish and seafood dishes. Meals are prepared to order and are suited to sharing with family or friends.",
      id: "Tempat makan lokal yang mengkhususkan diri pada ikan bakar dan hidangan laut. Makanan diolah sesuai pesanan dan cocok dinikmati bersama keluarga atau teman.",
    },
    visitInfo: {
      openingHours: { en: "5:30–10 PM*", id: "17.30–22.00 WIB*" },
      suitableFor: {
        en: "Families, groups, and visitors",
        id: "Keluarga, rombongan, dan wisatawan",
      },
      contact: "0813 7570 6161",
    },
  },
  {
    id: "ikan-bakar-fukong",
    name: { en: "Ikan Bakar Fukong", id: "Ikan Bakar Fukong" },
    category: "kuliner",
    lat: 1.7398676,
    lng: 98.7770463,
    images: ["/images/map/ikan-bakar-fukong/1.webp"],
    address:
      "Jl. S. Parman, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Ikan Bakar Fukong is an evening eatery known for grilled fish and seafood. Its central location makes it easy to include in a night out around Sibolga.",
      id: "Ikan Bakar Fukong merupakan tempat makan malam yang dikenal dengan ikan bakar dan hidangan laut. Lokasinya di pusat kota mudah disinggahi saat menjelajahi Sibolga pada malam hari.",
    },
    visitInfo: {
      openingHours: { en: "5–11 PM*", id: "17.00–23.00 WIB*" },
      suitableFor: {
        en: "Families, groups, and visitors",
        id: "Keluarga, rombongan, dan wisatawan",
      },
    },
  },
  {
    id: "martabak-bang-apoy",
    name: { en: "Martabak Bang Apoy", id: "Martabak Bang Apoy" },
    category: "kuliner",
    lat: 1.7399566,
    lng: 98.7806865,
    images: [],
    address:
      "Jl. Mesjid No.19, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Martabak Bang Apoy offers sweet martabak and savory egg martabak as an afternoon and evening snack. The portions are well suited to sharing.",
      id: "Martabak Bang Apoy menawarkan martabak manis dan martabak telur sebagai camilan sore hingga malam. Porsinya cocok untuk dinikmati bersama.",
    },
    visitInfo: {
      openingHours: { en: "3–10:30 PM*", id: "15.00–22.30 WIB*" },
      suitableFor: {
        en: "Evening snacks with family or friends",
        id: "Camilan malam bersama keluarga atau teman",
      },
      menu: {
        en: "Sweet martabak and egg martabak",
        id: "Martabak manis dan martabak telur",
      },
      contact: "0852 6188 8588",
    },
  },
  {
    id: "rm-minang-nauli-sibolga",
    name: { en: "RM Minang Nauli", id: "RM Minang Nauli" },
    category: "kuliner",
    lat: 1.7377752,
    lng: 98.7828983,
    images: [
      "/images/map/rm-minang-nauli-sibolga/1.webp",
      "/images/map/rm-minang-nauli-sibolga/2.webp",
    ],
    address:
      "Jl. Ahmad Yani, Ps. Baru, Sibolga Kota, Kota Sibolga, Sumatra Utara",
    description: {
      en: "RM Minang Nauli serves familiar Minang dishes with a broad selection of side dishes. It is a convenient option for lunch or dinner in central Sibolga.",
      id: "RM Minang Nauli menyajikan hidangan khas Minang dengan pilihan lauk yang beragam. Rumah makan ini menjadi pilihan yang mudah untuk makan siang atau malam di pusat Sibolga.",
    },
    visitInfo: {
      openingHours: { en: "9 AM–9 PM*", id: "09.00–21.00 WIB*" },
      suitableFor: {
        en: "Lunch, dinner, and families",
        id: "Makan siang, makan malam, dan keluarga",
      },
      menu: { en: "Minang dishes", id: "Masakan Minang" },
      contact: "0851 8274 0080",
    },
  },
  {
    id: "warung-balam",
    name: { en: "Warung Balam", id: "Warung Balam" },
    category: "kuliner",
    lat: 1.7302375,
    lng: 98.7917313,
    images: [
      "/images/map/warung-balam/1.webp",
      "/images/map/warung-balam/2.webp",
    ],
    address:
      "Jl. SM. Raja, Aek Parombunan, Sibolga Selatan, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Warung Balam is a casual local restaurant offering seafood dishes for lunch and dinner. Its straightforward setting is suited to families and groups.",
      id: "Warung Balam merupakan rumah makan lokal yang menyajikan hidangan laut untuk makan siang dan malam. Suasananya yang sederhana cocok bagi keluarga dan rombongan.",
    },
    visitInfo: {
      suitableFor: {
        en: "Lunch, dinner, and families",
        id: "Makan siang, makan malam, dan keluarga",
      },
      menu: { en: "Seafood dishes", id: "Hidangan laut" },
      contact: "0822 7299 2525",
    },
  },
  {
    id: "mie-gomak-rinda",
    name: { en: "Mie Gomak – Rinda", id: "Mie Gomak – Rinda" },
    category: "kuliner",
    lat: 1.7276139,
    lng: 98.7947179,
    images: ["/images/map/mie-gomak-rinda/1.webp"],
    address:
      "Jl. SM. Raja, Aek Parombunan, Sibolga Selatan, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Mie Gomak – Rinda serves the well-known Batak noodle dish with a savory, spiced profile and the distinctive aroma of andaliman. It is a focused stop for visitors seeking a regional specialty.",
      id: "Mie Gomak – Rinda menyajikan hidangan mi khas Batak dengan cita rasa gurih, berbumbu, dan aroma andaliman yang khas. Tempat ini cocok bagi pengunjung yang ingin mencicipi kuliner daerah.",
    },
    visitInfo: {
      openingHours: { en: "1–6 PM*", id: "13.00–18.00 WIB*" },
      suitableFor: {
        en: "Breakfast, lunch, or an early dinner",
        id: "Sarapan, makan siang, atau makan malam lebih awal",
      },
      flavor: {
        en: "Savory, spiced, with andaliman",
        id: "Gurih, berbumbu, dengan andaliman",
      },
    },
  },
  {
    id: "keripik-sambal-special",
    name: { en: "Keripik Sambal Special", id: "Keripik Sambal Special" },
    category: "oleh-oleh",
    lat: 1.7420165,
    lng: 98.775803,
    images: [
      "/images/map/keripik-sambal-special/1.webp",
      "/images/map/keripik-sambal-special/2.webp",
      "/images/map/keripik-sambal-special/3.webp",
      "/images/map/keripik-sambal-special/4.webp",
    ],
    address:
      "Jl. MH. Thamrin No.58, Kota Beringin, Sibolga Kota, Kota Sibolga, Sumatra Utara 22521",
    description: {
      en: "Keripik Sambal Special is a local souvenir shop offering Sibolga snacks and packaged food products. Its broad selection makes it convenient to gather several regional gifts in one stop.",
      id: "Keripik Sambal Special merupakan toko oleh-oleh lokal yang menawarkan camilan dan produk pangan kemasan khas Sibolga. Pilihannya yang beragam memudahkan pengunjung membeli beberapa jenis buah tangan dalam satu tempat.",
    },
    visitInfo: {
      openingHours: { en: "8 AM–7 PM*", id: "08.00–19.00 WIB*" },
      featuredProduct: {
        en: "Keripik Sambal Special",
        id: "Keripik Sambal Special",
      },
      products: {
        en: "Snacks, seafood products, sambal, crackers, and other packaged specialties",
        id: "Camilan, olahan hasil laut, sambal, kerupuk, dan produk khas kemasan lainnya",
      },
      advantages: {
        en: "A broad souvenir selection in one place",
        id: "Pilihan oleh-oleh yang lengkap dalam satu tempat",
      },
      contact: "0813 6216 0875",
    },
  },
  {
    id: "aroma-prime-bakery-cake-shop",
    name: {
      en: "Aroma Prime Bakery & Cake Shop",
      id: "Aroma Prime Bakery & Cake Shop",
    },
    category: "oleh-oleh",
    lat: 1.734294,
    lng: 98.7843109,
    images: [],
    address:
      "Jl. Ahmad Yani No.88, Aek Manis, Sibolga Selatan, Kota Sibolga, Sumatra Utara",
    description: {
      en: "Aroma Prime Bakery & Cake Shop offers fresh bread, pastries, sponge cakes, and celebration cakes. Its varied selection and presentable packaging also make the products suitable as gifts.",
      id: "Aroma Prime Bakery & Cake Shop menawarkan roti segar, pastry, bolu, dan kue perayaan. Pilihan yang beragam serta kemasan yang menarik membuat produknya juga cocok dijadikan buah tangan.",
    },
    visitInfo: {
      products: {
        en: "Bread, sponge cakes, pastries, and cakes",
        id: "Roti, bolu, pastry, dan kue",
      },
      advantages: {
        en: "Fresh products, varied choices, and attractive packaging",
        id: "Produk segar, pilihan beragam, dan kemasan menarik",
      },
    },
  },
];

export const locationScores: Record<
  string,
  Partial<Record<Dimension, number>>
> = {
  "blue-spot-mursala": {
    bahari: 5,
    alam: 3,
    aktif: 4,
    foto: 2,
    sunyi: 3,
    jauh: 4,
  },
  "air-terjun-mursala": {
    bahari: 4,
    alam: 4,
    aktif: 2,
    foto: 4,
    sunyi: 2,
    jauh: 4,
  },
  "pulau-poncan": {
    bahari: 4,
    alam: 1,
    aktif: 2,
    santai: 3,
    foto: 3,
    ramai: 3,
    sedang: 3,
  },
  "pulau-kalimantung-na-menek": {
    bahari: 4,
    alam: 3,
    aktif: 2,
    santai: 1,
    foto: 3,
    sunyi: 3,
    sedang: 2,
    jauh: 2,
  },
  "pantai-pandan": {
    bahari: 4,
    aktif: 1,
    santai: 3,
    foto: 3,
    ramai: 4,
    sedang: 3,
  },
  "pulau-badalu": {
    bahari: 3,
    alam: 3,
    aktif: 2,
    santai: 1,
    foto: 1,
    sunyi: 4,
    jauh: 3,
  },
  "pulo-bangke": {
    bahari: 3,
    alam: 3,
    aktif: 2,
    santai: 1,
    foto: 1,
    sunyi: 4,
    jauh: 3,
  },
  "pantai-pulau-putri": {
    bahari: 3,
    alam: 1,
    aktif: 1,
    santai: 4,
    foto: 3,
    sunyi: 3,
    jauh: 2,
  },
  "pantai-ujung-sibolga": { bahari: 3, santai: 4, foto: 4, ramai: 3, dekat: 5 },
  "pantai-kalangan-indah": {
    bahari: 3,
    alam: 1,
    aktif: 1,
    santai: 3,
    foto: 2,
    sunyi: 2,
    ramai: 1,
    sedang: 2,
  },
  "pantai-pandaratan-pondok-batu": {
    bahari: 3,
    alam: 2,
    aktif: 1,
    santai: 2,
    foto: 3,
    sunyi: 2,
    ramai: 1,
    sedang: 2,
  },
  "pasir-putih-pandaratan": {
    bahari: 3,
    alam: 1,
    santai: 3,
    foto: 2,
    sunyi: 2,
    ramai: 1,
    sedang: 2,
  },
  "pantai-binasi": {
    bahari: 3,
    alam: 4,
    aktif: 1,
    santai: 3,
    foto: 2,
    sunyi: 5,
    jauh: 5,
  },
  "pantai-pelabuhan-lama": {
    bahari: 2,
    santai: 2,
    foto: 2,
    sejarah: 2,
    sunyi: 1,
    ramai: 1,
    dekat: 5,
  },
  "bukit-tor-simarbarimbing": {
    alam: 4,
    aktif: 3,
    santai: 2,
    foto: 4,
    sunyi: 2,
    ramai: 1,
    dekat: 2,
  },
  "bukit-panomboman": {
    alam: 3,
    aktif: 3,
    santai: 1,
    foto: 3,
    sunyi: 2,
    dekat: 2,
  },
  "puncak-gm-panggabean": {
    alam: 4,
    aktif: 3,
    santai: 1,
    foto: 4,
    sunyi: 2,
    sedang: 2,
  },
  "air-terjun-sihobuk": {
    alam: 4,
    aktif: 3,
    santai: 1,
    foto: 2,
    sunyi: 3,
    sedang: 2,
  },
  "air-terjun-labuhan-sonang": {
    alam: 4,
    aktif: 3,
    santai: 1,
    foto: 2,
    sunyi: 3,
    jauh: 2,
  },
  "tangga-seratus": {
    alam: 1,
    aktif: 1,
    santai: 2,
    foto: 4,
    sejarah: 3,
    ramai: 3,
    dekat: 5,
  },
  "benteng-jepang-bukit-ketapang": {
    alam: 2,
    aktif: 2,
    santai: 1,
    foto: 3,
    sejarah: 4,
    sunyi: 2,
    dekat: 2,
  },
  "batu-lubang-sibolga": {
    alam: 1,
    santai: 2,
    foto: 3,
    sejarah: 5,
    sunyi: 1,
    ramai: 1,
    dekat: 3,
  },
};
