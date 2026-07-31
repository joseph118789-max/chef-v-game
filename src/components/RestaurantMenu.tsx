import React, { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import {
  MAINS,
  BAKED,
  DRINKS,
  BRANCHES,
  GALLERY_IMAGES,
  MENU_CATEGORIES,
  getDisplayName,
  getDisplayDesc,
  MenuCategory,
} from '../menuData';

import { uiCopy } from '../i18n/uiCopy';

interface RestaurantMenuProps {
  lang: 'en' | 'cn' | 'ms';
}

type TabKey = MenuCategory | 'locations';

export default function RestaurantMenu({ lang }: RestaurantMenuProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('mains');
  const ui = uiCopy[lang];

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'mains',    label: lang === 'cn' ? '🍽️ 主食' : lang === 'ms' ? '🍽️ Hidangan Utama' : '🍽️ Mains' },
    { key: 'baked',    label: lang === 'cn' ? '🧀 芝士焗饭' : lang === 'ms' ? '🧀 Nasi Bakar Keju' : '🧀 Cheese Baked Rice' },
    { key: 'drinks',   label: lang === 'cn' ? '🥤 饮料' : lang === 'ms' ? '🥤 Minuman' : '🥤 Drinks' },
    { key: 'locations', label: lang === 'cn' ? '📍 分店' : lang === 'ms' ? '📍 Lokasi' : '📍 Locations' },
  ];

  const getItems = () => {
    switch (activeTab) {
      case 'mains':   return MAINS;
      case 'baked':   return BAKED;
      case 'drinks':  return DRINKS;
      default:        return [];
    }
  };

  const items = getItems();

  return (
    <div className="flex flex-col gap-6">

      {/* Tab Bar */}
      <div className="glass-panel rounded-[24px] p-2 flex gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-[16px] text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[linear-gradient(135deg,var(--chef-brown),var(--chef-brown-deep))] text-white shadow-lg'
                : 'text-[var(--chef-ink-soft)] hover:bg-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {activeTab !== 'locations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <div
              key={item.id}
              className="premium-card rounded-[24px] overflow-hidden hover:-translate-y-1 transition-all group flex flex-col"
            >
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-extrabold text-[var(--chef-brown-deep)] text-sm leading-tight serif-heading">
                      {getDisplayName(item, lang)}
                    </h4>
                    {item.tag && (
                      <span className="bg-[linear-gradient(135deg,var(--chef-gold-soft),var(--chef-gold))] text-[var(--chef-brown-deep)] text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 shadow-sm">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--chef-ink-soft)] text-xs leading-relaxed">
                    {getDisplayDesc(item, lang)}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--chef-line)] flex justify-between items-center">
                  <span className="font-black text-[var(--chef-brown-deep)] text-lg">
                    RM {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locations Grid */}
      {activeTab === 'locations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BRANCHES.map(branch => (
            <div
              key={branch.id}
              className="premium-card rounded-[24px] overflow-hidden hover:-translate-y-1 transition-all"
            >
              {branch.image && (
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={branch.image}
                    alt={lang === 'ms' ? branch.nameMy : branch.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-extrabold text-[var(--chef-brown-deep)] text-sm mb-1 serif-heading">
                  {lang === 'ms' ? branch.nameMy : branch.name}
                </h4>
                {branch.note && (
                  <p className="text-xs text-[var(--chef-gold)] font-bold mb-1">
                    {lang === 'ms' ? branch.noteMy : branch.note}
                  </p>
                )}
                <p className="text-[var(--chef-ink-soft)] text-xs leading-relaxed mb-3">{branch.address}</p>
                <div className="flex items-center gap-1.5 text-xs text-[var(--chef-ink-soft)]">
                  <Phone className="w-3.5 h-3.5 text-[var(--chef-gold)]" />
                  <a
                    href={`https://wa.me/${branch.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[var(--chef-brown)] hover:underline"
                  >
                    {branch.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery Section */}
      {activeTab !== 'locations' && (
        <div>
          <h3 className="text-xl font-extrabold text-[var(--chef-brown-deep)] mb-4 flex items-center gap-2 serif-heading">
            <MapPin className="w-5 h-5 text-[var(--chef-gold)]" /> {ui.gallery.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY_IMAGES.slice(0, 8).map((src, i) => (
              <div key={i} className="aspect-square rounded-[18px] overflow-hidden bg-slate-100 shadow-sm border border-[var(--chef-line)]">
                <img
                  src={src}
                  alt={`${ui.gallery.title} ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
