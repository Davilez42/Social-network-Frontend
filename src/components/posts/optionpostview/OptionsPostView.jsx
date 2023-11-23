export default function OptionsPostView() {
  return (
    <div>
      <select id="opcionesPublicacion" name="opcionesPublicacion">
        <option value="default" disabled selected></option>
        <option value="editar">Editar</option>
        <option value="eliminar">Eliminar </option>
        <option value="ocultar">Ocultar </option>
      </select>
    </div>
  );
}
