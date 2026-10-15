import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  try {
    await authenticate.admin(request);
  } catch (error) {
    // Dacă autentificarea returnează o redirecționare (Response), o lăsăm să acționeze
    if (error instanceof Response) {
      throw error;
    }
  }
  return redirect("/app");
};

export default function Index() {
  return null;
}
