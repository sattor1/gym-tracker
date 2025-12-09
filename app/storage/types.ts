export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'legs'
  | 'glutes'
  | 'arms'
  | 'biceps'
  | 'triceps'
  | 'core'
  | 'full_body'
  | 'conditioning'
  | 'cardio';

export type SessionFocus =
  | 'push'
  | 'pull'
  | 'legs'
  | 'upper'
  | 'lower'
  | 'full'
  | 'hiit'
  | 'custom';

export interface TemplateExercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  defaultSets: number;
  defaultReps: number;
  defaultWeight?: number;
  defaultRestSec?: number;
  notes?: string;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  focus: SessionFocus;
  description?: string;
  tags?: string[];
  exercises: TemplateExercise[];
}

export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  rir?: number;
  restSec?: number;
  completed?: boolean;
  note?: string;
}

export interface WorkoutExerciseEntry {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  notes?: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  name: string;
  templateId?: string;
  startedAt: string;
  completedAt?: string;
  notes?: string;
  exercises: WorkoutExerciseEntry[];
}

export interface AppDataState {
  templates: WorkoutTemplate[];
  sessions: WorkoutSession[];
}

