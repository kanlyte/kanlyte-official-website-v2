export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-[360px] bg-slate-200" />
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-6">
        <div className="h-8 w-1/2 bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="grid grid-cols-2 gap-4 pt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
