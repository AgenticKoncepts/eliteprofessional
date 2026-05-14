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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          name_ar: string | null
          parent_slug: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          name_ar?: string | null
          parent_slug?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          name_ar?: string | null
          parent_slug?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      category_mappings: {
        Row: {
          canonical_name: string
          canonical_slug: string
          created_at: string
          id: string
          raw_category: string
          updated_at: string
        }
        Insert: {
          canonical_name: string
          canonical_slug: string
          created_at?: string
          id?: string
          raw_category: string
          updated_at?: string
        }
        Update: {
          canonical_name?: string
          canonical_slug?: string
          created_at?: string
          id?: string
          raw_category?: string
          updated_at?: string
        }
        Relationships: []
      }
      import_audit: {
        Row: {
          created_at: string
          error: string | null
          id: string
          job_id: string | null
          scraped: Json | null
          slug: string | null
          source_url: string | null
          status: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          job_id?: string | null
          scraped?: Json | null
          slug?: string | null
          source_url?: string | null
          status: string
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          job_id?: string | null
          scraped?: Json | null
          slug?: string | null
          source_url?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_audit_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "import_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      import_jobs: {
        Row: {
          completed: number
          created_at: string
          failed: number
          finished_at: string | null
          firecrawl_job_id: string | null
          id: string
          kind: string
          meta: Json
          notes: string | null
          source_url: string | null
          started_at: string
          status: string
          succeeded: number
          total: number
          updated_at: string
        }
        Insert: {
          completed?: number
          created_at?: string
          failed?: number
          finished_at?: string | null
          firecrawl_job_id?: string | null
          id?: string
          kind?: string
          meta?: Json
          notes?: string | null
          source_url?: string | null
          started_at?: string
          status?: string
          succeeded?: number
          total?: number
          updated_at?: string
        }
        Update: {
          completed?: number
          created_at?: string
          failed?: number
          finished_at?: string | null
          firecrawl_job_id?: string | null
          id?: string
          kind?: string
          meta?: Json
          notes?: string | null
          source_url?: string | null
          started_at?: string
          status?: string
          succeeded?: number
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          items: Json
          order_number: string
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_notes: string | null
          status: string
          subtotal_aed: number
          total_aed: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          items: Json
          order_number?: string
          shipping_address: string
          shipping_city: string
          shipping_country?: string
          shipping_notes?: string | null
          status?: string
          subtotal_aed: number
          total_aed: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          items?: Json
          order_number?: string
          shipping_address?: string
          shipping_city?: string
          shipping_country?: string
          shipping_notes?: string | null
          status?: string
          subtotal_aed?: number
          total_aed?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_verifications: {
        Row: {
          checked_at: string
          diff: Json | null
          error: string | null
          id: string
          images_match: boolean | null
          name_match: boolean | null
          ok: boolean
          price_match: boolean | null
          product_slug: string
          scraped: Json | null
          source_url: string | null
          variants_match: boolean | null
        }
        Insert: {
          checked_at?: string
          diff?: Json | null
          error?: string | null
          id?: string
          images_match?: boolean | null
          name_match?: boolean | null
          ok?: boolean
          price_match?: boolean | null
          product_slug: string
          scraped?: Json | null
          source_url?: string | null
          variants_match?: boolean | null
        }
        Update: {
          checked_at?: string
          diff?: Json | null
          error?: string | null
          id?: string
          images_match?: boolean | null
          name_match?: boolean | null
          ok?: boolean
          price_match?: boolean | null
          product_slug?: string
          scraped?: Json | null
          source_url?: string | null
          variants_match?: boolean | null
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string | null
          category: string | null
          created_at: string
          description: string | null
          description_ar: string | null
          id: string
          images: Json
          in_stock: boolean
          is_featured: boolean
          is_published: boolean
          name: string
          name_ar: string | null
          price_aed: number
          price_max_aed: number | null
          primary_image: string | null
          short_description: string | null
          sku: string | null
          slug: string
          sort_order: number
          source_price_usd: number | null
          source_url: string | null
          stock: number
          updated_at: string
          variants: Json
        }
        Insert: {
          brand?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          images?: Json
          in_stock?: boolean
          is_featured?: boolean
          is_published?: boolean
          name: string
          name_ar?: string | null
          price_aed?: number
          price_max_aed?: number | null
          primary_image?: string | null
          short_description?: string | null
          sku?: string | null
          slug: string
          sort_order?: number
          source_price_usd?: number | null
          source_url?: string | null
          stock?: number
          updated_at?: string
          variants?: Json
        }
        Update: {
          brand?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          images?: Json
          in_stock?: boolean
          is_featured?: boolean
          is_published?: boolean
          name?: string
          name_ar?: string | null
          price_aed?: number
          price_max_aed?: number | null
          primary_image?: string | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          sort_order?: number
          source_price_usd?: number | null
          source_url?: string | null
          stock?: number
          updated_at?: string
          variants?: Json
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
