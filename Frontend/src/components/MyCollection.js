import { useMemo, useState, useEffect, use, cache } from 'react';
import '../styles/index.css';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { useUserFilms } from '../api/useUserFilms';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const MyCollection = userId => {
  const { data: movies = [], isLoading, isError } = useUserFilms(userId);

  const STORAGE_KEY = `userCollectionCache_${userId}`;

  const getFavoriteCache = () => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Помилка читання LocalStorage:', error);
      return null;
    }
  };

  const saveToCache = (movieId, isFavorite) => {
    try {
      const cache = getFavoriteCache() || {};
      const newCache = { ...cache, [movieId]: isFavorite };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCache));
    } catch (error) {
      console.error('Помилка запису LocalStorage', error);
    }
  };

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      filterGenres: '',
      collection: [],
    },
  });

  const { fields, remove } = useFieldArray({ control, name: 'collection' });

  useEffect(() => {
    if (movies.length > 0) {
      const favoriteCache = getFavoriteCache();

      const finalCollection = movies.map(movie => {
        const movieId = movie.id;

        const cachedFavoriteStatus = favoriteCache.hasOwnProperty(movieId);

        let isFavorite; 

        if (cachedFavoriteStatus) {
           isFavorite = favoriteCache[movieId] === true;
        } else {
            isFavorite = movie.favorite === true || movie.favorite === 'true'; 
        }

        return {
          ...movie,
          favorite: isFavorite,
        };
      });

      reset(prev => ({
        ...prev,
        collection: finalCollection,
      }));
    }
  }, [movies, reset, userId]);

  const selectedGenre = watch('filterGenre');
  const collectionData = watch('collection');

  const genres = useMemo(
    () => Array.from(new Set(movies.map(m => m.genre).filter(Boolean))).sort(),
    [movies],
  );

  const filtered = useMemo(() => {
    if (!selectedGenre) {
      return collectionData;
    }

    return collectionData.filter(movie => movie.genre === selectedGenre);
  }, [collectionData, selectedGenre, fields]);

  const onSubmit = data => {
  const favorites = data.collection.reduce((acc, movie) => {
    acc[movie.id] = movie.favorite;
    return acc;
  }, {});
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

  const [sorting, setSorting] = useState([
    { id: 'rating', desc: true },
    { id: 'title', desc: true },
    { id: 'author', desc: true },
    { id: 'date', desc: true },
    { id: 'genre', desc: true },
  ]);

  const columns = useMemo(
    () => [
      { accessorKey: 'title', header: 'Title', enableSorting: true },
      { accessorKey: 'author', header: 'Author', enableSorting: true },
      { accessorKey: 'genre', header: 'Genre', enableSorting: true },
      { accessorKey: 'date', header: 'Date', enableSorting: true },
      { accessorKey: 'rating', header: 'Rating', enableSorting: true },
      {
        accessorKey: 'favorite',
        header: 'Favorite',
        enableSorting: true,
        cell: ({ row }) => {
          const index = row.index;
          const movieId = row.original.id; 
          return (
            <Controller
              control={control}
              name={`collection.${index}.favorite`}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => {
                    const newFavoriteState = !field.value;
                    field.onChange(newFavoriteState); 
                    saveToCache(movieId, newFavoriteState); 
                  }}
                  title={field.value ? 'Улюблений' : 'Не улюблений'}
                >
                  {field.value ? '⭐ TRUE' : '☆ FALSE'}
                </button>
              )}
            />
          );
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <button type="button" onClick={() => remove(row.index)}>
            Delete
          </button>
        ),
      },
    ],
    [control, remove],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>завантажується...</div>;
  if (isError) return <div>помилка</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: 12 }}>
        <label>
          Жанр:
          <select
            {...control.register('filterGenre')}
            style={{ marginLeft: 8 }}
          >
            <option value="">Усі жанри</option>
            {genres.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="movies-table">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="movies-header"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <span style={{ marginLeft: 8 }}>
                    {header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : ' ↕️'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="movie-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button type="submit" style={{ marginTop: 20, padding: 10 }}>
        Зберегти зміни колекції
      </button>
    </form>
  );
};

export default MyCollection;
