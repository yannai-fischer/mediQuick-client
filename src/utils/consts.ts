import {User} from "./interfaces";

export const DOG_SERVER_URL: string = `http://localhost:3000`;

export const FICTITIOUS_USER: User = {
  isAdmin: false,
  firstName: "אורח",
  lastName: "כהן",
  address: "רחוב העצמאות 12, תל אביב יפו",
  username: "johncohen",
  password: "הסיסמהשלי",
  email: "johncohen@example.com",
  phone: "0551234567"
}

export const BREEDS: string[] = [
  'כלב צאן אנגלי עתיק',
  'כלב כנעני',
  'אמסטף',
  'באסט האונד',
  'דוברמן',
  'סלוקי',
  'ביגל',
  'ברנזי הרים',
  'ניופאונדלנד',
  'האסקי סיבירי'
];

export const BREED_TO_IMG: Map<string, string> = new Map([
  ['כלב צאן אנגלי עתיק', 'https://www.biopet.co.il/wp-content/uploads/2017/01/ang_circle.jpg'],
  ['כלב כנעני', 'https://www.biopet.co.il/wp-content/uploads/2017/01/Canaan_Dog_s.jpg'],
  ['אמסטף', 'https://www.biopet.co.il/wp-content/uploads/2016/11/Amstaff_s.jpg'],
  ['באסט האונד', 'https://www.biopet.co.il/wp-content/uploads/2017/01/Basset-Hound_S_c.jpg'],
  ['דוברמן', 'https://www.biopet.co.il/wp-content/uploads/2019/09/shutterstock_1335579644-1637x2048.jpg'],
  ['סלוקי', 'https://www.biopet.co.il/wp-content/uploads/2017/01/saluki_S_c.jpg'],
  ['ביגל', 'https://www.biopet.co.il/wp-content/uploads/2017/01/beagle_S_c.jpg'],
  ['ברנזי הרים', 'https://www.biopet.co.il/wp-content/uploads/2017/01/Bernese-Mountain_S_c.jpg'],
  ['ניופאונדלנד', 'https://www.biopet.co.il/wp-content/uploads/2019/09/shutterstock_69424198-1464x1536.jpg'],
  ['האסקי סיבירי', 'https://www.biopet.co.il/wp-content/uploads/2017/01/Siberian-husky_S_c.jpg']
])
