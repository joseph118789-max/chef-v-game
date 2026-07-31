import React from "react";
import { Sparkles, MapPin, Phone } from "lucide-react";
import { MAINS, BRANCHES } from "../menuData";

// Chef V brand SVG logo (chef's hat with three circles)
const ChefVLogo = ({ size = 46, light = false }: { size?: number; light?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 46 46">
    <circle cx="12" cy="8" r="3" fill="#E9AF3B" />
    <circle cx="20" cy="4" r="2.4" fill="#E9AF3B" />
    <circle cx="27" cy="6" r="2" fill="#E9AF3B" />
    <path d="M18 44 L14 20 Q13 12 20 8 L34 2 L26 16 Q34 14 33 22 Q31 34 18 44 Z" fill={light ? "#D26FC2" : "#B4409A"} />
    <path d="M18 44 L14 20 Q13 12 20 8 L26 16 Q22 26 18 44 Z" fill={light ? "#A64FAE" : "#7A2E85"} />
  </svg>
);

// Squiggly gold underline accent
const Squiggle = ({ width = 150, className = "" }: { width?: number; className?: string }) => (
  <svg width={width} height={14} viewBox="0 0 150 14" className={className}>
    <path d="M2 10 Q 38 -2, 75 8 T 148 6" stroke="#E9AF3B" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

interface LandingPageProps {
  lang: "en" | "cn" | "ms";
  onNav: (tab: "home" | "menu" | "album" | "spin" | "shop" | "admin" | "members") => void;
  onInspectCard: (cardId: string) => void;
  onShowAuth?: () => void;
  isSignedIn?: boolean;
  ui: any;
  t: any;
}

const FEATURED_DISHES = MAINS.slice(0, 4);

// Map main id → cartoon image path (matching existing assets)
const DISH_IMAGES: Record<number, string> = {
  1: "/src/assets/images/grilled_chicken_chop_cartoon_1780735447825.png",
  2: "/src/assets/images/sizzling_chicken_pasta_cartoon_1780735549849.png",
  3: "/src/assets/images/chicken_baked_rice_cartoon_1780735567112.png",
  4: "/src/assets/images/chicken_cheese_gratin_cartoon_1780735583103.png",
  5: "/src/assets/images/ham_bacon_carbonara_cartoon_1780735516272.png",
  6: "/src/assets/images/chicken_cheese_gratin_cartoon_1780735583103.png",
  7: "/src/assets/images/crispy_chicken_chop_cartoon_1780735500873.png",
  8: "/src/assets/images/grilled_chicken_chop_cartoon_1780735447825.png",
  9: "/src/assets/images/chicken_egg_burger_cartoon_1780735469954.png",
  10: "/src/assets/images/chicken_egg_burger_cartoon_1780735469954.png",
};

// Map main id → card id in the existing collection system
const DISH_TO_CARD: Record<number, string> = {
  1: "c1",
  2: "c2",
  3: "c3",
  4: "c4",
  5: "c5",
  6: "c6",
  7: "c7",
  8: "c8",
  9: "c9",
  10: "c10",
};

const HERO_COPY = {
  en: {
    badge: "Crafted plates. Playful rewards.",
    title1: "Savor More.",
    title2: "Collect More.",
    blurb: "Chef V Western Food brings you comforting classics, crafted with fine ingredients — and a collectible experience that makes every visit more rewarding.",
    viewMenu: "View Menu",
    howGame: "How the Game Works",
    gameBadge: "CHEF V COLLECTOR GAME",
    gameTitle1: "Eat. Collect.",
    gameTitle2: "Redeem.",
    gameDesc: "Collect Chef V cards with every visit, discover special editions, complete your set and unlock exclusive rewards, dishes and experiences.",
    exploreGame: "Explore the Game",
    chefPicks: "CHEF'S PICKS",
    featuredTitle: "Featured Dishes",
    viewFullMenu: "View Full Menu",
    howItWorksBadge: "CHEF V COLLECTOR GAME",
    howItWorksTitle: "How It Works",
    howItWorksBlurb: "A delicious loop of dining, collecting and rewarding.",
    step1Title: "Dine & Collect",
    step1Desc: "Receive a random Chef V card with every eligible order.",
    step2Title: "Complete & Discover",
    step2Desc: "Collect cards, complete sets and discover rare editions.",
    step3Title: "Redeem & Enjoy",
    step3Desc: "Unlock exciting rewards, special dishes and exclusive experiences.",
    exploreRewards: "Explore All Rewards",
    branchesTitle: "Our Branches",
    viewAllLocations: "View All Locations",
    moreLocations: "More locations coming soon!",
    testimonialsTitle: "What Our Guests Say",
    testimonial1: "Amazing food and such a unique concept! Collecting the cards makes every visit so much fun.",
    testimonial1Name: "Aishwarya N.",
    testimonial2: "The pasta is to die for! Already completed two card sets and redeemed some awesome rewards.",
    testimonial2Name: "Rohit S.",
    testimonial3: "Beautiful ambience, warm staff and now a game that keeps us coming back!",
    testimonial3Name: "Megha P.",
    footerQuickLinks: "Quick Links",
    footerFollow: "Follow Us",
    footerNewsletter: "Newsletter",
    footerNewsletterDesc: "Subscribe for updates on new dishes, events and exclusive rewards.",
    footerEmailPlaceholder: "Enter your email",
    footerTagline: "Good food. Greater rewards.",
    footerCopyright: "© 2026 Chef V Western Food. All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms & Conditions",
    footerLinkMenu: "Menu",
    footerLinkGame: "Chef V Game",
    footerLinkAbout: "About Us",
    footerLinkEvents: "Events",
    footerLinkContact: "Contact",
  },
  cn: {
    badge: "用心烹调·趣味奖励",
    title1: "尽享美味。",
    title2: "集卡有礼。",
    blurb: "Chef V 西餐为您呈献用心烹制的经典美食，搭配可收藏的趣味游戏体验，让每一餐都更有价值。",
    viewMenu: "查看菜单",
    howGame: "游戏玩法",
    gameBadge: "CHEF V 收藏游戏",
    gameTitle1: "品尝·收藏。",
    gameTitle2: "兑换。",
    gameDesc: "每次用餐即可收集 Chef V 卡片，发现特别版，完成你的收集册，解锁专属奖励、菜式与体验。",
    exploreGame: "探索游戏",
    chefPicks: "主厨精选",
    featuredTitle: "招牌菜品",
    viewFullMenu: "查看完整菜单",
    howItWorksBadge: "CHEF V 收藏游戏",
    howItWorksTitle: "游戏玩法",
    howItWorksBlurb: "用餐、收藏、奖励的美味循环。",
    step1Title: "用餐集卡",
    step1Desc: "每次符合条件的外卖或堂食，即可获得随机 Chef V 卡片。",
    step2Title: "完成发现",
    step2Desc: "收集卡片，完成套系，发现稀有特别版。",
    step3Title: "兑换享受",
    step3Desc: "解锁精彩奖励、特别菜式与独家体验。",
    exploreRewards: "查看所有奖励",
    branchesTitle: "我们的分店",
    viewAllLocations: "查看所有分店",
    moreLocations: "更多分店即将开业！",
    testimonialsTitle: "顾客好评",
    testimonial1: "美食超棒，概念独特！集卡让每次用餐都充满乐趣。",
    testimonial1Name: "陈小姐",
    testimonial2: "意面太好吃了！已经完成两套卡，兑换了超棒的奖励。",
    testimonial2Name: "Rohit S.",
    testimonial3: "环境温馨、服务亲切，加上集卡游戏让我们一再光顾！",
    testimonial3Name: "Megha P.",
    footerQuickLinks: "快捷链接",
    footerFollow: "关注我们",
    footerNewsletter: "订阅通讯",
    footerNewsletterDesc: "订阅以获取新菜、活动与独家奖励的最新消息。",
    footerEmailPlaceholder: "输入您的邮箱",
    footerTagline: "好味道·好奖励",
    footerCopyright: "© 2026 Chef V 西餐 版权所有。",
    footerPrivacy: "隐私政策",
    footerTerms: "条款与条件",
    footerLinkMenu: "菜单",
    footerLinkGame: "Chef V 游戏",
    footerLinkAbout: "关于我们",
    footerLinkEvents: "活动",
    footerLinkContact: "联系我们",
  },
  ms: {
    badge: "Hidangan istimewa. Ganjaran menyeronokkan.",
    title1: "Nikmati Lebih.",
    title2: "Kumpul Lebih.",
    blurb: "Chef V Western Food menyajikan hidangan klasik yang dimasak dengan bahan terbaik — dan pengalaman mengumpul yang menjadikan setiap kunjungan lebih bermanfaat.",
    viewMenu: "Lihat Menu",
    howGame: "Cara Permainan",
    gameBadge: "PERMAINAN PENGUMPUL CHEF V",
    gameTitle1: "Makan. Kumpul.",
    gameTitle2: "Tebus.",
    gameDesc: "Kumpul kad Chef V dengan setiap kunjungan, temui edisi istimewa, lengkapkan set anda dan buka ganjaran eksklusif.",
    exploreGame: "Terokai Permainan",
    chefPicks: "PILIHAN CHEF",
    featuredTitle: "Hidangan Istimewa",
    viewFullMenu: "Lihat Menu Penuh",
    howItWorksBadge: "PERMAINAN PENGUMPUL CHEF V",
    howItWorksTitle: "Cara Ia Berfungsi",
    howItWorksBlurb: "Kitaran menyeronokkan: makan, kumpul, ganjaran.",
    step1Title: "Makan & Kumpul",
    step1Desc: "Terima kad Chef V rawak dengan setiap pesanan yang layak.",
    step2Title: "Lengkapkan & Temui",
    step2Desc: "Kumpul kad, lengkapkan set dan temui edisi rare.",
    step3Title: "Tebus & Nikmati",
    step3Desc: "Buka ganjaran menarik, hidangan istimewa dan pengalaman eksklusif.",
    exploreRewards: "Terokai Semua Ganjaran",
    branchesTitle: "Cawangan Kami",
    viewAllLocations: "Lihat Semua Lokasi",
    moreLocations: "Lebih banyak lokasi akan datang!",
    testimonialsTitle: "Apa Kata Tetamu Kami",
    testimonial1: "Makanan hebat dan konsep unik! Mengumpul kad menjadikan setiap kunjungan menyeronokkan.",
    testimonial1Name: "Aishwarya N.",
    testimonial2: "Pasta terbaik! Sudah lengkapkan dua set kad dan menebus ganjaran hebat.",
    testimonial2Name: "Rohit S.",
    testimonial3: "Suasana cantik, kakitangan mesra dan permainan yang membuatkan kami kembali!",
    testimonial3Name: "Megha P.",
    footerQuickLinks: "Pautan Pantas",
    footerFollow: "Ikuti Kami",
    footerNewsletter: "Surat Berita",
    footerNewsletterDesc: "Langgan untuk kemas kini hidangan, acara dan ganjaran eksklusif.",
    footerEmailPlaceholder: "Masukkan e-mel anda",
    footerTagline: "Makanan sedap. Ganjaran lebih hebat.",
    footerCopyright: "© 2026 Chef V Western Food. Hak cipta terpelihara.",
    footerPrivacy: "Polisi Privasi",
    footerTerms: "Terma & Syarat",
    footerLinkMenu: "Menu",
    footerLinkGame: "Permainan Chef V",
    footerLinkAbout: "Tentang Kami",
    footerLinkEvents: "Acara",
    footerLinkContact: "Hubungi",
  },
};

export default function LandingPage({ lang, onNav, onInspectCard, onShowAuth, isSignedIn, ui, t }: LandingPageProps) {
  const copy = HERO_COPY[lang] || HERO_COPY.en;
  const topBranches = BRANCHES.slice(0, 3);

  return (
    <div
      className="flex-grow flex flex-col"
      style={{ background: "#FBF1E4", color: "#2E1230", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ============ HERO ============ */}
      <section className="px-4 md:px-16 pt-6 pb-12 relative overflow-hidden">
        {/* Decorative doodles */}
        <svg
          className="absolute top-0 left-0 w-full h-[420px] pointer-events-none"
          viewBox="0 0 1440 420"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M120 380 C 90 340, 150 330, 130 370 C 110 405, 60 395, 80 350" stroke="#E9C77A" strokeWidth="2" />
          <path d="M380 20 C 420 60, 470 10, 510 55 C 550 95, 610 40, 660 70" stroke="#E9C77A" strokeWidth="2" />
          <path d="M980 60 C 1020 20, 1070 70, 1110 30 C 1140 5, 1180 40, 1220 15" stroke="#E9C77A" strokeWidth="2" />
          <g transform="translate(420,90) rotate(20)">
            <path d="M0 0 L14 10 L0 20 Z M14 10 L28 0 L28 20 Z" fill="none" stroke="#E9C77A" strokeWidth="1.6" />
          </g>
          <g transform="translate(560,45) rotate(-10)">
            <path d="M0 0 L14 10 L0 20 Z M14 10 L28 0 L28 20 Z" fill="none" stroke="#E9C77A" strokeWidth="1.6" />
          </g>
          <g transform="translate(1000,120) rotate(35)">
            <path d="M0 0 L14 10 L0 20 Z M14 10 L28 0 L28 20 Z" fill="none" stroke="#E9C77A" strokeWidth="1.6" />
          </g>
        </svg>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-7xl mx-auto">
          {/* Left copy */}
          <div className="lg:col-span-5 pt-6">
            <div className="text-2xl text-[#7A3E82] mb-2" style={{ fontFamily: "'Caveat', cursive" }}>
              {copy.badge}
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
            >
              {copy.title1}
              <br />
              {copy.title2}
            </h1>
            <Squiggle className="my-3" />
            <p className="text-sm md:text-base leading-relaxed max-w-md mb-6" style={{ color: "#4A2E4D" }}>
              {copy.blurb}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={() => onNav("menu")}
                className="text-sm font-semibold rounded-full px-6 py-3 inline-flex items-center gap-2 shadow-md transition-transform hover:-translate-y-0.5"
                style={{ background: "#E9AF3B", color: "#3A1240" }}
              >
                {copy.viewMenu} <span>→</span>
              </button>
              <a
                href="#how-it-works"
                className="text-sm font-semibold border-b border-dashed pb-1"
                style={{ color: "#4B1B52", borderColor: "#4B1B52" }}
              >
                {copy.howGame} →
              </a>
            </div>
          </div>

          {/* Center plate image */}
          <div className="lg:col-span-4 flex justify-center pt-2">
            <div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-white to-[#FBF1E4] flex items-center justify-center"
              style={{ boxShadow: "0 30px 60px -20px rgba(74,20,60,0.35)" }}
            >
              <img
                src="/src/assets/images/grilled_chicken_chop_cartoon_1780735447825.png"
                alt="Signature dish"
                className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full"
              />
            </div>
          </div>

          {/* Right game card */}
          <div className="lg:col-span-3 pt-2">
            <div
              className="rounded-3xl p-6"
              style={{ background: "#EAE0F2", boxShadow: "0 20px 40px -18px rgba(90,40,100,0.3)" }}
            >
              <div className="text-[11px] tracking-[2px] font-bold mb-3" style={{ color: "#7A3E82" }}>
                {copy.gameBadge}
              </div>
              <h3
                className="text-2xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
              >
                {copy.gameTitle1}
                <br />
                {copy.gameTitle2}
              </h3>
              <p className="text-xs leading-relaxed mb-5" style={{ color: "#4A2E4D" }}>
                {copy.gameDesc}
              </p>
              <button
                onClick={() => onNav("spin")}
                className="text-xs font-semibold rounded-full px-5 py-2.5"
                style={{ background: "#4B1B52", color: "#F5EAF7" }}
              >
                {copy.exploreGame} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED DISHES ============ */}
      <section className="px-4 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 gap-4 flex-wrap">
            <div>
              <div className="text-[11px] tracking-[2px] font-bold mb-2" style={{ color: "#B4409A" }}>
                {copy.chefPicks}
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
              >
                {copy.featuredTitle}
              </h2>
              <Squiggle width={120} className="mt-2" />
            </div>
            <button
              onClick={() => onNav("menu")}
              className="text-sm font-semibold border-b border-dashed pb-1"
              style={{ color: "#4B1B52", borderColor: "#4B1B52" }}
            >
              {copy.viewFullMenu} →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_DISHES.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
                style={{ boxShadow: "0 12px 30px -18px rgba(60,20,60,0.25)" }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={DISH_IMAGES[dish.id] || DISH_IMAGES[1]}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  {dish.tag && (
                    <div
                      className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-base"
                      style={{ background: "#E9AF3B" }}
                    >
                      🍽️
                    </div>
                  )}
                  {dish.tag && (
                    <div
                      className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "#4B1B52", color: "#F5EAF7" }}
                    >
                      {dish.tag}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#7A3E1F" }}
                  >
                    {lang === "ms" && dish.nameMy ? dish.nameMy : dish.name}
                  </div>
                  <div className="text-xs leading-relaxed mb-4 min-h-[3.5rem]" style={{ color: "#5A4550" }}>
                    {lang === "ms" && dish.descMy ? dish.descMy : dish.desc}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-base font-bold" style={{ color: "#3A1240" }}>
                      RM {dish.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => onInspectCard(DISH_TO_CARD[dish.id] || "c1")}
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                      style={{ background: "#E9AF3B", color: "#3A1240" }}
                      title="Inspect card"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="px-4 md:px-16 py-8">
        <div
          className="max-w-7xl mx-auto rounded-3xl px-8 md:px-12 py-12 relative overflow-hidden"
          style={{ background: "#EFE1F0" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <div className="text-[11px] tracking-[2px] font-bold mb-2" style={{ color: "#B4409A" }}>
                {copy.howItWorksBadge}
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
              >
                {copy.howItWorksTitle}
              </h2>
              <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "#4A2E4D" }}>
                {copy.howItWorksBlurb}
              </p>
              <div className="relative w-32 h-32">
                <svg width="120" height="120" viewBox="0 0 120 120" className="absolute top-0 left-0">
                  <defs>
                    <path id="circtext" d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                  </defs>
                  <text fontSize="9" letterSpacing="2" fill="#7A3E82" fontWeight="600">
                    <textPath href="#circtext" startOffset="2%">
                      DINE • COLLECT • REDEEM •
                    </textPath>
                  </text>
                </svg>
                <div
                  className="absolute top-7 left-7 w-16 h-16 rounded-full flex flex-col items-center justify-center gap-0.5"
                  style={{ background: "#4B1B52" }}
                >
                  <ChefVLogo size={20} />
                  <div
                    className="text-[9px] font-bold"
                    style={{ color: "#F5EAF7", fontFamily: "'Playfair Display', serif" }}
                  >
                    Chef V
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: 1, title: copy.step1Title, desc: copy.step1Desc, icon: "receipt" },
                { n: 2, title: copy.step2Title, desc: copy.step2Desc, icon: "cards" },
                { n: 3, title: copy.step3Title, desc: copy.step3Desc, icon: "gift" },
              ].map((step) => (
                <div key={step.n} className="rounded-2xl p-6 relative" style={{ background: "#FBF1E4" }}>
                  <div
                    className="absolute -top-4 left-5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: "#4B1B52", color: "#F5EAF7" }}
                  >
                    {step.n}
                  </div>
                  <div className="h-16 flex items-center justify-center my-4">
                    {step.icon === "receipt" && (
                      <div className="relative w-24 h-12">
                        <div
                          className="w-9 h-12 bg-white absolute left-0 top-0"
                          style={{
                            transform: "rotate(-8deg)",
                            clipPath:
                              "polygon(0 0,100% 0,100% 92%,88% 100%,76% 92%,64% 100%,52% 92%,40% 100%,28% 92%,16% 100%,4% 92%,0 100%)",
                            boxShadow: "0 4px 10px -4px rgba(60,20,60,0.3)",
                          }}
                        >
                          <div className="px-1.5 pt-1.5 space-y-0.5">
                            <div className="h-0.5 bg-[#E4D6E6]"></div>
                            <div className="h-0.5 bg-[#E4D6E6]"></div>
                            <div className="h-0.5 bg-[#E4D6E6]"></div>
                          </div>
                        </div>
                        <div
                          className="w-10 h-12 bg-[#EAE0F2] border border-[#D8C3DE] rounded absolute left-1/2 top-0 -translate-x-1/2 flex items-center justify-center"
                          style={{ transform: "translateX(30%) rotate(9deg)" }}
                        >
                          <ChefVLogo size={16} />
                        </div>
                      </div>
                    )}
                    {step.icon === "cards" && (
                      <div className="relative w-32 h-14">
                        <div
                          className="w-10 h-12 absolute left-0 top-0 rounded border"
                          style={{
                            background: "#EAE0F2",
                            borderColor: "#D8C3DE",
                            transform: "rotate(-10deg)",
                          }}
                        />
                        <div
                          className="w-10 h-12 absolute left-1/2 top-0 -translate-x-1/2 rounded border bg-white flex items-center justify-center"
                          style={{
                            borderColor: "#E4CFA6",
                            transform: "translateX(-50%) rotate(4deg)",
                            boxShadow: "0 6px 12px -6px rgba(60,20,60,0.3)",
                          }}
                        >
                          <ChefVLogo size={16} />
                        </div>
                        <div
                          className="w-10 h-12 absolute right-0 top-0 rounded border"
                          style={{
                            background: "#F3E8D8",
                            borderColor: "#E4CFA6",
                            transform: "rotate(14deg)",
                          }}
                        />
                      </div>
                    )}
                    {step.icon === "gift" && (
                      <div className="relative">
                        <div className="w-14 h-12 rounded relative" style={{ background: "#4B1B52" }}>
                          <div
                            className="absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2"
                            style={{ background: "#E9AF3B" }}
                          />
                          <div
                            className="absolute left-0 right-0 -top-3 h-4 rounded-t-lg"
                            style={{ background: "#4B1B52" }}
                          />
                          <div
                            className="absolute left-1/2 -top-3 w-1.5 h-4 -translate-x-1/2"
                            style={{ background: "#E9AF3B" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "#5A4550" }}>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => onNav("shop")}
              className="text-sm font-semibold rounded-full px-7 py-3 shadow-md"
              style={{ background: "#4B1B52", color: "#F5EAF7" }}
            >
              {copy.exploreRewards} →
            </button>
          </div>
        </div>
      </section>

      {/* ============ BRANCHES ============ */}
      <section className="px-4 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-6 gap-4 flex-wrap">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
            >
              {copy.branchesTitle}
            </h2>
            <button
              onClick={() => onNav("menu")}
              className="text-sm font-semibold border-b border-dashed pb-1"
              style={{ color: "#4B1B52", borderColor: "#4B1B52" }}
            >
              {copy.viewAllLocations} →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {topBranches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
                style={{ boxShadow: "0 10px 26px -18px rgba(60,20,60,0.25)" }}
              >
                <div
                  className="relative h-28 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #EFE1F0 0%, #FBF1E4 100%)" }}
                >
                  <MapPin size={28} style={{ color: "#4B1B52" }} />
                  <div
                    className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "#E9AF3B" }}
                  >
                    <MapPin size={14} style={{ color: "#3A1240" }} />
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-bold text-sm mb-2" style={{ color: "#4B1B52" }}>
                    {branch.name}
                  </div>
                  <div className="text-xs leading-relaxed mb-2" style={{ color: "#5A4550" }}>
                    {branch.address}
                  </div>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                    className="text-xs flex items-center gap-1 mb-1"
                    style={{ color: "#5A4550" }}
                  >
                    <Phone size={11} /> {branch.phone}
                  </a>
                  <div className="text-xs" style={{ color: "#5A4550" }}>
                    🕐 11:00 AM – 11:00 PM
                  </div>
                </div>
              </div>
            ))}

            {/* "More locations" tile */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-end p-4"
              style={{ background: "#EDE3D3", minHeight: "200px" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 300 260" className="absolute inset-0">
                <path d="M10 40 L60 20 L120 50 L180 15 L260 45 L290 20" stroke="#D9C7A3" strokeWidth="1.4" fill="none" />
                <path d="M20 120 L100 100 L160 140 L240 110 L280 130" stroke="#D9C7A3" strokeWidth="1.4" fill="none" />
                <path d="M0 200 L80 180 L150 220 L220 190 L300 210" stroke="#D9C7A3" strokeWidth="1.4" fill="none" />
              </svg>
              <svg
                width="20"
                height="26"
                viewBox="0 0 24 32"
                className="absolute top-12 left-1/2"
                style={{ fill: "#4B1B52" }}
              >
                <path d="M12 0C6 0 1 5 1 11c0 8 11 21 11 21s11-13 11-21C23 5 18 0 12 0z" />
              </svg>
              <div
                className="relative rounded-xl px-4 py-3 flex items-center gap-2 w-full"
                style={{ background: "#4B1B52" }}
              >
                <Sparkles size={14} style={{ color: "#F5EAF7" }} />
                <div className="text-xs font-semibold" style={{ color: "#F5EAF7" }}>
                  {copy.moreLocations}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="px-4 md:px-16 py-12 text-center">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#4B1B52" }}
          >
            {copy.testimonialsTitle}
          </h2>
          <Squiggle width={120} className="mx-auto mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: copy.testimonial1Name, quote: copy.testimonial1 },
              { name: copy.testimonial2Name, quote: copy.testimonial2 },
              { name: copy.testimonial3Name, quote: copy.testimonial3 },
            ].map((tt, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-left"
                style={{ boxShadow: "0 10px 26px -18px rgba(60,20,60,0.2)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold"
                    style={{ background: "#F3E8D8", color: "#4B1B52" }}
                  >
                    {tt.name.charAt(0)}
                  </div>
                  <div className="text-xl" style={{ color: "#E9AF3B" }}>
                    &rdquo;
                  </div>
                </div>
                <div className="text-sm leading-relaxed mb-4 min-h-[5rem]" style={{ color: "#4A2E4D" }}>
                  {tt.quote}
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "#4B1B52" }}>
                  {tt.name}
                </div>
                <div className="text-sm tracking-[2px]" style={{ color: "#E9AF3B" }}>
                  ★★★★★
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        className="relative px-4 md:px-16 pt-14 pb-6 overflow-hidden"
        style={{ background: "#3A1240", color: "#EADCEA" }}
      >
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          className="absolute right-[-40px] bottom-[-60px] opacity-25"
          fill="none"
          stroke="#6B3070"
          strokeWidth="1.5"
        >
          <circle cx="130" cy="130" r="90" />
          <circle cx="130" cy="130" r="60" />
          <path d="M40 130 Q130 60 220 130 Q130 200 40 130Z" />
        </svg>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ChefVLogo size={34} light />
              <div
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
              >
                Chef V
              </div>
            </div>
            <div className="text-[10px] tracking-[3px] font-semibold" style={{ color: "#C9A9CC" }}>
              WESTERN FOOD
            </div>
          </div>

          <div>
            <div className="font-bold text-sm mb-4" style={{ color: "#fff" }}>
              {copy.footerQuickLinks}
            </div>
            <div className="flex flex-col gap-2.5 text-[13px]" style={{ color: "#D8C3D9" }}>
              <button onClick={() => onNav("menu")} className="text-left hover:underline">
                {copy.footerLinkMenu}
              </button>
              <button onClick={() => onNav("spin")} className="text-left hover:underline">
                {copy.footerLinkGame}
              </button>
              <a href="#" className="hover:underline">
                {copy.footerLinkAbout}
              </a>
              <a href="#" className="hover:underline">
                {copy.footerLinkEvents}
              </a>
              <a href="#" className="hover:underline">
                {copy.footerLinkContact}
              </a>
            </div>
          </div>

          <div>
            <div className="font-bold text-sm mb-4" style={{ color: "#fff" }}>
              {copy.footerFollow}
            </div>
            <div className="flex gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                📷
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                f
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                P
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                ▶
              </div>
            </div>
            <div
              className="text-xl"
              style={{ fontFamily: "'Caveat', cursive", color: "#EAC6E8" }}
            >
              {copy.footerTagline}
            </div>
          </div>

          <div>
            <div className="font-bold text-sm mb-4" style={{ color: "#fff" }}>
              {copy.footerNewsletter}
            </div>
            <div className="text-xs mb-4" style={{ color: "#D8C3D9" }}>
              {copy.footerNewsletterDesc}
            </div>
            <div
              className="flex rounded-full p-1"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <input
                placeholder={copy.footerEmailPlaceholder}
                className="flex-1 bg-transparent border-none outline-none text-xs px-3 py-2"
                style={{ color: "#fff" }}
              />
              <button
                className="rounded-full w-8 h-8 font-bold flex items-center justify-center"
                style={{ background: "#E9AF3B", color: "#3A1240" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative flex flex-wrap justify-between items-center gap-3 mt-10 pt-5 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)", color: "#B995BC" }}
        >
          <div>{copy.footerCopyright}</div>
          <div className="flex gap-5">
            <a href="#" className="hover:underline">
              {copy.footerPrivacy}
            </a>
            <a href="#" className="hover:underline">
              {copy.footerTerms}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
