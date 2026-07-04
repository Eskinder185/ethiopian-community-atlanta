import { Link } from "react-router-dom";

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  accent: "btn btn-accent",
  ghost: "btn btn-ghost",
};

const sizes = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isExternal(href) {
  return (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"))
  );
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  to,
  type = "button",
  ...props
}) {
  const classes = joinClasses(variants[variant], sizes[size], className);
  const external = href && isExternal(href);
  const externalProps = external
    ? {
        target: props.target ?? "_blank",
        rel: props.rel ?? "noopener noreferrer",
        "aria-label":
          props["aria-label"] ??
          (typeof children === "string" ? `${children} (opens in a new tab)` : undefined),
      }
    : {};

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
