# Intraconnect Landing Page

Landing page comercial da Intraconnect, focada em geracao de leads para demo e WhatsApp.

## Estrutura

- `index.html`: copy completa + secoes (Hero, dor x solucao, modulos, seguranca, FAQ e CTA final)
- `styles.css`: identidade visual da landing (desktop e mobile)
- `script.js`: tracking de eventos, FAQ interativo e envio do formulario
- `assets/og-intraconnect.svg`: imagem de preview social
- `robots.txt` e `sitemap.xml`: base SEO

## Eventos de tracking implementados

- Clique em CTA hero/header/final/footer (`cta_click`)
- Envio de formulario (`form_submit`)
- Scroll depth 50% e 75% (`scroll_depth`)
- Clique em FAQ (`faq_click`)

> Se `window.dataLayer` existir, os eventos sao enviados para ele. Caso contrario, sao exibidos no console.

## Executar localmente

Opcao simples com VS Code Live Server, ou:

```bash
# na pasta intraconnect
python -m http.server 5500
```

Acesse `http://localhost:5500`.

## Ajustes antes de producao

1. Atualizar links reais de WhatsApp.
2. Configurar endpoint real do formulario (CRM/automacao).
3. Confirmar dominio final em `canonical`, `og:url` e `sitemap.xml`.
4. Integrar GTM/GA4 em producao para coleta oficial.
