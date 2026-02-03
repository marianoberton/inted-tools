import { TramiteTemplate, FormField } from './types';

const COMMON_FIELDS: FormField[] = [
  { name: 'fecha', label: 'Fecha', type: 'date' },
  { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
  { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
];

export const TRAMITES: TramiteTemplate[] = [
  {
    id: 'registro-etapa-proyecto-plano-unico',
    label: 'Registro y Permiso de Obra',
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
    baseIncludedServices: [
      "La consultoría para determinar si el proyecto cumple con la normativa urbanística y de edificación vigente o hay que ajustar y/o modificar algo para su posterior aprobación por DGIUR / DGROC.",
      "Adecuación del Proyecto de Arquitectura y de Instalaciones en formato Dwg remitido por el cliente al formato Municipal.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización.",
      "La gestión del trámite Permiso de Obra Civil.",
      "El Asesoramiento del Profesional Interviniente en el Portal Director de Obra."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I.",
      "Gestión y/o elaboración de documentación necesaria para ser presentada en el Portal Director de Obra."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Registro de Etapa de Proyecto + Permiso de Obra Civil”</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'registro-instalacion-complementaria',
    label: 'Registro de Instalación Complementaria',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 2200000 },
          { label: 'Obra Media', value: 'media', price: 3000000 },
          { label: 'Obra Mayor', value: 'mayor', price: 3800000 },
        ]
      },
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3000000' },
    ],
    baseIncludedServices: [
      "La consultoría para determinar si el proyecto de instalaciones complementarias cumple con la normativa urbanística y de edificación vigente o hay que ajustar y/o modificar algo para su posterior aprobación por DGROC.",
      "Adecuación del Proyecto de Instalaciones Complementarias en formato Dwg remitido por el cliente al formato Municipal.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones complementarias, cálculos estructurales, estudios de suelo, memorias descriptivas y de cálculo correspondientes y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Registro de Instalación Complementaria”</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'analisis-viabilidad-proyecto',
    label: 'Análisis de viabilidad de Proyecto',
    fields: [
      ...COMMON_FIELDS,
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1100000' },
    ],
    baseIncludedServices: [
      "La tramitación del Informe de dominio.",
      "La búsqueda de planos antecedentes ante la DGROC.",
      "La proyección estimada de costos de derechos de construcción y/o Plusvalía tomando para ello la solicitud de los planos antecedentes obrantes en los registros del GCABA.",
      "La entrega de UN (1) Informe de estado de situación de proyecto junto con el correspondiente análisis de costos, el archivo CAD del Lote sobre el cual se deberá proyectar, y documentación antecedente en caso de corresponder."
    ],
    optionalServices: [
      "Gestoría de trámites Municipales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Análisis de viabilidad de Proyecto.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El presente servicio de consultoría tiene como objeto determinar si el proyecto cumple con la normativa urbanística y de edificación vigente o hay que ajustar y/o modificar algo para su posterior aprobación por DGIUR / DGROC.</p>
        <p class="mb-2">A tales efectos, el cliente deberá remitir el proyecto de arquitectura en formato dwg para su análisis y posterior devolución.</p>
        <p class="mb-2">Asimismo, el análisis comprende:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) contra entrega de el informe de estado de situación de proyecto.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'prefactibilidad-urbanistica-lote',
    label: 'Prefactibilidad Urbanistica Lote',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Grupo 1880' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Florencia Degtiar' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Av. del Libertador 5848' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '350000' },
    ],
    baseIncludedServices: [
      "La búsqueda de planos antecedentes ante DGROC.",
      "El archivo CAD del Lote sobre el cual se deberá proyectar.",
      "La proyección estimada de costos de derechos de construcción y plusvalía de corresponder."
    ],
    optionalServices: [
      "Análisis de Proyectos Constructivos.",
      "Gestoría de trámites Municipales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Informe de Prefactibilidad de Lote.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye la entrega de una prefactibilidad urbanística que determina un análisis integral de la factibilidad del Lote desde el punto de vista morfológico, perfil edificable, volumen constructivo, superficie edificable por pisos y de usos requeridos y los restantes datos de la parcela, teniendo en cuenta para ello las disposiciones establecidas en el Código Urbanístico y el Código de Edificación vigentes, a través de la entrega de UN (1) informe de Prefactibilidad de Lote.</p>
        <p class="mb-2">Asimismo, el análisis comprende:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) contra entrega de el informe de Prefactibilidad de Lote.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'aviso-obra',
    label: 'Aviso de Obra',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '80000' },
    ],
    baseIncludedServices: [
      "Gestoría del trámite Aviso de Obra."
    ],
    optionalServices: [
      "Gestión de Informe de Dominio.",
      "Análisis de Proyectos Constructivos.",
      "Gestoría de trámites Municipales;",
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Aviso de Obra”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}
        <p class="mb-2">
          Para lo cual el cliente deberá remitir la documentación e información solicitada. En caso de que se trate de un Aviso de Obra en un Inmueble afectado a APH, el cliente deberá proporcionar la memoria descriptiva de las tareas a ejecutar y el relevamiento fotográfico correspondiente.
        </p>

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de forma adelantada al inicio del trámite.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'consulta-plano-antecedente',
    label: 'Consulta de Plano Antecedente',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '80000' },
    ],
    baseIncludedServices: [
      "Gestoría del trámite Consulta de Plano Antecedente."
    ],
    optionalServices: [
      "Gestión de Informe de Dominio;",
      "Análisis de Proyectos Constructivos;",
      "Gestoría de trámites Municipales;",
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Consulta de Plano Antecedente”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}
        <p class="mb-2">
          Para lo cual el cliente deberá remitir la documentación e información solicitada.
        </p>

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de forma adelantada al inicio del trámite.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'consulta-usos-dgiur',
    label: 'Consulta de Usos (DGIUR)',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1200000' },
    ],
    baseIncludedServices: [
      "La elaboración del plano de usos a presentar ante la repartición.",
      "Consulta de planos antecedentes ante DGROC.",
      "La elaboración de la memoria descriptiva.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Análisis de Proyectos Constructivos;",
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Consulta de Usos (DGIUR)”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'consulta-obligatoria-dgiur',
    label: 'Consulta Obligatoria DGIUR (Morfología)',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1800000' },
    ],
    baseIncludedServices: [
      "La adecuación del proyecto de arquitectura en formato DWG remitido por el cliente al formato municipal.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización.",
      "Consulta de planos antecedentes ante DGROC.",
      "Elaboración de Memoria Descriptiva."
    ],
    optionalServices: [
      "Análisis de Proyectos Constructivos;",
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Axonométrica, Renders, Relevamiento de Medianeras (en caso de corresponder);",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Consulta Obligatoria (DGIUR)”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'registro-permiso-demolicion',
    label: 'Registro y Permiso de Demolición',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1900000' },
    ],
    baseIncludedServices: [
      "Visita y replanteo del inmueble.",
      "Elaboración del Plano de Demolición y su adecuación al formato Municipal.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Análisis de Proyectos Constructivos;",
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Memoria de Demolición;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Permiso de Demolición”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'registro-permiso-micro-obra',
    label: 'Registro y Permiso de Micro Obra',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1900000' },
    ],
    baseIncludedServices: [
      "La consultoría para determinar si el proyecto de arquitectura cumple con la normativa urbanística y de edificación vigente o hay que ajustar y/o modificar algo para su posterior aprobación por DGIUR / DGROC.",
      "Adecuación del Proyecto de Arquitectura y de Instalaciones en formato Dwg remitido por el cliente al formato Municipal.",
      "La verificación de costos de derechos de construcción.",
      "Elaboración de Declaraciones Juradas que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "Tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Tramitación del Certificado de Aptitud Ambiental Con Relevante Efecto.",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Micro Obra Bajo/Sin Responsabilidad Profesional”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-obra-sin-plano',
    label: 'Conforme de Obra sin plano (Plano Unico)',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Micro Obra', value: 'micro', price: 1200000 },
          { label: 'Obra Menor', value: 'menor', price: 1400000 },
          { label: 'Obra Media', value: 'media', price: 1400000 },
          { label: 'Obra Mayor', value: 'mayor', price: 1400000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1400000' },
    ],
    baseIncludedServices: [
      "La presentación del plano Conforme a Obra remitido por el cliente que deberá coincidir con el Plano de Registro de Etapa de Proyecto aprobado.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Elaboración del plano Conforme a Obra, ni la adecuación al formato Municipal.",
      "Firma de encomiendas profesionales;",
      "Asistencia presencial durante la Inspección AVO 4.",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Conforme de Obra Civil (Sin Plano)”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-instalacion-sin-plano',
    label: 'Conforme de Instalación Complementaria Obra sin plano',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 1400000 },
          { label: 'Obra Media', value: 'media', price: 1600000 },
          { label: 'Obra Mayor', value: 'mayor', price: 1800000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1600000' },
    ],
    baseIncludedServices: [
      "La presentación del plano Conforme a Obra remitido por el cliente que deberá coincidir con el Plano de Registro de Etapa de Proyecto aprobado.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Elaboración del plano Conforme a Obra, ni la adecuación al formato Municipal.",
      "Firma de encomiendas profesionales;",
      "Asistencia presencial durante la Inspección AVO 4.",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Conforme de Instalación Complementaria (Sin Plano)”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-obra-plano-ajuste',
    label: 'Conforme de Obra con plano Ajuste (Plano Unico)',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Micro Obra', value: 'micro', price: 1400000 },
          { label: 'Obra Menor', value: 'menor', price: 2600000 },
          { label: 'Obra Media', value: 'media', price: 3400000 },
          { label: 'Obra Mayor', value: 'mayor', price: 4200000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3400000' },
    ],
    baseIncludedServices: [
      "La adaptación del Plano de Arquitectura remitido por el cliente remitido en formato DWG a las modificaciones realizadas durante la Obra Civil y su posterior adecuación al formato Municipal.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización.",
      "Tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Tramitación del Certificado de Aptitud Ambiental Con Relevante Efecto.",
      "Asistencia presencial durante la Inspección AVO 4.",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Conforme de Obra Civil (Con Plano) - Ajuste”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-instalacion-plano-ajuste',
    label: 'Conforme de Instalación Complementaria con plano Ajuste',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 2200000 },
          { label: 'Obra Media', value: 'media', price: 3000000 },
          { label: 'Obra Mayor', value: 'mayor', price: 3800000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3000000' },
    ],
    baseIncludedServices: [
      "La adaptación del Plano de Arquitectura remitido por el cliente remitido en formato DWG a las modificaciones realizadas durante la Obra Civil y su posterior adecuación al formato Municipal.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización.",
      "Tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Tramitación del Certificado de Aptitud Ambiental Con Relevante Efecto.",
      "Asistencia presencial durante la Inspección AVO 4.",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Conforme de Instalación Complementaria (Con Plano) - Ajuste”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'registro-instalacion-ventilacion-mecanica',
    label: 'Registro de Instalación Ventilación Mecánica',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 2200000 },
          { label: 'Obra Media', value: 'media', price: 3000000 },
          { label: 'Obra Mayor', value: 'mayor', price: 3800000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3000000' },
    ],
    baseIncludedServices: [
      "Adecuación del Proyecto de Ventilación Mecánica en formato Dwg remitido por el cliente al formato Municipal.",
      "Implantación del Proyecto de Ventilación Mecánica en el Plano de Arquitectura en formato dwg remitido por el cliente.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculo de potencia de motores, ventilación de los locales, ni planillas adicionales y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Registro de Ventilación Mecánica”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-ventilacion-mecanica-sin-plano',
    label: 'Conforme de Ventilación Mecanica sin plano',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 1400000 },
          { label: 'Obra Media', value: 'media', price: 1400000 },
          { label: 'Obra Mayor', value: 'mayor', price: 1400000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1400000' },
    ],
    baseIncludedServices: [
      "La presentación del plano Conforme a Obra remitido por el cliente que deberá coincidir con el Plano de Registro aprobado.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Elaboración del plano Conforme a Obra de ventilación mecánica, ni la adecuación al formato Municipal.",
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Conforme de Ventilación Mecánica (Sin Plano)”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'conforme-ventilacion-mecanica-con-plano',
    label: 'Conforme de Ventilación Mecanica Con plano',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Obra Menor', value: 'menor', price: 2200000 },
          { label: 'Obra Media', value: 'media', price: 3000000 },
          { label: 'Obra Mayor', value: 'mayor', price: 3800000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3000000' },
    ],
    baseIncludedServices: [
      "La adaptación del Plano de Registro de Ventilación Mecánica aprobado por DGROC remitido por el cliente en formato DWG a las modificaciones realizadas durante la Obra Civil y su posterior adecuación al formato Municipal.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculo de potencia de motores, ventilación de los locales, ni planillas adicionales y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Conforme de Ventilación Mecánica (Con Plano) - Ajuste”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'regularizacion-obra-contravencion',
    label: 'Regularización de obra en contravención',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Micro Obra', value: 'micro', price: 1900000 },
          { label: 'Obra Menor', value: 'menor', price: 2600000 },
          { label: 'Obra Media', value: 'media', price: 3400000 },
          { label: 'Obra Mayor', value: 'mayor', price: 4200000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3400000' },
    ],
    baseIncludedServices: [
      "La consultoría para determinar si el proyecto a regularizar cumple con la normativa urbanística y de edificación vigente o hay que ajustar y/o modificar algo para su posterior aprobación por DGIUR / DGROC.",
      "Proyección de costos estimativos en concepto de Tasas Municipales.",
      "Gestoría de trámite: Consulta de Plano Antecedente ante la DGROC.",
      "Adecuación del Proyecto de Arquitectura y de Instalaciones en formato Dwg remitido por el cliente al formato Municipal.",
      "Tramitación del Certificado de Aptitud Ambiental siempre y cuando sea Sin Relevante Efecto.",
      "Elaboración de documentación administrativa que han de ser suscriptas por el Cliente y/o Profesionales intervinientes.",
      "La tramitación del Informe de Dominio.",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Tramitación del Certificado de Aptitud Ambiental Con Relevante Efecto.",
      "Gestoría de Modificaciones de Proyecto y otros trámites fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Regularización de Obra en Contravención”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'elaboracion-proyecto-arquitectura',
    label: 'Elaboración de Proyecto de Arquitectura',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Micro Obra', value: 'micro', price: 1800000 },
          { label: 'Obra Menor', value: 'menor', price: 2400000 },
          { label: 'Obra Media', value: 'media', price: 3100000 },
          { label: 'Obra Mayor', value: 'mayor', price: 4000000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3100000' },
    ],
    baseIncludedServices: [
      "Entrevista y encuentro inicial a los fines de determinar el programa de necesidades, alcance del proyecto, incluyendo una prefactibilidad urbanística sobre la posibilidad constructiva del lote.",
      "Elaboración del Proyecto Municipal de Arquitectura para que cumplimenten con la normativa urbanística y de edificación vigente.",
      "Adecuación del Proyecto a razón de las modificaciones propuestas por el cliente. Se deja constancia que el presente apartado incluye hasta un máximo de TRES (3) modificaciones de proyecto.",
      "Hasta DOS (2) renders de visualización del proyecto final acordado, junto a su correspondiente plano en formato DWG."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales.",
      "Proyecto Ejecutivo de arquitectura ni instalaciones complementarias.",
      "Elaboración de cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de trámites municipales fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento, consultoría y elaboración del Proyecto de Arquitectura.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística del Servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">La presente tarea incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto /  CINCUENTA POR CIENTO (50%) contra entrega de los planos de Instalaciones complementarias.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'elaboracion-proyecto-instalaciones',
    label: 'Elaboración de Proyecto de instalaciones (Sanitaria Eléctrica Incendios)',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Micro Obra', value: 'micro', price: 1800000 },
          { label: 'Obra Menor', value: 'menor', price: 2400000 },
          { label: 'Obra Media', value: 'media', price: 3100000 },
          { label: 'Obra Mayor', value: 'mayor', price: 4000000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3100000' },
    ],
    baseIncludedServices: [
      "Entrevista y encuentro inicial a los fines de determinar el programa de necesidades y alcance del proyecto.",
      "Elaboración del Proyecto de Instalaciones complementarias (Sanitarias, Eléctricas y Contra Incendios) para que cumplimenten con la normativa de edificación vigente.",
      "Adecuación del Proyecto a razón de las modificaciones propuestas por el cliente. Se deja constancia que el presente apartado incluye hasta un máximo de TRES (3) modificaciones de proyecto.",
      "Confección de Planilla de cargas y potencias, Planilla y esquema de tableros, Esquemas unifilares, Detalle de colector, Cuadro de resumen de bajadas de AF y AC, Cuadro de resumen cloacal y pluvial y Cálculo de RTD."
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de Arquitectura, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de trámites municipales fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento, consultoría y elaboración del Proyecto de Instalaciones Complementarias.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística del Servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">La presente tarea incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto /  CINCUENTA POR CIENTO (50%) contra entrega de los planos de Instalaciones complementarias.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'elaboracion-proyecto-ventilacion',
    label: 'Elaboración de Proyecto Ventilación Mecánica',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Magnitud de Obra', 
        type: 'magnitude', 
        defaultValue: 'media',
        options: [
          { label: 'Micro Obra', value: 'micro', price: 1800000 },
          { label: 'Obra Menor', value: 'menor', price: 2400000 },
          { label: 'Obra Media', value: 'media', price: 3100000 },
          { label: 'Obra Mayor', value: 'mayor', price: 4000000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '3100000' },
    ],
    baseIncludedServices: [
      "Entrevista y encuentro inicial a los fines de determinar el programa de necesidades y alcance del proyecto.",
      "Elaboración del Proyecto de Ventilación Mecánica para que cumplimenten con la normativa de edificación vigente.",
      "Adecuación del Proyecto a razón de las modificaciones propuestas por el cliente. Se deja constancia que el presente apartado incluye hasta un máximo de TRES (3) modificaciones de proyecto.",
      "Confección de Planilla de cargas y potencias de acuerdo lo requerido por la normativa vigente"
    ],
    optionalServices: [
      "Firma de encomiendas profesionales;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de Arquitectura, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I.",
      "Gestoría de trámites municipales fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicio de asesoramiento, consultoría y elaboración del Proyecto de Ventilación Mecánica</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística del Servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">La presente tarea incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto /  CINCUENTA POR CIENTO (50%) contra entrega de los planos de Ventilación Mecánica.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'habilitacion-comercial',
    label: 'Habilitación Comercial',
    fields: [
      { 
        name: 'magnitud', 
        label: 'Superficie', 
        type: 'magnitude', 
        defaultValue: '200_500',
        options: [
          { label: 'Hasta 200 m2', value: 'hasta_200', price: 1800000 },
          { label: '200-500 m2', value: '200_500', price: 2200000 },
          { label: '500-800 m2', value: '500_800', price: 2600000 },
          { label: 'Más de 800 m2', value: 'mas_800', price: 3000000 },
        ]
      },
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '2200000' },
    ],
    baseIncludedServices: [
      "Adaptación al formato municipal de Plano de Habilitación Comercial en formato DWG remitido por el cliente.",
      "Relevamiento de la documentación requerida, la presentación vía TAD y el seguimiento del trámite con las respectivas subsanaciones hasta la finalización del trámite y el otorgamiento de la Habilitación Comercial.",
      "Otorgamiento de la Encomienda Profesional, y en caso que sea necesario, un relevamiento del espacio por parte del mismo, a los fines de la presentación del Plano de Habilitación."
    ],
    optionalServices: [
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de Arquitectura, ventilación mecánica y de Instalaciones Complementarias",
      "Gestoría de trámites municipales fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Habilitación Comercial”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico, consultoría en normativa urbanística del Servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">La presente tarea incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma: CINCUENTA POR CIENTO (50%) en concepto de adelanto /  CINCUENTA POR CIENTO (50%) contra entrega del inicio del trámite.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'transferencia-habilitacion-comercial',
    label: 'Transferencia de Habilitación Comercial',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio de Arquitectura CES' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Victoria Cornudet / Carolina Cibilis' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Maure 2847' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '850000' },
    ],
    baseIncludedServices: [
      "Gestoría del trámite Transferencia de Habilitación Comercial, para lo cual el cliente deberá remitir la documentación e información solicitada.",
      "Firma de la Encomienda Profesional requerida para el tramite de Transferencia de Habilitación Comercial."
    ],
    optionalServices: [
      "Análisis de Proyectos Constructivos.",
      "Gestoría de trámites Municipales.",
      "Tasas Municipales y costos de Consejos Profesionales."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Transferencia de Habilitación Comercial”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">La presente tarea incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de forma adelantada al inicio del trámite.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'solicitud-fijacion-linea-oficial',
    label: 'Solicitud de Fijación de Línea Oficial (DGIUR)',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'ODD MILE' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Agustin Iuri' },
      { name: 'domicilio', label: 'Domicilio del Inmueble', type: 'text', defaultValue: 'Espinosa 151' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '120000' },
    ],
    baseIncludedServices: [
      "La redacción de la nota de solicitud",
      "La gestión y seguimiento del trámite hasta su finalización."
    ],
    optionalServices: [
      "Análisis de Proyectos Constructivos;",
      "Tasas Municipales y costos de Consejos Profesionales;",
      "Elaboración de Proyecto de arquitectura, Instalaciones, cálculos estructurales, estudios de suelos y/o cualquier otra documentación fuera del alcance del servicio del Apartado I."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Gestoría de Trámite “Solicitud de Fijación de LFI (DGIUR)”.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y consultoría en normativa urbanística del servicio detallado en el asunto (en adelante, “el servicio”), en lo que respecta al proyecto que se llevará a cabo en el Inmueble situado en {{domicilio}} de esta Ciudad, conforme los términos que se detallan a continuación:
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) al inicio del Expediente Electrónico.
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'inscripcion-registros-bac-comprar-pbac',
    label: 'Inscripción registros (BAC/COMPRAR/PBAC)',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'ODD MILE' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Agustin Iuri' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '350000' },
    ],
    baseIncludedServices: [
      "Análisis de situación registral del Oferente en Registros Públicos de Proveedores y gestión de actualización en caso de ser necesario.",
      "Solicitud de la documentación necesaria para llevar a cabo el ALTA / Regulación de la situación registral.",
      "Análisis de Ítems / clases a inscribir de acuerdo al objeto social del oferente.",
      "Carga y Presentación de la Documentación en Portales Electrónicos de Compras y Contrataciones.",
      "Gestión del trámite hasta la finalización."
    ],
    optionalServices: [
      "Asesoramiento en procedimientos licitatorios y presentaciones de ofertas.",
      "Tasas gubernamentales que afecten al procedimiento de inscripción.",
      "Presentaciones a ser realizadas de forma presencial ante organismos públicos."
    ],
    content: `
      <div class="font-open text-[10pt] leading-relaxed text-justify text-black">
        <p class="text-right mb-8">Ciudad Autónoma de Buenos Aires, {{fecha}}.</p>
        
        <div class="mb-6 font-bold">
          <p>Sres. {{razonSocial}}</p>
          <p>At. {{destinatario}}</p>
        </div>

        <p class="mb-6 font-bold underline">Ref.: Propuesta de Servicios Profesionales - Consultoría y Asesoramiento en Inscripción / Regularización Registral en Registros Públicos y Electrónicos de Proveedores.</p>

        <p class="mb-4">Estimados,</p>

        <p class="mb-4">
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio detallado en la referencia.
        </p>

        <h3 class="font-bold mb-2 mt-4">I. Alcance de servicio.</h3>
        <p class="mb-2">El servicio incluye:</p>
        {{listaServiciosIncluidos}}

        {{seccionServiciosNoIncluidos}}

        {{tituloContraprestacion}}
        <p class="mb-4">
          Proponemos como contraprestación del servicio la suma total de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma CINCUENTA POR CIENTO (50%) en concepto de adelanto / CINCUENTA POR CIENTO (50%) a la fecha de la primera presentación
        </p>

        <p class="mb-4 mt-6">
          Nos encontramos a disposición para cualquier consulta. Atte.
        </p>
      </div>
    `
  },
  {
    id: 'capacitacion-licitaciones',
    label: 'Capacitación en licitaciones',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'La Emilia' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Juan Martín Torrado' },
      { name: 'precio', label: 'Precio Total', type: 'currency', defaultValue: '1800000' },
    ],
    baseIncludedServices: [],
    optionalServices: [],
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

        {{tituloContraprestacion}}
        <p class="mb-4">
          Como contraprestación del servicio, proponemos la suma de <strong>{{precioTexto}} + IVA</strong> a pagarse de la siguiente forma:
        </p>
        <ul class="list-disc pl-5 mb-4">
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
  }
];
