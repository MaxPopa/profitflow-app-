import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, DataTable, Divider } from "@shopify/polaris";
import enTranslations from "../locales/en.json";

export async function loader() {
  return json({
    t: enTranslations.calendar,
    dailyData: [
      ["Sep 11, 2026", "14", "$840.00", "$150.00", "$420.00"],
      ["Sep 10, 2026", "19", "$1,120.00", "$200.00", "$580.00"],
      ["Sep 9, 2026", "8", "$480.00", "$90.00", "$210.00"],
      ["Sep 8, 2026", "12", "$720.00", "$130.00", "$360.00"],
      ["Sep 7, 2026", "22", "$1,450.00", "$250.00", "$740.00"]
    ]
  });
}

export default function CalendarPage() {
  const { t, dailyData } = useLoaderData();

  return (
    <Page title={t?.title || "Calendar"} subtitle={t?.subtitle || ""}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Recent Days Performance</Text>
              <Divider />
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'numeric']}
                headings={[
                  t?.tableDate || "Date",
                  t?.tableOrders || "Orders",
                  t?.tableRevenue || "Revenue",
                  t?.tableAds || "Ads",
                  t?.tableProfit || "Profit"
                ]}
                rows={dailyData}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
