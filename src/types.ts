export interface RestaurantBrand {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  logoUrl?: string;
  deliveryTime: string;
  rating: number;
  ratingCount: string;
  tag: string;
  priceRange: string;
  featuredItems: MenuItem[];
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in KES
  imageUrl: string;
  isPopular?: boolean;
}

export interface CityCoverage {
  id: string;
  name: string;
  status: 'active' | 'coming-soon';
  popularEstates: string[];
  riderCount: string;
  avgTime: string;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
}

export interface CookiePreferences {
  essential: boolean; // Always true
  functional: boolean; // Language, recent locations, UI settings
  analytics: boolean; // Performance telemetry, route tracking metrics
  marketing: boolean; // Promotional vouchers, customized restaurant discounts
  consentGiven: boolean;
  timestamp?: number;
}

export interface BrowserCookieEntry {
  name: string;
  value: string;
  category: 'essential' | 'functional' | 'analytics' | 'marketing';
  description: string;
  expires: string;
}

