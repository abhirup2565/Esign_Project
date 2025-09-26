import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const StatusIndicator = ({ signatures }) => {
  const totalDocs = signatures.length;
  const completed = signatures.filter(sig => sig.status==="sign_complete").length;
  const incomplete = totalDocs - completed;

  return (
  <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 mb-4">
      <Card className="@container/card flex-row justify-evenly">
      <ValueCard value={totalDocs} title={"Total Documents"}></ValueCard> 
      <ValueCard value={completed} title={"Signed Documents"}></ValueCard>
      <ValueCard value={incomplete} title={"Unsigned Documents"}></ValueCard>
      </Card>
</div>
  );
};

function ValueCard({value,title}){
  return(
    <div>
        <CardHeader>
          <CardTitle className="text-2xl justify-self-center font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
             {title} 
          </div>
        </CardFooter>
      </div>
  )
}

export default StatusIndicator;