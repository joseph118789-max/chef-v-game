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

// @ts-ignore
import { languageList } from '../i18n/index.js';

interface RestaurantMenuProps {
  lang: 'en' | 'cn' | 'ms';
}

type TabKey = MenuCategory | 'locations';

export default function RestaurantMenu({ lang }: RestaurantMenuProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('mains');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'mains',    label: '🍽️ Mains' },
    { key: 'baked',    label: '🧀 Cheese Baked Rice' },
    { key: 'drinks',   label: '🥤 Drinks' },
    { key: 'locations', label: '📍 Locations' },
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
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-[#FAD0D6] flex gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[#F24E82] text-white shadow-md'
                : 'text-slate-600 hover:bg-pink-50'
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
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#FAD0D6] hover:shadow-md transition-all group flex flex-col"
            >
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-extrabold text-slate-800 text-sm leading-tight">
                      {getDisplayName(item, lang)}
                    </h4>
                    {item.tag && (
                      <span className="bg-gradient-to-r from-[#F24E82] to-[#FF8A65] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {getDisplayDesc(item, lang)}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#FAD0D6] flex justify-between items-center">
                  <span className="font-black text-[#F24E82] text-lg">
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
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#FAD0D6] hover:shadow-md transition-all"
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
                <h4 className="font-extrabold text-slate-800 text-sm mb-1">
                  {lang === 'ms' ? branch.nameMy : branch.name}
                </h4>
                {branch.note && (
                  <p className="text-xs text-[#F24E82] font-semibold mb-1">
                    {lang === 'ms' ? branch.noteMy : branch.note}
                  </p>
                )}
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{branch.address}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-[#F24E82]" />
                  <a
                    href={`https://wa.me/${branch.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#F24E82] hover:underline"
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
          <h3 className="text-xl font-extrabold text-[#F24E82] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Food Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY_IMAGES.slice(0, 8).map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm border border-[#FAD0D6]">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
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
