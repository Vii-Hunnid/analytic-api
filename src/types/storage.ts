// src/types/storage.ts
export interface StorageConfig {
  type: 'supabase' | 'firebase';
  credentials: {
    supabaseUrl?: string;
    supabaseKey?: string;
    firebaseConfig?: any;
  };
}

export interface StorageEvent {
  id?: string;
  data: any;
  timestamp: Date;
  type: string;
}
