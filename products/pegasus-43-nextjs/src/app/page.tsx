'use client';

import React, { useEffect, useRef, useState } from 'react';

export type SizeItem = {
  sku: string;
  style_code: string;
  product_name: string;
  colorway: string;
  price: number;
  size_label: string;
  size_us_men: number;
  size_us_women: number;
  size_eu: string;
  display_order: number;
  in_stock: boolean;
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'sold_out';
  launch_date: string;
};

// Initial sizes embedded directly from source data to ensure instant initial render with ZERO layout shift (CLS)
const INITIAL_SIZES: SizeItem[] = [
  {
    "sku": "HV7521-001-035",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 3.5 / W 5",
    "size_us_men": 3.5,
    "size_us_women": 5.0,
    "size_eu": "35.5",
    "display_order": 1,
    "in_stock": true,
    "stock_quantity": 1,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-040",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 4 / W 5.5",
    "size_us_men": 4.0,
    "size_us_women": 5.5,
    "size_eu": "36",
    "display_order": 2,
    "in_stock": true,
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-045",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 4.5 / W 6",
    "size_us_men": 4.5,
    "size_us_women": 6.0,
    "size_eu": "36.5",
    "display_order": 3,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-050",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 5 / W 6.5",
    "size_us_men": 5.0,
    "size_us_women": 6.5,
    "size_eu": "37.5",
    "display_order": 4,
    "in_stock": true,
    "stock_quantity": 4,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-055",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 5.5 / W 7",
    "size_us_men": 5.5,
    "size_us_women": 7.0,
    "size_eu": "38",
    "display_order": 5,
    "in_stock": true,
    "stock_quantity": 9,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-060",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 6 / W 7.5",
    "size_us_men": 6.0,
    "size_us_women": 7.5,
    "size_eu": "38.5",
    "display_order": 6,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-065",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 6.5 / W 8",
    "size_us_men": 6.5,
    "size_us_women": 8.0,
    "size_eu": "39",
    "display_order": 7,
    "in_stock": true,
    "stock_quantity": 18,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-070",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 7 / W 8.5",
    "size_us_men": 7.0,
    "size_us_women": 8.5,
    "size_eu": "40",
    "display_order": 8,
    "in_stock": true,
    "stock_quantity": 46,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-075",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 7.5 / W 9",
    "size_us_men": 7.5,
    "size_us_women": 9.0,
    "size_eu": "40.5",
    "display_order": 9,
    "in_stock": true,
    "stock_quantity": 87,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-080",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 8 / W 9.5",
    "size_us_men": 8.0,
    "size_us_women": 9.5,
    "size_eu": "41",
    "display_order": 10,
    "in_stock": true,
    "stock_quantity": 124,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-085",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 8.5 / W 10",
    "size_us_men": 8.5,
    "size_us_women": 10.0,
    "size_eu": "42",
    "display_order": 11,
    "in_stock": true,
    "stock_quantity": 3,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-090",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 9 / W 10.5",
    "size_us_men": 9.0,
    "size_us_women": 10.5,
    "size_eu": "42.5",
    "display_order": 12,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-095",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 9.5 / W 11",
    "size_us_men": 9.5,
    "size_us_women": 11.0,
    "size_eu": "43",
    "display_order": 13,
    "in_stock": true,
    "stock_quantity": 142,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-100",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 10 / W 11.5",
    "size_us_men": 10.0,
    "size_us_women": 11.5,
    "size_eu": "44",
    "display_order": 14,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-105",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 10.5 / W 12",
    "size_us_men": 10.5,
    "size_us_women": 12.0,
    "size_eu": "44.5",
    "display_order": 15,
    "in_stock": true,
    "stock_quantity": 168,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-110",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 11 / W 12.5",
    "size_us_men": 11.0,
    "size_us_women": 12.5,
    "size_eu": "45",
    "display_order": 16,
    "in_stock": true,
    "stock_quantity": 111,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-115",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 11.5 / W 13",
    "size_us_men": 11.5,
    "size_us_women": 13.0,
    "size_eu": "45.5",
    "display_order": 17,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-120",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 12 / W 13.5",
    "size_us_men": 12.0,
    "size_us_women": 13.5,
    "size_eu": "46",
    "display_order": 18,
    "in_stock": true,
    "stock_quantity": 63,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-125",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 12.5 / W 14",
    "size_us_men": 12.5,
    "size_us_women": 14.0,
    "size_eu": "47",
    "display_order": 19,
    "in_stock": true,
    "stock_quantity": 27,
    "stock_status": "in_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-130",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 13 / W 14.5",
    "size_us_men": 13.0,
    "size_us_women": 14.5,
    "size_eu": "47.5",
    "display_order": 20,
    "in_stock": true,
    "stock_quantity": 5,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-135",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 13.5 / W 15",
    "size_us_men": 13.5,
    "size_us_women": 15.0,
    "size_eu": "48",
    "display_order": 21,
    "in_stock": true,
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-140",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 14 / W 15.5",
    "size_us_men": 14.0,
    "size_us_women": 15.5,
    "size_eu": "48.5",
    "display_order": 22,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-145",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 14.5 / W 16",
    "size_us_men": 14.5,
    "size_us_women": 16.0,
    "size_eu": "49",
    "display_order": 23,
    "in_stock": true,
    "stock_quantity": 3,
    "stock_status": "low_stock",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-150",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 15 / W 16.5",
    "size_us_men": 15.0,
    "size_us_women": 16.5,
    "size_eu": "49.5",
    "display_order": 24,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-155",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 15.5 / W 17",
    "size_us_men": 15.5,
    "size_us_women": 17.0,
    "size_eu": "50",
    "display_order": 25,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  },
  {
    "sku": "HV7521-001-160",
    "style_code": "HV7521-001",
    "product_name": "Nike Pegasus 43",
    "colorway": "Black/White-Volt",
    "price": 140.0,
    "size_label": "M 16 / W 17.5",
    "size_us_men": 16.0,
    "size_us_women": 17.5,
    "size_eu": "50.5",
    "display_order": 26,
    "in_stock": false,
    "stock_quantity": 0,
    "stock_status": "sold_out",
    "launch_date": "2026-12-10"
  }
];

const PRODUCT_SPECS = [
  { label: 'Style', value: 'HV7521-001', tabular: true },
  { label: 'Colorway', value: 'Black / White / Volt', tabular: false },
  { label: 'Upper', value: 'Engineered mesh, synthetic overlays', tabular: false },
  { label: 'Midsole', value: 'Nike React foam', tabular: false },
  { label: 'Outsole', value: 'Waffle-inspired rubber tread', tabular: false },
  { label: 'Weight', value: '260 g (Men’s 9)', tabular: true },
  { label: 'Fit', value: 'True to size', tabular: false },
  { label: 'Launch', value: '10 December 2026', tabular: true },
] as const;

export default function MobileProductPage() {
  const [sizes, setSizes] = useState<SizeItem[]>(INITIAL_SIZES);
  const [pickedSku, setPickedSku] = useState<string | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
  const [bagCount, setBagCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);

  const sizeGuideTriggerRef = useRef<HTMLButtonElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const images = [
    {
      src: '/pegasus-43-side.webp',
      label: 'Side profile of Nike Pegasus 43 in Black, White, and Volt',
    },
    {
      src: '/pegasus-43-top.webp',
      label: 'Three-quarter top view of Nike Pegasus 43 in Black, White, and Volt',
    },
  ];

  // Refresh sizes from public/sizes.json if updated
  useEffect(() => {
    fetch('/sizes.json')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((data: SizeItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSizes(data);
        }
      })
      .catch((err) => {
        console.warn('Using embedded size inventory fallback:', err);
      });
  }, []);

  // Focus management & Escape handling for Size Guide dialog
  useEffect(() => {
    if (!showSizeModal) return;
    modalCloseRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSizeModal(false);
        sizeGuideTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSizeModal]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const selectedSize = sizes.find((s) => s.sku === pickedSku);

  const handleSelectSize = (size: SizeItem) => {
    if (!size.in_stock || size.stock_status === 'sold_out') {
      return;
    }
    setPickedSku(size.sku);
    setShowErrorAlert(false);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowErrorAlert(true);
      return;
    }
    setBagCount((prev) => prev + 1);
    setShowToast(`Added ${selectedSize.size_label} to Bag`);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(null), 3200);
  };

  const handleCloseSizeModal = () => {
    setShowSizeModal(false);
    sizeGuideTriggerRef.current?.focus();
  };

  return (
    <div className="w-full flex justify-center bg-white sm:bg-[var(--surface-canvas)] sm:px-4 sm:py-6">
      <main className="w-full max-w-[375px] bg-[var(--surface-page)] sm:rounded-2xl sm:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_12px_32px_-8px_rgb(0_0_0/0.08)] overflow-hidden flex flex-col relative">
        {/* Sticky Mobile Header */}
        <header className="h-[52px] px-4 flex items-center justify-between bg-[var(--surface-page)] hairline-b sticky top-0 z-30">
          <div className="flex items-center text-[var(--ink-primary)]" aria-label="Nike">
            <svg
              width="52"
              height="19"
              viewBox="0 0 69 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M68.25 1.07L18.43 22.18C12.35 24.75 7.42 23.36 5.14 19.65C2.86 15.94 4.19 10.37 8.46 5.86C11.15 3.02 14.23 1.25 15.66 0.61C12.97 3.91 10.74 7.77 12.14 11.49C13.34 14.68 17.56 15.39 22.84 13.71L68.25 1.07Z" />
            </svg>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[var(--ink-primary)] pressable"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7.5" />
                <line x1="20.5" y1="20.5" x2="16.5" y2="16.5" />
              </svg>
            </button>

            <button
              type="button"
              aria-label={`Shopping Bag, ${bagCount} items`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[var(--ink-primary)] relative pressable"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {bagCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[var(--ink-primary)] text-white text-[10px] font-semibold tabular-nums flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* 1. PRODUCT PHOTO SECTION (375px x 375px studio square) */}
        <section
          className="w-full aspect-square relative bg-[var(--surface-studio)] hairline-b overflow-hidden"
          aria-label="Product Gallery"
        >
          <img
            data-testid="main-photo"
            src={images[currentImageIdx].src}
            alt={images[currentImageIdx].label}
            width={375}
            height={375}
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full aspect-square object-cover -outline-offset-1 outline-1 outline-black/10"
          />

          {/* Gallery Controls: 44x44 accessible tap targets */}
          <div className="absolute bottom-2 inset-x-4 flex items-center justify-between">
            <span className="w-8" aria-hidden="true" />
            <div className="flex items-center gap-2" role="tablist" aria-label="Product views">
              {images.map((img, idx) => {
                const isActive = idx === currentImageIdx;
                return (
                  <button
                    key={img.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View photo ${idx + 1}`}
                    onClick={() => setCurrentImageIdx(idx)}
                    className="relative py-3 px-1 flex items-center justify-center cursor-pointer before:content-[''] before:absolute before:-inset-2"
                  >
                    <span
                      className={`block h-[3px] rounded-full transition-all duration-200 ${
                        isActive
                          ? 'w-6 bg-[var(--ink-primary)]'
                          : 'w-2.5 bg-black/20'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="w-8 text-right text-[11px] font-medium tabular-nums text-[var(--ink-secondary)]">
              {currentImageIdx + 1} / {images.length}
            </span>
          </div>
        </section>

        {/* 2. PRODUCT HEADER & PRICE SECTION */}
        <section className="px-4 pt-4 pb-3">
          <p className="m-0 text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--ink-secondary)]">
            Men’s Road Running
          </p>
          <h1 className="font-display m-0 mt-1 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ink-primary)] text-balance">
            Nike Pegasus 43
          </h1>
          <div className="mt-1.5 flex items-center gap-2 text-[13px] text-[var(--ink-secondary)] tabular-nums">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-volt)] ring-1 ring-black/15 shrink-0"
              aria-hidden="true"
            />
            <span>Black / White / Volt · HV7521-001</span>
          </div>

          <div className="mt-2.5 flex items-baseline justify-between min-h-[32px]">
            <p
              data-testid="price"
              className="font-display m-0 text-[22px] font-semibold leading-[28px] min-h-[28px] tabular-nums text-[var(--ink-primary)]"
            >
              $140
            </p>
            <span className="text-[12px] text-[var(--ink-secondary)] tabular-nums">
              Launches Dec 10
            </span>
          </div>
        </section>

        {/* 3. SIZE SELECTOR (Above the Fold) */}
        <section className="px-4 pb-4" aria-labelledby="size-selector-label">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-baseline gap-1.5">
              <h2
                id="size-selector-label"
                className="m-0 text-[15px] font-semibold text-[var(--ink-primary)]"
              >
                Select Size
              </h2>
              {selectedSize && (
                <span className="text-[13px] font-medium tabular-nums text-[var(--ink-secondary)]">
                  · {selectedSize.size_label}
                </span>
              )}
            </div>

            <button
              ref={sizeGuideTriggerRef}
              type="button"
              onClick={() => setShowSizeModal(true)}
              className="min-h-[44px] inline-flex items-center text-[13px] font-medium text-[var(--ink-secondary)] underline underline-offset-4 decoration-1 cursor-pointer"
            >
              Size Guide
            </button>
          </div>

          {/* 2-Row Horizontal Scroll Grid */}
          <div
            data-testid="size-grid"
            className="size-scroll-container grid grid-rows-[repeat(2,52px)] grid-flow-col auto-cols-[108px] gap-2 overflow-x-auto snap-x snap-proximity pb-1"
            role="radiogroup"
            aria-label="Available shoe sizes"
          >
            {sizes.map((s) => {
              const isPicked = pickedSku === s.sku;
              const isSoldOut = !s.in_stock || s.stock_status === 'sold_out';
              const isLowStock = s.stock_status === 'low_stock';

              let stateClasses =
                'bg-white border border-[var(--border-subtle)] text-[var(--ink-primary)] size-btn-available cursor-pointer';
              if (isSoldOut) {
                stateClasses =
                  'bg-[var(--surface-muted)] border border-[oklch(0.92_0_0)] text-[var(--ink-disabled)] cursor-not-allowed';
              } else if (isPicked) {
                stateClasses =
                  'bg-[var(--ink-primary)] border border-[var(--ink-primary)] text-white cursor-pointer';
              }

              return (
                <button
                  key={s.sku}
                  type="button"
                  data-testid={isSoldOut ? 'size-button-sold-out' : 'size-button'}
                  role="radio"
                  aria-checked={isPicked}
                  aria-disabled={isSoldOut}
                  aria-label={`Size ${s.size_label}, ${
                    isSoldOut
                      ? 'sold out'
                      : isLowStock
                        ? `low stock, ${s.stock_quantity} left`
                        : 'in stock'
                  }`}
                  disabled={isSoldOut}
                  onClick={() => handleSelectSize(s)}
                  className={`w-[108px] h-[52px] rounded-lg flex flex-col items-center justify-center px-2 whitespace-nowrap tabular-nums snap-start pressable ${stateClasses}`}
                >
                  <span
                    className={`text-[13px] leading-none ${
                      isSoldOut
                        ? 'font-normal line-through'
                        : isPicked
                          ? 'font-semibold'
                          : 'font-medium'
                    }`}
                  >
                    {s.size_label}
                  </span>

                  {isSoldOut && (
                    <span className="mt-1 text-[10px] leading-none">
                      Sold out
                    </span>
                  )}

                  {!isSoldOut && isLowStock && !isPicked && (
                    <span className="mt-1 text-[10px] font-medium leading-none text-[var(--status-low)] flex items-center gap-1">
                      <span
                        className="inline-block w-1 h-1 rounded-full bg-[var(--status-low)]"
                        aria-hidden="true"
                      />
                      Few left
                    </span>
                  )}

                  {!isSoldOut && isPicked && isLowStock && (
                    <span className="mt-1 text-[10px] font-medium leading-none text-[var(--accent-volt)]">
                      {s.stock_quantity} left
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Alerts placed below size-grid so they never shift the grid vertically */}
          {showErrorAlert && (
            <div
              role="alert"
              className="animate-wiggle mt-2.5 px-3 py-2 rounded-lg bg-[oklch(0.97_0.02_25)] border border-[oklch(0.88_0.06_25)] text-[var(--status-error)] text-[13px] font-medium flex items-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Select a size to add to bag.</span>
            </div>
          )}

          {selectedSize && selectedSize.stock_status === 'low_stock' && (
            <div className="mt-2.5 px-3 py-2 rounded-lg bg-[oklch(0.975_0.02_75)] border border-[oklch(0.9_0.05_75)] text-[var(--status-low)] text-[12px] font-medium flex items-center gap-2 tabular-nums">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--status-low)] shrink-0"
                aria-hidden="true"
              />
              <span>Only {selectedSize.stock_quantity} left in {selectedSize.size_label}.</span>
            </div>
          )}
        </section>

        {/* 4. PRIMARY CTA */}
        <section className="px-4 pb-6">
          <button
            type="button"
            onClick={handleAddToBag}
            className="cta-primary pressable w-full h-[52px] rounded-full bg-[var(--ink-primary)] text-white font-display text-[15px] font-semibold tracking-[-0.01em] flex items-center justify-center cursor-pointer"
          >
            {selectedSize ? `Add to Bag — ${selectedSize.size_label}` : 'Add to Bag'}
          </button>
          <p className="m-0 mt-3 text-center text-[12px] text-[var(--ink-secondary)]">
            Free standard shipping and 30-day returns.
          </p>
        </section>

        {/* 5. PRODUCT SPECIFICATIONS */}
        <section
          className="px-4 pt-5 pb-8 hairline-t"
          aria-labelledby="tech-specs-heading"
        >
          <h2
            id="tech-specs-heading"
            className="font-display m-0 mb-3 text-[16px] font-semibold tracking-[-0.01em] text-[var(--ink-primary)]"
          >
            Specifications
          </h2>

          <dl className="m-0">
            {PRODUCT_SPECS.map((spec, idx) => (
              <div
                key={spec.label}
                className={`py-2.5 flex items-baseline justify-between gap-4 text-[13px] ${
                  idx < PRODUCT_SPECS.length - 1 ? 'hairline-b' : ''
                }`}
              >
                <dt className="text-[var(--ink-secondary)] shrink-0">{spec.label}</dt>
                <dd
                  className={`m-0 text-right text-[var(--ink-primary)] font-medium ${
                    spec.tabular ? 'tabular-nums' : ''
                  }`}
                >
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Toast Notification */}
        {showToast && (
          <div
            role="status"
            aria-live="polite"
            style={{ bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}
            className="fixed left-1/2 -translate-x-1/2 bg-[var(--ink-primary)] text-white px-4 py-3 rounded-full text-[13px] font-medium shadow-[0_8px_24px_rgb(0_0_0/0.22)] z-50 flex items-center gap-2 whitespace-nowrap tabular-nums"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-volt)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{showToast}</span>
          </div>
        )}

        {/* Accessible Size Guide Modal */}
        {showSizeModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseSizeModal();
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="size-guide-title"
              className="bg-[var(--surface-page)] rounded-2xl w-full max-w-[343px] p-5 max-h-[80dvh] flex flex-col shadow-[0_16px_48px_rgb(0_0_0/0.2)]"
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  id="size-guide-title"
                  className="font-display m-0 text-[18px] font-bold tracking-[-0.02em] text-[var(--ink-primary)]"
                >
                  Size Guide
                </h3>
                <button
                  ref={modalCloseRef}
                  type="button"
                  aria-label="Close size guide"
                  onClick={handleCloseSizeModal}
                  className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-full text-[var(--ink-primary)] cursor-pointer pressable"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <p className="m-0 mb-4 text-[13px] leading-[1.5] text-[var(--ink-secondary)] text-pretty">
                Nike Pegasus 43 fits true to size. Runners with wider feet may prefer half a size up.
              </p>

              <div className="overflow-y-auto overscroll-contain flex-1">
                <table className="w-full text-[12px] text-left border-collapse tabular-nums">
                  <thead>
                    <tr className="hairline-b text-[var(--ink-secondary)]">
                      <th className="py-2 font-medium">US Men</th>
                      <th className="py-2 font-medium">US Women</th>
                      <th className="py-2 font-medium">EU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.slice(0, 10).map((s) => (
                      <tr key={s.sku} className="hairline-b text-[var(--ink-primary)]">
                        <td className="py-2">M {s.size_us_men}</td>
                        <td className="py-2">W {s.size_us_women}</td>
                        <td className="py-2">{s.size_eu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={handleCloseSizeModal}
                className="cta-primary pressable w-full h-[44px] mt-4 rounded-lg bg-[var(--ink-primary)] text-white font-semibold text-[14px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
