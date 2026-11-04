/* One canonical URL and a complete language alternate set for every public route. */
(()=>{
  const origin=location.origin;
  const match=location.pathname.match(/^\/(ar|fr|es|de|cn|nl)(\/.*)?$/);
  const suffix=match?(match[2]||'/'):location.pathname;
  const canonical=origin+location.pathname;
  document.querySelectorAll('link[rel="canonical"],link[rel="alternate"][hreflang]').forEach(node=>node.remove());
  const add=(rel,href,lang)=>{const link=document.createElement('link');link.rel=rel;link.href=href;if(lang)link.hreflang=lang;document.head.append(link);};
  add('canonical',canonical);
  [['en',''],['fr','/fr'],['es','/es'],['de','/de'],['nl','/nl'],['zh','/cn'],['ar','/ar']].forEach(([lang,prefix])=>add('alternate',origin+prefix+suffix,lang));
  add('alternate',origin+suffix,'x-default');
  let robots=document.querySelector('meta[name="robots"]');
  if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots);}
  robots.content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
})();
