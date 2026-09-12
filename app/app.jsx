import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/node" | "@remix-run/react";
import { PolarisAppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import enTranslations from "@shopify/polaris/locales/en.json";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader({ request }) {
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
}

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <PolarisAppProvider embedded apiKey={apiKey} i18n={enTranslations}>
      <NavMenu>
        <Link to="/app/app.dashboard2" rel="dashboard">Dashboard</Link>
        <Link to="/app/app.reports" rel="reports">Reports</Link>
        <Link to="/app/app.calendar" rel="calendar">Calendar</Link>
        <Link to="/app/app.simulator" rel="simulator">Simulator</Link>
        <Link to="/app/app.settings" rel="settings">Settings</Link>
      </NavMenu>
      <Outlet />
    </PolarisAppProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <PolarisAppProvider i18n={enTranslations}>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>A apărut o eroare în aplicație</h2>
        <p>{error.message || "Eroare necunoscută"}</p>
      </div>
    </PolarisAppProvider>
  );
}
