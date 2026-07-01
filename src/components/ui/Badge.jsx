const variants = {
  green: 'ecaa-badge-green',
  gold: 'ecaa-badge-gold',
  red: 'ecaa-badge-red',
  neutral: 'ecaa-badge-neutral',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`${variants[variant]} ${className}`.trim()}>
      {children}
    </span>
  )
}
