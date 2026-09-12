import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack } from "@shopify/polaris";

export async function loader({ request }) {
  return json({});
}

export default function Index() {
  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingXl" as="h1">
                  ProfitFlow Dashboard
                </Text>
                <Text tone="subdued" as="p">
                  Bun venit! Toate funcțiile și uneltele tale sunt active și pregătite de utilizare.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
