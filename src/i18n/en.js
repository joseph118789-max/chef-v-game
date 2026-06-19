// English translations
// IMPORTANT: Only English text. No Chinese/Malay characters mixed in.

export default {
  meta: {
    code: 'en',
    label: 'English',
    flag: 'EN',
  },

  header: {
    title: 'Chef V Western Food',
    subtitle: 'Restoran Makanan Barat CHEF V · Western Restaurant',
    whatsappOrder: '📞 WhatsApp Order',
    chatWithUs: 'Chat with us',
  },

  hero: {
    badge: '🍽️ 7 Branches Across Klang Valley',
    title1: 'Affordable Western Food',
    title2: 'Starting from RM 9.90!',
    description: 'Freshly cooked with premium spices · Dine-in or Takeaway',
    viewMenu: 'View Menu',
    findUs: 'Find Us',
  },

  nav: {
    home: 'Restaurant Home',
    menu: 'Menu',
    album: 'Collection Board',
    spin: 'Spin Package',
    shop: 'Stardust Shop',
    admin: 'Admin rates',
    members: 'Members',
    promos: 'Promotions',
    gallery: 'Gallery',
    locations: 'Locations',
  },

  auth: {
    signIn: 'Sign In',
    signInGoogle: 'Sign In with Google to Join',
  },

  home: {
    gameBadge: '🍽️ Ultimate Gourmet Collector Game is Live!',
    gameDesc: 'Upload dining receipts → Spin for booster packs & draw cards → Collect meal cards! Duplicates automatically convert into Stardust!',
    branches: '7 Branches Across Klang Valley',
    scrollHint: 'Slowly scrolling down to Interactive Food Gallery!',
  },

  cards: {
    common: 'Common Drop Card',
    rare: 'Rare Drop Card',
    legendary: 'Legendary Drop Card',
    ultimate: 'Ultimate Drop Card',
    inspect: 'Inspect Food Card',
  },

  menu: {
    sectionTitle: 'Our Menu',
    sectionSub: 'Hearty Western meals · Cooked with premium spices',
    categories: {
      mains: '🍽️ Mains',
      baked: '🧀 Cheese Baked Rice',
      drinks: '🥤 Drinks',
    },
    drinksSections: {
      cold: '🥤 Cold Drinks',
      king: '👑 King Size Drinks',
      hot: '☕ Hot Drinks',
      canned: '🥫 Canned Drinks',
    },
  },

  // Mains — name, nameCn, nameMs (Malay), descEn, descMy
  mains: [
    { id: 1,  name: 'Super Meal',                    nameMy: 'Hidangan Istimewa',       price: 9.90,  desc: 'Chicken chop with fries & coleslaw',                          descMy: 'Hidangan ayam goreng dengan kentang goreng & coleslaw', tag: 'BEST SELLER' },
    { id: 2,  name: 'Set A',                         nameMy: 'Set A',                   price: 17.90, desc: 'Beef steak set with sides',                                   descMy: 'Set stik daging lembu dengan hidangan sampingan',          tag: 'POPULAR' },
    { id: 3,  name: 'Set B',                         nameMy: 'Set B',                   price: 19.90, desc: 'Chicken chop set with premium sides',                         descMy: 'Set ayam goreng dengan hidangan sampingan premium',         tag: '' },
    { id: 4,  name: 'Set C',                         nameMy: 'Set C',                   price: 21.90, desc: 'Fish fillet set with all trimmings',                          descMy: 'Set filet ikan dengan semua hidangan sampingan',             tag: '' },
    { id: 5,  name: 'Set D',                         nameMy: 'Set D',                   price: 23.90, desc: 'Mixed grill combo - beef + chicken + fish',                   descMy: 'Kombo panggang campuran - daging lembu + ayam + ikan',      tag: '' },
    { id: 6,  name: 'Chef V Mixed Grill',            nameMy: 'Panggang Campuran Chef V', price: 28.90, desc: 'Beef steak + Chicken chop + Fish fillet',                    descMy: 'Stik daging lembu + Ayam goreng + Filet ikan',              tag: 'PREMIUM' },
    { id: 7,  name: 'Chicken Chop Platter',          nameMy: 'Hidangan Ayam Goreng',     price: 12.90, desc: 'Grilled chicken chop with fries & salad',                    descMy: 'Ayam goreng panggang dengan kentang goreng & salad',         tag: '' },
    { id: 8,  name: 'Steak Platter',                 nameMy: 'Hidangan Stik',            price: 15.90, desc: 'Juicy beef steak with sides',                                 descMy: 'Stik daging lembu yang berjus dengan hidangan sampingan',     tag: '' },
    { id: 9,  name: 'Malaysian Chicken Burger',      nameMy: 'Burger Ayam Malaysia',     price: 13.90, desc: 'Classic Malaysian-style chicken burger',                      descMy: 'Burger ayam gaya Malaysia klasik',                            tag: '' },
    { id: 10, name: 'Grilled Soy Chicken Burger',    nameMy: 'Burger Ayam Kicap Panggang', price: 14.90, desc: 'Grilled soy-glazed chicken burger',                          descMy: 'Burger ayam panggang dengan kicap',                           tag: '' },
  ],

  // Cheese Baked Rice
  baked: [
    { id: 101, name: 'Chicken Chop Baked',         nameMy: 'Nasi Bakar Ayam',           price: 14.90, desc: 'Cheesy baked rice with grilled chicken chop',                  descMy: 'Nasi bakar keju dengan ayam goreng panggang',          tag: '' },
    { id: 102, name: 'Twins Meat Baked',          nameMy: 'Nasi Bakar Berkembar',      price: 17.90, desc: 'Cheesy baked rice with chicken chop + fish fillet',            descMy: 'Nasi bakar keju dengan ayam goreng + filet ikan',       tag: 'CHEF PICK' },
    { id: 103, name: 'Sausage Baked',             nameMy: 'Nasi Bakar Sosej',          price: 13.90, desc: 'Cheesy baked rice with jumbo cheese sausage',                  descMy: 'Nasi bakar keju dengan sosej keju jumbo',              tag: '' },
    { id: 104, name: 'Crispy Fish Fillet Baked',  nameMy: 'Nasi Bakar Filet Ikan',     price: 16.90, desc: 'Cheesy baked rice with crispy fish fillet',                    descMy: 'Nasi bakar keju dengan filet ikan garing',              tag: '' },
    { id: 105, name: 'Beef Slice Baked',          nameMy: 'Nasi Bakar Daging Lembu',   price: 14.90, desc: 'Cheesy baked rice with tender beef slices',                    descMy: 'Nasi bakar keju dengan hirisan daging lembu lembut',    tag: '' },
    { id: 106, name: 'Seafood Baked',             nameMy: 'Nasi Bakar Makanan Laut',   price: 15.90, desc: 'Cheesy baked rice with mixed seafood',                         descMy: 'Nasi bakar keju dengan makanan laut campuran',          tag: '' },
    { id: 107, name: 'Double Cheese Baked',       nameMy: 'Nasi Bakar Keju Berganda',  price: 14.90, desc: 'Extra cheesy baked rice - for cheese lovers',                  descMy: 'Nasi bakar keju tambahan - untuk pencinta keju',         tag: '' },
    { id: 108, name: 'Salmon Baked',              nameMy: 'Nasi Bakar Salmon',         price: 33.90, desc: 'Premium cheesy baked rice with grilled salmon',                descMy: 'Nasi bakar keju premium dengan salmon panggang',         tag: '' },
    { id: 109, name: 'Smoked Duck Baked',         nameMy: 'Nasi Bakar Itik Salai',    price: 14.90, desc: 'Cheesy baked rice with smoky duck breast',                     descMy: 'Nasi bakar keju dengan dada itik salai',                 tag: '' },
  ],

  // Drinks
  drinks: [
    // Cold
    { id: 201, name: 'Peach Olong Tea',            nameMy: 'Teh Olong Pic',             price: 4.90, desc: 'Refreshing peach iced tea',                  descMy: 'Teh pic ais yang menyegarkan' },
    { id: 202, name: 'Luo Han Guo',                nameMy: 'Luo Han Guo',               price: 4.90, desc: 'Traditional cooling herbal drink',           descMy: 'Minuman herba penyejuk tradisional' },
    { id: 203, name: 'Sugar Cane',                 nameMy: 'Tebu',                      price: 4.90, desc: 'Fresh sugar cane drink',                      descMy: 'Minuman tebu segar' },
    { id: 204, name: 'Honey Lemon',                nameMy: 'Lemon Madu',                price: 4.90, desc: 'Honey-sweetened lemon drink',                descMy: 'Minuman lemon dimaniskan dengan madu' },
    { id: 205, name: 'Passion Fruit Ice Jelly',    nameMy: 'Ais Jelly Buah Markisa',    price: 4.90, desc: 'Passion fruit with ice jelly',               descMy: 'Buah markisa dengan ais jelly' },
    // King size
    { id: 206, name: 'King Size Watermelon Juice', nameMy: 'Jus Tembikai Saiz Raja',    price: 9.90, desc: 'Large fresh watermelon juice',               descMy: 'Jus tembikai segar bersaiz besar' },
    { id: 207, name: 'King Size Orange Juice',     nameMy: 'Jus Oren Saiz Raja',        price: 9.90, desc: 'Large fresh orange juice',                   descMy: 'Jus oren segar bersaiz besar' },
    { id: 208, name: 'King Size Apple Juice',      nameMy: 'Jus Epal Saiz Raja',        price: 9.90, desc: 'Large fresh apple juice',                    descMy: 'Jus epal segar bersaiz besar' },
    { id: 209, name: 'King Size Carrot Milk',      nameMy: 'Susu Lobak Saiz Raja',      price: 12.90, desc: 'Large carrot & milk blend',                 descMy: 'Campuran lobak & susu bersaiz besar' },
    { id: 210, name: 'King Size Ice Lemon Tea',    nameMy: 'Teh Lemon Ais Saiz Raja',   price: 8.90, desc: 'Large iced lemon tea',                       descMy: 'Teh lemon ais bersaiz besar' },
    { id: 211, name: 'King Size Red Bean Milk',    nameMy: 'Susu Kacang Merah Saiz Raja', price: 13.90, desc: 'Large red bean with milk ice',            descMy: 'Kacang merah bersaiz besar dengan ais susu' },
    { id: 212, name: 'King Size Ribena',           nameMy: 'Ribena Saiz Raja',          price: 12.90, desc: 'Large ice Ribena with lime',                descMy: 'Ribena ais bersaiz besar dengan limau' },
    // Hot
    { id: 213, name: 'Chocolate',                  nameMy: 'Coklat',                    price: 5.90, desc: 'Hot chocolate',                              descMy: 'Coklat panas' },
    { id: 214, name: 'White Coffee',               nameMy: 'Kopi Putih',                price: 4.90, desc: 'Classic Malaysian white coffee',             descMy: 'Kopi putih Malaysia klasik' },
    { id: 215, name: 'Earl Grey Tea',              nameMy: 'Teh Earl Grey',             price: 3.90, desc: 'Hot Earl Grey tea',                          descMy: 'Teh Earl Grey panas' },
    { id: 216, name: 'Green Tea',                  nameMy: 'Teh Hijau',                 price: 3.90, desc: 'Hot green tea',                              descMy: 'Teh hijau panas' },
    { id: 217, name: 'Lemon Tea',                  nameMy: 'Teh Lemon',                 price: 3.90, desc: 'Hot lemon tea',                              descMy: 'Teh lemon panas' },
    { id: 218, name: 'Cappuccino',                 nameMy: 'Cappuccino',                price: 4.90, desc: 'Hot cappuccino',                             descMy: 'Cappuccino panas' },
    // Canned
    { id: 219, name: 'Coke',                       nameMy: 'Coca-Cola',                 price: 3.90, desc: 'Canned Coke',                                descMy: 'Coca-Cola tin' },
    { id: 220, name: 'Sprite',                     nameMy: 'Sprite',                    price: 3.90, desc: 'Canned Sprite',                              descMy: 'Sprite tin' },
    { id: 221, name: '100 Plus',                   nameMy: '100 Plus',                  price: 3.90, desc: 'Canned 100 Plus isotonic',                  descMy: '100 Plus tin isotonik' },
    { id: 222, name: 'Mineral Water',              nameMy: 'Air Mineral',               price: 2.90, desc: 'Mineral water',                              descMy: 'Air mineral' },
  ],

  promotions: [
    { title: 'Super Meal Deal', titleMy: 'Tawaran Istimewa',       price: 'RM 9.90', desc: 'Starting from just RM 9.90!',                                       descMy: 'Bermula dari hanya RM 9.90!' },
    { title: 'Free Lunch Tea',  titleMy: 'Teh Makan Tengah Hari Percuma', price: 'FREE', desc: 'Mon-Fri 11AM-3PM with any meal',                              descMy: 'Isnin-Jumaat 11AM-3PM dengan sebarang hidangan' },
    { title: 'Free Ice Cream',  titleMy: 'Aiskrim Percuma',        price: 'FREE', desc: 'Daily dinner 3PM-10:30PM | Sat-Sun ALL DAY',                       descMy: 'Makan malam harian 3PM-10:30PM | Sabtu-Ahad SEPANJANG HARI' },
    { title: 'Birthday Treat',  titleMy: 'Hadiriah Hari Jadi',     price: 'FREE', desc: 'Free Chicken Chop meal during your birthday month! (show IC)',     descMy: 'Hidangan ayam goreng percuma pada bulan hari jadi anda! (tunjuk IC)' },
  ],

  promo: {
    sectionTitle: 'Special Offers',
    sectionSub: 'Great deals every day at Chef V!',
    termsTitle: 'Terms & Conditions',
    terms: [
      'Birthday free meal: Valid for dine-in only, 1st celebrant no minimum spend, 2nd & subsequent require RM25+ spend',
      'Free drinks apply Mon-Fri 11AM-3PM (weekends excluded)',
      'Free ice cream applies daily 3PM-10:30PM, all day Sat-Sun',
    ],
  },

  gallery: {
    sectionTitle: 'Food Gallery',
    sectionSub: 'Real photos from our restaurant',
  },

  // Gallery image alt text - English only here
  galleryAlt: {
    1: 'Super Meal - RM 9.90',
    2: 'Signature Grilled Chicken',
    3: 'Baked Rice & Sides',
    4: 'Chef V Mixed Grill Platter',
    5: 'Grilled Chicken with Spaghetti',
    6: 'Chef V Restaurant Interior',
    7: 'Restaurant Ambience',
    8: 'Dining Experience',
    9: 'Chef V Menu',
    10: 'Western Food Spread',
    11: 'Grilled Chicken Platter',
    12: 'Spaghetti & Chicken Chop',
    13: 'Steak & Sides',
    14: 'Grilled Platter',
    15: 'Mixed Grill Close-up',
    16: 'Signature Dishes',
    17: 'Western Food Spread',
    18: 'Chicken Chop Platter',
    19: 'Chef V Set Meal',
    20: 'Restaurant Food Display',
    21: 'Chef V Signature',
    22: 'Set Meal Deals',
    23: 'Western Platters',
    24: 'Grilled Chicken',
    25: 'Mixed Grill Platter',
    26: 'Chicken Chop Platter',
    27: 'Chef V Dining',
  },

  locations: {
    sectionTitle: 'Our Locations',
    sectionSub: '7 outlets to serve you across Klang Valley',
    contactTitle: '📞 Order & Inquiries',
    whatsapp: 'WhatsApp',
    callGrab: 'Call & Grab available at all locations',
  },

  // Location data — addresses/phone stay the same, just translated names & notes
  branches: [
    { id: 1, name: 'Seri Kembangan',           nameMy: 'Seri Kembangan',          address: 'Jalan PP 33, Taman Pinggiran Putra, 43400 Seri Kembangan, Selangor', phone: '+6016-610 6352', note: 'Happy Food Court', noteMy: 'Medan Makan Gembira', image: '/gallery/branch-seri-kembangan.jpg' },
    { id: 2, name: 'P.P. Seri Kembangan',     nameMy: 'P.P. Seri Kembangan',     address: 'No. 34, Jalan PSK 8, Pusat Perdagangan Seri Kembangan, 43300 Seri Kembangan, Selangor', phone: '+6010-336 7741', note: '', noteMy: '', image: '/gallery/branch-ppsk.jpg' },
    { id: 3, name: 'Bandar Puteri Puchong',   nameMy: 'Bandar Puteri Puchong',   address: 'No. 8, Jalan Puteri 7/8, Bandar Puteri, 47100 Puchong, Selangor', phone: '+6011-1330 9505', note: '', noteMy: '', image: '/gallery/branch-puchong.jpg' },
    { id: 4, name: 'Sungai Way Petaling Jaya', nameMy: 'Sungai Way Petaling Jaya', address: 'No. 114, Jalan SS9A/1, Sungai Way, 47300 Petaling Jaya, Selangor', phone: '+6011-1330 9707', note: '', noteMy: '', image: '/gallery/branch-sungai-way.jpg' },
    { id: 5, name: 'SS15 Subang Jaya',        nameMy: 'SS15 Subang Jaya',        address: 'Ground Floor, No. 96, Jalan SS15/4, 47500 Subang Jaya, Selangor', phone: '+6010-878 5651', note: '', noteMy: '', image: '/gallery/branch-ss15.jpg' },
    { id: 6, name: 'Bandar Menjalara',        nameMy: 'Bandar Menjalara',        address: 'No. 95, Jalan 8/62A, Bandar Menjalara, 52200 Kuala Lumpur', phone: '+6010-343 8137', note: '', noteMy: '', image: '/gallery/branch-menjalara.jpg' },
    { id: 7, name: 'Bukit Tinggi 2',          nameMy: 'Bukit Tinggi 2',          address: 'No. 15, Lorong Batu Nilam 20A, Bandar Bukit Tinggi 2, 41200 Klang, Selangor', phone: '+6010-336 7742', note: '', noteMy: '', image: '/gallery/branch-bukit-tinggi.jpg' },
  ],

  footer: {
    tagline: 'Restoran Makanan Barat CHEF V · Western Restaurant',
    brand: 'Owned by FOODASTIC Sdn. Bhd.',
    instagram: '📸 Instagram',
    facebook: '👍 Facebook',
    copyright: '© 2026 Chef V Western Food. All rights reserved.',
  },
};
