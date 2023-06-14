import consulta from './db.js';

class Producto {
	constructor(nombre, descripcion, precio, stock) {
		// this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.precio = precio;
		this.stock = stock;
	}
	static findAll() {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'SELECT id, nombre, descripcion, precio, stock FROM productos',
					values: [],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}
	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'SELECT id, nombre, descripcion, precio, stock FROM productos WHERE id = $1',
					values: [id],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}
	createUser() {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'INSERT INTO productos(nombre, descripcion, precio, stock) VALUES($1,$2,$3,$4)',
					values: [
						// this.id,
						this.nombre,
						this.descripcion,
						this.precio,
						this.stock,
					],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}
	static updateUser(id, nombre, descripcion, precio, stock) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE productos SET nombre=$2, descripcion=$3, precio=$4, stock=$5 WHERE id = $1',
					values: [id, nombre, descripcion, precio, stock],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}
	static deleteUser(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'DELETE FROM productos WHERE id = $1',
					values: [id],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default Producto;

// Producto.findAll()
// 	.then((resultado) => console.log(resultado))
// 	.catch((error) => console.log(error));
