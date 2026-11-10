export type Format = "Text" | "Audio" | "Video";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}
export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}
export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  format: Format;
  difficulty: Difficulty;
  durationMinutes: number;
  thumbnail: string;
  content: ArticleSection[];
  mediaUrl?: string;
  mediaCredit?: string;
}
export interface Lesson {
  id: string;
  title: string;
  resourceId: string;
  order: number;
}
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  difficulty: Difficulty;
  lessons: Lesson[];
  estimatedDuration: number;
  thumbnail: string;
}
export interface Goal {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: "active" | "completed";
  createdAt: string;
  kind: "numerical" | "completion";
}
export interface CourseProgress {
  courseId: string;
  completedLessonIds: string[];
  enrolledAt: string;
  lastAccessedAt: string;
}
export interface DemoState {
  version: 1;
  goals: Goal[];
  progress: CourseProgress[];
}
