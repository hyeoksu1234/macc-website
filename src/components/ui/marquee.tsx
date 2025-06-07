'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  animationClassName?: string
  // Note: pauseOnHover, direction, and speed props are now controlled by CSS classes directly
}

export function Marquee({ children, className, animationClassName }: MarqueeProps) {
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (marqueeRef.current) {
      // Measure the width of a single block of children
      setWidth(marqueeRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div 
      className={cn(
        "w-full overflow-hidden",
        className
      )} 
      style={
        {
          '--marquee-width': `${width}px`,
        } as React.CSSProperties
      }
    >
      <div className={cn('flex w-max py-5', animationClassName)}>
        {/* This is the block we measure */}
        <div ref={marqueeRef} className="flex flex-shrink-0 items-center">
          {children}
        </div>
        {/* This is the duplicate block for seamless looping */}
        <div className="flex flex-shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
} 