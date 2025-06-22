import { AuthService } from "$lib/services/auth.service";

export const load = async ({ fetch }) => {
  const service = new AuthService({ fetch })
  const res = await service.getCurrentUser()
  const data = await res.json()


  return {
    user: data.user,
    session: null,
  };
};
