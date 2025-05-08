"use client";

import { useEffect, useState } from "react";

export function useSolendPositions(publicKey: string | null) {
  const [positions, setPositions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) return;

    const fetchPositions = async () => {
      try {
        const url = `https://api.solend.fi/v1/user/${publicKey}?network=devnet`;
        const res = await fetch(url);
        const data = await res.json();
        setPositions(data?.obligation?.deposits ?? []);
      } catch (err) {
        console.error("Ошибка при получении позиций:", err);
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [publicKey]);

  return { positions, loading };
}