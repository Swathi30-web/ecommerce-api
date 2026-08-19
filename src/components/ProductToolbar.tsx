import { SortOption } from '../types';

interface ProductToolbarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  resultCount: number;
}

const SORT_LABELS: Record<SortOption, string> = {
  default: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'title-asc': 'Name: A to Z',
  'title-desc': 'Name: Z to A',
};

export default function ProductToolbar({
  categories,
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  resultCount,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
            activeCategory === 'all'
              ? 'bg-ink text-white'
              : 'border border-ink-100 bg-white text-ink-500 hover:border-ink-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              activeCategory === category
                ? 'bg-ink text-white'
                : 'border border-ink-100 bg-white text-ink-500 hover:border-ink-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-400">
          {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </p>
        <label className="flex items-center gap-2 text-sm text-ink-500">
          Sort by
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-full border border-ink-100 bg-white px-3 py-1.5 text-sm outline-none focus:border-amber-400"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
