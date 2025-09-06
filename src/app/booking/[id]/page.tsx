type Props = { params: { id: string } };
export default function BookingDetailPage({ params }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Booking: {params.id}</h1>
      {/* TODO: Show booking status and actions */}
    </main>
  );
} 