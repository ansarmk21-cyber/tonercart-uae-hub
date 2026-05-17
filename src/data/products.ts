export type CartridgeColor = "Black" | "Cyan" | "Magenta" | "Yellow" | "Tri-Color";
export type CartridgeType = "Toner" | "Drum" | "Maintenance Kit" | "Ink";
export type OEMType = "OEM" | "Compatible";

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  popularSeries: string[];
}

export interface Product {
  slug: string;
  name: string;
  code: string;
  brand: string; // brand slug
  type: CartridgeType;
  color: CartridgeColor;
  oem: OEMType;
  compatibility: string[]; // printer models
  price: number; // AED, excl. VAT
  stock: number;
  bestseller?: boolean;
  featured?: boolean;
  description: string;
}

export const BRANDS: Brand[] = [
  {
    slug: "canon",
    name: "Canon",
    tagline: "NPG, C-EXV & GPR series",
    description:
      "Genuine and compatible Canon toner cartridges for imageRUNNER, imageCLASS and ADVANCE series copiers across the UAE.",
    popularSeries: ["NPG Series", "C-EXV Series", "GPR Series"],
  },
  {
    slug: "kyocera",
    name: "Kyocera",
    tagline: "TK series toners & drums",
    description:
      "Original Kyocera TK series toner cartridges and drum units for ECOSYS and TASKalfa machines, with bulk pricing for offices.",
    popularSeries: ["TK Series", "TASKalfa Toners", "Drum Units"],
  },
  {
    slug: "triumph-adler",
    name: "Triumph-Adler",
    tagline: "German engineered consumables",
    description:
      "High-yield Triumph-Adler toner cartridges for P-Series and copier systems, delivered across the UAE.",
    popularSeries: ["P-C Series", "PK Series", "Copy Kits"],
  },
  {
    slug: "hp",
    name: "HP",
    tagline: "LaserJet & OfficeJet supplies",
    description:
      "Premium HP LaserJet and Color LaserJet toner cartridges — both genuine and certified compatible — at the best UAE prices.",
    popularSeries: ["LaserJet", "Color LaserJet", "Neverstop"],
  },
  {
    slug: "sharp",
    name: "Sharp",
    tagline: "MX series copier toners",
    description:
      "Sharp MX series toner cartridges, developers, and drums for high-volume office copiers across Dubai, Abu Dhabi & Sharjah.",
    popularSeries: ["MX Series", "AR Series", "Developers"],
  },
  {
    slug: "ricoh",
    name: "Ricoh",
    tagline: "MP & SP series consumables",
    description:
      "Genuine Ricoh MP and SP series toner cartridges, maintenance kits and drum units with fast UAE-wide delivery.",
    popularSeries: ["MP Series", "SP Series", "Maintenance Kits"],
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "canon-npg-67-black",
    name: "Canon NPG-67 Black Toner Cartridge",
    code: "NPG-67 BK",
    brand: "canon",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["imageRUNNER C3320", "C3325", "C3330", "C3525", "C3530"],
    price: 285,
    stock: 24,
    bestseller: true,
    featured: true,
    description:
      "Genuine Canon NPG-67 black toner cartridge delivering sharp text and crisp graphics with up to 19,000 page yield.",
  },
  {
    slug: "canon-npg-67-cyan",
    name: "Canon NPG-67 Cyan Toner Cartridge",
    code: "NPG-67 C",
    brand: "canon",
    type: "Toner",
    color: "Cyan",
    oem: "OEM",
    compatibility: ["imageRUNNER C3320", "C3325", "C3525"],
    price: 410,
    stock: 12,
    featured: true,
    description: "Genuine Canon NPG-67 cyan toner — vivid colour reproduction for professional documents.",
  },
  {
    slug: "canon-c-exv-49-black",
    name: "Canon C-EXV 49 Black Toner",
    code: "C-EXV 49 BK",
    brand: "canon",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["imageRUNNER ADVANCE C3320", "C3325", "C3330"],
    price: 320,
    stock: 18,
    description: "Original Canon C-EXV 49 black toner for ADVANCE series copiers.",
  },
  {
    slug: "kyocera-tk-1175",
    name: "Kyocera TK-1175 Black Toner",
    code: "TK-1175",
    brand: "kyocera",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["ECOSYS M2040dn", "M2540dn", "M2640idw"],
    price: 195,
    stock: 40,
    bestseller: true,
    featured: true,
    description: "Genuine Kyocera TK-1175 black toner — 12,000 page yield with ECOSYS reliability.",
  },
  {
    slug: "kyocera-tk-5240-black",
    name: "Kyocera TK-5240 Black Toner",
    code: "TK-5240K",
    brand: "kyocera",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["ECOSYS M5526cdw", "P5026cdw"],
    price: 240,
    stock: 22,
    description: "Original TK-5240K black toner for ECOSYS color laser series.",
  },
  {
    slug: "kyocera-tk-8335-cyan",
    name: "Kyocera TK-8335 Cyan Toner",
    code: "TK-8335C",
    brand: "kyocera",
    type: "Toner",
    color: "Cyan",
    oem: "OEM",
    compatibility: ["TASKalfa 3252ci", "3253ci"],
    price: 520,
    stock: 8,
    description: "TK-8335 cyan toner cartridge for TASKalfa professional colour copiers.",
  },
  {
    slug: "hp-cf283a-83a",
    name: "HP 83A (CF283A) Black LaserJet Toner",
    code: "CF283A",
    brand: "hp",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["LaserJet Pro M125", "M127fn", "M201", "M225"],
    price: 175,
    stock: 60,
    bestseller: true,
    featured: true,
    description: "Genuine HP 83A black toner for LaserJet Pro M125/M127 series — 1,500 page yield.",
  },
  {
    slug: "hp-cf226a-26a",
    name: "HP 26A (CF226A) Black LaserJet Toner",
    code: "CF226A",
    brand: "hp",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["LaserJet Pro M402", "M426 MFP"],
    price: 285,
    stock: 35,
    description: "Original HP 26A black toner — high-quality print with 3,100 page yield.",
  },
  {
    slug: "hp-w2030a-415a-black",
    name: "HP 415A (W2030A) Black Toner",
    code: "W2030A",
    brand: "hp",
    type: "Toner",
    color: "Black",
    oem: "Compatible",
    compatibility: ["Color LaserJet M454dn", "M479fdw"],
    price: 145,
    stock: 50,
    description: "Premium compatible HP 415A black toner with full chip compatibility.",
  },
  {
    slug: "ricoh-mp-2014",
    name: "Ricoh MP 2014 Black Toner",
    code: "842128",
    brand: "ricoh",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["MP 2014", "MP 2014D", "MP 2014AD"],
    price: 165,
    stock: 28,
    bestseller: true,
    description: "Genuine Ricoh MP 2014 black toner — 12,000 page yield for office copiers.",
  },
  {
    slug: "ricoh-mp-c3503-magenta",
    name: "Ricoh MP C3503 Magenta Toner",
    code: "841818",
    brand: "ricoh",
    type: "Toner",
    color: "Magenta",
    oem: "OEM",
    compatibility: ["MP C3003", "C3503", "C3004", "C3504"],
    price: 540,
    stock: 10,
    featured: true,
    description: "Ricoh MP C3503 magenta toner cartridge for full-colour office printing.",
  },
  {
    slug: "sharp-mx-237at",
    name: "Sharp MX-237AT Black Toner",
    code: "MX-237AT",
    brand: "sharp",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["AR-6020", "AR-6023", "AR-6026", "AR-6031"],
    price: 210,
    stock: 20,
    bestseller: true,
    description: "Genuine Sharp MX-237AT black toner — 20,000 page yield.",
  },
  {
    slug: "sharp-mx-31gtba",
    name: "Sharp MX-31GTBA Black Toner",
    code: "MX-31GTBA",
    brand: "sharp",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["MX-2600N", "MX-3100N", "MX-4100N"],
    price: 380,
    stock: 14,
    description: "Sharp MX-31GTBA black toner for MX colour series copiers.",
  },
  {
    slug: "triumph-adler-pk-5015k",
    name: "Triumph-Adler PK-5015K Black Toner",
    code: "PK-5015K",
    brand: "triumph-adler",
    type: "Toner",
    color: "Black",
    oem: "OEM",
    compatibility: ["P-C2655w MFP", "P-C2655w"],
    price: 260,
    stock: 16,
    featured: true,
    description: "Original Triumph-Adler PK-5015K black toner — German engineering for crisp prints.",
  },
  {
    slug: "triumph-adler-pk-5018c",
    name: "Triumph-Adler PK-5018C Cyan Toner",
    code: "PK-5018C",
    brand: "triumph-adler",
    type: "Toner",
    color: "Cyan",
    oem: "OEM",
    compatibility: ["P-C3066i MFP", "P-C3061DN"],
    price: 470,
    stock: 9,
    description: "Triumph-Adler PK-5018 cyan cartridge for P-C series colour printers.",
  },
  {
    slug: "kyocera-mk-1130-maintenance",
    name: "Kyocera MK-1130 Maintenance Kit",
    code: "MK-1130",
    brand: "kyocera",
    type: "Maintenance Kit",
    color: "Black",
    oem: "OEM",
    compatibility: ["FS-1030MFP", "FS-1130MFP", "ECOSYS M2030dn"],
    price: 690,
    stock: 6,
    description: "Genuine Kyocera MK-1130 maintenance kit — restore your machine to peak performance.",
  },
];

export const getBrand = (slug: string) => BRANDS.find((b) => b.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsByBrand = (slug: string) => PRODUCTS.filter((p) => p.brand === slug);
