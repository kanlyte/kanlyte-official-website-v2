export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-[500px] bg-slate-200" />
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-6">
        <div className="h-6 w-1/3 bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
