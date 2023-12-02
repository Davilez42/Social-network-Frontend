import "./center.css";
export default function Center() {
  return (
    <div className="container_center">
      <h1>Ayuda</h1>
      <p>
        Bienvenido a nuestra sección de ayuda. Aquí encontrarás respuestas a
        preguntas frecuentes.
      </p>

      <h2>¿Quienes somos?</h2>
      <p>
        Somos una emocionante plataforma tipo red social diseñada para conectar
        a las personas en diferentes partes del mundo. Somos un espacio en línea
        seguro y amigable dónde los ustedes los usuarios pueden interactuar con
        más usuarios, compartir fotos, videos, , comentar , construir relaciones
        significativas para ustedes y mucho más.
      </p>

      <h2>Preguntas Frecuentes</h2>
      <ul>
        <strong>¿Cómo cambiar mi contraseña?</strong>
        <p>
          Puedes cambiar tu contraseña en la sección de configuración de la
          cuenta.
        </p>
        <strong>¿Cómo poner una foto de perfil?</strong>
        <p>
          {" "}
          Visita tu perfil, en una esquina superior veras una camara donde
          deberia estar tu foto de perfil al oprimir el icono te dara la opcion
          de seleccionar la foto que tu desees poder, paso a seguir la subis y
          listo, tendras tu foto de perfil.
        </p>
      </ul>

      <h2>Contacto</h2>
      <p>
        Si no encuentras la respuesta que buscas, no dudes en contactarnos
        SnapWire_soporte@redsocial.com. Estamos aquí para ayudarte.
      </p>
    </div>
  );
}
