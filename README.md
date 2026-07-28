# Collector's Hub

A responsive web application for collectors — discover collectibles through a marketplace, browse community posts, and manage your personal collection.

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Navigate into the project folder
cd trackzio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Assumptions Made

1. Authentication is not required — a mock logged-in user (`currentUser`) is used throughout the app.
2. All data is mocked locally in `src/data/mockData.js`. No backend or JSON server is needed.
3. The `estimatedValue` on each item is a mock number representing a realistic market estimate, slightly above purchase price.
4. "Add to Wishlist" from the marketplace is the same as "Add to Collection → Wishlist".
5. Community post categories are matched against a shared `CATEGORIES` constant.
6. Filters reset when switching tabs in My Collection (intentional UX choice to avoid stale filters).
7. The profile page shows the current logged-in user's data; posts are filtered by matching `user.name`.

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.jsx           # Responsive top navigation with dark mode toggle
│   └── ui/
│       ├── ItemCard.jsx          # Marketplace + Collection card with detail modal
│       ├── PostCard.jsx          # Community post card with comments + detail modal
│       ├── FilterBar.jsx         # Reusable search + filter + sort bar
│       ├── SkeletonCard.jsx      # Loading skeleton that matches ItemCard footprint
│       ├── EmptyState.jsx        # Reusable empty/no-results state component
│       ├── ErrorState.jsx        # Reusable error state with optional retry
│       └── GlobalSnackbar.jsx    # App-wide toast notification component
├── context/
│   └── AppProvider.jsx           # Global state: theme, collections, posts, snackbar
├── data/
│   └── mockData.js               # 12 items, 5 posts, user, collections
├── hooks/
│   └── useDebounce.js            # Custom debounce hook for search inputs
├── pages/
│   ├── Marketplace.jsx           # Browse, filter, search, sort listings
│   ├── CommunityFeed.jsx         # Browse and interact with community posts
│   ├── MyCollection.jsx          # Manage Owned / Wishlist / Selling collections
│   └── Profile.jsx               # User profile with stats and activity
├── App.jsx                       # Root with routing + GlobalSnackbar
├── main.jsx                      # React entry point
└── index.css                     # Base styles + custom scrollbar
```

---

## Libraries Used

| Library | Purpose |
|---|---|
| **React 19** | Core UI library |
| **Vite** | Build tool and dev server |
| **Material UI v9** | Component library (`@mui/material`, `@mui/icons-material`) |
| **React Router DOM v7** | Client-side routing |
| **UUID** | Generating unique IDs for mock data |

---

## Features Implemented

### Marketplace
- ✅ Browse all listings in a responsive grid (4→3→2→1 columns)
- ✅ Seller name and location shown on every card
- ✅ Product detail modal with full description, price vs. estimated value, seller info
- ✅ Debounced search by title or seller name
- ✅ Filter by category (8 categories)
- ✅ Filter by condition (5 conditions)
- ✅ Sort by newest / price (asc/desc) / estimated value / name A-Z
- ✅ Add to Owned, Wishlist, or Selling from card or detail modal
- ✅ Duplicate detection with warning toast
- ✅ Skeleton loader grid on initial load
- ✅ Meaningful empty state for no results

### Community Feed
- ✅ Instagram-style post cards with user info, image, caption
- ✅ Category chip on every post
- ✅ Category filter matching marketplace categories
- ✅ Debounced search by caption or username
- ✅ Like (toggle with optimistic update and counter)
- ✅ Save/bookmark (toggle with toast feedback)
- ✅ Expandable comment section (click comment icon)
- ✅ Add comment (attributed to logged-in user)
- ✅ Post detail modal (full view with like/save/comments)
- ✅ Image fallback for broken URLs

### My Collection
- ✅ Three tabs: Owned / Wishlist / Selling with item counts
- ✅ Portfolio value card (estimated vs. purchase cost) on Owned tab
- ✅ Per-item estimated value shown on collection cards
- ✅ Date Added shown on collection cards
- ✅ Debounced search by title or category
- ✅ Category + condition filters
- ✅ Full sort options
- ✅ Move item between collections (via context menu)
- ✅ Remove item from collection (with toast feedback)
- ✅ Empty state with actionable guidance

### Logical Requirements
- ✅ Prevent duplicate items in the same collection
- ✅ Warning toast when duplicate add is attempted
- ✅ Success/info/warning toasts for all user actions (GlobalSnackbar)
- ✅ Meaningful empty states on all pages
- ✅ Helpful no-results messages with variant messaging
- ✅ Image fallback (`onError` → placeholder) on all images
- ✅ Skeleton loaders during initial load simulation
- ✅ Error state component ready for API integration
- ✅ Debounced search (300ms) on all pages

### Design & Responsiveness
- ✅ MUI theme system with `Inter` font, custom border-radius, consistent spacing
- ✅ Responsive grid adapts across xs/sm/md/lg breakpoints
- ✅ Responsive navbar (hamburger on mobile)
- ✅ Cards have hover elevation animation
- ✅ Modal/dialog for item and post detail

### Bonus Features
- ✅ **Dark Mode** — persisted via localStorage
- ✅ **Skeleton Loaders** — shimmer animation during load
- ✅ **Debounced Search** — custom `useDebounce` hook
- ✅ **Local Persistence** — collections and theme persist in localStorage
- ✅ **Optimistic UI** — likes, saves, add/remove update instantly
- ✅ **Smooth Animations** — card hover lift, MUI transitions
- ✅ **Portfolio Value Calculator** — live estimated value tracking
