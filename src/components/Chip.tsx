interface ChipProps {
  label: string;
  className?: string;
}

export default function Chip({ label, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-block px-4 py-2 text-sm font-medium text-white/80 border border-white/30 rounded-[20px] ${className}`}
    >
      {label}
    </span>
  );
}
