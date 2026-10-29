export type Store = {
  title: string;
  address: string;
  cep?: string;
  crest: string;
  crestAlt: string;
};

export const site = {
  name: "Flaviano",
  description:
    "Fale com a gente pelo WhatsApp, acesse o suporte e encontre as lojas.",
  headline: "Clique e fale com a gente agora mesmo",
  bannerAlt: "Banner principal",
  whatsappUrl: "https://w.app/flavianomoveis",
  instagramProfileUrl: "https://www.instagram.com/flavianomoveis/",
  salesEyebrow: "Mais procurado",
  salesTitle: "Compre pelo WhatsApp",
  supportTitle: "Central de assistência e suporte",
  supportSubtitle: "Atendimento via WhatsApp",
  offersTitle: "Confira ofertas do dia",
  offersSubtitle: "Veja nos stories do Instagram",
  storesTitle: "Lojas físicas",
  stores: [
    {
      title: "Loja Valente",
      address: "Rua Landulfo Alvez, 114, Centro",
      crest: "/images/brasoes/valente.png",
      crestAlt: "Brasão de Valente",
    },
    {
      title: "Loja Retiro",
      address: "Praça 27 de julho, 279, Centro",
      crest: "/images/brasoes/retirolandia.png",
      crestAlt: "Brasão de Retirolândia",
    },
    {
      title: "Loja Santa Luz 1",
      address: "Rua Gastão Pedreira, 80, Centro",
      crest: "/images/brasoes/santaluz.png",
      crestAlt: "Brasão de Santaluz",
    },
    {
      title: "Loja Santaluz 2",
      address: "Rua Ítalo Antônio de Jesus Almeida, nº 173, Centro",
      crest: "/images/brasoes/santaluz.png",
      crestAlt: "Brasão de Santaluz",
    },
    {
      title: "Loja São Domingos",
      address: "Praça Izaque Pinheiro da Costa, 29, Centro",
      crest: "/images/brasoes/sao-domingos.png",
      crestAlt: "Brasão de São Domingos",
    },
    {
      title: "Loja Santo Antônio",
      address:
        "Rua José Neves Oliveira, Distrito Santo Antônio - São Domingos BA",
      crest: "/images/brasoes/sao-domingos.png",
      crestAlt: "Brasão de São Domingos",
    },
  ] satisfies Store[],
  promoNote:
    "*Frete grátis válido apenas para cidades e condições específicas. Consulte previamente as regiões atendidas e os requisitos junto à nossa equipe pelo WhatsApp antes de finalizar a compra.",
  legalName: "Flaviano",
  cnpj: "CNPJ: 73.910.929/0001-21",
  coverage: "Lojas em Valente, Retiro, Santa Luz, São Domingos e Santo Antônio",
};

const WHATSAPP_HOSTS = ["w.app", "wa.me", "api.whatsapp.com"] as const;

function createHttpsLink(
  value: string,
  hosts: readonly string[],
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    if (!hosts.includes(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function createWhatsappLink(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed))
    return createHttpsLink(trimmed, WHATSAPP_HOSTS);

  const digits = trimmed.replace(/\D/g, "");
  if (!/^55\d{10,11}$/.test(digits)) return null;

  const url = new URL("https://api.whatsapp.com/send/");
  url.searchParams.set("phone", digits);
  return url.toString();
}

export function createInstagramStoriesLink(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const allowedHost =
      url.hostname === "instagram.com" || url.hostname === "www.instagram.com";
    if (
      url.protocol !== "https:" ||
      !allowedHost ||
      url.username ||
      url.password
    )
      return null;

    const parts = url.pathname.split("/").filter(Boolean);
    const username = parts[0] === "stories" ? parts[1] : parts[0];
    if (!username || !/^[A-Za-z0-9._]{1,30}$/.test(username)) return null;

    return `https://www.instagram.com/stories/${username}/`;
  } catch {
    return null;
  }
}

export const salesLink = createWhatsappLink(site.whatsappUrl);
export const supportLink = createWhatsappLink(site.whatsappUrl);
export const offersLink = createInstagramStoriesLink(site.instagramProfileUrl);
