const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'volunteer_app'
});

pool.query('SELECT NOW()')
  .then(res => console.log('Connected!', res.rows))
  .catch(err => console.error('Error:', err));
