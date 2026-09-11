import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Page, Layout, Card, Text, BlockStack, TextField, Button, Divider } from "@shopify/polaris";
import enTranslations from "../locales/en.json";

export async function loader() {
  return json({
    t: enTranslations.settings,
  });
}

export default function SettingsPage() {
  const { t } = useLoaderData();

  const [currency, setCurrency] = useState("USD ($)");
  const [threshold, setThreshold] = useState("5");

  return (
    <Page title={t.title} subtitle={t.subtitle}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TextField
                label={t.currencyLabel}
                value={currency}
                onChange={(val) => setCurrency(val)}
                autoComplete="off"
              />
              <TextField
                label={t.thresholdLabel}
                value={threshold}
                onChange={(val) => setThreshold(val)}
                autoComplete="off"
                type="number"
              />
              <Divider />
              <Button variant="primary">{t.saveButton}</Button>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
