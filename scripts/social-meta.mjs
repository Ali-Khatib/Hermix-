// One explicit brand image: crawlers must not choose a feature outfit as the identity.
const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function socialMeta({ title, description, url, origin }) {
 const image = new URL('/media/social/hermix-share-default-v1.png', origin).href;
 return [
 ['property','og:type','website'],['property','og:site_name','Hermix'],
 ['property','og:title',title],['property','og:description',description],['property','og:url',url],
 ['property','og:image',image],['property','og:image:secure_url',image],
 ['property','og:image:type','image/png'],['property','og:image:width','1200'],['property','og:image:height','675'],
 ['property','og:image:alt','Hermix’s standard spherical mascot, without a costume'],
 ['name','twitter:card','summary_large_image'],['name','twitter:title',title],
 ['name','twitter:description',description],['name','twitter:image',image],
 ['name','twitter:image:alt','Hermix’s standard spherical mascot, without a costume']
 ].map(([attribute,key,value]) => '  <meta '+attribute+'="'+key+'" content="'+esc(value)+'" />').join('\n');
}
