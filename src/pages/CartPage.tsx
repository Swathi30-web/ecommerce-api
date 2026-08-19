import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantityStepper from '../components/QuantityStepper';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-ink-50 text-3xl">
          🛒
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-400">Browse the catalog and add something you like.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Your cart <span className="text-ink-300">({totalItems})</span>
        </h1>
        <button onClick={clearCart} className="text-sm font-medium text-ink-400 hover:text-red-500">
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ul className="flex flex-col gap-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-4 sm:flex-row sm:items-center"
            >
              <Link to={`/product/${product.id}`} className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-ink-50 p-3">
                <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
              </Link>

              <div className="min-w-0 flex-1">
                <Link to={`/product/${product.id}`} className="line-clamp-2 font-display text-sm font-semibold text-ink hover:underline">
                  {product.title}
                </Link>
                <p className="mt-1 text-sm text-ink-400">${product.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <QuantityStepper quantity={quantity} onChange={(q) => updateQuantity(product.id, q)} />
                <p className="font-display text-base font-bold text-ink">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                aria-label={`Remove ${product.title} from cart`}
                className="self-start text-ink-300 hover:text-red-500 sm:self-center"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-ink">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm text-ink-500">
            <span>Items ({totalItems})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink-500">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink-100 pt-4 font-display text-lg font-bold text-ink">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
         
          <Link to="/" className="mt-3 block text-center text-sm font-medium text-ink-400 hover:text-ink">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
