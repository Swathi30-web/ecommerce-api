import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, SortOption } from '../types';
import { fakeStoreApi, ApiError } from '../api/fakeStoreApi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [reloadKey, setReloadKey] = useState(0);

  const searchQuery = searchParams.get('search') ?? '';
  const activeCategory = searchParams.get('category') ?? 'all';

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [productsData, categoriesData] = await Promise.all([
          fakeStoreApi.getProducts(),
          fakeStoreApi.getCategories(),
        ]);

        if (!cancelled) {
          setProducts(productsData);
          setCategories(categoriesData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : 'Failed to load products.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // Search
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim() === '') {
      params.delete('search');
    } else {
      params.set('search', value);
    }

    setSearchParams(params);
  };

  // Category
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    setSearchParams(params);
  };

  // Filter + Search + Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(
        (product) => product.category === activeCategory
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;

      case 'title-asc':
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case 'title-desc':
        result.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
    }

    return result;
  }, [
    products,
    activeCategory,
    searchQuery,
    sortOption,
  ]);

  // Loading
  if (loading) {
    return <Loader label="Loading products" />;
  }

  // Error
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

      {/* Search + Category + Sort */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* Search Products */}
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        {/* All Categories */}
        <div className="w-full sm:w-56">
          <select
            value={activeCategory}
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
            className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="w-full sm:w-52">
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as SortOption)
            }
            className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            <option value="default">Sort By</option>
            <option value="price-asc">
              Price: Low to High
            </option>
            <option value="price-desc">
              Price: High to Low
            </option>
            <option value="title-asc">
              Name: A to Z
            </option>
            <option value="title-desc">
              Name: Z to A
            </option>
          </select>
        </div>

      </div>

      {/* Result Count */}
      <div className="mb-6">
        <p className="text-sm text-ink-400">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-100 bg-white py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            No products found
          </p>

          <p className="mt-1 text-sm text-ink-400">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}