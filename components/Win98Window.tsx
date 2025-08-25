'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Rnd } from 'react-rnd';
import {
  desktopStateAtom,
  closeWindowAtom,
  minimizeWindowAtom,
  focusWindowAtom,
  updateWindowBoundsAtom,
  WindowState,
} from '@/lib/desktopState';
import clsx from 'clsx';

interface Win98WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Win98Window({ id, title, children, onClose }: Win98WindowProps) {
  const [desktopState] = useAtom(desktopStateAtom);
  const [, closeWindow] = useAtom(closeWindowAtom);
  const [, minimizeWindow] = useAtom(minimizeWindowAtom);
  const [, focusWindow] = useAtom(focusWindowAtom);
  const [, updateWindowBounds] = useAtom(updateWindowBoundsAtom);
  const [isDragging, setIsDragging] = useState(false);

  const windowState = desktopState.windows[id];

  // If window state doesn't exist or window is not open, don't render
  if (!windowState || !windowState.open) return null;

  const handleClose = () => {
    closeWindow(id);
    if (onClose) {
      onClose();
    }
  };

  const handleMinimize = () => {
    minimizeWindow(id);
  };

  const handleControlClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const handleFocus = () => {
    if (windowState.zIndex !== desktopState.highestZIndex) {
      focusWindow(id);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    handleFocus();
  };

  const handleDragStop = (e: any, data: any) => {
    setIsDragging(false);
    updateWindowBounds({
      id,
      bounds: { x: data.x, y: data.y }
    });
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    updateWindowBounds({
      id,
      bounds: {
        x: position.x,
        y: position.y,
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      }
    });
  };

  return (
    <Rnd
      size={{
        width: windowState.bounds.width,
        height: windowState.bounds.height,
      }}
      position={{
        x: windowState.bounds.x,
        y: windowState.bounds.y,
      }}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="title-bar"
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        className={clsx('window', {
          minimized: windowState.minimized,
          dragging: isDragging,
        })}
        style={{ zIndex: windowState.zIndex }}
        onMouseDown={handleFocus}
      >
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button
              className="title-bar-control"
              type="button"
              onClick={(e) => handleControlClick(e, handleMinimize)}
              aria-label="Minimize"
            >
              <span aria-hidden="true">−</span>
            </button>
            <button
              className="title-bar-control"
              type="button"
              onMouseUp={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div className="window-body window-content">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
