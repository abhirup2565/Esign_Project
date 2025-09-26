import { Home, Settings,LogIn,LogOut,LayoutDashboard,FileChartColumn, UserPlus, Upload } from "lucide-react"
import { useAppContext } from "../wrappers/AppContext";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {IconInnerShadowTop,IconUserCircle} from "@tabler/icons-react"

// Menu items.
const PublicItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  }
]
const ProtectedItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
]
const ManagerItems = [
  {
    title: "Status",
    url: "/status",
    icon: FileChartColumn,
  },
  {
    title: "Create User",
    url: "/create-user",
    icon: UserPlus,
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
  }
]
export function AppSidebar() {
    const {user} = useAppContext();
  return (
    <Sidebar>
      <SidebarHeader>
        <>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">SignFlow</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        </>
      </SidebarHeader>
      <SidebarContent>
        <Group items={PublicItems}/>
        {!user&&(<SidebarMenuButton asChild>
            <a href="/login">
                <LogIn />
                <span>Login</span>
            </a>
        </SidebarMenuButton>)}
        {user&&(<Group label="Employees"items={ProtectedItems}/>)}
        {(user&&user.is_manager)&&(<Group label="Managers" items={ManagerItems}/>)}
      </SidebarContent>
      <SidebarFooter>
        {user&&(<SidebarMenuButton asChild>
            <a href="/logout">
                <LogOut/>
                <span>Logout</span>
            </a>
        </SidebarMenuButton>)}
        {user&&(<NavUser user={{"name":user.user_username,"avatar":"https://github.com/shadcn.png"}}/>)}
      </SidebarFooter>
    </Sidebar>
  )
}

function Group({label,items}){
    return(
        <>
        <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </>
    )
}