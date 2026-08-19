import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-cardHover">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wishlisted}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-card backdrop-blur transition hover:scale-110"
      >
        <span className={wishlisted ? 'text-amber-500' : 'text-ink-200'} aria-hidden="true">
          {wishlisted ? '♥' : '♡'}
        </span>
      </button>

      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="flex h-48 items-center justify-center bg-ink-50 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-amber-600">
            {product.category}
          </span>
          <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-sm font-semibold leading-snug text-ink">
            {product.title}
          </h3>
          <StarRating rate={product.rating.rate} count={product.rating.count} />
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-display text-lg font-bold text-ink">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-ink"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
