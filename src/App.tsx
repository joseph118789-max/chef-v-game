/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import { useI18n } from './i18n/useI18n.js';
// @ts-ignore
import { languageList } from './i18n/index.js';
import { uiCopy } from './i18n/uiCopy';

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Upload,
  User,
  Settings,
  Coins,
  Ticket,
  Plus,
  Search,
  Award,
  ShoppingBag,
  Lock,
  RefreshCw,
  FileText,
  CheckCircle,
  TrendingUp,
  LogOut,
  Share2,
  Camera,
  ChefHat,
  Heart,
  Info,
  X,
  ChevronRight,
  Sliders,
  Scissors,
  Check,
  Package,
  Eye,
  Trash2,
  LockKeyhole,
  Users,
} from "lucide-react";
import {
  RESTAURANT_CARDS,
  DEFAULT_ADMIN_CONFIG,
  INITIAL_USER_STATS,
  SAMPLE_RECEIPTS,
  Card,
  AdminConfig,
  UserStats
} from "./cardsData";
import MembersPanel from "./features/members/index";
import LanguageSwitcher from "./components/LanguageSwitcher";
import RestaurantMenu from "./components/RestaurantMenu";

export default function App() {
  // ---- 1. State Initialization (with LocalStorage persistence) ----
  const [user, setUser] = useState<UserStats | null>(() => {
    const saved = localStorage.getItem("chef_v_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Starts logged output by default so visitor sees the stunning restaurant home, then logs in.
    return null;
  });

  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem("chef_v_admin_config");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_ADMIN_CONFIG;
      }
    }
    return DEFAULT_ADMIN_CONFIG;
  });

  const [currentTab, setCurrentTab] = useState<"home" | "menu" | "album" | "spin" | "shop" | "admin">("home");

  // i18n language state — initialize from localStorage so refreshes stick
  const [lang, setLangState] = useState<'en' | 'cn' | 'ms'>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage?.getItem('chefv_lang');
    return saved === 'cn' || saved === 'ms' || saved === 'en' ? saved : 'en';
  });
  const setLang = (next: 'en' | 'cn' | 'ms') => {
    setLangState(next);
    try { window.localStorage.setItem('chefv_lang', next); } catch {}
  };
  const { t } = useI18n(lang);
  const ui = uiCopy[lang];
  
  // App Feedback toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" | "error" } | null>(null);

  // Authentication Mock Modal
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Receipt Scanner States
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string; size: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResults, setScanResults] = useState<{ id: string; total: number; items: string; tier: number } | null>(null);

  // Spin Wheel & Reward States
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDeg, setSpinDeg] = useState(0);
  const [spinRewardTier, setSpinRewardTier] = useState<number | null>(null); // 1, 2, 3 stars booster pack
  const [earnedPacksQueue, setEarnedPacksQueue] = useState<number[]>([]); // Queue of pack star tiers to open

  // Tear & Draw States
  const [activeOpeningPack, setActiveOpeningPack] = useState<{ tier: number } | null>(null);
  const [isTorn, setIsTorn] = useState(false);
  const [tearProgress, setTearProgress] = useState(0); // 0 to 100 for slide indicator
  const [drawOffset, setDrawOffset] = useState(0); // drag pixel offset upwards
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [revealedCard, setRevealedCard] = useState<Card | null>(null);
  const [isNewCard, setIsNewCard] = useState(false);
  const [animateDuplicateConversion, setAnimateDuplicateConversion] = useState(false);
  const [gainedStardust, setGainedStardust] = useState(0);

  // Detailed Modal view for cards
  const [selectedInspectCard, setSelectedInspectCard] = useState<Card | null>(null);

  // Sound indicators (visual representation of sound/vibration)
  const [soundEffect, setSoundEffect] = useState<string | null>(null);

  // Drag-and-drop receipt highlight
  const [dragOverReceipt, setDragOverReceipt] = useState(false);

  // Store trigger helper variables
  const dragContainerRef = useRef<HTMLDivElement>(null);

  // Save changes to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("chef_v_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("chef_v_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("chef_v_admin_config", JSON.stringify(adminConfig));
  }, [adminConfig]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (text: string, type: "success" | "info" | "error" = "success") => {
    setToastMessage({ text, type });
  };

  const triggerSound = (label: string) => {
    setSoundEffect(`🔊 ${label}`);
    setTimeout(() => setSoundEffect(null), 1500);
  };

  // ---- 2. Core Game Logic ----

  // Simulate Google Login
  const handleGoogleLogin = (email: string, name: string) => {
    const newUser = INITIAL_USER_STATS(email, name);
    // Merge existing local data if any
    const localSaved = localStorage.getItem(`chef_v_user_profile_${email}`);
    if (localSaved) {
      try {
        setUser(JSON.parse(localSaved));
      } catch (e) {
        setUser(newUser);
      }
    } else {
      setUser(newUser);
    }
    showToast((t.toast?.signedIn || `Logged in successfully as ${name}! Welcome to Chef V Club.`).replace(/{name}/g, name), "success");
    setShowAuthModal(false);
    triggerSound("Google Sign-In Chime");
  };

  const handleSignOut = () => {
    if (user) {
      // backup progress individually
      localStorage.setItem(`chef_v_user_profile_${user.email}`, JSON.stringify(user));
    }
    setUser(null);
    setCurrentTab("home");
    showToast(t.toast?.signedOut || "Signed out from Chef V loyalty system.", "info");
  };

  // Receipt Simulation Selection
  const applySampleReceipt = (sampleIndex: number) => {
    if (!user) {
      showToast(t.toast?.signInFirstScan || "Please sign in first to scan receipts!", "error");
      setShowAuthModal(true);
      return;
    }
    const sample = SAMPLE_RECEIPTS[sampleIndex];
    setUploadedFile({
      name: `Simulated_ChefV_${sample.id}.jpg`,
      url: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=300&q=80",
      size: "242 KB"
    });
    setScanResults({
      id: sample.id,
      total: sample.total,
      items: sample.items,
      tier: sample.tier
    });
    showToast(t.toast?.sampleLoaded || "Sample receipt loaded. Ready to scan!", "info");
  };

  // Custom File Uploader handler
  const handleReceiptImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      showToast(t.toast?.signInFirstUpload || "Please sign in first to upload receipts!", "error");
      setShowAuthModal(true);
      return;
    }
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const virtualTotal = Math.floor(Math.random() * 120) + 12; // RM12.00 to RM132.00 spend simulation
      let tier = 1;
      let mockItems = "1x Signature Gourmet Western Dish, 1x Fruit Juice";
      if (virtualTotal >= adminConfig.receiptTiers.tier3Receipt) {
        tier = 3;
        mockItems = "2x Signature Steaks, 2x Sides Platter, 3x Special Sodas";
      } else if (virtualTotal >= adminConfig.receiptTiers.tier2Receipt) {
        tier = 2;
        mockItems = "1x Salmon Grill, 1x Seafood Pasta, 2x Creamy Chowder";
      }

      setUploadedFile({
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024).toFixed(1)} KB`
      });
      setScanResults({
        id: `REC-${Math.floor(1000 + Math.random() * 9000)}-RAW`,
        total: virtualTotal,
        items: mockItems,
        tier: tier
      });
      showToast(t.toast?.receiptUploaded || "Receipt uploaded successfully. Press Start Scan!", "success");
    }
  };

  // Scan Receipt Laser Action
  const startReceiptScan = () => {
    if (!uploadedFile || !scanResults) return;
    setIsScanning(true);
    setScanStep(1);
    triggerSound("Beep! Laser Scanner Activated");

    // Phase 1: Laser sweep starts
    setTimeout(() => {
      setScanStep(2);
      triggerSound("Buzz... Optical Character Recognition running");
    }, 1200);

    // Phase 2: Querying total and products
    setTimeout(() => {
      setScanStep(3);
      triggerSound("Chime! Receipt analysis complete");
    }, 2400);

    // Phase 3: Verified & reward allocated
    setTimeout(() => {
      setIsScanning(false);
      setScanStep(4);
      
      // Update User Stats with spent amount
      if (user) {
        const updatedStats = { ...user };
        updatedStats.totalReceiptsUploaded += 1;
        updatedStats.totalSpent += scanResults.total;
        setUser(updatedStats);
      }
      
      showToast(`${t.toast?.verifySuccessPrefix || "Verification Successful! Spent: RM"} ${scanResults.total.toFixed(2)}. ${t.toast?.verifySuccessSuffix || "Spin Wheel unlocked!"}`, "success");
    }, 3600);
  };

  // Reset receipt screen to try again
  const resetReceiptScanner = () => {
    setUploadedFile(null);
    setScanResults(null);
    setScanStep(0);
  };

  // Spin Wheel implementation
  const triggerSpin = () => {
    if (isSpinning) return;
    if (!user || !scanResults) {
      showToast(t.toast?.signInSpin || "Please verify a valid receipt first to unlock a spin!", "error");
      return;
    }

    setIsSpinning(true);
    triggerSound("Tick! Tick! Tick! Wheel spinning...");

    // Based on the spend level (tier), we calculate how lucky their package will be!
    // Admin config receiptTiers:
    // Spent determines which booster is automatically triggered, but they get to spin to win a specific booster!
    // Let's create an ultimate visual representation: the wheel spins, and lands on 1-Star (bronze), 2-Star (silver), or 3-Star (gold) pack!
    // The probability is influenced by receipt spending tier:
    let destinationSector = 1; // 1 = 1-Star, 2 = 2-Star, 3 = 3-Star pack
    const rng = Math.random() * 100;

    if (scanResults.tier === 3) {
      // High spend: RM90+ -> guarantees high packages!
      if (rng < 10) destinationSector = 1;      // 10% 1-Star
      else if (rng < 45) destinationSector = 2; // 35% 2-Star
      else destinationSector = 3;               // 55% 3-Star (High probability!)
    } else if (scanResults.tier === 2) {
      // Medium spend: RM45+
      if (rng < 30) destinationSector = 1;      // 30% 1-Star
      else if (rng < 80) destinationSector = 2; // 50% 2-Star
      else destinationSector = 3;               // 20% 3-Star
    } else {
      // Standard spend: < RM45
      if (rng < 80) destinationSector = 1;      // 80% 1-Star
      else if (rng < 97) destinationSector = 2; // 17% 2-Star
      else destinationSector = 3;               // 3% 3-Star
    }

    setSpinRewardTier(destinationSector);

    // Angle configuration:
    // Sector 1: 0 - 120deg
    // Sector 2: 120 - 240deg
    // Sector 3: 240 - 360deg
    let angleBase = 360 * 6; // 6 full spins
    let angleTarget = 0;
    if (destinationSector === 1) {
      angleTarget = 60 + (Math.random() * 40 - 20); // Center on 60
    } else if (destinationSector === 2) {
      angleTarget = 180 + (Math.random() * 40 - 20); // Center on 180
    } else {
      angleTarget = 300 + (Math.random() * 40 - 20); // Center on 300
    }

    const totalAngle = angleBase + angleTarget;
    setSpinDeg(totalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      triggerSound("🎉 Ta-da! Package Won!");
      
      // Add won booster package to their inventory queue
      setEarnedPacksQueue((prev) => [...prev, destinationSector]);
      
      // Update User Spins Count
      if (user) {
        setUser((prev) => prev ? {
          ...prev,
          totalSpins: prev.totalSpins + 1
        } : null);
      }

      showToast(`${t.toast?.congratsPrefix || "Congratulations! You won a"} ${destinationSector}${t.toast?.congratsSuffix || "-Star Cook Booster Package!"}`, "success");
      
      // Instantly pop the pack opening sequence!
      openPackFromQueue(destinationSector);
      
      // Reset receipt data so they require another receipt for subsequent spins
      resetReceiptScanner();
    }, 3500);
  };

  // Purchase pack from the Stardust shop
  const purchaseBoosterFromShop = (tier: number, cost: number) => {
    if (!user) {
      showToast(t.toast?.signInFirstShop || "Please sign in first to make shop purchases!", "error");
      setShowAuthModal(true);
      return;
    }
    if (user.stardust < cost) {
      showToast((t.toast?.insufficient || `Insufficient Stardust! You need ${cost} stardust but only have ${user.stardust}.`).replace(/{need}/g, cost).replace(/{have}/g, user.stardust), "error");
      triggerSound("Low Funds Alert");
      return;
    }

    // Spend stardust and queue the pack
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        stardust: prev.stardust - cost
      };
    });

    triggerSound("Cha-Ching! Package Purchased");
    showToast(`${t.toast?.purchasedPrefix || "Purchased a"} ${tier}${t.toast?.purchasedMid || "-Star Pack with"} ${cost} ${t.toast?.purchasedSuffix || "Stardust!"}`, "success");
    openPackFromQueue(tier);
  };

  // Trigger Pack Tearing & Draw UI Overlay
  const openPackFromQueue = (tier: number) => {
    setActiveOpeningPack({ tier });
    setIsTorn(false);
    setTearProgress(0);
    setDrawOffset(0);
    setRevealedCard(null);
    setIsNewCard(false);
    setAnimateDuplicateConversion(false);
    setGainedStardust(0);
  };

  // Perform Foil Tear Line sliding
  const handleTearSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setTearProgress(val);
    if (val >= 95 && !isTorn) {
      setIsTorn(true);
      triggerSound("Foil Ripping Noise");
      showToast(t.toast?.foilRippedToast || "Foil package ripped open! Slowly draw the card inside up.", "info");
    }
  };

  // Handle Drag Card Pull Upwards Actions
  const handleCardDragStart = (clientY: number) => {
    if (!isTorn || revealedCard) return;
    setIsDraggingCard(true);
    setDragStartY(clientY);
  };

  const handleCardDragMove = (clientY: number) => {
    if (!isDraggingCard || !isTorn || revealedCard) return;
    const diff = dragStartY - clientY;
    if (diff > 0) {
      // Limit pull displacement
      const adjusted = Math.min(diff, 280);
      setDrawOffset(adjusted);
      
      if (adjusted >= 260) {
        // Exceeded drawing boundary: TRIGGER REVEAL!
        setIsDraggingCard(false);
        triggerCardReveal();
      }
    } else {
      setDrawOffset(0);
    }
  };

  const handleCardDragEnd = () => {
    if (!isDraggingCard) return;
    setIsDraggingCard(false);
    // If not fully dragged up, spring back down beautifully
    if (drawOffset < 220) {
      const interval = setInterval(() => {
        setDrawOffset((prev) => {
          if (prev <= 10) {
            clearInterval(interval);
            return 0;
          }
          return prev - 25;
        });
      }, 16);
    } else {
      // Auto-reveal if dragged very high up
      triggerCardReveal();
    }
  };

  // Reveal the card drawn
  const triggerCardReveal = () => {
    if (!user || !activeOpeningPack) return;
    setDrawOffset(280); // Ensure is at peak draw distance

    const tier = activeOpeningPack.tier;
    
    // Choose rates based on pack level or Admin parameters
    let commonRate = 80;
    let rareRate = 18;
    let legendaryRate = 2;

    if (tier === 1) {
      commonRate = adminConfig.rates.pack1.common;
      rareRate = adminConfig.rates.pack1.rare;
      legendaryRate = adminConfig.rates.pack1.legendary;
    } else if (tier === 2) {
      commonRate = adminConfig.rates.pack2.common;
      rareRate = adminConfig.rates.pack2.rare;
      legendaryRate = adminConfig.rates.pack2.legendary;
    } else if (tier === 3) {
      commonRate = adminConfig.rates.pack3.common;
      rareRate = adminConfig.rates.pack3.rare;
      legendaryRate = adminConfig.rates.pack3.legendary;
    }

    // Handle Pity rule: If user pityCounter is equal or greater than pityThreshold, guarantee a 3-star legendary card
    const isPityTriggered = user.pityCounter >= (adminConfig.pityThreshold - 1);
    
    // Filter available cards by rarity levels
    const commonCards = RESTAURANT_CARDS.filter(c => c.stars === 1);
    const rareCards = RESTAURANT_CARDS.filter(c => c.stars === 2);
    const legendaryCards = RESTAURANT_CARDS.filter(c => c.stars === 3);

    let rolledCard: Card;

    if (isPityTriggered) {
      // Guaranteed legendary
      const idx = Math.floor(Math.random() * legendaryCards.length);
      rolledCard = legendaryCards[idx];
      showToast(t.toast?.pityActivated || "🌠 Pity System Activated! Guaranteed high-tier Drop!", "success");
    } else {
      // Normal rolled random number
      const roll = Math.random() * 100;
      if (roll < legendaryRate) {
        const idx = Math.floor(Math.random() * legendaryCards.length);
        rolledCard = legendaryCards[idx];
      } else if (roll < (legendaryRate + rareRate)) {
        const idx = Math.floor(Math.random() * rareCards.length);
        rolledCard = rareCards[idx];
      } else {
        const idx = Math.floor(Math.random() * commonCards.length);
        rolledCard = commonCards[idx];
      }
    }

    // CHECK FOR ULTIMATE CARD LIMIT (e.g. Card 9 "Ultimate Western Combo")
    // limit of ultimate card draws globally/locally in the monthly span
    if (rolledCard.isUltimate && user.ultimateCountThisMonth >= adminConfig.ultimateMonthlyLimit) {
      // Exceeded! Downgrade to another legendary card (Card 7 or 8) to honor limit strictly!
      const nonUltimateLegendaries = legendaryCards.filter(c => !c.isUltimate);
      if (nonUltimateLegendaries.length > 0) {
        rolledCard = nonUltimateLegendaries[Math.floor(Math.random() * nonUltimateLegendaries.length)];
      } else {
        rolledCard = rareCards[Math.floor(Math.random() * rareCards.length)]; // backup rare
      }
      showToast(t.toast?.ultimateLimited || "Note: Ultimate card limit met for this user. Alternative deluxe card pulled!", "info");
    }

    // Determine if user already has this card (to decide duplicate conversion logic)
    const alreadyReceived = user.collectedIds[rolledCard.id] && user.collectedIds[rolledCard.id] > 0;
    
    // Calculate stardust conversions
    let stardustGain = 0;
    if (alreadyReceived) {
      if (rolledCard.stars === 1) stardustGain = 20;
      else if (rolledCard.stars === 2) stardustGain = 50;
      else stardustGain = 150;
      setGainedStardust(stardustGain);
    }

    // Apply outcomes to User Profile state
    setUser((prev) => {
      if (!prev) return null;
      
      const updatedCollection = { ...prev.collectedIds };
      let newPity = prev.pityCounter;
      let ultCount = prev.ultimateCountThisMonth;

      // Add to collection count
      updatedCollection[rolledCard.id] = (updatedCollection[rolledCard.id] || 0) + 1;

      // If legendary rolled, reset pity, otherwise increment
      if (rolledCard.stars === 3) {
        newPity = 0;
      } else {
        newPity += 1;
      }

      // Track ultimate monthly list
      if (rolledCard.isUltimate) {
        ultCount += 1;
      }

      return {
        ...prev,
        collectedIds: updatedCollection,
        stardust: alreadyReceived ? prev.stardust + stardustGain : prev.stardust,
        pityCounter: newPity,
        ultimateCountThisMonth: ultCount
      };
    });

    setRevealedCard(rolledCard);
    setIsNewCard(!alreadyReceived);
    triggerSound("Ta-da Reveal Sound, gold shining sparks!");

    if (alreadyReceived) {
      // Trigger conversion animation interval shortly after showing card
      setTimeout(() => {
        setAnimateDuplicateConversion(true);
        triggerSound("Sci-fi dissolving particles magic stardust");
      }, 1500);
    }
  };

  // Close the Pack Drawing Interface overlay
  const finishBoosterDraw = () => {
    setActiveOpeningPack(null);
    setIsTorn(false);
    setTearProgress(0);
    setDrawOffset(0);
    setRevealedCard(null);
    setIsNewCard(false);
    setAnimateDuplicateConversion(false);
    setGainedStardust(0);
  };

  // Seed / Reset Database progress to default
  const handleFullReset = () => {
    if (user) {
      const fresh = INITIAL_USER_STATS(user.email, user.name);
      setUser(fresh);
      showToast(t.toast?.resetDone || "Card Collector progress reset to starter pack state!", "info");
    } else {
      showToast(t.toast?.resetSignInFirst || "You must be signed in first to reset stats.", "error");
    }
  };

  // Trigger sound simulation
  const dismissSoundBadge = () => setSoundEffect(null);

  return (
    <div className="min-h-screen bg-[#FFF5F6] text-slate-800 font-sans flex flex-col antialiased selection:bg-[#F24E82] selection:text-white">
      
      {/* Dynamic sound overlay banner (shows vibration/sfx cue inside client SPA beautifully) */}
      {soundEffect && (
        <div 
          onClick={dismissSoundBadge}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white font-bold text-xs px-4 py-2 rounded-full cursor-pointer shadow-lg z-50 animate-bounce duration-100 flex items-center gap-2 border border-white/20"
        >
          <span>{soundEffect}</span>
          <span className="text-[9px] opacity-70">(click to close)</span>
        </div>
      )}

      {/* Persistent Toast alerts */}
      {toastMessage && (
        <div 
          className={`fixed bottom-5 right-5 text-slate-800 text-sm px-5 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3 transition-all transform duration-300 translate-y-0 max-w-sm border ${
            toastMessage.type === "success" ? "bg-white border-emerald-500/30 text-emerald-600 shadow-emerald-100" :
            toastMessage.type === "error" ? "bg-white border-orange-500/30 text-orange-600 shadow-orange-100" :
            "bg-white border-pink-500/30 text-[#F24E82] shadow-pink-100"
          }`}
        >
          {toastMessage.type === "success" && <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-550" />}
          {toastMessage.type === "error" && <Info className="w-5 h-5 flex-shrink-0 animate-pulse text-orange-550" />}
          {toastMessage.type === "info" && <Info className="w-5 h-5 flex-shrink-0 text-pink-550" />}
          <span className="font-semibold text-slate-800">{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-auto text-slate-400 hover:text-slate-600 transition-colors pointer-events-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* -------------------- MAIN NAVIGATION HEADER -------------------- */}
      <header className="bg-[#F24E82] border-b border-[#E03E70] text-white py-4 px-4 md:px-8 flex flex-wrap justify-between items-center shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Chef V Logo" className="w-10 h-10 rounded-full object-cover border border-white/30 shadow-inner" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              {t.header?.title || 'Chef V Western Food'}
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#FED1DF] leading-none mt-1">
              {t.header?.subtitle || 'Restoran Makanan Barat CHEF V · Western Restaurant'}
            </p>
          </div>
        </div>

        {/* Action button floating in top right */}
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <LanguageSwitcher lang={lang} onLangChange={setLang} />

          <a
            href="https://wa.me/601161058122"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00D06C] hover:bg-[#00B05C] font-bold text-xs px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-md transition-all text-white no-underline"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            {t.header?.whatsappOrder || '📞 WhatsApp Order'}
          </a>

          {user ? (
            <div className="flex items-center gap-2 bg-white/20 px-3.5 py-2 rounded-full border border-white/25 text-xs shadow-inner">
              <div className="w-5 h-5 bg-gradient-to-br from-[#FFD54F] to-[#FF8A65] rounded-full text-white font-extrabold flex items-center justify-center text-[10px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[100px] truncate hidden sm:inline text-white font-bold">{user.name}</span>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="hover:text-[#FED1DF] transition-colors cursor-pointer ml-1 text-white/80"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white hover:bg-pink-50 text-[#F24E82] font-extrabold text-xs px-5 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
            >
              {t.auth?.signIn || 'Sign In'}
            </button>
          )}
        </div>
      </header>

      {/* Sub menu tabs exactly aligned with standard Chef V menu options */}
      <div className="bg-white border-b border-[#FAD0D6] flex justify-center py-2.5 px-4 shadow-sm scrollbar-thin overflow-x-auto">
        <div className="flex gap-2 text-xs md:text-sm">
          <button 
            onClick={() => setCurrentTab("home")} 
            className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${currentTab === "home" ? "bg-[#F24E82] text-white shadow-md" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            {t.nav?.home || 'Restaurant Home'}
          </button>
          <button
            onClick={() => setCurrentTab("menu")}
            className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${currentTab === "menu" ? "bg-[#F24E82] text-white shadow-md" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            {t.nav?.menu || 'Menu'}
          </button>
          <button 
            onClick={() => {
              if (!user) {
                showToast(t.toast?.signInForAlbum || "Please sign in with Google to access the collector system!", "info");
                setShowAuthModal(true);
                return;
              }
              setCurrentTab("album");
            }} 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentTab === "album" ? "bg-[#F24E82] text-white shadow-md" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            <Award className="w-3.5 h-3.5" />
            {t.nav?.album || 'Collection Board'}
          </button>
          <button 
            onClick={() => {
              if (!user) {
                showToast(t.toast?.signInFirstSpin || "Please sign in first to verify receipt & spin!", "info");
                setShowAuthModal(true);
                return;
              }
              setCurrentTab("spin");
            }} 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentTab === "spin" ? "bg-[#F24E82] text-white shadow-md" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            <Ticket className="w-3.5 h-3.5 animate-pulse" />
            {t.nav?.spin || 'Spin Package'}
          </button>
          <button 
            onClick={() => {
              if (!user) {
                showToast(t.toast?.signInForShop || "Please sign in to access the Collector Shop!", "info");
                setShowAuthModal(true);
                return;
              }
              setCurrentTab("shop");
            }} 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentTab === "shop" ? "bg-[#F24E82] text-white shadow-md" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {t.nav?.shop || 'Stardust Shop'}
          </button>
          <button 
            onClick={() => setCurrentTab("admin")} 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentTab === "admin" ? "bg-slate-300 text-slate-800 shadow-sm" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            <Sliders className="w-3.5 h-3.5" />
            {t.nav?.admin || 'Admin rates'}
          </button>
          <button 
            onClick={() => setCurrentTab("members")} 
            className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${currentTab === "members" ? "bg-[#F24E82] text-white shadow-md" : "bg-slate-150 text-slate-700 hover:bg-slate-200"}`}
          >
            <Users className="w-3.5 h-3.5" />
            {t.nav?.members || 'Members'}
          </button>
        </div>
      </div>

      {/* -------------------- STATS & STARDUST HEADER DISPLAY -------------------- */}
      {user && (
        <div className="bg-white border-b border-[#FAD0D6] py-3 px-4 md:px-8 flex flex-wrap gap-4 justify-between items-center text-xs shadow-sm">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1.5 text-slate-600">
              <User className="w-3.5 h-3.5 text-[#F24E82]" />
              {ui.stats.collector}: <strong className="text-slate-800 font-bold">{user.name}</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              {ui.stats.totalSpent}: <strong className="text-emerald-600 font-bold">RM {user.totalSpent.toFixed(2)}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Guaranteed High drop tracking */}
            <div className="bg-[#FFF5F6] px-3.5 py-1.5 rounded-full border border-[#FED1DF] flex items-center gap-2 text-[11px] text-slate-700">
              <span className="text-[#F24E82] font-semibold animate-pulse">🌠 {ui.stats.pity}:</span>
              <span className="font-bold text-slate-900">{user.pityCounter} / {adminConfig.pityThreshold}</span>
              <span className="text-[10px] text-slate-500 font-mono">({ui.stats.opened}: {user.pityCounter})</span>
            </div>

            {/* Glowing Stardust balance layout */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-100 px-4 py-1.5 rounded-full border border-pink-200 flex items-center gap-2.5 shadow-md">
              <Coins className="w-4 h-4 text-[#F24E82]" />
              <span className="text-slate-750 font-bold">{ui.stats.stardust}:</span>
              <span className="font-extrabold text-[#F24E82] text-sm tracking-wider font-mono">{user.stardust} ⭐</span>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- TAB CONTENT -------------------- */}
      <main className="flex-grow flex flex-col">
        
        {/* ================= TAB 1: RESTAURANT HOME HOME ================= */}
        {currentTab === "home" && (
          <div className="flex-grow flex flex-col bg-[#FFF5F6]">
            {/* Soft Warm Header Gradient matching user uploaded receipt exact branding */}
            <section className="bg-gradient-to-r from-[#F24E82] via-[#FF8A65] to-[#FFD54F] text-white py-14 px-4 md:px-12 text-center relative overflow-hidden flex flex-col items-center justify-center border-b border-pink-200">
              
              {/* Absolutes for pattern decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full transform translate-x-16 translate-y-16"></div>

              <span className="bg-pink-100/30 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 inline-flex items-center gap-1.5 shadow-sm transform hover:scale-105 transition-all">
                📍 {t.home?.branches || t.hero?.badge || '7 Branches Across Klang Valley'}
              </span>
              
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl text-white">
                {t.hero?.title1 || 'Affordable Western Food'} <br />{t.hero?.title2 || 'Starting from RM 9.90!'}
              </h2>
              
              <p className="mt-4 text-sm md:text-base text-white/95 max-w-xl font-medium">
                {t.hero?.description || 'Freshly cooked with quality spices · Dine-in or Takeaway'}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => {
                    const el = document.getElementById("recipe-gallery");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    showToast(t.home?.scrollHint || "Slowing scrolling down to Interactive Food Gallery!", "info");
                  }}
                  className="bg-white hover:bg-pink-50 text-[#F24E82] font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {t.hero?.viewMenu || 'View Menu'}
                </button>
                <button 
                  onClick={() => showToast(t.home?.branchesToast || "PJ Section 14, SS15 Subang, Cheras, Kepong, Puchong, Klang & Shah Alam branches found!", "success")}
                  className="border border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-full shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {t.hero?.findUs || 'Find Us'}
                </button>
              </div>
            </section>

            {/* Quick Promo alert for Loyalty Card game */}
            <section className="bg-white text-slate-800 py-6 px-4 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#FAD0D6]">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#F24E82] to-[#FF8A65] p-2.5 text-white rounded-xl animate-bounce shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#F24E82]">{ui.homePromo.title}</h3>
                  <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
                    {ui.homePromo.desc}
                  </p>
                </div>
              </div>
              <div>
                {user ? (
                  <button 
                    onClick={() => setCurrentTab("album")}
                    className="bg-[#F24E82] hover:bg-[#E03E70] text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {ui.homePromo.dashboard} <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-[#F24E82] hover:bg-[#E03E70] text-white font-extrabold text-xs px-6 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    {ui.homePromo.signInJoin}
                  </button>
                )}
              </div>
            </section>

            {/* Food Gallery Section - Same as the real website screenshot */}
            <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto w-full">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-extrabold text-[#F24E82] flex items-center justify-center gap-2">
                  <ChefHat className="w-7 h-7 text-[#F24E82]" /> {ui.gallery.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1">{ui.gallery.sub}</p>
                <div className="w-20 h-1 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] mx-auto mt-3 rounded-full"></div>
              </div>

              <div id="recipe-gallery" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Product 1 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#FAD0D6] group flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src="/src/assets/images/grilled_chicken_chop_cartoon_1780735447825.png" 
                      alt={ui.gallery.cards[0].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {ui.gallery.cards[0].badge}
                    </div>
                  </div>
                  <div className="p-5 text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-lg text-slate-800">{ui.gallery.cards[0].title}</h4>
                      <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">{ui.gallery.cards[0].desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const card = RESTAURANT_CARDS.find(c => c.id === "c1");
                        if (card) {
                          setSelectedInspectCard(card);
                          triggerSound("card_selected");
                        }
                      }}
                      className="mt-4 bg-[#F24E82] hover:bg-[#E03E70] text-white text-xs font-bold py-2.5 px-4 rounded-full transition-colors cursor-pointer w-full text-center shadow-sm"
                    >
                      {t.cards?.inspect || 'Inspect Food Card'}
                    </button>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#FAD0D6] group flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src="/src/assets/images/chicken_baked_rice_cartoon_1780735567112.png" 
                      alt={ui.gallery.cards[1].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {ui.gallery.cards[1].badge}
                    </div>
                  </div>
                  <div className="p-5 text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-lg text-slate-800">{ui.gallery.cards[1].title}</h4>
                      <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">{ui.gallery.cards[1].desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const card = RESTAURANT_CARDS.find(c => c.id === "c5");
                        if (card) {
                          setSelectedInspectCard(card);
                          triggerSound("card_selected");
                        }
                      }}
                      className="mt-4 bg-[#F24E82] hover:bg-[#E03E70] text-white text-xs font-bold py-2.5 px-4 rounded-full transition-colors cursor-pointer w-full text-center shadow-sm"
                    >
                      {t.cards?.inspect || 'Inspect Food Card'}
                    </button>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#FAD0D6] group flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src="/src/assets/images/chicken_cheese_gratin_cartoon_1780735583103.png" 
                      alt={ui.gallery.cards[2].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {ui.gallery.cards[2].badge}
                    </div>
                  </div>
                  <div className="p-5 text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-lg text-slate-800">{ui.gallery.cards[2].title}</h4>
                      <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">{ui.gallery.cards[2].desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const card = RESTAURANT_CARDS.find(c => c.id === "c8");
                        if (card) {
                          setSelectedInspectCard(card);
                          triggerSound("card_selected");
                        }
                      }}
                      className="mt-4 bg-[#F24E82] hover:bg-[#E03E70] text-white text-xs font-bold py-2.5 px-4 rounded-full transition-colors cursor-pointer w-full text-center shadow-sm"
                    >
                      {t.cards?.inspect || 'Inspect Food Card'}
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* ================= TAB 2: RESTAURANT MENU ================= */}
        {currentTab === "menu" && (
          <div className="py-10 px-4 md:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col">
            <RestaurantMenu lang={lang} />
          </div>
        )}

        {/* ================= TAB 3: COLLECTION ALBUM DASHBOARD ================= */}
        {currentTab === "album" && user && (
          <div className="py-10 px-4 md:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#F24E82] tracking-tight flex items-center gap-2">
                  {ui.album.title}
                </h2>
                <p className="text-slate-600 text-sm mt-0.5">{ui.album.sub}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setCurrentTab("spin")}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 font-bold text-xs px-5 py-2.5 rounded-full text-white inline-flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse"
                >
                  <Ticket className="w-4 h-4 animate-bounce text-white" /> {ui.album.scan}
                </button>
                <button 
                  onClick={handleFullReset}
                  className="bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs px-4 py-2.5 rounded-full transition-all inline-flex items-center gap-1.5 border border-slate-200 cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> {ui.album.reset}
                </button>
              </div>
            </div>

            {/* CARD GROUPS: 1-Star, 2-Star, 3-Star sections */}
            {[1, 2, 3].map((starLevel) => {
              const starCards = RESTAURANT_CARDS.filter(c => c.stars === starLevel);
              const countOfTotalInStars = starCards.filter(c => (user.collectedIds[c.id] || 0) > 0).length;

              return (
                <div key={starLevel} className="mb-10 bg-white rounded-3xl p-6 md:p-8 shadow-md border border-[#FAD0D6]">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-pink-100 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="flex">
                        {Array.from({ length: starLevel }).map((_, i) => (
                          <span key={i} className="text-xl text-yellow-500 animate-pulse">⭐</span>
                        ))}
                      </span>
                      <h3 className="font-extrabold text-slate-800 text-lg md:text-xl">
                        {ui.album.packs[starLevel - 1]}
                      </h3>
                    </div>
                    <span className="text-xs bg-[#FFF5F6] mt-2 sm:mt-0 font-bold px-4 py-2 rounded-full text-[#F24E82] border border-[#FED1DF] self-start sm:self-auto">
                      {ui.album.progress(countOfTotalInStars)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {starCards.map((card) => {
                      const countCollected = user.collectedIds[card.id] || 0;
                      const hasCard = countCollected > 0;

                      return (
                        <div 
                          key={card.id}
                          id={`card-${card.id}`}
                          onClick={() => setSelectedInspectCard(card)}
                          className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                            hasCard 
                              ? starLevel === 3
                                ? "bg-white border-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transform hover:-translate-y-1"
                                : starLevel === 2
                                  ? "bg-white border-slate-350 shadow-md transform hover:-translate-y-1 hover:shadow-indigo-100"
                                  : "bg-white border-pink-200 shadow-md transform hover:-translate-y-1 hover:shadow-pink-100"
                              : `bg-[#FFF9FA]/65 border-2 border-dashed border-pink-200/80 opacity-55 hover:opacity-75`
                          }`}
                          style={{ minHeight: "340px" }}
                        >
                          {/* Duplicate badge indicator */}
                          {hasCard && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white font-extrabold text-xs px-3.5 py-1 rounded-full z-10 shadow border border-white/20 select-none">
                              {ui.album.collected(countCollected)}
                            </div>
                          )}

                          {card.isUltimate && (
                            <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-extrabold text-[10px] px-3 py-2 rounded-br-2xl absolute top-0 left-0 z-10 shadow uppercase tracking-wide">
                              {ui.album.ultimate}
                            </div>
                          )}

                          <div className="relative h-44 w-full select-none overflow-hidden bg-slate-50 border-b border-[#FAD0D6]">
                            {hasCard ? (
                              <img 
                                src={card.image} 
                                alt={card.name} 
                                className="w-full h-full object-cover object-center brightness-95"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-5 text-center">
                                <Lock className="w-8 h-8 mb-2 opacity-45 text-[#F24E82]" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{ui.album.locked}</span>
                              </div>
                            )}
                          </div>

                          <div className="p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-1">
                                <h4 className={`font-bold mt-1 ${hasCard ? "text-slate-800" : "text-slate-400"}`}>
                                  {card.name}
                                </h4>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full z-5 shrink-0 ${hasCard ? "bg-pink-150 text-[#F24E82]" : "bg-slate-100 text-slate-400"}`}>
                                  {card.value}
                                </span>
                              </div>
                              <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${hasCard ? "text-slate-600" : "text-slate-400"}`}>
                                {hasCard ? card.description : ui.album.lockedDesc}
                              </p>
                            </div>

                            {/* Glow indicators inside unlocked items */}
                            {hasCard && (
                              <div className="border-t border-pink-105 mt-4 pt-3 flex justify-between items-center text-[10px] text-[#F24E82] font-semibold">
                                <span className="flex items-center gap-1">{ui.album.level(Math.min(countCollected, 10))}</span>
                                <span className="hover:underline text-[#FF8A65] cursor-pointer">{ui.album.details}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 3: RECEIPT SCANNER & SPIN ================= */}
        {currentTab === "spin" && user && (
          <div className="py-10 px-4 md:px-12 max-w-5xl mx-auto w-full flex-grow flex flex-col">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-[#F24E82] tracking-tight flex items-center justify-center gap-2">
                {ui.spin.title}
              </h2>
              <p className="text-slate-600 text-sm mt-1">{ui.spin.sub}</p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Receipt Uploader column */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#FAD0D6] flex flex-col">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2 border-b border-pink-100 pb-3">
                  <Camera className="w-5 h-5 text-[#F24E82]" /> {ui.spin.step1}
                </h3>

                {/* Quick Simulation Options */}
                <div className="mb-5 bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                  <span className="text-xs font-bold text-[#F24E82] block mb-2.5 uppercase tracking-wider">
                    {ui.spin.presets}
                  </span>
                  <div className="space-y-2">
                    {SAMPLE_RECEIPTS.map((rec, i) => (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => applySampleReceipt(i)}
                        className="w-full text-left bg-white hover:bg-pink-50/40 border border-pink-100 hover:border-[#F24E82] p-2.5 rounded-xl transition-all flex justify-between items-center text-xs text-slate-700 cursor-pointer shadow-xs"
                      >
                        <div className="truncate pr-2">
                          <strong className="block text-slate-800">{rec.store}</strong>
                          <span className="text-[10px] text-slate-500 block truncate mt-0.5">{rec.items}</span>
                        </div>
                        <span className="bg-[#FFF5F6] text-[#F24E82] border border-pink-200 px-2 py-1 rounded-md font-bold shrink-0">
                          RM {rec.total.toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real drag drop uploader mock */}
                <div 
                  className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all ${
                    dragOverReceipt ? "border-[#F24E82] bg-pink-100/30" : "border-pink-200 hover:border-[#F24E82] bg-[#FFFBFB]"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragOverReceipt(true); }}
                  onDragLeave={() => setDragOverReceipt(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverReceipt(false);
                    // Mock upload trigger anyway representatively
                    applySampleReceipt(Math.floor(Math.random() * SAMPLE_RECEIPTS.length));
                  }}
                >
                  <label className="cursor-pointer block">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleReceiptImageUpload} 
                      className="hidden" 
                    />
                    <Upload className="w-10 h-10 text-pink-300 mx-auto mb-3" />
                    <span className="text-sm font-semibold text-slate-800 block">{ui.spin.upload}</span>
                    <span className="text-xs text-slate-400 mt-1 block">{ui.spin.formats}</span>
                  </label>
                </div>

                {uploadedFile && scanResults && (
                  <div className="mt-6 bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <div className="flex justify-between items-start mb-3 border-b border-pink-100 pb-2">
                      <div className="truncate pr-2">
                        <span className="text-xs bg-[#FFF5F6] text-[#F24E82] border border-pink-250 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">{ui.spin.ready}</span>
                        <h4 className="text-sm font-extrabold text-slate-800 truncate mt-1">{uploadedFile.name}</h4>
                      </div>
                      <button onClick={resetReceiptScanner} className="text-[#F24E82] hover:text-red-500 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {isScanning ? (
                      <div className="py-4 relative overflow-hidden bg-slate-900 text-emerald-400 font-mono text-[11px] p-3 rounded-xl border border-emerald-500/20 shadow-inner">
                        
                        {/* Shimmering Scan lines effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_#10B981] animate-bounce z-10"></div>
                        
                        <p className="mb-1 text-slate-500">{`> START SCANNER ENGINE VERSION 2.1...`}</p>
                        {scanStep >= 1 && <p className="mb-1 text-emerald-300">{`> OCR READ SUCCESS! Found receipt: ${scanResults.id}`}</p>}
                        {scanStep >= 2 && <p className="mb-1 text-emerald-300">{`> EXTRACTED TOTAL: RM ${scanResults.total.toFixed(2)}`}</p>}
                        {scanStep >= 3 && <p className="text-emerald-400 animate-pulse">{`> VALIDATIVE ANALYSIS COMPLETE! SPIN UNLOCKED!`}</p>}
                      </div>
                    ) : (
                      <div>
                        {scanStep === 4 ? (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex gap-2 items-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div>
                              <strong className="text-emerald-900">{ui.spin.verified}</strong> {ui.spin.verifiedText(scanResults.total.toFixed(2))}
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={startReceiptScan}
                            className="w-full bg-[#F24E82] hover:bg-[#E03E70] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4" /> {ui.spin.triggerScan}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dynamic Spin Wheel Column */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#FAD0D6] flex flex-col items-center">
                <h3 className="font-bold text-slate-800 text-lg mb-6 self-start flex items-center gap-2 border-b border-pink-100 pb-3 w-full">
                  <Ticket className="w-5 h-5 text-[#F24E82]" /> {ui.spin.step2}
                </h3>

                {/* Spin Wheel graphic */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 my-4 rounded-full border-8 border-pink-100 bg-[#FFF5F6] flex items-center justify-center overflow-hidden shadow-xl">
                  
                  {/* Pin locator pointer */}
                  <div className="absolute top-0 z-30 -translate-y-2">
                    <div className="w-6 h-6 bg-[#F24E82] border-2 border-white transform rotate-45 rounded-tl-full rounded-br-2xl shadow-xl"></div>
                  </div>

                  {/* Inside sector divisions */}
                  <div 
                    className="w-full h-full rounded-full transition-transform duration-[3500ms] ease-out flex items-center justify-center"
                    style={{ 
                      transform: `rotate(${spinDeg}deg)`,
                      background: "conic-gradient(#FFB1C1 0deg 120deg, #FF9E80 120deg 240deg, #F24E82 240deg 360deg)"
                    }}
                  >
                    {/* Sector Text Labels */}
                    <div className="absolute translate-y-[-75px] -rotate-90 text-slate-800 text-xs font-black drop-shadow-md tracking-wider uppercase select-none">
                      {t.spin?.sector1 || "🍗 1-Star Pouch"}
                    </div>
                    <div className="absolute translate-y-[55px] translate-x-[55px] rotate-[150deg] text-slate-900 text-xs font-black drop-shadow-md tracking-wider uppercase select-none">
                      {t.spin?.sector2 || "🥩 2-Star Silver"}
                    </div>
                    <div className="absolute translate-y-[55px] translate-x-[-55px] rotate-[30deg] text-white text-xs font-black drop-shadow-md tracking-wider uppercase select-none">
                      {t.spin?.sector3 || "👑 3-Star Royal"}
                    </div>
                  </div>

                  {/* Inner gold center wheel spin cap */}
                  <div className="absolute w-20 h-20 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] rounded-full border-4 border-white z-20 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-xs uppercase animate-pulse select-none">{t.spin?.centerLabel || 'CHEF V'}</span>
                  </div>
                </div>

                <div className="mt-4 text-center w-full">
                  <span className="text-xs text-slate-500 mb-3 block">
                    {ui.spin.tierHint}
                  </span>

                  <button
                    onClick={triggerSpin}
                    disabled={isSpinning || scanStep !== 4}
                    className={`w-full font-extrabold text-sm py-4 px-6 rounded-2xl shadow-md transition-all cursor-pointer ${
                      scanStep === 4 
                        ? "bg-[#F24E82] hover:bg-[#E03E70] text-white animate-pulse" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    }`}
                  >
                    {isSpinning ? ui.spin.spinning : scanStep === 4 ? ui.spin.tap : ui.spin.verifyFirst}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 4: STARDUST BOOSTER SHOP ================= */}
        {currentTab === "shop" && user && (
          <div className="py-10 px-4 md:px-12 max-w-6xl mx-auto w-full flex-grow flex flex-col bg-[#FFF5F6]">
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-[#F24E82] tracking-tight flex items-center justify-center gap-2">
                {ui.shop.title}
              </h2>
              <p className="text-slate-600 text-sm mt-1">{ui.shop.sub}</p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#F24E82] to-[#FF8A65] mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Product 1: 1-Star foil */}
              <div className="bg-white rounded-3xl p-6 border border-[#FAD0D6] shadow-sm flex flex-col items-center text-center relative group hover:shadow-pink-100 hover:-translate-y-1 transition-all duration-300">
                <span className="bg-[#FFF5F6] text-[#F24E82] border border-pink-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase absolute top-4 right-4">
                  {ui.shop.packs[0].tier}
                </span>
                
                {/* Pack visual container */}
                <div className="w-28 h-36 bg-gradient-to-br from-[#d48c5a] to-[#804825] rounded-xl my-6 flex flex-col items-center justify-center text-white relative shadow-md group-hover:scale-105 transition-transform">
                  <div className="absolute top-1 inset-x-1 border border-white/20 rounded-lg"></div>
                  <Package className="w-10 h-10 mb-2 opacity-90 animate-pulse text-white" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#FFF]">{ui.shop.packs[0].short}</span>
                  <span className="text-[9px] opacity-80 mt-1">{ui.shop.packs[0].kind}</span>
                </div>

                <h3 className="font-extrabold text-slate-850 text-lg">{ui.shop.packs[0].title}</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed px-2">
                  {ui.shop.packs[0].desc}
                </p>

                <div className="mt-6 border-t border-pink-100 pt-5 w-full">
                  <div className="flex justify-between items-center text-xs text-slate-600 mb-4 px-1">
                    <span>{ui.shop.dropRate}</span>
                    <span className="font-semibold text-slate-800">Common: {adminConfig.rates.pack1.common}% · Rare: {adminConfig.rates.pack1.rare}%</span>
                  </div>

                  <button
                    onClick={() => purchaseBoosterFromShop(1, 100)}
                    className="w-full bg-[#FFF5F6] hover:bg-[#FED1DF]/40 border border-[#FED1DF] text-[#F24E82] font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {ui.shop.packs[0].redeem}
                  </button>
                </div>
              </div>

              {/* Product 2: 2-Star Silver foil */}
              <div className="bg-white rounded-3xl p-6 border border-[#FAD0D6] shadow-sm flex flex-col items-center text-center relative group hover:shadow-pink-100 hover:-translate-y-1 transition-all duration-300">
                <span className="bg-[#FFF5F6] text-slate-500 border border-[#FED1DF] text-[10px] font-bold px-3 py-1 rounded-full uppercase absolute top-4 right-4">
                  {ui.shop.packs[1].tier}
                </span>
                
                {/* Pack visual container */}
                <div className="w-28 h-36 bg-gradient-to-br from-[#E2E8F0] to-[#64748B] rounded-xl my-6 flex flex-col items-center justify-center text-white relative shadow-md group-hover:scale-105 transition-transform">
                  <div className="absolute top-1 inset-x-1 border border-white/20 rounded-lg"></div>
                  <Package className="w-10 h-10 mb-2 opacity-90 animate-pulse text-white" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#FFF]">{ui.shop.packs[1].short}</span>
                  <span className="text-[9px] opacity-80 mt-1">{ui.shop.packs[1].kind}</span>
                </div>

                <h3 className="font-extrabold text-slate-850 text-lg">{ui.shop.packs[1].title}</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed px-2">
                  {ui.shop.packs[1].desc}
                </p>

                <div className="mt-6 border-t border-pink-100 pt-5 w-full">
                  <div className="flex justify-between items-center text-xs text-slate-600 mb-4 px-1">
                    <span>{ui.shop.dropRate}</span>
                    <span className="font-semibold text-slate-800">Rare: {adminConfig.rates.pack2.rare}% · Legendary: {adminConfig.rates.pack2.legendary}%</span>
                  </div>

                  <button
                    onClick={() => purchaseBoosterFromShop(2, 250)}
                    className="w-full bg-[#FFF5F6] hover:bg-[#FED1DF]/40 border border-[#FED1DF] text-[#F24E82] font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {ui.shop.packs[1].redeem}
                  </button>
                </div>
              </div>

              {/* Product 3: 3-Star Royal Gold foil */}
              <div className="bg-white rounded-3xl p-6 border border-[#FAD0D6] shadow-sm flex flex-col items-center text-center relative group hover:shadow-amber-100 hover:-translate-y-1 transition-all border-amber-300 duration-300">
                <span className="bg-amber-100/30 text-amber-600 border border-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase absolute top-4 right-4">
                  {ui.shop.packs[2].tier}
                </span>
                
                {/* Pack visual container */}
                <div className="w-28 h-36 bg-gradient-to-br from-[#FEF08A] to-[#EAB308] rounded-xl my-6 flex flex-col items-center justify-center text-[#713F12] relative shadow-md group-hover:scale-105 transition-transform">
                  <div className="absolute top-1 inset-x-1 border border-[#713F12]/10 rounded-lg"></div>
                  <Package className="w-10 h-10 mb-2 opacity-90 animate-pulse text-[#713F12]" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{ui.shop.packs[2].short}</span>
                  <span className="text-[9px] opacity-80 mt-1 font-semibold">{ui.shop.packs[2].kind}</span>
                </div>

                <h3 className="font-extrabold text-slate-850 text-lg">{ui.shop.packs[2].title}</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed px-2">
                  {ui.shop.packs[2].desc}
                </p>

                <div className="mt-6 border-t border-pink-100 pt-5 w-full">
                  <div className="flex justify-between items-center text-xs text-slate-600 mb-4 px-1">
                    <span>{ui.shop.dropRate}</span>
                    <span className="font-semibold text-slate-800">Legendary: {adminConfig.rates.pack3.legendary}% · 3-Star Guaranteed</span>
                  </div>

                  <button
                    onClick={() => purchaseBoosterFromShop(3, 500)}
                    className="w-full bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white hover:brightness-110 font-extrabold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {ui.shop.packs[2].redeem}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 6: MEMBERS PANEL ================= */}
        {currentTab === "members" && (
          <MembersPanel
            showToast={(text, type) => setToastMessage({ text, type })}
            t={t}
            lang={lang}
          />
        )}

        {/* ================= TAB 5: ADMIN RATES PANEL ================= */}
        {currentTab === "admin" && (
          <div className="py-10 px-4 md:px-12 max-w-5xl mx-auto w-full flex-grow flex flex-col">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#F24E82] tracking-tight flex items-center gap-2">
                  {ui.admin.title}
                </h2>
                <p className="text-slate-600 text-sm mt-0.5">{ui.admin.sub}</p>
              </div>

              <div className="bg-white rounded-full px-4 py-1.5 flex items-center gap-2 text-xs text-slate-500 border border-pink-200 shadow-xs">
                <LockKeyhole className="w-3.5 h-3.5 text-[#F24E82]" />
                <span>{ui.admin.session}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#FAD0D6] flex flex-col gap-8">
              
              {/* Box 1: Drop Rates configuration */}
              <div>
                <h3 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-1 border-b pb-2 border-pink-100">
                  {ui.admin.rates}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Pack 1 */}
                  <div className="bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#F24E82] mb-3 block">{ui.admin.packRates[0]}</h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.common}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack1.common}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack1.common}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack1: { ...prev.rates.pack1, common: val } }
                            }));
                          }}
                          className="w-full accent-[#F24E82]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.rare}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack1.rare}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack1.rare}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack1: { ...prev.rates.pack1, rare: val } }
                            }));
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.legendary}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack1.legendary}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack1.legendary}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack1: { ...prev.rates.pack1, legendary: val } }
                            }));
                          }}
                          className="w-full accent-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pack 2 */}
                  <div className="bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#FF8A65] mb-3 block">{ui.admin.packRates[1]}</h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.common}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack2.common}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack2.common}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack2: { ...prev.rates.pack2, common: val } }
                            }));
                          }}
                          className="w-full accent-[#F24E82]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.rare}</span>
                          <span className="font-bold text-slate-800">{adminConfig.rates.pack2.rare}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack2.rare}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack2: { ...prev.rates.pack2, rare: val } }
                            }));
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.legendary}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack2.legendary}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack2.legendary}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack2: { ...prev.rates.pack2, legendary: val } }
                            }));
                          }}
                          className="w-full accent-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pack 3 */}
                  <div className="bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-600 mb-3 block">{ui.admin.packRates[2]}</h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.common}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack3.common}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack3.common}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack3: { ...prev.rates.pack3, common: val } }
                            }));
                          }}
                          className="w-full accent-[#F24E82]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.rare}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack3.rare}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack3.rare}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack3: { ...prev.rates.pack3, rare: val } }
                            }));
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-slate-700">
                          <span>{ui.admin.legendary}</span>
                          <span className="font-bold text-[#F24E82]">{adminConfig.rates.pack3.legendary}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" 
                          value={adminConfig.rates.pack3.legendary}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAdminConfig(prev => ({
                              ...prev,
                              rates: { ...prev.rates, pack3: { ...prev.rates.pack3, legendary: val } }
                            }));
                          }}
                          className="w-full accent-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Box 2: Spent Tier limits & Pity counts */}
              <div>
                <h3 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-1 border-b pb-2 border-pink-100">
                  {ui.admin.config}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <label className="text-xs font-bold text-slate-750 block mb-2">{ui.admin.pity}</label>
                    <input 
                      type="number" 
                      value={adminConfig.pityThreshold}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setAdminConfig(prev => ({ ...prev, pityThreshold: val }));
                      }}
                      className="w-full border border-pink-200 rounded-lg p-2.5 text-xs bg-white text-slate-800 focus:outline-[#F24E82] focus:border-[#F24E82] font-semibold"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1.5">{ui.admin.pityHelp}</span>
                  </div>

                  <div className="bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <label className="text-xs font-bold text-slate-750 block mb-2">{ui.admin.spend}</label>
                    <input 
                      type="number" 
                      value={adminConfig.receiptTiers.tier2Receipt}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 10.0;
                        setAdminConfig(prev => ({
                          ...prev,
                          receiptTiers: { ...prev.receiptTiers, tier2Receipt: val }
                        }));
                      }}
                      className="w-full border border-pink-200 rounded-lg p-2.5 text-xs bg-white text-slate-800 focus:outline-[#F24E82] focus:border-[#F24E82] font-semibold"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1.5">{ui.admin.spendHelp}</span>
                  </div>

                  <div className="bg-[#FFF5F6] p-4 rounded-2xl border border-[#FED1DF]">
                    <label className="text-xs font-bold text-slate-750 block mb-2">{ui.admin.monthly}</label>
                    <input 
                      type="number" 
                      value={adminConfig.ultimateMonthlyLimit}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setAdminConfig(prev => ({ ...prev, ultimateMonthlyLimit: val }));
                      }}
                      className="w-full border border-pink-200 rounded-lg p-2.5 text-xs bg-white text-slate-800 focus:outline-[#F24E82] focus:border-[#F24E82] font-semibold"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1.5">{ui.admin.monthlyHelp}</span>
                  </div>

                </div>
              </div>

              {/* Reset to system default button */}
              <div className="flex justify-end border-t border-pink-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setAdminConfig(DEFAULT_ADMIN_CONFIG);
                    showToast(t.toast?.restoredToast || "Admin rates restored to standard dining calibration!", "success");
                    triggerSound("Calibrator Chimes Reset");
                  }}
                  className="bg-[#F24E82] hover:bg-[#E03E70] text-white px-6 py-2.5 rounded-full font-bold text-xs cursor-pointer transition-all shadow-sm"
                >
                  {ui.admin.restore}
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="bg-white text-slate-500 text-xs py-10 px-4 mt-auto border-t border-[#FAD0D6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-extrabold text-[#F24E82] text-sm">{t.header?.title || 'Chef V Western Food'}</p>
            <p className="mt-1 font-light opacity-80 text-slate-400">{ui.footer.copyright}</p>
          </div>
          <div className="flex gap-4 opacity-80 text-slate-500">
            <button onClick={() => showToast(t.toast?.branchCallPJ || "Simulating PJ branch call!", "info")} className="hover:text-[#F24E82] transition-colors">PJ Sect 14</button>
            <span>·</span>
            <button onClick={() => showToast(t.toast?.branchCallSS15 || "Simulating Subang SS15 branch call!", "info")} className="hover:text-[#F24E82] transition-colors">Subang SS15</button>
            <span>·</span>
            <button onClick={() => showToast(t.toast?.branchCallCheras || "Simulating Cheras branch call!", "info")} className="hover:text-[#F24E82] transition-colors">{t.spin?.centerLabel || "CHEF V"}</button>
            <span>·</span>
            <button onClick={() => showToast(ui.footer.terms, "info")} className="hover:text-[#F24E82] transition-colors">{ui.footer.terms}</button>
          </div>
        </div>
      </footer>

      {/* ================= MODAL: SEARCH/INSPECT CARD DETAIL PREVIEW ================= */}
      {selectedInspectCard && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-md w-full shadow-2xl relative border border-slate-800/80">
            
            <button 
              onClick={() => setSelectedInspectCard(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-950/60 hover:bg-slate-950/80 rounded-full flex items-center justify-center text-white transition-all shadow cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full select-none overflow-hidden bg-slate-955">
              <img src={selectedInspectCard.image} alt={selectedInspectCard.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 text-white">
                <span className="flex mb-1">
                  {Array.from({ length: selectedInspectCard.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">⭐</span>
                  ))}
                </span>
                <h3 className="font-black text-xl tracking-tight leading-tight text-slate-50">{selectedInspectCard.name}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center bg-orange-950/40 border border-orange-500/20 px-4 py-2 rounded-2xl text-xs text-orange-400 font-bold mb-4">
                <span>{ui.modal.mealPrice}</span>
                <span>{selectedInspectCard.value}</span>
              </div>

              <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-2">{ui.modal.notes}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                {selectedInspectCard.description}
              </p>

              <div className="bg-slate-955 p-3.5 rounded-2xl border border-slate-800/60 mt-5 text-[11px] text-slate-400 leading-normal">
                💡 <strong className="text-slate-200">{ui.modal.reward}</strong> {ui.modal.rewardText} <strong className="text-orange-400">{selectedInspectCard.stars === 1 ? "+20" : selectedInspectCard.stars === 2 ? "+50" : "+150"} {ui.modal.rewardTail}</strong>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInspectCard(null)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-extrabold text-xs py-3.5 rounded-2xl mt-5 transition-all cursor-pointer"
              >
                {ui.modal.close}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= AUTH MODAL: INTEGRATION SIMULATOR ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-955/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative border border-slate-850">
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-505 hover:text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>

            <div className="text-center mb-6">
              <span className="text-4xl">🔑</span>
              <h3 className="font-extrabold text-slate-100 text-xl tracking-tight mt-3">{ui.authModal.title}</h3>
              <p className="text-slate-400 text-xs mt-1">{ui.authModal.desc}</p>
            </div>

            <div className="space-y-3">
              {/* Profile Account Option 1 from real metadata */}
              <button
                type="button"
                onClick={() => handleGoogleLogin("kerja1.landbar@gmail.com", "ChefV VIP Customer")}
                className="w-full text-left bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-orange-500/30 p-3.5 rounded-2xl transition-all flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-slate-100 font-bold text-sm shrink-0">
                  KL
                </div>
                <div className="truncate pr-1">
                  <strong className="block text-slate-105 text-xs font-extrabold">kerja1.landbar@gmail.com</strong>
                  <span className="text-[10px] text-slate-400 select-none">{ui.authModal.vip}</span>
                </div>
              </button>

              {/* Profile Account Option 2 */}
              <button
                type="button"
                onClick={() => handleGoogleLogin("anonymous@gmail.com", "Guest Diner")}
                className="w-full text-left bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-orange-500/30 p-3.5 rounded-2xl transition-all flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                  G
                </div>
                <div className="truncate pr-1">
                  <strong className="block text-slate-200 text-xs font-extrabold">anonymous@gmail.com</strong>
                  <span className="text-[10px] text-slate-400 select-none">{ui.authModal.guest}</span>
                </div>
              </button>
            </div>

            <div className="mt-5 text-[10px] text-slate-500 text-center uppercase tracking-wide">
              {ui.authModal.secure}
            </div>

          </div>
        </div>
      )}

      {/* =======================================================================
          ================= OVERLAY SCREEN: PACK TEARING & CARD DRAW ============
          ======================================================================= */}
      {activeOpeningPack && (
        <div className="fixed inset-0 bg-slate-955/95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-4 select-none">
          
          <div className="text-center mb-6 max-w-sm animate-fade-in">
            <span className="bg-orange-500 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest block mb-2.5 w-max mx-auto shadow-md">
              {ui.packOpen.boot}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-50">
              {ui.packOpen.title}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {!isTorn ? ui.packOpen.sealed : ui.packOpen.torn}
            </p>
          </div>

          <div className="relative w-80 h-[380px] flex items-center justify-center" ref={dragContainerRef}>
            
            {/* FOIL PACK COVER ENVELOPE (Visible BEFORE torn) */}
            {!isTorn && (
              <div 
                className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 rounded-2xl shadow-[0_20px_50px_rgba(249,115,22,0.3)] border-4 border-slate-900 flex flex-col justify-between p-6 z-10 transition-all text-white overflow-hidden"
                style={{ 
                  transform: `scale(${1 - (tearProgress / 300)})`,
                  opacity: 1,
                  transformOrigin: "bottom center"
                }}
              >
                {/* Shiny foils highlight lines */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 skew-y-12 transform origin-top-left"></div>

                <div className="flex justify-between items-start border-b border-white/20 pb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-lg">🍗</span>
                    <strong className="text-xs uppercase tracking-widest font-black">{ui.packOpen.special}</strong>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase font-bold">
                    {activeOpeningPack.tier}-Star Pack
                  </span>
                </div>

                <div className="text-center flex flex-col items-center py-6">
                  <Package className="w-14 h-14 mb-2 animate-bounce text-orange-250 text-orange-200" />
                  <span className="text-xl font-black uppercase tracking-wider block">{ui.packOpen.feast}</span>
                  <span className="text-[10px] opacity-80 uppercase tracking-widest font-medium mt-1">{ui.packOpen.envelope}</span>
                </div>

                {/* Simulated Tear Slide guide line */}
                <div className="border-t-2 border-dashed border-white/40 pt-4 flex flex-col gap-2 relative">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="flex items-center gap-1 uppercase"><Scissors className="w-3.5 h-3.5 translate-y-[-1px]" /> {ui.packOpen.tear}</span>
                    <span>{ui.packOpen.slide}</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={tearProgress}
                    onChange={handleTearSlide}
                    className="w-full accent-yellow-400 cursor-ew-resize py-1"
                  />
                </div>
              </div>
            )}

            {/* CARD BACKPLATE REVEAL PULL (Visible AFTER foil ripped open) */}
            {isTorn && !revealedCard && (
              <div className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden pb-12">
                
                {/* Visual Empty Pack background */}
                <div className="absolute top-12 left-6 right-6 bottom-4 bg-slate-950 border-2 border-slate-800 rounded-2xl shadow-inner z-0 flex items-center justify-center p-6 text-center">
                  <span className="text-[11px] text-slate-600 font-medium uppercase tracking-widest">
                    {t.pack?.envelopeInner || "Envelope Inner"}
                  </span>
                </div>

                {/* The card sticking out that the user pulls upwards! */}
                <div 
                  className={`absolute w-64 aspect-[3/4.2] rounded-2xl border-4 z-10 transition-transform ${
                    isDraggingCard ? "border-orange-500 cursor-grabbing animate-none" : "border-amber-500 cursor-grab hover:scale-101 hover:brightness-110 active:cursor-grabbing hover:shadow-[0_0_20px_#f97316]"
                  } bg-gradient-to-b from-slate-900 to-slate-950 p-5 text-center flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.8)]`}
                  style={{
                    transform: `translateY(${-drawOffset}px)`,
                    touchAction: "none"
                  }}
                  onMouseDown={(e) => handleCardDragStart(e.clientY)}
                  onMouseMove={(e) => handleCardDragMove(e.clientY)}
                  onMouseUp={handleCardDragEnd}
                  onMouseLeave={handleCardDragEnd}
                  onTouchStart={(e) => handleCardDragStart(e.touches[0].clientY)}
                  onTouchMove={(e) => handleCardDragMove(e.touches[0].clientY)}
                  onTouchEnd={handleCardDragEnd}
                >
                  <div className="absolute inset-1 border border-orange-500/10 rounded-xl pointer-events-none"></div>
                  
                  {/* Glowing core graphic */}
                  <div className="text-center flex flex-col items-center mt-6">
                    <span className="text-4xl block animate-pulse">✨</span>
                    <strong className="text-slate-100 text-sm font-black uppercase tracking-widest block mt-4 select-none">
                      {t.pack?.cardBack || "Chef V Card Back"}
                    </strong>
                    <div className="w-10 h-1 bg-orange-500 rounded-full mx-auto mt-2 opacity-50"></div>
                  </div>

                  <div className="mb-2 text-center text-[10px] text-slate-500 uppercase tracking-widest select-none">
                    {t.pack?.dragUp || "👇 Drag card UP to pull out! 👇"}
                  </div>
                </div>

                {/* Pull indicators indicator */}
                <div 
                  className="absolute bottom-1 z-20 text-[10px] text-orange-400 font-extrabold uppercase tracking-wider animate-bounce"
                  style={{ display: drawOffset > 10 ? "none" : "block" }}
                >
                  {t.pack?.slideUpIndicator || "▲ SLIDE UP TO PULL MEAL CARD ▲"}
                </div>

              </div>
            )}

            {/* CARD REVEAL DISPLAY SCREEN (Front of Card after successful extraction) */}
            {revealedCard && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                
                {/* 3D Rotational flip core representing detailed metadata content card */}
                <div 
                  className={`w-64 aspect-[2.8/4] rounded-2xl relative shadow-2xl overflow-hidden border-4 bg-slate-950 p-4 text-left flex flex-col justify-between transition-all duration-700 ${
                    animateDuplicateConversion 
                      ? "opacity-30 scale-90 border-slate-800" 
                      : revealedCard.stars === 3 
                        ? "border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-102" 
                        : "border-orange-550 border-orange-500"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-0"></div>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="flex">
                      {Array.from({ length: revealedCard.stars }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">⭐</span>
                      ))}
                    </span>
                    <span className="bg-slate-900/85 border border-slate-800 text-orange-400 font-bold text-[9px] px-2 py-0.5 rounded-full select-none">
                      {revealedCard.value}
                    </span>
                  </div>

                  {/* Card Front Photo */}
                  <div className="absolute top-0 inset-x-0 h-[50%] z-[-1] overflow-hidden bg-slate-900 select-none">
                    <img src={revealedCard.image} alt={revealedCard.name} className="w-full h-full object-cover object-center" />
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h4 className="text-white font-extrabold text-sm tracking-tight leading-tight">{revealedCard.name}</h4>
                    <p className="text-slate-300 text-[10px] line-clamp-3 mt-1.5 leading-relaxed">
                      {revealedCard.description}
                    </p>
                  </div>
                </div>

                {/* Stardust duplicate dissolved animation overlay */}
                {animateDuplicateConversion && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    
                    {/* Glowing magic dissolution bubbles */}
                    <div className="flex gap-2">
                      <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-ping"></span>
                      <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping delay-75"></span>
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping delay-150"></span>
                    </div>

                    <div className="bg-slate-900 text-slate-300 border border-orange-500/50 rounded-2xl px-5 py-3 shadow-2xl mt-4 max-w-xs animate-bounce text-xs">
                      <p className="font-extrabold text-white text-center">{t.pack?.duplicateTitle || '🔄 Duplicated Card Discovered!'}</p>
                      <p className="text-[11px] text-orange-400 mt-1">
                        Converted automatically into <strong className="text-yellow-300">+{gainedStardust} Stardust</strong>!
                      </p>
                    </div>
                  </div>
                )}

                {/* Badge outcome */}
                <div className="mt-6">
                  {isNewCard ? (
                    <span className="bg-emerald-600 outline outline-emerald-400 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-md select-none inline-flex items-center gap-1 animate-bounce">
                      🌠 UNLOCKED NEW CARD ALBUM SLOT!
                    </span>
                  ) : (
                    !animateDuplicateConversion && (
                      <span className="bg-slate-900 text-slate-300 font-semibold text-[11px] px-3 py-1 rounded-full border border-slate-800">
                        Duplicate recipe found (Converts in 1.5s)
                      </span>
                    )
                  )}
                </div>

              </div>
            )}

          </div>

          <div className="mt-8 flex gap-4 w-64">
            {revealedCard ? (
              <button
                type="button"
                onClick={finishBoosterDraw}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md text-center cursor-pointer hover:brightness-110"
              >
                {t.pack?.doneBtn || "Done Drawing Cards Check"}
              </button>
            ) : (
              <button
                type="button"
                onClick={finishBoosterDraw}
                className="w-full bg-slate-900 text-slate-400 hover:text-white font-medium text-xs py-3 rounded-2xl text-center cursor-pointer border border-slate-800 hover:border-slate-700"
              >
                {t.pack?.skipBtn || "Skip sequence / Close"}
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
