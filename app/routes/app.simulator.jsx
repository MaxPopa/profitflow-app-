import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack } from "@shopify/polaris";

export async function loader({ request }) {
  return json({ message: "Simulatorul funcționează perfect!" });
}

export default function Simulator() {
  const data = useLoaderData();

  return (
    <Page title="ProfitFlow Simulator">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="4">
              <Text variant="headingMd" as="h2">Simulare Financiară</Text>
              <Text as="p">Aici poți testa scenariile de profitabilitate pentru magazinul tău Shopify.</Text>
              <Text as="p" tone="subdued">{data.message}</Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
