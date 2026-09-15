import prisma from "../db.server";

/**
 * Verifică automat planul magazinului și limitele de comenzi în fundal.
 * @param {string} shopDomain - Domeniul magazinului Shopify
 * @returns {Promise<Object>} Rezultatul verificării (allowed, currentPlan, orderCount, reason)
 */
export async function checkShopPlanLimit(shopDomain) {
  // 1. Căutăm magazinul în baza de date Prisma
  let shopPlan = await prisma.shopPlan.findUnique({
    where: { shop: shopDomain },
  });

  // Dacă magazinul nu are încă un plan înregistrat, îl setăm automat pe Standard
  if (!shopPlan) {
    shopPlan = await prisma.shopPlan.create({
      data: {
        shop: shopDomain,
        planName: "Standard",
        orderCount: 0,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 de zile valabilitate
      },
    });
  }

  // 2. Aplicăm logica automată în funcție de planul activ
  if (shopPlan.planName === "Standard") {
    const ORDER_LIMIT = 1000;
    
    if (shopPlan.orderCount >= ORDER_LIMIT) {
      return {
        allowed: false,
        currentPlan: "Standard",
        orderCount: shopPlan.orderCount,
        reason: "Ai atins limita de 1,000 comenzi inclusă în planul Standard ($49/lună). Treci la planul Enterprise pentru comenzi nelimitate.",
      };
    }
  }

  // Planul Enterprise sau Standard aflat sub limită are acces complet
  return {
    allowed: true,
    currentPlan: shopPlan.planName,
    orderCount: shopPlan.orderCount,
  };
}
