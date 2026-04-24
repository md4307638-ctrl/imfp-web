"use client";

const WHATSAPP_URL =
  "https://wa.me/221787302525?text=" +
  encodeURIComponent(
    "Bonjour, je souhaite obtenir des informations sur les formations de l'IMFP."
  );

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20c35b] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 animate-float"
    >
      {/* Official WhatsApp logo SVG */}
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1C7.716 1 1 7.716 1 16c0 2.628.675 5.097 1.856 7.243L1 31l7.978-1.832A14.93 14.93 0 0 0 16 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm0 27.25a12.21 12.21 0 0 1-6.228-1.703l-.447-.265-4.634 1.063 1.1-4.517-.293-.464A12.21 12.21 0 0 1 3.75 16C3.75 9.235 9.235 3.75 16 3.75S28.25 9.235 28.25 16 22.765 28.25 16 28.25zm6.7-9.117c-.367-.184-2.17-1.07-2.506-1.192-.336-.122-.58-.184-.825.184-.244.367-.947 1.192-1.16 1.437-.213.244-.427.275-.793.092-.367-.184-1.546-.57-2.944-1.817-1.088-.97-1.822-2.168-2.035-2.535-.213-.367-.023-.565.16-.748.164-.164.367-.428.55-.641.184-.214.245-.367.367-.611.122-.245.061-.459-.03-.642-.092-.184-.825-1.988-1.13-2.723-.298-.714-.6-.617-.825-.629l-.703-.012c-.244 0-.641.092-.977.459-.336.367-1.282 1.252-1.282 3.055s1.313 3.543 1.496 3.787c.184.245 2.582 3.941 6.254 5.525.874.377 1.556.602 2.087.77.877.28 1.676.24 2.308.146.704-.105 2.17-.887 2.476-1.743.306-.857.306-1.591.214-1.743-.091-.153-.336-.245-.703-.428z" />
      </svg>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    </a>
  );
}
