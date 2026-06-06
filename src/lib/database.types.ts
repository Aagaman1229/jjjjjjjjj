export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          study_streak: number
          last_study_date: string | null
          total_study_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          study_streak?: number
          last_study_date?: string | null
          total_study_time?: number
        }
        Update: {
          display_name?: string | null
          study_streak?: number
          last_study_date?: string | null
          total_study_time?: number
        }
      }
      practice_results: {
        Row: {
          id: string
          user_id: string
          question_id: string
          correct: boolean
          time_spent: number
          topic: string
          created_at: string
        }
        Insert: {
          user_id: string
          question_id: string
          correct: boolean
          time_spent: number
          topic: string
        }
        Update: Partial<{
          correct: boolean
          time_spent: number
        }>
      }
      mock_test_results: {
        Row: {
          id: string
          user_id: string
          test_id: string
          total_score: number
          scores: Json
          time_per_question: Json
          created_at: string
        }
        Insert: {
          user_id: string
          test_id: string
          total_score: number
          scores: Json
          time_per_question?: Json
        }
        Update: never
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          topics_completed: string[]
          lessons_completed: string[]
          vocab_mastered: string[]
          vocab_learning: string[]
          updated_at: string
        }
        Insert: {
          user_id: string
          topics_completed?: string[]
          lessons_completed?: string[]
          vocab_mastered?: string[]
          vocab_learning?: string[]
        }
        Update: {
          topics_completed?: string[]
          lessons_completed?: string[]
          vocab_mastered?: string[]
          vocab_learning?: string[]
        }
      }
      vocab_bookmarks: {
        Row: {
          id: string
          user_id: string
          word_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          word_id: string
        }
        Update: never
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          role: string
          content: string
          created_at: string
        }
        Insert: {
          user_id: string
          role: string
          content: string
        }
        Update: never
      }
      user_api_keys: {
        Row: {
          id: string
          user_id: string
          provider: string
          api_key: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          provider: string
          api_key: string
        }
        Update: {
          api_key?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
