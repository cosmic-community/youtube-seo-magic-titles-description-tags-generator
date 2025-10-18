// Type definitions for YouTube SEO Magic application

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// App Settings type
export interface AppSettings extends CosmicObject {
  type: 'app-settings';
  metadata: {
    welcome_message?: string;
    free_tier_limit?: number;
    app_status?: boolean;
    enable_chapters?: boolean;
    enable_intro_script?: boolean;
    theme_color?: string;
  };
}

// Select dropdown option structure
export interface SelectOption {
  key: string;
  value: string;
}

// Topic type with metadata
export interface Topic extends CosmicObject {
  type: 'topics';
  metadata: {
    topic: string;
    language?: SelectOption;
    tone?: SelectOption;
    title_length?: SelectOption;
    target_keywords?: string;
    generated_data?: GeneratedContent;
    user_id?: string;
  };
}

// Generated content structure
export interface GeneratedContent {
  titles: string[];
  description: string;
  tags: string[];
  hashtags: string;
  chapters?: Chapter[];
  script_intro?: string;
}

// Video chapter structure
export interface Chapter {
  time: string;
  title: string;
}

// User input form data
export interface TopicFormData {
  topic: string;
  language: string;
  tone: string;
  titleLength: string;
  targetKeywords: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Generation menu options
export type MenuOption = 
  | 'regenerate-titles'
  | 'regenerate-all'
  | 'edit-preferences'
  | 'generate-chapters'
  | 'generate-intro'
  | 'export-json';

// User session tracking
export interface UserSession {
  userId: string;
  topicsGeneratedToday: number;
  lastGenerationDate: string;
}

// Type guards for runtime validation
export function isAppSettings(obj: CosmicObject): obj is AppSettings {
  return obj.type === 'app-settings';
}

export function isTopic(obj: CosmicObject): obj is Topic {
  return obj.type === 'topics';
}

// Utility types for form handling
export type LanguageOption = 'English' | 'Hindi' | 'Hinglish';
export type ToneOption = 'Casual' | 'Professional' | 'Funny' | 'Motivational';
export type TitleLengthOption = 'Short ≤50' | 'Medium 50–80' | 'Long ≤90';