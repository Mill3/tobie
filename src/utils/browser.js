export const isBrowser = () => {
  return (typeof window !== undefined) ? true : false
}