export const metadata = {
  title: 'Reservar Cita — My Novia',
  description: 'Reserva una cita privada en My Novia para encontrar el vestido de tus sueños en Almería.'
}

export default function BookAppointmentPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <span className="section-eyebrow block mb-4">RESERVAR</span>
        <h1 className="section-heading mb-4">Reserva tu <em>Cita</em></h1>
        <p className="font-body text-body-gray max-w-xl mx-auto text-sm">
          Vive una experiencia exclusiva y personal. Nuestro equipo se dedicará
          a ayudarte a encontrar el vestido perfecto para tu gran día.
        </p>
      </div>

      <div className="w-full border-4 border-gold rounded-lg overflow-hidden bg-white shadow-md mt-6">
        <iframe
          src="https://app.bridallive.com/forms.html?formType=scheduler&retailerId=90ed22fa&lang=en"
          width="100%"
          height="1000"
          frameBorder="0"
          className="w-full min-h-[1000px]"
          title="BridalLive Appointment Scheduler"
          style={{ border: 'none', display: 'block' }}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-gray-200">
        <div className="p-6">
          <div className="text-gold text-3xl mb-3">👗</div>
          <h3 className="font-sans text-sm font-semibold tracking-wider text-charcoal uppercase mb-2">Prueba Exclusiva</h3>
          <p className="font-body text-xs text-body-gray">Probador privado con atención personalizada</p>
        </div>
        <div className="p-6">
          <div className="text-gold text-3xl mb-3">💎</div>
          <h3 className="font-sans text-sm font-semibold tracking-wider text-charcoal uppercase mb-2">Asesoramiento</h3>
          <p className="font-body text-xs text-body-gray">Expertas en moda nupcial a tu servicio</p>
        </div>
        <div className="p-6">
          <div className="text-gold text-3xl mb-3">🥂</div>
          <h3 className="font-sans text-sm font-semibold tracking-wider text-charcoal uppercase mb-2">Experiencia VIP</h3>
          <p className="font-body text-xs text-body-gray">Un momento especial para ti y tus acompañantes</p>
        </div>
      </div>
    </div>
  )
}
