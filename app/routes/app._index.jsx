import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Icon,
  DataTable,
  Badge,
} from "@shopify/polaris";
import {
  MoneyIcon,
  CartIcon,
  TrendUpIcon,
} from "@shopify/polaris-icons";

export default function Index() {
  const rows = [
    ["#1001", "Ion Popescu", "150.00 MDL", "70.00 MDL", <Badge tone="success">Completat</Badge>],
    ["#1002", "Elena Radu", "320.00 MDL", "140.00 MDL", <Badge tone="success">Completat</Badge>],
    ["#1003", "Andrei Nistor", "85.00 MDL", "35.00 MDL", <Badge tone="attention">În procesare</Badge>],
  ];

  return (
    <Page title="ProfitFlow Dashboard">
      <BlockStack gap="500">
        {/* Placi KPI */}
        <InlineGrid columns={{ xs: 1, sm: 3 }} gap="400">
          <Card padding="400">
            <BlockStack gap="200">
              <InlineGrid columns="auto 1fr" gap="200">
                <Icon source={MoneyIcon} tone="base" />
                <Text variant="headingSm" as="h3" tone="subdued">
                  Venituri Totale
                </Text>
              </InlineGrid>
              <Text variant="headingLg" as="p">
                555.00 MDL
              </Text>
            </BlockStack>
          </Card>

          <Card padding="400">
            <BlockStack gap="200">
              <InlineGrid columns="auto 1fr" gap="200">
                <Icon source={CartIcon} tone="base" />
                <Text variant="headingSm" as="h3" tone="subdued">
                  Costuri Produse (COGS)
                </Text>
              </InlineGrid>
              <Text variant="headingLg" as="p">
                245.00 MDL
              </Text>
            </BlockStack>
          </Card>

          <Card padding="400">
            <BlockStack gap="200">
              <InlineGrid columns="auto 1fr" gap="200">
                <Icon source={TrendUpIcon} tone="success" />
                <Text variant="headingSm" as="h3" tone="subdued">
                  Profit Net Estimat
                </Text>
              </InlineGrid>
              <Text variant="headingLg" as="p" tone="success">
                310.00 MDL
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        {/* Tabel Comenzi Recente */}
        <Card padding="0">
          <BlockStack gap="200" padding="400">
            <Text variant="headingMd" as="h2">
              Ultimele Tranzacții
            </Text>
          </BlockStack>
          <DataTable
            columnContentTypes={["text", "text", "numeric", "numeric", "text"]}
            headings={["Comandă", "Client", "Valoare", "Cost", "Status"]}
            rows={rows}
          />
        </Card>
      </BlockStack>
    </Page>
  );
}
