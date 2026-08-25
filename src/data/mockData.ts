import { RestaurantBrand, CityCoverage, ValueProp } from '../types';

export const RESTAURANT_BRANDS: RestaurantBrand[] = [
  {
    id: 'artcaffe',
    name: 'Artcaffé',
    category: 'Bakery & Gourmet Bistro',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'art-2',
        name: 'Salted Caramel Croissant',
        description: 'Warm, golden butter croissant infused with house-made salted caramel and toasted almonds.',
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'art-3',
        name: 'Iced Spanish Latte',
        description: 'Single-origin Kenyan espresso pulled over condensed milk and chilled fresh dairy.',
        price: 420,
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=500&q=80',
      }
    ]
  },
  {
    id: 'java-house',
    name: 'Java House Kenya',
    category: 'Breakfast & Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'jav-2',
        name: 'Grand Breakfast Platter',
        description: 'Two free-range eggs, grilled beef sausage, bacon rashers, baked beans, home fries & buttered toast.',
        price: 1100,
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'jav-3',
        name: 'Spicy Chicken Samosas (3pcs)',
        description: 'Crisp pastry triangles stuffed with spiced minced chicken, fresh coriander, and mint dip.',
        price: 380,
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80',
      }
    ]
  },
  {
    id: 'cjs',
    name: "CJ's Restaurant",
    category: 'Continental & Platters',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'cj-2',
        name: 'Passion Mint Mojito (Pitcher)',
        description: 'Fresh Kenyan passion fruit, crushed mint, lime juice, and sparkling soda.',
        price: 520,
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'cj-3',
        name: 'Loaded Philly Cheesesteak',
        description: 'Tender sliced sirloin grilled with sautéed onions, mushrooms, and melted provolone in a toasted hoagie.',
        price: 1450,
        imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80',
      }
    ]
  },
  {
    id: 'galitos',
    name: "Galito's Flame Grilled",
    category: 'Flame-Grilled Chicken',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'gal-2',
        name: 'Peri Chicken Liver Roll',
        description: 'Tender pan-seared spicy chicken livers in rich gravy, tucked inside a fresh crusty Portuguese roll.',
        price: 490,
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      }
    ]
  },
  {
    id: 'mama-oliech',
    name: 'Mama Oliech Restaurant',
    category: 'Kenyan Local Delicacies',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'mo-2',
        name: 'Wet Fry Tilapia in Coconut Gravy',
        description: 'Tender tilapia fillets simmered with ripe tomatoes, onions, garlic, and fresh coastal coconut cream.',
        price: 1350,
        imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      }
    ]
  },
  {
    id: 'swahili-plate',
    name: 'Swahili Plate & Grill',
    category: 'Coastal & Biryani',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'sw-2',
        name: 'Warm Mahamri & Mbaazi (4pcs)',
        description: 'Fluffy cardamom-infused fried Swahili dough pockets paired with rich pigeon peas simmered in thick coconut sauce.',
        price: 480,
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      }
    ]
  },
  {
    id: 'big-square',
    name: 'Big Square Kenya',
    category: 'Burgers & BBQ Ribs',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'bs-2',
        name: 'The Big Square Double Smash',
        description: 'Two 150g beef patties, double cheddar cheese, dill pickles, crisp lettuce, and signature secret sauce.',
        price: 1150,
        imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      }
    ]
  },
  {
    id: 'bridges-mart',
    name: 'Bridges Mart & Fresh Produce',
    category: 'Groceries & Supermarket',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      },
      {
        id: 'bm-2',
        name: 'Brookside Fresh Whole Milk (500ml x 3)',
        description: 'Pasteurized homogenized full-cream fresh milk.',
        price: 210,
        imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80',
        isPopular: true,
      }
    ]
  }
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
