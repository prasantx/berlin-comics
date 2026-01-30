export type Condition = 'NM' | 'VF' | 'FN' | 'VG' | 'GD' | 'FR' | 'NEW';

export type Category = 'new-releases' | 'back-issues' | 'rare-collectible' | 'graded' | 'graphic-novels' | 'manga' | 'poster';

export interface Comic {
  id: string;
  title: string;
  issueNumber?: string;
  series?: string;
  publisher: string;
  year: number;
  price: number;
  originalPrice?: number;
  condition: Condition;
  gradeScore?: string;
  gradeNote?: string;
  description: string;
  staffNote?: string;
  category: Category;
  cover: string; // Used as imageUrl
  
  // Inventory & Status
  inStock?: boolean;
  stockCount?: number;
  isRare?: boolean;
  isGraded?: boolean;
  staffPick?: boolean;
  isStaffPick?: boolean; // Alias for staffPick
  
  // Social
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  comic: Comic;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}