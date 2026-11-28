'use client';

import React, { useEffect, useState, useId } from 'react';

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
  {"sku": "HV7521-001-035", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 3.5 / W 5", "size_us_men": 3.5, "size_us_women": 5.0, "size_eu": "35.5", "display_order": 1, "in_stock": false, "stock_quantity": 0, "stock_status": "sold_out", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-040", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 4 / W 5.5", "size_us_men": 4.0, "size_us_women": 5.5, "size_eu": "36", "display_order": 2, "in_stock": true, "stock_quantity": 4, "stock_status": "low_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-045", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 4.5 / W 6", "size_us_men": 4.5, "size_us_women": 6.0, "size_eu": "36.5", "display_order": 3, "in_stock": true, "stock_quantity": 18, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-050", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 5 / W 6.5", "size_us_men": 5.0, "size_us_women": 6.5, "size_eu": "37.5", "display_order": 4, "in_stock": true, "stock_quantity": 26, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-055", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 5.5 / W 7", "size_us_men": 5.5, "size_us_women": 7.0, "size_eu": "38", "display_order": 5, "in_stock": true, "stock_quantity": 34, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-060", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 6 / W 7.5", "size_us_men": 6.0, "size_us_women": 7.5, "size_eu": "38.5", "display_order": 6, "in_stock": true, "stock_quantity": 47, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-065", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 6.5 / W 8", "size_us_men": 6.5, "size_us_women": 8.0, "size_eu": "39", "display_order": 7, "in_stock": true, "stock_quantity": 63, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-070", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 7 / W 8.5", "size_us_men": 7.0, "size_us_women": 8.5, "size_eu": "40", "display_order": 8, "in_stock": true, "stock_quantity": 88, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-075", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 7.5 / W 9", "size_us_men": 7.5, "size_us_women": 9.0, "size_eu": "40.5", "display_order": 9, "in_stock": true, "stock_quantity": 112, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-080", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 8 / W 9.5", "size_us_men": 8.0, "size_us_women": 9.5, "size_eu": "41", "display_order": 10, "in_stock": true, "stock_quantity": 164, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-085", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 8.5 / W 10", "size_us_men": 8.5, "size_us_women": 10.0, "size_eu": "42", "display_order": 11, "in_stock": true, "stock_quantity": 198, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-090", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 9 / W 10.5", "size_us_men": 9.0, "size_us_women": 10.5, "size_eu": "42.5", "display_order": 12, "in_stock": true, "stock_quantity": 3, "stock_status": "low_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-095", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 9.5 / W 11", "size_us_men": 9.5, "size_us_women": 11.0, "size_eu": "43", "display_order": 13, "in_stock": true, "stock_quantity": 2, "stock_status": "low_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-100", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 10 / W 11.5", "size_us_men": 10.0, "size_us_women": 11.5, "size_eu": "44", "display_order": 14, "in_stock": false, "stock_quantity": 0, "stock_status": "sold_out", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-105", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 10.5 / W 12", "size_us_men": 10.5, "size_us_women": 12.0, "size_eu": "44.5", "display_order": 15, "in_stock": true, "stock_quantity": 212, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-110", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 11 / W 12.5", "size_us_men": 11.0, "size_us_women": 12.5, "size_eu": "45", "display_order": 16, "in_stock": true, "stock_quantity": 5, "stock_status": "low_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-115", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 11.5 / W 13", "size_us_men": 11.5, "size_us_women": 13.0, "size_eu": "45.5", "display_order": 17, "in_stock": true, "stock_quantity": 176, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-120", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 12 / W 13.5", "size_us_men": 12.0, "size_us_women": 13.5, "size_eu": "46", "display_order": 18, "in_stock": true, "stock_quantity": 138, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-125", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 12.5 / W 14", "size_us_men": 12.5, "size_us_women": 14.0, "size_eu": "47", "display_order": 19, "in_stock": true, "stock_quantity": 84, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-130", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 13 / W 14.5", "size_us_men": 13.0, "size_us_women": 14.5, "size_eu": "47.5", "display_order": 20, "in_stock": true, "stock_quantity": 71, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-135", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 13.5 / W 15", "size_us_men": 13.5, "size_us_women": 15.0, "size_eu": "48", "display_order": 21, "in_stock": true, "stock_quantity": 36, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-140", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 14 / W 15.5", "size_us_men": 14.0, "size_us_women": 15.5, "size_eu": "48.5", "display_order": 22, "in_stock": true, "stock_quantity": 29, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-145", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 14.5 / W 16", "size_us_men": 14.5, "size_us_women": 16.0, "size_eu": "49", "display_order": 23, "in_stock": true, "stock_quantity": 14, "stock_status": "in_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-150", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 15 / W 16.5", "size_us_men": 15.0, "size_us_women": 16.5, "size_eu": "49.5", "display_order": 24, "in_stock": true, "stock_quantity": 1, "stock_status": "low_stock", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-155", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 15.5 / W 17", "size_us_men": 15.5, "size_us_women": 17.0, "size_eu": "50", "display_order": 25, "in_stock": false, "stock_quantity": 0, "stock_status": "sold_out", "launch_date": "2026-12-10"},
  {"sku": "HV7521-001-160", "style_code": "HV7521-001", "product_name": "Nike Pegasus 43", "colorway": "Black/White-Volt", "price": 140.00, "size_label": "M 16 / W 17.5", "size_us_men": 16.0, "size_us_women": 17.5, "size_eu": "50.5", "display_order": 26, "in_stock": false, "stock_quantity": 0, "stock_status": "sold_out", "launch_date": "2026-12-10"}
];

export default function MobileProductPage() {
  const [sizes, setSizes] = useState<SizeItem[]>(INITIAL_SIZES);
  const [pickedSku, setPickedSku] = useState<string | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
  const [bagCount, setBagCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const images = [
    { src: '/nike-pegasus-43.svg', label: 'Side profile view of Nike Pegasus 43 in Black/White-Volt' },
    { src: '/nike-pegasus-43-front.svg', label: 'Top-down engineered mesh view of Nike Pegasus 43' }
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
    setShowToast(`Added Size ${selectedSize.size_label} to your Bag!`);
    setTimeout(() => setShowToast(null), 3500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowErrorAlert(true);
      return;
    }
    setShowToast(`Proceeding to instant checkout for Size ${selectedSize.size_label}...`);
    setTimeout(() => setShowToast(null), 3500);
  };

  return (
    <div className="w-full flex justify-center bg-[#eef0f2] sm:px-4 sm:py-4">
      {/* 375px Mobile Container as planned */}
      <main
        style={{
          width: '100%',
          maxWidth: '375px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Sticky Mobile App Bar */}
        <header
          style={{
            height: '52px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f2',
            backgroundColor: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          {/* Nike Swoosh Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="48" height="20" viewBox="0 0 24 24" fill="#1d1d1f">
              <path d="M21.707 5.293c-2.484 2.128-5.32 4.195-8.497 6.182-2.923 1.828-5.748 3.33-8.46 4.5-.473.204-.954.269-1.44.194-.486-.076-.897-.33-1.233-.762-.336-.432-.473-.93-.41-1.493.062-.563.308-1.127.737-1.692 1.341-1.768 2.926-3.411 4.755-4.929 1.828-1.517 3.82-2.825 5.975-3.924.316-.162.646-.176.99-.043.344.133.585.378.723.734.137.357.108.706-.086 1.048-.194.342-.51.62-.947.834-1.785.874-3.46 1.96-5.025 3.257-1.565 1.297-2.91 2.73-4.035 4.3-.086.12-.119.23-.099.33.02.1.083.173.189.219.106.046.222.046.348 0 .126-.046.262-.126.408-.24 2.296-1.79 4.782-3.465 7.458-5.026 2.676-1.56 5.568-2.99 8.675-4.288.384-.162.723-.133 1.018.086.295.22.428.53.398.93z" />
            </svg>
          </div>

          {/* Action icons: Search & Bag with dynamic count badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              aria-label="Search"
              style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', display: 'flex' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button
              aria-label={`Shopping Bag, ${bagCount} items`}
              style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', position: 'relative', display: 'flex' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {bagCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: '#fe8500',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {bagCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Free Shipping & Returns Member Banner */}
        <div
          style={{
            backgroundColor: '#f5f5f7',
            padding: '8px 16px',
            fontSize: '12px',
            textAlign: 'center',
            color: '#1d1d1f',
            borderBottom: '1px solid #e5e5ea',
            lineHeight: 1.3
          }}
        >
          <span style={{ fontWeight: 600 }}>Free Standard Shipping</span> & 30-Day Free Returns
        </div>

        {/* 1. PRODUCT PHOTO SECTION (375px × 375px square container, #f5f5f7) */}
        <section
          style={{
            width: '375px',
            height: '375px',
            position: 'relative',
            backgroundColor: '#f5f5f7',
            overflow: 'hidden'
          }}
          aria-label="Product Gallery"
        >
          {/* Badge: New Release & Colorway */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <span
              style={{
                backgroundColor: '#1d1d1f',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              Just In
            </span>
            <span
              style={{
                backgroundColor: '#d4ff00',
                color: '#1d1d1f',
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              Volt Glow
            </span>
          </div>

          {/* Product Image Display with Zero-Shift Bounding Box */}
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <img
              data-testid="main-photo"
              src={images[currentImageIdx].src}
              alt={images[currentImageIdx].label}
              width={375}
              height={375}
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'contain',
                transition: 'opacity 0.25s ease-in-out'
              }}
            />
          </div>

          {/* Interactive Pagination Dots / Thumbnail Switcher */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              zIndex: 10
            }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                aria-label={`View photo ${idx + 1}`}
                onClick={() => setCurrentImageIdx(idx)}
                style={{
                  width: idx === currentImageIdx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx === currentImageIdx ? '#1d1d1f' : '#d1d1d6',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
              />
            ))}
          </div>
        </section>

        {/* 2. PRODUCT NAME SECTION */}
        <section style={{ padding: '16px 16px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 600, color: '#0071e3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Men&apos;s Road Running Shoes
              </p>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#1d1d1f',
                  margin: 0,
                  lineHeight: 1.2
                }}
              >
                Nike Pegasus 43
              </h1>
            </div>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6e6e73' }}>
            Black/White-Volt • Style: HV7521-001
          </p>
        </section>

        {/* 3. PRICE SECTION */}
        <section style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px', minHeight: '32px' }}>
            <p
              data-testid="price"
              style={{
                fontSize: '20px',
                lineHeight: '28px',
                minHeight: '28px',
                fontWeight: 700,
                color: '#1d1d1f',
                margin: 0
              }}
            >
              $140.00
            </p>
            <span style={{ fontSize: '12px', color: '#6e6e73', lineHeight: '20px' }}>
              or 4 interest-free payments of $35.00
            </span>
          </div>
        </section>

        {/* 4. SIZE SELECTOR BUTTONS (Above the Fold) */}
        <section
          style={{
            padding: '0 16px',
            marginBottom: '16px'
          }}
          aria-labelledby="size-selector-label"
        >
          {/* Section Header with Size Guide link */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2
                id="size-selector-label"
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  margin: 0
                }}
              >
                Select Size
              </h2>
              {selectedSize && (
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#fe8500' }}>
                  ({selectedSize.size_label})
                </span>
              )}
            </div>

            <button
              onClick={() => setShowSizeModal(true)}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                color: '#6e6e73',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Size Guide
            </button>
          </div>

          {/* Validation Alert when Add to Bag is pressed without selecting a size */}
          {showErrorAlert && (
            <div
              className="animate-wiggle"
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: '13px',
                fontWeight: 500,
                padding: '8px 12px',
                borderRadius: '6px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>⚠️</span>
              <span>Please select a size before adding to your bag.</span>
            </div>
          )}

          {/* Low Stock Callout for selected size */}
          {selectedSize && selectedSize.stock_status === 'low_stock' && (
            <div
              style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fcd34d',
                color: '#92400e',
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '6px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>⚡</span>
              <span>Only {selectedSize.stock_quantity} pairs remaining in this size! Order soon.</span>
            </div>
          )}

          {/* 
            Size Buttons Container (Above-the-fold considerations):
            - 2-row horizontal scroll container, keeping height ~120px with the first 7-8 sizes visible immediately!
            - Scroll container for overflow sizes
          */}
          <div
            data-testid="size-grid"
            className="size-scroll-container"
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(2, 44px)',
              gridAutoFlow: 'column',
              gridAutoColumns: 'minmax(84px, 1fr)',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
            role="radiogroup"
            aria-label="Available shoe sizes"
          >
            {sizes.map((s) => {
              const isPicked = pickedSku === s.sku;
              const isSoldOut = !s.in_stock || s.stock_status === 'sold_out';
              const isLowStock = s.stock_status === 'low_stock';

              // Visual styling matching size-buttons.md specifications:
              // 1. in_stock: White (#FFFFFF), 1px solid #D1D5DB, Text #1F2937, 14px 500
              // 2. low_stock: #FFFBEB, 1px solid #FCD34D, Text #92400E, "LOW STOCK" 10px
              // 3. sold_out: #F3F4F6, 1px solid #E5E7EB, Text #6B7280, "SOLD OUT ⛔" 10px, disabled
              // 4. picked: #FE8500 (Nike orange), 1px solid #FE8500, Text #FFFFFF, "SELECTED ✓" 10px
              let bg = '#ffffff';
              let border = '1px solid #D1D5DB';
              let text = '#1F2937';

              if (isSoldOut) {
                bg = '#F3F4F6';
                border = '1px solid #E5E7EB';
                text = '#6B7280';
              } else if (isPicked) {
                bg = '#FE8500';
                border = '1px solid #FE8500';
                text = '#ffffff';
              } else if (isLowStock) {
                bg = '#FFFBEB';
                border = '1px solid #FCD34D';
                text = '#92400E';
              }

              return (
                <button
                  key={s.sku}
                  data-testid={isSoldOut ? 'size-button-sold-out' : 'size-button'}
                  role="radio"
                  aria-checked={isPicked}
                  aria-disabled={isSoldOut}
                  aria-label={`Size ${s.size_label}, ${isSoldOut ? 'sold out' : isLowStock ? `low stock, ${s.stock_quantity} left` : 'in stock'}`}
                  disabled={isSoldOut}
                  onClick={() => handleSelectSize(s)}
                  style={{
                    height: '44px',
                    minWidth: '84px',
                    borderRadius: '6px',
                    border,
                    background: bg,
                    color: text,
                    cursor: isSoldOut ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px 8px',
                    boxShadow: isPicked ? '0 2px 6px rgba(254, 133, 0, 0.35)' : 'none',
                    opacity: isSoldOut ? 0.75 : 1,
                    transition: 'all 0.15s ease-in-out',
                    scrollSnapAlign: 'start',
                    userSelect: 'none'
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      lineHeight: 1.1
                    }}
                  >
                    {s.size_label}
                  </span>

                  {isSoldOut && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 600,
                        marginTop: '2px',
                        letterSpacing: '0.2px',
                        lineHeight: 1
                      }}
                    >
                      SOLD OUT ⛔
                    </span>
                  )}

                  {!isSoldOut && isLowStock && !isPicked && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        marginTop: '2px',
                        letterSpacing: '0.2px',
                        lineHeight: 1
                      }}
                    >
                      LOW STOCK
                    </span>
                  )}

                  {!isSoldOut && isPicked && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        marginTop: '2px',
                        letterSpacing: '0.2px',
                        lineHeight: 1
                      }}
                    >
                      SELECTED ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ fontSize: '11px', color: '#8e8e93' }}>← Swipe horizontally for all 26 sizes →</span>
            <span style={{ fontSize: '11px', color: '#8e8e93' }}>US Men / US Women</span>
          </div>
        </section>

        {/* 5. ADD TO BAG & BUY NOW BUTTONS (Horizontal, side-by-side, equal width) */}
        <section
          style={{
            padding: '0 16px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              width: '100%'
            }}
          >
            {/* Add to Bag Button:
                Width: 50% (minus 6px gap)
                Padding: 14px 16px
                Font: 16px, Weight: 600
                Border: 1px solid #0071e3
                Background: #ffffff, Text: #0071e3
                Hover: Bg #0071e3, Text #ffffff
            */}
            <button
              onClick={handleAddToBag}
              style={{
                flex: 1,
                padding: '14px 16px',
                fontSize: '16px',
                fontWeight: 600,
                border: '1px solid #0071e3',
                backgroundColor: '#ffffff',
                color: '#0071e3',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s, transform 0.1s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0071e3';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#0071e3';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Add to Bag</span>
            </button>

            {/* Buy Now Button:
                Width: 50% (minus 6px gap)
                Padding: 14px 16px
                Font: 16px, Weight: 600
                Border: None
                Background: #0071e3, Text: #ffffff
                Hover: Bg #005bb5
            */}
            <button
              onClick={handleBuyNow}
              style={{
                flex: 1,
                padding: '14px 16px',
                fontSize: '16px',
                fontWeight: 600,
                border: 'none',
                backgroundColor: '#0071e3',
                color: '#ffffff',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.1s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#005bb5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0071e3';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Buy Now</span>
            </button>
          </div>
        </section>

        {/* 6. TECH SPECIFICATIONS SECTION */}
        <section
          style={{
            margin: '0 16px 20px',
            borderTop: '1px solid #e5e5ea',
            paddingTop: '16px'
          }}
          aria-labelledby="tech-specs-heading"
        >
          <h2
            id="tech-specs-heading"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              margin: '0 0 12px'
            }}
          >
            Tech Specifications
          </h2>

          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              color: '#1d1d1f',
              fontSize: '14px',
              lineHeight: 1.8
            }}
          >
            <li><strong>Color:</strong> Black/White-Volt</li>
            <li><strong>Style:</strong> HV7521-001</li>
            <li><strong>Material:</strong> Engineered mesh upper with synthetic overlays</li>
            <li><strong>Midsole:</strong> Nike React foam for responsive cushioning</li>
            <li><strong>Outsole:</strong> Waffle-inspired rubber tread for traction</li>
            <li><strong>Fit:</strong> Standard fit, true to size</li>
            <li><strong>Weight:</strong> Approx. 260g (Men&apos;s size 9)</li>
          </ul>
        </section>

        {/* 7. CUSTOMER REVIEWS SECTION */}
        <section
          style={{
            margin: '0 16px 28px',
            borderTop: '1px solid #e5e5ea',
            paddingTop: '16px'
          }}
          aria-labelledby="customer-reviews-heading"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2
              id="customer-reviews-heading"
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1d1d1f',
                margin: 0
              }}
            >
              Customer Reviews
            </h2>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#0071e3',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Write a Review
            </button>
          </div>

          {/* Rating Summary: ★★★★☆ 4.8 (524 reviews), stars in #ffd700 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: '#ffd700', fontSize: '18px', letterSpacing: '2px' }} aria-label="4.8 out of 5 stars">
              ★★★★☆
            </span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f' }}>4.8</span>
            <span style={{ fontSize: '14px', color: '#6e6e73' }}>(524 reviews)</span>
          </div>

          {/* Sample Review 1 */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f9f9fb',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f' }}>sarah.m@example.com</span>
              <span style={{ fontSize: '12px', color: '#8e8e93' }}>November 15, 2026</span>
            </div>
            <div style={{ color: '#ffd700', fontSize: '13px', marginBottom: '4px' }}>★★★★★</div>
            <p style={{ margin: 0, fontSize: '13px', color: '#3a3a3c', lineHeight: 1.5 }}>
              These shoes are amazing! The cushioning is incredible and they look great. Perfect for daily runs.
            </p>
          </div>

          {/* Sample Review 2 */}
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f9f9fb',
              borderRadius: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f' }}>john.d@example.com</span>
              <span style={{ fontSize: '12px', color: '#8e8e93' }}>November 12, 2026</span>
            </div>
            <div style={{ color: '#ffd700', fontSize: '13px', marginBottom: '4px' }}>★★★★☆</div>
            <p style={{ margin: 0, fontSize: '13px', color: '#3a3a3c', lineHeight: 1.5 }}>
              Comfortable fit and true to size. The color is exactly as pictured. Will definitely buy again.
            </p>
          </div>
        </section>

        {/* Toast Notification */}
        {showToast && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#1d1d1f',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <span>✓</span>
            <span>{showToast}</span>
          </div>
        )}

        {/* Size Guide Modal */}
        {showSizeModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '16px'
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '350px',
                padding: '20px',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Size Guide</h3>
                <button
                  onClick={() => setShowSizeModal(false)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px' }}
                >
                  ✕
                </button>
              </div>
              <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '16px' }}>
                Nike Pegasus 43 fits true to size. For runners with wider feet, we suggest going up half a size.
              </p>
              <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e5ea', color: '#1d1d1f' }}>
                    <th style={{ padding: '6px 4px' }}>US Men</th>
                    <th style={{ padding: '6px 4px' }}>US Women</th>
                    <th style={{ padding: '6px 4px' }}>EU</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.slice(0, 10).map((s) => (
                    <tr key={s.sku} style={{ borderBottom: '1px solid #f0f0f2' }}>
                      <td style={{ padding: '6px 4px' }}>M {s.size_us_men}</td>
                      <td style={{ padding: '6px 4px' }}>W {s.size_us_women}</td>
                      <td style={{ padding: '6px 4px' }}>{s.size_eu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => setShowSizeModal(false)}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '10px',
                  backgroundColor: '#1d1d1f',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
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
