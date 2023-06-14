import express from 'express';
import Producto from './Producto.js';

const app = express();
app.listen(3000, () => {
	console.log('Servidor escuchando en http://localhost:3000');
});

// Middleware
app.use(express.json());

// READ PRODUCT
app.get('/api/productos', (req, res) => {
	Producto.findAll()
		.then((resultado) =>
			res.send({ code: 200, data: resultado, message: 'ok' })
		)
		.catch((error) => res.status(500).send({ code: 500, error }));
});
// CREATE PRODUCT
app.post('/api/productos', (req, res) => {
	let { nombre, descripcion, precio, stock } = req.body;
	console.log(req.body);
	let nuevoProducto = new Producto(nombre, descripcion, precio, stock);
	nuevoProducto
		.createUser()
		.then((resultado) => {
			res.send({
				code: 201,
				data: resultado,
				message: 'Producto agregado con éxito',
			});
		})
		.catch((error) => res.status(500).send({ code: 500, error }));
});
// SEARCH PRODUCT BY ID
app.get('/api/productos/:id', (req, res) => {
	let { id } = req.params;
	Producto.findById(id)
		.then((resultado) =>
			res
				.status(200)
				.send({ code: 200, data: resultado, message: 'Producto encontrado' })
		)
		.catch((error) => res.status(500).send({ code: 500, error }));
});
// UPDATE PRODUCT
app.put('/api/productos/:id', (req, res) => {
	let { id } = req.params;
	let { nombre, descripcion, precio, stock } = req.body;
	Producto.updateUser(id, nombre, descripcion, precio, stock)
		.then((resultado) =>
			res.status(200).send({
				code: 200,
				data: resultado,
				message: 'Producto actualizado con éxito',
			})
		)
		.catch((error) => res.status(500).send({ code: 500, error }));
});
// DELETE PRODUCT
app.delete('/api/productos/:id', (req, res) => {
	let { id } = req.params;
	Producto.deleteUser(id)
		.then((resultado) =>
			res.status(200).send({
				code: 200,
				data: resultado,
				message: 'Producto eliminado con éxito',
			})
		)
		.catch((error) =>
			res.status(500).send({
				code: 500,
				message: 'Error al intentar eliminar Producto',
				error,
			})
		);
});
