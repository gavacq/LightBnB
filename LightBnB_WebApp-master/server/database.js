const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require("pg");

// Connect to DB
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123',
  port: 5432
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(
    `SELECT *
      FROM users
      WHERE email = $1`, [email])
    .then((result) => {
      console.log('getUserWithEmail: ', result.rows);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else null;
    })
    .catch((err) => console.log(err.message));
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(
    `SELECT *
      FROM users
      WHERE id = $1`, [id])
    .then((result) => {
      console.log('getUserWithId: ', result.rows);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else null;
    })
    .catch((err) => console.log(err.message));
};

exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(
    `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}') RETURNING *`)
    .then((result) => {
      console.log('addUser: ', result.rows);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else null;
    })
    .catch((err) => console.log(err.message));
}
;

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(
    `SELECT r.*, p.*, AVG(pr.rating) AS average_rating
      FROM properties p
        JOIN reservations r ON r.property_id = p.id
        JOIN property_reviews pr ON p.id = pr.property_id
        WHERE r.guest_id = $1
        GROUP BY r.id, p.id
        LIMIT $2`, [guest_id, limit]
  )
    .then(result => result.rows)
    .catch(e => console.log(e));
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  const queryFilters = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryFilters.push(`owner_id = $${queryParams.length}`);
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryFilters.push(`city LIKE $${queryParams.length}`);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryFilters.push(`properties.cost_per_night/100 >= $${queryParams.length}`);
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryFilters.push(`properties.cost_per_night/100 <= $${queryParams.length}`);
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryFilters.push(`property_reviews.rating >= $${queryParams.length}`);
  }

  // concatenate filters
  if (queryFilters.length > 0) {
    queryString += 'WHERE ' + queryFilters.join(' AND ');
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => console.log(err.message));
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // console.log('property obj', property);
  
  const createParameterIds = property => {
    return Object.keys(property).reduce((acc, e) => {
      acc.push(`$${acc.length + 1}`);
    
      return acc;
    }, []).join(',');
  };
  
  return pool.query(
    `INSERT INTO properties (${Object.keys(property).join(',')})
      VALUES (${createParameterIds(property)})
      RETURNING *`, [...Object.values(property)])
    .then(result => result.rows)
    .catch(e => console.log(e));
};

exports.addProperty = addProperty;
