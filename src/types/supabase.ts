export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      cache: {
        Row: {
          expiration: number;
          key: string;
          value: string;
        };
        Insert: {
          expiration: number;
          key: string;
          value: string;
        };
        Update: {
          expiration?: number;
          key?: string;
          value?: string;
        };
        Relationships: [];
      };
      cache_locks: {
        Row: {
          expiration: number;
          key: string;
          owner: string;
        };
        Insert: {
          expiration: number;
          key: string;
          owner: string;
        };
        Update: {
          expiration?: number;
          key?: string;
          owner?: string;
        };
        Relationships: [];
      };
      failed_jobs: {
        Row: {
          connection: string;
          exception: string;
          failed_at: string;
          id: number;
          payload: string;
          queue: string;
          uuid: string;
        };
        Insert: {
          connection: string;
          exception: string;
          failed_at?: string;
          id?: number;
          payload: string;
          queue: string;
          uuid: string;
        };
        Update: {
          connection?: string;
          exception?: string;
          failed_at?: string;
          id?: number;
          payload?: string;
          queue?: string;
          uuid?: string;
        };
        Relationships: [];
      };
      job_batches: {
        Row: {
          cancelled_at: number | null;
          created_at: number;
          failed_job_ids: string;
          failed_jobs: number;
          finished_at: number | null;
          id: string;
          name: string;
          options: string | null;
          pending_jobs: number;
          total_jobs: number;
        };
        Insert: {
          cancelled_at?: number | null;
          created_at: number;
          failed_job_ids: string;
          failed_jobs: number;
          finished_at?: number | null;
          id: string;
          name: string;
          options?: string | null;
          pending_jobs: number;
          total_jobs: number;
        };
        Update: {
          cancelled_at?: number | null;
          created_at?: number;
          failed_job_ids?: string;
          failed_jobs?: number;
          finished_at?: number | null;
          id?: string;
          name?: string;
          options?: string | null;
          pending_jobs?: number;
          total_jobs?: number;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          attempts: number;
          available_at: number;
          created_at: number;
          id: number;
          payload: string;
          queue: string;
          reserved_at: number | null;
        };
        Insert: {
          attempts: number;
          available_at: number;
          created_at: number;
          id?: number;
          payload: string;
          queue: string;
          reserved_at?: number | null;
        };
        Update: {
          attempts?: number;
          available_at?: number;
          created_at?: number;
          id?: number;
          payload?: string;
          queue?: string;
          reserved_at?: number | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          batch: number;
          id: number;
          migration: string;
        };
        Insert: {
          batch: number;
          id?: number;
          migration: string;
        };
        Update: {
          batch?: number;
          id?: number;
          migration?: string;
        };
        Relationships: [];
      };
      occupations: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          is_active: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          is_active?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          is_active?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      password_reset_tokens: {
        Row: {
          created_at: string | null;
          email: string;
          token: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          token: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          token?: string;
        };
        Relationships: [];
      };
      permission_role: {
        Row: {
          permission_id: number;
          role_id: number;
        };
        Insert: {
          permission_id: number;
          role_id: number;
        };
        Update: {
          permission_id?: number;
          role_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "permission_role_permission_id_foreign";
            columns: ["permission_id"];
            isOneToOne: false;
            referencedRelation: "permissions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "permission_role_role_id_foreign";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      permission_user: {
        Row: {
          permission_id: number;
          user_id: number;
          user_type: string;
        };
        Insert: {
          permission_id: number;
          user_id: number;
          user_type: string;
        };
        Update: {
          permission_id?: number;
          user_id?: number;
          user_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "permission_user_permission_id_foreign";
            columns: ["permission_id"];
            isOneToOne: false;
            referencedRelation: "permissions";
            referencedColumns: ["id"];
          },
        ];
      };
      permissions: {
        Row: {
          created_at: string | null;
          description: string | null;
          display_name: string | null;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          display_name?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          display_name?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      personal_access_tokens: {
        Row: {
          abilities: string | null;
          created_at: string | null;
          expires_at: string | null;
          id: number;
          last_used_at: string | null;
          name: string;
          token: string;
          tokenable_id: number;
          tokenable_type: string;
          updated_at: string | null;
        };
        Insert: {
          abilities?: string | null;
          created_at?: string | null;
          expires_at?: string | null;
          id?: number;
          last_used_at?: string | null;
          name: string;
          token: string;
          tokenable_id: number;
          tokenable_type: string;
          updated_at?: string | null;
        };
        Update: {
          abilities?: string | null;
          created_at?: string | null;
          expires_at?: string | null;
          id?: number;
          last_used_at?: string | null;
          name?: string;
          token?: string;
          tokenable_id?: number;
          tokenable_type?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profile_locations: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          is_active: number;
          location: unknown;
          profile_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          is_active?: number;
          location: unknown;
          profile_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          is_active?: number;
          location?: unknown;
          profile_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_locations_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          is_active: number | null;
          phone: string | null;
          type: number | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          is_active?: number | null;
          phone?: string | null;
          type?: number | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          is_active?: number | null;
          phone?: string | null;
          type?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      ratings: {
        Row: {
          comment: string | null;
          created_at: string;
          id: number;
          service_request_id: number;
          starts: number | null;
          updated_at: string | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          service_request_id: number;
          starts?: number | null;
          updated_at?: string | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: number;
          service_request_id?: number;
          starts?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_service_request_id_fkey";
            columns: ["service_request_id"];
            isOneToOne: false;
            referencedRelation: "services_requests";
            referencedColumns: ["id"];
          },
        ];
      };
      role_user: {
        Row: {
          role_id: number;
          user_id: number;
          user_type: string;
        };
        Insert: {
          role_id: number;
          user_id: number;
          user_type: string;
        };
        Update: {
          role_id?: number;
          user_id?: number;
          user_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "role_user_role_id_foreign";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          created_at: string | null;
          description: string | null;
          display_name: string | null;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          display_name?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          display_name?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      service_evidences: {
        Row: {
          created_at: string;
          id: number;
          service_id: number;
          updated_at: string | null;
          url_image: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          service_id: number;
          updated_at?: string | null;
          url_image: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          service_id?: number;
          updated_at?: string | null;
          url_image?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_evidences_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services_requests";
            referencedColumns: ["id"];
          },
        ];
      };
      services_offerts: {
        Row: {
          created_at: string;
          id: string;
          pricing: number;
          profile_technical_id: string;
          services_id: number | null;
          state: number;
          update_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          pricing: number;
          profile_technical_id: string;
          services_id?: number | null;
          state?: number;
          update_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          pricing?: number;
          profile_technical_id?: string;
          services_id?: number | null;
          state?: number;
          update_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_services_offerts_profile_technical_id_fkey";
            columns: ["profile_technical_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_services_offerts_services_id_fkey";
            columns: ["services_id"];
            isOneToOne: false;
            referencedRelation: "services_requests";
            referencedColumns: ["id"];
          },
        ];
      };
      services_requests: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          detail: string;
          id: number;
          location: unknown;
          occupation_id: number | null;
          profile_tecnical_id: string | null;
          profile_user_id: string;
          state: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          detail: string;
          id?: never;
          location: unknown;
          occupation_id?: number | null;
          profile_tecnical_id?: string | null;
          profile_user_id: string;
          state?: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          detail?: string;
          id?: never;
          location?: unknown;
          occupation_id?: number | null;
          profile_tecnical_id?: string | null;
          profile_user_id?: string;
          state?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "services_requests_occupation_id_fkey";
            columns: ["occupation_id"];
            isOneToOne: false;
            referencedRelation: "occupations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "services_requests_profile_id_fkey";
            columns: ["profile_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "services_requests_profile_tecnical_id_fkey";
            columns: ["profile_tecnical_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "services_requests_profile_user_id_fkey";
            columns: ["profile_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      sessions: {
        Row: {
          id: string;
          ip_address: string | null;
          last_activity: number;
          payload: string;
          user_agent: string | null;
          user_id: number | null;
        };
        Insert: {
          id: string;
          ip_address?: string | null;
          last_activity: number;
          payload: string;
          user_agent?: string | null;
          user_id?: number | null;
        };
        Update: {
          id?: string;
          ip_address?: string | null;
          last_activity?: number;
          payload?: string;
          user_agent?: string | null;
          user_id?: number | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          current_team_id: number | null;
          email: string;
          email_verified_at: string | null;
          id: number;
          name: string;
          password: string;
          profile_photo_path: string | null;
          remember_token: string | null;
          two_factor_confirmed_at: string | null;
          two_factor_recovery_codes: string | null;
          two_factor_secret: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          current_team_id?: number | null;
          email: string;
          email_verified_at?: string | null;
          id?: number;
          name: string;
          password: string;
          profile_photo_path?: string | null;
          remember_token?: string | null;
          two_factor_confirmed_at?: string | null;
          two_factor_recovery_codes?: string | null;
          two_factor_secret?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          current_team_id?: number | null;
          email?: string;
          email_verified_at?: string | null;
          id?: number;
          name?: string;
          password?: string;
          profile_photo_path?: string | null;
          remember_token?: string | null;
          two_factor_confirmed_at?: string | null;
          two_factor_recovery_codes?: string | null;
          two_factor_secret?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      insert_service_evidence: {
        Args: {
          url_image_text: string;
          service_id_bigint: number;
        };
        Returns: number;
      };
      insert_services_request:
        | {
            Args: {
              lat: number;
              lon: number;
              prof_id: string;
            };
            Returns: undefined;
          }
        | {
            Args: {
              location_lat: number;
              location_lon: number;
              profile_user_id: string;
              detail_text: string;
              occupation_id: number;
            };
            Returns: number;
          };
      nearby_profile_locations: {
        Args: {
          lat: number;
          long: number;
        };
        Returns: {
          id: number;
          lat: number;
          long: number;
          dist_meters: number;
          profile_id: string;
          is_active: number;
        }[];
      };
      profile_locations_in_view: {
        Args: {
          min_lat: number;
          min_long: number;
          max_lat: number;
          max_long: number;
        };
        Returns: {
          id: number;
          lat: number;
          long: number;
          profile_id: string;
          is_active: number;
        }[];
      };
      profile_locations_within_radius: {
        Args: {
          center_lat: number;
          center_long: number;
          radius_km: number;
        };
        Returns: {
          id: number;
          lat: number;
          long: number;
          profile_id: string;
          is_active: number;
        }[];
      };
      profile_locations_within_radius_meters: {
        Args: {
          center_lat: number;
          center_long: number;
          radius_meters: number;
        };
        Returns: {
          id: number;
          lat: number;
          long: number;
          profile_id: string;
          is_active: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
            columns: ["upload_id"];
            isOneToOne: false;
            referencedRelation: "s3_multipart_uploads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      operation: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
