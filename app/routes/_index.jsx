import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, Button, InlineStack } from "@shopify/polaris";
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

  return json({ planStatus: { currentPlan: shopPlan.planName, orderCount: shopPlan.orderCount } });
}

export default function Index() {
  const { planStatus } = useLoaderData();

  return (
    <Page title="Dashboard ProfitFlow">
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingXl" as="h1">
                  Bun venit în ProfitFlow!
                </Text>
                <Text tone="subdued" as="p">
                  Plan curent: <strong>{planStatus.currentPlan}</strong> | Comenzi sincronizate: <strong>{planStatus.orderCount}</strong>
                </Text>
                <InlineStack gap="300">
                  <Button url="/app/simulator">Profit Simulator</Button>
                  <Button url="/app/calendar">Profit Calendar</Button>
                  <Button url="/app/reports">Reports</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
