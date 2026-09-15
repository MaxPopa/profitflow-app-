import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid, Box } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shopDomain = session.shop;

  // Preluăm planul curent al magazinului din baza de date
  let shopPlan = await prisma.shopPlan.findUnique({
    where: { shop: shopDomain },
  });

  return json({ currentPlan: shopPlan ? shopPlan.planName : "Standard" });
}

export default function PricingPage() {
  const { currentPlan } = useLoaderData();

  return (
    <Page title="Planuri și Abonamente - ProfitFlow" subtitle="Alege planul potrivit pentru afacerea ta ta.">
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
              
              {/* Planul Standard */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingXl" as="h2">Standard</Text>
                  <Text variant="heading2xl" as="p">$49 <Text tone="subdued" as="span">/ lună</Text></Text>
                  <Text as="p">Ideal pentru magazine în creștere.</Text>
                  <Box paddingBlock="200">
                    <Text as="p">✓ Până la <strong>1.000 comenzi</strong> / lună</Text>
                    <Text as="p">✓ Toate rapoartele de profit</Text>
                    <Text as="p">✓ Simulator și Calendar</Text>
                  </Box>
                  {currentPlan === "Standard" ? (
                    <Button disabled fullWidth>Planul Tău Curent</Button>
                  ) : (
                    <Button fullWidth>Treci la Standard</Button>
                  )}
                </BlockStack>
              </Card>

              {/* Planul Enterprise */}
              <Card background="bg-surface-active">
                <BlockStack gap="400">
                  <Text variant="headingXl" as="h2">Enterprise</Text>
                  <Text variant="heading2xl" as="p">Custom <Text tone="subdued" as="span">/ nelimitat</Text></Text>
                  <Text as="p">Pentru magazine cu volum mare de vânzări.</Text>
                  <Box paddingBlock="200">
                    <Text as="p">✓ Comenzi <strong>nelimitate</strong></Text>
                    <Text as="p">✓ Suport prioritar</Text>
                    <Text as="p">✓ Toate funcțiile avansate deblocate</Text>
                  </Box>
                  {currentPlan === "Enterprise" ? (
                    <Button disabled fullWidth>Planul Tău Curent</Button>
                  ) : (
                    <Button variant="primary" fullWidth>Contactează / Treci la Enterprise</Button>
                  )}
                </BlockStack>
              </Card>

            </InlineGrid>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
