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
  }
];
