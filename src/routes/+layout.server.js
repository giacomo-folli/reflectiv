/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
  return {
    user: locals.user || null
  };
}