import { useMemo, useState, useEffect } from 'react';
import '../styles/index.css';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useUpdateFavorite, useUserFilms, useRemoveMovie } from '../api/useUserFilms';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const MyCollection = ({ userId }) => {
  const { data: movies = [], isLoading, isError } = useUserFilms(userId);

  const { mutate } = useUpdateFavorite(userId);
  const { mutate: removeMovieMutate, isPending } = useRemoveMovie(userId); 

  const { control, watch, reset } = useForm({
    defaultValues: {
      filterGenres: '',
      collection: [],
    },
  });

  const { fields, remove } = useFieldArray({ control, name: 'collection' });

  useEffect(() => {
    if (movies.length > 0) {
      reset(prev => ({
        ...prev,
        collection: movies.map(movie => ({ ...movie, favorite: movie.favorite || false })),
      }));
    }
  }, [movies, reset]);

  const genres = useMemo(
    () => Array.from(new Set(movies.map(m => m.genre).filter(Boolean))).sort(),
    [movies],
    // console.log('movies from query:', movies),
  );

  const selectedGenre = watch('filterGenre');
  const collectionData = watch('collection');

  const filtered = useMemo(() => {
    if (!selectedGenre) {
      return collectionData
    }
    
    return collectionData.filter(movie => movie.genre === selectedGenre);
  }, [collectionData, selectedGenre, fields]);

  const [sorting, setSorting] = useState([
    { id: 'rating', desc: true },
    { id: 'title', desc: true },
    { id: 'author', desc: true },
    { id: 'date', desc: true },
    { id: 'genre', desc: true },
  ]);

  const columns = useMemo(() => [
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
        const movieId = row.original._id;

        return (
          <Controller
          control={control}
          name={`collection.${index}.favorite`}
          render={({ field }) => (
            <button
              type="button"
              onClick={() => {
                const newFavoriteState = !field.value;
                mutate({ movieId: movieId, isFavorite: newFavoriteState });
                console.log('натиснули на кнопку')
              }}
            >
              {field.value ? '⭐' : '☆'}
            </button>
          )}
        />
        )
      },
    },
    {accessorKey: 'action', header: 'Delete', enableSorting: false,
      cell: ({row}) => {
        const movieId = row.original._id;

        return (
            <button
              type="button"
              onClick={() => {
                removeMovieMutate(movieId)
                console.log('натиснули на кнопку')
              }}
              disabled={isPending}
            >
              Delete
            </button>
          )}
    },
  ],[control, mutate],);

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
    <form>
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
