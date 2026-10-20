import { cacheLife } from 'next/cache';
import { profile } from '@/content/profile';
import { yearsBetween } from './format';

export async function getYearsOfExperience(): Promise<number> {
  'use cache';
  cacheLife('weeks');
  return yearsBetween(new Date(profile.careerStart), new Date());
}

export interface StackOverflowStats {
  reputation: number;
  gold: number;
  silver: number;
  bronze: number;
}

export async function getStackOverflowStats(): Promise<StackOverflowStats | null> {
  'use cache';
  cacheLife('days');
  try {
    const res = await fetch(
      `https://api.stackexchange.com/2.3/users/${profile.stackOverflowUserId}?site=stackoverflow`,
      {
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      items?: { reputation: number; badge_counts: { gold: number; silver: number; bronze: number } }[];
    };
    const user = data.items?.[0];
    if (!user) return null;
    return { reputation: user.reputation, ...user.badge_counts };
  } catch {
    return null;
  }
}
