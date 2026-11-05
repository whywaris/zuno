import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword.length < 12) {
    throw new Error("Set ADMIN_PASSWORD (at least 12 characters) before seeding");
  }
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@zunoclothing.com" },
    update: {},
    create: {
      email: "admin@zunoclothing.com",
      password: hashedPassword,
      name: "Zuno Admin",
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create categories
  const categories = [
    { name: "Anime Streetwear", slug: "anime-streetwear", description: "Anime streetwear, anime fashion, and styling guides." },
    { name: "Casual & Cool Anime Clothes", slug: "anime-clothes", description: "Casual anime clothes, cool anime clothes, and everyday anime outfits." },
    { name: "Anime Gym Wear", slug: "anime-gym-wear", description: "Anime gym clothes and workout guides." },
    { name: "Store Reviews", slug: "store-reviews", description: "Reviews of anime clothing stores including BibiSama, Culture Kings, BoxLunch, Anime Ape, Umai, Atsuko, and Toho." },
    { name: "Best Anime Stores", slug: "best-anime-stores", description: "Anime stores, anime clothing websites, and store comparisons." },
    { name: "Style Guides", slug: "style-guides", description: "Outfit ideas and styling guides for men and women." },
    { name: "Fabric & Care", slug: "fabric-care", description: "Print wash guides, hoodie care, and garment care." },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Categories created:", categories.length);

  // Create sample posts
  const fabricCare = await prisma.category.findUnique({ where: { slug: "fabric-care" } });
  const animeStreetwear = await prisma.category.findUnique({ where: { slug: "anime-streetwear" } });
  const styleGuides = await prisma.category.findUnique({ where: { slug: "style-guides" } });

  const posts = [
    {
      title: "10 Essential Wardrobe Staples Every Man Needs in 2026",
      slug: "essential-wardrobe-staples-men-2026",
      content: `<h2>Building the Perfect Foundation</h2><p>Every great wardrobe starts with the basics. Whether you're refreshing your closet or building from scratch, these ten essential pieces will serve as the foundation for countless outfits that are both stylish and versatile.</p><h3>1. The Perfect White T-Shirt</h3><p>A crisp white tee is arguably the most versatile piece in any man's wardrobe. Look for one made from premium cotton with a medium weight — not too thin that it's see-through, and not so thick that it feels like a sweatshirt. The fit should skim your body without being too tight.</p><h3>2. Dark Wash Slim Jeans</h3><p>A pair of well-fitting dark wash jeans can be dressed up or down effortlessly. They work just as well with a blazer and loafers as they do with sneakers and a hoodie. Aim for a slim (not skinny) fit that gives you room to move.</p><h3>3. A Tailored Navy Blazer</h3><p>The navy blazer is the Swiss Army knife of menswear. Throw it over a t-shirt for a smart-casual look, or pair it with chinos and a button-down for something more polished. Invest in one with a modern, slightly slim cut.</p><h3>4. Classic White Sneakers</h3><p>Clean white sneakers have become a modern essential. They pair with everything from tailored trousers to shorts. Choose a minimal design in quality leather for maximum versatility and longevity.</p><h3>5. Oxford Button-Down Shirt</h3><p>The Oxford cloth button-down (OCBD) bridges the gap between casual and formal. In light blue or white, it's perfect for both office settings and weekend brunches. Roll the sleeves for a relaxed vibe.</p><h2>Beyond the Basics</h2><h3>6. Chinos in Khaki or Olive</h3><p>Chinos offer a step up from jeans while maintaining comfort. Khaki and olive are the most versatile colors, working seamlessly across seasons and occasions.</p><h3>7. A Quality Leather Belt</h3><p>A good leather belt ties your outfit together — literally. Invest in one in brown and one in black, both with simple, clean buckles.</p><h3>8. The Crewneck Sweater</h3><p>A merino wool or quality cotton crewneck in navy, grey, or black is perfect for layering. It adds sophistication to any outfit without being overdressed.</p><h3>9. Versatile Outerwear</h3><p>Whether it's a classic denim jacket, a minimal bomber, or a clean overcoat — having reliable outerwear is non-negotiable. Choose neutral colors that complement the rest of your wardrobe.</p><h3>10. Well-Fitting Shorts</h3><p>For warmer months, a pair of tailored shorts (hitting just above the knee) in navy or khaki completes your seasonal rotation. Avoid cargo pockets for a cleaner look.</p><blockquote><p>Style is not about the price tag — it's about fit, fabric, and confidence. Master these basics, and you'll always look put-together.</p></blockquote>`,
      excerpt: "Build a timeless wardrobe with these ten essential pieces every modern man should own. From the perfect white tee to tailored blazers.",
      status: "PUBLISHED",
      readingTime: "5 min read",
      featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop",
      featuredImageAlt: "Stylish men's wardrobe essentials laid out on a wooden surface",
      metaTitle: "10 Essential Wardrobe Staples Every Man Needs | Zuno Clothing",
      metaDescription: "Discover the 10 must-have wardrobe essentials every modern man needs in 2026. Build a timeless, versatile closet with these key pieces.",
      categoryId: styleGuides!.id,
      views: 1247,
    },
    {
      title: "The Ultimate Guide to Sustainable Fashion in 2026",
      slug: "ultimate-guide-sustainable-fashion-2026",
      content: `<h2>Why Sustainable Fashion Matters</h2><p>The fashion industry is one of the world's largest polluters, responsible for roughly 10% of global carbon emissions. But a revolution is underway. Sustainable fashion isn't just a trend — it's the future of how we dress.</p><h3>Understanding Fast Fashion's Impact</h3><p>Fast fashion brands produce new collections at breakneck speed, encouraging overconsumption and creating mountains of textile waste. The average person now buys 60% more clothing than they did 15 years ago but keeps each item for only half as long.</p><h3>What Makes Fashion Sustainable?</h3><p>Sustainable fashion encompasses several key principles:</p><ul><li><strong>Ethical production:</strong> Fair wages and safe working conditions</li><li><strong>Eco-friendly materials:</strong> Organic cotton, recycled fabrics, hemp, and Tencel</li><li><strong>Durability:</strong> Pieces designed to last years, not weeks</li><li><strong>Circular design:</strong> Items that can be recycled or composted at end of life</li></ul><h2>How to Build a Sustainable Wardrobe</h2><h3>1. Buy Less, Choose Well</h3><p>The most sustainable garment is the one you already own. Before making a purchase, ask yourself: Will I wear this at least 30 times? If the answer is no, put it back.</p><h3>2. Invest in Quality</h3><p>A well-made piece that lasts five years is far more sustainable than five cheap alternatives that each last one year. Look for reinforced seams, quality zippers, and natural fibers.</p><h3>3. Shop Second-Hand</h3><p>Thrift stores, consignment shops, and platforms like ThredUp and Depop offer pre-loved clothing at a fraction of the cost. You'll find unique pieces while reducing demand for new production.</p><h3>4. Care for Your Clothes</h3><p>Proper garment care extends the life of your clothing significantly. Wash in cold water, air dry when possible, and learn basic repairs like sewing buttons and fixing hems.</p><blockquote><p>The most sustainable outfit is the one you wear again and again. Fashion should be personal, not disposable.</p></blockquote>`,
      excerpt: "Everything you need to know about sustainable fashion — from ethical brands to building a conscious wardrobe that lasts.",
      status: "PUBLISHED",
      readingTime: "6 min read",
      featuredImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=630&fit=crop",
      featuredImageAlt: "Sustainably produced clothing hanging on a wooden rack",
      metaTitle: "Ultimate Guide to Sustainable Fashion 2026 | Zuno Clothing",
      metaDescription: "Learn how to build a sustainable wardrobe in 2026. From eco-friendly fabrics to ethical brands, your complete guide to conscious fashion.",
      categoryId: styleGuides!.id,
      views: 982,
    },
    {
      title: "How to Care for Different Fabric Types: A Complete Guide",
      slug: "how-to-care-for-different-fabric-types",
      content: `<h2>Know Your Fabrics</h2><p>Understanding fabric care is the secret to making your clothes last longer and look better. Each material has its own set of rules, and following them can save you money and heartbreak.</p><h3>Cotton</h3><p>Cotton is breathable, comfortable, and relatively easy to care for. Machine wash in cold or warm water, and tumble dry on low. However, 100% cotton tends to shrink, so consider air drying premium cotton pieces.</p><h3>Wool</h3><p>Wool requires gentle handling. Hand wash in cold water with a specialized wool detergent, or use your machine's delicate cycle. Never wring wool — instead, press water out gently and lay flat to dry to maintain its shape.</p><h3>Silk</h3><p>Silk is luxurious but delicate. Hand wash in cold water with mild detergent, or dry clean. Avoid direct sunlight when drying, as it can damage the fibers and cause fading.</p><h3>Linen</h3><p>Linen gets softer with each wash. Machine wash on a gentle cycle with cold water. Linen wrinkles naturally — embrace it as part of the fabric's character, or iron while slightly damp for a crisp finish.</p><h3>Denim</h3><p>The golden rule of denim care: wash less frequently. Turn jeans inside out and wash in cold water every 5-10 wears. This preserves the color and prevents premature fading.</p><h2>General Fabric Care Tips</h2><ul><li>Always read the care label before washing</li><li>Sort clothes by color AND fabric type</li><li>Use mesh laundry bags for delicates</li><li>Invest in quality hangers to maintain garment shape</li><li>Store seasonal items in breathable garment bags</li></ul><blockquote><p>Treat your clothes well, and they'll return the favor. Good fabric care is the most cost-effective style upgrade you can make.</p></blockquote>`,
      excerpt: "Master the art of garment care with our comprehensive guide to washing, drying, and maintaining every fabric type in your wardrobe.",
      status: "PUBLISHED",
      readingTime: "4 min read",
      featuredImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=630&fit=crop",
      featuredImageAlt: "Various fabric swatches arranged in a flat lay pattern",
      metaTitle: "How to Care for Different Fabric Types | Zuno Clothing",
      metaDescription: "Complete guide to caring for cotton, wool, silk, linen, and denim. Learn washing, drying, and storage tips to make your clothes last longer.",
      categoryId: fabricCare!.id,
      views: 756,
    },
    {
      title: "Streetwear Culture: From Underground to Mainstream",
      slug: "streetwear-culture-underground-to-mainstream",
      content: `<h2>The Evolution of Streetwear</h2><p>What started as a counter-culture movement in the 1980s has become one of the most influential forces in global fashion. Streetwear's journey from underground skate parks and hip-hop scenes to luxury fashion runways is a story of creativity, community, and cultural impact.</p><h3>The Origins</h3><p>Streetwear emerged from the intersection of surf, skate, and hip-hop cultures in California and New York. Brands like Stüssy, Supreme, and A Bathing Ape defined the aesthetic: graphic tees, hoodies, sneakers, and limited-edition drops that created a sense of exclusivity.</p><h3>The Sneaker Revolution</h3><p>Sneakers are the cornerstone of streetwear culture. From Air Jordans to Yeezys, footwear has become a form of self-expression and even investment. The resale market for rare sneakers now exceeds $10 billion annually.</p><h3>High Fashion Meets the Street</h3><p>The appointment of Virgil Abloh at Louis Vuitton marked a watershed moment. Luxury brands began collaborating with streetwear labels, blurring the lines between high fashion and street culture. Today, a Supreme box logo carries as much cachet as a designer logo.</p><h2>Key Streetwear Pieces for 2026</h2><ul><li><strong>Oversized graphic hoodies</strong> with bold prints</li><li><strong>Cargo pants</strong> with a relaxed, tapered fit</li><li><strong>Retro sneakers</strong> — New Balance and ASICS lead the pack</li><li><strong>Technical outerwear</strong> blending function with style</li><li><strong>Statement accessories</strong> — chunky chains, bucket hats, crossbody bags</li></ul><blockquote><p>Streetwear isn't just clothing — it's identity. It's how a generation communicates who they are and what they stand for.</p></blockquote>`,
      excerpt: "Explore the evolution of streetwear from underground subculture to global fashion phenomenon. Key pieces, history, and what's next.",
      status: "PUBLISHED",
      readingTime: "5 min read",
      featuredImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=630&fit=crop",
      featuredImageAlt: "Street style fashion with sneakers and urban outfit",
      metaTitle: "Streetwear Culture: From Underground to Mainstream | Zuno Clothing",
      metaDescription: "Discover the evolution of streetwear culture, from 1980s underground origins to mainstream fashion. Key pieces, sneaker culture, and trends for 2026.",
      categoryId: animeStreetwear!.id,
      views: 1583,
    },
    {
      title: "Color Theory for Fashion: How to Build Outfits That Work",
      slug: "color-theory-fashion-build-outfits",
      content: `<h2>Understanding Color in Fashion</h2><p>Color is the first thing people notice about your outfit. Understanding basic color theory can transform the way you dress, helping you create harmonious, eye-catching combinations with confidence.</p><h3>The Color Wheel Basics</h3><p>The color wheel is your best friend when building outfits. Colors are divided into three categories:</p><ul><li><strong>Primary colors:</strong> Red, blue, yellow</li><li><strong>Secondary colors:</strong> Green, orange, purple</li><li><strong>Tertiary colors:</strong> Combinations like teal, coral, and burgundy</li></ul><h3>Complementary Colors</h3><p>Colors opposite each other on the wheel create bold, dynamic contrast. Think navy and orange, or burgundy and forest green. Use one as your dominant color and the other as an accent.</p><h3>Analogous Colors</h3><p>Colors next to each other on the wheel create smooth, harmonious looks. Olive, khaki, and brown together feel naturally cohesive and sophisticated.</p><h3>The Neutral Foundation</h3><p>Neutrals — black, white, grey, navy, beige, and brown — are the backbone of any wardrobe. They pair with everything and with each other, making them perfect for building versatile outfits.</p><h2>Practical Color Rules</h2><h3>The 60-30-10 Rule</h3><p>A foolproof formula for balanced outfits: 60% dominant color (usually a neutral), 30% secondary color, and 10% accent color. For example: grey trousers (60%), white shirt (30%), burgundy tie (10%).</p><h3>Seasonal Color Palettes</h3><p>Align your colors with the seasons for a natural, intentional look:</p><ul><li><strong>Spring:</strong> Pastels, light blues, soft pinks</li><li><strong>Summer:</strong> Whites, light greys, earthy tones</li><li><strong>Autumn:</strong> Burgundy, olive, rust, mustard</li><li><strong>Winter:</strong> Deep navy, black, charcoal, emerald</li></ul><blockquote><p>Color confidence comes with practice. Start with neutrals, add one accent color, and build from there. Before you know it, you'll be mixing palettes like a pro.</p></blockquote>`,
      excerpt: "Master the art of color coordination in fashion. Learn the color wheel, the 60-30-10 rule, and seasonal palettes to elevate your style.",
      status: "PUBLISHED",
      readingTime: "5 min read",
      featuredImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=630&fit=crop",
      featuredImageAlt: "Colorful clothing items arranged by color spectrum",
      metaTitle: "Color Theory for Fashion: Build Better Outfits | Zuno Clothing",
      metaDescription: "Learn how to use color theory to build stylish outfits. Master the color wheel, complementary palettes, and the 60-30-10 rule for men and women.",
      categoryId: styleGuides!.id,
      views: 2104,
    },
    {
      title: "Summer 2026 Fashion Trends: What to Wear This Season",
      slug: "summer-2026-fashion-trends",
      content: `<h2>The Hottest Trends This Summer</h2><p>Summer 2026 brings a refreshing mix of nostalgic revivals and forward-thinking innovation. From airy fabrics to bold silhouettes, here's everything you need to know about dressing for the season.</p><h3>1. Relaxed Tailoring</h3><p>Oversized blazers paired with wide-leg trousers are dominating runways and streets alike. The key is choosing breathable fabrics like linen and cotton blends that drape beautifully while keeping you cool.</p><h3>2. Sheer and Mesh Details</h3><p>Transparency is trending. Sheer overlays, mesh panels, and see-through knits add depth and interest to outfits without adding weight. Layer strategically for a sophisticated take.</p><h3>3. Earth Tones Reimagined</h3><p>This summer's palette leans into warm, grounded colors — terracotta, sage, sand, and clay. These organic hues feel effortlessly elegant and pair beautifully together.</p><h3>4. Technical Fabrics Go Casual</h3><p>Performance materials are breaking out of the gym. Quick-dry shorts, moisture-wicking polos, and UV-protective shirts look just as good at a café as they do on a trail.</p><h3>5. The Return of Crochet</h3><p>Handcrafted crochet tops, bags, and accessories add artisanal charm to summer wardrobes. Look for open-weave pieces in natural tones for maximum style impact.</p><h2>How to Style Summer 2026</h2><p>The overarching theme is effortless sophistication. Mix structured pieces with relaxed ones, combine textures freely, and don't be afraid of muted colors — they're anything but boring this season.</p><blockquote><p>Summer style is about feeling free and looking intentional. Let the trends serve you, not the other way around.</p></blockquote>`,
      excerpt: "Discover the top fashion trends for Summer 2026. From relaxed tailoring to earth tones, here's your complete seasonal style guide.",
      status: "DRAFT",
      readingTime: "4 min read",
      featuredImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=630&fit=crop",
      featuredImageAlt: "Summer fashion trend showcase with light airy clothing",
      metaTitle: "Summer 2026 Fashion Trends | Zuno Clothing",
      metaDescription: "Stay ahead of the curve with the top summer 2026 fashion trends. Relaxed tailoring, earth tones, and more in our seasonal style guide.",
      categoryId: styleGuides!.id,
      views: 0,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log("Sample posts created:", posts.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
