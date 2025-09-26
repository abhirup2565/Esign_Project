import { Button } from "@/components/ui/button"
import { FileUp, 
  PenTool, 
  CheckCircle,
  LayoutDashboard,
  PenLine,
  BarChart3,
  UserPlus,
  ShieldCheck 
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import processData from "../constants/process.json"
import featureData from "../constants/feature.json"

export default function HomePage() {
  return (
    <div className="space-y-20 p-10">
  {/* Hero */}
  <section className="text-center space-y-4">
    <h1 className="text-4xl font-bold">Streamline Contract Signing</h1>
    <p className="text-lg text-muted-foreground">
      Secure, fast, and paperless e-signatures for your company.
    </p>
    <div className="flex gap-4 justify-center">
      <a href="/login"><Button size="lg">Login</Button></a>
    </div>
  </section>

  {/* Process:How It Works */}
   <section className="space-y-8">
      {/* Section Heading */}
      <SectionHeading title={"Process"} subtext={"How our platform streamlines contract signing"}/>
      {/* Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {processData.map((item, index) => (
          <ProcessCard
            key={index}
            title={item.title}
            content={item.Content}
            icon={item.icon}
          />
        ))}
      </div>
    </section>

  {/* Features */}
  <section className="space-y-8">
      {/* Section Heading */}
      <SectionHeading title={"Features"} subtext={"Streamline contract signing with tools for managers and employees."}/>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureData.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
</div>
  )
}

// Map icon names from Process.JSON to actual components
const iconMap = {
  PenTool, 
  CheckCircle,
  LayoutDashboard,
  PenLine,
  BarChart3,
  UserPlus,
  ShieldCheck
}

function ProcessCard({ title, content, icon }) {
  const Icon = iconMap[icon] || FileUp

  return (
    <Card className="flex flex-col items-center justify-center py-6 text-center">
      <Icon className="h-10 w-10 text-primary mb-3 mx-auto" />
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{content}</CardContent>
    </Card>
  )
}

function FeatureCard({ title, icon }) {
  const Icon = iconMap[icon] || FileUp

  return (
    <Card className="flex flex-col items-center justify-center py-6 text-center">
      <Icon className="h-10 w-10 text-primary mb-3 mx-auto" />
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
    </Card>
  )
}

function SectionHeading({title,subtext})
{
  return(
    <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">
          {subtext}
        </p>
      </div>
  )
}
