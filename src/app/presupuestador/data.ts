import { TramiteTemplate } from './types';

export const TRAMITES: TramiteTemplate[] = [
  {
    id: 'prefactibilidad-urbanistica',
    label: 'Prefactibilidad Urbanística',
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'razonSocial', label: 'Razón Social', type: 'text', defaultValue: 'Estudio Minond' },
      { name: 'destinatario', label: 'Destinatario', type: 'text', defaultValue: 'Sr. Edgardo Minond' },
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
          Conforme lo solicitado, a continuación, enviamos propuesta por brindarle el servicio de asesoramiento técnico y gestoría de trámite detallado en la referencia (en adelante, “el servicio”), en lo que respecta al inmueble sito en <strong>{{domicilio}}</strong>, conforme los términos que se detallan a continuación:
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
  }
];
