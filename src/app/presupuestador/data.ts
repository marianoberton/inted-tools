import { TramiteTemplate, FormField } from './types';

const COMMON_FIELDS: FormField[] = [
  { name: 'fecha', label: 'Fecha', type: 'date' },
  { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio Minond' },
  { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Sr. Edgardo Minond' },
];

export const TRAMITES: TramiteTemplate[] = [
  {
    id: 'prefactibilidad-urbanistica',
    label: 'Prefactibilidad Urbanística',
    fields: [
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '160000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>At. {{razonSocial}}</p>
          <p>{{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento técnico y entrega de Prefactibilidad Urbanística.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y gestoría de trámite detallado en la referencia (en adelante, “el servicio”), en lo que respecta al inmueble sito en {{domicilio}}, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance del servicio - Informe de Prefactibilidad Urbanística.</h3>
        <p class="mb-4">
          En primer lugar, el servicio incluye la entrega de una prefactibilidad urbanística que determina un análisis integral de la factibilidad del Lote desde el punto de vista morfológico, perfil edificable, volumen constructivo, superficie edificable por pisos y de usos requeridos y los restantes datos de la parcela, teniendo en cuenta para ello las disposiciones establecidas en el Código Urbanístico y el Código de Edificación vigentes, a través de la entrega de un informe de factibilidad de proyecto. Asimismo, el análisis comprende la búsqueda de planos antecedentes.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}}</strong> a pagarse de la siguiente forma:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>CINCUENTA POR CIENTO (50%) en concepto de adelanto previo a iniciar las tareas del apartado I.</li>
          <li>CINCUENTA POR CIENTO (50 %) a contra entrega del Informe de Prefactibilidad Urbanística.</li>
        </ul>

        <p class="mb-8 mt-6">
          Nos encontramos a disposición para cualquier consulta.
        </p>

        <p class="mb-4">
          Sin otro particular lo saluda Ud
        </p>
      </div>
    `
  },
  {
    id: 'regularizacion-obra-contravencion',
    label: 'Regularización de Obra en Contravención',
    fields: [
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'calle Zapiola N° 4782/84/78, planta baja, primer piso' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3200000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento y gestoría del trámite Regularización de Obra en Contravención ante la Dirección General de Registro de Obras y Catastro.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y gestoría del trámite de Regularización de Obra en Contravención (en adelante, “el servicio”), en lo que respecta al inmueble sito en {{domicilio}}, de esta ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance del servicio.</h3>
        <p class="mb-4">
          En primer lugar, el servicio incluye la entrega de una prefactibilidad urbanística que determina las posibilidades de regularización en un todo acuerdo a la normativa vigente.
        </p>
        <p class="mb-4">
          Luego se llevará a cabo la adaptación de los planos remitidos por el cliente en formato DWG de acuerdo a lo aprobado por la Disposición Nº 1764 emitida por la Dirección General de Interpretación Urbanística. Asimismo, se llevará a cabo la proyección y dibujo en plano de las Instalaciones Sanitarias, eléctricas y de prevención contra incendio. Asimismo, se encontrará prevista la confección de cálculos estructurales. Finalmente, se deja constancia que no se encuentran incluidas eventuales modificaciones de proyecto, que serán presupuestadas por separado en caso de ser solicitadas considerando para ello la magnitud de la modificación.
        </p>

        <ul class="list-disc pl-8 mb-4">
          <li><strong>Encomienda Profesional:</strong> El servicio incluye la confección y suscripción de la Encomienda Profesional de la arquitectura y de las instalaciones. No se encuentran incluidas las sumas que el cliente deberá abonar en concepto de tasas requeridas por el Consejo Profesional de Ingeniería Civil (CPIC).</li>
          <li class="mt-2"><strong>Gestión de trámites adicionales y gestoría del trámite principal:</strong> Asimismo, la presente tarea incluye, el relevamiento de la documentación requerida para el trámite, la presentación del trámite vía TAD, la tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto, el seguimiento del trámite con informes semanales de situación, e informe de subsanaciones junto con las respectivas adecuaciones y correcciones siempre y cuando estas no requieran la intervención de un asesor de instalaciones ni cambios proyectuales significativos.</li>
        </ul>

        <p class="mb-4">
          En segundo término, proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>TREINTA Y CINCO POR CIENTO (35%) en concepto de adelanto.</li>
          <li>TREINTA Y CINCO POR CIENTO (35%) a los 20 días de emitido el presente presupuesto.</li>
          <li>TREINTA POR CIENTO (30%) al momento de iniciar el trámite ante la Dirección General de Registro de Obras y Catastro.</li>
        </ul>

        <p class="mb-4">
          No se encuentran incluidas en las sumas referidas en la presente propuesta, derechos de construcción / regularización y o plusvalía corren por cuenta del cliente.
        </p>

        <p class="mb-4">
          Sin otro particular, lo saluda a ud. atte.
        </p>
      </div>
    `
  },
  {
    id: 'registro-etapa-proyecto-plano-unico',
    label: 'Registro de Etapa de Proyecto Plano Único',
    fields: [
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'calle Soler Nº 4636' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '2200000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>At. {{razonSocial}}</p>
          <p>{{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento técnico y gestoría de trámite de Registro de Etapa de Proyecto y Permiso de Obra Civil.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y gestoría de trámite de registro de proyecto (en adelante, “el servicio”), en lo que respecta al inmueble sito en {{domicilio}}, de esta ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance del servicio.</h3>
        <p class="mb-4">
          Proponemos que el servicio abarque el siguiente ámbito de aplicación:
        </p>

        <h4 class="font-bold mb-2 mt-4">I.A. Confección y Municipalización del Proyecto de Arquitectura + Instalaciones (Formato Plano Ùnico).</h4>
        <p class="mb-4">
          En primer lugar, el servicio incluye la entrega de una prefactibilidad urbanística que determina viabilidad constructiva en el lote de acuerdo a lo establecido en la normativa vigente para que el cliente le entregue a los profesionales que confeccionarán proyecto de arquitectura e instalaciones.
        </p>
        <p class="mb-4">
          La presente tarea incluye la adaptación de los proyectos de arquitectura e instalaciones sanitarias, eléctricas y de incendios remitidos por el cliente en formato DWG, a formato Plano Único ajustados a la normativa vigente para llevar a cabo la presentación de una modificación de proyecto. Luego se llevará a cabo la adecuación de la documentación al formato municipal para ser presentado en el trámite detallado en el punto I.B.
        </p>
        <p class="mb-4">
          El servicio no incluye cálculos y proyectos estructurales, ni estudios de suelos. Tampoco se encuentran incluidas tareas asociadas a la confección de los proyectos de arquitectura e instalaciones propias de los asesores específicos en la materia.
        </p>

        <h4 class="font-bold mb-2 mt-4">I.B. Presentación y gestoría del trámite Modificación de Proyecto para Incluir instalaciones en Plano único.</h4>
        <p class="mb-4">
          La presente tarea se llevará a cabo una vez finalizadas las tareas referidas en los puntos I.A e incluye, la tramitación de informes de dominio, liquidación de derechos de construcción, el seguimiento del trámite con informes de subsanación junto con las respectivas adecuaciones y correcciones siempre y cuando estas no requieran la intervención de un asesor de instalaciones. El servicio incluye la tramitación del permiso de modificación.
        </p>
        <p class="mb-4">
          El servicio no incluye la elaboración ni firma de Encomiendas Profesionales. No obstante ello, nos encontramos a disposición para asesorar a los profesionales que firmen las encomiendas en su confección. Asimismo, el servicio no incluye el tràmite del Conforme de Obra que será presupuestado oportunamente de ser requerido.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>CINCUENTA POR CIENTO (50%) en concepto de adelanto previo a iniciar las tareas del apartado I.</li>
          <li>CINCUENTA POR CIENTO (50 %) a los 20 días corridos de abonado el adelanto.</li>
        </ul>

        <p class="mb-4">
          Los importes no incluyen el pago de tasas municipales en concepto de derechos de construcción, ni tasas en concepto de encomiendas profesionales.
        </p>

        <p class="mb-8 mt-6">
          Nos encontramos a disposición para cualquier consulta.
        </p>

        <p class="mb-4">
          Sin otro particular lo saluda Ud.
        </p>
      </div>
    `
  },
  {
    id: 'registro-instalacion',
    label: 'Registro de instalación',
    fields: [
      ...COMMON_FIELDS,
      { name: 'tipoInstalacion', label: 'Tipo de Instalación', type: 'select', options: ['Ventilación Mecánica'], defaultValue: 'Ventilación Mecánica' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Inmueble denominado “Ámbito Gigena” situado en las intersecciones de las Avenidas Dorrego y Libertador' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1000000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento, consultoría y gestoría del trámite: Registro de Instalación de {{tipoInstalacion}}.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística y gestoría del trámite de Instalación de {{tipoInstalacion}} ante la Dirección General de Registro de Obras y Catastro del Gobierno de la Ciudad Autónoma de Buenos Aires (en adelante, “el servicio”), en lo que respecta al proyecto de obra de un espacio comercial destinado a oficinas, que se llevará a cabo en el {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicios.</h3>
        
        <h4 class="font-bold mb-2 mt-4">I.A.Confección de plano municipal y gestoría del trámite de Registro de Instalación de {{tipoInstalacion}}.</h4>
        <p class="mb-4">
          A tales efectos, el cliente debe entregar el Proyecto de Instalaciones en formato "dwg" con motivo de llevar a cabo la adaptación del mismo al formato municipal con instalaciones en formato de plano único.
        </p>
        <p class="mb-4">
          Asimismo, la presente tarea incluye, el relevamiento de la documentación requerida para el trámite, la presentación del trámite vía TAD, la tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto, el seguimiento del trámite con informes semanales de situación, e informe de subsanaciones junto con las respectivas adecuaciones y correcciones siempre y cuando estas no requieran la intervención de un asesor de instalaciones ni cambios proyectuales significativos.
        </p>
        <p class="mb-4">
          En lo que respecta a las Encomiendas Profesionales, el cliente deberá indicar quien es el profesional interviniente para gestionar la encomienda. En caso de que el profesional lo disponga, podemos asesorar en la confección de las encomiendas profesionales para que luego el cliente y/o el profesional abone la tasa del Colegio Profesional correspondiente a la encomienda referida.
        </p>
        <p class="mb-4">
          El servicio no incluye la elaboración del Proyecto de Instalaciones. Asimismo, tampoco se encuentran incluidas eventuales modificaciones sustanciales de proyecto, que serán presupuestadas por separado en caso de ser solicitadas considerando para ello la magnitud de la modificación. Por último quedan excluidos del servicio las gestiones de Pólizas de Responsabilidad Civil y demás documentación requerida en el portal “Director de Obra”.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) una vez caratulado el expediente electrónico. Se emitirá la Factura A a la razón social que indique el cliente.
        </p>
        <p class="mb-4">
          La contraprestación no incluye los costos asociados a tasas que el Gobierno de la Ciudad de Buenos Aires requiera en oportunidad de los trámites referidos, ni tasas de encomiendas profesionales.
        </p>

        <p class="mb-4 mt-6">
          El presente presupuesto cuenta con una validez de 10 días corridos. Nos encontramos a disposición para cualquier consulta.
        </p>

        <p class="mb-4">
          Atte.
        </p>
      </div>
    `
  },
  {
    id: 'capacitacion-licitaciones',
    label: 'Servicios de Capacitación en Licitaciones',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'La Emilia' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Juan Martín Torrado' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1400000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de servicio de Capacitación en Licitaciones y Contrataciones Privadas y Públicas.</p>

        <p class="mb-4">Estimado,</p>

        <p class="mb-4">
          Conforme lo conversado, enviamos propuesta por brindarle el servicio de capacitación en materia de Licitaciones Privadas (en adelante, “el servicio”), conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance del servicio.</h3>
        <p class="mb-4">
          El servicio consiste en llevar a cabo una capacitación se llevará de forma remota mediante el aplicativo “google meet”, y se distribuirá en TRES (3) jornadas a través del dictado de UN (1) módulo interactivos por jornada, los que tendrán una duración aproximada de 40 a 60 minutos.
        </p>
        <p class="mb-4">
          Los módulos serán dictados por profesionales con experiencia tanto en Licitaciones Privadas como Públicas, y sus distintas variables técnicas.
        </p>
        <p class="mb-4">
          En este marco, a continuación se exponen los temas que serán abordados en cada Módulo.
        </p>

        <h4 class="font-bold mb-2 mt-4">I.A. Módulo I: Fundamentos y Estrategias del Proceso Licitatorio.</h4>
        <p class="mb-4">
          Este módulo inicial será diseñado para abordar una base sólida y unificada de conocimiento para todos los integrantes del equipo de Licitaciones y compras de su compañía.
        </p>
        <p class="mb-4">
          Se abordará el marco conceptual y normativo que rige las compras y contrataciones, estableciendo un lenguaje común y una comprensión clara de los principios fundamentales que gobiernan tanto el ámbito privado como el público.
        </p>
        <p class="mb-4">
          Se pondrá especial énfasis en los principios de transparencia, concurrencia, igualdad de trato y eficiencia, explicando cómo su correcta aplicación no solo garantiza el cumplimiento legal, sino que también optimiza los resultados y mitiga riesgos para la organización.
        </p>
        <p class="mb-4">
          Profundizaremos en la clasificación de los distintos tipos de procedimientos de selección, analizando en detalle las características, ventajas y aplicabilidad de la licitación privada, el concurso de precios y la contratación directa, la orden de compra abierta o cerrada, entre otros.
        </p>
        <p class="mb-4">
          Asimismo, se describirán y expondrán las diferentes etapas que comprenden un procedimiento licitatorio con las intervenciones que han de realizarse para garantizar una correcta interacción entre la Autoridad Licitante y los oferentes para luego garantizar la Adjudicación de la oferta más conveniente para la compañía.
        </p>
        <p class="mb-4">
          Al finalizar este módulo, los participantes serán capaces de identificar el procedimiento de contratación más adecuado para cada necesidad específica, comprendiendo el alcance y las implicancias de cada uno, sus etapas , y sentando las bases para una gestión de compras y contrataciones más eficaz y segura.
        </p>

        <h4 class="font-bold mb-2 mt-4">Módulo II: Diseño y Elaboración de Pliegos de Bases y Condiciones Licitatorios.</h4>
        <p class="mb-4">
          Este segundo módulo se centra en el documento más crítico de cualquier proceso licitatorio: el Pliego de Bases y Condiciones. Siendo la herramienta que establece las reglas del juego de manera clara, equitativa y precisa para todos los intervinientes resulta por demás relevante su abordaje específico y puntual a los fines de generar una herramienta acorde a la necesidad.
        </p>
        <p class="mb-4">
          Se desglosará la estructura de un pliego completo, abordando en detalle cada una de sus partes esenciales. Se trabajará en la redacción del objeto de la contratación, la elaboración de especificaciones técnicas, la definición de las cláusulas administrativas (garantías, plazos, penalidades, etc.) y, fundamentalmente, el diseño de los criterios de evaluación. Se analizarán casos prácticos para ilustrar cómo una redacción ambigua o incompleta puede derivar en complicaciones del proceso, demoras y mayores costos.
        </p>
        <p class="mb-4">
          Como resultado práctico, los asistentes adquirirán las habilidades necesarias para diseñar y redactar Pliegos de Bases y Condiciones completos y efectivos. Serán capaces de definir con precisión los requisitos técnicos y administrativos, establecer un sistema de evaluación objetivo y transparente, y anticipar posibles controversias, logrando así procesos eficientes y eficaces para la organización.
        </p>

        <h4 class="font-bold mb-2 mt-4">Módulo III: Evaluación de Ofertas e Interacción con Oferentes.</h4>
        <p class="mb-4">
          El tercer y último módulo aborda la fase decisiva del proceso: el análisis de las propuestas y la selección del adjudicatario. Se capacitará a los participantes en la metodología para una evaluación de ofertas ordenada y sistemática, comenzando por el análisis de admisibilidad formal para verificar el cumplimiento de los requisitos documentales exigidos en el pliego, una etapa clave para garantizar la igualdad entre los proponentes.
        </p>
        <p class="mb-4">
          Posteriormente, se profundizará en los distintos métodos de evaluación, desde el criterio de "menor precio" para bienes estandarizados, hasta la aplicación de sistemas de puntaje que ponderan aspectos técnicos, económicos y de calidad para contrataciones complejas. Se enseñará a confeccionar cuadros comparativos y a elaborar informes de la Comisión Evaluadora, documentando de manera fehaciente el razonamiento que conduce a la recomendación de adjudicación.
        </p>
        <p class="mb-4">
          Finalmente, este módulo brindará herramientas clave para gestionar la interacción con los oferentes durante el proceso de evaluación. Se abordará el manejo correcto de las solicitudes de aclaración, las vistas de las ofertas y los pedidos de subsanación de errores formales o documentación complementaria, siempre dentro del marco normativo y respetando el principio de igualdad. Los participantes aprenderán a conducir esta etapa con profesionalismo, asegurando un proceso de adjudicación transparente, justo y jurídicamente defendible.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Plazo de consultas.</h3>
        <p class="mb-4">
          Luego de finalizados los TRES (3) módulos, y por un plazo de 10 días corridos, se brindará asesoramiento a diversas consultas que puedan surgir tanto de la capacitación como de la puesta en práctica del armado de pliegos, para lo que se pondrá a disposición una vía de contacto (mail) para que el cliente traslade sus consultas.
        </p>

        <h3 class="font-bold mb-2 mt-4">III. Contraprestación.</h3>
        <p class="mb-4">
          Como contraprestación del servicio, proponemos la suma de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma:
        </p>
        <ul class="list-disc pl-8 mb-4">
          <li>50% en concepto de anticipo previo al inicio de las tareas del apartado I.</li>
          <li>50% una vez finalizada la capacitación descripta en el apartado I</li>
        </ul>
        <p class="mb-4">
          El plazo de elaboración de la capacitación es de QUINCE (15) días corridos a contar desde la aprobación formal del presupuesto y pago del adelanto detallado en el presente apartado.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta.
        </p>

        <p class="mb-4">
          Sin otro particular lo saluda Ud.
        </p>
      </div>
    `
  },
  {
    id: 'micro-obra-sin-encomienda',
    label: 'Micro Obra sin encomienda',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'ALAU TECNOLOGÍA S.A.U.' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'J. Sebastián Mirko' },
      { name: 'domicilio', label: 'Domicilio / Objeto', type: 'text', defaultValue: 'de un espacio comercial destinado a oficinas, que se llevará a cabo en el Inmueble denominado “Ámbito Gigena” situado en las intersecciones de las Avenidas Dorrego y Libertador' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '2400000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento, consultoría y gestoría del trámite: Micro Obra.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística y gestoría del trámite de Micro Obra ante la Dirección General de Registro de Obras y Catastro del Gobierno de la Ciudad Autónoma de Buenos Aires (en adelante, “el servicio”), en lo que respecta al proyecto de obra {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicios.</h3>
        
        <h4 class="font-bold mb-2 mt-4">I.A. Asesoramiento y consultoría en materia de normativa urbanística respecto al proyecto de arquitectura e instalaciones.</h4>
        <p class="mb-4">
          La presente tarea se llevará a cabo durante la confección del Plano de Arquitectura e Instalaciones llevado a cabo por el profesional designado por el cliente. Esta tarea tiene como objetivo evacuar dudas y consultas que puedan surgir durante la confección de la documentación en cuestión respecto de las exigencias establecidas por el Código Urbanístico y de Edificación y los correspondientes Reglamentos Técnicos vigentes. A tales efectos, proponemos realizar un intercambio vía mail con el profesional designado por el cliente y mantenerlo en copia para que esté al tanto de los avances hasta lograr la finalización del Proyecto de Arquitectura.
        </p>

        <h4 class="font-bold mb-2 mt-4">I.B.Confección de plano municipal y gestoría del trámite de Micro Obra.</h4>
        <p class="mb-4">
          A tales efectos, el cliente debe entregar el Proyecto de Arquitectura e instalaciones en formato "dwg" con motivo de llevar a cabo la adaptación del mismo al formato municipal con instalaciones en formato de plano único.
        </p>
        <p class="mb-4">
          Asimismo, la presente tarea incluye, el relevamiento de la documentación requerida para el trámite, la presentación del trámite vía TAD, la tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto, el seguimiento del trámite con informes semanales de situación, e informe de subsanaciones junto con las respectivas adecuaciones y correcciones siempre y cuando estas no requieran la intervención de un asesor de instalaciones ni cambios proyectuales significativos.
        </p>
        <p class="mb-4">
          En lo que respecta a las Encomiendas Profesionales, el cliente deberá indicar quien es el profesional interviniente para ocupar los diferentes roles requeridos por la encomienda. En caso de que el profesional lo disponga, podemos asesorar en la confección de las encomiendas profesionales para que luego el cliente y/o el profesional abone la tasa del Colegio Profesional correspondiente a la encomienda referida. Asimismo, se encuentra incluido el asesoramiento al profesional en las gestiones que deben realizarse en el portal “Director de Obra” del Gobierno de la Ciudad.
        </p>
        <p class="mb-4">
          El servicio no incluye la elaboración del Proyecto de Arquitectura, Instalaciones. Asimismo, tampoco se encuentran incluidas eventuales modificaciones sustanciales de proyecto, que serán presupuestadas por separado en caso de ser solicitadas considerando para ello la magnitud de la modificación. Por último quedan excluidos del servicio las gestiones de Pólizas de Responsabilidad Civil y demás documentación requerida en el portal “Director de Obra”.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) una vez obtenida la Autorización para comenzar a ejecutar la Micro Obra emitida por la Autoridad de Aplicación. Se emitirá la Factura A a la razón social que indique el cliente.
        </p>
        <p class="mb-4">
          La contraprestación no incluye los costos asociados a tasas que el Gobierno de la Ciudad de Buenos Aires requiera en oportunidad de los trámites referidos, ni tasas de encomiendas profesionales.
        </p>

        <p class="mb-4 mt-6">
          El presente presupuesto cuenta con una validez de 10 días corridos. Nos encontramos a disposición para cualquier consulta.
        </p>

        <p class="mb-4">
          Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-obra',
    label: 'Conforme a Obra - Obra Menor/Media/Mayor',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'ALAU TECNOLOGÍA S.A.U.' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'J. Sebastián Mirko' },
      { name: 'domicilio', label: 'Domicilio / Objeto', type: 'text', defaultValue: 'de las oficinas desarrolladas en el inmueble denominado “Ámbito Gigena” situado en las intersecciones de las Avenidas Dorrego y Libertador' },
      { name: 'precioSinPlanos', label: 'Precio Sin Planos', type: 'currency', defaultValue: '950000' },
      { name: 'precioConPlanos', label: 'Precio Con Planos', type: 'currency', defaultValue: '1400000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento y gestoría del trámite Conforme a Obra.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y gestoría de trámite de Conforme a Obra correspondiente {{domicilio}} de esta Ciudad (en adelante "el servicio"), que se regirá por los siguientes términos y condiciones.
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Informe de encuadre de trámite: Conforme de Obra con o sin Ajuste de Obra.</h3>
        <p class="mb-4">
          La presente tarea consiste en el análisis comparativo de los planos registrados ante el Gobierno de la Ciudad Autónoma de Buenos Aires respecto de los planos constructivos de Arquitectura efectivamente ejecutados remitidos por el profesional designado por el cliente. El producto del análisis determinará el encuadre del trámite a realizar pudiendo ser:
        </p>
        <p class="mb-2 ml-4">
          A - Conforme Sin Ajuste y Sin Plano: Para el supuesto que no haya diferencias entre el Plano Registrado y el Plano de Obra efectivamente Ejecutado.
        </p>
        <p class="mb-4 ml-4">
          B - Conforme Con Ajuste y Con Plano: Para el supuesto que haya diferencias entre el Plano Registrado y el Plano de Obra efectivamente Ejecutado.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Trámite Conforme de Obra Sin Ajuste y Sin Plano.</h3>
        <p class="mb-4">
          Se realizará el relevamiento de la documentación requerida para el trámite, la presentación del trámite vía TAD, el seguimiento del trámite y carga de subsanaciones hasta su finalización. El servicio no incluye firma de encomiendas profesionales ni costos por tasas municipales, plusvalía y/o derechos de construcción pendientes.
        </p>

        <h3 class="font-bold mb-2 mt-4">III. Trámite Conforme de Obra Con Ajuste y Con Plano.</h3>
        <p class="mb-4">
          El servicio comprende las tareas descriptas en el apartado anterior y adicionalmente se llevará a cabo la adecuación del Plano Único Registrado a los ajustes constructivos que se hayan realizado durante la ejecución de la Obra. El servicio no incluye firma de encomiendas profesionales ni costos por tasas municipales, plusvalía y/o derechos de construcción pendientes.
        </p>

        <h4 class="font-bold mb-2 mt-4">Consideraciones relevantes para Trámites II y III:</h4>
        <ul class="list-disc pl-8 mb-4">
          <li>DGROC va a requerir que se encuentre Conformado el Plano de Ventilación Mecánica Registrado (Presupuestado en puntos IV y V).</li>
          <li>DGROC va a enviar un AVO (Agente de Verificación Obligatoria) en cualquiera de los dos supuestos (con o sin Ajuste) para verificar que el Plano presentado en el trámite coincida con lo ejecutado.</li>
          <li>En dicha oportunidad se verificará que el Administrado cuente con los QR de mantenimiento de Instalaciones Fijas Contra Incendios del espacio comercial dados de alta (este trámite no se encuentra incluido en la presente propuesta).</li>
        </ul>

        <h3 class="font-bold mb-2 mt-4">IV. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la sumas y formas de pago que se detallan a continuación:
        </p>
        
        <p class="mb-4">
          <strong>II. Trámite: Conforme a Obra Sin Planos: {{precioSinPlanosTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) a los 30 días de abonado el adelanto correspondiente.
        </p>

        <p class="mb-4">
          <strong>III. Trámite: Conforme a Obra Con Planos: {{precioConPlanosTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) a los 30 días de abonado el adelanto correspondiente.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'consulta-usos',
    label: 'Consulta de Usos',
    fields: [
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'calle Nicaragua N° 5935, de esta Ciudad' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '160000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento y gestoría del trámite Consulta de Usos.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y gestoría de trámite de Consulta de Usos para el inmueble sito en {{domicilio}} (en adelante "el servicio"), que se regirá por los siguientes términos y condiciones.
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de la Tarea.</h3>
        <p class="mb-4">
          La presente tarea consiste en la presentación de la Consulta de Usos ante la Dirección General de Interpretación Urbanística (DGIUR) dependiente del Gobierno de la Ciudad Autónoma de Buenos Aires, el seguimiento del expediente y la subsanación del mismo hasta la obtención del acto administrativo que otorga la Factibilidad del Uso solicitado. El servicio no incluye firma de encomiendas profesionales ni costos por tasas municipales, plusvalía y/o derechos de construcción.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) contra entrega del Informe.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-instalacion-complementaria',
    label: 'Conforme de Instalación Complementaria',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'FIDEICOMISO DORREGO Y LIBERTADOR' },
      { name: 'destinatario', label: 'Destinatario', type: 'text' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text' },
      { name: 'precio', label: 'Precio Total', type: 'currency', currencyType: 'USD', defaultValue: '2500' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento, consultoría y gestoría del trámite: Conforme de Instalación Complementaria.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística y gestoría del trámite detallado en el asunto (en adelante, “el servicio”), del inmueble sito en {{domicilio}} conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicios.</h3>
        
        <h4 class="font-bold mb-2 mt-4">I.A.Confección de plano municipal y gestoría del trámite de Conforme de Instalación Complementaria.</h4>
        <p class="mb-4">
          A tales efectos, el cliente debe entregar el Proyecto de la Instalación Complementaria aprobada en formato "dwg" con motivo de llevar a cabo la adaptación del mismo al formato municipal, indicando si se realizaron modificaciones / adecuaciones respecto del mismo. Asimismo, el cliente deberá entregar el proyecto de instalación Complementaria efectivamente ejecutado en el formato referido.
        </p>
        <p class="mb-4">
          La presente tarea incluye, el relevamiento de la documentación requerida para el trámite, la presentación del trámite vía TAD, el seguimiento del trámite con informes semanales de situación, e informe de subsanaciones junto con las respectivas adecuaciones y correcciones siempre y cuando estas no requieran la intervención de un asesor de instalaciones ni cambios proyectuales significativos.
        </p>
        <p class="mb-4">
          En lo que respecta a las Encomiendas Profesionales, el cliente deberá indicar quien es el profesional interviniente para ocupar los diferentes roles requeridos por la encomienda. En caso de que el profesional lo disponga, podemos confeccionar las encomiendas profesionales para que luego el cliente y/o el profesional abone la tasa del Colegio Profesional correspondiente a la encomienda referida.
        </p>
        <p class="mb-4">
          El servicio no incluye la elaboración del Proyecto de Instalación Complementaria ni la firma de la encomienda profesional.
        </p>

        <h3 class="font-bold mb-2 mt-4">II. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) a los 30 días de abonado el adelanto. Se emitirá la Factura A a la razón social que indique el cliente y el pago podrá realizarse en PESOS ARGENTINOS ARS cuya conversión se realizará al tipo de cambio oficial VENTA del BANCO NACIÓN de la fecha de la factura.
        </p>
        <p class="mb-4">
          La contraprestación no incluye los costos asociados a tasas que el Gobierno de la Ciudad de Buenos Aires requiera en oportunidad de los trámites referidos, ni tasas de encomiendas profesionales.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  }
];
