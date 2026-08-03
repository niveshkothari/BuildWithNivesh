// components/layout/navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { navigationConfig } from "@/types/nav";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <span className="text-xl font-bold tracking-tight text-primary">
            BuildWithNivesh
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationConfig.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link 
            href="/resume" 
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "ml-2"
            )}
          >
            Resume
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger 
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Menu" />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left text-primary">
                  BuildWithNivesh
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4 mt-4">
                {navigationConfig.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors py-2 px-1",
                      pathname === item.href 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <Link 
                    href="/resume" 
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "w-full flex justify-center py-5"
                    )}
                  >
                    Resume
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}