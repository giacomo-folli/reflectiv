// Layout server load function - authentication will be handled client-side
export const load = () => {
  return {
    user: null,
    session: null,
  };
};
