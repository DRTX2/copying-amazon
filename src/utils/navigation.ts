export const goToRoot = (navigate: (path: string) => void) => {
  navigate(import.meta.env.BASE_URL);
};