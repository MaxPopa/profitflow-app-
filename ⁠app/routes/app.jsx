import { Link, Outlet } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export default function App() {
  return (
    <AppProvider>
      <NavMenu>
        <Link to="/app" rel="home">Dashboard</Link>
        <Link to="/app/dashboard2">Advanced Analytics</Link>
        <Link to="/app/simulator">Profit Simulator</Link>
        <Link to="/app/inventory">Inventory</Link>
        <Link to="/app/settings">Settings</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}
