import pg from 'pg';
const { Pool } = pg;

const config = {
	host: 'localhost',
	port: 5432,
	database: 'm7_d1_ejercicios',
	// ¡¡¡OJO CON SU USUARIO Y CONTRASEÑA!!! Tienen que cambiarlos
	user: 'postgres',
	password: '2103',
	max: 5,
	idleTimeoutMillis: 3000,
};

const pool = new Pool(config);

const consulta = (query) => {
	return new Promise(async (resolve, reject) => {
		let client;
		try {
			client = await pool.connect();
			const result = await client.query(query);
			resolve(result.rows);
		} catch (error) {
			reject(error);
		} finally {
			try {
				if (client) {
					client.release();
					console.log('Cliente liberado');
				}
			} catch (error) {
				console.log(error);
			}
		}
	});
};

export default consulta;
