'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData, Timestamp } from 'firebase/firestore';

const convertTimestamps = (data: any): any => {
    if (data instanceof Timestamp) {
        return data.toDate();
    }
    if (Array.isArray(data)) {
        return data.map(convertTimestamps);
    }
    if (typeof data === 'object' && data !== null) {
        const newObj: { [key: string]: any } = {};
        for (const key in data) {
            newObj[key] = convertTimestamps(data[key]);
        }
        return newObj;
    }
    return data;
};

export function useCollection<T>(q: Query<DocumentData> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...convertTimestamps(doc.data()) } as T);
        });
        setData(data);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error("useCollection error:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, isLoading, error };
}
