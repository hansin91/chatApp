declare module 'react-emoji' {
  // Add your type definitions here
  export function emojify(text: string): React.ReactNode;
  export function findEmoji(emoji: string): string | null;
  export function unemojify(text: string): string;
}