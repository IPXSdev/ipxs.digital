import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { isManagerAuthenticated } from '@/lib/manager-auth'

async function LogoutButton() {
  return (
    <form action="/api/manager/logout" method="post">
      <Button type="submit" variant="outline" size="sm">
        Logout
      </Button>
    </form>
  )
}

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  if (!(await isManagerAuthenticated())) {
    redirect('/manager/login')
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-5">
            <p className="font-serif text-xl">Manager Console</p>
            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/manager" className="hover:text-foreground">Overview</Link>
              <Link href="/manager/messages" className="hover:text-foreground">Messages</Link>
              <Link href="/manager/transmission" className="hover:text-foreground">Transmission List</Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">{children}</main>
    </div>
  )
}
