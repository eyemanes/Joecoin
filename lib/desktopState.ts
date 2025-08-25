import { atom } from 'jotai';

export interface WindowState {
  id: string;
  title: string;
  appType: 'internal' | 'iframe' | 'external';
  open: boolean;
  minimized: boolean;
  zIndex: number;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  url?: string;
}

export interface DesktopState {
  windows: Record<string, WindowState>;
  highestZIndex: number;
  theme: 'teal' | 'clouds' | 'wallpaper';
  startMenuOpen: boolean;
}

const initialState: DesktopState = {
  windows: {},
  highestZIndex: 1,
  theme: 'wallpaper',
  startMenuOpen: false,
};

export const desktopStateAtom = atom<DesktopState>(initialState);

export const openWindowAtom = atom(
  null,
  (get, set, { id, title, appType, url }: { id: string; title: string; appType: WindowState['appType']; url?: string }) => {
    const state = get(desktopStateAtom);
    const newZIndex = state.highestZIndex + 1;
    
    // If window already exists, just focus it
    if (state.windows[id]) {
      set(desktopStateAtom, {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            open: true,
            minimized: false,
            zIndex: newZIndex,
          },
        },
        highestZIndex: newZIndex,
      });
      return;
    }

    // Create new window
    const newWindow: WindowState = {
      id,
      title,
      appType,
      open: true,
      minimized: false,
      zIndex: newZIndex,
      bounds: {
        x: Math.min(50 + Object.keys(state.windows).length * 30, window.innerWidth > 768 ? 300 : 10),
        y: Math.min(50 + Object.keys(state.windows).length * 30, window.innerHeight > 600 ? 100 : 20),
        width: appType === 'iframe' ? Math.min(900, window.innerWidth - 40) : Math.min(600, window.innerWidth - 40),
        height: appType === 'iframe' ? Math.min(600, window.innerHeight - 80) : Math.min(400, window.innerHeight - 80),
      },
      url,
    };

    set(desktopStateAtom, {
      ...state,
      windows: {
        ...state.windows,
        [id]: newWindow,
      },
      highestZIndex: newZIndex,
    });
  }
);

export const closeWindowAtom = atom(
  null,
  (get, set, id: string) => {
    const state = get(desktopStateAtom);
    if (!state.windows[id]) {
      return;
    }
    
    // Remove the window completely from the state
    const { [id]: removed, ...remainingWindows } = state.windows;
    
    set(desktopStateAtom, {
      ...state,
      windows: remainingWindows,
    });
  }
);

export const minimizeWindowAtom = atom(
  null,
  (get, set, id: string) => {
    const state = get(desktopStateAtom);
    if (!state.windows[id]) return;
    
    set(desktopStateAtom, {
      ...state,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          minimized: !state.windows[id].minimized,
        },
      },
    });
  }
);

export const focusWindowAtom = atom(
  null,
  (get, set, id: string) => {
    const state = get(desktopStateAtom);
    if (!state.windows[id]) return;
    
    const newZIndex = state.highestZIndex + 1;
    
    set(desktopStateAtom, {
      ...state,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          zIndex: newZIndex,
          minimized: false,
        },
      },
      highestZIndex: newZIndex,
    });
  }
);

export const updateWindowBoundsAtom = atom(
  null,
  (get, set, { id, bounds }: { id: string; bounds: Partial<WindowState['bounds']> }) => {
    const state = get(desktopStateAtom);
    if (!state.windows[id]) return;
    
    set(desktopStateAtom, {
      ...state,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          bounds: {
            ...state.windows[id].bounds,
            ...bounds,
          },
        },
      },
    });
  }
);

export const setThemeAtom = atom(
  null,
  (get, set, theme: 'teal' | 'clouds' | 'wallpaper') => {
    const state = get(desktopStateAtom);
    set(desktopStateAtom, {
      ...state,
      theme,
    });
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('joe98-theme', theme);
    }
  }
);

export const toggleStartMenuAtom = atom(
  null,
  (get, set) => {
    const state = get(desktopStateAtom);
    set(desktopStateAtom, {
      ...state,
      startMenuOpen: !state.startMenuOpen,
    });
  }
);

export const closeStartMenuAtom = atom(
  null,
  (get, set) => {
    const state = get(desktopStateAtom);
    set(desktopStateAtom, {
      ...state,
      startMenuOpen: false,
    });
  }
);
