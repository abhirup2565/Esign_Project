import { Skeleton } from "./ui/skeleton"

export const ShimmerStatusIndicator = ()=>{
    return(
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 mb-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center rounded-lg border p-4 shadow-sm"
        >
          <Skeleton className="h-8 w-16 mb-2" /> {/* number */}
          <Skeleton className="h-4 w-32" /> {/* title */}
        </div>
      ))}
    </div>
    )
}