// Vercel 서버리스 진입점: 모든 /api/*, /contracts/* 요청을 lib/server.js의 handler가 처리한다.
module.exports = require('../lib/server.js').handler;
