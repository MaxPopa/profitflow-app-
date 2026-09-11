import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, TextField, Button, BlockStack } from "@shopify/polaris";
import { useState } from "react";

export async function loader({ request }) {
  const settings = {
    taxRate: "3.0",
    fixedMonthlyRent: "450.00",
    defaultAdBudget: "1200.00",
  };
  return json({ settings });
}

export default function ProfitFlowSettings() {
  const { settings } = useLoaderData<typeof loader>();
  
  const [taxRate, setTaxRate] = useState(settings.taxRate);
  const [rent, setRent] = useState(settings.fixedMonthlyRent);
  const [ads, setAds] = useState(settings.defaultAdBudget);

  const handleSubmit = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Page 
      title="ProfitFlow Settings" 
      subtitle="Configure your tax rates, fixed expenses, and store preferences."
    >
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h3">Tax & State Levies</Text>
            <Text tone="subdued" variant="bodyMd">
              Enter your income tax or corporate tax percentage. ProfitFlow will automatically deduct this from your net profit to show your real take-home pay.
            </Text>
            <TextField
              label="Tax Rate (%)"
              value={taxRate}
              onChange={setTaxRate}
              autoComplete="off"
              helpText="Example: 3 for 3% micro-enterprise tax, or your standard national rate."
            />
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h3">Fixed Monthly Expenses (Overhead)</Text>
            <Text tone="subdued" variant="bodyMd">
              Enter recurring monthly costs like warehouse rent or office lease that automatically spread across your daily calculations.
            </Text>
            <TextField
              label="Fixed Monthly Rent / Overhead"
              value={rent}
              onChange={setRent}
              prefix="€"
              autoComplete="off"
            />
            <TextField
              label="Default Monthly Ad Spend Budget"
              value={ads}
              onChange={setAds}
              prefix="€"
              autoComplete="off"
            />
          </BlockStack>
        </Card>

        <div>
          <Button variant="primary" onClick={handleSubmit}>Save Settings</Button>
        </div>
      </BlockStack>
    </Page>
  );
}
