import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../config';

export const useUserFilms = userId => {
  return useQuery({
    queryKey: ['userFilms', userId],
    queryFn: async () => {
      const { data } = await api.get(`/api/movies/all`);
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const updateFavoriteStatus = async ({ movieId, isFavorite }) => {
  try {
    const responce = await api.patch(`/api/movies/${movieId}`, {
      favorite: isFavorite,
    });

    return responce.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const useUpdateFavorite = userId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFavoriteStatus,
    onMutate: async newFavoriteData => {
      await queryClient.cancelQueries({ queryKey: ['userFilms', userId] });

      const previousMovies = queryClient.getQueriesData(
        ['userFilms', userId],
        oldMovies => {
          oldMovies.map(movie =>
            movie.id === newFavoriteData.movieId
              ? { ...movie, favorite: newFavoriteData.isFavorite }
              : movie,
          );
        },
      );
      return { previousMovies };
    },

    onError: (error, context) => {
      console.error('помилка при оновленні статусу', error);
      if (context?.previousMovies) {
        queryClient.setQueryData(['userFilms', userId], context.previousMovies);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userFilms', userId] });
    },
  });
};

export const deleteMovieRequest = async ( movieId ) => {
  try {
    const responce = await api.delete(`/api/movies/${movieId}`);
    console.log('ВИДАЛЕНО', responce);
    return responce.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const useRemoveMovie = userId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovieRequest,
    onMutate: async movieIdToDelete => {
      await queryClient.cancelQueries({ queryKey: ['userFilms', userId] });

      const previousMovies = queryClient.getQueryData(
        ['userFilms', userId] || [],
      );

      queryClient.setQueryData(['userFilms', userId], oldMovies => {
        const updated =
          oldMovies?.filter(movie => movie._id !== movieIdToDelete) || [];
        return updated;
      });
      return { previousMovies };
    },

    onError: (error, context) => {
      console.error('помилка при оновленні статусу', error);
      if (context?.previousMovies) {
        queryClient.setQueryData(['userFilms', userId], context.previousMovies);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userFilms', userId] });
    },
  });
};
