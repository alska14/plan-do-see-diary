# 디자인 참고 서비스 34곳

측정일: 2026-09-30

**측정 방법** Claude 내장 브라우저로 각 서비스의 공개 첫 화면을 열고, document.body와 첫 화면의 큼직한 버튼/링크에서 getComputedStyle로 배경색·글자색·버튼색·글꼴을 읽었다. oklch로 나온 값은 원문 그대로 적었다. 로그인 뒤 앱 화면은 보지 않았고, 값은 소개(랜딩) 페이지 기준이다. '투명'은 body 배경이 지정되지 않아 흰색 바탕 위에 그려진다는 뜻이고, '미측정'은 스크립트로 값을 읽지 못한 것이다.

## 조사로 얻은 원칙

- 다크 기본 4곳(Linear, Morgen, Superlist, Obsidian)을 빼면 나머지는 흰색·오프화이트·회청색 같은 중립 배경이다. → 배경은 중립색으로, 다크는 시스템 설정을 따르게 한다.
- 포인트 색은 대부분 한 가지뿐이다. 파랑·인디고 계열이 가장 많고(TickTick, Notion, Trello, Motion, Microsoft To Do, Day One, Any.do, Clockify, Linear, Reclaim, monday), 검정·잉크색 버튼이 그다음이다(Asana, ClickUp, Basecamp, Tweek). → 화면마다 포인트 하나: 잉크 버튼 + 단계색(PLAN #3547A8 / DO #0B6E62 / SEE #7A3B8F). 블루는 11곳이 써서 차별화가 안 되어 주색에서 제외, 따뜻한 오프화이트 바탕(Todoist·Toggl)과 잉크 버튼(Asana·Basecamp·Tweek)을 채택
- 글자색은 순검정이 아니라 잉크색이다(#202228, #25221E, #091E42, #2A3135). → 본문 글자는 #1F1D19.
- 밝은 색 버튼(Marvin, Morgen, RescueTime, Journey)은 글자를 어둡게 한다. → 대비를 색이 아니라 수치로 확인한다.
- 서체는 Inter 계열이 가장 많다(Notion, Linear, Motion, Any.do, Clockify, Morgen, Structured, TickTick). → 한글을 함께 쓰는 Pretendard(Inter 기반 한글 서체)를 쓰고 Noto Sans KR·맑은 고딕을 예비로 둔다.
- 시간 기록 서비스(Toggl, Clockify, RescueTime)는 집계를 큰 숫자로 먼저 보여 준다. → 돌아보기 집계 카드는 큰 숫자 + 눌러서 근거 보기.
- 할 일 앱(Things, Todoist, Tweek)은 행마다 상자를 두르지 않고 헤어라인으로 나눈다. → 목록은 흰 카드 하나 안에 헤어라인으로 구분한다.

## 채택하지 않은 것

- Habitica(게임화 색), Daylio(둥근 서체), Structured(파스텔 코랄), Journey(초록 버튼)는 이 과제의 '계획을 어디서 자주 틀리는지 보게 하는 도구' 성격과 맞지 않아 참고만 하고 채택하지 않았다.

## 이 앱에 적용한 값

| 항목 | 값 | 근거 |
|---|---|---|
| 배경 | #F5F3EE (다크 #161512) | 따뜻한 오프화이트: Todoist, Toggl |
| 카드 | #FFFFFF | 대부분의 서비스 |
| 글자 | #1F1D19 | Sunsama #202228, Basecamp #25221E |
| 포인트 | 잉크 버튼 + 단계색 3개 (PLAN #3547A8 / DO #0B6E62 / SEE #7A3B8F) | Asana, Basecamp, Tweek 잉크 버튼 |
| 서체 | Pretendard Variable → Noto Sans KR → 맑은 고딕 | Inter 계열이 가장 많음 |
| 목록 | 흰 카드 하나 안에 헤어라인 구분 | Things, Todoist, Tweek |
| 집계 | 큰 숫자 + 눌러서 근거 보기 | Toggl, Clockify, RescueTime |

## 서비스별 기록

| # | 서비스 | 종류 | 배경 | 글자 | 포인트/버튼 | 글꼴 | 가져온 점 |
|---|---|---|---|---|---|---|---|
| 1 | [Todoist](https://todoist.com) | 할 일 | oklch(0.9945 0.0017 67.8) 따뜻한 오프화이트 | rgb(37, 34, 30) | oklch(0.6147 0.1986 30.12) 붉은색 버튼 | Graphik | 포인트 색 하나(빨강)와 넉넉한 여백, 장식 없음. 목록 중심 화면. |
| 2 | [Things](https://culturedcode.com/things/) | 할 일 | rgb(242, 245, 247) | rgb(48, 51, 54) | 파랑 계열(앱 아이콘, 값은 미측정) | ui-sans-serif | 차가운 회청색 배경과 큼직한 둥근 체크박스. 이 앱의 배경색 기준으로 삼음. |
| 3 | [Sunsama](https://www.sunsama.com) | 하루 계획 | rgb(255, 255, 255) (첫 화면은 크림→피치 그라데이션) | rgb(32, 34, 40) | rgb(255, 137, 28) 주황 버튼, 검정 버튼 rgb(0, 0, 0) | DM Sans | 진한 잉크색 글자와 차분한 문구. 글자색 #202228 계열을 참고. |
| 4 | [TickTick](https://ticktick.com) | 할 일 | rgb(255, 255, 255) | rgb(0, 0, 0) | rgb(71, 114, 250) 블루 버튼 | AppestInter (Inter 계열) | 흰 배경에 블루 하나. |
| 5 | [Notion](https://www.notion.com) | 노트·문서 | rgb(255, 255, 255) | rgba(0, 0, 0, 0.95) | rgb(0, 117, 222) 블루 버튼 | NotionInter | 블루 하나, 글자는 순검정이 아닌 95% 불투명. |
| 6 | [Linear](https://linear.app) | 이슈 관리 | rgb(8, 9, 10) 다크 | rgb(247, 248, 248) | rgb(94, 106, 210) 인디고 버튼 | Inter Variable | 다크 모드는 인디고 하나로 통일. 다크 테마 참고. |
| 7 | [Asana](https://asana.com) | 프로젝트 관리 | 투명(흰색) | rgb(100, 111, 121) | rgb(13, 13, 13) 검정 버튼, 보조 rgb(243, 243, 243) | TWK Lausanne | 버튼을 검정으로 두고 색은 절제. |
| 8 | [Trello](https://trello.com) | 칸반 | rgb(255, 255, 255) | rgb(9, 30, 66) | rgb(0, 101, 255) 블루 버튼 | Charlie Text | 짙은 남색 잉크 글자와 블루 버튼. |
| 9 | [ClickUp](https://clickup.com) | 프로젝트 관리 | 투명(흰색) | rgb(41, 45, 52) | rgb(32, 32, 32) 검정 버튼 | Plus Jakarta Sans | 진한 회색 글자, 검정 버튼. |
| 10 | [Any.do](https://www.any.do) | 할 일 | rgb(255, 255, 255) | rgb(115, 115, 115) | rgb(0, 131, 255) 블루 링크 | Inter | '단순한 할 일 목록'을 내세우며 색은 블루 하나. |
| 11 | [Microsoft To Do](https://www.microsoft.com/ko-kr/microsoft-365/microsoft-to-do-list-app) | 할 일 | rgb(255, 255, 255) | rgb(0, 0, 0) | rgb(24, 90, 189) 블루 버튼 | Segoe UI | 한국어 화면에서도 블루 하나. |
| 12 | [Amazing Marvin](https://amazingmarvin.com) | 할 일 | rgb(255, 255, 255) | rgb(17, 24, 39) | rgb(247, 218, 136) 버터 옐로 버튼(글자는 어두운색) | Outfit | 밝은 색 버튼에는 어두운 글자를 써서 대비를 확보. |
| 13 | [Akiflow](https://akiflow.com) | 할 일·캘린더 | rgb(248, 250, 252) | rgb(0, 0, 0) | rgb(85, 0, 151) 보라 | sans-serif (웹폰트 미확인) | 거의 흰 회청색 배경 #F8FAFC. |
| 14 | [Motion](https://www.usemotion.com) | AI 일정 | oklch(1 0 0) 흰색 | rgb(0, 0, 0) | rgb(44, 119, 231) 블루 버튼 | Inter | 블루 하나. |
| 15 | [Reclaim](https://reclaim.ai) | AI 캘린더 | rgb(255, 255, 255) | rgb(24, 29, 37) | rgb(85, 98, 235) 인디고 버튼 | Poppins | 인디고 하나와 잉크색 글자 rgb(24, 29, 37). |
| 16 | [Habitica](https://habitica.com) | 습관(게임화) | rgb(249, 249, 249) | rgb(78, 74, 87) | rgb(154, 98, 255) 보라, 진보라 rgb(79, 42, 147) | Roboto | 게임 요소가 강해 색이 화려함. 이 과제에는 맞지 않아 반면교사로 삼음. |
| 17 | [Strides](https://stridesapp.com) | 목표·습관 | rgb(255, 255, 255) | rgb(51, 51, 51) | 미측정 | Avenir Next | 목표를 성공 기준과 함께 적게 하는 구조(SMART). 계획 폼의 '성공 기준' 항목 참고. |
| 18 | [Morgen](https://www.morgen.so) | 하루 계획 | rgb(25, 26, 35) 다크 | rgb(203, 204, 204) | rgb(243, 194, 106) 앰버 버튼(글자는 어두운색) | Inter Variable | 다크 배경 위 앰버 하나. |
| 19 | [Day One](https://dayoneapp.com) | 일기 | rgb(255, 255, 255) | rgb(51, 59, 64) | rgb(30, 117, 174) 블루 버튼 | Avenir Next | 일기 앱도 흰 배경과 차분한 블루. |
| 20 | [Daylio](https://daylio.net) | 기분 일기 | rgb(237, 246, 255) 연한 하늘색 | rgb(77, 98, 116) | rgb(51, 51, 51) 진회색 버튼 | Nunito | 둥근 서체로 부드러운 인상. 이 앱은 읽기 쉬운 서체를 우선해 채택하지 않음. |
| 21 | [Toggl Track](https://toggl.com/track/) | 시간 기록 | rgb(248, 247, 241) 따뜻한 오프화이트 | rgb(54, 49, 55) | rgb(44, 19, 56) 짙은 자주 버튼 | Aeonik | 시간 집계를 큰 숫자로 보여 주는 방식. 돌아보기 집계 카드 참고. |
| 22 | [Clockify](https://clockify.me) | 시간 기록 | 투명(흰색) | rgb(0, 0, 0) | rgb(2, 135, 197) 블루 버튼 | Inter | 실제 시간 기록과 보고서 구조. |
| 23 | [monday.com](https://monday.com) | 프로젝트 관리 | 투명(흰색) | rgb(51, 51, 51) | rgb(97, 97, 255) 인디고 버튼 | Poppins | 한국어 페이지도 인디고 하나. |
| 24 | [Basecamp](https://basecamp.com) | 프로젝트 관리 | oklch(1 0 0) 흰색 | oklch(0.3209 0.0204 233.83) 짙은 슬레이트 | 글자색과 같은 슬레이트 버튼 | Graphik | 버튼과 글자를 같은 잉크색으로 통일하는 절제된 방식. |
| 25 | [Workflowy](https://workflowy.com) | 개요 노트 | rgb(255, 255, 255) | rgb(42, 49, 53) | rgb(73, 186, 242) 하늘색 버튼 | Open Sans | 한국어 페이지, 목록 중심의 단순한 구조. |
| 26 | [Obsidian](https://obsidian.md) | 노트 | 투명(어두운 페이지) | rgb(238, 238, 238) | rgb(124, 58, 237) 보라 버튼 | ui-sans-serif | 다크 배경 위 보라 하나. |
| 27 | [Bear](https://bear.app) | 노트 | 투명 | rgb(68, 68, 68) | 미측정 | bearsans (자체 서체) | 본문 글자를 #444 회색으로 낮춰 눈이 편함. |
| 28 | [Structured](https://structured.app) | 하루 계획 | rgb(255, 167, 160) 코랄 | rgb(0, 0, 0) | rgb(92, 133, 168) 더스티 블루 버튼 | Inter | 하루를 시간 순서 카드로 배치. 파스텔 톤은 참고만 하고 채택하지 않음. |
| 29 | [Tweek](https://tweek.so) | 주간 플래너 | rgb(255, 255, 255) | rgb(0, 0, 0) | rgb(0, 0, 0) 검정 버튼(글자 rgb(237, 234, 227)) | SuisseIntl | 주간 단위 플래너, 장식 없이 선과 글자만 사용. |
| 30 | [Superlist](https://www.superlist.com) | 할 일·노트 | rgb(24, 24, 36) 다크 네이비 | 미측정 | rgb(38, 37, 59) 패널 | sans-serif (웹폰트 미확인) | 다크 네이비 배경. |
| 31 | [Amplenote](https://www.amplenote.com) | 노트·할 일 | rgb(255, 255, 255) | rgb(47, 55, 64) | rgb(255, 178, 56) 앰버를 14% 불투명 배경으로만 사용 | Roboto | 포인트 색을 옅은 배경으로만 써서 강조를 절제. |
| 32 | [RescueTime](https://www.rescuetime.com) | 시간 기록 | rgb(254, 254, 254) | rgb(68, 66, 63) | rgb(181, 210, 255) 연한 파랑 버튼(글자는 검정) | Nunito | 연한 배경색 버튼에는 검정 글자를 써서 대비를 확보. |
| 33 | [Journey](https://journey.cloud) | 일기 | 투명 | rgb(0, 0, 0) | rgb(37, 211, 102) 초록 버튼(글자는 검정) | Gotham Rounded | 일기 앱이지만 초록 버튼. 이 앱의 포인트 색과는 방향이 달라 채택하지 않음. |
| 34 | [토스](https://toss.im) | 국내 서비스(한글 UI) | 미측정 (body 배경 투명) | rgb(0, 0, 0) | 미측정 | Toss Product Sans | 한글 화면의 서체 크기와 줄 간격 감각을 참고. 색은 측정하지 못함. |
