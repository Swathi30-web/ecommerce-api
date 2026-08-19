interface StarRatingProps {
  rate: number;
  count: number;
  size?: 'sm' | 'md';
}

export default function StarRating({ rate, count, size = 'sm' }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const starSize = size === 'sm' ? 'text-sm' : 'text-lg';

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rate} out of 5 from ${count} reviews`}>
      <div className={`flex ${starSize} text-amber-400`}>
        {stars.map((star) => (
          <span key={star} aria-hidden="true">
            {star <= Math.round(rate) ? '★' : '☆'}
          </span>
        ))}
      </div>
      <span className="text-xs text-ink-400">
        {rate.toFixed(1)} ({count})
      </span>
    </div>
  );
}
