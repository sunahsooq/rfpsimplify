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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      company_certifications: {
        Row: {
          certificate_number: string | null
          company_profile_id: string
          created_at: string
          expiration_date: string | null
          id: string
          issue_date: string | null
          issuing_authority: string
          level: string | null
          name: string
          status: string
          type: string
          updated_at: string
          verification_url: string | null
        }
        Insert: {
          certificate_number?: string | null
          company_profile_id: string
          created_at?: string
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority: string
          level?: string | null
          name: string
          status?: string
          type: string
          updated_at?: string
          verification_url?: string | null
        }
        Update: {
          certificate_number?: string | null
          company_profile_id?: string
          created_at?: string
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string
          level?: string | null
          name?: string
          status?: string
          type?: string
          updated_at?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_certifications_company_profile_id_fkey"
            columns: ["company_profile_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_past_performance: {
        Row: {
          agency_or_client: string
          client_type: string
          company_profile_id: string
          contract_name: string
          contract_number: string | null
          contract_type: string
          contract_value_range: string
          contract_vehicle: string | null
          cpars_rating: string | null
          created_at: string
          id: string
          pop_end_date: string | null
          pop_start_date: string | null
          reference_contact: Json | null
          role: string
          scope_description: string | null
          scope_tags: string[]
          status: string
          sub_agency: string | null
          updated_at: string
          work_share_percentage: number | null
        }
        Insert: {
          agency_or_client: string
          client_type: string
          company_profile_id: string
          contract_name: string
          contract_number?: string | null
          contract_type: string
          contract_value_range: string
          contract_vehicle?: string | null
          cpars_rating?: string | null
          created_at?: string
          id?: string
          pop_end_date?: string | null
          pop_start_date?: string | null
          reference_contact?: Json | null
          role: string
          scope_description?: string | null
          scope_tags?: string[]
          status: string
          sub_agency?: string | null
          updated_at?: string
          work_share_percentage?: number | null
        }
        Update: {
          agency_or_client?: string
          client_type?: string
          company_profile_id?: string
          contract_name?: string
          contract_number?: string | null
          contract_type?: string
          contract_value_range?: string
          contract_vehicle?: string | null
          cpars_rating?: string | null
          created_at?: string
          id?: string
          pop_end_date?: string | null
          pop_start_date?: string | null
          reference_contact?: Json | null
          role?: string
          scope_description?: string | null
          scope_tags?: string[]
          status?: string
          sub_agency?: string | null
          updated_at?: string
          work_share_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_past_performance_company_profile_id_fkey"
            columns: ["company_profile_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          advanced: Json | null
          annual_revenue_range: string
          cage_code: string | null
          capabilities: Json
          created_at: string
          dba_name: string | null
          employee_count_range: string
          headquarters: Json
          id: string
          legal_name: string
          primary_naics: string
          profile_completeness: number
          sam_expiration_date: string | null
          sam_last_synced: string | null
          sam_status: string
          secondary_naics: string[]
          uei: string
          updated_at: string
          user_id: string
          website_url: string | null
          year_founded: number | null
        }
        Insert: {
          advanced?: Json | null
          annual_revenue_range?: string
          cage_code?: string | null
          capabilities?: Json
          created_at?: string
          dba_name?: string | null
          employee_count_range?: string
          headquarters?: Json
          id?: string
          legal_name: string
          primary_naics: string
          profile_completeness?: number
          sam_expiration_date?: string | null
          sam_last_synced?: string | null
          sam_status?: string
          secondary_naics?: string[]
          uei: string
          updated_at?: string
          user_id: string
          website_url?: string | null
          year_founded?: number | null
        }
        Update: {
          advanced?: Json | null
          annual_revenue_range?: string
          cage_code?: string | null
          capabilities?: Json
          created_at?: string
          dba_name?: string | null
          employee_count_range?: string
          headquarters?: Json
          id?: string
          legal_name?: string
          primary_naics?: string
          profile_completeness?: number
          sam_expiration_date?: string | null
          sam_last_synced?: string | null
          sam_status?: string
          secondary_naics?: string[]
          uei?: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
          year_founded?: number | null
        }
        Relationships: []
      }
      company_set_asides: {
        Row: {
          certification_number: string | null
          certifying_agency: string | null
          company_profile_id: string
          created_at: string
          expiration_date: string | null
          id: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          certification_number?: string | null
          certifying_agency?: string | null
          company_profile_id: string
          created_at?: string
          expiration_date?: string | null
          id?: string
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          certification_number?: string | null
          certifying_agency?: string | null
          company_profile_id?: string
          created_at?: string
          expiration_date?: string | null
          id?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_set_asides_company_profile_id_fkey"
            columns: ["company_profile_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          agency: string | null
          bid_brief: Json | null
          contract_type: string | null
          created_at: string
          due_date: string | null
          estimated_value: string | null
          evaluation_criteria: string[]
          id: string
          match_analysis: Json | null
          naics_codes: string[]
          partner_recommendations: Json | null
          place_of_performance: string | null
          raw_rfp_text: string | null
          requirements: Json | null
          scores: Json | null
          set_aside: string[]
          solicitation_id: string | null
          source: string
          status: string
          sub_agency: string | null
          summary: string[]
          title: string | null
          updated_at: string
        }
        Insert: {
          agency?: string | null
          bid_brief?: Json | null
          contract_type?: string | null
          created_at?: string
          due_date?: string | null
          estimated_value?: string | null
          evaluation_criteria?: string[]
          id?: string
          match_analysis?: Json | null
          naics_codes?: string[]
          partner_recommendations?: Json | null
          place_of_performance?: string | null
          raw_rfp_text?: string | null
          requirements?: Json | null
          scores?: Json | null
          set_aside?: string[]
          solicitation_id?: string | null
          source?: string
          status?: string
          sub_agency?: string | null
          summary?: string[]
          title?: string | null
          updated_at?: string
        }
        Update: {
          agency?: string | null
          bid_brief?: Json | null
          contract_type?: string | null
          created_at?: string
          due_date?: string | null
          estimated_value?: string | null
          evaluation_criteria?: string[]
          id?: string
          match_analysis?: Json | null
          naics_codes?: string[]
          partner_recommendations?: Json | null
          place_of_performance?: string | null
          raw_rfp_text?: string | null
          requirements?: Json | null
          scores?: Json | null
          set_aside?: string[]
          solicitation_id?: string | null
          source?: string
          status?: string
          sub_agency?: string | null
          summary?: string[]
          title?: string | null
          updated_at?: string
        }
        Relationships: []
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
    Enums: {},
  },
} as const
