import { createContext } from 'react';

export enum Sidebar {
	OPEN = 'open',
	MINIMAL = 'minimal'
}
export interface SidebarContextProps {
	sidebar?: Sidebar;
	setSidebar?: (sidebar: Sidebar) => void;
}
export const SidebarContext = createContext<SidebarContextProps>({});

export const LOCAL_STORAGE_SIDEBAR_KEY = 'sidebar';
