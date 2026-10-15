import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  // Autentifică cererea venită de la Shopify și redirecționează spre interfața aplicației
  await authenticate.admin(request);
  return redirect("/app");
};

export default function Index() {
  return null;
}
