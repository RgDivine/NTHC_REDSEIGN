// Site copy and data, taken from nthc.com.gh (captured 23 November 2026).
// Keep this file as the single place to update company information.
import { MEDIA_BASE } from '../config.js';

export const company = {
  name: 'NTHC Limited',
  fullName: 'National Trust Holding Company Limited',
  tagline: 'Where Your Money Grows',
  founded: 1976,
  phone: '+233-55-6872795',
  phoneHref: 'tel:+233556872795',
  emails: ['info@nthc.com.gh', 'mailer@nthc.com.gh'],
  gps: 'GS-031-5968',
  address: ['18 Gamel Abdul Nasser Avenue', 'Ringway Estates', 'Osu, Accra'],
  postal: ['P. O. Box KIA 9563', 'Airport, Accra, Ghana'],
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=18+Gamel+Abdul+Nasser+Avenue+Ringway+Estates+Osu+Accra',
  logo: 'https://nthc.com.gh/static/media/nthc_logo.37df9a8b5e4567dcaa6d.png',
  social: [
    // The live site links to "facebbok.com" (a typo); corrected here.
    { name: 'Facebook', href: 'https://facebook.com/nthc_gh' },
    { name: 'Instagram', href: 'https://instagram.com/nthc_gh' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/nthc' },
    { name: 'X (Twitter)', href: 'https://twitter.com/NTHC_GH' },
  ],
};

export const heroSlides = [1, 2, 3, 4, 5, 6, 7].map((n) => `${MEDIA_BASE}/slides/nthc_${n}.jpg`);

export const welcome = {
  name: 'Isaac Charles Acquah',
  role: 'Group Managing Director',
  image: `${MEDIA_BASE}/messages/Isaac_Charles_Acquah.jpg`,
  paragraphs: [
    'It gives me great pleasure to extend a warm welcome to each and every one of you. Whether you are a potential client, partner, employee, or simply someone seeking information about NTHC, we are delighted to have you here.',
    'We are the foremost Investment Bankers in Ghana with strategic interest in Real Estates and Commodities. Irrespective of your mission here, I also encourage you to get in touch to enjoy our renewed customer experience.',
  ],
};

export const about = {
  intro: [
    'Our foremost pre-occupation is investment banking but, we also have an appetite to explore other value creating opportunities within the business landscape. We endeavour to create strategic business units through which we undertake specific business activities.',
    'These strategic business units are incorporated as subsidiary companies to provide diversity of investment held within a respected structure of governance framework.',
    'Ultimately it enhances resource optimization and creates relative independence for each business activity while at the same time offering a unique convergence platform for the consummation of the synergies that arises from within.',
  ],
  history:
    'The National Trust Holding Company (NTHC) Limited was established in 1976 (under the auspices of the National Investment Bank) by incorporation under the Companies Code, 1963 (Act 179). In that same year, NTHC was authorized by Legislative Instrument (L.I 1093/76) to operate as a Mutual Fund.',
  mission:
    'To create and provide a reliable array of investment options that fulfils the appetite of varied investors leveraging research, innovation and professionalism at all times.',
  vision:
    'To be respected as the fore-runner in Investment Banking value creation and a model financial sector institution across Ghana and beyond.',
  stakeholders: [
    'Our dedicated employees, with their diverse skills, expertise, and unwavering passion, have been the driving force behind our remarkable transaction history.',
    'As a brand, we have had our unparalleled moments of glory as well as challenging times but in all of these circumstances, we have treasured the value our clients bring to the table, the commitment of our staff and the support of our shareholders.',
  ],
  pledge:
    'By an agile application of our core values, we are certain to remain relevant in the evolving business landscape and entreat our clients to continue trusting in our capabilities.',
};

export const values = [
  { letter: 'E', name: 'Excellence', text: 'The quest to achieve excellence must be viewed as a continuous process and not an end. Employees must always seek to achieve excellence by offering superior service and making daily contributions that would promote excellence over the immediate to long-term.' },
  { letter: 'T', name: 'Teamwork', text: 'Creating a healthy environment that encourages team work and promotes cross-referencing among peers is perhaps a major step to driving innovation by enabling all personnel to develop a deep feeling of belonging. This would encourage the sharing of ideas and promote the radicalisation of new thinking to the benefit of the Company.' },
  { letter: 'I', name: 'Integrity', text: 'Remaining competitive requires high levels of integrity and ethical behaviour. This is critical to preserve the Company’s trade secrets, remain competitive and attain leadership position.' },
  { letter: 'R', name: 'Responsibility', text: 'Embracing the opportunity to contribute towards the achievement of the objectives of the company and accepting that their actions impact everyone around them.' },
  { letter: 'I', name: 'Innovation', text: 'Innovation must be viewed as the most critical independent resource required of NTHC’s human capital to operate and to achieve its vision. Focusing on the opportunities in the industry and being ahead of competitors to introduce new ideas/products in the industry.' },
];

export const shareholders = [
  { name: 'Social Security and National Insurance Trust (SSNIT)', share: 75, text: 'Established in 1972, SSNIT is a statutory public Trust charged under the National Pensions Act 2008 (Act 766) with the administration of Ghana’s Basic National Social Security Pension Scheme, catering for the first tier of the contributory three-tier scheme. Today it manages one of the largest asset portfolios in Ghana.' },
  { name: 'National Investment Bank (NIB)', share: 8.71, text: 'Incorporated in 1963 as an autonomous joint state-private institution primarily to promote and strengthen rapid industrialization in all sectors of the Ghanaian economy. Today it is one of the oldest established banks in the country.' },
  { name: 'State Insurance Company Limited (SIC)', share: 8.71, text: 'SIC traces its roots to 1955. It is the nation’s largest insurer and the only one with a nationwide coverage, holding considerable market share in both the general and life insurance business.' },
  { name: 'AcreCon Limited', share: 5.45, text: 'A private Ghanaian company providing investment advisory and financial consultancy services.' },
  { name: 'NTHC Provident Fund', share: 2.09, text: 'Staff of NTHC Group got the opportunity to own part of the Company in February 2001, through the staff Provident Fund.' },
];

// Business lines, as listed on the live site's "Business Portfolio" and "Core Functions".
export const services = [
  { id: 'fund', name: 'Fund Management', text: 'Management of investment funds, including the NTHC Horizon Fund.', subsidiaryId: 'asset-management' },
  { id: 'pension', name: 'Pension Trusteeship', text: 'Trusteeship of pension schemes.', subsidiaryId: 'trustees' },
  { id: 'securities', name: 'Financial Securities Trading', text: 'Trading of securities for individual and institutional clients.', subsidiaryId: 'securities' },
  { id: 'advisory', name: 'Corporate Finance Advisory', text: 'Advice on corporate finance matters, part of NTHC’s core investment banking business.', subsidiaryId: null },
  { id: 'registry', name: 'Equity Share Registry & Company Secretarial', text: 'Keeping of shareholder registers, and company secretarial services.', subsidiaryId: 'registrars' },
  { id: 'commodities', name: 'Commodities Trading', text: 'Trading in commodities.', subsidiaryId: 'commodities' },
  { id: 'realestate', name: 'Real Estates Development', text: 'Development of real estate.', subsidiaryId: 'properties' },
];

export const subsidiaries = [
  { id: 'asset-management', name: 'NTHC Asset Management Ltd', line: 'Fund Management', url: 'https://asset-management.nthc.com.gh/', image: `${MEDIA_BASE}/subsidiaries/nthc_asset_management.jpg` },
  { id: 'securities', name: 'NTHC Securities Ltd', line: 'Financial Securities Trading', url: 'https://securities.nthc.com.gh/', image: `${MEDIA_BASE}/subsidiaries/nthc_securities.jpg` },
  { id: 'trustees', name: 'NTHC Trustees Ltd', line: 'Pension Trusteeship', url: 'https://trustees.nthc.com.gh/', image: `${MEDIA_BASE}/subsidiaries/nthc_trustees.jpg` },
  { id: 'registrars', name: 'NTHC Registrars Ltd', line: 'Equity Share Registry & Company Secretarial', url: 'https://registrars.nthc.com.gh/', image: `${MEDIA_BASE}/subsidiaries/nthc_registrars.jpg` },
  { id: 'commodities', name: 'NTHC Commodities Ltd', line: 'Commodities Trading', url: 'https://commodities.nthc.com.gh/', image: `${MEDIA_BASE}/subsidiaries/nthc_commodities.jpg` },
  { id: 'properties', name: 'NTHC Properties Ltd', line: 'Real Estates Development', url: 'https://nthcpghana.com/', image: `${MEDIA_BASE}/subsidiaries/nthc_properties.jpg` },
];

// NTHC Horizon Fund figures as displayed on the live homepage.
export const horizonFund = {
  name: 'NTHC Horizon Fund',
  asAt: '2026-11-18',
  nav: 8.33,       // GHS million
  ytd: 81.23,      // %
  price: 1.91,     // GHS per unit (labelled "GHSp" on the live site)
};

// Last published API data, shown when the live API cannot be reached.

const person = (folder) => (name, position, image, rank) => ({
  name, position, rank, profile: '',
  image: image ? `${MEDIA_BASE}/${folder}/${image}` : null,
});
const b = person('board');
const e = person('executives');
const g = person('group-business');

export const snapshot = {
  board: [
    b('Mr. Jerome Eshun', 'Chairman', null, 1),
    b('Isaac Charles Acquah', 'Member / Group MD', 'Isaac_Charles_Acquah.jpg', 2),
    b('Mrs. Mangowa Ghanney', 'Member', null, 3),
    b('Kofi Agyeman Boakye', 'Member', 'Kofi_Agyeman_Boakye.png', 4),
    b('Nana Yaw Mantey', 'Member', 'Nana_Yaw_Mantey.png', 5),
    b('Mr. Ali Ibrahim Adjei', 'Member', null, 6),
    b('Ms. Priscilla Araba Cournooh', 'Member', null, 7),
    b('Mr. John Bayuo Warisa', 'Member', null, 8),
  ],
  executives: [
    e('Isaac Charles Acquah', 'Group Managing Director', 'Isaac_Charles_Acquah.jpg', 1),
    e('Dinah Gyaaba Hayford', 'Group Head, Human Resource & Administration', 'Dinah_Hayford.png', 2),
    e('Kwabena Oteng-Adjei', 'Group Head, Business', 'Kwabena_Oteng-Adjei.png', 3),
    e('Abdul-Bashit Abdulai', 'Group Head, Finance', 'Abdul-Bashit_Abdulai.png', 4),
  ],
  group: [
    g('Isaac Charles Acquah', 'Group Managing Director', 'Isaac_Charles_Acquah.jpg', 1),
    g('Abdul-Bashit Abdulai', 'Group Head, Finance', 'Abdul-Bashit_Abdulai.png', 2),
    g('Kwabena Oteng-Adjei', 'Group Head, Business', 'Kwabena_Oteng-Adjei.png', 3),
    g('Ken Mate-Kole', 'MD, NTHC Registrars Ltd', 'Ken_Mate-Kole2.png', 4),
    g('Mercy Evelyn Akuetteh (Mrs.)', 'MD, NTHC Securities Ltd', 'Mercy_Akuetteh.jpg', 5),
    g('Mrs. Adwoa Sakyibea Ohipeni', 'MD, NTHC Trustees Ltd', 'Adwoa_Sakyibea_Ohipeni2.png', 6),
    g('Nana Barima Fi III', 'MD, NTHC Commodities Ltd', 'Nana_Barima_Fi.png', 7),
  ],
  market_review: [
    ['Market Report - Week 2, 2026.pdf', 52, '2026-01-21'],
    ['Market Report - Week 1, 2026.pdf', 51, '2026-01-12'],
    ['Market Report - Week 35, 2025.pdf', 50, '2025-08-25'],
    ['Market Report - Week 49, 2023.pdf', 49, '2023-12-06'],
    ['Market Report - Week 48, 2023.pdf', 48, '2023-11-28'],
    ['Market Report - Week 47, 2023.pdf', 47, '2023-11-21'],
    ['Market Report - Week 46, 2023.pdf', 46, '2023-11-21'],
    ['Market Report - Week 45, 2023.pdf', 45, '2023-11-07'],
    ['Market Report - Week 44, 2023.pdf', 44, '2023-11-01'],
    ['Market Report - Week 42, 2023.pdf', 42, '2023-11-01'],
  ].map(([file_name, edition, date]) => ({ file_name, edition, date, description: 'NTHC Weekly Security Market Summary' })),
  newsletters: [],
  articles: [],
  equity_research: [],
  gallery: [],
  forms: [
    {
      company: 'NTHC Securities Ltd',
      product: [
        ['Individuals SEC KYC Account Opening Forms', 'The basic Know-Your-Client form to be completed by all new clients opening an account as individuals.', 'Stocks_Individuals_SEC_KYC_Account_Opening_Forms.pdf'],
        ['Corporate SEC KYC Account Opening Forms', 'The basic Know-Your-Client form to be completed by all new clients opening an account as institutions.', 'Stocks_Corporate_SEC_KYC_Account_Opening_Forms.pdf'],
        ['Security Account Opening Form (CSD Form 1)', 'For the opening of new accounts for natural persons/entities recognized by the CSD as individuals/institutions.', 'Stocks_Security_Account_Opening_Form_CSD_Form_1.pdf'],
        ['Securities Account Maintenance Form (CSD Form 2)', 'The basic Know-Your-Client form to be completed by all natural persons opening account as institutions.', 'Stocks_Securities_Account_Maintenance_Form_CSD_Form_2.pdf'],
      ],
    },
    {
      company: 'NTHC Asset Management Ltd',
      product: [
        ['Individuals SEC KYC Account Opening Forms', 'The basic Know-Your-Client form to be completed by all natural persons opening account as individuals.', 'TBills_Individuals_SEC_KYC_Account_Opening_Forms .pdf'],
        ['Corporate SEC KYC Account Opening Forms', 'The basic Know-Your-Client form to be completed by all natural persons opening account as institutions.', 'TBills_Corporate_SEC_KYC_Account_Opening_Forms.pdf'],
        ['Security Account Opening Form (CSD Form 1)', 'For the opening of new accounts for natural persons/entities recognized by the CSD as individuals/institutions.', 'Tbills_Security_Account_Opening_Form_CSD_Form_1.pdf'],
      ],
    },
    {
      company: 'NTHC Registrars Ltd',
      product: [
        ['Securities Account Maintenance Form (CSD Form 2)', 'The basic Know-Your-Client form to be completed by all natural persons opening account as institutions.', 'Securities_Account_Maintenance_Form_CSD_Form_2.pdf'],
      ],
    },
  ].map((c) => ({ company: c.company, product: c.product.map(([form_name, description, form_path]) => ({ form_name, description, form_path })) })),
};
