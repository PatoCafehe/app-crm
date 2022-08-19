import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.required('El nombre del cliente es Obligatorio')
			.min(3, 'El nombre es muy corto')
			.max(20, 'El nombre es muy largo'),
		empresa: Yup.string().required('El nombre de la Empresa es Obligatorio'),
		email: Yup.string()
			.email('Email no valido')
			.required('El email es Obligatorio'),
		telefono: Yup.number()
			.integer('Numero no valido')
			.positive('Numero no valido')
			.typeError('Numero no Valido'),
		notas: '',
	});

	const handleSubmit = async (values) => {
		try {
			let res;
			if (cliente.id) {
				// Editando un Registro
				const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
				res = await fetch(url, {
					method: 'PUT',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json',
					},
				});
			} else {
				// Creando un nuevo Registro
				const url = import.meta.env.VITE_API_URL;
				res = await fetch(url, {
					method: 'POST',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json',
					},
				});
			}
			await res.json();
			navigate('/clientes');
		} catch (error) {
			console.log(error);
		}
	};
	return cargando ? (
		<Spinner />
	) : (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase text-center">
				{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
			</h1>
			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? '',
					empresa: cliente?.empresa ?? '',
					email: cliente?.email ?? '',
					telefono: cliente?.telefono ?? '',
					notas: cliente?.notas ?? '',
				}}
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values);

					resetForm();
				}}
				validationSchema={nuevoClienteSchema}
			>
				{({ errors, touched }) => {
					return (
						<Form className="mt-10">
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="nombre">
									Nombre:
								</label>
								<Field
									id="nombre"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeHolder="Nombre del cliente"
									name="nombre"
								/>
								{errors.nombre && touched.nombre ? (
									<Alerta>{errors.nombre}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="empresa">
									Empresa:
								</label>
								<Field
									id="empresa"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeHolder="Empresa del cliente"
									name="empresa"
								/>
								{errors.empresa && touched.empresa ? (
									<Alerta>{errors.empresa}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="email">
									E-mail:
								</label>
								<Field
									id="email"
									type="email"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeHolder="E-mail del cliente"
									name="email"
								/>
								{errors.email && touched.email ? (
									<Alerta>{errors.email}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="telefono">
									Teléfono:
								</label>
								<Field
									id="telefono"
									type="tel"
									className="mt-2 block w-full p-3 bg-gray-100"
									placeHolder="Telefono del cliente"
									name="telefono"
								/>
								{errors.telefono && touched.telefono ? (
									<Alerta>{errors.telefono}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label className="text-gray-800" htmlFor="notas">
									Notas:
								</label>
								<Field
									as="textarea"
									id="notas"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-100 h-40"
									placeHolder="Notas del cliente"
									name="notas"
								/>
							</div>

							<input
								type="submit"
								value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
								className="mt-5 w-full bg-blue-800 p-3 text-white font-bold uppercase text-lg rounded-md"
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};
export default Formulario;
