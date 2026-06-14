/**
 * menuData.ts
 * Merged restaurant data: menu items, branches, gallery images
 * Combines data from chefv-website i18n files and chef-v-game gallery
 */

// ---- Menu Item Types ----
export interface MenuItem {
  id: number;
  name: string;
  nameMy: string;
  price: number;
  desc: string;
  descMy: string;
  tag: string;
}

export interface DrinkItem {
  id: number;
  name: string;
  nameMy: string;
  price: number;
  desc: string;
  descMy: string;
}

export interface Branch {
  id: number;
  name: string;
  nameMy: string;
  address: string;
  phone: string;
  note: string;
  noteMy: string;
  image: string;
}

// ---- Mains ----
export const MAINS: MenuItem[] = [
  { id: 1,  name: 'Super Meal',                       nameMy: 'Hidangan Istimewa',         price: 9.90,  desc: 'Chicken chop with fries & coleslaw',                               descMy: 'Hidangan ayam goreng dengan kentang goreng & coleslaw', tag: 'BEST SELLER' },
  { id: 2,  name: 'Set A',                            nameMy: 'Set A',                     price: 17.90, desc: 'Beef steak set with sides',                                        descMy: 'Set stik daging lembu dengan hidangan sampingan',          tag: 'POPULAR' },
  { id: 3,  name: 'Set B',                            nameMy: 'Set B',                     price: 19.90, desc: 'Chicken chop set with premium sides',                              descMy: 'Set ayam goreng dengan hidangan sampingan premium',         tag: '' },
  { id: 4,  name: 'Set C',                            nameMy: 'Set C',                     price: 21.90, desc: 'Fish fillet set with all trimmings',                               descMy: 'Set filet ikan dengan semua hidangan sampingan',            tag: '' },
  { id: 5,  name: 'Set D',                            nameMy: 'Set D',                     price: 23.90, desc: 'Mixed grill combo - beef + chicken + fish',                        descMy: 'Kombo panggang campuran - daging lembu + ayam + ikan',     tag: '' },
  { id: 6,  name: 'Chef V Mixed Grill',               nameMy: 'Panggang Campuran Chef V',  price: 28.90, desc: 'Beef steak + Chicken chop + Fish fillet',                           descMy: 'Stik daging lembu + Ayam goreng + Filet ikan',             tag: 'PREMIUM' },
  { id: 7,  name: 'Chicken Chop Platter',           nameMy: 'Hidangan Ayam Goreng',       price: 12.90, desc: 'Grilled chicken chop with fries & salad',                         descMy: 'Ayam goreng panggang dengan kentang goreng & salad',      tag: '' },
  { id: 8,  name: 'Steak Platter',                  nameMy: 'Hidangan Stik',              price: 15.90, desc: 'Juicy beef steak with sides',                                      descMy: 'Stik daging lembu yang berjus dengan hidangan sampingan',  tag: '' },
  { id: 9,  name: 'Malaysian Chicken Burger',        nameMy: 'Burger Ayam Malaysia',       price: 13.90, desc: 'Classic Malaysian-style chicken burger',                         descMy: 'Burger ayam gaya Malaysia klasik',                         tag: '' },
  { id: 10, name: 'Grilled Soy Chicken Burger',      nameMy: 'Burger Ayam Kicap Panggang', price: 14.90, desc: 'Grilled soy-glazed chicken burger',                                 descMy: 'Burger ayam panggang dengan kicap',                        tag: '' },
];

// ---- Baked Rice ----
export const BAKED: MenuItem[] = [
  { id: 101, name: 'Chicken Chop Baked',        nameMy: 'Nasi Bakar Ayam',          price: 14.90, desc: 'Cheesy baked rice with grilled chicken chop',                 descMy: 'Nasi bakar keju dengan ayam goreng panggang',         tag: '' },
  { id: 102, name: 'Twins Meat Baked',         nameMy: 'Nasi Bakar Berkembar',     price: 17.90, desc: 'Cheesy baked rice with chicken chop + fish fillet',           descMy: 'Nasi bakar keju dengan ayam goreng + filet ikan',      tag: 'CHEF PICK' },
  { id: 103, name: 'Sausage Baked',            nameMy: 'Nasi Bakar Sosej',         price: 13.90, desc: 'Cheesy baked rice with jumbo cheese sausage',                 descMy: 'Nasi bakar keju dengan sosej keju jumbo',             tag: '' },
  { id: 104, name: 'Crispy Fish Fillet Baked', nameMy: 'Nasi Bakar Filet Ikan',    price: 16.90, desc: 'Cheesy baked rice with crispy fish fillet',                   descMy: 'Nasi bakar keju dengan filet ikan garing',             tag: '' },
  { id: 105, name: 'Beef Slice Baked',         nameMy: 'Nasi Bakar Daging Lembu',  price: 14.90, desc: 'Cheesy baked rice with tender beef slices',                   descMy: 'Nasi bakar keju dengan hirisan daging lembu lembut',   tag: '' },
  { id: 106, name: 'Seafood Baked',            nameMy: 'Nasi Bakar Makanan Laut',  price: 15.90, desc: 'Cheesy baked rice with mixed seafood',                          descMy: 'Nasi bakar keju dengan makanan laut campuran',        tag: '' },
  { id: 107, name: 'Double Cheese Baked',      nameMy: 'Nasi Bakar Keju Berganda', price: 14.90, desc: 'Extra cheesy baked rice - for cheese lovers',                  descMy: 'Nasi bakar keju tambahan - untuk pencinta keju',       tag: '' },
  { id: 108, name: 'Salmon Baked',             nameMy: 'Nasi Bakar Salmon',        price: 33.90, desc: 'Premium cheesy baked rice with grilled salmon',               descMy: 'Nasi bakar keju premium dengan salmon panggang',      tag: '' },
  { id: 109, name: 'Smoked Duck Baked',        nameMy: 'Nasi Bakar Itik Salai',   price: 14.90, desc: 'Cheesy baked rice with smoky duck breast',                    descMy: 'Nasi bakar keju dengan dada itik salai',              tag: '' },
];

// ---- Drinks ----
export const DRINKS: DrinkItem[] = [
  { id: 201, name: 'Peach Olong Tea',             nameMy: 'Teh Olong Pic',              price: 4.90,  desc: 'Refreshing peach iced tea',                   descMy: 'Teh pic ais yang menyegarkan' },
  { id: 202, name: 'Luo Han Guo',                 nameMy: 'Luo Han Guo',                price: 4.90,  desc: 'Traditional cooling herbal drink',            descMy: 'Minuman herba penyejuk tradisional' },
  { id: 203, name: 'Sugar Cane',                 nameMy: 'Tebu',                       price: 4.90,  desc: 'Fresh sugar cane drink',                     descMy: 'Minuman tebu segar' },
  { id: 204, name: 'Honey Lemon',                 nameMy: 'Lemon Madu',                 price: 4.90,  desc: 'Honey-sweetened lemon drink',               descMy: 'Minuman lemon dimaniskan dengan madu' },
  { id: 205, name: 'Passion Fruit Ice Jelly',     nameMy: 'Ais Jelly Buah Markisa',     price: 4.90,  desc: 'Passion fruit with ice jelly',              descMy: 'Buah markisa dengan ais jelly' },
  { id: 206, name: 'King Size Watermelon Juice',  nameMy: 'Jus Tembikai Saiz Raja',     price: 9.90,  desc: 'Large fresh watermelon juice',              descMy: 'Jus tembikai segar bersaiz besar' },
  { id: 207, name: 'King Size Orange Juice',     nameMy: 'Jus Oren Saiz Raja',         price: 9.90,  desc: 'Large fresh orange juice',                  descMy: 'Jus oren segar bersaiz besar' },
  { id: 208, name: 'King Size Apple Juice',       nameMy: 'Jus Epal Saiz Raja',         price: 9.90,  desc: 'Large fresh apple juice',                   descMy: 'Jus epal segar bersaiz besar' },
  { id: 209, name: 'King Size Carrot Milk',       nameMy: 'Susu Lobak Saiz Raja',       price: 12.90, desc: 'Large carrot & milk blend',                descMy: 'Campuran lobak & susu bersaiz besar' },
  { id: 210, name: 'King Size Ice Lemon Tea',     nameMy: 'Teh Lemon Ais Saiz Raja',    price: 8.90,  desc: 'Large iced lemon tea',                      descMy: 'Teh lemon ais bersaiz besar' },
  { id: 211, name: 'King Size Red Bean Milk',     nameMy: 'Susu Kacang Merah Saiz Raja', price: 13.90, desc: 'Large red bean with milk ice',             descMy: 'Kacang merah bersaiz besar dengan ais susu' },
  { id: 212, name: 'King Size Ribena',            nameMy: 'Ribena Saiz Raja',           price: 12.90, desc: 'Large ice Ribena with lime',                 descMy: 'Ribena ais bersaiz besar dengan limau' },
  { id: 213, name: 'Chocolate',                   nameMy: 'Coklat',                     price: 5.90,  desc: 'Hot chocolate',                             descMy: 'Coklat panas' },
  { id: 214, name: 'White Coffee',                nameMy: 'Kopi Putih',                 price: 4.90,  desc: 'Classic Malaysian white coffee',            descMy: 'Kopi putih Malaysia klasik' },
  { id: 215, name: 'Earl Grey Tea',               nameMy: 'Teh Earl Grey',              price: 3.90,  desc: 'Hot Earl Grey tea',                         descMy: 'Teh Earl Grey panas' },
  { id: 216, name: 'Green Tea',                   nameMy: 'Teh Hijau',                   price: 3.90,  desc: 'Hot green tea',                             descMy: 'Teh hijau panas' },
  { id: 217, name: 'Lemon Tea',                   nameMy: 'Teh Lemon',                   price: 3.90,  desc: 'Hot lemon tea',                             descMy: 'Teh lemon panas' },
  { id: 218, name: 'Cappuccino',                  nameMy: 'Cappuccino',                 price: 4.90,  desc: 'Hot cappuccino',                            descMy: 'Cappuccino panas' },
  { id: 219, name: 'Coke',                        nameMy: 'Coca-Cola',                  price: 3.90,  desc: 'Canned Coke',                               descMy: 'Coca-Cola tin' },
  { id: 220, name: 'Sprite',                      nameMy: 'Sprite',                     price: 3.90,  desc: 'Canned Sprite',                             descMy: 'Sprite tin' },
  { id: 221, name: '100 Plus',                    nameMy: '100 Plus',                   price: 3.90,  desc: 'Canned 100 Plus isotonic',                  descMy: '100 Plus tin isotonik' },
  { id: 222, name: 'Mineral Water',               nameMy: 'Air Mineral',                price: 2.90,  desc: 'Mineral water',                             descMy: 'Air mineral' },
];

// ---- Branches ----
export const BRANCHES: Branch[] = [
  { id: 1, name: 'Seri Kembangan',            nameMy: 'Seri Kembangan',           address: 'Jalan PP 33, Taman Pinggiran Putra, 43400 Seri Kembangan, Selangor', phone: '+6016-610 6352', note: 'Happy Food Court', noteMy: 'Medan Makan Gembira', image: '/gallery/branch-seri-kembangan.jpg' },
  { id: 2, name: 'P.P. Seri Kembangan',      nameMy: 'P.P. Seri Kembangan',    address: 'No. 34, Jalan PSK 8, Pusat Perdagangan Seri Kembangan, 43300 Seri Kembangan, Selangor', phone: '+6010-336 7741', note: '', noteMy: '', image: '/gallery/branch-ppsk.jpg' },
  { id: 3, name: 'Bandar Puteri Puchong',    nameMy: 'Bandar Puteri Puchong',  address: 'No. 8, Jalan Puteri 7/8, Bandar Puteri, 47100 Puchong, Selangor', phone: '+6011-1330 9505', note: '', noteMy: '', image: '/gallery/branch-puchong.jpg' },
  { id: 4, name: 'Sungai Way Petaling Jaya', nameMy: 'Sungai Way Petaling Jaya', address: 'No. 114, Jalan SS9A/1, Sungai Way, 47300 Petaling Jaya, Selangor', phone: '+6011-1330 9707', note: '', noteMy: '', image: '/gallery/branch-sungai-way.jpg' },
  { id: 5, name: 'SS15 Subang Jaya',         nameMy: 'SS15 Subang Jaya',       address: 'Ground Floor, No. 96, Jalan SS15/4, 47500 Subang Jaya, Selangor', phone: '+6010-878 5651', note: '', noteMy: '', image: '/gallery/branch-ss15.jpg' },
  { id: 6, name: 'Bandar Menjalara',          nameMy: 'Bandar Menjalara',       address: 'No. 95, Jalan 8/62A, Bandar Menjalara, 52200 Kuala Lumpur', phone: '+6010-343 8137', note: '', noteMy: '', image: '/gallery/branch-menjalara.jpg' },
  { id: 7, name: 'Bukit Tinggi 2',           nameMy: 'Bukit Tinggi 2',        address: 'No. 15, Lorong Batu Nilam 20A, Bandar Bukit Tinggi 2, 41200 Klang, Selangor', phone: '+6010-336 7742', note: '', noteMy: '', image: '/gallery/branch-bukit-tinggi.jpg' },
];

// ---- Gallery Images ----
export const GALLERY_IMAGES: string[] = [
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.42---63e9786f-c982-487f-94c9-2dcdf7f771b1.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.44_1---b710eed3-4171-44fc-bd24-c198493b5014.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.44_3---7f136ad7-3aba-41af-ae4f-b37027628fbd.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.46---027abe06-586c-4bd6-a7e7-e5f68ec4b701.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.48---4d43794d-9d00-4385-93c8-b0de27f5fd53.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.52---53de03e2-e65e-4e55-85f9-c33efc62adda.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.53---4fa3d1bf-e17f-4a2b-93f2-03c05b23b6b6.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.53_1---38318d48-4ee0-4ade-be66-07053be69b19.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.53_2---98bf7e10-a297-4a4f-b9cb-f56bb1bbd8f3.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.54---39b760a5-61fd-4b4d-96b9-3684482426ff.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.54_1---580e206d-b8b7-4171-8c9c-8fa5aa6c7b3f.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.54_2---932a32bb-22c3-4304-91be-45928de05997.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.55---7dc71c06-c005-4cd4-bb97-9c1cbeeecfaa.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.55_1---f61ae608-a44b-4046-8168-49d6ca231dff.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.57---a3dd192c-cef1-4b0c-87e8-073930b230d8.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.57_1---76547806-d06f-41e1-bece-150c40d22bb9.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.58---e3dfa61a-3ff0-4f07-a60b-6db2c7f87b4c.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.58_1---72cb9df1-c28c-4725-9118-e5ba429d00a4.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.59---571e0ee3-1827-4ae4-a91e-d4351b34064c.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.47.59_1---b1cd966b-8f4b-4afa-8c83-c44e366c59b9.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00---0cce5bd9-b88a-4762-a00c-e76982e30ffb.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00_1---3175a809-3e7e-4d96-8041-41bcdc2c06e7.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00_2---bf9dfb2d-8b66-49fc-9849-385b9b5472f4.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.00_3---2be19105-2bb4-490d-9201-d6a50b663baf.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.01---c1f328b4-a222-4a29-8e56-ef8f4fb2e53f.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.01_1---147413b8-3249-47a4-80bc-b2fe1a6676c2.jpg',
  '/gallery/WhatsApp_Image_2026-06-01_at_23.48.02---0bfcf528-e2d8-4db9-85ca-53cd563d5026.jpg',
];

// ---- Menu Categories ----
export type MenuCategory = 'mains' | 'baked' | 'drinks';

export const MENU_CATEGORIES: { key: MenuCategory; label: string; labelMy: string }[] = [
  { key: 'mains',   label: '🍽️ Mains',          labelMy: '🍽️ Hidangan' },
  { key: 'baked',   label: '🧀 Cheese Baked Rice', labelMy: '🧀 Nasi Bakar Keju' },
  { key: 'drinks',  label: '🥤 Drinks',          labelMy: '🥤 Minuman' },
];

// ---- Helper: get display name/desc by language ----
export function getDisplayName(item: MenuItem | DrinkItem, lang: 'en' | 'cn' | 'ms'): string {
  if (lang === 'ms') return (item as MenuItem).nameMy || item.name;
  return item.name;
}

export function getDisplayDesc(item: MenuItem | DrinkItem, lang: 'en' | 'cn' | 'ms'): string {
  if (lang === 'ms') return (item as MenuItem).descMy || item.desc;
  return item.desc;
}
