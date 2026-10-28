import { languageKey } from "@/i18n/config";

/** The unprefixed home is a language entry; explicit language URLs never redirect. */
export function LanguageEntry() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const source = `(function(){try{var b=${JSON.stringify(base)},p=location.pathname;if(p!==b&&p!==b+'/')return;var a=['es','en','de','it'],s=null;try{s=localStorage.getItem(${JSON.stringify(languageKey)})}catch(e){}var l=a.indexOf(s)>=0?s:null;if(!l){var n=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];for(var i=0;i<n.length;i++){var v=n[i].toLowerCase().split(/[-_]/)[0];if(a.indexOf(v)>=0){l=v;break}}}l=l||'en';location.replace(b+'/'+l+'/'+location.search+location.hash)}catch(e){}})();`;
  return <script id="language-entry" dangerouslySetInnerHTML={{ __html: source }} />;
}
