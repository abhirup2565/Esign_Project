import { Skeleton } from "./ui/skeleton"

export const ShimmerDataTable = ()=>{
    return(
        <div className="w-full px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="p-3 text-left">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex} className="p-3">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}