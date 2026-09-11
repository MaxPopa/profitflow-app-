import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, DataTable, BlockStack, InlineGrid } from "@shopify/polaris";

export async function loader({ request }) {
  // Date simulate pentru stocuri și valoarea capitalului blocat în marfă
  const inventorySummary = {
    totalProducts: "142 SKUs",
    totalUnits: "3,850 units",
    inventoryValue: "€14,250.00",
    potentialRevenue: "€42,800.00",
  };

  const inventoryRows = [
    ["Wireless Earbuds Pro", "SKU-WE-01", "145 units", "€4.50", "€652.50", "In Stock"],
    ["Smart Fitness Watch", "SKU-SFW-02", "82 units", "€12.00", "€984.00", "In Stock"],
    ["Magnetic Phone Mount", "SKU-MPM-03", "12 units", "€1.30", "€15.60", "Low Stock"],
    ["LED Ring Light 10\"", "SKU-LRL-04", "230 units", "€8.50", "€1,955.00", "In Stock"],
    ["Portable Blender Bottle", "SKU-PBB-05", "0 units", "€3.80", "€0.00", "Out of Stock"],
  ];

  return json({ inventorySummary, inventoryRows });
}

export default function ProfitInventory() {
  const { inventorySummary, inventoryRows } = useLoaderData<typeof loader>();

  return (
    <Page 
      title="Inventory & Stock Valuation" 
      subtitle="Monitor your tied-up capital, unit costs, and stock levels across your catalog."
    >
      <BlockStack gap="500">
        <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
          <Card>
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Total Products (SKUs)</Text>
              <Text variant="headingXl" as="h2">{inventorySummary.totalProducts}</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Total Physical Units</Text>
              <Text variant="headingXl" as="h2">{inventorySummary.totalUnits}</Text>
            </BlockStack>
          </Card>
          <Card background="bg-surface-active">
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Tied-Up Capital (Cost)</Text>
              <Text variant="headingXl" as="h2">{inventorySummary.inventoryValue}</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text tone="subdued" variant="bodyMd">Potential Retail Value</Text>
              <Text variant="headingXl" as="h2" tone="success">{inventorySummary.potentialRevenue}</Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h3">Product Stock Breakdown</Text>
                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'numeric', 'numeric', 'text']}
                  headings={['Product Name', 'SKU', 'Available Stock', 'Unit Cost', 'Total Value', 'Status']}
                  rows={inventoryRows}
                />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
