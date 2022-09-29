import React, { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_SIDEBAR_KEY, Sidebar, SidebarContext } from '../lib/SidebarContext';

const defaultSidebar = localStorage.getItem(LOCAL_STORAGE_SIDEBAR_KEY) as Sidebar || Sidebar.OPEN;

const SidebarProvider: FC = ({ children }) => {
    const [sidebar, setSidebar] = useState<Sidebar>(defaultSidebar);

    const defaultProps = useMemo(() => ({
        sidebar,
        setSidebar,
    }), [sidebar]);
    return (
        <SidebarContext.Provider value={defaultProps}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
