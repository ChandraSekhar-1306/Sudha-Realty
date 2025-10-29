// "use client"

// import * as React from "react"
// import * as SliderPrimitive from "@radix-ui/react-slider"

// import { cn } from "@/lib/utils"

// function Slider({
//   className,
//   defaultValue,
//   value,
//   min = 0,
//   max = 100,
//   ...props
// }: React.ComponentProps<typeof SliderPrimitive.Root>) {
//   const _values = React.useMemo(
//     () =>
//       Array.isArray(value)
//         ? value
//         : Array.isArray(defaultValue)
//           ? defaultValue
//           : [min, max],
//     [value, defaultValue, min, max]
//   )

//   return (
//     <SliderPrimitive.Root
//       data-slot="slider"
//       defaultValue={defaultValue}
//       value={value}
//       min={min}
//       max={max}
//       className={cn(
//         "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
//         className
//       )}
//       {...props}
//     >
//       <SliderPrimitive.Track
//         data-slot="slider-track"
//         className={cn(
//           "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
//         )}
//       >
//         <SliderPrimitive.Range
//           data-slot="slider-range"
//           className={cn(
//             "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
//           )}
//         />
//       </SliderPrimitive.Track>
//       {Array.from({ length: _values.length }, (_, index) => (
//         <SliderPrimitive.Thumb
//           data-slot="slider-thumb"
//           key={index}
//           className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
//         />
//       ))}
//     </SliderPrimitive.Root>
//   )
// }

// export { Slider }


"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range 
        className="absolute h-full" 
        style={{
          background: 'linear-gradient(to right, #2563eb, #4f46e5)'
        }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className="block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" 
      style={{
        borderColor: '#2563eb'
      }}
    />
     {/* Add a second thumb for range sliders */}
     {(props.value && props.value.length > 1) && (
      <SliderPrimitive.Thumb 
        className="block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" 
        style={{
          borderColor: '#4f46e5'
        }}
      />
     )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }