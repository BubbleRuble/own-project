import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserFilms } from '../MyDashboard/useUserFilms';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

const MyCollection = ({ userId }) => {
  const { data: movies = [], isLoading, isError } = useUserFilms(userId);

  const { register, watch } = useForm({ defaultValues: { genre: '' } });
  const selectedGenre = watch('genre');

  const genres = useMemo(
    () => Array.from(new Set(movies.map(m => m.genre).filter(Boolean))).sort(),
    [movies],
    console.log('movies from query:', movies),
  );

  const filtered = useMemo(() => {
    if (!selectedGenre) return movies;
    return movies.filter(m => m.genre === selectedGenre);
  }, [movies, selectedGenre]);

  const [sorting, setSorting] = useState([{id: 'rating', desc: true},
    {id: 'title', desc: true},
    {id: 'author', desc: true},
    {id: 'date', desc: true},
    {id: 'genre', desc: true}]);

  const columns = useMemo(
    () => [
      { accessorKey: 'title', header: 'Title', enableSorting: true },
      { accessorKey: 'author', header: 'Author', enableSorting: true },
      { accessorKey: 'genre', header: 'Genre', enableSorting: true },
      { accessorKey: 'date', header: 'Date', enableSorting: true },
      { accessorKey: 'rating', header: 'Rating', enableSorting: true },
    ],
    [],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Завантаження колекції...</div>;
  if (isError) return <div>Помилка </div>;

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <label>
          Жанр:
          <select {...register('genre')} style={{ marginLeft: 8 }}>
            <option value="">Усі жанри</option>
            {genres.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table
        className="movies-table"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    textAlign: 'left',
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <span style={{ marginLeft: 8 }}>
                    {header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : header.column.getIsSorted() === 'asc'
                        ? ' 🔽'
                        : ' 🔼' }
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
                <td
                  key={cell.id}
                  style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCollection;
