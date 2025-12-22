// En Next.js, la ruta base es siempre "/" a menos que uses basePath en next.config.js
export const pathRoute = "/";

export const goToRoot = (navigate: (path: string) => void) => {
  navigate(pathRoute);
};

// Logging solo en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('Environment:', process.env.NODE_ENV);
  console.log('BASE_URL:', pathRoute);
}