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
      blog_posts: {
        Row: {
          author_name: string | null
          body: string
          body_ar: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          excerpt_ar: string | null
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          title_ar: string | null
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          body: string
          body_ar?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_ar?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          title_ar?: string | null
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          body?: string
          body_ar?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_ar?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          title_ar?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          qty: number
          user_id: string
          variant: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          qty: number
          user_id: string
          variant?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          qty?: number
          user_id?: string
          variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          updated_at: string
          user_id: string
        }
        Insert: {
          updated_at?: string
          user_id: string
        }
        Update: {
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
      customer_addresses: {
        Row: {
          address_line: string
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          phone: string
          recipient_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address_line: string
          city: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          phone: string
          recipient_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address_line?: string
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          phone?: string
          recipient_name?: string
          updated_at?: string
          user_id?: string
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
          paid_at: string | null
          payment_method: string
          payment_status: string
          shipping_address: string
          shipping_city: string
          shipping_country: string
          shipping_fee_aed: number
          shipping_notes: string | null
          status: string
          stripe_session_id: string | null
          subtotal_aed: number
          total_aed: number
          updated_at: string
          user_id: string | null
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
          paid_at?: string | null
          payment_method?: string
          payment_status?: string
          shipping_address: string
          shipping_city: string
          shipping_country?: string
          shipping_fee_aed?: number
          shipping_notes?: string | null
          status?: string
          stripe_session_id?: string | null
          subtotal_aed: number
          total_aed: number
          updated_at?: string
          user_id?: string | null
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
          paid_at?: string | null
          payment_method?: string
          payment_status?: string
          shipping_address?: string
          shipping_city?: string
          shipping_country?: string
          shipping_fee_aed?: number
          shipping_notes?: string | null
          status?: string
          stripe_session_id?: string | null
          subtotal_aed?: number
          total_aed?: number
          updated_at?: string
          user_id?: string | null
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
          brand_slug: string | null
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
          product_subtype: string | null
          product_type: string | null
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
          brand_slug?: string | null
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
          product_subtype?: string | null
          product_type?: string | null
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
          brand_slug?: string | null
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
          product_subtype?: string | null
          product_type?: string | null
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
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          marketing_opt_in: boolean
          phone: string | null
          preferred_language: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          marketing_opt_in?: boolean
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          marketing_opt_in?: boolean
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          body: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          status: string
          title: string | null
          updated_at: string
          user_id: string
          verified_purchase: boolean
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          status?: string
          title?: string | null
          updated_at?: string
          user_id: string
          verified_purchase?: boolean
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string
          verified_purchase?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
