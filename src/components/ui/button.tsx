import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2551AF]/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#2551AF] text-white shadow-md hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] border-2 border-transparent",
        destructive:
          "bg-[#2551AF] text-white shadow-md hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] border-2 border-transparent",
        outline:
          "border-2 border-[#2551AF] bg-transparent text-[#2551AF] hover:bg-[#2551AF] hover:text-white shadow-sm",
        secondary:
          "border-2 border-[#2551AF] bg-transparent text-[#2551AF] hover:bg-[#2551AF] hover:text-white",
        ghost: "text-[#2551AF] hover:bg-[#2551AF]/10",
        link: "text-[#2551AF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
