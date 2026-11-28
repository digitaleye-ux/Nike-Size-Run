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
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [openDisclosure, setOpenDisclosure] = useState<'details' | 'shipping' | null>('details');
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

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(null), 3200);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowErrorAlert(true);
      return;
    }
    setBagCount((prev) => prev + 1);
    triggerToast(`Added ${selectedSize.size_label} to Bag`);
  };

  const handleToggleFavorite = () => {
    setIsFavorited((prev) => {
      const next = !prev;
      triggerToast(next ? 'Saved to Favorites' : 'Removed from Favorites');
      return next;
    });
  };

  const handleCloseSizeModal = () => {
    setShowSizeModal(false);
    sizeGuideTriggerRef.current?.focus();
  };

  return (
    <div className="w-full flex justify-center bg-[#ffffff]">
      {/* Flat 375px Nike Mobile PDP (zero drop shadows, zero rounded outer frame per DESIGN.md) */}
      <main className="w-full max-w-[375px] bg-[#ffffff] flex flex-col relative">
        {/* Primary Nav (56px height, inset #e5e5e5 bottom hairline) */}
        <header className="h-[56px] px-4 flex items-center justify-between bg-[#ffffff] nike-sticky-hairline sticky top-0 z-30">
          <div className="flex items-center text-[#111111]" aria-label="Nike">
            <svg
              width="54"
              height="20"
              viewBox="0 0 69 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M68.25 1.07L18.43 22.18C12.35 24.75 7.42 23.36 5.14 19.65C2.86 15.94 4.19 10.37 8.46 5.86C11.15 3.02 14.23 1.25 15.66 0.61C12.97 3.91 10.74 7.77 12.14 11.49C13.34 14.68 17.56 15.39 22.84 13.71L68.25 1.07Z" />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="w-[40px] h-[40px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#111111] relative before:content-[''] before:absolute before:-inset-0.5 nike-pressable cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
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
              className="w-[40px] h-[40px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#111111] relative before:content-[''] before:absolute before:-inset-0.5 nike-pressable cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {bagCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#111111] text-[#ffffff] text-[10px] font-medium tabular-nums flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* 1. PRODUCT PHOTOGRAPH (Full-bleed 1:1 square on #f5f5f5 Soft Cloud, rounded-none) */}
        <section
          className="w-full aspect-square relative bg-[#f5f5f5] overflow-hidden"
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
            className="w-full h-full aspect-square object-cover"
          />

          {/* Bottom-right circular carousel paddles (button-icon-circular) */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {images.map((img, idx) => {
              const isActive = idx === currentImageIdx;
              return (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`View photo ${idx + 1}`}
                  aria-pressed={isActive}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`h-[28px] px-3 rounded-full text-[12px] font-medium tabular-nums relative before:content-[''] before:absolute before:-inset-2 nike-pressable cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-[#ffffff]'
                      : 'bg-[#ffffff] text-[#111111] border border-[#cacacb]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. PRODUCT HEADER, PRICE & COLORWAY SWATCH */}
        <section className="px-4 pt-4 pb-3">
          <h1 className="m-0 text-[24px] font-medium leading-[1.2] text-[#111111]">
            Nike Pegasus 43
          </h1>
          <p className="m-0 mt-1 text-[14px] font-medium leading-[1.5] text-[#707072]">
            Men&apos;s Road Running Shoes
          </p>

          <div className="mt-2 flex items-baseline justify-between min-h-[32px]">
            <p
              data-testid="price"
              className="m-0 text-[16px] font-medium leading-[28px] min-h-[28px] tabular-nums text-[#111111]"
            >
              $140
            </p>
            <span className="text-[12px] font-medium text-[#707072] tabular-nums">
              Launches Dec 10
            </span>
          </div>

          {/* Nike Swatch Dot Active (concentric ring) */}
          <div className="mt-2 flex items-center gap-2.5 text-[14px] text-[#707072]">
            <span
              className="inline-block w-[12px] h-[12px] rounded-full bg-[#111111] ring-2 ring-[#ffffff] shadow-[0_0_0_3.5px_#111111] shrink-0 ml-0.5"
              aria-hidden="true"
            />
            <span>Black / White-Volt · HV7521-001</span>
          </div>
        </section>

        {/* 3. SIZE SELECTOR (2-Row Horizontal Scroll Grid, >= 44px buttons) */}
        <section className="px-4 pt-2 pb-4" aria-labelledby="size-selector-label">
          <div className="flex items-center justify-between mb-1.5">
            <h2
              id="size-selector-label"
              className="m-0 text-[16px] font-medium leading-[1.5] text-[#111111]"
            >
              Select Size
            </h2>

            <button
              ref={sizeGuideTriggerRef}
              type="button"
              onClick={() => setShowSizeModal(true)}
              className="min-h-[44px] inline-flex items-center text-[14px] font-medium text-[#707072] underline underline-offset-4 cursor-pointer"
            >
              Size Guide
            </button>
          </div>

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
                'bg-[#ffffff] border border-[#cacacb] text-[#111111] nike-size-available cursor-pointer';
              if (isSoldOut) {
                stateClasses =
                  'bg-[#f5f5f5] border border-[#e5e5e5] text-[#9e9ea0] cursor-not-allowed';
              } else if (isPicked) {
                stateClasses =
                  'bg-[#111111] border border-[#111111] text-[#ffffff] cursor-pointer';
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
                  className={`w-[108px] h-[52px] rounded-[6px] flex flex-col items-center justify-center px-2 whitespace-nowrap tabular-nums snap-start nike-pressable ${stateClasses}`}
                >
                  <span
                    className={`text-[14px] leading-none ${
                      isSoldOut ? 'font-normal line-through' : 'font-medium'
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
                    <span className="mt-1 text-[10px] font-medium leading-none text-[#d30005]">
                      Few left
                    </span>
                  )}

                  {!isSoldOut && isPicked && isLowStock && (
                    <span className="mt-1 text-[10px] font-medium leading-none text-[#e5e5e5]">
                      {s.stock_quantity} left
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {showErrorAlert && (
            <div
              role="alert"
              className="animate-wiggle mt-2.5 px-3 py-2.5 rounded-[6px] bg-[#ffffff] border border-[#d30005] text-[#d30005] text-[14px] font-medium"
            >
              Please select a size.
            </div>
          )}

          {selectedSize && selectedSize.stock_status === 'low_stock' && (
            <p className="m-0 mt-2 text-[12px] font-medium text-[#d30005] tabular-nums">
              Just a few left ({selectedSize.stock_quantity} remaining in {selectedSize.size_label}).
            </p>
          )}
        </section>

        {/* 4. CTA STACK (button-primary + button-secondary pill buttons per DESIGN.md) */}
        <section className="px-4 pb-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAddToBag}
            className="nike-btn-primary nike-pressable w-full h-[52px] px-8 rounded-full bg-[#111111] text-[#ffffff] text-[16px] font-medium leading-[1.5] flex items-center justify-center cursor-pointer"
          >
            {selectedSize ? `Add to Bag — ${selectedSize.size_label}` : 'Add to Bag'}
          </button>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-pressed={isFavorited}
            className="nike-btn-secondary nike-pressable w-full h-[52px] px-8 rounded-full bg-[#f5f5f5] text-[#111111] text-[16px] font-medium leading-[1.5] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </section>

        {/* 5. PDP DISCLOSURE ROWS (pdp-disclosure-row per DESIGN.md) */}
        <section className="px-4 pb-6" aria-label="Product Information">
          {/* Row 1: View Product Details */}
          <div className="border-t border-[#cacacb]">
            <button
              type="button"
              aria-expanded={openDisclosure === 'details'}
              onClick={() =>
                setOpenDisclosure(openDisclosure === 'details' ? null : 'details')
              }
              className="w-full py-5 flex items-center justify-between text-left text-[16px] font-medium text-[#111111] cursor-pointer"
            >
              <span>View Product Details</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  openDisclosure === 'details' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {openDisclosure === 'details' && (
              <dl className="m-0 pb-5 space-y-2.5 text-[14px]">
                {PRODUCT_SPECS.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[#707072] shrink-0">{spec.label}</dt>
                    <dd
                      className={`m-0 text-right text-[#111111] ${
                        spec.tabular ? 'tabular-nums' : ''
                      }`}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Row 2: Shipping & Returns */}
          <div className="border-t border-b border-[#cacacb]">
            <button
              type="button"
              aria-expanded={openDisclosure === 'shipping'}
              onClick={() =>
                setOpenDisclosure(openDisclosure === 'shipping' ? null : 'shipping')
              }
              className="w-full py-5 flex items-center justify-between text-left text-[16px] font-medium text-[#111111] cursor-pointer"
            >
              <span>Free Delivery and Returns</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  openDisclosure === 'shipping' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {openDisclosure === 'shipping' && (
              <p className="m-0 pb-5 text-[14px] leading-[1.5] text-[#39393b]">
                Free standard shipping on orders $50+ and 30-day free returns for Nike Members.
              </p>
            )}
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="px-4 py-6 text-[11px] font-medium text-[#707072]">
          © 2026 Nike, Inc. All Rights Reserved
        </footer>

        {/* Toast Notification */}
        {showToast && (
          <div
            role="status"
            aria-live="polite"
            style={{ bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}
            className="fixed left-1/2 -translate-x-1/2 bg-[#111111] text-[#ffffff] px-5 py-3 rounded-full text-[14px] font-medium z-50 flex items-center gap-2 whitespace-nowrap tabular-nums"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1eaa52"
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
              className="bg-[#ffffff] rounded-[18px] w-full max-w-[343px] p-5 max-h-[80dvh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  id="size-guide-title"
                  className="m-0 text-[20px] font-medium text-[#111111]"
                >
                  Size Guide
                </h3>
                <button
                  ref={modalCloseRef}
                  type="button"
                  aria-label="Close size guide"
                  onClick={handleCloseSizeModal}
                  className="w-[40px] h-[40px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#111111] cursor-pointer relative before:content-[''] before:absolute before:-inset-0.5 nike-pressable"
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

              <p className="m-0 mb-4 text-[14px] leading-[1.5] text-[#707072]">
                Nike Pegasus 43 fits true to size. Runners with wider feet may prefer half a size up.
              </p>

              <div className="overflow-y-auto overscroll-contain flex-1">
                <table className="w-full text-[13px] text-left border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-[#cacacb] text-[#707072]">
                      <th className="py-2 font-medium">US Men</th>
                      <th className="py-2 font-medium">US Women</th>
                      <th className="py-2 font-medium">EU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.slice(0, 10).map((s) => (
                      <tr key={s.sku} className="border-b border-[#e5e5e5] text-[#111111]">
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
                className="nike-btn-primary nike-pressable w-full h-[48px] mt-4 rounded-full bg-[#111111] text-[#ffffff] font-medium text-[16px] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
