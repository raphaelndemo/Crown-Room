type Props = { name: string; priceCents: number; durationMin: number };
export default function ServiceCard({ name, priceCents, durationMin }: Props) {
  return (
    <div className="border rounded p-4">
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-600">{durationMin} min</div>
      <div className="mt-2">${(priceCents / 100).toFixed(2)}</div>
    </div>
  );
} 