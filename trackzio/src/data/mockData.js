import { v4 as uuidv4 } from 'uuid';

// Placeholder for broken images
export const FALLBACK_IMAGE = 'https://placehold.co/500x400?text=No+Image';

export const CATEGORIES = ['Toys', 'Trading Cards', 'Watches', 'Books', 'Video Games', 'Coins', 'Art', 'Sneakers'];
export const CONDITIONS = ['Mint', 'Excellent', 'Very Good', 'Good', 'Fair'];

export const mockItems = [
  {
    id: 'item-1',
    title: 'Vintage 1977 Star Wars Action Figure',
    category: 'Toys',
    condition: 'Excellent',
    price: 1500,
    estimatedValue: 1800,
    sellerName: 'RetroGalaxy',
    location: 'New York, NY',
    image: 'https://picsum.photos/seed/toys1/500/400',
    description: 'Original Kenner Luke Skywalker action figure from 1977, complete with lightsaber. This is a genuine collector\'s item in excellent condition with original packaging.',
    dateAdded: '2024-09-15'
  },
  {
    id: 'item-2',
    title: 'First Edition Charizard Pokemon Card',
    category: 'Trading Cards',
    condition: 'Mint',
    price: 50000,
    estimatedValue: 55000,
    sellerName: 'PokeMaster99',
    location: 'Los Angeles, CA',
    image: 'https://picsum.photos/seed/cards1/500/400',
    description: 'PSA 10 Gem Mint First Edition Base Set Charizard. One of the most sought-after cards in the hobby. Comes with PSA certification.',
    dateAdded: '2024-09-20'
  },
  {
    id: 'item-3',
    title: 'Rolex Submariner 1980',
    category: 'Watches',
    condition: 'Good',
    price: 12000,
    estimatedValue: 14500,
    sellerName: 'TimeKeepers',
    location: 'London, UK',
    image: 'https://picsum.photos/seed/watches1/500/400',
    description: 'Classic vintage Rolex Submariner with original dial and hands. Shows signs of wear consistent with age but keeps excellent time.',
    dateAdded: '2024-10-01'
  },
  {
    id: 'item-4',
    title: 'Signed First Edition "Harry Potter"',
    category: 'Books',
    condition: 'Very Good',
    price: 35000,
    estimatedValue: 42000,
    sellerName: 'RareReads',
    location: 'Edinburgh, UK',
    image: 'https://picsum.photos/seed/books1/500/400',
    description: 'First edition, first printing of Harry Potter and the Philosopher\'s Stone. Signed by J.K. Rowling on the title page.',
    dateAdded: '2024-10-05'
  },
  {
    id: 'item-5',
    title: 'Classic NES Console in Box',
    category: 'Video Games',
    condition: 'Fair',
    price: 450,
    estimatedValue: 500,
    sellerName: '8BitNostalgia',
    location: 'Tokyo, Japan',
    image: 'https://picsum.photos/seed/games1/500/400',
    description: 'Original Nintendo Entertainment System complete with box and two controllers. Box has some damage but the console works perfectly.',
    dateAdded: '2024-10-10'
  },
  {
    id: 'item-6',
    title: '1955 Double Die Lincoln Penny',
    category: 'Coins',
    condition: 'Very Good',
    price: 1800,
    estimatedValue: 2200,
    sellerName: 'NumismaticKing',
    location: 'Chicago, IL',
    image: 'https://picsum.photos/seed/coins1/500/400',
    description: 'Famous 1955 doubled die obverse Lincoln penny. Clear doubling visible on the date and lettering. PCGS certified.',
    dateAdded: '2024-10-12'
  },
  {
    id: 'item-7',
    title: 'Original Banksy Print - "Girl with Balloon"',
    category: 'Art',
    condition: 'Mint',
    price: 75000,
    estimatedValue: 90000,
    sellerName: 'UrbanArtDealer',
    location: 'Berlin, Germany',
    image: 'https://picsum.photos/seed/art1/500/400',
    description: 'Authenticated Banksy screen print from a limited edition of 150. Comes with certificate of authenticity from Pest Control.',
    dateAdded: '2024-10-15'
  },
  {
    id: 'item-8',
    title: 'Air Jordan 1 Retro High OG "Chicago" (1985)',
    category: 'Sneakers',
    condition: 'Good',
    price: 8500,
    estimatedValue: 10000,
    sellerName: 'KicksVault',
    location: 'Portland, OR',
    image: 'https://picsum.photos/seed/sneakers1/500/400',
    description: 'Original 1985 Air Jordan 1 in the iconic Chicago colorway. Signs of wear but a true grail for any sneakerhead.',
    dateAdded: '2024-10-18'
  },
  {
    id: 'item-9',
    title: 'Sega Genesis Console Complete Set',
    category: 'Video Games',
    condition: 'Excellent',
    price: 320,
    estimatedValue: 380,
    sellerName: '16BitHero',
    location: 'Austin, TX',
    image: 'https://picsum.photos/seed/sega1/500/400',
    description: 'Sega Genesis Model 1 with original box, manual, controller, and 3 games. All in excellent working condition.',
    dateAdded: '2024-10-20'
  },
  {
    id: 'item-10',
    title: 'Rare Holographic Blastoise Card',
    category: 'Trading Cards',
    condition: 'Excellent',
    price: 3200,
    estimatedValue: 3800,
    sellerName: 'PokeMaster99',
    location: 'Los Angeles, CA',
    image: 'https://picsum.photos/seed/cards2/500/400',
    description: 'Base Set Unlimited Holographic Blastoise in near-perfect condition. Beautiful centering and clean surfaces.',
    dateAdded: '2024-10-22'
  },
  {
    id: 'item-11',
    title: 'Vintage Omega Speedmaster "Moonwatch"',
    category: 'Watches',
    condition: 'Very Good',
    price: 6500,
    estimatedValue: 7200,
    sellerName: 'TimeKeepers',
    location: 'London, UK',
    image: 'https://picsum.photos/seed/omega1/500/400',
    description: 'Omega Speedmaster Professional with manual winding calibre 861 movement. The same watch worn on the moon.',
    dateAdded: '2024-10-25'
  },
  {
    id: 'item-12',
    title: 'First Edition "The Great Gatsby"',
    category: 'Books',
    condition: 'Good',
    price: 150000,
    estimatedValue: 180000,
    sellerName: 'RareReads',
    location: 'Edinburgh, UK',
    image: 'https://picsum.photos/seed/gatsby1/500/400',
    description: 'A true first edition, first printing of The Great Gatsby (1925) with the original dust jacket. Minor wear to the jacket edges.',
    dateAdded: '2024-10-28'
  }
];

export const mockPosts = [
  {
    id: 'post-1',
    user: {
      name: 'CollectorJane',
      avatar: 'https://i.pravatar.cc/150?u=jane'
    },
    image: 'https://picsum.photos/seed/post1/600/400',
    caption: 'Finally found the missing piece to my vintage camera collection! 📸 #VintageCameras #Collector',
    category: 'Art',
    likes: 124,
    commentsList: [
      { id: 'c-1', author: 'BobG', text: 'Wow, looks incredible! Where did you get it?', timestamp: '2024-10-10T10:00:00Z' },
      { id: 'c-2', author: 'LensLover', text: 'I\'ve been searching for one of these for years!', timestamp: '2024-10-10T12:30:00Z' }
    ],
    datePosted: '2024-10-10'
  },
  {
    id: 'post-2',
    user: {
      name: 'RetroGamerHQ',
      avatar: 'https://i.pravatar.cc/150?u=retro'
    },
    image: 'https://picsum.photos/seed/post2/600/400',
    caption: 'Just restored this beauty. Plays like it did in 1985! 👾 #RetroGaming #Restoration',
    category: 'Video Games',
    likes: 89,
    commentsList: [
      { id: 'c-3', author: 'ArcadeFan', text: 'Classic! Do you use the original controllers?', timestamp: '2024-10-12T08:15:00Z' },
      { id: 'c-4', author: 'PixelKing', text: 'Nothing beats the original hardware.', timestamp: '2024-10-12T14:00:00Z' }
    ],
    datePosted: '2024-10-12'
  },
  {
    id: 'post-3',
    user: {
      name: 'SneakerHead',
      avatar: 'https://i.pravatar.cc/150?u=sneaks'
    },
    image: 'https://picsum.photos/seed/post3/600/400',
    caption: 'Got my hands on these limited editions today. The colorway is insane in person. 🔥👟 #Sneakers #Kicks',
    category: 'Sneakers',
    likes: 210,
    commentsList: [],
    datePosted: '2024-10-14'
  },
  {
    id: 'post-4',
    user: {
      name: 'CoinCollectorPro',
      avatar: 'https://i.pravatar.cc/150?u=coins'
    },
    image: 'https://picsum.photos/seed/post4/600/400',
    caption: 'This 1909 S VDB Lincoln Cent just arrived. The patina on this one is breathtaking. 🪙',
    category: 'Coins',
    likes: 67,
    commentsList: [
      { id: 'c-5', author: 'NumFan', text: 'That\'s a beauty! What grade?', timestamp: '2024-10-16T09:00:00Z' }
    ],
    datePosted: '2024-10-16'
  },
  {
    id: 'post-5',
    user: {
      name: 'BookwormCollector',
      avatar: 'https://i.pravatar.cc/150?u=books'
    },
    image: 'https://picsum.photos/seed/post5/600/400',
    caption: 'Unboxing my latest find — a first edition Hemingway. The smell of old paper is unmatched. 📚',
    category: 'Books',
    likes: 156,
    commentsList: [
      { id: 'c-6', author: 'LitFan', text: 'Hemingway collector here too! Which title?', timestamp: '2024-10-18T11:00:00Z' },
      { id: 'c-7', author: 'VintagePages', text: 'The condition looks amazing!', timestamp: '2024-10-18T13:45:00Z' },
      { id: 'c-8', author: 'CollectorJane', text: 'So jealous! Great find.', timestamp: '2024-10-18T16:20:00Z' }
    ],
    datePosted: '2024-10-18'
  }
];

export const mockCollections = {
  Owned: [
    { ...mockItems[0], dateAdded: '2024-09-15' },
    { ...mockItems[3], dateAdded: '2024-10-05' }
  ],
  Wishlist: [
    { ...mockItems[1], dateAdded: '2024-09-22' }
  ],
  Selling: [
    { ...mockItems[4], dateAdded: '2024-10-10' }
  ]
};

// Logged-in user mock data for profile
export const currentUser = {
  name: 'Alex the Collector',
  username: '@alex_collects',
  bio: 'Hunting down rare items since 2015. Mostly focused on retro gaming and vintage watches.',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  joinDate: 'Jan 2021',
  followers: 432,
  following: 112
};
