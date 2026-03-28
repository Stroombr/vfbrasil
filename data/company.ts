export type CompanyLocation = {
  name: string
  address: string
  cityState: string
  zipCode: string
  mapsUrl: string
}

export const companyProfile = {
  brandName: 'VF Brasil',
  legalName: 'VF BRASIL COMERCIO E SERVICOS LTDA',
  linkedinCompanyUrl: 'https://www.linkedin.com/company/vf-do-brasil-ltda/',
  overview:
    'A VF Brasil atua no setor siderurgico com foco em desempenho operacional, qualidade tecnica e desenvolvimento sustentavel.',
  industry: 'Industrial Machinery Manufacturing',
  companySize: '11-50 colaboradores',
  foundedYear: 2015,
  phoneDisplay: '(11) 99365-2159',
  phoneRaw: '011993652159',
  whatsappPhoneIntl: '5511993652159',
  specialties: [
    'Fabricacao de maquinas',
    'Engenharia reversa',
    'Consultoria',
    'Melhoria de processos industriais',
  ],
  servicesSummary:
    'Prestacao de servicos em engenharia reversa, fabricacao de maquinas e pecas, dispositivos e suporte tecnico para siderurgia.',
  workplacePolicy: 'Onsite',
  vaccinePolicy: 'Sem exigencia de vacina',
} as const

export const companyLocations: CompanyLocation[] = [
  {
    name: 'Matriz - Varzea Paulista',
    address: 'R. Marginal, 300 - Setor Industrial',
    cityState: 'Varzea Paulista - SP',
    zipCode: '13224-000',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Marginal%2C+300%2C+Varzea+Paulista%2C+SP',
  },
  {
    name: 'VF Brasil Fabrica Diadema',
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
