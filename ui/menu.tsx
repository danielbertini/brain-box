"use client";

import { Menu, MenuTrigger, Popover } from "react-aria-components";
import UICard from "./card";

interface UIMenuProps {
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

export default function UIMenu({ trigger, children }: UIMenuProps) {
  return (
    <MenuTrigger>
      {trigger}
      <Popover
        className={({ isEntering, isExiting }) => `
          min-w-[240px] z-50
          ${isEntering ? "animate-in fade-in ease-in-out duration-200" : ""}
          ${isExiting ? "animate-out fade-out ease-in-out duration-200" : ""}
        `}>
        <UICard shadow="lg">
          <Menu className="border-none ring-none outline-none">{children}</Menu>
        </UICard>
      </Popover>
    </MenuTrigger>
  );
}
