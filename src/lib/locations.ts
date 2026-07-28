import {
  BeachIcon,
  IslandIcon,
  LandmarkIcon,
  MountainIcon,
  WaterfallDownIcon,
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
  "pantai" | "pulau" | "bukit" | "air-terjun" | "landmark";

export const categoryColor: Record<LocationCategory, string> = {
  pantai: "oklch(0.62 0.12 230)",
  pulau: "oklch(0.58 0.14 200)",
  bukit: "oklch(0.52 0.1 140)",
  "air-terjun": "oklch(0.6 0.1 220)",
  landmark: "oklch(0.58 0.09 60)",
};

export const categoryIcon: Record<LocationCategory, IconSvgElement> = {
  pantai: BeachIcon,
  pulau: IslandIcon,
  bukit: MountainIcon,
  "air-terjun": WaterfallDownIcon,
  landmark: LandmarkIcon,
};

export const categoryOrder: LocationCategory[] = [
  "pantai",
  "pulau",
  "bukit",
  "air-terjun",
  "landmark",
];

export type Location = {
  id: string;
  name: { en: string; id: string };
  category: LocationCategory;
  lat: number;
  lng: number;
  images: string[];
  description: { en: string; id: string };
};

// TODO: verify coordinates — approximated from public sources, pending review.
export const locations: Location[] = [
  {
    id: "tangga-seratus",
    name: { en: "Tangga Seratus", id: "Tangga Seratus" },
    category: "landmark",
    lat: 1.7445,
    lng: 98.7778,
    images: ["/images/map/tangga-seratus/1.webp"],
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
    category: "pantai",
    lat: 1.7431585,
    lng: 98.7734728,
    images: ["/images/map/pantai-ujung-sibolga/1.webp"],
    description: {
      en: "Kalau lagi pengen healing tanpa ribet, Pantai Pajus jawabannya. Pasirnya lembut, ombaknya santai, cocok buat main air atau duduk-duduk sambil nunggu sunset yang cantiknya nggak pernah gagal.",
      id: "Kalau lagi pengen healing tanpa ribet, Pantai Pajus jawabannya. Pasirnya lembut, ombaknya santai, cocok buat main air atau duduk-duduk sambil nunggu sunset yang cantiknya nggak pernah gagal.",
    },
  },
  {
    id: "pantai-pelabuhan-lama",
    name: { en: "Pantai Pelabuhan Lama", id: "Pantai Pelabuhan Lama" },
    category: "pantai",
    lat: 1.7427,
    lng: 98.7773,
    images: ["/images/map/pantai-pelabuhan-lama/1.webp"],
    description: {
      en: "Dulu pelabuhan, sekarang jadi spot wisata yang estetik. Pantainya bersih, airnya jernih, plus masih ada bangunan kolonial bersejarah seperti Bioskop Haven Theatre dan Gudang Marison. Cocok buat yang suka jalan-jalan sambil hunting foto.",
      id: "Dulu pelabuhan, sekarang jadi spot wisata yang estetik. Pantainya bersih, airnya jernih, plus masih ada bangunan kolonial bersejarah seperti Bioskop Haven Theatre dan Gudang Marison. Cocok buat yang suka jalan-jalan sambil hunting foto.",
    },
  },
  {
    id: "pulau-poncan",
    name: { en: "Pulau Poncan", id: "Pulau Poncan" },
    category: "pulau",
    lat: 1.7109,
    lng: 98.7635,
    images: ["/images/map/pulau-poncan/1.webp"],
    description: {
      en: "Air laut sebening kaca, jembatan di atas laut, dan spot snorkeling yang kece. Nggak cuma cantik, pulau ini juga punya gua peninggalan tentara Jepang yang bikin vibes petualangannya makin dapet.",
      id: "Air laut sebening kaca, jembatan di atas laut, dan spot snorkeling yang kece. Nggak cuma cantik, pulau ini juga punya gua peninggalan tentara Jepang yang bikin vibes petualangannya makin dapet.",
    },
  },
  {
    id: "bukit-panomboman",
    name: { en: "Bukit Panomboman", id: "Bukit Panomboman" },
    category: "bukit",
    lat: 1.735,
    lng: 98.772,
    images: ["/images/map/bukit-panomboman/1.webp"],
    description: {
      en: "Kalau warga lokal ditanya spot sunset favorit, banyak yang bakal jawab di sini. Dari atas bukit kamu bisa lihat laut dan pegunungan sekaligus. Makin lengkap kalau ditemenin secangkir kopi di kafe sekitar.",
      id: "Kalau warga lokal ditanya spot sunset favorit, banyak yang bakal jawab di sini. Dari atas bukit kamu bisa lihat laut dan pegunungan sekaligus. Makin lengkap kalau ditemenin secangkir kopi di kafe sekitar.",
    },
  },
  {
    id: "pantai-pandaratan-pondok-batu",
    name: {
      en: "Pantai Pandaratan Pondok Batu",
      id: "Pantai Pandaratan Pondok Batu",
    },
    category: "pantai",
    lat: 1.6833,
    lng: 98.8167,
    images: ["/images/map/pantai-pandaratan-pondok-batu/1.webp"],
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
    category: "landmark",
    lat: 1.748,
    lng: 98.772,
    images: ["/images/map/benteng-jepang-bukit-ketapang/1.webp"],
    description: {
      en: "Buat yang suka wisata sejarah, wajib mampir. Ada enam benteng peninggalan Jepang dengan bonus panorama Kota Sibolga dan Teluk Tapian Nauli dari ketinggian. Sunset-nya juga juara!",
      id: "Buat yang suka wisata sejarah, wajib mampir. Ada enam benteng peninggalan Jepang dengan bonus panorama Kota Sibolga dan Teluk Tapian Nauli dari ketinggian. Sunset-nya juga juara!",
    },
  },
  {
    id: "batu-lubang-sibolga",
    name: { en: "Batu Lubang Sibolga", id: "Batu Lubang Sibolga" },
    category: "landmark",
    lat: 1.738,
    lng: 98.771,
    images: ["/images/map/batu-lubang-sibolga/1.webp"],
    description: {
      en: "Terowongan peninggalan zaman Belanda yang punya cerita panjang. Di sampingnya ada air terjun kecil yang bikin suasananya makin unik. Agak misterius, tapi justru itu yang bikin penasaran.",
      id: "Terowongan peninggalan zaman Belanda yang punya cerita panjang. Di sampingnya ada air terjun kecil yang bikin suasananya makin unik. Agak misterius, tapi justru itu yang bikin penasaran.",
    },
  },
  {
    id: "air-terjun-sihobuk",
    name: { en: "Air Terjun Sihobuk", id: "Air Terjun Sihobuk" },
    category: "air-terjun",
    lat: 1.76,
    lng: 98.79,
    images: ["/images/map/air-terjun-sihobuk/1.webp"],
    description: {
      en: "Air terjun setinggi sekitar 12–17 meter dengan kolam alami yang nyaman buat main air. Cocok buat quality time bareng keluarga karena anak-anak juga bisa berenang di sini.",
      id: "Air terjun setinggi sekitar 12–17 meter dengan kolam alami yang nyaman buat main air. Cocok buat quality time bareng keluarga karena anak-anak juga bisa berenang di sini.",
    },
  },
  {
    id: "bukit-tor-simarbarimbing",
    name: { en: "Bukit Tor Simarbarimbing", id: "Bukit Tor Simarbarimbing" },
    category: "bukit",
    lat: 1.752,
    lng: 98.785,
    images: ["/images/map/bukit-tor-simarbarimbing/1.webp"],
    description: {
      en: "Perjalanan ke bukit ini bakal lewat perkampungan suku Nias yang khas. Sampai di puncak, kamu disambut view Sibolga dari ketinggian yang bikin perjalanan terasa worth it.",
      id: "Perjalanan ke bukit ini bakal lewat perkampungan suku Nias yang khas. Sampai di puncak, kamu disambut view Sibolga dari ketinggian yang bikin perjalanan terasa worth it.",
    },
  },
  {
    id: "pantai-kalangan-indah",
    name: { en: "Pantai Kalangan Indah", id: "Pantai Kalangan Indah" },
    category: "pantai",
    lat: 1.733,
    lng: 98.795,
    images: ["/images/map/pantai-kalangan-indah/1.webp"],
    description: {
      en: "Pantai dengan pasir putih dan ombak yang tenang karena berada di kawasan teluk. Aman buat anak-anak main air, tapi tetap seru buat kamu yang cuma pengen rebahan sambil nikmatin angin pantai.",
      id: "Pantai dengan pasir putih dan ombak yang tenang karena berada di kawasan teluk. Aman buat anak-anak main air, tapi tetap seru buat kamu yang cuma pengen rebahan sambil nikmatin angin pantai.",
    },
  },
  {
    id: "pasir-putih-pandaratan",
    name: { en: "Pasir Putih Pandaratan", id: "Pasir Putih Pandaratan" },
    category: "pantai",
    lat: 1.68,
    lng: 98.82,
    images: ["/images/map/pasir-putih-pandaratan/1.webp"],
    description: {
      en: "Masih satu kawasan dengan Pondok Batu, tapi punya hamparan pasir putih yang luas dan suasana yang lebih sepi. Cocok buat yang cari tempat healing tanpa keramaian.",
      id: "Masih satu kawasan dengan Pondok Batu, tapi punya hamparan pasir putih yang luas dan suasana yang lebih sepi. Cocok buat yang cari tempat healing tanpa keramaian.",
    },
  },
  {
    id: "pulo-bangke",
    name: { en: "Pulo Bangke", id: "Pulo Bangke" },
    category: "pulau",
    lat: 1.73,
    lng: 98.76,
    images: ["/images/map/pulo-bangke/1.webp"],
    description: {
      en: "Pulau kecil yang keindahannya masih alami banget. Tips : datang pas air laut surut supaya bisa lebih puas menjelajah. Timing is everything!",
      id: "Pulau kecil yang keindahannya masih alami banget. Tips : datang pas air laut surut supaya bisa lebih puas menjelajah. Timing is everything!",
    },
  },
  {
    id: "air-terjun-labuhan-sonang",
    name: { en: "Air Terjun Labuhan Sonang", id: "Air Terjun Labuhan Sonang" },
    category: "air-terjun",
    lat: 1.7,
    lng: 98.76,
    images: ["/images/map/air-terjun-labuhan-sonang/1.webp"],
    description: {
      en: "Meski sebagian aliran airnya dimanfaatkan sebagai sumber air bersih, kawasan ini tetap punya pesona alam yang bikin betah. Perpaduan air terjun, pantai, dan perbukitan dalam satu tempat.",
      id: "Meski sebagian aliran airnya dimanfaatkan sebagai sumber air bersih, kawasan ini tetap punya pesona alam yang bikin betah. Perpaduan air terjun, pantai, dan perbukitan dalam satu tempat.",
    },
  },
  {
    id: "puncak-gm-panggabean",
    name: { en: "Puncak GM Panggabean", id: "Puncak GM Panggabean" },
    category: "landmark",
    lat: 1.745,
    lng: 98.79,
    images: ["/images/map/puncak-gm-panggabean/1.webp"],
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
    category: "pulau",
    lat: 1.574,
    lng: 98.528,
    images: ["/images/map/pulau-kalimantung-na-menek/1.webp"],
    description: {
      en: "Pulau mungil dengan pasir putih dan laut sebening kristal. Biasanya jadi satu paket wisata bareng Pulau Mursala dan Badalu. Sekali jalan, langsung dapat beberapa destinasi.",
      id: "Pulau mungil dengan pasir putih dan laut sebening kristal. Biasanya jadi satu paket wisata bareng Pulau Mursala dan Badalu. Sekali jalan, langsung dapat beberapa destinasi.",
    },
  },
  {
    id: "air-terjun-mursala",
    name: { en: "Air Terjun Mursala", id: "Air Terjun Mursala" },
    category: "air-terjun",
    lat: 1.6366,
    lng: 98.5107,
    images: ["/images/map/air-terjun-mursala/1.webp"],
    description: {
      en: "Ini salah satu ikon wisata Tapteng. Air terjunnya langsung jatuh ke laut dari tebing pulau—unik banget dan langka di Indonesia. Fun fact : pernah jadi lokasi syuting film King Kong (2005)!",
      id: "Ini salah satu ikon wisata Tapteng. Air terjunnya langsung jatuh ke laut dari tebing pulau—unik banget dan langka di Indonesia. Fun fact : pernah jadi lokasi syuting film King Kong (2005)!",
    },
  },
  {
    id: "pulau-badalu",
    name: { en: "Pulau Badalu", id: "Pulau Badalu" },
    category: "pulau",
    lat: 1.62,
    lng: 98.52,
    images: ["/images/map/pulau-badalu/1.webp"],
    description: {
      en: "Surga buat pecinta snorkeling dan diving. Terumbu karangnya masih cantik, ikan-ikannya warna-warni, Pemandangan bawahnya bikin susah move on.",
      id: "Surga buat pecinta snorkeling dan diving. Terumbu karangnya masih cantik, ikan-ikanya warna-warni, Pemandangan bawahnya bikin susah move on.",
    },
  },
  {
    id: "blue-spot-mursala",
    name: { en: "Blue Spot Mursala", id: "Blue Spot Mursala" },
    category: "pulau",
    lat: 1.638,
    lng: 98.506,
    images: ["/images/map/blue-spot-mursala/1.webp"],
    description: {
      en: "Air lautnya benar-benar biru dan super jernih. Lokasinya cuma sekitar lima menit naik boat dari Air Terjun Mursala. Cocok buat foto-foto, tapi tetap hati-hati karena arusnya lumayan kuat.",
      id: "Air lautnya benar-benar biru dan super jernih. Lokasinya cuma sekitar lima menit naik boat dari Air Terjun Mursala. Cocok buat foto-foto, tapi tetap hati-hati karena arusnya lumayan kuat.",
    },
  },
  {
    id: "pantai-pulau-putri",
    name: { en: "Pantai Pulau Putri", id: "Pantai Pulau Putri" },
    category: "pantai",
    lat: 1.615,
    lng: 98.525,
    images: ["/images/map/pantai-pulau-putri/1.webp"],
    description: {
      en: "Pantai eksotis dengan pasir putih, laut jernih, dan deretan pohon kelapa yang bikin vibes liburannya makin dapet. Mau snorkeling, camping, atau sekadar rebahan menikmati suasana, semuanya bisa.",
      id: "Pantai eksotis dengan pasir putih, laut jernih, dan deretan pohon kelapa yang bikin vibes liburannya makin dapet. Mau snorkeling, camping, atau sekadar rebahan menikmati suasana, semuanya bisa.",
    },
  },
  {
    id: "pantai-pandan",
    name: { en: "Pantai Pandan", id: "Pantai Pandan" },
    category: "pantai",
    lat: 1.805,
    lng: 98.735,
    images: [
      "/images/map/pantai-pandan/1.webp",
      "/images/map/pantai-pandan/2.webp",
      "/images/map/pantai-pandan/3.webp",
    ],
    description: {
      en: "Pantai di kawasan Pandan, Tapanuli Tengah, dengan pasir putih dan ombak yang bersahabat. Cocok buat refreshing sebelum melanjutkan perjalanan ke kepulauan Mursala.",
      id: "Pantai di kawasan Pandan, Tapanuli Tengah, dengan pasir putih dan ombak yang bersahabat. Cocok buat refreshing sebelum melanjutkan perjalanan ke kepulauan Mursala.",
    },
  },
  {
    id: "pantai-binasi",
    name: { en: "Pantai Binasi", id: "Pantai Binasi" },
    category: "pantai",
    lat: 1.87,
    lng: 98.68,
    images: ["/images/map/pantai-binasi/1.webp"],
    description: {
      en: "Pantai berpasir halus di Sorkam Barat dengan pemandangan sunset yang memukau. Deretan pohon pinus di tepinya bikin suasana makin teduh.",
      id: "Pantai berpasir halus di Sorkam Barat dengan pemandangan sunset yang memukau. Deretan pohon pinus di tepinya bikin suasana makin teduh.",
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
