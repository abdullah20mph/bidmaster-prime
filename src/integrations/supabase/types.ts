export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          id: string
          industry: string | null
          last_project_date: string | null
          location: string | null
          name: string
          notes: string | null
          phone: string | null
          projects_count: number | null
          rating: number | null
          status: string | null
          total_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          last_project_date?: string | null
          location?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          projects_count?: number | null
          rating?: number | null
          status?: string | null
          total_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          last_project_date?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          projects_count?: number | null
          rating?: number | null
          status?: string | null
          total_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pipeline_deals: {
        Row: {
          client_id: string | null
          created_at: string
          days_in_stage: number | null
          expected_close: string | null
          id: string
          last_activity: string | null
          notes: string | null
          probability: number | null
          stage: Database["public"]["Enums"]["deal_stage"] | null
          title: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          days_in_stage?: number | null
          expected_close?: string | null
          id?: string
          last_activity?: string | null
          notes?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["deal_stage"] | null
          title: string
          updated_at?: string
          user_id: string
          value: number
        }
        Update: {
          client_id?: string | null
          created_at?: string
          days_in_stage?: number | null
          expected_close?: string | null
          id?: string
          last_activity?: string | null
          notes?: string | null
          probability?: number | null
          stage?: Database["public"]["Enums"]["deal_stage"] | null
          title?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_deals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_proposals: number | null
          avatar_url: string | null
          completed_jobs: number | null
          created_at: string
          description: string | null
          hourly_rate: number | null
          id: string
          name: string
          rating: number | null
          response_time_hours: number | null
          skills: string[] | null
          specialization: string | null
          status: Database["public"]["Enums"]["profile_status"] | null
          total_earnings: number | null
          updated_at: string
          user_id: string
          win_rate: number | null
        }
        Insert: {
          active_proposals?: number | null
          avatar_url?: string | null
          completed_jobs?: number | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          name: string
          rating?: number | null
          response_time_hours?: number | null
          skills?: string[] | null
          specialization?: string | null
          status?: Database["public"]["Enums"]["profile_status"] | null
          total_earnings?: number | null
          updated_at?: string
          user_id: string
          win_rate?: number | null
        }
        Update: {
          active_proposals?: number | null
          avatar_url?: string | null
          completed_jobs?: number | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          name?: string
          rating?: number | null
          response_time_hours?: number | null
          skills?: string[] | null
          specialization?: string | null
          status?: Database["public"]["Enums"]["profile_status"] | null
          total_earnings?: number | null
          updated_at?: string
          user_id?: string
          win_rate?: number | null
        }
        Relationships: []
      }
      project_milestones: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          project_id: string
          title: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id: string
          title: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_hours: number | null
          budget: number | null
          client_id: string | null
          created_at: string
          description: string | null
          end_date: string | null
          estimated_hours: number | null
          id: string
          priority: Database["public"]["Enums"]["priority_level"] | null
          progress: number | null
          proposal_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          team_members: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_hours?: number | null
          budget?: number | null
          client_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          progress?: number | null
          proposal_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          team_members?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_hours?: number | null
          budget?: number | null
          client_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          progress?: number | null
          proposal_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          team_members?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          client_id: string | null
          created_at: string
          description: string | null
          id: string
          notes: string | null
          response_deadline: string | null
          skills: string[] | null
          status: Database["public"]["Enums"]["proposal_status"] | null
          submitted_at: string | null
          title: string
          updated_at: string
          user_id: string
          win_probability: number | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          client_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          notes?: string | null
          response_deadline?: string | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["proposal_status"] | null
          submitted_at?: string | null
          title: string
          updated_at?: string
          user_id: string
          win_probability?: number | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          client_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          notes?: string | null
          response_deadline?: string | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["proposal_status"] | null
          submitted_at?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          win_probability?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_transactions: {
        Row: {
          amount: number
          category: string | null
          client_id: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          project_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          category?: string | null
          client_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          project_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          client_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          project_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "revenue_transactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "revenue_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      deal_stage:
        | "prospecting"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "won"
        | "lost"
      priority_level: "low" | "medium" | "high" | "urgent"
      profile_status: "active" | "paused" | "inactive"
      project_status:
        | "planning"
        | "active"
        | "on_hold"
        | "completed"
        | "cancelled"
      proposal_status:
        | "draft"
        | "pending"
        | "active"
        | "won"
        | "lost"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      deal_stage: [
        "prospecting",
        "qualified",
        "proposal",
        "negotiation",
        "won",
        "lost",
      ],
      priority_level: ["low", "medium", "high", "urgent"],
      profile_status: ["active", "paused", "inactive"],
      project_status: [
        "planning",
        "active",
        "on_hold",
        "completed",
        "cancelled",
      ],
      proposal_status: [
        "draft",
        "pending",
        "active",
        "won",
        "lost",
        "cancelled",
      ],
    },
  },
} as const
