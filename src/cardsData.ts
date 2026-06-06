/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Card {
  id: string;
  name: string;
  stars: number; // 1, 2, or 3
  image: string; // URL or placeholder representation
  description: string;
  isUltimate?: boolean;
  value: string; // Price representation e.g. "RM 9.90"
}

export interface AdminConfig {
  rates: {
    // 1-star package drops
    pack1: { common: number; rare: number; legendary: number };
    // 2-star package drops
    pack2: { common: number; rare: number; legendary: number };
    // 3-star package drops
    pack3: { common: number; rare: number; legendary: number };
  };
  pityThreshold: number; // Guaranteed 3-star after N packs
  receiptTiers: {
    minimumReceipt: number; // minimum spend to get 1-star pack
    tier2Receipt: number;   // spend > this to get 2-star pack
    tier3Receipt: number;   // spend > this to get 3-star pack
  };
  ultimateMonthlyLimit: number;
}

export interface UserStats {
  email: string;
  name: string;
  stardust: number;
  collectedIds: { [cardId: string]: number }; // cardId -> quantity collected
  pityCounter: number; // packs opened without legendary
  totalReceiptsUploaded: number;
  totalSpent: number;
  totalSpins: number;
  ultimateCountThisMonth: number;
}

export const RESTAURANT_CARDS: Card[] = [
  // 1-Star Cards (Common)
  {
    id: "c1",
    name: "Classic Grilled Chicken Chop",
    stars: 1,
    image: "/src/assets/images/grilled_chicken_chop_cartoon_1780735447825.png",
    description: "Sizzling grilled chicken chop cooked to a perfect golden-brown, served with thick-cut fries, fresh shredded coleslaw, a soft dinner roll, and a side of savory mushroom brown gravy.",
    value: "RM 15.90"
  },
  {
    id: "c3",
    name: "Double Decker Chicken Burger",
    stars: 1,
    image: "/src/assets/images/chicken_egg_burger_cartoon_1780735469954.png",
    description: "A juicy, crispy fried chicken thigh topped with a perfectly fried sunny-side-up egg, fresh garden lettuce, tomato slices, and creamy mayonnaise, served with a generous side of french fries.",
    value: "RM 13.90"
  },
  {
    id: "c9",
    name: "Mushroom Soup & Garlic Bread",
    stars: 1,
    image: "/src/assets/images/soup_garlic_bread_cartoon_1780735486986.png",
    description: "Deeply comforting, warm cream of wild mushroom soup garnished with freshly chopped parsley, served with two pieces of perfectly toasted, buttery garlic bread.",
    value: "RM 8.90"
  },

  // 2-Star Cards (Rare)
  {
    id: "c4",
    name: "Crispy Chicken Chop",
    stars: 2,
    image: "/src/assets/images/crispy_chicken_chop_cartoon_1780735500873.png",
    description: "Golden-crisp breaded chicken chop served with delicious straight-cut fries, a soft bun, fresh house coleslaw, and signature savory gravy.",
    value: "RM 15.90"
  },
  {
    id: "c6",
    name: "Ham & Bacon Carbonara",
    stars: 2,
    image: "/src/assets/images/ham_bacon_carbonara_cartoon_1780735516272.png",
    description: "Rich and creamy carbonara spaghetti tossed with plenty of savory chicken ham slices, served with a lightly toasted dinner roll on the side.",
    value: "RM 12.90"
  },
  {
    id: "c7",
    name: "Ham Tomato Spaghetti",
    stars: 2,
    image: "/src/assets/images/ham_tomato_spaghetti_cartoon_1780735534020.png",
    description: "Classic spaghetti tossed in sweet and tangy tomato marinara sauce, topped with tender rectangular chicken ham slices and served with a soft dinner roll.",
    value: "RM 11.90"
  },

  // 3-Star Cards (Legendary)
  {
    id: "c2",
    name: "Sizzling Crispy Chicken Pasta",
    stars: 3,
    image: "/src/assets/images/sizzling_chicken_pasta_cartoon_1780735549849.png",
    description: "Extra-crispy breaded chicken chop served on a sizzling hotplate over a bed of savory black pepper spaghetti, accompanied by golden fries, fresh coleslaw, and a dinner roll.",
    value: "RM 18.90"
  },
  {
    id: "c5",
    name: "Grilled Chicken Baked Rice",
    stars: 3,
    image: "/src/assets/images/chicken_baked_rice_cartoon_1780735567112.png",
    description: "Slices of seasoned grilled chicken over a bed of savory rice, baked with a thick, golden layer of bubbling mozzarella and parmesan cheese, served in our signature single-handle blue bowl.",
    value: "RM 17.90"
  },
  {
    id: "c8",
    name: "Dual Chicken Cheese Gratin",
    stars: 3,
    image: "/src/assets/images/chicken_cheese_gratin_cartoon_1780735583103.png",
    description: "The ultimate cheese baked rice! Features both crispy golden chicken cutlet slices and juicy grilled chicken breast layered over baked rice, covered in rich bubbling mozzarella cheese and fine herbs in a signature blue bowl.",
    value: "RM 22.90",
    isUltimate: true
  }
];

export const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  rates: {
    pack1: { common: 80, rare: 18, legendary: 2 },
    pack2: { common: 30, rare: 60, legendary: 10 },
    pack3: { common: 5, rare: 35, legendary: 60 }
  },
  pityThreshold: 5, // Get guaranteed 3-star (legendary) card on 5th open if none received
  receiptTiers: {
    minimumReceipt: 10.0, // RM10+ spent gets 1-star pack
    tier2Receipt: 45.0,   // RM45+ spent gets 2-star pack
    tier3Receipt: 90.0    // RM90+ spent gets 3-star pack
  },
  ultimateMonthlyLimit: 5
};

export const INITIAL_USER_STATS = (email: string, name: string): UserStats => ({
  email,
  name,
  stardust: 150, // Start with some free stardust to purchase a starter booster immediately!
  collectedIds: {
    "c1": 1, // Start with a basic classic chicken chop so the dashboard looks warm!
  },
  pityCounter: 0,
  totalReceiptsUploaded: 1,
  totalSpent: 15.9,
  totalSpins: 1,
  ultimateCountThisMonth: 0
});

export const SAMPLE_RECEIPTS = [
  {
    id: "REC-9381-VAL",
    store: "Chef V Western Food - PJ Section 14",
    total: 15.90,
    items: "1x Classic Chicken Chop (RM 9.90), 1x Iced Lemon Tea (RM 6.00)",
    date: "2026-06-05 13:42",
    tier: 1
  },
  {
    id: "REC-4210-VAL",
    store: "Chef V Western Food - Cheras",
    total: 52.80,
    items: "1x Signature Grilled Salmon (RM 24.90), 1x Cheesy Chicken Parma (RM 18.90), 2x Creamy Soup (RM 9.00)",
    date: "2026-06-06 19:15",
    tier: 2
  },
  {
    id: "REC-7742-VAL",
    store: "Chef V Western Food - SS15 Subang",
    total: 119.00,
    items: "1x Ultimate Western Combo (RM 119.00)",
    date: "2026-06-06 20:30",
    tier: 3
  }
];
