Theme for shopify project "SpoilYour"
Theme based on [free theme](https://zemez.io/free-themes/vendy-shopping-free-theme-for-online-store-2-0/) made by [ZEMEZ](https://zemez.io/shopify-themes/) and customized to the related [Figma design](https://www.figma.com/design/zwfYpRXcHo64tcLzBFQ62v/SpoilYour-Designs)

Development workflow setup:

  - Firstly install Shopfy CLI globally using your package manager of choice (in this case npm):

    ```npm install -g @shopify/cli @shopify/theme```
  - Pull your theme using the command below.

    ```shopify theme pull --store=mq0dpe-b9.myshopify.com```
    
     *Note that if this is the first time using the CLI for this particular store you will be promoted to authenticate.
  - Run theme locally:
     
    ```shopify theme dev```
  - To implement the change in production simply run:

    ```shopify theme push```