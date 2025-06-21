export const pathRoute=import.meta.env.BASE_URL;

export const goToRoot = (navigate: (path: string) => void) => {
  navigate(pathRoute);
};