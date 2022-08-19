import Formulario from '../components/Formulario';
const NuevoCliente = () => {
	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">NuevoCliente</h1>
			<p className="mt-3">
				Llena los siguientes campos para registrar un Cliente
			</p>

			<Formulario />
		</>
	);
};

export default NuevoCliente;
