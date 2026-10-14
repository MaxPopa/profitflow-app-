import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, Button, InlineStack, Banner } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shopDomain = session.shop;

  let shopPlan = await prisma.shopPlan.findUnique({
    where: { shop: shopDomain },
  });

  if (!shopPlan) {
    shopPlan = await prisma.shopPlan.create({
      data: {
        shop: shopDomain,
        planName: "Standard",
        orderCount: 0,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  return json({ 
    planStatus: { 
      currentPlan: shopPlan.planName, 
      orderCount: shopPlan.orderCount 
    } 
  });
}

export default function Index() {
  const { planStatus } = useLoaderData();
  const fetcher = useFetcher();

  const handleSync = () => {
    fetcher.submit(null, { method: "post", action: "/app/sync" });
  };

  const isSyncing = fetcher.state === "submitting";
  const syncData = fetcher.data;

  return (
    <Page title="Dashboard ProfitFlow">
      <BlockStack gap="500">
        
        {syncData?.success && (
          <Banner title="Sincronizare reușită!" tone="success">
            <p>Au fost preluate ultimele comenzi din Shopify cu succes.</p>
          </Banner>
        )}

        {syncData?.success === false && (
          <Banner title="Eroare la sincronizare" tone="critical">
            <p>{syncData.error}</p>
          </Banner>
        )}

        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingXl" as="h1">
                  Bun venit în ProfitFlow!
                </Text>
                <Text tone="subdued" as="p">
                  Plan curent: <strong>{planStatus.currentPlan}</strong> | Comenzi sincronizate luna aceasta: <strong>{planStatus.orderCount}</strong>
                </Text>
                
                <InlineStack gap="300">
                  <Button 
                    variant="primary" 
                    loading={isSyncing} 
                    onClick={handleSync}
                  >
                    Sync Orders
                  </Button>
                  <Button url="/app/simulator">Profit Simulator</Button>
                  <Button url="/app/calendar">Profit Calendar</Button>
                  <Button url="/app/reports">Reports</Button>
                  <Button url="/app/pricing">Schimbă Planul</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
