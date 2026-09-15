import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, Banner, Button, InlineStack } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

// Funcția integrată de verificare automată a planului și a limitei de comenzi
async function checkShopPlanLimit(shopDomain) {
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

  if (shopPlan.planName === "Standard") {
    const ORDER_LIMIT = 1000;
    if (shopPlan.orderCount >= ORDER_LIMIT) {
      return {
        allowed: false,
        currentPlan: "Standard",
        orderCount: shopPlan.orderCount,
        reason: "Ai atins limita de 1.000 de comenzi inclusă în planul Standard ($49/lună). Treci la planul Enterprise pentru comenzi nelimitate.",
      };
    }
  }

  return {
    allowed: true,
    currentPlan: shopPlan.planName,
    orderCount: shopPlan.orderCount,
  };
}

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shopDomain = session.shop;

  // Verificarea rulează automat în fundal de fiecare dată când se încarcă pagina
  const planStatus = await checkShopPlanLimit(shopDomain);

  return json({ planStatus });
}

export default function Index() {
  const { planStatus } = useLoaderData();

  return (
    <Page title="Dashboard ProfitFlow">
      <BlockStack gap="500">
        
        {/* Bannerul de upgrade apare automat dacă magazinul a depășit limita pe Standard */}
        {!planStatus.allowed && (
          <Banner title="Limită de comenzi atinsă (Plan Standard)" tone="warning">
            <p>{planStatus.reason}</p>
            <div style={{ marginTop: "12px" }}>
              <Button variant="primary" url="/app/pricing">
                Treci la Enterprise (Nelimitat)
              </Button>
            </div>
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
                  Plan curent: <strong>{planStatus.currentPlan}</strong> | Comenzi contorizate luna aceasta: <strong>{planStatus.orderCount}</strong>
                </Text>
                <Text tone="subdued" as="p">
                  Folosește meniul de sus pentru a naviga prin Simulator, Calendar, Rapoarte și Setări.
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
