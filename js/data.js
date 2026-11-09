/* ===========================================================
   LEHGAMOH — Product & Blog Database
   Images live in the /images folder as 1.jpeg ... 44.jpeg
   =========================================================== */

const PRODUCT_SEED = [
  ["Royal Blue Bridal Lehenga", "bridal"],
  ["Classic White Wedding Gown", "wedding"],
  ["Rani Pink Bridal Lehenga", "bridal"],
  ["Designer Pastel Saree", "party"],
  ["Golden Embroidered Gown", "reception"],
  ["Traditional Red Bridal Lehenga", "bridal"],
  ["Emerald Green Anarkali", "wedding"],
  ["Blush Pink Party Gown", "party"],
  ["Ivory Pearl Lehenga", "wedding"],
  ["Maroon Velvet Saree", "reception"],
  ["Champagne Sequin Gown", "party"],
  ["Peacock Blue Lehenga", "bridal"],
  ["Ruby Red Bridal Lehenga", "bridal"],
  ["Mint Green Sharara Set", "casual"],
  ["Mustard Yellow Wedding Lehenga", "wedding"],
  ["Black Sequin Saree", "party"],
  ["Rose Gold Reception Gown", "reception"],
  ["Coral Silk Anarkali", "casual"],
  ["Navy Blue Indo-Western Set", "reception"],
  ["Lavender Dream Lehenga", "bridal"],
  ["Teal Embroidered Gown", "party"],
  ["White Chikankari Suit", "casual"],
  ["Magenta Wedding Lehenga", "wedding"],
  ["Sage Green Georgette Saree", "casual"],
  ["Copper Tissue Lehenga", "reception"],
  ["Sky Blue Party Dress", "party"],
  ["Burgundy Velvet Gown", "reception"],
  ["Pastel Peach Saree", "party"],
  ["Olive Green Kurta Set", "casual"],
  ["Silver Shimmer Lehenga", "party"],
  ["Purple Banarasi Saree", "wedding"],
  ["Powder Blue Lehenga", "bridal"],
  ["Wine Embroidered Suit", "reception"],
  ["Pink Net Bridal Lehenga", "bridal"],
  ["Rust Orange Saree", "party"],
  ["Cream Pearl Wedding Gown", "wedding"],
  ["Blue Georgette Lehenga", "bridal"],
  ["Yellow Haldi Lehenga", "wedding"],
  ["Green Silk Bridal Lehenga", "bridal"],
  ["Red Banarasi Saree", "wedding"],
  ["Ivory Bridal Lehenga", "bridal"],
  ["Deep Purple Reception Gown", "reception"],
  ["Peach Wedding Lehenga", "wedding"],
  ["Gold Embroidered Bridal Lehenga", "bridal"],
];

const CATEGORY_BASE_PRICE = {
  bridal: 18999,
  wedding: 15999,
  party: 11999,
  reception: 13999,
  casual: 8999,
};

const CATEGORY_LABEL = {
  bridal: "Bridal",
  wedding: "Wedding",
  party: "Party Wear",
  reception: "Reception",
  casual: "Casual / Suits",
};

const PRODUCT_BLURB = {
  bridal: "A show-stopping bridal ensemble with intricate zari and hand embroidery, crafted for the most important day of your life.",
  wedding: "An elegant wedding silhouette finished with delicate thread work, designed to make every celebration unforgettable.",
  party: "A modern party-ready outfit with a flattering fit and shimmering accents for evenings that deserve a little sparkle.",
  reception: "A refined reception look with rich textures and tasteful detailing, perfect for grand celebrations and photographs.",
  casual: "A comfortable yet graceful everyday ethnic piece, easy to style for festive brunches and intimate gatherings.",
};

const products = PRODUCT_SEED.map(([name, category], index) => {
  const id = index + 1;
  const price = CATEGORY_BASE_PRICE[category] + ((id * 137) % 3000);
  const oldPrice = price + 3000 + ((id * 211) % 4000);
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
  return {
    id: id,
    name: name,
    image: "images/" + id + ".jpeg",
    price: price,
    oldPrice: oldPrice,
    discount: discount,
    category: category,
    categoryLabel: CATEGORY_LABEL[category],
    desc: PRODUCT_BLURB[category],
    fabric: ["Raw Silk", "Georgette", "Velvet", "Banarasi Silk", "Net"][id % 5],
    sizes: category === "casual" ? ["S", "M", "L", "XL"] : ["S", "M", "L", "XL"],
    rating: Number((4 + ((id * 7) % 10) / 10).toFixed(1)),
    inStock: id !== 13 && id !== 27,
    featured: id <= 8,
    newArrival: id >= 37,
  };
});

const blogs = [
  {
    id: 1,
    title: "How to Choose Your Bridal Lehenga",
    image: "images/13.jpeg",
    date: "November 1, 2024",
    author: "Lehgamoh Styling Team",
    excerpt: "From silhouette to embroidery, here is a practical guide to finding the bridal lehenga that feels like you.",
    content:
      "Choosing a bridal lehenga is as emotional as it is practical. Start with the silhouette: an A-line lehenga flatters most body types, while a fish-cut lehenga creates a dramatic, sculpted look. Next, think about your venue. A heavier velvet lehenga with zari work suits a winter evening wedding, while a lighter georgette or net lehenga is far more comfortable for a daytime summer ceremony. Embroidery should be seen up close — hand zardozi and dabka work catch light beautifully in photographs. Finally, do not ignore the dupatta. A lighter dupatta keeps the look elegant, and a contrasting border adds that extra layer of drama. Book a fitting at least six weeks before the wedding so the blouse and waist can be adjusted perfectly.",
  },
  {
    id: 2,
    title: "Top Ethnic Trends to Watch This Season",
    image: "images/22.jpeg",
    date: "October 25, 2024",
    author: "Lehgamoh Editorial",
    excerpt: "Pastels, sculpted sleeves and heritage weaves — the trends shaping festive wardrobes this year.",
    content:
      "This season belongs to pastel bridalwear. Shades like powder blue, sage green and blush pink are replacing the classic red for daytime functions, paired with tonal embroidery for a soft, modern look. Sculpted sleeves and cape-style blouses are appearing across designer collections, giving traditional lehengas a contemporary edge. Heritage weaves are also having a moment: Banarasi silk sarees with broad borders are being styled with belts and statement jewellery. If you are building a versatile wardrobe, invest in one strong heritage piece and one pastel outfit — together they cover almost every wedding invitation you will receive this year.",
  },
  {
    id: 3,
    title: "Caring for Your Saree the Right Way",
    image: "images/28.jpeg",
    date: "October 10, 2024",
    author: "Lehgamoh Care Guide",
    excerpt: "Simple storage and cleaning habits that keep delicate fabrics fresh for years.",
    content:
      "Delicate sarees deserve gentle care. Always dry clean silk and embroidered pieces for the first wash, and never hang a heavy saree on a wire hanger — the weight can stretch the weave. Fold them in a soft muslin cloth and store them in a cool, dry place away from direct sunlight. Rotate the folds every few months to prevent permanent creases. For net and sequin sarees, keep each piece in its own cotton bag to avoid snagging. If a thread pulls, do not cut it — gently ease it back into the weave with a blunt needle. A little attention goes a long way in preserving the heirloom quality of your ethnic wardrobe.",
  },
  {
    id: 4,
    title: "Jewellery Pairing for Every Neckline",
    image: "images/34.jpeg",
    date: "September 28, 2024",
    author: "Lehgamoh Styling Team",
    excerpt: "Match your maang tikka to your neckline with these easy-to-follow styling rules.",
    content:
      "The right jewellery transforms an outfit. With a high, closed neckline, choose a shorter choker or a single statement pendant; a long rani haar will crowd the fabric. Sweetheart and V-necklines love layered necklaces that follow the shape of the neckline. For off-shoulder blouses, a delicate choker with matching earrings keeps the focus on the shoulders. If the lehenga already has heavy embroidery on the bodice, skip the necklace entirely and let statement earrings and a maang tikka do the work. The golden rule: one hero piece per look. When in doubt, remove one accessory before you step out.",
  },
  {
    id: 5,
    title: "A Complete Wedding Trousseau Checklist",
    image: "images/41.jpeg",
    date: "September 12, 2024",
    author: "Lehgamoh Editorial",
    excerpt: "The outfits and essentials every bride should plan for, function by function.",
    content:
      "A wedding trousseau is more than one lehenga. Plan function by function: a light mehendi outfit that lets you move and dance, a bright haldi look in yellow or marigold, a statement bridal lehenga for the ceremony, and an elegant reception gown. Add one or two versatile sarees for family events and a comfortable after-party outfit. Do not forget the details: correct innerwear, safety pins, a small sewing kit and blotting papers should travel with you on every wedding day. Keep a written checklist and assign a trusted family member to manage the outfits. Being organised is the quietest luxury a bride can have.",
  },
  {
    id: 6,
    title: "Why Handcrafted Ethnic Wear Still Matters",
    image: "images/44.jpeg",
    date: "August 30, 2024",
    author: "Lehgamoh Journal",
    excerpt: "Behind every lehenga is a karigar whose craft has been passed down for generations.",
    content:
      "A hand-embroidered lehenga is never just fabric. It is hours of patient zardozi, a karigar's steady hand and a craft passed down through families. Machine embroidery can imitate a pattern, but it cannot reproduce the tiny variations that give handwork its warmth. Choosing handcrafted ethnic wear also supports the artisans who keep these traditions alive. At Lehgamoh, every piece is finished by hand in small batches, which is why no two lehengas are exactly alike. When you invest in handcraft, you are not just buying an outfit — you are carrying forward a living heritage.",
  },
];

function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}
