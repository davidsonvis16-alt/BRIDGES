import { RestaurantBrand, CityCoverage, ValueProp } from '../types';

/** Pexels CDN URL for a photo id, resized to the given width. Photos: https://www.pexels.com/license/ */
const px = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const RESTAURANT_BRANDS: RestaurantBrand[] = [
  {
    id: 'artcaffe',
    name: 'Artcaffé',
    kinds: ['food', 'coffee'],
    category: 'Bakery & Gourmet Bistro',
    imageUrl: px(30573107, 800),
    deliveryTime: '20-30 min',
    rating: 4.8,
    ratingCount: '1.4k+',
    tag: 'Artisan Coffee & Pastries',
    priceRange: 'KES KES KES',
    description: 'Renowned for freshly roasted Kenyan coffee, flaky Belgian croissants, artisanal sourdough pizzas, and gourmet burgers.',
    featuredItems: [
      {
        id: 'art-1',
        name: 'Artcaffé Truffle Burger',
        description: 'Prime beef patty with truffle mayo, melted gouda, caramelized onions, and hand-cut herb fries.',
        price: 1350,
        imageUrl: px(70497, 400),
        isPopular: true,
      },
      {
        id: 'art-2',
        name: 'Salted Caramel Croissant',
        description: 'Warm, golden butter croissant infused with house-made salted caramel and toasted almonds.',
        price: 450,
        imageUrl: px(30427445, 400),
        isPopular: true,
      },
      {
        id: 'art-3',
        name: 'Iced Spanish Latte',
        description: 'Single-origin Kenyan espresso pulled over condensed milk and chilled fresh dairy.',
        price: 420,
        imageUrl: px(11136849, 400),
      }
    ]
  },
  {
    id: 'java-house',
    name: 'Java House Kenya',
    kinds: ['food', 'coffee'],
    category: 'Breakfast & Cafe',
    imageUrl: px(4552170, 800),
    deliveryTime: '25-35 min',
    rating: 4.7,
    ratingCount: '2.1k+',
    tag: 'Home of Kenyan Coffee',
    priceRange: 'KES KES',
    description: 'Kenyan comfort classics, hearty all-day English breakfast, legendary giant milkshakes, and spicy Mexican burritos.',
    featuredItems: [
      {
        id: 'jav-1',
        name: 'Java Legendary Espresso Shake',
        description: 'Rich dark espresso blended with creamy vanilla ice cream, whipped cream & chocolate drizzle.',
        price: 580,
        imageUrl: px(11381485, 400),
        isPopular: true,
      },
      {
        id: 'jav-2',
        name: 'Grand Breakfast Platter',
        description: 'Two free-range eggs, grilled beef sausage, bacon rashers, baked beans, home fries & buttered toast.',
        price: 1100,
        imageUrl: px(10720381, 400),
        isPopular: true,
      },
      {
        id: 'jav-3',
        name: 'Spicy Chicken Samosas (3pcs)',
        description: 'Crisp pastry triangles stuffed with spiced minced chicken, fresh coriander, and mint dip.',
        price: 380,
        imageUrl: px(14477873, 400),
      }
    ]
  },
  {
    id: 'cjs',
    name: "CJ's Restaurant",
    kinds: ['food'],
    category: 'Continental & Platters',
    imageUrl: px(2015191, 800),
    deliveryTime: '30-40 min',
    rating: 4.9,
    ratingCount: '3.5k+',
    tag: 'Top Rated in Nairobi',
    priceRange: 'KES KES KES',
    description: 'Over 300 gourmet menu items! Massive signature platters, mocktails, sizzling fajitas, and stone-baked pizza.',
    featuredItems: [
      {
        id: 'cj-1',
        name: "CJ's Sizzling Beef Fajitas",
        description: 'Marinated beef strips grilled with peppers, served with soft tortillas, guacamole, sour cream and salsa.',
        price: 1650,
        imageUrl: px(32375350, 400),
        isPopular: true,
      },
      {
        id: 'cj-2',
        name: 'Passion Mint Mojito (Pitcher)',
        description: 'Fresh Kenyan passion fruit, crushed mint, lime juice, and sparkling soda.',
        price: 520,
        imageUrl: px(30591638, 400),
        isPopular: true,
      },
      {
        id: 'cj-3',
        name: 'Loaded Philly Cheesesteak',
        description: 'Tender sliced sirloin grilled with sautéed onions, mushrooms, and melted provolone in a toasted hoagie.',
        price: 1450,
        imageUrl: px(36501097, 400),
      }
    ]
  },
  {
    id: 'galitos',
    name: "Galito's Flame Grilled",
    kinds: ['food'],
    category: 'Flame-Grilled Chicken',
    imageUrl: px(5704254, 800),
    deliveryTime: '20-30 min',
    rating: 4.6,
    ratingCount: '980+',
    tag: 'Fiery Peri-Peri Chicken',
    priceRange: 'KES KES',
    description: 'Authentic African bird’s eye chili marinated flame-grilled chicken, seasoned peri-peri chips, and spicy rice.',
    featuredItems: [
      {
        id: 'gal-1',
        name: 'Full Flame-Grilled Chicken Meal',
        description: 'Whole chicken basted in Lemon & Herb, Mild, Hot, or Extra Hot Peri-Peri, served with large chips & 2 garlic rolls.',
        price: 1750,
        imageUrl: px(106343, 400),
        isPopular: true,
      },
      {
        id: 'gal-2',
        name: 'Peri Chicken Liver Roll',
        description: 'Tender pan-seared spicy chicken livers in rich gravy, tucked inside a fresh crusty Portuguese roll.',
        price: 490,
        imageUrl: px(9624298, 400),
        isPopular: true,
      }
    ]
  },
  {
    id: 'mama-oliech',
    name: 'Mama Oliech Restaurant',
    kinds: ['food'],
    category: 'Kenyan Local Delicacies',
    imageUrl: px(16931505, 800),
    deliveryTime: '25-35 min',
    rating: 4.9,
    ratingCount: '4.2k+',
    tag: 'Authentic Lake Victoria Fish',
    priceRange: 'KES KES',
    description: 'The legendary Nairobi destination for crispy whole deep-fried Lake Victoria Tilapia, traditional Ugali, Sukuma Wiki, and Kachumbari.',
    featuredItems: [
      {
        id: 'mo-1',
        name: 'Crisp Whole Tilapia with Brown Ugali',
        description: 'Fresh jumbo Lake Victoria Tilapia deep-fried crisp, served with steaming brown ugali, collard greens, and fresh kachumbari salsa.',
        price: 1200,
        imageUrl: px(16931505, 400),
        isPopular: true,
      },
      {
        id: 'mo-2',
        name: 'Wet Fry Tilapia in Coconut Gravy',
        description: 'Tender tilapia fillets simmered with ripe tomatoes, onions, garlic, and fresh coastal coconut cream.',
        price: 1350,
        imageUrl: px(8611130, 400),
        isPopular: true,
      }
    ]
  },
  {
    id: 'swahili-plate',
    name: 'Swahili Plate & Grill',
    kinds: ['food'],
    category: 'Coastal & Biryani',
    imageUrl: px(2092916, 800),
    deliveryTime: '15-25 min',
    rating: 4.8,
    ratingCount: '1.8k+',
    tag: 'Coastal Spices & Pilau',
    priceRange: 'KES KES',
    description: 'Fragrant Mombasa beef biryani, goat pilau, Mahamri with mbaazi, chicken shawarma, and fresh tamarind juice.',
    featuredItems: [
      {
        id: 'sw-1',
        name: 'Mombasa Goat Biryani Ya Mbuzi',
        description: 'Tender slow-cooked goat meat in aromatic coastal spices, layered with basmati saffron rice and boiled egg.',
        price: 950,
        imageUrl: px(7340956, 400),
        isPopular: true,
      },
      {
        id: 'sw-2',
        name: 'Warm Mahamri & Mbaazi (4pcs)',
        description: 'Fluffy cardamom-infused fried Swahili dough pockets paired with rich pigeon peas simmered in thick coconut sauce.',
        price: 480,
        imageUrl: px(13915068, 400),
        isPopular: true,
      }
    ]
  },
  {
    id: 'big-square',
    name: 'Big Square Kenya',
    kinds: ['food'],
    category: 'Burgers & BBQ Ribs',
    imageUrl: px(3219547, 800),
    deliveryTime: '20-30 min',
    rating: 4.7,
    ratingCount: '1.6k+',
    tag: 'Smoky BBQ & Double Patties',
    priceRange: 'KES KES',
    description: 'Famous square-cut BBQ ribs, hand-pressed double beef burgers, crunchy onion rings, and creamy craft shakes.',
    featuredItems: [
      {
        id: 'bs-1',
        name: 'Sticky BBQ Pork/Beef Ribs Rack',
        description: 'Slow-smoked tender ribs glazed with house honey-chipotle BBQ sauce, served with seasoned wedges & slaw.',
        price: 1850,
        imageUrl: px(410648, 400),
        isPopular: true,
      },
      {
        id: 'bs-2',
        name: 'The Big Square Double Smash',
        description: 'Two 150g beef patties, double cheddar cheese, dill pickles, crisp lettuce, and signature secret sauce.',
        price: 1150,
        imageUrl: px(2271101, 400),
        isPopular: true,
      }
    ]
  },
  {
    id: 'bridges-mart',
    name: 'Bridges Mart & Fresh Produce',
    kinds: ['groceries'],
    category: 'Groceries & Supermarket',
    imageUrl: px(264636, 800),
    deliveryTime: '15-20 min',
    rating: 4.9,
    ratingCount: '5.1k+',
    tag: 'Express 15-min Groceries',
    priceRange: 'KES',
    description: 'Fresh farm avocados, milk, bread, eggs, cooking oil, pantry staples, and household cleaning delivered in 15 minutes.',
    featuredItems: [
      {
        id: 'bm-1',
        name: 'Fresh Farm Hass Avocado Bag (4pcs)',
        description: 'Ripe, creamy Kenyan Hass avocados directly from Central Kenya smallholders.',
        price: 240,
        imageUrl: px(5966631, 400),
        isPopular: true,
      },
      {
        id: 'bm-2',
        name: 'Brookside Fresh Whole Milk (500ml x 3)',
        description: 'Pasteurized homogenized full-cream fresh milk.',
        price: 210,
        imageUrl: px(5946742, 400),
        isPopular: true,
      }
    ]
  },
  // --- Additional listings (fictional names) ---
  {
    id: 'shamba-fresh',
    name: 'Shamba Fresh Grocers',
    kinds: ['groceries'],
    category: 'Fruit & Vegetables',
    imageUrl: px(17302468, 800),
    deliveryTime: '20-30 min',
    rating: 4.7,
    ratingCount: '640+',
    tag: 'Farm-fresh produce',
    priceRange: 'KES',
    description: 'Seasonal fruit and vegetables bought each morning from farms around Kiambu and Limuru.',
    featuredItems: [
      {
        id: 'sf-1',
        name: 'Mixed Vegetable Basket (3kg)',
        description: 'Tomatoes, onions, sukuma wiki, carrots, capsicum and cabbage. Enough for a week of meals.',
        price: 650,
        imageUrl: px(2255924, 400),
        isPopular: true,
      },
      {
        id: 'sf-2',
        name: 'Tropical Fruit Box',
        description: 'Ripe bananas, mangoes, pineapple and passion fruit, picked for eating this week.',
        price: 900,
        imageUrl: px(709567, 400),
      },
    ],
  },
  {
    id: 'mtaa-mini-market',
    name: 'Mtaa Mini Market',
    kinds: ['groceries'],
    category: 'Everyday Essentials',
    imageUrl: px(16211537, 800),
    deliveryTime: '15-25 min',
    rating: 4.5,
    ratingCount: '410+',
    tag: 'Open until midnight',
    priceRange: 'KES',
    description: 'Bread, eggs, flour, cooking oil, soap and airtime. The neighbourhood shop, delivered.',
    featuredItems: [
      {
        id: 'mm-1',
        name: 'Tray of Eggs (30)',
        description: 'Fresh farm eggs, graded and checked.',
        price: 480,
        imageUrl: px(1631180, 400),
        isPopular: true,
      },
      {
        id: 'mm-2',
        name: 'White Bread Loaf (600g)',
        description: 'Soft sliced white bread, baked today.',
        price: 75,
        imageUrl: px(20149452, 400),
      },
    ],
  },
  {
    id: 'ridge-roasters',
    name: 'Ridge Roasters',
    kinds: ['coffee'],
    category: 'Coffee & Bakery',
    imageUrl: px(19851795, 800),
    deliveryTime: '15-25 min',
    rating: 4.8,
    ratingCount: '720+',
    tag: 'Roasted in Nairobi',
    priceRange: 'KES KES',
    description: 'Small-batch Kenyan AA coffee, spiced chai and pastries baked each morning.',
    featuredItems: [
      {
        id: 'rr-1',
        name: 'Double Espresso',
        description: 'Kenyan AA beans from Nyeri, roasted in-house.',
        price: 250,
        imageUrl: px(4350219, 400),
        isPopular: true,
      },
      {
        id: 'rr-2',
        name: 'Spiced Masala Chai',
        description: 'Kenyan black tea brewed with milk, ginger, cardamom and cinnamon.',
        price: 220,
        imageUrl: px(5946623, 400),
      },
      {
        id: 'rr-3',
        name: 'Cinnamon Roll',
        description: 'Soft brioche dough, cinnamon sugar and cream cheese icing.',
        price: 300,
        imageUrl: px(3951306, 400),
      },
    ],
  },
  {
    id: 'afya-plus',
    name: 'Afya Plus Pharmacy',
    kinds: ['pharmacy'],
    category: 'Pharmacy & Health',
    imageUrl: px(14797855, 800),
    deliveryTime: '20-30 min',
    rating: 4.8,
    ratingCount: '530+',
    tag: 'Pharmacist on call',
    priceRange: 'KES KES',
    description: 'Over-the-counter medicines, vitamins and first aid. Prescriptions are checked by a registered pharmacist before dispatch.',
    featuredItems: [
      {
        id: 'ap-1',
        name: 'Vitamin C 1000mg (30 tablets)',
        description: 'Daily immune support supplement.',
        price: 650,
        imageUrl: px(13787566, 400),
        isPopular: true,
      },
      {
        id: 'ap-2',
        name: 'Home First Aid Kit',
        description: 'Plasters, gauze, bandages, antiseptic wipes, scissors and gloves.',
        price: 1450,
        imageUrl: px(5673523, 400),
      },
    ],
  },
  {
    id: 'uzima-chemists',
    name: 'Uzima Chemists',
    kinds: ['pharmacy'],
    category: 'Pharmacy & Wellness',
    imageUrl: px(13119976, 800),
    deliveryTime: '25-35 min',
    rating: 4.6,
    ratingCount: '380+',
    tag: 'Open 24 hours',
    priceRange: 'KES KES',
    description: 'Round-the-clock chemist for everyday medicines, supplements and travel health.',
    featuredItems: [
      {
        id: 'uz-1',
        name: 'Omega-3 Fish Oil (60 capsules)',
        description: 'One capsule a day with food.',
        price: 1200,
        imageUrl: px(14744699, 400),
        isPopular: true,
      },
      {
        id: 'uz-2',
        name: 'Travel First Aid Pouch',
        description: 'Compact kit for the car or a safari bag.',
        price: 950,
        imageUrl: px(5149757, 400),
      },
    ],
  },
  {
    id: 'carewell',
    name: 'CareWell Pharmacy',
    kinds: ['pharmacy'],
    category: 'Pharmacy & Personal Care',
    imageUrl: px(8657368, 800),
    deliveryTime: '20-30 min',
    rating: 4.7,
    ratingCount: '290+',
    tag: 'Personal care & baby',
    priceRange: 'KES KES',
    description: 'Medicines, skin care, baby care and personal hygiene from a family-run pharmacy.',
    featuredItems: [
      {
        id: 'cw-1',
        name: 'First Aid Kit with Gloves',
        description: 'Everything for minor cuts and scrapes at home or in the office.',
        price: 1650,
        imageUrl: px(5664736, 400),
        isPopular: true,
      },
      {
        id: 'cw-2',
        name: 'Body Care Set',
        description: 'Gentle body lotion and a soft cotton towel.',
        price: 1100,
        imageUrl: px(3872899, 400),
      },
    ],
  },
];

export const CITIES_COVERAGE: CityCoverage[] = [
  {
    id: 'nairobi',
    name: 'Nairobi',
    status: 'active',
    popularEstates: ['Westlands', 'Kilimani', 'Karen', 'Upper Hill', 'Parklands', 'Lavington', 'CBD', 'South B & C', 'Kileleshwa', 'Ngong Road', 'Runda', 'Gigiri'],
    riderCount: '1,200+ Active Couriers',
    avgTime: '22 mins'
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    status: 'active',
    popularEstates: ['Nyali', 'Bamburi', 'Mombasa CBD', 'Tudor', 'Kizingo', 'Old Town', 'Shanzu', 'Mtwapa'],
    riderCount: '350+ Active Couriers',
    avgTime: '26 mins'
  },
  {
    id: 'kisumu',
    name: 'Kisumu',
    status: 'active',
    popularEstates: ['Milimani', 'Kondele', 'Mega City Area', 'Riat Hills', 'Tom Mboya', 'Kisumu CBD'],
    riderCount: '180+ Active Couriers',
    avgTime: '24 mins'
  },
  {
    id: 'nakuru',
    name: 'Nakuru',
    status: 'active',
    popularEstates: ['Milimani Nakuru', 'Section 58', 'Naka', 'Kiamunyi', 'Nakuru CBD', 'Pipeline'],
    riderCount: '210+ Active Couriers',
    avgTime: '25 mins'
  },
  {
    id: 'eldoret',
    name: 'Eldoret',
    status: 'active',
    popularEstates: ['Elgon View', 'Pioneer', 'Eldoret CBD', 'West Indies', 'Kapsoya', 'Maili Nne'],
    riderCount: '150+ Active Couriers',
    avgTime: '25 mins'
  },
  {
    id: 'diani',
    name: 'Diani & South Coast',
    status: 'active',
    popularEstates: ['Diani Beach Road', 'Ukunda', 'Galu Kinondo', 'Kongo River'],
    riderCount: '90+ Active Couriers',
    avgTime: '28 mins'
  },
  {
    id: 'thika',
    name: 'Thika & Kiambu',
    status: 'active',
    popularEstates: ['Section 9', 'Annas Mall Area', 'Kenyatta Highway', 'Juja Hub', 'Ruaka'],
    riderCount: '140+ Active Couriers',
    avgTime: '27 mins'
  },
  {
    id: 'naivasha',
    name: 'Naivasha',
    status: 'coming-soon',
    popularEstates: ['Moi South Lake Rd', 'Naivasha Town', 'Karagita', 'Lakeview'],
    riderCount: 'Launching Next Month',
    avgTime: '--'
  }
];

export const VALUE_PROPS: ValueProp[] = [
  {
    id: 'speed',
    title: 'Lightning-fast delivery',
    description: 'Hot meals and essentials dispatched instantly by verified Bridges couriers directly to your doorstep.',
    icon: 'Zap',
    stat: '24 min',
    statLabel: 'Average delivery time'
  },
  {
    id: 'selection',
    title: 'Widest restaurant selection',
    description: 'From iconic Kenyan favorites and coastal biryani to top gourmet bistros and international brands.',
    icon: 'UtensilsCrossed',
    stat: '650+',
    statLabel: 'Partner restaurants'
  },
  {
    id: 'groceries',
    title: 'Groceries, pharmacy & extras',
    description: 'Fresh farm produce, supermarket runs from Naivas & Carrefour, medicines, and parcel pickups on demand.',
    icon: 'ShoppingBag',
    stat: '10,000+',
    statLabel: 'Daily essentials in stock'
  }
];

export const POPULAR_LOCATIONS_SUGGESTIONS = [
  { label: 'Westlands, Nairobi', area: 'Nairobi', tag: 'High demand' },
  { label: 'Kilimani & Yaya Centre, Nairobi', area: 'Nairobi', tag: 'Fast dispatch' },
  { label: 'Upper Hill Financial District, Nairobi', area: 'Nairobi', tag: 'Lunch hotspot' },
  { label: 'Karen & The Hub, Nairobi', area: 'Nairobi', tag: 'Popular' },
  { label: 'Parklands & Highridge, Nairobi', area: 'Nairobi', tag: 'Active now' },
  { label: 'Nyali Cinemax, Mombasa', area: 'Mombasa', tag: 'Coastal zone' },
  { label: 'Milimani & Mega City, Kisumu', area: 'Kisumu', tag: 'Lake region' },
  { label: 'Section 58, Nakuru', area: 'Nakuru', tag: 'Rift valley' }
];
