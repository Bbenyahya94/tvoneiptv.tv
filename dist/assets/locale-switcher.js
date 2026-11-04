(()=>{
  const select=document.querySelector('.language'); if(!select)return;
  // Older markup used visible language names as option values. Normalize them
  // before any change event is handled, so Arabic can never become /العربية/.
  const legacy={English:'en','Français':'fr','Español':'es',Deutsch:'de',Nederlands:'nl','中文':'cn','العربية':'ar'};
  Array.from(select.options).forEach(option=>{if(legacy[option.value])option.value=legacy[option.value];});
  const current=(location.pathname.match(/^\/(ar|fr|es|de|cn|nl)(?:\/|$)/)||[])[1]||'en';
  [['en','English'],['fr','Français'],['es','Español'],['de','Deutsch'],['nl','Nederlands'],['cn','中文'],['ar','العربية']].forEach(([value,label])=>{
    if(!select.querySelector('option[value="'+value+'"]')){const o=document.createElement('option');o.value=value;o.textContent=label;select.append(o);}
  });
  select.value=current;
  select.onchange=e=>{const destination=e.target.value;const plain=location.pathname.replace(/^\/(ar|fr|es|de|cn|nl)/,'')||'/';localStorage.setItem('tivione-language',destination);location.href=destination==='en'?plain:'/'+destination+plain;};
})();
