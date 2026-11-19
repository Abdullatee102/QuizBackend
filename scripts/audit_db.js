import { pool } from '../dist/db/index.js';

async function main() {
  const q = await pool.query(`
    SELECT c.code, c.title, c.level,
           count(q.id) FILTER (WHERE q.type = 'cbt') as cbt_count,
           count(q.id) FILTER (WHERE q.type = 'theory') as theory_count
    FROM courses c
    LEFT JOIN questions q ON c.id = q.course_id
    GROUP BY c.id, c.code, c.title, c.level
    ORDER BY c.code
    LIMIT 30
  `);
  console.log(q.rows);
  await pool.end();
}

main().catch(console.error);
