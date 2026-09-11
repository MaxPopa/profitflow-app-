import { json } from "@remix-run/node";
import { Page, Layout, Card, Text, TextField, BlockStack, InlineGrid, Divider } from "@shopify/polaris";
import { useState } from "react";

export default function ProductSimulator() {
  const [purchasePrice, setPurchasePrice] = useState("1.30");
  const [shipping, setShipping] = useState("0.50");
  const [packaging, setPackaging] = useState("0.15");
  const [ads, setAds] = useState("3.00");
  const [sellingPrice, setSellingPrice] = useState("14.99");
  const [taxRate, setTaxRate] = useState("3");

  const totalCost = parseFloat(purchasePrice || "0") + parseFloat(shipping || "0") + parseFloat(packaging || "0") + parseFloat(ads || "0");
  const grossProfit = parseFloat(sellingPrice || "0") - totalCost;
  const estimatedTax = grossProfit > 0 ? grossProfit * (parseFloat(taxRate || "0") / 100) : 0;
  const netProfitInPocket = grossProfit - estimatedTax;
  const netMargin = parseFloat(sellingPrice || "0") > 0 ? (netProfitInPocket / parseFloat(sellingPrice)) * 100 : 0;

  return (
    <Page 
      title="Product Profit Simulator" 
      subtitle="Test new products before buying stock. Calculate landed costs, ads, taxes, and real take-home profit."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h3">1. Enter Product Costs & Price</Text>
              
              <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
                <TextField label="Purchase Price (e.g., from China)" value={purchasePrice} onChange={setPurchasePrice} prefix="€" autoComplete="off" />
                <TextField label="Shipping / Transport per unit" value={shipping} onChange={setShipping} prefix="€" autoComplete="off" />
              </InlineGrid>

              <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
                <TextField label="Packaging & Labeling" value={packaging} onChange={setPackaging} prefix="€" autoComplete="off" />
                <TextField label="Estimated Ad Spend per Sale" value={ads} onChange={setAds} prefix="€" autoComplete="off" />
              </InlineGrid>

              <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
                <TextField label="Target Selling Price" value={sellingPrice} onChange={setSellingPrice} prefix="€" autoComplete="off" />
                <TextField label="State Tax / Income Tax (%)" value={taxRate} onChange={setTaxRate} autoComplete="off" />
              </InlineGrid>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card background="bg-surface-active">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h3">Simulation Results</Text>
              <Divider />
              
              <BlockStack gap="200">
                <Text tone="subdued" variant="bodyMd">Total Landed Cost + Ads</Text>
                <Text variant="headingLg" as="p">€{totalCost.toFixed(2)}</Text>
              </BlockStack>

              <BlockStack gap="200">
                <Text tone="subdued" variant="bodyMd">Estimated State Taxes</Text>
                <Text variant="headingLg" as="p">€{estimatedTax.toFixed(2)}</Text>
              </BlockStack>

              <Divider />

              <BlockStack gap="200">
                <Text tone="subdued" variant="bodyMd">Net Profit in Pocket (Take-Home)</Text>
                <Text variant="headingXl" as="h2" tone={netProfitInPocket > 0 ? "success" : "critical"}>
                  €{netProfitInPocket.toFixed(2)}
                </Text>
              </BlockStack>

              <BlockStack gap="200">
                <Text tone="subdued" variant="bodyMd">Net Profit Margin</Text>
                <Text variant="headingLg" as="p">{netMargin.toFixed(1)}%</Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
