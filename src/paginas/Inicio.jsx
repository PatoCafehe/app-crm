import { useState, useEffect } from 'react';
import Cliente from '../components/Cliente';

const Inicio = () => {
	const [clientes, setClientes] = useState([]);

	useEffect(() => {
		const obtenerClientesApi = async () => {
			try {
				const url = import.meta.env.VITE_API_URL;
				const res = await fetch(url);
				const resultado = await res.json();
				setClientes(resultado);
			} catch (error) {
				console.log(error);
			}
		};
		obtenerClientesApi();
	}, []);

	const handleEliminar = async (id) => {
		const confirmar = confirm('¿Deseas Eliminar este Cliente?');

		if (confirmar) {
			try {
				const url = `${import.meta.env.VITE_API_URL}/${id}`;
				const res = await fetch(url, {
					method: 'DELETE',
				});
				await res.json();
				const arregloClientes = clientes.filter((cliente) => cliente.id !== id);
				setClientes(arregloClientes);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div>
			<>
				<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
				<p className="mt-3">Administra tus Clientes</p>

				<table className="w-full mt-5 table-auto shadow bg-white">
					<thead className="bg-blue-800 text-white">
						<tr>
							<th className="p-2">Nombre</th>
							<th className="p-2">Empresa</th>
							<th className="p-2">Contacto</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>

					<tbody>
						{clientes.map((cliente) => (
							<Cliente
								key={cliente.id}
								cliente={cliente}
								handleEliminar={handleEliminar}
							/>
						))}
					</tbody>
				</table>
			</>
		</div>
	);
};

export default Inicio;
