import { TramiteTemplate, FormField } from './types';

const COMMON_FIELDS: FormField[] = [
  { name: 'fecha', label: 'Fecha', type: 'date' },
  { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
  { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
];

export const TRAMITES: TramiteTemplate[] = [
  {
    id: 'registro-etapa-proyecto-plano-unico',
    label: 'Registro de Etapa de Proyecto y Permiso de Obra (Plano único)',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 2600000 },
          { label: 'Obra Media', value: 'media', price: 3400000 },
          { label: 'Obra Mayor', value: 'mayor', price: 4200000 },
        ]
      },
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3400000' },
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Registro de Etapa de Proyecto + Permiso de Obra Civil” - {{magnitudTexto}}.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        <ul class="list-disc pl-8 mb-4">
          <li>La consultoría para determinar si el proyecto cumple con la normativa urbanística y de edificación vigente o hay que ajustar y/o modificar algo para su posterior aprobación por DGIUR / DGROC.</li>
          <li>Adecuación del Proyecto de Arquitectura y de Instalaciones en formato Dwg remitido por el cliente al formato Municipal.</li>
          <li>Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.</li>
          <li>La tramitación del Informe de Dominio.</li>
          <li>La gestión y seguimiento del trámite hasta su finalización.</li>
          <li>La gestión del trámite Permiso de Obra Civil.</li>
          <li>El Asesoramiento del Profesional Interviniente en el Portal Director de Obra.</li>
        </ul>

        <h3 class="font-bold mb-2 mt-4">II. Servicios no incluidos.</h3>
        <ul class="list-disc pl-8 mb-4">
          <li>Firma de encomiendas profesionales;</li>
          <li>Tasas Municipales y costos de Consejos Profesionales;</li>
          <li>Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.</li>
          <li>Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I.</li>
          <li>Gestión y/o elaboración de documentación necesaria para ser presentada en el Portal Director de Obra.</li>
        </ul>

        <h3 class="font-bold mb-2 mt-4">III. Contraprestación.</h3>
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  }
];
