export default function Loading() {
  return (
    <main className="min-h-screen bg-white animate-pulse">
      <div className="h-[400px] bg-slate-200" />
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-8">
        <div className="h-4 w-48 bg-slate-200 rounded" />
        <div className="aspect-[16/9] bg-slate-200 rounded-2xl" />
        <div className="space-y-3 pt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-200 rounded" style={{ width: `${80 + (i % 3) * 6}%` }} />
          ))}
        </div>
      </div>
    </main>
  );
}
