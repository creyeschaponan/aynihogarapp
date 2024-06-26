import { supabase } from '../../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useOccupations = () => {
    return useQuery({
      queryKey: ['occupations'],
      queryFn: async () => {
        const { data, error } = await supabase.from('occupations')
        .select('id,name,image,is_active')
        // .eq('is_active',1)
        .eq('deleted_at', null)
        .order('created_at', { ascending: true });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };