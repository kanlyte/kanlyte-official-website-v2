export default function Loading() {
  return (
    <main className="min-h-screen bg-white animate-pulse">
      <div className="h-[420px] bg-slate-200" />
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-8 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-1/2 bg-slate-200 rounded" />
        <div className="space-y-3 pt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-200 rounded" style={{ width: `${85 + (i % 3) * 5}%` }} />
          ))}
        </div>
      </div>
    </main>
  );
}
