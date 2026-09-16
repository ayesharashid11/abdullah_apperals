// src/data/portfolioData.js
import blackCargoImg from '../assets/images/black_cargo_pants_1787225683497.jpg';
import navyTrouserImg from '../assets/images/navy_wide_trouser_1787225697031.jpg';
import brownInterlockImg from '../assets/images/brown_interlock_pant_1787225710804.jpg';
import burgundyTracksuitImg from '../assets/images/burgundy_track_suit_1787225731121.jpg';
import roseLoungeSetImg from '../assets/images/rose_lounge_set_1787225745591.jpg';
import creamPleatedImg from '../assets/images/cream_pleated_pant_1787225760974.jpg';

export const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'knitwear', label: 'Knitwear' },
  { key: 'outerwear', label: 'Outerwear' },
  { key: 'wovens', label: 'Wovens' }
];

export const portfolioItems = [
  {
    id: 1,
    title: '380 GSM Heavyweight Loopback Hoodie',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    gsm: '380 GSM',
    moq: '300 units MOQ',
    leadTime: '4-5 Weeks',
    fabric: '100% Combed Organic Cotton (380 GSM Loopback)',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Double-needle flatlock construction, pre-shrunk enzyme bath, ribbed side gussets, stiff-stand double layer hood.',
    heightClass: 'h-[400px] sm:h-[460px] lg:h-[500px]'
  },
  {
    id: 2,
    title: 'Modular Utility Black Cargo Pant',
    category: 'wovens',
    categoryLabel: 'Wovens',
    gsm: '300 GSM',
    moq: '400 units MOQ',
    leadTime: '6 Weeks',
    fabric: '50/50 Cotton/Polyester Heavyweight Twill',
    image: blackCargoImg,
    description: 'Dual side cargo flap pockets, wide-leg relaxed silhouette, deep front pockets, and reinforced stress points.',
    heightClass: 'h-[340px] sm:h-[400px] lg:h-[430px]'
  },
  {
    id: 3,
    title: 'Technical Ripstop Storm Anorak',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    gsm: '160 GSM',
    moq: '400 units MOQ',
    leadTime: '6-8 Weeks',
    fabric: '70D Diamond Ripstop Nylon with DWR Coating',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Micro-tape interior seam sealing, reverse-coil water resistant zippers, storm flap with laser-cut ventilation ports.',
    heightClass: 'h-[300px] sm:h-[350px] lg:h-[370px]'
  },
  {
    id: 4,
    title: 'Navy High-Waisted Fluid Trouser',
    category: 'wovens',
    categoryLabel: 'Wovens',
    gsm: '260 GSM',
    moq: '350 units MOQ',
    leadTime: '4-5 Weeks',
    fabric: '65/35 Viscose/Polyester Fluid Drape',
    image: navyTrouserImg,
    description: 'Tailored wide leg with clean front fly, soft fluid drape, wrinkle-resistant finish, and slash pockets.',
    heightClass: 'h-[420px] sm:h-[480px] lg:h-[520px]'
  },
  {
    id: 5,
    title: '280 GSM Mercerized Heavy Tee',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    gsm: '280 GSM',
    moq: '300 units MOQ',
    leadTime: '3-4 Weeks',
    fabric: '100% Long-Staple Pima Cotton Single Jersey',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Silk-touch caustic mercerized finish, heavy 1.25" bound collar, anti-twist torque side seams.',
    heightClass: 'h-[280px] sm:h-[320px] lg:h-[350px]'
  },
  {
    id: 6,
    title: '3-Layer Seam-Taped Storm Parka',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    gsm: '210 GSM',
    moq: '400 units MOQ',
    leadTime: '7-8 Weeks',
    fabric: '3-Layer PTFE Membrane Lamination (20k/20k)',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    description: 'Fully seam-sealed outer shell, articulated storm hood with dual cinch cords, bonded zipper garage.',
    heightClass: 'h-[430px] sm:h-[490px] lg:h-[540px]'
  },
  {
    id: 7,
    title: 'Brown Interlock Pintuck Flare Trouser',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    gsm: '320 GSM',
    moq: '300 units MOQ',
    leadTime: '4 Weeks',
    fabric: 'Cotton/Polyester Double-Knit Interlock',
    image: brownInterlockImg,
    description: 'Structured double-knit interlock fabric with stitched pintuck front crease, tailored waistband, and flare hemline.',
    heightClass: 'h-[410px] sm:h-[470px] lg:h-[510px]'
  },
  {
    id: 8,
    title: 'Japanese Twill Heavy Overshirt',
    category: 'wovens',
    categoryLabel: 'Wovens',
    gsm: '320 GSM',
    moq: '500 units MOQ',
    leadTime: '5-7 Weeks',
    fabric: '100% Ring-Spun Compact Cotton Twill',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    description: 'Clean felled interior seams, corozo nut buttons, dual drop-in chest cargo pockets, vintage garment stone wash.',
    heightClass: 'h-[320px] sm:h-[370px] lg:h-[400px]'
  },
  {
    id: 9,
    title: 'Burgundy 3-Thread Track Suit',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    gsm: '280 GSM',
    moq: '300 units MOQ',
    leadTime: '4 Weeks',
    fabric: '70/30 Cotton/Poly 3-Thread Brushed Fleece',
    image: burgundyTracksuitImg,
    description: 'Brushed fleece interior, contrast side panel racing stripes, elasticated waistband with drawcords, and ribbed cuffs.',
    heightClass: 'h-[440px] sm:h-[500px] lg:h-[530px]'
  },
  {
    id: 10,
    title: 'Quilted Thermal Insulator Jacket',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    gsm: '240 GSM',
    moq: '350 units MOQ',
    leadTime: '6 Weeks',
    fabric: 'Recycled Micro-Ripstop with Primaloft Insulation',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    description: 'Onion quilting pattern, lightweight heat-retention thermal core, contrast grosgrain tape binded edges.',
    heightClass: 'h-[300px] sm:h-[340px] lg:h-[370px]'
  },
  {
    id: 11,
    title: 'Cream Double-Pleated Tailored Trouser',
    category: 'wovens',
    categoryLabel: 'Wovens',
    gsm: '270 GSM',
    moq: '300 units MOQ',
    leadTime: '4-5 Weeks',
    fabric: '65/35 Viscose/Polyester Drape Suiting',
    image: creamPleatedImg,
    description: 'High-waisted wide leg silhouette with double front pleats, waistband button tabs, deep inseam, and tailored drape.',
    heightClass: 'h-[420px] sm:h-[480px] lg:h-[510px]'
  },
  {
    id: 12,
    title: 'Rose Interlock Matching Lounge Set',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    gsm: '220 GSM',
    moq: '300 units MOQ',
    leadTime: '3-4 Weeks',
    fabric: '40/60 Viscose/Polyester Soft Interlock',
    image: roseLoungeSetImg,
    description: 'Two-piece matching set with oversized drop-shoulder chest pocket tee and relaxed cargo lounge trousers.',
    heightClass: 'h-[350px] sm:h-[400px] lg:h-[440px]'
  }
];
