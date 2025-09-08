import { words } from "./words";

export interface WordTip {
  type: "word" | "phrase";
  word?: string;
  root?: string;
  means?: (typeof words)[0]["means"];
  phrase?: string;
  mean?: string;
  isPattern?: boolean;
}

export interface Token {
  type: "text" | "match";
  text: string;
  tip?: WordTip;
}

// 构建普通词库和短语
const phraseMap: Map<string, WordTip> = new Map();
const patternList: { regex: RegExp; tip: WordTip }[] = [];

words.forEach((w: any) => {
  if (w.word) {
    phraseMap.set(w.word.toLowerCase(), {
      type: "word",
      word: w.word,
      root: w.root,
      means: w.means,
    });
  }
  w.means?.forEach((m: any) => {
    m.phrases?.forEach((p: any) => {
      if (!p.phrase) return;
      const tip: WordTip = {
        type: "phrase",
        phrase: p.phrase,
        mean: p.mean,
        isPattern: p.isPattern,
      };
      if (p.isPattern) {
        // 把 ... 替换成匹配 1~3 个单词的正则
        const regexStr = p.phrase.replace(/\.\.\./g, "(?:\\s+\\w+){1,3}");
        patternList.push({ regex: new RegExp(regexStr, "gi"), tip });
      } else {
        phraseMap.set(p.phrase.toLowerCase(), tip);
      }
    });
  });
});

// 转义正则
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** tokenize，支持普通短语/单词和占位符短语 */
export function tokenize(text: string): Token[] {
  const phrases = [...phraseMap.keys()].sort((a, b) => b.length - a.length);
  if (!phrases.length && patternList.length === 0)
    return [{ type: "text", text }];

  const tokens: Token[] = [];
  let remaining = text;

  while (remaining) {
    let matched = false;

    // 1️⃣ 普通短语 / 单词匹配
    for (const phrase of phrases) {
      const idx = remaining.toLowerCase().indexOf(phrase);
      if (idx >= 0) {
        if (idx > 0)
          tokens.push({ type: "text", text: remaining.slice(0, idx) });
        tokens.push({
          type: "match",
          text: remaining.slice(idx, idx + phrase.length),
          tip: phraseMap.get(phrase),
        });
        remaining = remaining.slice(idx + phrase.length);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 2️⃣ 占位符短语匹配
    let patternMatched = false;
    for (const p of patternList) {
      const match = p.regex.exec(remaining);
      if (match && match.index === 0) {
        tokens.push({ type: "match", text: match[0], tip: p.tip });
        remaining = remaining.slice(match[0].length);
        patternMatched = true;
        break;
      }
    }
    if (patternMatched) continue;

    // 3️⃣ 没匹配到就当文本处理
    tokens.push({ type: "text", text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

// 渲染 Popover 内容为多行文本
export function renderTip(tip: WordTip | undefined): string {
  if (!tip) return "";
  const lines: string[] = [];
  if (tip.type === "phrase") {
    lines.push(tip.phrase ? `${tip.phrase} - ${tip.mean}` : tip.mean || "");
  } else if (tip.type === "word") {
    lines.push(`${tip.word} (${tip.root || ""})`);
    tip.means?.forEach((m: any) => {
      lines.push(`${m.class || ""} ${m.mean} [${m.range || ""}]`);
      m.examples?.forEach((ex: any) => {
        lines.push(`例句: ${ex.example}${ex.mean ? ` - ${ex.mean}` : ""}`);
      });
      m.phrases?.forEach((p: any) => {
        lines.push(`短语: ${p.phrase} - ${p.mean}`);
      });
    });
  }
  return lines.join("\n");
}
