interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
}

export default function QuantityStepper({ quantity, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="flex items-center rounded-full border border-ink-100 bg-white">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-50 disabled:opacity-30"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-50"
      >
        +
      </button>
    </div>
  );
}
