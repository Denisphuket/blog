import { useContext } from 'react';
import { SidebarContext, LOCAL_STORAGE_SIDEBAR_KEY, Sidebar } from './SidebarContext';

interface useSidebarResult {
	toggleSidebar: () => void;
	sidebar: Sidebar;
}

export function useSidebar(): useSidebarResult {
    const { sidebar, setSidebar } = useContext(SidebarContext);

    const toggleSidebar = () => {
        const newSidebar = sidebar === Sidebar.MINIMAL ? Sidebar.OPEN : Sidebar.MINIMAL;
        setSidebar(newSidebar);

        localStorage.setItem(LOCAL_STORAGE_SIDEBAR_KEY, newSidebar);
    };

    return { sidebar, toggleSidebar };
}
