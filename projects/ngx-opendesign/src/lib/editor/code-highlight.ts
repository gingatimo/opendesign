// Tô màu cú pháp TỐI GIẢN bằng regex (0 thư viện ngoài). Trả về HTML đã ESCAPE an toàn (& < >), token
// bọc trong <span class="g-tok-...">. Đủ dùng cho snippet/config; muốn xịn hơn thì truyền hàm
// `highlighter` riêng vào GCodeEditor (vd. gói Prism của consumer) — không nhồi vào core.

export type GCodeLanguage = 'plain' | 'javascript' | 'typescript' | 'json' | 'css' | 'html';

interface Rule {
  type: string;
  re: RegExp;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const JS_KEYWORDS =
  'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|' +
  'implements|interface|type|enum|import|export|from|as|default|new|delete|typeof|instanceof|in|of|' +
  'await|async|yield|public|private|protected|readonly|static|abstract|get|set|null|undefined|true|' +
  'false|this|super|void|never|any|unknown|string|number|boolean|throw|try|catch|finally';

const JS_RULES: Rule[] = [
  { type: 'comment', re: /\/\/[^\n]*|\/\*[\s\S]*?\*\// },
  { type: 'string', re: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/ },
  { type: 'number', re: /\b0[xX][0-9a-fA-F]+\b|\b\d[\d_]*(?:\.\d+)?\b/ },
  { type: 'keyword', re: new RegExp(`\\b(?:${JS_KEYWORDS})\\b`) },
  { type: 'fn', re: /\b[A-Za-z_$][\w$]*(?=\s*\()/ },
];

const JSON_RULES: Rule[] = [
  { type: 'property', re: /"(?:\\.|[^"\\])*"(?=\s*:)/ },
  { type: 'string', re: /"(?:\\.|[^"\\])*"/ },
  { type: 'number', re: /-?\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b/ },
  { type: 'keyword', re: /\b(?:true|false|null)\b/ },
];

const CSS_RULES: Rule[] = [
  { type: 'comment', re: /\/\*[\s\S]*?\*\// },
  { type: 'string', re: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/ },
  {
    type: 'number',
    re: /#[0-9a-fA-F]{3,8}\b|-?\b\d[\d_]*(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?\b/,
  },
  { type: 'keyword', re: /@[\w-]+|\b[a-z-]+(?=\s*:)/ },
];

const HTML_RULES: Rule[] = [
  { type: 'comment', re: /<!--[\s\S]*?-->/ },
  { type: 'string', re: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/ },
  { type: 'keyword', re: /<\/?[A-Za-z][\w-]*|\/?>/ },
];

const LANGS: Record<GCodeLanguage, Rule[]> = {
  plain: [],
  javascript: JS_RULES,
  typescript: JS_RULES,
  json: JSON_RULES,
  css: CSS_RULES,
  html: HTML_RULES,
};

/** Tô màu `code` theo `language`, trả HTML đã escape (token bọc span). Ngôn ngữ lạ → chỉ escape. */
export function highlightCode(code: string, language: GCodeLanguage): string {
  const rules = LANGS[language] ?? [];
  if (!rules.length) return esc(code);

  // Gộp mọi rule thành một regex quét một lượt (token trước "nuốt" phần bên trong, tránh tô lồng).
  const master = new RegExp(rules.map((r, i) => `(?<g${i}>${r.re.source})`).join('|'), 'g');
  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = master.exec(code)) !== null) {
    if (m[0].length === 0) {
      master.lastIndex++;
      continue;
    }
    out += esc(code.slice(last, m.index));
    const gi = rules.findIndex((_, i) => m!.groups?.[`g${i}`] !== undefined);
    out += `<span class="g-tok-${rules[gi].type}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  out += esc(code.slice(last));
  return out;
}
