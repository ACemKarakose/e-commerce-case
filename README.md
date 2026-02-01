# E-Commerce Case Application

Modern bir e-commerce frontend uygulaması. React 19, TypeScript ve Vite ile geliştirildi.

## Proje Yapısı

```
src/
├── api/          # API client ve React Query hooks
├── components/   # UI bileşenleri
├── pages/        # Sayfa bileşenleri
├── store/        # Zustand state management
├── data/         # Statik veriler
└── assets/       # Görseller ve statik dosyalar
```

## Teknolojiler

- **React 19** - UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool ve dev server
- **TanStack Query v5** - API istekleri ve cache yönetimi
- **OpenAPI Codegen** - API client code generation (`npm run codegen`)
- **Zustand** - Global state management (cart, filters)
- **Tailwind CSS** - Styling
- **React Router v7** - Routing

## Mimari ve Tasarım Kararları

### Design Patterns

| Pattern                             | Kullanım Yeri                 | Açıklama                                         |
| ----------------------------------- | ----------------------------- | ------------------------------------------------ |
| **Flux / Unidirectional Data Flow** | `cartStore.ts`                | Zustand ile tek yönlü veri akışı                 |
| **Middleware Composition**          | `cartStore.ts`                | `immer` + `persist` + `devtools` zinciri         |
| **Composite Key**                   | `cartStore.ts`                | `productId-size-color` formatında varyant ID'si  |
| **Selector Pattern**                | `cartStore.ts`                | `selectCartItemCount` gibi memoized selector'lar |
| **Query Key Factory**               | `queries.ts`                  | Hierarchical query key yapısı                    |
| **Contract-First API**              | `openapi.json` → `generated/` | OpenAPI şemasından otomatik client üretimi       |

### State Yönetimi Stratejisi

```
┌─────────────────┐     ┌─────────────────┐
│  Server State   │     │  Client State   │
│  (TanStack Q.)  │     │   (Zustand)     │
├─────────────────┤     ├─────────────────┤
│ • Products      │     │ • Cart          │
│ • Categories    │     │ • Filters       │
│ • Reviews       │     │ • UI State      │
└─────────────────┘     └─────────────────┘
```

- **Server State**: TanStack Query ile yönetilir (cache, refetch, stale time)
- **Client State**: Zustand ile yönetilir (persist to localStorage)

## Özellikler

### Ürün Listeleme

- Kategori bazlı filtreleme
- Fiyat aralığı filtresi (rc-slider)
- Sıralama seçenekleri

### Sepet

- Zustand persist ile kalıcı sepet
- Miktar güncelleme
- Ürün silme

### Responsive Tasarım

- Mobilde filter drawer
- Desktop/mobil için farklı layoutlar

### Ürün Detay

- Renk ve beden seçimi
- Tab yapısı (detay, yorumlar)

## Ekran Görüntüleri

### Ana Sayfa

|                                         Desktop                                          |                                         Mobile                                         |
| :--------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
| <img src="src/assets/uiScreenShots/homePageDesktop.png" width="800" alt="Home Desktop"/> | <img src="src/assets/uiScreenShots/homePageMobile.png" width="300" alt="Home Mobile"/> |

### Ürün Listesi

|                                             Desktop                                             |                                            Mobile                                             |
| :---------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| <img src="src/assets/uiScreenShots/allProductsDesktop.png" width="800" alt="Products Desktop"/> | <img src="src/assets/uiScreenShots/allProductsMobile.png" width="300" alt="Products Mobile"/> |

### Ürün Detay

|                                             Desktop                                             |                                            Mobile                                             |
| :---------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| <img src="src/assets/uiScreenShots/productDetailDesktop.png" width="800" alt="Detail Desktop"/> | <img src="src/assets/uiScreenShots/productDetailMobile.png" width="300" alt="Detail Mobile"/> |

### Sepet

|                                       Desktop                                        |                                       Mobile                                       |
| :----------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| <img src="src/assets/uiScreenShots/cartDesktop.png" width="800" alt="Cart Desktop"/> | <img src="src/assets/uiScreenShots/cartMobile.png" width="300" alt="Cart Mobile"/> |

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur (.env.example'a bak)
cp .env.example .env

# Dev server'ı başlat
npm run dev
```

> **Not:** Bu repoda `src/api/generated/` klasörü zaten commit edilmiştir.
> API şeması (`openapi.json`) değiştiğinde `npm run codegen` çalıştırmanız gerekir.
