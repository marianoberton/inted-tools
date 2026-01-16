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
  }
];
