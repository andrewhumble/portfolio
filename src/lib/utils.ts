import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ClassValue = string | null | undefined | boolean | ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
