import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Page, Layout, Card, Text, BlockStack, TextField, Divider } from "@shopify/polaris";
import enTranslations from "../locales/en.json";

export async function loader() {
  return json({
    t: enTranslations.simulator,
  });
}

export default function ProductSimulator() {
  const { t } = useLoaderData();

  const [price, setPrice] = useState("49.99");
  const [cost, setCost] = useState("12.00");
  const [shipping, setShipping] = useState("5.00");
  const [ads, setAds] = useState("10.00");
  
  const numericPrice = parseFloat(price) || 0;
  const numericCost = parseFloat(cost) || 0;
  const numericShipping = parseFloat(shipping) || 0;
  const numericAds = parseFloat(ads) || 0;

  const netProfit = (numericPrice - (numericCost + numericShipping + numericAds)).toFixed(2);
  const margin = numericPrice > 0 ? ((netProfit / numericPrice) * 100).toFixed(1) : 0;

  return (
    <Page title={t.title} subtitle={t.subtitle}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TextField
                label={t.productPrice}
                value={price}
                onChange={(val) => setPrice(val)}
                autoComplete="off"
                type="number"
              />
              <TextField
                label={t.productCost}
                value={cost}
                onChange={(val) => setCost(val)}
                autoComplete="off"
                type="number"
              />
              <TextField
                label={t.shippingCost}
                value={shipping}
                onChange={(val) => setShipping(val)}
                autoComplete="off"
                type="number"
              />
              <TextField
                label={t.adSpend}
                value={ads}
                onChange={(val) => setAds(val)}
                autoComplete="off"
                type="number"
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">{t.resultsTitle}</Text>
              <Divider />
              <BlockStack gap="200">
                <Text variant="bodyMd" tone="subdued">{t.netProfit}</Text>
                <Text variant="headingXl" as="p">${netProfit}</Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text variant="bodyMd" tone="subdued">{t.margin}</Text>
                <Text variant="headingLg" as="p">{margin}%</Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
