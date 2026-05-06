"use client";

import { useEffect } from "react";
import { trackGA } from "@/app/lib/analytics";

type Props = {
  event: string;
  params?: Record<string, unknown>;
};

export function TrackPageView({ event, params }: Props) {
  useEffect(() => {
    trackGA(event, params);
  }, [event, params]);

  return null;
}
