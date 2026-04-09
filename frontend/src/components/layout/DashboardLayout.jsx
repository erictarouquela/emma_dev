import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PageContainer } from './PageContainer'

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      {/* Main content — margin tracks sidebar width on desktop */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300',
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-60',
        )}
      >
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <PageContainer>
          {children}
        </PageContainer>
      </div>
    </div>
  )
}
