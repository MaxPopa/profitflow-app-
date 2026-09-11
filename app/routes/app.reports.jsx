import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, Button } from "@shopify/polaris";
import enTranslations from "../locales/en.json";

export async function loader() {
  return json({
    t: enTranslations.reports,
  });
}

export default function ReportsPage() {
  const { t } = useLoaderData();

  return (
    <Page title={t.title} subtitle={t.subtitle}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Export Options</Text>
              <BlockStack gap="300" inlineAlign="start">
                <Button variant="primary">{t.exportCsvButton}</Button>
                <Button>{t.exportPdfButton}</Button>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
