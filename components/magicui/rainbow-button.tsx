import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "lg" | "sm" | "md";
  variant?: "outline" | "default";
  className?: string;
}

export const Button = ({
  children,
  size,
  variant,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
      ${size === "lg" ? "h-12 px-8 py-3" : "h-10 px-4 py-2"}
      ${
        variant === "outline"
          ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }
      ${className || ""}`}
    {...props}
  >
    {children}
  </button>
);

interface RainbowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  link?: string;
}

export const RainbowButton = ({
  children,
  className,
  link,
  ...props
}: RainbowButtonProps) =>
  link ? (
    <Link href={link} className="inline-block">
      <button
        className={`relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 h-12 px-8 py-3 text-white 
          bg-gradient-to-r from-[#6EBE45] via-[#8ED36D] to-[#6EBE45] bg-[length:200%_100%] 
          hover:bg-[position:100%_0] hover:shadow-lg hover:shadow-[#6EBE45]/25
          animate-[rainbow_3s_ease-in-out_infinite] cursor-pointer ${
            className || ""
          }`}
        style={
          {
            "--color-1": "#6EBE45",
            "--color-2": "#8ED36D",
            "--color-3": "#A5E68A",
            "--color-4": "#5AB22E",
            "--color-5": "#4A9E2E",
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      className={`relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 h-12 px-8 py-3 text-white 
        bg-gradient-to-r from-[#6EBE45] via-[#8ED36D] to-[#6EBE45] bg-[length:200%_100%] 
        hover:bg-[position:100%_0] hover:shadow-lg hover:shadow-[#6EBE45]/25
        animate-[rainbow_3s_ease-in-out_infinite] cursor-pointer ${
          className || ""
        }`}
      style={
        {
          "--color-1": "#6EBE45",
          "--color-2": "#8ED36D",
          "--color-3": "#A5E68A",
          "--color-4": "#5AB22E",
          "--color-5": "#4A9E2E",
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </button>
  );
