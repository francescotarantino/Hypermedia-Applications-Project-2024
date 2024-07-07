export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      educations: {
        Row: {
          course: string
          end_date: string
          id: number
          person_id: number
          school_name: string
          start_date: string
        }
        Insert: {
          course?: string
          end_date: string
          id?: number
          person_id: number
          school_name: string
          start_date: string
        }
        Update: {
          course?: string
          end_date?: string
          id?: number
          person_id?: number
          school_name?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "educations_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          id: number
          label: string | null
          path: string
        }
        Insert: {
          id?: number
          label?: string | null
          path: string
        }
        Update: {
          id?: number
          label?: string | null
          path?: string
        }
        Relationships: []
      }
      job_experiences: {
        Row: {
          description: string | null
          end_date: string | null
          id: number
          name: string
          person_id: number
          role: string
          start_date: string
        }
        Insert: {
          description?: string | null
          end_date?: string | null
          id?: number
          name: string
          person_id: number
          role: string
          start_date: string
        }
        Update: {
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string
          person_id?: number
          role?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_experiences_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          bio: string
          birthdate: string
          city: string
          email: string
          hobbies: string[]
          id: number
          image_id: number
          languages: string[]
          main_expertise: string
          main_role: string
          name: string
          surname: string
        }
        Insert: {
          bio: string
          birthdate: string
          city: string
          email: string
          hobbies: string[]
          id?: number
          image_id: number
          languages: string[]
          main_expertise: string
          main_role: string
          name: string
          surname: string
        }
        Update: {
          bio?: string
          birthdate?: string
          city?: string
          email?: string
          hobbies?: string[]
          id?: number
          image_id?: number
          languages?: string[]
          main_expertise?: string
          main_role?: string
          name?: string
          surname?: string
        }
        Relationships: [
          {
            foreignKeyName: "people_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      project_other_image: {
        Row: {
          image_id: number
          project_id: number
        }
        Insert: {
          image_id: number
          project_id: number
        }
        Update: {
          image_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_other_image_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_other_image_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_person_involved: {
        Row: {
          person_id: number
          project_id: number
        }
        Insert: {
          person_id: number
          project_id: number
        }
        Update: {
          person_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_person_involved_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_person_involved_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          abstract: string
          description: string
          id: number
          main_image_id: number
          main_responsible_id: number
          name: string
        }
        Insert: {
          abstract: string
          description: string
          id?: number
          main_image_id: number
          main_responsible_id: number
          name: string
        }
        Update: {
          abstract?: string
          description?: string
          id?: number
          main_image_id?: number
          main_responsible_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_main_image_id_fkey"
            columns: ["main_image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_main_responsible_id_fkey"
            columns: ["main_responsible_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      service_other_image: {
        Row: {
          image_id: number
          service_id: number
        }
        Insert: {
          image_id: number
          service_id: number
        }
        Update: {
          image_id?: number
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_other_image_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_other_image_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_person_involved: {
        Row: {
          person_id: number
          service_id: number
        }
        Insert: {
          person_id: number
          service_id: number
        }
        Update: {
          person_id?: number
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_person_involved_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_person_involved_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_testimonials: {
        Row: {
          comment: string
          date: string
          id: number
          name: string
          service_id: number
        }
        Insert: {
          comment: string
          date: string
          id?: number
          name: string
          service_id: number
        }
        Update: {
          comment?: string
          date?: string
          id?: number
          name?: string
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_testimonials_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          abstract: string
          description: string
          id: number
          main_image_id: number
          main_responsible_id: number
          name: string
          service_hours: Json[] | null
          service_hours_description: string | null
        }
        Insert: {
          abstract: string
          description: string
          id?: number
          main_image_id: number
          main_responsible_id: number
          name: string
          service_hours?: Json[] | null
          service_hours_description?: string | null
        }
        Update: {
          abstract?: string
          description?: string
          id?: number
          main_image_id?: number
          main_responsible_id?: number
          name?: string
          service_hours?: Json[] | null
          service_hours_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_main_image_id_fkey"
            columns: ["main_image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_main_responsible_id_fkey"
            columns: ["main_responsible_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
      | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
      | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
      | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
      | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
