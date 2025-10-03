import { useQuery } from '@tanstack/react-query';
import { api } from '../config';

export const useUserFilms = () => {
  return useQuery({
    queryKey: ['userFilms'],
    queryFn: async () => {
      const { data } = await api.get(`/api/movies/all`);
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};