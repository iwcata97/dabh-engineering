import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

type CommonButtonProps = {
  children: ReactNode
  className?: string
  icon?: LucideIcon
  variant?: ButtonVariant
  size?: ButtonSize
}

type AnchorButtonProps = CommonButtonProps &
  Omit<HTMLMotionProps<'a'>, keyof CommonButtonProps> & {
    href: string
  }

type NativeButtonProps = CommonButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof CommonButtonProps> & {
    href?: undefined
  }

type ButtonProps = AnchorButtonProps | NativeButtonProps

function isAnchorButton(props: ButtonProps): props is AnchorButtonProps {
  return props.href !== undefined
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-navy-950 shadow-glow hover:bg-primary-300 focus-visible:ring-primary-300',
  secondary:
    'border border-primary-200/70 bg-white/85 text-navy-950 shadow-soft hover:border-primary-300 hover:bg-white focus-visible:ring-primary-300',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-primary-300',
  dark: 'border border-white/15 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-primary-300',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm sm:text-base',
  lg: 'min-h-12 px-6 text-base',
}

export function Button(props: ButtonProps) {
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? {}
    : { whileHover: { y: -2 }, whileTap: { scale: 0.98 } }

  if (isAnchorButton(props)) {
    const {
      children,
      className,
      icon: Icon,
      size = 'md',
      variant = 'primary',
      ...anchorProps
    } = props

    return (
      <motion.a
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...motionProps}
        {...anchorProps}
      >
        <span>{children}</span>
        {Icon ? <Icon aria-hidden="true" className="size-4" strokeWidth={2.4} /> : null}
      </motion.a>
    )
  }

  const {
    children,
    className,
    icon: Icon,
    size = 'md',
    variant = 'primary',
    ...buttonProps
  } = props

  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...motionProps}
      {...buttonProps}
    >
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" className="size-4" strokeWidth={2.4} /> : null}
    </motion.button>
  )
}