import { Page, Layout, Card, Text, BlockStack } from "@shopify/polaris";

export default function Index() {
  return (
    <Page title="Dashboard">
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingXl" as="h1">
                  Bun venit în ProfitFlow!
                </Text>
                <Text tone="subdued" as="p">
                  Folosește meniul de sus pentru a naviga prin Simulator, Calendar, Rapoarte și Setări.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
