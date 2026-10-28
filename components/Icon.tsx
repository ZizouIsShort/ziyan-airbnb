import type { CSSProperties } from "react";
import { ICONS, type IconName } from "@/lib/icons";

type IconProps = {
  name: IconName;
  className?: string;
  style?: CSSProperties;
};

export function Icon({ name, className, style }: IconProps) {
  return (
    <span
      className={className ? `icon-svg ${className}` : "icon-svg"}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}
