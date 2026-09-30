// 실행: node tests/api.test.js   (임시 DB 사용, 실제 데이터에 영향 없음)
const os = require('os'), path = require('path'), fs = require('fs');
const tmp = path.join(os.tmpdir(), `pds-test-${Date.now()}.db`);
process.env.DB_PATH = tmp; // TURSO_DATABASE_URL이 없으므로 로컬 file: DB(임시 파일)로 동작
delete process.env.TURSO_DATABASE_URL;
const { server, db } = require('../server.js');
let pass = 0, failN = 0;
const ok = (c, m) => { if (c) pass++; else { failN++; console.log('FAIL', m); } };
server.listen(0, async () => {
  const B = `http://localhost:${server.address().port}`;
  const j = async (m, p, body) => { const r = await fetch(B + p, { method: m, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }); return { s: r.status, d: await r.json().catch(() => null), r }; };
  try {
    const today = (await j('GET', '/api/meta')).d.today;
    const add = (n, d) => new Date(Date.parse(n + 'T00:00:00Z') + d * 864e5).toISOString().slice(0, 10);
    // 계획 C04~C08
    const p = (await j('POST', '/api/plans', { title: '아침 운동', period_type: 'week', start_date: add(today, -3), end_date: add(today, 3), priority: 1, success_criteria: '주 4회', est_minutes: 240 })).d;
    ok(p.id && p.period_type === 'week' && p.priority === 1 && p.success_criteria === '주 4회' && p.est_minutes === 240, 'C04-07 저장');
    const e1 = await j('PATCH', `/api/plans/${p.id}`, { title: '아침 운동 (수정)', est_minutes: 300 });
    ok(e1.d.id === p.id && e1.d.title === '아침 운동 (수정)', 'C08 id 유지');
    ok(e1.d.original.title === '아침 운동' && e1.d.original.est_minutes === 240, 'C08 처음 계획 보존');
    const rev = (await j('GET', `/api/plans/${p.id}/revisions`)).d.items;
    ok(rev.length === 2 && rev.some(r => r.field === 'est_minutes' && r.old_value === '240' && r.new_value === '300'), 'C08 이력 old/new');
    ok((await j('POST', '/api/plans', { title: '', period_type: 'x' })).s === 422, '검증 422');
    ok((await j('POST', '/api/plans', { title: 'a', period_type: 'day', start_date: '2026-02-30', end_date: '2026-03-01', priority: 2, success_criteria: 'a', est_minutes: 1 })).s === 422, '없는 날짜 거부');
    // 할 일 C09~C20
    const mk = async (o) => (await j('POST', '/api/todos', { plan_id: p.id, ...o })).d;
    const t1 = await mk({ title: '스트레칭', due_date: add(today, -1), priority: 2, tags: '운동, 아침', est_minutes: 10 });
    const t2 = await mk({ title: '달리기', due_date: add(today, 1), priority: 1, tags: ['운동'], est_minutes: 30 });
    const t3 = await mk({ title: '식단 기록', due_date: add(today, 1), priority: 1, est_minutes: 5, memo: '<b>x</b>' });
    const t4 = await mk({ title: '물 마시기', priority: 3, est_minutes: 0 });
    const t5 = await mk({ title: '수면 체크', due_date: add(today, 2), priority: 2, est_minutes: 5 });
    ok(t1.tags.join() === '아침,운동' && t1.due_date && t1.priority === 2 && t1.est_minutes === 10, 'C14-17 저장');
    ok((await j('PATCH', `/api/todos/${t4.id}`, { title: '물 2L 마시기' })).d.title === '물 2L 마시기', 'C10 수정');
    ok((await j('GET', '/api/todos?q=%EC%8B%9D%EB%8B%A8')).d.items.length === 1, 'C18 검색');
    ok((await j('GET', '/api/todos?tag=' + encodeURIComponent('운동'))).d.items.length === 2, 'C19 태그 거르기');
    ok((await j('GET', '/api/todos?q=%25')).d.items.length === 0, '검색 와일드카드 이스케이프');
    const s = (await j('GET', '/api/todos?sort=due')).d;
    ok(s.items.map(t => t.id).join() === [t1.id, t2.id, t3.id, t5.id, t4.id].join(), 'C20 정렬 due(동률 우선순위→id, null 마지막)');
    ok(s.sort_label && s.tie_rule, 'C20 기준 문구');
    // 완료 C11,C12,C21,C22
    const c1 = (await j('POST', `/api/todos/${t2.id}/complete`)).d;
    const c2 = (await j('POST', `/api/todos/${t2.id}/complete`)).d;
    await Promise.all([j('POST', `/api/todos/${t3.id}/complete`), j('POST', `/api/todos/${t3.id}/complete`)]);
    ok(c1.newly_completed && !c2.newly_completed, 'C21 두 번째는 새 완료 아님');
    ok(Number((await db.execute({ sql: 'SELECT COUNT(*) c FROM completions WHERE todo_id IN (?,?)', args: [t2.id, t3.id] })).rows[0].c) === 2, 'C21 완료 기록 1건씩');
    let r = (await j('GET', `/api/review?period=week&date=${today}`)).d;
    ok(r.counts.done === 2, 'C22 완료 수 정확히');
    let threw = false; try { await db.execute({ sql: "INSERT INTO completions(todo_id,completed_at) VALUES (?, 'x')", args: [t2.id] }); } catch { threw = true; }
    ok(threw, 'C21 DB 유니크 제약');
    await j('POST', `/api/todos/${t3.id}/reopen`);
    ok((await j('GET', `/api/review?period=week&date=${today}`)).d.counts.done === 1, 'C12 되돌리기 반영');
    await j('POST', `/api/todos/${t3.id}/complete`);
    ok(Number((await db.execute({ sql: 'SELECT COUNT(*) c FROM completions WHERE todo_id=? AND reopened_at IS NULL', args: [t3.id] })).rows[0].c) === 1, '재완료 후 유효 완료 1건');
    ok((await j('DELETE', `/api/todos/${t5.id}`)).s === 200 && (await j('GET', '/api/todos')).d.items.length === 4, 'C13 삭제');
    // 실행 기록 C23~C27
    const s0 = new Date(Date.now() - 3600e3).toISOString(), e0 = new Date().toISOString();
    const before = (await j('GET', '/api/plans')).d.items[0].est_minutes;
    const run = (await j('POST', `/api/todos/${t1.id}/runs`, { started_at: s0, ended_at: e0, actual_minutes: '', blocker_reason: '비가 와서' })).d;
    ok(run.actual_minutes === 60 && run.blocker_reason === '비가 와서' && run.started_at && run.ended_at, 'C23-26 실행 기록');
    ok((await j('GET', '/api/plans')).d.items[0].est_minutes === before && (await j('GET', '/api/todos')).d.items.find(t => t.id === t1.id).est_minutes === 10, 'C27 계획 값 안 덮임');
    ok((await j('POST', `/api/todos/${t2.id}/runs`, { started_at: e0, ended_at: s0 })).s === 422, '끝<시작 거부');
    await j('POST', `/api/todos/${t2.id}/runs`, { started_at: s0, ended_at: e0, actual_minutes: 20 });
    // 돌아보기 C28~C33
    r = (await j('GET', `/api/review?period=week&date=${today}`)).d;
    const rec = async (m) => (await j('GET', `/api/review/records?period=week&date=${today}&metric=${m}`)).d.items;
    ok(r.counts.plans === 1 && (await rec('plans')).length === 1, 'C28 계획 수');
    ok(r.counts.todos === 4 && (await rec('todos')).length === 4, 'C28 할일 수');
    ok(r.counts.done === (await rec('done')).length && r.counts.done === 2, 'C29 완료 수');
    ok(r.counts.delayed === 1 && (await rec('delayed'))[0].id === t1.id, 'C30 지연(완료 아님+마감<오늘)');
    ok(r.counts.blocked === 1 && (await rec('blocked'))[0].id === t1.id, 'C31 막힘');
    ok(r.minutes.estimated === 45 && r.minutes.actual === 80 && r.minutes.diff === 35, `C32 예상/실제/차이 ${JSON.stringify(r.minutes)}`);
    ok((await rec('actual')).length === 2, 'C83 실제 근거');
    await j('POST', `/api/todos/${t1.id}/complete`);
    ok((await j('GET', `/api/review?period=week&date=${today}`)).d.counts.delayed === 0, 'C30 완료하면 지연 아님');
    const empty = (await j('GET', '/api/review?period=day&date=1999-01-01')).d;
    ok(empty.minutes.diff === 0 && empty.counts.plans === 0, 'C32 없으면 0');
    const carry = await j('POST', '/api/reviews/carry', { carry_over: '운동은 20분으로', period: 'week', date: today });
    ok(carry.s === 201 && carry.d.next_plan.carried_from_review_id === carry.d.review_id && carry.d.next_plan.start_date > r.range_end, 'C33 다음 계획으로 넘김');
    ok((await j('POST', '/api/reviews/carry', { carry_over: '' })).s === 422, '빈 한 줄 거부');
    // 내보내기 C36
    const ex = await fetch(B + '/api/export'); const exj = await ex.json();
    ok(/attachment/.test(ex.headers.get('content-disposition')) && exj.plans.length === 2 && exj.todos.length === 4 && exj.runs.length === 2, 'C36 내보내기');
    ok(exj.todos.find(t => t.id === t1.id).created_at.endsWith('Z'), 'C35 UTC ISO 저장');
    // 보안
    const x = (await mk({ title: '<script>alert(1)</script>' })).title;
    ok(x === '<script>alert(1)</script>', 'C57 글자 그대로 저장');
    const idx = await fetch(B + '/'); ok(idx.headers.get('content-security-policy').includes("script-src 'self'"), 'CSP');
    ok((await fetch(B + '/%2e%2e/server.js')).status === 404, '경로 탈출 차단');
    ok((await fetch(B + '/contracts/pds-schema-v2.json')).status === 200, '계약 파일 제공');
    ok((await j('GET', '/api/meta')).d.notice.startsWith('지금은 로그인이 없어'), 'C82 공개 안내');
  } catch (e) { failN++; console.log('ERR', e); }
  console.log(`\n${pass} passed, ${failN} failed`);
  server.close(); db.close();
  // Windows에서는 네이티브 핸들이 프로세스 종료 때까지 파일을 잡고 있어, 바로 지우지 못하면 종료 뒤 지우는 정리 프로세스를 띄운다.
  const files = [tmp, tmp + '-wal', tmp + '-shm', tmp + '-journal'];
  const left = files.filter((f) => { try { fs.unlinkSync(f); return false; } catch (e) { return e.code !== 'ENOENT'; } });
  if (left.length) require('child_process').spawn(process.execPath, ['-e', `const fs=require('fs');let n=0;const t=setInterval(()=>{const L=${JSON.stringify(left)}.filter(f=>{try{fs.unlinkSync(f);return false}catch(e){return e.code!=='ENOENT'}});if(!L.length||++n>50)clearInterval(t)},200)`], { detached: true, stdio: 'ignore' }).unref();
  process.exit(failN ? 1 : 0);
});
