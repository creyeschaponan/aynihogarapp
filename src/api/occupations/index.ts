import { supabase } from "../../lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useOccupations = () => {
  return useQuery({
    queryKey: ["occupations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("occupations")
        .select("id,name,image,is_active")
        .eq("is_active", 1)
        .order("created_at", { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
