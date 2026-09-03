"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  type AnalyticsEventMap,
  type AnalyticsEventName,
} from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";

type AnchorProps<E extends AnalyticsEventName> =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    event: E;
    properties: AnalyticsEventMap[E];
    children?: ReactNode;
  };

/**
 * Anchor that fires a shared analytics event on click without blocking navigation.
 * @param {AnchorProps} props Anchor and event payload.
 * @return {JSX.Element} Tracked anchor.
 */
export default function Anchor<E extends AnalyticsEventName>({
  event,
  properties,
  onClick,
  children,
  ...props
}: AnchorProps<E>) {
  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, properties);
    onClick?.(clickEvent);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
