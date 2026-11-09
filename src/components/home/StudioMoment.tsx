'use client';

import { useEffect } from 'react';
import { assetPath } from '@/lib/paths';

export function StudioMoment() {
  useEffect(() => {
    let dispose: (()=>void) | undefined;
    let cancelled=false;
    const url=assetPath('/studio/moments/moments.js');
    // Public ESM stays outside the React bundle and resolves relative resources under a Pages basePath.
    import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url).then(async module=>{
      if(cancelled) return;
      const root=document.querySelector('[data-moment="word-highlight"]');
      if(root) { const api=await module.mount(root); if(cancelled) api?.destroy?.(); else dispose=()=>api?.destroy?.(); }
    }).catch(()=>{ /* The server-rendered statement is the complete fallback. */ });
    return ()=>{cancelled=true;dispose?.();};
  }, []);
  return null;
}
