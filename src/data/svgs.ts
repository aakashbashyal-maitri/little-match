import type { ItemId } from '../types/game'

export const svgContent: Record<ItemId, string> = {

  // ── SHAPES ───────────────────────────────────────────────────────────────
  circle: `
    <defs><filter id="f-ci" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-ci)">
      <circle cx="60" cy="60" r="50" fill="#FF6B6B" stroke="#D84040" stroke-width="4"/>
      <circle cx="40" cy="40" r="12" fill="rgba(255,255,255,0.38)"/>
    </g>
  `,

  square: `
    <defs><filter id="f-sq" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-sq)">
      <rect x="10" y="10" width="100" height="100" rx="20" fill="#4FC3F7" stroke="#0288D1" stroke-width="4"/>
      <rect x="20" y="20" width="36" height="14" rx="7" fill="rgba(255,255,255,0.38)"/>
    </g>
  `,

  triangle: `
    <defs><filter id="f-tr" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-tr)">
      <polygon points="60,10 112,108 8,108" fill="#FFD54F" stroke="#F9A825" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="50" cy="76" rx="12" ry="7" fill="rgba(255,255,255,0.32)" transform="rotate(-25 50 76)"/>
    </g>
  `,

  star: `
    <defs><filter id="f-st" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-st)">
      <polygon points="60,8 73,44 112,44 81,68 92,104 60,82 28,104 39,68 8,44 47,44"
        fill="#CE93D8" stroke="#9C27B0" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="46" cy="40" rx="9" ry="6" fill="rgba(255,255,255,0.35)" transform="rotate(-20 46 40)"/>
    </g>
  `,

  heart: `
    <defs><filter id="f-he" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-he)">
      <path d="M60,94 C30,74 8,56 8,34 C8,20 19,10 34,10 C44,10 54,16 60,25 C66,16 76,10 86,10 C101,10 112,20 112,34 C112,56 90,74 60,94Z"
        fill="#F48FB1" stroke="#E91E63" stroke-width="4"/>
      <ellipse cx="36" cy="34" rx="9" ry="13" fill="rgba(255,255,255,0.35)" transform="rotate(-30 36 34)"/>
    </g>
  `,

  // ── FOOD ─────────────────────────────────────────────────────────────────
  apple: `
    <defs><filter id="f-ap" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-ap)">
      <ellipse cx="60" cy="70" rx="40" ry="44" fill="#EF5350" stroke="#C62828" stroke-width="4"/>
      <path d="M46,30 Q60,20 74,30" fill="#EF5350" stroke="#C62828" stroke-width="3" stroke-linecap="round"/>
      <line x1="61" y1="24" x2="63" y2="14" stroke="#5D4037" stroke-width="5" stroke-linecap="round"/>
      <path d="M63,18 Q76,8 78,20 Q72,22 63,18Z" fill="#66BB6A" stroke="#388E3C" stroke-width="2.5"/>
      <ellipse cx="44" cy="55" rx="7" ry="13" fill="rgba(255,255,255,0.38)" transform="rotate(-20 44 55)"/>
    </g>
  `,

  carrot: `
    <defs><filter id="f-ca" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-ca)">
      <path d="M60,18 L88,100 Q60,114 32,100 Z" fill="#FF8F00" stroke="#E65100" stroke-width="4" stroke-linejoin="round"/>
      <line x1="55" y1="54" x2="50" y2="70" stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="65" y1="58" x2="68" y2="74" stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M50,20 C46,8 52,4 55,12 Q58,17 60,18" fill="#4CAF50" stroke="#2E7D32" stroke-width="2.5"/>
      <path d="M60,18 C60,6 65,3 66,12 Q64,17 60,18" fill="#66BB6A" stroke="#388E3C" stroke-width="2.5"/>
      <path d="M70,20 C74,8 70,3 67,11 Q63,17 60,18" fill="#4CAF50" stroke="#2E7D32" stroke-width="2.5"/>
      <ellipse cx="50" cy="56" rx="6" ry="11" fill="rgba(255,255,255,0.3)" transform="rotate(-15 50 56)"/>
    </g>
  `,

  banana: `
    <defs><filter id="f-ba" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-ba)">
      <path d="M32,98 C18,80 16,54 30,34 C42,16 62,10 80,16 C93,22 98,34 90,48 C84,58 70,62 60,58 C50,54 44,46 48,36 C52,26 64,24 70,30"
        fill="none" stroke="#FDD835" stroke-width="26" stroke-linecap="round"/>
      <path d="M32,98 C18,80 16,54 30,34 C42,16 62,10 80,16 C93,22 98,34 90,48 C84,58 70,62 60,58 C50,54 44,46 48,36 C52,26 64,24 70,30"
        fill="none" stroke="#FFEE58" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
      <circle cx="32" cy="99" r="5" fill="#5D4037"/>
      <circle cx="70" cy="29" r="4" fill="#5D4037"/>
    </g>
  `,

  cake: `
    <defs><filter id="f-ck" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-ck)">
      <rect x="12" y="82" width="96" height="26" rx="13" fill="#FFCCBC" stroke="#FF8A65" stroke-width="3"/>
      <rect x="18" y="54" width="84" height="32" rx="8" fill="#F8BBD9" stroke="#F48FB1" stroke-width="3"/>
      <path d="M18,60 Q27,50 36,60 Q45,50 54,60 Q63,50 72,60 Q81,50 90,60 Q99,50 102,56 L102,54 Q93,44 84,54 Q75,44 66,54 Q57,44 48,54 Q39,44 30,54 Q21,44 18,54Z"
        fill="white" stroke="#F8BBD9" stroke-width="1.5"/>
      <rect x="28" y="30" width="64" height="28" rx="8" fill="#CE93D8" stroke="#9C27B0" stroke-width="3"/>
      <path d="M28,36 Q40,26 52,36 Q64,26 76,36 Q88,26 92,32 L92,30 Q80,20 68,30 Q56,20 44,30 Q32,20 28,30Z"
        fill="rgba(255,255,255,0.5)"/>
      <rect x="56" y="12" width="8" height="20" rx="4" fill="#FFD54F" stroke="#F9A825" stroke-width="2"/>
      <ellipse cx="60" cy="10" rx="5" ry="7" fill="#FF8F00" stroke="#E65100" stroke-width="1.5"/>
      <ellipse cx="60" cy="10" rx="2.5" ry="3.5" fill="#FDD835"/>
    </g>
  `,

  cookie: `
    <defs><filter id="f-co" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-co)">
      <circle cx="60" cy="60" r="50" fill="#D2691E" stroke="#8D4E1C" stroke-width="4"/>
      <circle cx="60" cy="60" r="48" fill="#F4A460"/>
      <ellipse cx="43" cy="44" rx="8" ry="7" fill="#5D2E0C" stroke="#3E1A06" stroke-width="1.5"/>
      <ellipse cx="76" cy="40" rx="8" ry="6" fill="#5D2E0C" stroke="#3E1A06" stroke-width="1.5"/>
      <ellipse cx="36" cy="70" rx="7" ry="8" fill="#5D2E0C" stroke="#3E1A06" stroke-width="1.5"/>
      <ellipse cx="77" cy="70" rx="8" ry="7" fill="#5D2E0C" stroke="#3E1A06" stroke-width="1.5"/>
      <ellipse cx="57" cy="77" rx="7" ry="6" fill="#5D2E0C" stroke="#3E1A06" stroke-width="1.5"/>
      <ellipse cx="56" cy="52" rx="6" ry="7" fill="#5D2E0C" stroke="#3E1A06" stroke-width="1.5"/>
      <ellipse cx="40" cy="37" rx="8" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-20 40 37)"/>
    </g>
  `,

  // ── ANIMALS ──────────────────────────────────────────────────────────────
  cat: `
    <defs><filter id="f-cat" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-cat)">
      <polygon points="26,38 17,12 44,30" fill="#FFB74D" stroke="#F57C00" stroke-width="3.5" stroke-linejoin="round"/>
      <polygon points="94,38 103,12 76,30" fill="#FFB74D" stroke="#F57C00" stroke-width="3.5" stroke-linejoin="round"/>
      <polygon points="30,36 22,16 42,29" fill="#FF8A65"/>
      <polygon points="90,36 98,16 78,29" fill="#FF8A65"/>
      <circle cx="60" cy="66" r="44" fill="#FFB74D" stroke="#F57C00" stroke-width="4"/>
      <ellipse cx="46" cy="62" rx="9" ry="10" fill="white"/>
      <ellipse cx="74" cy="62" rx="9" ry="10" fill="white"/>
      <circle cx="47" cy="63" r="6" fill="#2E7D32"/>
      <circle cx="75" cy="63" r="6" fill="#2E7D32"/>
      <circle cx="48" cy="62" r="3.5" fill="#111"/>
      <circle cx="76" cy="62" r="3.5" fill="#111"/>
      <circle cx="50" cy="60" r="1.5" fill="white"/>
      <circle cx="78" cy="60" r="1.5" fill="white"/>
      <path d="M56,75 L60,80 L64,75 Q60,71 56,75Z" fill="#FF7043"/>
      <path d="M60,80 Q54,88 49,85" fill="none" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60,80 Q66,88 71,85" fill="none" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="14" y1="74" x2="47" y2="76" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <line x1="14" y1="81" x2="47" y2="80" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <line x1="73" y1="76" x2="106" y2="74" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <line x1="73" y1="80" x2="106" y2="81" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    </g>
  `,

  dog: `
    <defs><filter id="f-dog" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-dog)">
      <ellipse cx="26" cy="52" rx="18" ry="30" fill="#A1887F" stroke="#795548" stroke-width="3.5" transform="rotate(12 26 52)"/>
      <ellipse cx="94" cy="52" rx="18" ry="30" fill="#A1887F" stroke="#795548" stroke-width="3.5" transform="rotate(-12 94 52)"/>
      <circle cx="60" cy="60" r="44" fill="#BCAAA4" stroke="#795548" stroke-width="4"/>
      <ellipse cx="60" cy="79" rx="23" ry="19" fill="#D7CCC8" stroke="#A1887F" stroke-width="3"/>
      <circle cx="44" cy="55" r="10" fill="white"/>
      <circle cx="76" cy="55" r="10" fill="white"/>
      <circle cx="45" cy="56" r="7" fill="#3E2723"/>
      <circle cx="77" cy="56" r="7" fill="#3E2723"/>
      <circle cx="47" cy="54" r="2.5" fill="white"/>
      <circle cx="79" cy="54" r="2.5" fill="white"/>
      <ellipse cx="60" cy="75" rx="9" ry="7" fill="#3E2723"/>
      <ellipse cx="57" cy="73" rx="3" ry="2.2" fill="rgba(255,255,255,0.35)"/>
      <path d="M60,82 Q54,91 46,89" fill="none" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60,82 Q66,91 74,89" fill="none" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>
    </g>
  `,

  bird: `
    <defs><filter id="f-bir" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-bir)">
      <path d="M22,90 L8,106 L32,98 L20,114 L44,100Z" fill="#64B5F6" stroke="#1976D2" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="64" cy="74" rx="42" ry="34" fill="#90CAF9" stroke="#1976D2" stroke-width="4"/>
      <path d="M28,68 Q44,50 70,58 Q52,74 28,68Z" fill="#64B5F6" stroke="#1976D2" stroke-width="2"/>
      <circle cx="82" cy="40" r="28" fill="#90CAF9" stroke="#1976D2" stroke-width="4"/>
      <circle cx="90" cy="34" r="9" fill="white"/>
      <circle cx="92" cy="34" r="5.5" fill="#1A1A1A"/>
      <circle cx="94" cy="32" r="2" fill="white"/>
      <path d="M106,42 L120,47 L106,52Z" fill="#FF8F00" stroke="#E65100" stroke-width="2"/>
      <ellipse cx="80" cy="47" rx="9" ry="7" fill="#EF9A9A" opacity="0.7"/>
    </g>
  `,

  fish: `
    <defs><filter id="f-fis" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-fis)">
      <path d="M20,60 L2,36 L14,60 L2,84Z" fill="#4DB6AC" stroke="#00897B" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="68" cy="60" rx="46" ry="32" fill="#4DD0E1" stroke="#00ACC1" stroke-width="4"/>
      <ellipse cx="64" cy="68" rx="30" ry="16" fill="#E0F7FA" opacity="0.5"/>
      <path d="M50,26 Q68,12 86,26 L84,32 Q66,18 52,32Z" fill="#4DD0E1" stroke="#00ACC1" stroke-width="2"/>
      <circle cx="96" cy="54" r="11" fill="white"/>
      <circle cx="98" cy="53" r="7" fill="#1A1A1A"/>
      <circle cx="100" cy="51" r="2.5" fill="white"/>
      <ellipse cx="50" cy="46" rx="7" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-15 50 46)"/>
    </g>
  `,

  rabbit: `
    <defs><filter id="f-rab" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="e"/>
      <feFlood flood-color="white" result="w"/>
      <feComposite in="w" in2="e" operator="in" result="o"/>
      <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#f-rab)">
      <ellipse cx="40" cy="26" rx="13" ry="30" fill="#FCE4EC" stroke="#F48FB1" stroke-width="3.5"/>
      <ellipse cx="80" cy="26" rx="13" ry="30" fill="#FCE4EC" stroke="#F48FB1" stroke-width="3.5"/>
      <ellipse cx="40" cy="26" rx="7" ry="22" fill="#F48FB1"/>
      <ellipse cx="80" cy="26" rx="7" ry="22" fill="#F48FB1"/>
      <circle cx="60" cy="68" r="42" fill="#FCE4EC" stroke="#F48FB1" stroke-width="4"/>
      <circle cx="35" cy="80" r="14" fill="#F8BBD9" opacity="0.7"/>
      <circle cx="85" cy="80" r="14" fill="#F8BBD9" opacity="0.7"/>
      <circle cx="46" cy="62" r="9" fill="white"/>
      <circle cx="74" cy="62" r="9" fill="white"/>
      <circle cx="47" cy="62" r="6" fill="#AD1457"/>
      <circle cx="75" cy="62" r="6" fill="#AD1457"/>
      <circle cx="49" cy="60" r="2.5" fill="white"/>
      <circle cx="77" cy="60" r="2.5" fill="white"/>
      <ellipse cx="60" cy="76" rx="5" ry="4.5" fill="#AD1457"/>
      <path d="M60,80 Q53,88 49,86" fill="none" stroke="#AD1457" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60,80 Q67,88 71,86" fill="none" stroke="#AD1457" stroke-width="2.5" stroke-linecap="round"/>
    </g>
  `,
}
