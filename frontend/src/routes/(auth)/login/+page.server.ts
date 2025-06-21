import { redirect } from "@sveltejs/kit";

export const load = ({ locals }: any) => {
  if (locals.user) {
    throw redirect(302, "/dashboard");
  }
  return {};
};
