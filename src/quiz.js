import pg from "pg";
const { Client } = pg;

// Setting Up Postgres in Node
const client = new Client({
  // Your postgres user
  user: "marycastorani",
  // Postgres password (was set as null during orientation)
  password: null,
  host: "localhost",
  port: 5432,
  database: "cupcakes",
});

await client.connect();

// Problem 01
export const problem01 = await client.query(`
  SELECT * FROM cupcakes
  WHERE name = 'vanilla';
`);
console.log('-- Problem 01 --');
console.log(problem01?.rows);

// Problem 02
export const problem02 = await client.query(`
  SELECT id
  FROM orders
  WHERE customer_id IN (
  SELECT id
  FROM customers
  WHERE fname = 'Elizabeth' AND lname = 'Crocker
  );
`);

console.log('-- Problem 02 --');
console.log(problem02?.rows);

// Problem 03
export const problem03 = await client.query(`
  SELECT SUM(num_cupcakes) AS sum
  FROM orders
  WHERE processed = 'f';
`)
console.log('-- Problem 03 --');
console.log(problem03?.rows);

// Problem 04
export const problem04 = await client.query(`
  SELECT c.name, (SUM(o.num_cupcakes),0) AS sum
  FROM cupcakes c
  LEFT JOIN orders o ON c.id = o.cupcake_id
  GROUP BY c.name
  ORDER BY c.name;
`)
console.log('---Problem 04---')
console.log(problem04?.rows)

// Problem 05
export const problem05 = await client.query(`
SELECT c.email, SUM(o.num_cupcakes) AS total
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.email
ORDER BY total DESC;
`)
console.log('-- Problem 05 --');
console.log(problem05?.rows);

// Problem 06
export const problem06 = await client.query(`
SELECT DISTINCT c.fname, c.lname, c.email
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN cupcakes cp ON o.cupcake_id = cp.id
WHERE o.processed = 't' AND cp.name = 'funfetti';
`)
console.log('-- Problem 06 --');
console.log(problem06?.rows);

client.end();
