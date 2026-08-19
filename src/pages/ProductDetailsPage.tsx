import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types';
import { fakeStoreApi, ApiError } from '../api/fakeStoreApi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import StarRating from '../components/StarRating';
import QuantityStepper from '../components/QuantityStepper';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
useEffect(() => {
  if (!id) {
    setError('Product ID not found.');
    setLoading(false);
    return;
  }

  let cancelled = false;

  async function loadProduct() {
    setLoading(true);
    setError(null);
    setAdded(false);
    setQuantity(1);

    try {
      const data = await fakeStoreApi.getProduct(id!);

      if (!cancelled) {
        setProduct(data);
      }
    } catch (err) {
      if (!cancelled) {
        setError(
          err instanceof ApiError
            ? err.message
            : 'Failed to load this product.'
        );
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  loadProduct();

  return () => {
    cancelled = true;
  };
}, [id, reloadKey]);

  // Loading
  if (loading) {
    return <Loader label="Loading product" />;
  }

  // Error
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-ink">
          Product not found
        </h2>

        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-amber-500 hover:text-ink"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1 text-sm font-medium text-ink-400 transition hover:text-ink"
      >
        ← Back
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

        {/* Product Image */}
        <div className="flex h-80 items-center justify-center rounded-2xl border border-ink-100 bg-white p-10 sm:h-[420px]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col">

          {/* Category */}
          <Link
            to={`/?category=${encodeURIComponent(product.category)}`}
            className="text-xs font-medium uppercase tracking-wide text-amber-600 hover:text-amber-700"
          >
            {product.category}
          </Link>

          {/* Title */}
          <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-3">
            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
              size="md"
            />
          </div>

          {/* Price */}
          <p className="mt-6 font-display text-3xl font-bold text-ink">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="mt-4 leading-relaxed text-ink-500">
            {product.description}
          </p>

          {/* Quantity + Cart + Wishlist */}
          <div className="mt-8 flex flex-wrap items-center gap-4">

            {/* Quantity */}
            <QuantityStepper
              quantity={quantity}
              onChange={setQuantity}
            />

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-ink sm:flex-none"
            >
              Add to Cart
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              aria-pressed={wishlisted}
              aria-label={
                wishlisted
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              className={`flex h-12 w-12 items-center justify-center rounded-full border text-xl transition ${
                wishlisted
                  ? 'border-amber-400 bg-amber-50 text-amber-500'
                  : 'border-ink-100 text-ink-300 hover:border-ink-200 hover:text-amber-500'
              }`}
            >
              {wishlisted ? '♥' : '♡'}
            </button>
          </div>

          {/* Added Message */}
          {added && (
            <p
              className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
              role="status"
            >
              Added {quantity} × {product.title} to your cart.{' '}
              <Link
                to="/cart"
                className="font-semibold underline hover:no-underline"
              >
                View cart
              </Link>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}