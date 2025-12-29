export interface Project {
  id: string;
  size: 'sm' | 'md' | 'lg';
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  images?: string[];
}

export interface Skill {
  key: string; // Translation key identifier
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
}

export enum Language {
  EN = 'en',
  ZH = 'zh',
  JA = 'ja'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}