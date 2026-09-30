// docs/design-references.json -> docs/design-references.md + public/references.html
// 실행: node scripts/build-references.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const d = JSON.parse(fs.readFileSync(path.join(root, 'docs/design-references.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const colorOf = (s) => (String(s).match(/(rgba?\([^)]*\)|oklch\([^)]*\))/) || [])[1] || '';

// ---- Markdown ----
let md = `# 디자인 참고 서비스 ${d.items.length}곳\n\n`;
md += `측정일: ${d.measured_on}\n\n**측정 방법** ${d.method}\n\n`;
md += `## 조사로 얻은 원칙\n\n${d.findings.map((f) => `- ${f}`).join('\n')}\n\n`;
md += `## 채택하지 않은 것\n\n${d.not_adopted.map((f) => `- ${f}`).join('\n')}\n\n`;
md += `## 이 앱에 적용한 값\n\n| 항목 | 값 | 근거 |\n|---|---|---|\n`;
md += `| 배경 | #F5F3EE (다크 #161512) | 따뜻한 오프화이트: Todoist, Toggl |
| 카드 | #FFFFFF | 대부분의 서비스 |
| 글자 | #1F1D19 | Sunsama #202228, Basecamp #25221E |
| 포인트 | 잉크 버튼 + 단계색 3개 (PLAN #3547A8 / DO #0B6E62 / SEE #7A3B8F) | Asana, Basecamp, Tweek 잉크 버튼 |
| 서체 | Pretendard Variable → Noto Sans KR → 맑은 고딕 | Inter 계열이 가장 많음 |
| 목록 | 흰 카드 하나 안에 헤어라인 구분 | Things, Todoist, Tweek |
| 집계 | 큰 숫자 + 눌러서 근거 보기 | Toggl, Clockify, RescueTime |

`;
md += `## 서비스별 기록\n\n| # | 서비스 | 종류 | 배경 | 글자 | 포인트/버튼 | 글꼴 | 가져온 점 |\n|---|---|---|---|---|---|---|---|\n`;
d.items.forEach((it, i) => { md += `| ${i + 1} | [${it.name}](${it.url}) | ${it.kind} | ${it.bg} | ${it.fg} | ${it.accent} | ${it.font} | ${it.take} |\n`; });
fs.writeFileSync(path.join(root, 'docs/design-references.md'), md);

// ---- HTML (앱 안에서 볼 수 있는 참고 페이지) ----
const rows = d.items.map((it, i) => `<li class="ref">
  <div class="ref-head"><span class="ref-no">${i + 1}</span><h3><a href="${esc(it.url)}" rel="noopener noreferrer" target="_blank">${esc(it.name)}</a></h3><span class="chip">${esc(it.kind)}</span></div>
  <dl class="ref-dl">
    <div><dt>배경</dt><dd><i class="sw" data-color="${esc(colorOf(it.bg))}"></i>${esc(it.bg)}</dd></div>
    <div><dt>글자</dt><dd><i class="sw" data-color="${esc(colorOf(it.fg))}"></i>${esc(it.fg)}</dd></div>
    <div><dt>포인트</dt><dd><i class="sw" data-color="${esc(colorOf(it.accent))}"></i>${esc(it.accent)}</dd></div>
    <div><dt>글꼴</dt><dd>${esc(it.font)}</dd></div>
  </dl>
  <p class="small">${esc(it.take)}</p>
</li>`).join('\n');
const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>디자인 참고 서비스 · 플랜두씨 다이어리</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/references.css">
</head>
<body>
  <main class="wrap refs">
    <p><a href="/">← 다이어리로 돌아가기</a></p>
    <h1>디자인 참고 서비스 ${d.items.length}곳</h1>
    <p class="muted">측정일 ${esc(d.measured_on)}. ${esc(d.method)}</p>
    <section class="card"><h2>조사로 얻은 원칙</h2><ul>${d.findings.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      <h3>채택하지 않은 것</h3><ul>${d.not_adopted.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></section>
    <h2>서비스별 기록</h2>
    <ol class="ref-list">
${rows}
    </ol>
  </main>
  <script src="/references.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'public/references.html'), html);
fs.writeFileSync(path.join(root, 'public/references.js'), "document.querySelectorAll('.sw').forEach((el) => { const c = el.dataset.color; if (c) el.style.background = c; else el.classList.add('none'); });\n");
fs.writeFileSync(path.join(root, 'public/references.css'), `.refs { padding-top: var(--s5); padding-bottom: var(--s6); }
.refs > * + * { margin-top: var(--s4); }
.refs ul { padding-left: var(--s4); }
.ref-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--s3); }
.ref { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--s3) var(--s4); }
.ref-head { display: flex; align-items: center; gap: var(--s2); flex-wrap: wrap; }
.ref-no { color: var(--muted-fg); font-variant-numeric: tabular-nums; min-width: 1.5em; }
.ref-dl { margin: var(--s2) 0; display: grid; gap: var(--s1); font-size: 0.875rem; }
.ref-dl div { display: grid; grid-template-columns: 52px 1fr; gap: var(--s2); align-items: start; }
.ref-dl dt { color: var(--muted-fg); }
.ref-dl dd { margin: 0; }
.sw { display: inline-block; width: 14px; height: 14px; border-radius: 4px; border: 1px solid var(--border); vertical-align: -2px; margin-right: 6px; }
.sw.none { background: repeating-linear-gradient(45deg, var(--muted), var(--muted) 3px, var(--card) 3px, var(--card) 6px); }
@media (max-width: 700px) { .ref-list { grid-template-columns: 1fr; } }
`);
console.log('items', d.items.length);
