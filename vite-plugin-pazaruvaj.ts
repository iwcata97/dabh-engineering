import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { products } from './src/data/products';

export default function pazaruvajFeedPlugin(options: { baseUrl?: string } = {}): Plugin {
  return {
    name: 'vite-plugin-pazaruvaj-feed',
    buildStart() {
      const baseUrl = options.baseUrl || 'https://dabh-engineering.com'; // Смени с твоя домейн
      
      let xml = `<?xml version="1.0" encoding="utf-8"?>\n<products>\n`;
      
      products.forEach(product => {
        // Pazaruvaj изисква цена като число. Тъй като в момента е "Очаквайте скоро",
        // слагаме 0 или опитваме да парснем число.
        let priceNum = parseFloat(product.price);
        if (isNaN(priceNum)) priceNum = 0;

        xml += `  <product>\n`;
        xml += `    <identifier><![CDATA[${product.id}]]></identifier>\n`;
        xml += `    <manufacturer><![CDATA[${product.brand}]]></manufacturer>\n`;
        xml += `    <name><![CDATA[${product.title}]]></name>\n`;
        xml += `    <category><![CDATA[${product.category}]]></category>\n`;
        xml += `    <price>${priceNum}</price>\n`;
        xml += `    <product_url><![CDATA[${baseUrl}/catalog?product=${product.id}]]></product_url>\n`;
        xml += `    <image_url><![CDATA[${baseUrl}${product.image}]]></image_url>\n`;
        xml += `    <description><![CDATA[${product.shortDescription}]]></description>\n`;
        xml += `  </product>\n`;
      });
      
      xml += `</products>`;
      
      // Записваме го в public папката, за да е достъпен на /pazaruvaj.xml
      const publicDir = path.resolve(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }
      
      fs.writeFileSync(path.join(publicDir, 'pazaruvaj.xml'), xml, 'utf-8');
      console.log('✅ Pazaruvaj XML feed generated at public/pazaruvaj.xml');
    }
  };
}
