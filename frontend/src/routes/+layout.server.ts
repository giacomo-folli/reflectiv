import { AuthService } from "$lib/services/auth.service";
import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, cookies, url }) => {
  const service = new AuthService({ fetch, cookies })

  let fetchedUser
  if (url.pathname != '/login') {
    try {
      fetchedUser = await service.me()
    } catch (error) {
      await service.deleteTokenCookie()
      throw redirect(302, '/login')
    }
  }


  return {
    user: fetchedUser,
    token: cookies.get('session')
  };
};
