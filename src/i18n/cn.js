// Chinese (Simplified) translations
// IMPORTANT: Only Chinese text. No English/Malay mixed in.

export default {
  meta: {
    code: 'cn',
    label: '中文',
    flag: 'CN',
  },

  header: {
    title: 'Chef V 西餐',
    subtitle: '西餐厅 · Western Food · 高级西餐料理',
    whatsappOrder: '📞 WhatsApp 订购',
    chatWithUs: '联系我们',
  },

  hero: {
    badge: '🍽️ 全巴生谷 7 家分店',
    title1: '平价西餐',
    title2: '低至 RM 9.90 起!',
    description: '新鲜烹制·优质香料 · 堂食或外带',
    viewMenu: '查看菜单',
    findUs: '寻找我们',
  },

  nav: {
    menu: '菜单',
    promos: '优惠',
    gallery: '相簿',
    locations: '分店',
  },

  menu: {
    sectionTitle: '我们的菜单',
    sectionSub: '用心烹制·优质香料的西式料理',
    categories: {
      mains: '🍽️ 主餐',
      baked: '🧀 芝士焗饭',
      drinks: '🥤 饮料',
    },
    drinksSections: {
      cold: '🥤 冷饮',
      king: '👑 特大杯饮料',
      hot: '☕ 热饮',
      canned: '🥫 罐装饮料',
    },
  },

  // 主餐
  mains: [
    { id: 1,  name: '超级套餐',         nameMy: '超级套餐',         price: 9.90,  desc: '鸡扒配薯条和沙律',                          descMy: '鸡扒配薯条和沙律',           tag: '热销之选' },
    { id: 2,  name: '套餐 A',           nameMy: '套餐 A',           price: 17.90, desc: '牛扒套餐配配菜',                            descMy: '牛扒套餐配配菜',             tag: '热门' },
    { id: 3,  name: '套餐 B',           nameMy: '套餐 B',           price: 19.90, desc: '鸡扒套餐配高级配菜',                        descMy: '鸡扒套餐配高级配菜',         tag: '' },
    { id: 4,  name: '套餐 C',           nameMy: '套餐 C',           price: 21.90, desc: '鱼扒套餐配齐全配菜',                        descMy: '鱼扒套餐配齐全配菜',         tag: '' },
    { id: 5,  name: '套餐 D',           nameMy: '套餐 D',           price: 23.90, desc: '杂扒组合 - 牛+鸡+鱼',                       descMy: '杂扒组合 - 牛+鸡+鱼',        tag: '' },
    { id: 6,  name: 'Chef V 杂扒',      nameMy: 'Chef V 杂扒',      price: 28.90, desc: '牛扒 + 鸡扒 + 鱼扒',                        descMy: '牛扒 + 鸡扒 + 鱼扒',         tag: '顶级' },
    { id: 7,  name: '鸡扒套餐',         nameMy: '鸡扒套餐',         price: 12.90, desc: '烤鸡扒配薯条和沙拉',                        descMy: '烤鸡扒配薯条和沙拉',         tag: '' },
    { id: 8,  name: '牛扒套餐',         nameMy: '牛扒套餐',         price: 15.90, desc: '多汁牛扒配配菜',                            descMy: '多汁牛扒配配菜',             tag: '' },
    { id: 9,  name: '马来风味鸡汉堡',   nameMy: '马来风味鸡汉堡',   price: 13.90, desc: '经典马来风味鸡汉堡',                        descMy: '经典马来风味鸡汉堡',         tag: '' },
    { id: 10, name: '香烤酱油鸡汉堡',   nameMy: '香烤酱油鸡汉堡',   price: 14.90, desc: '烤酱油鸡汉堡',                              descMy: '烤酱油鸡汉堡',               tag: '' },
  ],

  // 芝士焗饭
  baked: [
    { id: 101, name: '芝士鸡扒焗饭',     nameMy: '芝士鸡扒焗饭',     price: 14.90, desc: '芝士焗饭配烤鸡扒',                          descMy: '芝士焗饭配烤鸡扒',           tag: '' },
    { id: 102, name: '芝士鸳鸯焗饭',     nameMy: '芝士鸳鸯焗饭',     price: 17.90, desc: '芝士焗饭配鸡扒 + 鱼扒',                    descMy: '芝士焗饭配鸡扒 + 鱼扒',     tag: '主厨推荐' },
    { id: 103, name: '芝士香肠焗饭',     nameMy: '芝士香肠焗饭',     price: 13.90, desc: '芝士焗饭配大号芝士香肠',                    descMy: '芝士焗饭配大号芝士香肠',     tag: '' },
    { id: 104, name: '芝士脆鱼扒焗饭',   nameMy: '芝士脆鱼扒焗饭',   price: 16.90, desc: '芝士焗饭配脆鱼扒',                          descMy: '芝士焗饭配脆鱼扒',           tag: '' },
    { id: 105, name: '芝士牛肉焗饭',     nameMy: '芝士牛肉焗饭',     price: 14.90, desc: '芝士焗饭配嫩牛肉片',                        descMy: '芝士焗饭配嫩牛肉片',         tag: '' },
    { id: 106, name: '芝士海鲜焗饭',     nameMy: '芝士海鲜焗饭',     price: 15.90, desc: '芝士焗饭配混合海鲜',                        descMy: '芝士焗饭配混合海鲜',         tag: '' },
    { id: 107, name: '芝士加芝士焗饭',   nameMy: '芝士加芝士焗饭',   price: 14.90, desc: '芝士加倍的焗饭 - 芝士爱好者必试',          descMy: '芝士加倍的焗饭 - 芝士爱好者必试', tag: '' },
    { id: 108, name: '芝士三文鱼焗饭',   nameMy: '芝士三文鱼焗饭',   price: 33.90, desc: '高级芝士焗饭配烤三文鱼',                    descMy: '高级芝士焗饭配烤三文鱼',     tag: '' },
    { id: 109, name: '烟鸭芝士焗饭',     nameMy: '烟鸭芝士焗饭',     price: 14.90, desc: '芝士焗饭配烟熏鸭胸',                        descMy: '芝士焗饭配烟熏鸭胸',         tag: '' },
  ],

  // 饮料
  drinks: [
    { id: 201, name: '桃子乌龙茶',       nameMy: '桃子乌龙茶',       price: 4.90,  desc: '清爽桃子冰茶',                descMy: '清爽桃子冰茶' },
    { id: 202, name: '龙眼罗汉果',       nameMy: '龙眼罗汉果',       price: 4.90,  desc: '传统凉茶',                    descMy: '传统凉茶' },
    { id: 203, name: '竹蔗马蹄水',       nameMy: '竹蔗马蹄水',       price: 4.90,  desc: '新鲜甘蔗饮品',                descMy: '新鲜甘蔗饮品' },
    { id: 204, name: '柠檬蜜糖水',       nameMy: '柠檬蜜糖水',       price: 4.90,  desc: '蜂蜜柠檬饮品',                descMy: '蜂蜜柠檬饮品' },
    { id: 205, name: '百香果爱玉冰',     nameMy: '百香果爱玉冰',     price: 4.90,  desc: '百香果配爱玉冰',              descMy: '百香果配爱玉冰' },
    { id: 206, name: '特大西瓜汁',       nameMy: '特大西瓜汁',       price: 9.90,  desc: '大杯新鲜西瓜汁',              descMy: '大杯新鲜西瓜汁' },
    { id: 207, name: '特大橙汁',         nameMy: '特大橙汁',         price: 9.90,  desc: '大杯新鲜橙汁',                descMy: '大杯新鲜橙汁' },
    { id: 208, name: '特大苹果汁',       nameMy: '特大苹果汁',       price: 9.90,  desc: '大杯新鲜苹果汁',              descMy: '大杯新鲜苹果汁' },
    { id: 209, name: '特大萝卜奶',       nameMy: '特大萝卜奶',       price: 12.90, desc: '大杯萝卜牛奶混合',            descMy: '大杯萝卜牛奶混合' },
    { id: 210, name: '特大柠檬茶',       nameMy: '特大柠檬茶',       price: 8.90,  desc: '大杯冰柠檬茶',                descMy: '大杯冰柠檬茶' },
    { id: 211, name: '特大牛奶红豆冰',   nameMy: '特大牛奶红豆冰',   price: 13.90, desc: '大杯红豆配牛奶冰',            descMy: '大杯红豆配牛奶冰' },
    { id: 212, name: '特大热情利宾纳',   nameMy: '特大热情利宾纳',   price: 12.90, desc: '大杯冰利宾纳配青柠',          descMy: '大杯冰利宾纳配青柠' },
    { id: 213, name: '巧克力',           nameMy: '巧克力',           price: 5.90,  desc: '热巧克力',                    descMy: '热巧克力' },
    { id: 214, name: '白咖啡',           nameMy: '白咖啡',           price: 4.90,  desc: '经典马来西亚白咖啡',          descMy: '经典马来西亚白咖啡' },
    { id: 215, name: '伯爵茶',           nameMy: '伯爵茶',           price: 3.90,  desc: '热伯爵茶',                    descMy: '热伯爵茶' },
    { id: 216, name: '绿茶',             nameMy: '绿茶',             price: 3.90,  desc: '热绿茶',                      descMy: '热绿茶' },
    { id: 217, name: '柠檬茶',           nameMy: '柠檬茶',           price: 3.90,  desc: '热柠檬茶',                    descMy: '热柠檬茶' },
    { id: 218, name: '卡布奇诺',         nameMy: '卡布奇诺',         price: 4.90,  desc: '热卡布奇诺',                  descMy: '热卡布奇诺' },
    { id: 219, name: '可乐',             nameMy: '可乐',             price: 3.90,  desc: '罐装可乐',                    descMy: '罐装可乐' },
    { id: 220, name: '雪碧',             nameMy: '雪碧',             price: 3.90,  desc: '罐装雪碧',                    descMy: '罐装雪碧' },
    { id: 221, name: '一百号',           nameMy: '一百号',           price: 3.90,  desc: '罐装一百号运动饮料',          descMy: '罐装一百号运动饮料' },
    { id: 222, name: '矿泉水',           nameMy: '矿泉水',           price: 2.90,  desc: '矿泉水',                      descMy: '矿泉水' },
  ],

  promotions: [
    { title: '超级套餐特惠',           titleMy: '超级套餐特惠',           price: 'RM 9.90', desc: '低至 RM 9.90 起!',                                                  descMy: '低至 RM 9.90 起!' },
    { title: '免费午餐茶饮',           titleMy: '免费午餐茶饮',           price: '免费',    desc: '周一至五 上午11时-下午3时 任何主餐',                              descMy: '周一至五 上午11时-下午3时 任何主餐' },
    { title: '免费冰淇淋',             titleMy: '免费冰淇淋',             price: '免费',    desc: '每日 下午3时-晚上10时30分 | 周六日 全天',                          descMy: '每日 下午3时-晚上10时30分 | 周六日 全天' },
    { title: '生日优惠',               titleMy: '生日优惠',               price: '免费',    desc: '生日月份可享免费鸡扒套餐! (需出示身份证)',                         descMy: '生日月份可享免费鸡扒套餐! (需出示身份证)' },
  ],

  promo: {
    sectionTitle: '特别优惠',
    sectionSub: 'Chef V 每天都有好康!',
    termsTitle: '条规',
    terms: [
      '生日免费套餐:仅限堂食,首位庆祝者无最低消费,第二位起需消费 RM25 以上',
      '免费饮料仅限周一至五 上午11时-下午3时 (周末除外)',
      '免费冰淇淋时间为每日 下午3时-晚上10时30分,周六日全日',
    ],
  },

  gallery: {
    sectionTitle: '美食相簿',
    sectionSub: '餐厅实拍图',
  },

  // Gallery image alt - Chinese
  galleryAlt: {
    1: '超级套餐 - RM 9.90',
    2: '招牌烤鸡',
    3: '芝士焗饭与配菜',
    4: 'Chef V 杂扒拼盘',
    5: '烤鸡配意面',
    6: 'Chef V 餐厅环境',
    7: '餐厅氛围',
    8: '用餐体验',
    9: 'Chef V 菜单',
    10: '西餐料理',
    11: '烤鸡拼盘',
    12: '意面与鸡扒',
    13: '牛扒与配菜',
    14: '烤扒拼盘',
    15: '杂扒特写',
    16: '招牌菜',
    17: '西餐料理',
    18: '鸡扒拼盘',
    19: 'Chef V 套餐',
    20: '餐厅美食展示',
    21: 'Chef V 招牌',
    22: '套餐优惠',
    23: '西式拼盘',
    24: '烤鸡',
    25: '杂扒拼盘',
    26: '鸡扒拼盘',
    27: 'Chef V 用餐',
  },

  locations: {
    sectionTitle: '分店位置',
    sectionSub: '7 家分店为您服务,遍布巴生谷',
    contactTitle: '📞 订购与咨询',
    whatsapp: 'WhatsApp',
    callGrab: '所有分店均提供电话订购与 Grab 外送',
  },

  branches: [
    { id: 1, name: '沙登新村',            nameMy: '沙登新村',            address: 'Jalan PP 33, Taman Pinggiran Putra, 43400 Seri Kembangan, Selangor', phone: '+6016-610 6352', note: '开心饮食中心', noteMy: '开心饮食中心', image: '/gallery/branch-seri-kembangan.jpg' },
    { id: 2, name: '沙登 P.P.',          nameMy: '沙登 P.P.',          address: 'No. 34, Jalan PSK 8, Pusat Perdagangan Seri Kembangan, 43300 Seri Kembangan, Selangor', phone: '+6010-336 7741', note: '', noteMy: '', image: '/gallery/branch-ppsk.jpg' },
    { id: 3, name: '蒲种公主城',          nameMy: '蒲种公主城',          address: 'No. 8, Jalan Puteri 7/8, Bandar Puteri, 47100 Puchong, Selangor', phone: '+6011-1330 9505', note: '', noteMy: '', image: '/gallery/branch-puchong.jpg' },
    { id: 4, name: '八打灵再也双威威',    nameMy: '八打灵再也双威威',    address: 'No. 114, Jalan SS9A/1, Sungai Way, 47300 Petaling Jaya, Selangor', phone: '+6011-1330 9707', note: '', noteMy: '', image: '/gallery/branch-sungai-way.jpg' },
    { id: 5, name: '梳邦再也 SS15',      nameMy: '梳邦再也 SS15',      address: 'Ground Floor, No. 96, Jalan SS15/4, 47500 Subang Jaya, Selangor', phone: '+6010-878 5651', note: '', noteMy: '', image: '/gallery/branch-ss15.jpg' },
    { id: 6, name: '文良拉',              nameMy: '文良拉',              address: 'No. 95, Jalan 8/62A, Bandar Menjalara, 52200 Kuala Lumpur', phone: '+6010-343 8137', note: '', noteMy: '', image: '/gallery/branch-menjalara.jpg' },
    { id: 7, name: '武吉丁雅 2',          nameMy: '武吉丁雅 2',          address: 'No. 15, Lorong Batu Nilam 20A, Bandar Bukit Tinggi 2, 41200 Klang, Selangor', phone: '+6010-336 7742', note: '', noteMy: '', image: '/gallery/branch-bukit-tinggi.jpg' },
  ],

  footer: {
    tagline: '西餐厅 · Restoran Makanan Barat CHEF V',
    brand: '由 FOODASTIC 有限公司 拥有',
    instagram: '📸 Instagram',
    facebook: '👍 Facebook',
    copyright: '© 2026 Chef V 西餐。版权所有。',
  },
};
