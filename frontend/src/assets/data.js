import cogni from './images/d11.png'
import dermato from './images/d3.png'
import gastro from './images/d10.png'
import heart from './images/d4.png'
import humer from './images/d5.png'
import neuro from './images/d6.png'
import pulmo from './images/d1.png'
import pwomen from './images/d7.png'
import tooth from './images/d2.png'
import visi from './images/d9.png'
import female from "./images/d8.png";
import verify from '../assets/images/verify.png'
import aboutIcon from '../assets/images/about.png'

export const specialityData = [
  {
    spaciality: "Cardiologist",
    imge: heart,
  },
  {
    spaciality: "Dermatologist",
    imge: dermato,
  },
  {
    spaciality: "Pediatrician",
    imge: pwomen,
  },
  {
    spaciality: "Neurologist",
    imge: neuro,
  },
  {
    spaciality: "Orthopedics",
    imge: humer,
  },
  
];


export const doctors = [
  {
    _id: 1,
    name: "Dr. Abebe Kebede",
    spaciality: "General pysician",
    image: heart,
    degree: "MD, FACC",
    experience: "12 years experience",
    about:
      "Dr. Abebe is a board-certified physician with over a decade of experience in primary care. She is dedicated to providing compassionate and comprehensive care to all her patients.",
    fee: 150,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.8,
    reviews: 210,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 2,
    name: "Dr. Genet Tadesse",
    spaciality: "Dermatologist",
    image: dermato,
    degree: "DO",
    experience: "8 years experience",
    about:
      "Dr. Genet specializes in digestive health and gastrointestinal diseases. He is known for his patient-first approach and advanced diagnostic skills.",
    fee: 175,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.9,
    reviews: 185,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 3,
    name: "Dr. Solomon Berhanu",
    spaciality: "Pediatrician",
    image: pwomen,
    degree: "MBBS, DNB",
    experience: "7 years experience",
    about:
      "Dr. Solomon specializes in both medical and cosmetic dermatology, helping patients achieve healthy, beautiful skin through personalized treatment plans.",
    fee: 180,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.7,
    reviews: 320,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 4,
    name: "Dr. Freweyni Assefa",
    spaciality: "Neurologist",
    image: neuro,
    degree: "MD, FAAP",
    experience: "15 years experience",
    about:
      "With 15 years in pediatrics, Dr. Freweyni is committed to the health and well-being of children from infancy through adolescence. He believes in a preventative approach to healthcare.",
    fee: 140,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.8,
    reviews: 150,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 5,
    name: "Dr. Dawit Lemma",
    spaciality: "Orthopedic Surgeon",
    image: humer,
    degree: "MD, PhD",
    experience: "10 years experience",
    about:
      "Dr.Dawit is a leading expert in neurological disorders, including epilepsy and stroke. He is actively involved in research to find new treatments.",
    fee: 220,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.6,
    reviews: 255,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 6,
    name: "Dr. Tsehay Mulugeta",
    spaciality: "General pysician",
    image: pulmo,
    degree: "MD, FAAOS",
    experience: "14 years experience",
    about:
      "Dr.Tsehay specializes in sports medicine and joint replacement surgery. She helps patients regain mobility and return to their active lifestyles.",
    fee: 250,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.9,
    reviews: 198,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 7,
    name: "Dr. Yared Getachew",
    spaciality: "Gastroenterologist",
    image: tooth,
    degree: "MD",
    experience: "9 years experience",
    about:
      "Dr. Yared provides holistic primary care for adults, focusing on managing chronic conditions and promoting overall wellness.",
    fee: 145,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.7,
    reviews: 176,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 8,
    name: "Dr. Selamawit Girma",
    spaciality: "Gastroenterologist",
    image: cogni,
    degree: "MBBS, MS",
    experience: "6 years experience",
    about:
      "Dr. Selamawit is a passionate pediatrician known for her warm demeanor with children and clear communication with parents.",
    fee: 135,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.8,
    reviews: 142,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 9,
    name: "Dr. Bereket Hailu",
    spaciality: "Orthopedic Surgeon",
    image: gastro,
    degree: "MD",
    experience: "11 years experience",
    about:
      "Dr. Bereket offers expert diagnosis and treatment for all conditions affecting the brain and nervous system, prioritizing patient comfort and understanding.",
    fee: 210,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.9,
    reviews: 290,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 10,
    name: "Dr. Hanna Mekonnen",
    spaciality: "Orthopedic Surgeon",
    image: visi,
    degree: "MBBS, FRCS",
    experience: "18 years experience",
    about:
      "A seasoned Orthopedic Surgeon with a focus on minimally invasive techniques for hip and knee replacements, committed to rapid patient recovery.",
    fee: 260,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.6,
    reviews: 115,
    icon: verify,
    aboutIcon: aboutIcon,
  },
  {
    _id: 11,
    name: "Dr. Tiblet Alemayehu",
    spaciality: "Gastroenterologist",
    image: female,
    degree: "MD",
    experience: "7 years experience",
    about:
      "Dr. Tiblet provides specialized care for common and complex digestive issues, offering comprehensive screening and nutritional advice.",
    fee: 165,
    address: {
      line1: "Wachemo",
      line2: "Hossana, Ethiopia",
    },
    rating: 4.7,
    reviews: 130,
    icon: verify,
    aboutIcon: aboutIcon,
  },
];