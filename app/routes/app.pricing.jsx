import { json } from "@remix-run/node";
import { Page, Layout, Card, Text, BlockStack, Button, InlineGrid, Badge } from "@shopify/polaris";

export default function PricingPage() {
  return (
    <Page title="Planuri și Prețuri" subtitle="Alege opțiunea potrivită pentru creșterea magazinului tău Shopify.">
      <Layout>
        <Layout.Section>
          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            
            {/* Planul 1: Standard (Growth) */}
            <Card>
              <BlockStack gap="400">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text variant="headingMd" as="h3">Standard (Growth)</Text>
                  <Badge tone="info">Cel mai popular</Badge>
                </div>
                
                <Text variant="heading2xl" as="p">$49 <Text variant="bodySm" as="span">/ lună</Text></Text>
                
                <Text tone="subdued" as="p">Perfect pentru magazine active în plină dezvoltare.</Text>
                
                <BlockStack gap="200">
                  <Text as="p">✅ Până la 1.000 comenzi / lună</Text>
                  <Text as="p">✅ Analiză profit net în timp real</Text>
                  <Text as="p">✅ Integrări Meta & Google Ads</Text>
                  <Text as="p">✅ 14 zile de test gratuit</Text>
                </BlockStack>

                <Button variant="primary" fullWidth>Începe 14 zile gratuit</Button>
              </BlockStack>
            </Card>

            {/* Planul 2: Enterprise (Scale) */}
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h3">Enterprise (Scale)</Text>
                
                <Text variant="heading2xl" as="p">Personalizat</Text>
                
                <Text tone="subdued" as="p">Pentru operațiuni mari, volume ridicate și echipe.</Text>
                
                <BlockStack gap="200">
                  <Text as="p">🚀 Comenzi <strong>nelimitate</strong></Text>
                  <Text as="p">⚡ Procesare prioritară a datelor</Text>
                  <Text as="p">🛠️ Toate funcționalitățile incluse</Text>
                  <Text as="p">💬 Suport prioritar dedicat</Text>
                </BlockStack>

                <Button fullWidth>Contactează-ne</Button>
              </BlockStack>
            </Card>

          </InlineGrid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
