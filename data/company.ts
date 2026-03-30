export type CompanyLocation = {
  name: string
  address: string
  cityState: string
  zipCode: string
  mapsUrl: string
}

export const companyProfile = {
  brandName: 'VF Brasil',
  legalName: 'VF BRASIL COMÉRCIO E SERVIÇOS LTDA',
  linkedinCompanyUrl: 'https://www.linkedin.com/company/vf-do-brasil-ltda/',
  overview:
    'A VF Brasil atua no setor siderúrgico com foco em desempenho operacional, qualidade técnica e desenvolvimento sustentável.',
  industry: 'Industrial Machinery Manufacturing',
  companySize: '+ 50 colaboradores',
  foundedYear: 2015,
  phoneDisplay: '(11) 99365-2159',
  phoneRaw: '011993652159',
  whatsappPhoneIntl: '5511993652159',
  specialties: [
    'Fabricação de máquinas',
    'Engenharia reversa',
    'Consultoria',
    'Melhoria de processos industriais',
  ],
  servicesSummary:
    'Prestação de serviços em engenharia reversa, fabricação de máquinas e peças, dispositivos e suporte técnico para siderurgia.',
  workplacePolicy: 'Onsite',
} as const

export const companyLocations: CompanyLocation[] = [
  {
    name: 'Matriz - Várzea Paulista',
    address: 'R. Marginal, 300 - Setor Industrial',
    cityState: 'Várzea Paulista - SP',
    zipCode: '13224-000',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Marginal%2C+300%2C+Varzea+Paulista%2C+SP',
  },
  {
    name: 'VF Brasil Fábrica Diadema',
    address: 'Rua Bahia, 123',
    cityState: 'Diadema - SP',
    zipCode: '09941-740',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Bahia+123%2C+Diadema%2C+SP',
  },
]

export function buildWhatsappLink(message?: string) {
  const base = `https://wa.me/${companyProfile.whatsappPhoneIntl}`

  if (!message) {
    return base
  }

  return `${base}?text=${encodeURIComponent(message)}`
}
