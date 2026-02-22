import React from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { AIChatPanel } from '../components/AIChatPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable';

export function Root() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#121212] overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={18} minSize={12} maxSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle className="w-px bg-slate-200 dark:bg-[#2d2d2d] hover:bg-slate-300 dark:hover:bg-[#3d3d3d] transition-colors data-[resize-handle-state=hover]:w-1 data-[resize-handle-state=drag]:w-1 data-[resize-handle-state=hover]:bg-slate-300 dark:data-[resize-handle-state=hover]:bg-[#3d3d3d] data-[resize-handle-state=drag]:bg-slate-400 dark:data-[resize-handle-state=drag]:bg-[#4d4d4d]" />
        <ResizablePanel defaultSize={64} minSize={40}>
          <main className="h-full overflow-hidden">
            <Outlet />
          </main>
        </ResizablePanel>
        <ResizableHandle className="w-px bg-slate-200 dark:bg-[#2d2d2d] hover:bg-slate-300 dark:hover:bg-[#3d3d3d] transition-colors data-[resize-handle-state=hover]:w-1 data-[resize-handle-state=drag]:w-1 data-[resize-handle-state=hover]:bg-slate-300 dark:data-[resize-handle-state=hover]:bg-[#3d3d3d] data-[resize-handle-state=drag]:bg-slate-400 dark:data-[resize-handle-state=drag]:bg-[#4d4d4d]" />
        <ResizablePanel defaultSize={18} minSize={12} maxSize={25}>
          <AIChatPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}