// Bahasa Melayu (Malay) translations
// IMPORTANT: Only Malay text. No English/Chinese characters mixed in.

export default {
  meta: {
    code: 'ms',
    label: 'Bahasa',
    flag: 'MY',
  },

  header: {
    title: 'Chef V Makanan Barat',
    subtitle: 'Restoran Makanan Barat CHEF V · Western Cuisine',
    whatsappOrder: '📞 Pesan WhatsApp',
    chatWithUs: 'Hubungi kami',
  },

  hero: {
    badge: '🍽️ 7 Cawangan di Lembah Klang',
    title1: 'Makanan Barat Mampu Milik',
    title2: 'Bermula dari RM 9.90!',
    description: 'Dimasak segar dengan rempah premium · Makan di tempat atau Bungkus',
    viewMenu: 'Lihat Menu',
    findUs: 'Cari Kami',
  },

  nav: {
    home: 'Halaman Utama',
    menu: 'Menu',
    album: 'Papan Koleksi',
    spin: 'Pakej Spin',
    shop: 'Kedai Stardust',
    admin: 'Kadar Admin',
    members: 'Ahli',
    promos: 'Promosi',
    gallery: 'Galeri',
    locations: 'Cawangan',
  },

  auth: {
    signIn: 'Log Masuk',
    signInGoogle: 'Log Masuk dengan Google untuk Sertai',
  },

  home: {
    gameBadge: '🍽️ Permainan Kolektor Gourmet Ultimate Dilancarkan!',
    gameDesc: 'Muat naik resit makan → Spin untuk pek booster & tarik kad → Kumpul kad makanan! Pendua ditukar automatik kepada Stardust!',
    branches: '7 Cawangan di Lembah Klang',
    scrollHint: 'Tatal perlahan ke Galeri Makanan Interaktif!',
    branchesToast: 'Cari kami di PJ Seksyen 14, SS15 Subang, Cheras, Kepong, Puchong, Klang & Shah Alam!',
  },

  cards: {
    common: 'Kad Jatuh Biasa',
    rare: 'Kad Jatuh Langka',
    legendary: 'Kad Jatuh Legenda',
    ultimate: 'Kad Jatuh Ultimate',
    inspect: 'Periksa Kad Makanan',
  },

  menu: {
    sectionTitle: 'Menu Kami',
    sectionSub: 'Hidangan Barat yang enak · Dimasak dengan rempah premium',
    categories: {
      mains: '🍽️ Hidangan Utama',
      baked: '🧀 Nasi Bakar Keju',
      drinks: '🥤 Minuman',
    },
    drinksSections: {
      cold: '🥤 Minuman Sejuk',
      king: '👑 Minuman Saiz Raja',
      hot: '☕ Minuman Panas',
      canned: '🥫 Minuman Tin',
    },
  },

  // Hidangan utama
  mains: [
    { id: 1,  name: 'Hidangan Istimewa',        nameMy: 'Hidangan Istimewa',        price: 9.90,  desc: 'Ayam goreng dengan kentang goreng & coleslaw',                       descMy: 'Ayam goreng dengan kentang goreng & coleslaw',                  tag: 'PALING LARIS' },
    { id: 2,  name: 'Set A',                    nameMy: 'Set A',                    price: 17.90, desc: 'Set stik daging lembu dengan hidangan sampingan',                    descMy: 'Set stik daging lembu dengan hidangan sampingan',               tag: 'POPULAR' },
    { id: 3,  name: 'Set B',                    nameMy: 'Set B',                    price: 19.90, desc: 'Set ayam goreng dengan hidangan sampingan premium',                  descMy: 'Set ayam goreng dengan hidangan sampingan premium',             tag: '' },
    { id: 4,  name: 'Set C',                    nameMy: 'Set C',                    price: 21.90, desc: 'Set filet ikan dengan semua hidangan sampingan',                     descMy: 'Set filet ikan dengan semua hidangan sampingan',                tag: '' },
    { id: 5,  name: 'Set D',                    nameMy: 'Set D',                    price: 23.90, desc: 'Kombo panggang campuran - daging lembu + ayam + ikan',              descMy: 'Kombo panggang campuran - daging lembu + ayam + ikan',           tag: '' },
    { id: 6,  name: 'Panggang Campuran Chef V', nameMy: 'Panggang Campuran Chef V', price: 28.90, desc: 'Stik daging lembu + Ayam goreng + Filet ikan',                      descMy: 'Stik daging lembu + Ayam goreng + Filet ikan',                 tag: 'PREMIUM' },
    { id: 7,  name: 'Hidangan Ayam Goreng',     nameMy: 'Hidangan Ayam Goreng',     price: 12.90, desc: 'Ayam goreng panggang dengan kentang goreng & salad',                  descMy: 'Ayam goreng panggang dengan kentang goreng & salad',             tag: '' },
    { id: 8,  name: 'Hidangan Stik',            nameMy: 'Hidangan Stik',            price: 15.90, desc: 'Stik daging lembu yang berjus dengan hidangan sampingan',             descMy: 'Stik daging lembu yang berjus dengan hidangan sampingan',         tag: '' },
    { id: 9,  name: 'Burger Ayam Malaysia',     nameMy: 'Burger Ayam Malaysia',     price: 13.90, desc: 'Burger ayam gaya Malaysia klasik',                                    descMy: 'Burger ayam gaya Malaysia klasik',                                tag: '' },
    { id: 10, name: 'Burger Ayam Kicap Panggang', nameMy: 'Burger Ayam Kicap Panggang', price: 14.90, desc: 'Burger ayam panggang dengan kicap',                                 descMy: 'Burger ayam panggang dengan kicap',                               tag: '' },
  ],

  // Nasi bakar keju
  baked: [
    { id: 101, name: 'Nasi Bakar Ayam',           nameMy: 'Nasi Bakar Ayam',           price: 14.90, desc: 'Nasi bakar keju dengan ayam goreng panggang',                       descMy: 'Nasi bakar keju dengan ayam goreng panggang',                 tag: '' },
    { id: 102, name: 'Nasi Bakar Berkembar',      nameMy: 'Nasi Bakar Berkembar',      price: 17.90, desc: 'Nasi bakar keju dengan ayam goreng + filet ikan',                   descMy: 'Nasi bakar keju dengan ayam goreng + filet ikan',             tag: 'PILIHAN CHEF' },
    { id: 103, name: 'Nasi Bakar Sosej',          nameMy: 'Nasi Bakar Sosej',          price: 13.90, desc: 'Nasi bakar keju dengan sosej keju jumbo',                           descMy: 'Nasi bakar keju dengan sosej keju jumbo',                     tag: '' },
    { id: 104, name: 'Nasi Bakar Filet Ikan',     nameMy: 'Nasi Bakar Filet Ikan',     price: 16.90, desc: 'Nasi bakar keju dengan filet ikan garing',                          descMy: 'Nasi bakar keju dengan filet ikan garing',                     tag: '' },
    { id: 105, name: 'Nasi Bakar Daging Lembu',   nameMy: 'Nasi Bakar Daging Lembu',   price: 14.90, desc: 'Nasi bakar keju dengan hirisan daging lembu lembut',                descMy: 'Nasi bakar keju dengan hirisan daging lembu lembut',           tag: '' },
    { id: 106, name: 'Nasi Bakar Makanan Laut',   nameMy: 'Nasi Bakar Makanan Laut',   price: 15.90, desc: 'Nasi bakar keju dengan makanan laut campuran',                      descMy: 'Nasi bakar keju dengan makanan laut campuran',                 tag: '' },
    { id: 107, name: 'Nasi Bakar Keju Berganda',  nameMy: 'Nasi Bakar Keju Berganda',  price: 14.90, desc: 'Nasi bakar keju tambahan - untuk pencinta keju',                    descMy: 'Nasi bakar keju tambahan - untuk pencinta keju',               tag: '' },
    { id: 108, name: 'Nasi Bakar Salmon',         nameMy: 'Nasi Bakar Salmon',         price: 33.90, desc: 'Nasi bakar keju premium dengan salmon panggang',                     descMy: 'Nasi bakar keju premium dengan salmon panggang',                tag: '' },
    { id: 109, name: 'Nasi Bakar Itik Salai',    nameMy: 'Nasi Bakar Itik Salai',     price: 14.90, desc: 'Nasi bakar keju dengan dada itik salai',                            descMy: 'Nasi bakar keju dengan dada itik salai',                       tag: '' },
  ],

  // Minuman
  drinks: [
    { id: 201, name: 'Teh Olong Pic',             nameMy: 'Teh Olong Pic',             price: 4.90,  desc: 'Teh pic ais yang menyegarkan',                                       descMy: 'Teh pic ais yang menyegarkan' },
    { id: 202, name: 'Luo Han Guo',               nameMy: 'Luo Han Guo',               price: 4.90,  desc: 'Minuman herba penyejuk tradisional',                                 descMy: 'Minuman herba penyejuk tradisional' },
    { id: 203, name: 'Tebu',                      nameMy: 'Tebu',                      price: 4.90,  desc: 'Minuman tebu segar',                                                 descMy: 'Minuman tebu segar' },
    { id: 204, name: 'Lemon Madu',                nameMy: 'Lemon Madu',                price: 4.90,  desc: 'Minuman lemon dimaniskan dengan madu',                               descMy: 'Minuman lemon dimaniskan dengan madu' },
    { id: 205, name: 'Ais Jelly Buah Markisa',    nameMy: 'Ais Jelly Buah Markisa',    price: 4.90,  desc: 'Buah markisa dengan ais jelly',                                      descMy: 'Buah markisa dengan ais jelly' },
    { id: 206, name: 'Jus Tembikai Saiz Raja',    nameMy: 'Jus Tembikai Saiz Raja',    price: 9.90,  desc: 'Jus tembikai segar bersaiz besar',                                   descMy: 'Jus tembikai segar bersaiz besar' },
    { id: 207, name: 'Jus Oren Saiz Raja',        nameMy: 'Jus Oren Saiz Raja',        price: 9.90,  desc: 'Jus oren segar bersaiz besar',                                       descMy: 'Jus oren segar bersaiz besar' },
    { id: 208, name: 'Jus Epal Saiz Raja',        nameMy: 'Jus Epal Saiz Raja',        price: 9.90,  desc: 'Jus epal segar bersaiz besar',                                       descMy: 'Jus epal segar bersaiz besar' },
    { id: 209, name: 'Susu Lobak Saiz Raja',      nameMy: 'Susu Lobak Saiz Raja',      price: 12.90, desc: 'Campuran lobak & susu bersaiz besar',                                descMy: 'Campuran lobak & susu bersaiz besar' },
    { id: 210, name: 'Teh Lemon Ais Saiz Raja',   nameMy: 'Teh Lemon Ais Saiz Raja',   price: 8.90,  desc: 'Teh lemon ais bersaiz besar',                                        descMy: 'Teh lemon ais bersaiz besar' },
    { id: 211, name: 'Susu Kacang Merah Saiz Raja', nameMy: 'Susu Kacang Merah Saiz Raja', price: 13.90, desc: 'Kacang merah bersaiz besar dengan ais susu',                       descMy: 'Kacang merah bersaiz besar dengan ais susu' },
    { id: 212, name: 'Ribena Saiz Raja',          nameMy: 'Ribena Saiz Raja',          price: 12.90, desc: 'Ribena ais bersaiz besar dengan limau',                              descMy: 'Ribena ais bersaiz besar dengan limau' },
    { id: 213, name: 'Coklat',                    nameMy: 'Coklat',                    price: 5.90,  desc: 'Coklat panas',                                                       descMy: 'Coklat panas' },
    { id: 214, name: 'Kopi Putih',                nameMy: 'Kopi Putih',                price: 4.90,  desc: 'Kopi putih Malaysia klasik',                                         descMy: 'Kopi putih Malaysia klasik' },
    { id: 215, name: 'Teh Earl Grey',             nameMy: 'Teh Earl Grey',             price: 3.90,  desc: 'Teh Earl Grey panas',                                                descMy: 'Teh Earl Grey panas' },
    { id: 216, name: 'Teh Hijau',                 nameMy: 'Teh Hijau',                 price: 3.90,  desc: 'Teh hijau panas',                                                    descMy: 'Teh hijau panas' },
    { id: 217, name: 'Teh Lemon',                 nameMy: 'Teh Lemon',                 price: 3.90,  desc: 'Teh lemon panas',                                                    descMy: 'Teh lemon panas' },
    { id: 218, name: 'Cappuccino',                nameMy: 'Cappuccino',                price: 4.90,  desc: 'Cappuccino panas',                                                   descMy: 'Cappuccino panas' },
    { id: 219, name: 'Coca-Cola',                 nameMy: 'Coca-Cola',                 price: 3.90,  desc: 'Coca-Cola tin',                                                      descMy: 'Coca-Cola tin' },
    { id: 220, name: 'Sprite',                    nameMy: 'Sprite',                    price: 3.90,  desc: 'Sprite tin',                                                         descMy: 'Sprite tin' },
    { id: 221, name: '100 Plus',                  nameMy: '100 Plus',                  price: 3.90,  desc: '100 Plus tin isotonik',                                              descMy: '100 Plus tin isotonik' },
    { id: 222, name: 'Air Mineral',               nameMy: 'Air Mineral',               price: 2.90,  desc: 'Air mineral',                                                        descMy: 'Air mineral' },
  ],

  promotions: [
    { title: 'Tawaran Istimewa',                  titleMy: 'Tawaran Istimewa',                  price: 'RM 9.90', desc: 'Bermula dari hanya RM 9.90!',                                         descMy: 'Bermula dari hanya RM 9.90!' },
    { title: 'Teh Makan Tengah Hari Percuma',     titleMy: 'Teh Makan Tengah Hari Percuma',     price: 'PERCUMA',  desc: 'Isnin-Jumaat 11AM-3PM dengan sebarang hidangan',                    descMy: 'Isnin-Jumaat 11AM-3PM dengan sebarang hidangan' },
    { title: 'Aiskrim Percuma',                   titleMy: 'Aiskrim Percuma',                   price: 'PERCUMA',  desc: 'Makan malam harian 3PM-10:30PM | Sabtu-Ahad SEPANJANG HARI',        descMy: 'Makan malam harian 3PM-10:30PM | Sabtu-Ahad SEPANJANG HARI' },
    { title: 'Hadiriah Hari Jadi',                titleMy: 'Hadiriah Hari Jadi',                price: 'PERCUMA',  desc: 'Hidangan ayam goreng percuma pada bulan hari jadi anda! (tunjuk IC)', descMy: 'Hidangan ayam goreng percuma pada bulan hari jadi anda! (tunjuk IC)' },
  ],

  promo: {
    sectionTitle: 'Tawaran Istimewa',
    sectionSub: 'Hebahan hebat setiap hari di Chef V!',
    termsTitle: 'Terma & Syarat',
    terms: [
      'Hidangan hari jadi percuma: Sah untuk makan di tempat sahaja, yang pertama tanpa belanja minimum, yang kedua & seterusnya memerlukan belanja RM25+',
      'Minuman percuma sah Isnin-Jumaat 11AM-3PM (hujung minggu dikecualikan)',
      'Aiskrim percuma setiap hari 3PM-10:30PM, sepanjang hari Sabtu-Ahad',
    ],
  },

  gallery: {
    sectionTitle: 'Galeri Makanan',
    sectionSub: 'Gambar sebenar dari restoran kami',
  },

  // Gallery image alt - Malay
  galleryAlt: {
    1: 'Hidangan Istimewa - RM 9.90',
    2: 'Ayam Panggang Tandatangan',
    3: 'Nasi Bakar & Hidangan Sampingan',
    4: 'Panggang Campuran Chef V',
    5: 'Ayam Panggang dengan Spageti',
    6: 'Bahagian Dalaman Restoran Chef V',
    7: 'Suasana Restoran',
    8: 'Pengalaman Menjamu Selera',
    9: 'Menu Chef V',
    10: 'Hidangan Makanan Barat',
    11: 'Hidangan Ayam Panggang',
    12: 'Spageti & Ayam Goreng',
    13: 'Stik & Hidangan Sampingan',
    14: 'Hidangan Panggang',
    15: 'Panggang Campuran - Pandangan Dekat',
    16: 'Hidangan Tandatangan',
    17: 'Hidangan Makanan Barat',
    18: 'Hidangan Ayam Goreng',
    19: 'Hidangan Set Chef V',
    20: 'Paparan Makanan Restoran',
    21: 'Tandatangan Chef V',
    22: 'Tawaran Hidangan Set',
    23: 'Hidangan Barat',
    24: 'Ayam Panggang',
    25: 'Hidangan Panggang Campuran',
    26: 'Hidangan Ayam Goreng',
    27: 'Jamuan Chef V',
  },

  locations: {
    sectionTitle: 'Cawangan Kami',
    sectionSub: '7 cawangan untuk melayani anda di seluruh Lembah Klang',
    contactTitle: '📞 Pesan & Pertanyaan',
    whatsapp: 'WhatsApp',
    callGrab: 'Panggilan & Grab tersedia di semua cawangan',
  },

  branches: [
    { id: 1, name: 'Seri Kembangan',          nameMy: 'Seri Kembangan',          address: 'Jalan PP 33, Taman Pinggiran Putra, 43400 Seri Kembangan, Selangor', phone: '+6016-610 6352', note: 'Medan Makan Gembira', noteMy: 'Medan Makan Gembira', image: '/gallery/branch-seri-kembangan.jpg' },
    { id: 2, name: 'P.P. Seri Kembangan',    nameMy: 'P.P. Seri Kembangan',    address: 'No. 34, Jalan PSK 8, Pusat Perdagangan Seri Kembangan, 43300 Seri Kembangan, Selangor', phone: '+6010-336 7741', note: '', noteMy: '', image: '/gallery/branch-ppsk.jpg' },
    { id: 3, name: 'Bandar Puteri Puchong',  nameMy: 'Bandar Puteri Puchong',  address: 'No. 8, Jalan Puteri 7/8, Bandar Puteri, 47100 Puchong, Selangor', phone: '+6011-1330 9505', note: '', noteMy: '', image: '/gallery/branch-puchong.jpg' },
    { id: 4, name: 'Sungai Way Petaling Jaya', nameMy: 'Sungai Way Petaling Jaya', address: 'No. 114, Jalan SS9A/1, Sungai Way, 47300 Petaling Jaya, Selangor', phone: '+6011-1330 9707', note: '', noteMy: '', image: '/gallery/branch-sungai-way.jpg' },
    { id: 5, name: 'SS15 Subang Jaya',       nameMy: 'SS15 Subang Jaya',       address: 'Ground Floor, No. 96, Jalan SS15/4, 47500 Subang Jaya, Selangor', phone: '+6010-878 5651', note: '', noteMy: '', image: '/gallery/branch-ss15.jpg' },
    { id: 6, name: 'Bandar Menjalara',       nameMy: 'Bandar Menjalara',       address: 'No. 95, Jalan 8/62A, Bandar Menjalara, 52200 Kuala Lumpur', phone: '+6010-343 8137', note: '', noteMy: '', image: '/gallery/branch-menjalara.jpg' },
    { id: 7, name: 'Bukit Tinggi 2',         nameMy: 'Bukit Tinggi 2',         address: 'No. 15, Lorong Batu Nilam 20A, Bandar Bukit Tinggi 2, 41200 Klang, Selangor', phone: '+6010-336 7742', note: '', noteMy: '', image: '/gallery/branch-bukit-tinggi.jpg' },
  ],

  footer: {
    tagline: 'Restoran Makanan Barat CHEF V · Western Cuisine',
    brand: 'Dimiliki oleh FOODASTIC Sdn. Bhd.',
    instagram: '📸 Instagram',
    facebook: '👍 Facebook',
    copyright: '© 2026 Chef V Makanan Barat. Hak cipta terpelihara.',
  },
};
